/**
 * Migration Framework Tests
 *
 * Issue #14: 데이터 스키마 버저닝
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  createMigrationRegistry,
  isVersionedData,
  wrapData,
  unwrapData,
  getVersion,
  type VersionedData,
} from './migration.js';

describe('Migration Framework', () => {
  describe('createMigrationRegistry', () => {
    it('should create an empty registry with version 0', () => {
      const registry = createMigrationRegistry<{ name: string }>();
      expect(registry.getCurrentVersion()).toBe(0);
      expect(registry.getMigrations()).toHaveLength(0);
    });

    it('should register migrations and update version', () => {
      const registry = createMigrationRegistry<{ name: string; age: number }>();

      registry.register(1, 'Add age field', (data: { name: string }) => ({
        ...data,
        age: 0,
      }));

      expect(registry.getCurrentVersion()).toBe(1);
      expect(registry.getMigrations()).toHaveLength(1);
    });

    it('should reject duplicate version numbers', () => {
      const registry = createMigrationRegistry<unknown>();

      registry.register(1, 'First migration', (data) => data);

      expect(() => {
        registry.register(1, 'Duplicate', (data) => data);
      }).toThrow('Migration version 1 already registered');
    });

    it('should reject non-positive version numbers', () => {
      const registry = createMigrationRegistry<unknown>();

      expect(() => {
        registry.register(0, 'Invalid', (data) => data);
      }).toThrow('Migration version must be positive');

      expect(() => {
        registry.register(-1, 'Negative', (data) => data);
      }).toThrow('Migration version must be positive');
    });

    it('should sort migrations by version', () => {
      const registry = createMigrationRegistry<unknown>();

      registry.register(3, 'Third', (data) => data);
      registry.register(1, 'First', (data) => data);
      registry.register(2, 'Second', (data) => data);

      const migrations = registry.getMigrations();
      expect(migrations[0].version).toBe(1);
      expect(migrations[1].version).toBe(2);
      expect(migrations[2].version).toBe(3);
    });
  });

  describe('migrate', () => {
    it('should migrate legacy data (no version) to current version', () => {
      interface V0 {
        name: string;
      }
      interface V1 {
        name: string;
        age: number;
      }
      interface V2 {
        name: string;
        age: number;
        email: string;
      }

      const registry = createMigrationRegistry<V2>();

      registry.register(1, 'Add age', (data: V0): V1 => ({
        ...data,
        age: 0,
      }));

      registry.register(2, 'Add email', (data: V1): V2 => ({
        ...data,
        email: '',
      }));

      const legacyData = { name: 'John' };
      const result = registry.migrate(legacyData);

      expect(result.data.version).toBe(2);
      expect(result.data.data).toEqual({ name: 'John', age: 0, email: '' });
      expect(result.migrationsApplied).toEqual([1, 2]);
      expect(result.wasModified).toBe(true);
    });

    it('should migrate versioned data from older version', () => {
      interface V1 {
        count: number;
      }
      interface V2 {
        count: number;
        total: number;
      }

      const registry = createMigrationRegistry<V2>();

      registry.register(1, 'Initial', (data: object): V1 => ({
        count: 0,
        ...data,
      }));

      registry.register(2, 'Add total', (data: V1): V2 => ({
        ...data,
        total: data.count,
      }));

      const v1Data: VersionedData<V1> = {
        version: 1,
        migratedAt: '2024-01-01T00:00:00.000Z',
        data: { count: 5 },
      };

      const result = registry.migrate(v1Data);

      expect(result.data.version).toBe(2);
      expect(result.data.data).toEqual({ count: 5, total: 5 });
      expect(result.migrationsApplied).toEqual([2]);
      expect(result.wasModified).toBe(true);
    });

    it('should not modify data already at current version', () => {
      const registry = createMigrationRegistry<{ value: number }>();

      registry.register(1, 'Initial', (data) => data);

      const currentData: VersionedData<{ value: number }> = {
        version: 1,
        migratedAt: '2024-01-01T00:00:00.000Z',
        data: { value: 42 },
      };

      const result = registry.migrate(currentData);

      expect(result.data.version).toBe(1);
      expect(result.data.data).toEqual({ value: 42 });
      expect(result.migrationsApplied).toEqual([]);
      expect(result.wasModified).toBe(false);
      expect(result.data.migratedAt).toBe('2024-01-01T00:00:00.000Z');
    });

    it('should handle complex transformations', () => {
      interface V0 {
        items: string[];
      }
      interface V1 {
        items: Array<{ id: number; name: string }>;
      }

      const registry = createMigrationRegistry<V1>();

      registry.register(1, 'Convert items to objects', (data: V0): V1 => ({
        items: data.items.map((name, index) => ({ id: index + 1, name })),
      }));

      const result = registry.migrate({ items: ['apple', 'banana'] });

      expect(result.data.data.items).toEqual([
        { id: 1, name: 'apple' },
        { id: 2, name: 'banana' },
      ]);
    });

    it('should throw on migration failure', () => {
      const registry = createMigrationRegistry<unknown>();

      registry.register(1, 'Failing migration', () => {
        throw new Error('Something went wrong');
      });

      expect(() => registry.migrate({})).toThrow(
        'Migration to version 1 failed: Something went wrong'
      );
    });

    it('should handle empty data', () => {
      const registry = createMigrationRegistry<{ items: unknown[] }>();

      registry.register(1, 'Initialize items', () => ({
        items: [],
      }));

      const result = registry.migrate({});

      expect(result.data.data).toEqual({ items: [] });
    });
  });

  describe('isVersionedData', () => {
    it('should return true for valid versioned data', () => {
      expect(
        isVersionedData({
          version: 1,
          migratedAt: null,
          data: {},
        })
      ).toBe(true);

      expect(
        isVersionedData({
          version: 0,
          migratedAt: '2024-01-01',
          data: { foo: 'bar' },
        })
      ).toBe(true);
    });

    it('should return false for non-versioned data', () => {
      expect(isVersionedData({})).toBe(false);
      expect(isVersionedData({ version: 'one' })).toBe(false);
      expect(isVersionedData({ version: 1 })).toBe(false); // missing data
      expect(isVersionedData(null)).toBe(false);
      expect(isVersionedData(undefined)).toBe(false);
      expect(isVersionedData('string')).toBe(false);
      expect(isVersionedData(123)).toBe(false);
    });
  });

  describe('wrapData', () => {
    it('should wrap data with version', () => {
      const data = { name: 'test' };
      const wrapped = wrapData(data, 2);

      expect(wrapped.version).toBe(2);
      expect(wrapped.data).toBe(data);
      expect(wrapped.migratedAt).toBeTruthy();
    });
  });

  describe('unwrapData', () => {
    it('should unwrap versioned data', () => {
      const wrapped: VersionedData<{ name: string }> = {
        version: 1,
        migratedAt: null,
        data: { name: 'test' },
      };

      expect(unwrapData(wrapped)).toEqual({ name: 'test' });
    });

    it('should return non-versioned data as-is', () => {
      const data = { name: 'test' };
      expect(unwrapData(data)).toBe(data);
    });
  });

  describe('getVersion', () => {
    it('should return version for versioned data', () => {
      expect(
        getVersion({
          version: 5,
          migratedAt: null,
          data: {},
        })
      ).toBe(5);
    });

    it('should return 0 for non-versioned data', () => {
      expect(getVersion({})).toBe(0);
      expect(getVersion({ foo: 'bar' })).toBe(0);
      expect(getVersion(null)).toBe(0);
    });
  });

  describe('Real-world migration scenarios', () => {
    it('should handle profile schema evolution', () => {
      // Simulating profile store migrations
      interface ProfileV0 {
        userKey: string;
        birthdate: string;
      }

      interface ProfileV1 {
        userKey: string;
        birthdate: string;
        createdAt: string;
      }

      interface ProfileV2 {
        userKey: string;
        birthdate: string;
        createdAt: string;
        consents: {
          terms: boolean;
          marketing: boolean;
        };
      }

      const registry = createMigrationRegistry<{ profiles: Record<string, ProfileV2> }>();

      registry.register(
        1,
        'Add createdAt to profiles',
        (data: { profiles: Record<string, ProfileV0> }) => ({
          profiles: Object.fromEntries(
            Object.entries(data.profiles).map(([key, profile]) => [
              key,
              {
                ...profile,
                createdAt: new Date().toISOString(),
              },
            ])
          ),
        })
      );

      registry.register(
        2,
        'Add consents to profiles',
        (data: { profiles: Record<string, ProfileV1> }) => ({
          profiles: Object.fromEntries(
            Object.entries(data.profiles).map(([key, profile]) => [
              key,
              {
                ...profile,
                consents: {
                  terms: true, // Assume existing users agreed
                  marketing: false,
                },
              },
            ])
          ),
        })
      );

      const legacyData = {
        profiles: {
          user1: { userKey: 'user1', birthdate: '19900101' },
          user2: { userKey: 'user2', birthdate: '19850615' },
        },
      };

      const result = registry.migrate(legacyData);

      expect(result.data.version).toBe(2);
      expect(result.data.data.profiles['user1']).toHaveProperty('createdAt');
      expect(result.data.data.profiles['user1'].consents).toEqual({
        terms: true,
        marketing: false,
      });
    });
  });
});
