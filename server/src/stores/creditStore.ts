/**
 * Redis-based Credit Store
 *
 * Manages credits, purchases, referrals, and streak rewards.
 * Uses distributed locks for all write operations.
 */

import { getRedis } from '../lib/redis.js';
import { withLock } from '../lib/lock.js';
import { generateTransactionId } from '../lib/secureId.js';
import type {
  ICreditStore,
  CreditBalance,
  CreditTransaction,
  PurchaseRecord,
  ReferralRecord,
  StreakRewardRecord,
  UseCreditsResult,
  CompletePurchaseResult,
  ClaimReferralResult,
  ClaimStreakResult,
} from './interface.js';

// Import credit configurations from original store
import {
  CREDIT_PRODUCTS,
  REFERRAL_REWARDS,
  STREAK_REWARDS,
  STREAK_DAILY_BONUS,
} from '../credits/store.js';

// Redis key prefixes
const PREFIX = {
  BALANCE: 'credit:balance:',
  TRANSACTION: 'credit:tx:',
  TX_LIST: 'credit:txlist:',
  PURCHASE: 'credit:purchase:',
  PURCHASE_USER: 'credit:purchases:user:',
  REFERRAL: 'credit:referral:',
  STREAK: 'credit:streak:',
};

// TTLs
const TTL = {
  TRANSACTION: 365 * 24 * 60 * 60, // 1 year
  PURCHASE: 365 * 24 * 60 * 60, // 1 year
  REFERRAL: 90 * 24 * 60 * 60, // 90 days
  STREAK: 90 * 24 * 60 * 60, // 90 days
};

/**
 * Generate a unique transaction ID using crypto.randomBytes
 */
function generateTxId(): string {
  return generateTransactionId();
}

/**
 * Redis-based credit store implementation
 */
export class RedisCreditStore implements ICreditStore {
  // ============================================================
  // Balance Operations
  // ============================================================

  async getBalance(userKey: string): Promise<CreditBalance> {
    const redis = getRedis();
    const key = `${PREFIX.BALANCE}${userKey}`;

    const data = await redis.get(key);
    if (data) {
      return JSON.parse(data) as CreditBalance;
    }

    // Create default balance
    const balance: CreditBalance = {
      userKey,
      credits: 0,
      totalPurchased: 0,
      totalUsed: 0,
      lastUpdated: new Date().toISOString(),
    };

    await redis.set(key, JSON.stringify(balance));
    return balance;
  }

  async hasEnoughCredits(userKey: string, amount: number): Promise<boolean> {
    const balance = await this.getBalance(userKey);
    return balance.credits >= amount;
  }

  private async saveBalance(balance: CreditBalance): Promise<void> {
    const redis = getRedis();
    const key = `${PREFIX.BALANCE}${balance.userKey}`;
    await redis.set(key, JSON.stringify(balance));
  }

  // ============================================================
  // Credit Operations
  // ============================================================

  async addCredits(
    userKey: string,
    amount: number,
    type: 'purchase' | 'bonus' | 'refund',
    description: string,
    orderId?: string,
    sku?: string
  ): Promise<CreditTransaction> {
    const lockKey = `credit:add:${userKey}`;

    return await withLock(lockKey, async () => {
      const balance = await this.getBalance(userKey);

      balance.credits += amount;
      if (type === 'purchase') {
        balance.totalPurchased += amount;
      }
      balance.lastUpdated = new Date().toISOString();

      const transaction: CreditTransaction = {
        id: generateTxId(),
        userKey,
        type,
        amount,
        balance: balance.credits,
        description,
        orderId,
        sku,
        timestamp: new Date().toISOString(),
      };

      // Save balance and transaction
      await this.saveBalance(balance);
      await this.saveTransaction(transaction);

      return transaction;
    });
  }

  async useCredits(userKey: string, amount: number, description: string): Promise<UseCreditsResult> {
    const lockKey = `credit:use:${userKey}`;

    return await withLock(lockKey, async () => {
      const balance = await this.getBalance(userKey);

      if (balance.credits < amount) {
        return { success: false, error: 'insufficient_credits' };
      }

      balance.credits -= amount;
      balance.totalUsed += amount;
      balance.lastUpdated = new Date().toISOString();

      const transaction: CreditTransaction = {
        id: generateTxId(),
        userKey,
        type: 'use',
        amount: -amount,
        balance: balance.credits,
        description,
        timestamp: new Date().toISOString(),
      };

      await this.saveBalance(balance);
      await this.saveTransaction(transaction);

      return { success: true, transaction };
    });
  }

