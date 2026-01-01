/**
 * Data Schema Migration Framework
 *
 * Provides versioned schema migrations for JSON data files.
 * Supports forward migrations with automatic version tracking.
 *
 * Issue #14: 데이터 스키마 버저닝
 */

import { logger } from './logger.js';

// ============================================================
// Types
// ============================================================

/**
 * Versioned data file wrapper.
 * All data files should be wrapped in this structure.
 */
export interface VersionedData<T> {
  version: number;
  migratedAt: string | null;
  data: T;
}

/**
 * Migration function type.
 * Takes data from version N-1 and returns data for version N.
 */
export type MigrationFn<TFrom, TTo> = (data: TFrom) => TTo;

/**
 * Migration definition for a specific version.
 */
export interface Migration<TFrom = unknown, TTo = unknown> {
  version: number;
  description: string;
  migrate: MigrationFn<TFrom, TTo>;
}

/**
 * Migration result.
 */
export interface MigrationResult<T> {
  data: VersionedData<T>;
  migrationsApplied: number[];
  wasModified: boolean;
}

// ============================================================
// Migration Registry
// ============================================================

/**
 * Create a migration registry for a specific data type.
 */
export function createMigrationRegistry<T>() {
  const migrations: Migration[] = [];

  return {
    /**
     * Register a migration for a specific version.
     * Migrations must be registered in order (v1, v2, v3, ...).
     */
    register<TFrom, TTo>(
      version: number,
      description: string,
      migrate: MigrationFn<TFrom, TTo>
    ): void {
      if (version <= 0) {
        throw new Error(`Migration version must be positive: ${version}`);
      }

      // Check for duplicate versions
      if (migrations.some((m) => m.version === version)) {
        throw new Error(`Migration version ${version} already registered`);
      }

      migrations.push({
        version,
        description,
        migrate: migrate as MigrationFn<unknown, unknown>,
      });

      // Keep migrations sorted by version
      migrations.sort((a, b) => a.version - b.version);
    },

    /**
     * Get the current (latest) schema version.
     */
    getCurrentVersion(): number {
      if (migrations.length === 0) return 0;
      return Math.max(...migrations.map((m) => m.version));
    },

    /**
     * Get all registered migrations.
     */
    getMigrations(): ReadonlyArray<Migration> {
      return migrations;
    },

    /**
     * Run migrations on data.
     * Returns the migrated data and list of applied migrations.
     */
    migrate(input: VersionedData<unknown> | unknown): MigrationResult<T> {
      const currentVersion = this.getCurrentVersion();

      // Handle legacy data without version wrapper
      let versionedData: VersionedData<unknown>;
      if (isVersionedData(input)) {
        versionedData = input;
      } else {
        // Legacy data - treat as version 0
        versionedData = {
          version: 0,
          migratedAt: null,
          data: input,
        };
      }

      const startVersion = versionedData.version;
      const migrationsApplied: number[] = [];
      let data = versionedData.data;

      // Apply migrations in order
      for (const migration of migrations) {
        if (migration.version <= startVersion) {
          continue; // Already at or past this version
        }

        if (migration.version > currentVersion) {
          break; // Don't apply future versions
        }

        try {
          data = migration.migrate(data);
          migrationsApplied.push(migration.version);

          logger.info(
            {
              fromVersion: migration.version - 1,
              toVersion: migration.version,
              description: migration.description,
            },
            'migration_applied'
          );
        } catch (err) {
          logger.error(
            {
              version: migration.version,
              description: migration.description,
              err,
            },
            'migration_failed'
          );
          throw new Error(
            `Migration to version ${migration.version} failed: ${err instanceof Error ? err.message : String(err)}`
          );
        }
      }

      const wasModified = migrationsApplied.length > 0;

      return {
        data: {
          version: currentVersion,
          migratedAt: wasModified ? new Date().toISOString() : versionedData.migratedAt,
          data: data as T,
        },
        migrationsApplied,
        wasModified,
      };
    },
  };
}

// ============================================================
// Helper Functions
// ============================================================

/**
 * Check if data is wrapped in VersionedData structure.
 */
export function isVersionedData(data: unknown): data is VersionedData<unknown> {
  return (
    typeof data === 'object' &&
    data !== null &&
    'version' in data &&
    typeof (data as VersionedData<unknown>).version === 'number' &&
    'data' in data
  );
}

/**
 * Wrap raw data in VersionedData structure.
 */
export function wrapData<T>(data: T, version: number): VersionedData<T> {
  return {
    version,
    migratedAt: new Date().toISOString(),
    data,
  };
}

/**
 * Unwrap VersionedData to get raw data.
 * If data is not wrapped, returns it as-is.
 */
export function unwrapData<T>(versionedData: VersionedData<T> | T): T {
  if (isVersionedData(versionedData)) {
    return versionedData.data as T;
  }
  return versionedData;
}

/**
 * Get version from data (0 if not versioned).
 */
export function getVersion(data: unknown): number {
  if (isVersionedData(data)) {
    return data.version;
  }
  return 0;
}
