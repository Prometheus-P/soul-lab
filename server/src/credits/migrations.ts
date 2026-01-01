/**
 * Credit Store Migrations
 *
 * Schema version history:
 * - v0: Legacy format (no version tracking)
 * - v1: Initial versioned schema with metadata file
 *
 * Note: CreditStore uses multiple separate files. This migration
 * system tracks the overall schema version in a metadata file.
 *
 * Issue #14: 데이터 스키마 버저닝
 */

import { createMigrationRegistry } from '../lib/migration.js';
import type {
  CreditBalance,
  CreditTransaction,
  PurchaseRecord,
  ReferralRecord,
  StreakRewardRecord,
} from './store.js';

// ============================================================
// Types for each schema version
// ============================================================

/**
 * Schema metadata stored in credit_schema.json
 */
export interface CreditSchemaMetadata {
  version: number;
  migratedAt: string | null;
  fileVersions: {
    balances: number;
    transactions: number;
    purchases: number;
    referrals: number;
    streakRewards: number;
  };
}

/**
 * Combined credit data for migration purposes.
 */
export interface CreditDataV0 {
  balances: Record<string, CreditBalance>;
  transactions: CreditTransaction[];
  purchases: Record<string, PurchaseRecord>;
  referrals: Record<string, ReferralRecord>;
  streakRewards: Record<string, StreakRewardRecord>;
}

/**
 * Current version (same structure, just versioned).
 */
export interface CreditDataV1 {
  balances: Record<string, CreditBalance>;
  transactions: CreditTransaction[];
  purchases: Record<string, PurchaseRecord>;
  referrals: Record<string, ReferralRecord>;
  streakRewards: Record<string, StreakRewardRecord>;
}

export type CreditDataCurrent = CreditDataV1;

// ============================================================
// Migration Registry
// ============================================================

export const creditMigrations = createMigrationRegistry<CreditDataCurrent>();

/**
 * Migration v1: Initial versioned schema.
 *
 * No structural changes - establishes versioning baseline.
 */
creditMigrations.register(1, 'Initial versioned schema', (data: CreditDataV0): CreditDataV1 => {
  return {
    balances: data.balances ?? {},
    transactions: data.transactions ?? [],
    purchases: data.purchases ?? {},
    referrals: data.referrals ?? {},
    streakRewards: data.streakRewards ?? {},
  };
});

// ============================================================
// Future migration examples (commented out)
// ============================================================

/*
// Example: Adding audit fields to transactions
creditMigrations.register(2, 'Add audit fields to transactions', (data: CreditDataV1): CreditDataV2 => {
  return {
    ...data,
    transactions: data.transactions.map(t => ({
      ...t,
      createdBy: 'system',
      auditTrail: [],
    })),
  };
});

// Example: Restructuring referral rewards
creditMigrations.register(3, 'Add referral tiers', (data: CreditDataV2): CreditDataV3 => {
  return {
    ...data,
    referrals: Object.fromEntries(
      Object.entries(data.referrals).map(([key, ref]) => [
        key,
        {
          ...ref,
          tier: 1,
          totalCreditsEarned: ref.inviterCredited ? 5 : 0,
        },
      ])
    ),
  };
});
*/

// ============================================================
// Export current version
// ============================================================

export const CREDIT_SCHEMA_VERSION = creditMigrations.getCurrentVersion();

/**
 * Create default schema metadata.
 */
export function createDefaultMetadata(): CreditSchemaMetadata {
  return {
    version: CREDIT_SCHEMA_VERSION,
    migratedAt: null,
    fileVersions: {
      balances: CREDIT_SCHEMA_VERSION,
      transactions: CREDIT_SCHEMA_VERSION,
      purchases: CREDIT_SCHEMA_VERSION,
      referrals: CREDIT_SCHEMA_VERSION,
      streakRewards: CREDIT_SCHEMA_VERSION,
    },
  };
}