  // ============================================================
  // Transaction Operations
  // ============================================================

  private async saveTransaction(tx: CreditTransaction): Promise<void> {
    const redis = getRedis();

    // Save individual transaction
    const txKey = `${PREFIX.TRANSACTION}${tx.id}`;
    await redis.setex(txKey, TTL.TRANSACTION, JSON.stringify(tx));

    // Add to user's transaction list (sorted set by timestamp)
    const listKey = `${PREFIX.TX_LIST}${tx.userKey}`;
    const score = new Date(tx.timestamp).getTime();
    await redis.zadd(listKey, score, tx.id);

    // Trim to keep only recent transactions (max 10000)
    await redis.zremrangebyrank(listKey, 0, -10001);
  }

  async getTransactionHistory(userKey: string, limit = 50): Promise<CreditTransaction[]> {
    const redis = getRedis();
    const listKey = `${PREFIX.TX_LIST}${userKey}`;

    // Get most recent transaction IDs
    const txIds = await redis.zrevrange(listKey, 0, limit - 1);
    if (txIds.length === 0) return [];

    // Fetch all transactions using mget
    const keys = txIds.map((id) => `${PREFIX.TRANSACTION}${id}`);
    const results = await redis.mget(...keys);

    const transactions: CreditTransaction[] = [];
    for (const data of results) {
      if (data) {
        transactions.push(JSON.parse(data) as CreditTransaction);
      }
    }

    return transactions;
  }

  // ============================================================
  // Purchase Operations
  // ============================================================

