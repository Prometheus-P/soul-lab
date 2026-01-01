/**
 * Profile Store Migrations
 *
 * Schema version history:
 * - v0: Legacy format (no version wrapper)
 * - v1: Initial versioned schema (current structure)
 *
 * Issue #14: 데이터 스키마 버저닝
 */

import { createMigrationRegistry } from '../lib/migration.js';
import type { UserProfile } from './store.js';

// ============================================================
// Types for each schema version
// ============================================================

/**
 * Legacy profile format (v0) - before versioning.
 * This is what existing data files look like.
 */
export interface ProfileDBV0 {
  profiles: Record<string, UserProfile>;
}

/**
 * Current profile format (v1).
 * Same structure as v0, but wrapped in versioned container.
 */
export interface ProfileDBV1 {
  profiles: Record<string, UserProfile>;
}

// Current version type alias
export type ProfileDBCurrent = ProfileDBV1;

// ============================================================
// Migration Registry
// ============================================================

export const profileMigrations = createMigrationRegistry<ProfileDBCurrent>();

/**
 * Migration v1: Initial versioned schema.
 *
 * No structural changes - just establishes the versioning baseline.
 * All existing fields are preserved as-is.
 */
profileMigrations.register(1, 'Initial versioned schema', (data: ProfileDBV0): ProfileDBV1 => {
  // No transformation needed - just validate structure
  return {
    profiles: data.profiles ?? {},
  };
});

// ============================================================
// Future migration examples (commented out)
// ============================================================

/*
// Example: Adding a new required field to all profiles
profileMigrations.register(2, 'Add lastLoginAt field', (data: ProfileDBV1): ProfileDBV2 => {
  const now = new Date().toISOString();
  return {
    profiles: Object.fromEntries(
      Object.entries(data.profiles).map(([key, profile]) => [
        key,
        {
          ...profile,
          lastLoginAt: profile.lastActiveAt || now,
        },
      ])
    ),
  };
});

// Example: Restructuring consent data
profileMigrations.register(3, 'Restructure consents', (data: ProfileDBV2): ProfileDBV3 => {
  return {
    profiles: Object.fromEntries(
      Object.entries(data.profiles).map(([key, profile]) => [
        key,
        {
          ...profile,
          consents: {
            ...profile.consents,
            privacyPolicy: profile.consents.terms, // Derive from terms
            dataProcessing: profile.consents.thirdParty, // Rename
          },
        },
      ])
    ),
  };
});
*/

// ============================================================
// Export current version
// ============================================================

export const PROFILE_SCHEMA_VERSION = profileMigrations.getCurrentVersion();
