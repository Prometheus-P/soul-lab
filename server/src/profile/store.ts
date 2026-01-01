/**
 * ProfileStore - Server-side user profile storage with encryption.
 * Stores birthdate and consent information for cross-device continuity.
 *
 * Schema versioning: Uses migration framework for data evolution.
 * Issue #14: 데이터 스키마 버저닝
 */
import fs from 'node:fs';
import path from 'node:path';
import { encrypt, decrypt, hash, isEncryptionConfigured } from '../lib/crypto.js';
import { writeFileAtomic } from '../lib/atomicWrite.js';
import * as mutex from '../lib/mutex.js';
import { logger } from '../lib/logger.js';
import { isSafeObjectKey } from '../lib/validation.js';
import { isVersionedData, wrapData, type VersionedData } from '../lib/migration.js';
import { profileMigrations, PROFILE_SCHEMA_VERSION, type ProfileDBCurrent } from './migrations.js';

// ============================================================
// Types
// ============================================================

export interface UserConsent {
  terms: boolean;
  thirdParty: boolean;
  marketing: boolean;
  consentedAt: number; // Unix timestamp
  version: string; // Consent version (e.g., "v1")
}

export interface UserProfile {
  userKey: string;
  birthdateEncrypted: string; // AES-256-GCM encrypted YYYYMMDD
  birthdateHash: string; // SHA-256 for analytics
  consents: UserConsent;
  tossPublicKey?: string; // Toss identity if logged in
  linkedKeys?: string[]; // Other userKeys linked to same identity
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  lastActiveAt: string; // For retention analytics
}

export interface CreateProfileInput {
  userKey: string;
  birthdate: string; // YYYYMMDD
  consents: {
    terms: boolean;
    thirdParty: boolean;
    marketing: boolean;
  };
  consentedAt?: string; // ISO timestamp
  tossPublicKey?: string;
}

export interface ProfileResponse {
  userKey: string;
  birthdate: string; // Decrypted
  consents: UserConsent;
  syncedAt: string;
}

// Internal DB type (unwrapped data)
type DB = ProfileDBCurrent;

// ============================================================
// Store Implementation
// ============================================================

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

/**
 * Validate userKey to prevent prototype pollution.
 * Throws if key is dangerous.
 */
function assertSafeKey(key: string): void {
  if (!isSafeObjectKey(key)) {
    throw new Error(`Invalid key: ${key}`);
  }
}

export class ProfileStore {
  private filePath: string;
  private db: DB;
  private schemaVersion: number;

  constructor(dataDir: string) {
    ensureDir(dataDir);
    this.filePath = path.join(dataDir, 'user_profiles.json');
    const { db, version, migrated } = this.load();
    this.db = db;
    this.schemaVersion = version;

    // If migrations were applied, save immediately
    if (migrated) {
      this.save();
      logger.info(
        { filePath: this.filePath, version: this.schemaVersion },
        'profile_store_migrated'
      );
    }
  }

  private load(): { db: DB; version: number; migrated: boolean } {
    try {
      if (!fs.existsSync(this.filePath)) {
        return {
          db: { profiles: {} },
          version: PROFILE_SCHEMA_VERSION,
          migrated: false,
        };
      }

      const raw = fs.readFileSync(this.filePath, 'utf-8');
      const parsed = JSON.parse(raw);

      // Run migrations (handles both legacy and versioned data)
      const result = profileMigrations.migrate(parsed);

      return {
        db: result.data.data,
        version: result.data.version,
        migrated: result.wasModified,
      };
    } catch (err) {
      logger.error({ filePath: this.filePath, err }, 'profile_store_load_error');
      return {
        db: { profiles: {} },
        version: PROFILE_SCHEMA_VERSION,
        migrated: false,
      };
    }
  }

  private save() {
    // Wrap data with version metadata
    const versionedData: VersionedData<DB> = wrapData(this.db, this.schemaVersion);
    writeFileAtomic(this.filePath, JSON.stringify(versionedData, null, 2));
  }

  /**
   * Get current schema version.
   */
  getSchemaVersion(): number {
    return this.schemaVersion;
  }