  async createPurchase(
    orderId: string,
    userKey: string,
    sku: string,
    amount: number
  ): Promise<PurchaseRecord> {
    const redis = getRedis();
    const product = CREDIT_PRODUCTS.find((p) => p.sku === sku);
    const credits = product ? product.credits + (product.bonus || 0) : 0;

    const purchase: PurchaseRecord = {
      orderId,
      userKey,
      sku,
      credits,
      amount,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Save purchase
    const purchaseKey = `${PREFIX.PURCHASE}${orderId}`;
    await redis.setex(purchaseKey, TTL.PURCHASE, JSON.stringify(purchase));

    // Add to user's purchase list
    const userListKey = `${PREFIX.PURCHASE_USER}${userKey}`;
    await redis.zadd(userListKey, Date.now(), orderId);

    return purchase;
  }

  async completePurchase(orderId: string): Promise<CompletePurchaseResult> {
    const lockKey = `purchase:complete:${orderId}`;

    return await withLock(lockKey, async () => {
      const redis = getRedis();
      const purchaseKey = `${PREFIX.PURCHASE}${orderId}`;

      const data = await redis.get(purchaseKey);
      if (!data) {
        return { success: false, error: 'purchase_not_found' };
      }

      const purchase: PurchaseRecord = JSON.parse(data);

      if (purchase.status === 'completed') {
        return { success: false, error: 'already_completed' };
      }

      if (purchase.status === 'refunded') {
        return { success: false, error: 'already_refunded' };
      }

      // Add credits
      const product = CREDIT_PRODUCTS.find((p) => p.sku === purchase.sku);
      const productName = product?.nameKorean || purchase.sku;
      const description = `${productName} 구매 (+${purchase.credits} 크레딧)`;

      const transaction = await this.addCredits(
        purchase.userKey,
        purchase.credits,
        'purchase',
        description,
        orderId,
        purchase.sku
      );

      // Update purchase status
      purchase.status = 'completed';
      purchase.completedAt = new Date().toISOString();
      await redis.setex(purchaseKey, TTL.PURCHASE, JSON.stringify(purchase));

      return { success: true, purchase, transaction };
    });
  }

  async getPurchase(orderId: string): Promise<PurchaseRecord | undefined> {
    const redis = getRedis();
    const key = `${PREFIX.PURCHASE}${orderId}`;
    const data = await redis.get(key);
    if (!data) return undefined;
    return JSON.parse(data) as PurchaseRecord;
  }

  async getUserPurchases(userKey: string): Promise<PurchaseRecord[]> {
    const redis = getRedis();
    const listKey = `${PREFIX.PURCHASE_USER}${userKey}`;

    const orderIds = await redis.zrevrange(listKey, 0, -1);
    if (orderIds.length === 0) return [];

    const keys = orderIds.map((id) => `${PREFIX.PURCHASE}${id}`);
    const results = await redis.mget(...keys);

    const purchases: PurchaseRecord[] = [];
    for (const data of results) {
      if (data) {
        purchases.push(JSON.parse(data) as PurchaseRecord);
      }
    }

    return purchases;
  }

  async getPendingPurchases(userKey: string): Promise<PurchaseRecord[]> {
    const purchases = await this.getUserPurchases(userKey);
    return purchases.filter((p) => p.status === 'pending');
  }

  // ============================================================
  // Referral Operations
  // ============================================================

  async claimReferralReward(
    inviterKey: string,
    inviteeKey: string,
    dateKey: string,
    claimerKey: string
  ): Promise<ClaimReferralResult> {
    // Validation
    if (inviterKey === inviteeKey) {
      return { success: false, error: 'same_user' };
    }

    if (claimerKey !== inviterKey && claimerKey !== inviteeKey) {
      return { success: false, error: 'unauthorized_claimer' };
    }

    const lockKey = `referral:claim:${inviterKey}:${inviteeKey}:${dateKey}`;

    return await withLock(lockKey, async () => {
      const redis = getRedis();
      const referralId = `ref_${inviterKey}_${inviteeKey}_${dateKey}`;
      const key = `${PREFIX.REFERRAL}${referralId}`;

      // Get or create referral record
      let referral: ReferralRecord;
      const data = await redis.get(key);

      if (data) {
        referral = JSON.parse(data);
      } else {
        referral = {
          id: referralId,
          inviterKey,
          inviteeKey,
          dateKey,
          inviterCredited: false,
          inviteeCredited: false,
          createdAt: new Date().toISOString(),
        };
      }

      const isInviter = claimerKey === inviterKey;
      const alreadyClaimed = isInviter ? referral.inviterCredited : referral.inviteeCredited;

      if (alreadyClaimed) {
        return { success: true, credits: 0, alreadyClaimed: true };
      }

      // Determine reward
      const credits = isInviter
        ? REFERRAL_REWARDS.inviterCredits
        : REFERRAL_REWARDS.inviteeCredits;

      // Add credits
      const description = isInviter
        ? `친구 초대 보상 (+${credits} 크레딧)`
        : `초대 수락 보상 (+${credits} 크레딧)`;

      const transaction = await this.addCredits(claimerKey, credits, 'bonus', description);

      // Update referral record
      if (isInviter) {
        referral.inviterCredited = true;
      } else {
        referral.inviteeCredited = true;
      }

      await redis.setex(key, TTL.REFERRAL, JSON.stringify(referral));

      return { success: true, credits, alreadyClaimed: false, transaction };
    });
  }

  async getReferralStatus(
    inviterKey: string,
    inviteeKey: string,
    dateKey: string
  ): Promise<ReferralRecord | null> {
    const redis = getRedis();
    const referralId = `ref_${inviterKey}_${inviteeKey}_${dateKey}`;
    const key = `${PREFIX.REFERRAL}${referralId}`;

    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data) as ReferralRecord;
  }

  async getReferralStats(userKey: string): Promise<{ totalInvited: number; totalCreditsEarned: number }> {
    const redis = getRedis();
    const pattern = `${PREFIX.REFERRAL}ref_${userKey}_*`;

    let totalInvited = 0;
    let totalCreditsEarned = 0;

    // Use SCAN for production-safe iteration
    let cursor = '0';
    do {
      const [newCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
      cursor = newCursor;

      if (keys.length > 0) {
        const results = await redis.mget(...keys);

        for (const data of results) {
          if (data) {
            const referral = JSON.parse(data) as ReferralRecord;
            if (referral.inviterKey === userKey && referral.inviterCredited) {
              totalInvited++;
              totalCreditsEarned += REFERRAL_REWARDS.inviterCredits;
            }
            if (referral.inviteeKey === userKey && referral.inviteeCredited) {
              totalCreditsEarned += REFERRAL_REWARDS.inviteeCredits;
            }
          }
        }
      }
    } while (cursor !== '0');

    return { totalInvited, totalCreditsEarned };
  }

  // ============================================================
  // Streak Operations
  // ============================================================

  async claimStreakReward(
    userKey: string,
    dateKey: string,
    streak: number
  ): Promise<ClaimStreakResult> {
    const lockKey = `streak:claim:${userKey}:${dateKey}`;

    return await withLock(lockKey, async () => {
      const redis = getRedis();
      const dailyKey = `streak_${userKey}_${dateKey}`;
      const key = `${PREFIX.STREAK}${dailyKey}`;

      // Check if already claimed today
      const existing = await redis.get(key);
      if (existing) {
        return { success: true, rewards: [], totalCredits: 0, alreadyClaimed: true };
      }

      const rewards: Array<{ type: 'milestone' | 'daily_bonus'; credits: number; name: string }> = [];
      let totalCredits = 0;

      // Check milestone reward
      const milestone = STREAK_REWARDS.find((r) => r.days === streak);
      if (milestone) {
        rewards.push({
          type: 'milestone',
          credits: milestone.credits,
          name: milestone.name,
        });
        totalCredits += milestone.credits;

        await this.addCredits(
          userKey,
          milestone.credits,
          'bonus',
          `${milestone.name} 보상 (+${milestone.credits} 크레딧)`
        );
      }

      // Check daily bonus (every 3 days, but not on milestones)
      if (
        !milestone &&
        streak >= STREAK_DAILY_BONUS.interval &&
        streak % STREAK_DAILY_BONUS.interval === 0
      ) {
        rewards.push({
          type: 'daily_bonus',
          credits: STREAK_DAILY_BONUS.credits,
          name: `${streak}일 연속 방문 보너스`,
        });
        totalCredits += STREAK_DAILY_BONUS.credits;

        await this.addCredits(
          userKey,
          STREAK_DAILY_BONUS.credits,
          'bonus',
          `${streak}일 연속 방문 보너스 (+${STREAK_DAILY_BONUS.credits} 크레딧)`
        );
      }

      // Save streak reward record
      if (rewards.length > 0) {
        const record: StreakRewardRecord = {
          id: dailyKey,
          userKey,
          dateKey,
          streak,
          rewardType: rewards[0].type,
          credits: totalCredits,
          createdAt: new Date().toISOString(),
        };
        await redis.setex(key, TTL.STREAK, JSON.stringify(record));
      }

      return { success: true, rewards, totalCredits, alreadyClaimed: false };
    });
  }

  async getStreakRewardHistory(userKey: string, limit = 30): Promise<StreakRewardRecord[]> {
    const redis = getRedis();
    const pattern = `${PREFIX.STREAK}streak_${userKey}_*`;

    const records: StreakRewardRecord[] = [];

    let cursor = '0';
    do {
      const [newCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
      cursor = newCursor;

      if (keys.length > 0) {
        const results = await redis.mget(...keys);

        for (const data of results) {
          if (data) {
            records.push(JSON.parse(data) as StreakRewardRecord);
          }
        }
      }
    } while (cursor !== '0');

    // Sort by dateKey descending and limit
    return records.sort((a, b) => b.dateKey.localeCompare(a.dateKey)).slice(0, limit);
  }

  async getStreakRewardStats(userKey: string): Promise<{
    totalCreditsEarned: number;
    milestonesReached: number[];
    lastRewardDate: string | null;
  }> {
    const history = await this.getStreakRewardHistory(userKey, 1000);

    let totalCreditsEarned = 0;
    const milestonesReached: number[] = [];
    let lastRewardDate: string | null = null;

    for (const record of history) {
      totalCreditsEarned += record.credits;
      if (record.rewardType === 'milestone') {
        milestonesReached.push(record.streak);
      }
      if (!lastRewardDate || record.dateKey > lastRewardDate) {
        lastRewardDate = record.dateKey;
      }
    }

    return {
      totalCreditsEarned,
      milestonesReached: [...new Set(milestonesReached)].sort((a, b) => a - b),
      lastRewardDate,
    };
  }

  async hasClaimedStreakRewardToday(userKey: string, dateKey: string): Promise<boolean> {
    const redis = getRedis();
    const dailyKey = `streak_${userKey}_${dateKey}`;
    const key = `${PREFIX.STREAK}${dailyKey}`;
    const exists = await redis.exists(key);
    return exists === 1;
  }
}

/**
 * Create a new Redis credit store instance
 */
export function createCreditStore(): ICreditStore {
  return new RedisCreditStore();
}