  /**
   * Create or update user profile (internal, no mutex).
   */
  private createOrUpdateInternal(input: CreateProfileInput): UserProfile {
    assertSafeKey(input.userKey);

    if (!isEncryptionConfigured()) {
      throw new Error('Encryption not configured. Set PROFILE_ENCRYPTION_KEY.');
    }

    const now = new Date().toISOString();
    const existing = Object.hasOwn(this.db.profiles, input.userKey)
      ? this.db.profiles[input.userKey]
      : undefined;

    const profile: UserProfile = {
      userKey: input.userKey,
      birthdateEncrypted: encrypt(input.birthdate),
      birthdateHash: hash(input.birthdate),
      consents: {
        terms: input.consents.terms,
        thirdParty: input.consents.thirdParty,
        marketing: input.consents.marketing,
        consentedAt: input.consentedAt
          ? new Date(input.consentedAt).getTime()
          : Date.now(),
        version: 'v1',
      },
      tossPublicKey: input.tossPublicKey || existing?.tossPublicKey,
      linkedKeys: existing?.linkedKeys,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
      lastActiveAt: now,
    };

    this.db.profiles[input.userKey] = profile;
    this.save();

    return profile;
  }

  /**
   * Create or update user profile with mutex protection.
   */
  async createOrUpdate(input: CreateProfileInput): Promise<UserProfile> {
    return mutex.withLock(`profile:${input.userKey}`, () => {
      return this.createOrUpdateInternal(input);
    });
  }

  /**
   * Get profile by userKey (read-only, no side effects).
   */
  get(userKey: string): ProfileResponse | null {
    assertSafeKey(userKey);
    if (!Object.hasOwn(this.db.profiles, userKey)) return null;
    const profile = this.db.profiles[userKey];

    try {
      return {
        userKey: profile.userKey,
        birthdate: decrypt(profile.birthdateEncrypted),
        consents: profile.consents,
        syncedAt: profile.updatedAt,
      };
    } catch (err) {
      logger.error({ userKey, err }, 'profile_decryption_failed');
      return null;
    }
  }

  /**
   * Update last active timestamp (call separately when needed).
   */
  updateLastActive(userKey: string): void {
    assertSafeKey(userKey);
    if (!Object.hasOwn(this.db.profiles, userKey)) return;
    const profile = this.db.profiles[userKey];

    profile.lastActiveAt = new Date().toISOString();
    this.save();
  }

  /**
   * Get raw profile (without decryption).
   */
  getRaw(userKey: string): UserProfile | null {
    assertSafeKey(userKey);
    if (!Object.hasOwn(this.db.profiles, userKey)) return null;
    return this.db.profiles[userKey];
  }

  /**
   * Check if profile exists.
   */
  exists(userKey: string): boolean {
    assertSafeKey(userKey);
    return Object.hasOwn(this.db.profiles, userKey);
  }

  /**
   * Delete profile (GDPR compliance).
   */
  delete(userKey: string): boolean {
    assertSafeKey(userKey);
    if (!Object.hasOwn(this.db.profiles, userKey)) return false;
    delete this.db.profiles[userKey];
    this.save();
    return true;
  }

  /**
   * Link Toss publicKey to device userKey.
   * Enables cross-device profile recovery.
   */
  linkTossKey(deviceUserKey: string, tossPublicKey: string): boolean {
    assertSafeKey(deviceUserKey);
    assertSafeKey(tossPublicKey);

    if (!Object.hasOwn(this.db.profiles, deviceUserKey)) return false;
    const profile = this.db.profiles[deviceUserKey];

    profile.tossPublicKey = tossPublicKey;
    profile.linkedKeys = profile.linkedKeys || [];
    if (!profile.linkedKeys.includes(tossPublicKey)) {
      profile.linkedKeys.push(tossPublicKey);
    }

    // Also index by Toss key for lookup
    if (!Object.hasOwn(this.db.profiles, tossPublicKey)) {
      this.db.profiles[tossPublicKey] = profile;
    }

    this.save();
    return true;
  }

  /**
   * Get profile by Toss publicKey.
   */
  getByTossKey(tossPublicKey: string): ProfileResponse | null {
    assertSafeKey(tossPublicKey);

    // First check direct lookup
    if (Object.hasOwn(this.db.profiles, tossPublicKey)) {
      return this.get(tossPublicKey);
    }

    // Search linked keys
    for (const profile of Object.values(this.db.profiles)) {
      if (profile.tossPublicKey === tossPublicKey) {
        return this.get(profile.userKey);
      }
    }

    return null;
  }

  /**
   * Get profile count (for analytics).
   */
  count(): number {
    return Object.keys(this.db.profiles).length;
  }

  /**
   * Get profiles by birthdate hash (for cohort analysis).
   */
  getByBirthdateHash(birthdateHash: string): string[] {
    return Object.values(this.db.profiles)
      .filter((p) => p.birthdateHash === birthdateHash)
      .map((p) => p.userKey);
  }
}
