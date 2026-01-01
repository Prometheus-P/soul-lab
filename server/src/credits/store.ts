/**
 * Credit Store - 크레딧 관리 시스템
 *
 * 인앱결제로 구매한 크레딧을 관리하고, AI 상담 시 차감
 *
 * Security: Uses mutex for thread-safe operations and atomic writes
 * to prevent race conditions and data corruption.
 *
 * Schema versioning: Uses migration framework for data evolution.
 * Issue #14: 데이터 스키마 버저닝
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import * as mutex from '../lib/mutex.js';
import { generateTransactionId } from '../lib/secureId.js';
import {
  readEncryptedJson,
  writeEncryptedJson,
  isDataEncryptionConfigured,
} from '../lib/encryptedStorage.js';
import { logger } from '../lib/logger.js';
import {
  creditMigrations,
  CREDIT_SCHEMA_VERSION,
  createDefaultMetadata,
  type CreditSchemaMetadata,
  type CreditDataCurrent,
} from './migrations.js';

// ============================================================
// Types
// ============================================================

export interface CreditBalance {
  userKey: string;
  credits: number;
  totalPurchased: number;
  totalUsed: number;
  lastUpdated: string;
}

export interface CreditTransaction {
  id: string;
  userKey: string;
  type: 'purchase' | 'use' | 'refund' | 'bonus';
  amount: number;
  balance: number;
  description: string;
  orderId?: string;
  sku?: string;
  timestamp: string;
}

export interface PurchaseRecord {
  orderId: string;
  userKey: string;
  sku: string;
  credits: number;
  amount: number;
  status: 'pending' | 'completed' | 'refunded';
  createdAt: string;
  completedAt?: string;
}

// ============================================================
// Credit Products Configuration
// ============================================================

export interface CreditProduct {
  sku: string;
  name: string;
  nameKorean: string;
  credits: number;
  price: number; // KRW
  bonus?: number; // 보너스 크레딧
}

export const CREDIT_PRODUCTS: CreditProduct[] = [
  {
    sku: 'credit_10',
    name: 'Starter Pack',
    nameKorean: '체험팩',
    credits: 10,
    price: 1000,
  },
  {
    sku: 'credit_50',
    name: 'Basic Pack',
    nameKorean: '기본팩',
    credits: 50,
    price: 4500,
    bonus: 5, // +5 보너스
  },
  {
    sku: 'credit_150',
    name: 'Premium Pack',
    nameKorean: '프리미엄팩',
    credits: 150,
    price: 12000,
    bonus: 20, // +20 보너스
  },
  {
    sku: 'credit_500',
    name: 'Ultimate Pack',
    nameKorean: '얼티밋팩',
    credits: 500,
    price: 35000,
    bonus: 100, // +100 보너스
  },
];

// ============================================================
// Credit Costs Configuration
// ============================================================

export interface CreditCost {
  action: string;
  actionKorean: string;
  cost: number;
}

export const CREDIT_COSTS: Record<string, CreditCost> = {
  daily_fortune: {
    action: 'daily_fortune',
    actionKorean: '일일 운세 AI 해석',
    cost: 1,
  },
  tarot_interpret: {
    action: 'tarot_interpret',
    actionKorean: '타로 AI 해석',
    cost: 2,
  },
  ai_chat: {
    action: 'ai_chat',
    actionKorean: 'AI 상담 1회',
    cost: 1,
  },
  synastry_analysis: {
    action: 'synastry_analysis',
    actionKorean: '궁합 AI 분석',
    cost: 3,
  },
  detailed_report: {
    action: 'detailed_report',
    actionKorean: '상세 리포트',
    cost: 5,
  },
};

// ============================================================
// Referral Reward Configuration
// ============================================================

export interface ReferralRewardConfig {
  inviterCredits: number;
  inviteeCredits: number;
}

export const REFERRAL_REWARDS: ReferralRewardConfig = {
  inviterCredits: 5, // 초대자 보상
  inviteeCredits: 3, // 피초대자 보상
};

export interface ReferralRecord {
  id: string;
  inviterKey: string;
  inviteeKey: string;
  dateKey: string;
  inviterCredited: boolean;
  inviteeCredited: boolean;
  createdAt: string;
}

// ============================================================
// Streak Reward Configuration
// ============================================================

export interface StreakRewardTier {
  days: number;
  credits: number;
  name: string;
}

export const STREAK_REWARDS: StreakRewardTier[] = [
  { days: 7, credits: 3, name: '7일 연속 방문' },
  { days: 14, credits: 5, name: '14일 연속 방문' },
  { days: 21, credits: 10, name: '21일 연속 방문' },
  { days: 30, credits: 20, name: '30일 연속 방문' },
];

// 3일마다 보너스 크레딧
export const STREAK_DAILY_BONUS = {
  interval: 3, // 3일마다
  credits: 1,  // +1 크레딧
};

export interface StreakRewardRecord {
  id: string;
  userKey: string;
  dateKey: string;
  streak: number;
  rewardType: 'milestone' | 'daily_bonus';
  credits: number;
  createdAt: string;
}

// ============================================================
// Credit Store Class
// ============================================================

export class CreditStore {
  private dataDir: string;
  private schemaFile: string;
  private balancesFile: string;
  private transactionsFile: string;
  private purchasesFile: string;
  private referralsFile: string;
  private streakRewardsFile: string;

  private schemaVersion: number;
  private balances: Map<string, CreditBalance> = new Map();
  private transactions: CreditTransaction[] = [];
  private purchases: Map<string, PurchaseRecord> = new Map();
  private referrals: Map<string, ReferralRecord> = new Map();
  private streakRewards: Map<string, StreakRewardRecord> = new Map();

  constructor(dataDir: string) {
    this.dataDir = dataDir;
    this.schemaFile = join(dataDir, 'credit_schema.json');
    this.balancesFile = join(dataDir, 'credit_balances.json');
    this.transactionsFile = join(dataDir, 'credit_transactions.json');
    this.purchasesFile = join(dataDir, 'credit_purchases.json');
    this.referralsFile = join(dataDir, 'credit_referrals.json');
    this.streakRewardsFile = join(dataDir, 'credit_streak_rewards.json');
    this.schemaVersion = CREDIT_SCHEMA_VERSION;
    this.load();
  }

  /**
   * Get current schema version.
   */
  getSchemaVersion(): number {
    return this.schemaVersion;
  }

  private loadSchemaMetadata(): CreditSchemaMetadata {
    try {
      if (existsSync(this.schemaFile)) {
        const raw = readFileSync(this.schemaFile, 'utf-8');
        return JSON.parse(raw) as CreditSchemaMetadata;
      }
    } catch (err) {
      logger.error({ err }, 'credit_schema_load_error');
    }
    return createDefaultMetadata();
  }

  private saveSchemaMetadata(): void {
    const metadata: CreditSchemaMetadata = {
      version: this.schemaVersion,
      migratedAt: new Date().toISOString(),
      fileVersions: {
        balances: this.schemaVersion,
        transactions: this.schemaVersion,
        purchases: this.schemaVersion,
        referrals: this.schemaVersion,
        streakRewards: this.schemaVersion,
      },
    };
    writeFileSync(this.schemaFile, JSON.stringify(metadata, null, 2), 'utf-8');
  }

  private load(): void {
    try {
      if (!existsSync(this.dataDir)) {
        mkdirSync(this.dataDir, { recursive: true });
      }

      // Load schema metadata to check for migrations
      const metadata = this.loadSchemaMetadata();
      const needsMigration = metadata.version < CREDIT_SCHEMA_VERSION;

      // Load with encrypted storage support (handles both encrypted and plaintext files)
      const balancesData = readEncryptedJson<Record<string, CreditBalance>>(
        this.balancesFile,
        {}
      );
      this.balances = new Map(Object.entries(balancesData));

      this.transactions = readEncryptedJson<CreditTransaction[]>(
        this.transactionsFile,
        []
      );

      const purchasesData = readEncryptedJson<Record<string, PurchaseRecord>>(
        this.purchasesFile,
        {}
      );
      this.purchases = new Map(Object.entries(purchasesData));

      const referralsData = readEncryptedJson<Record<string, ReferralRecord>>(
        this.referralsFile,
        {}
      );
      this.referrals = new Map(Object.entries(referralsData));

      const streakData = readEncryptedJson<Record<string, StreakRewardRecord>>(
        this.streakRewardsFile,
        {}
      );
      this.streakRewards = new Map(Object.entries(streakData));

      // Run migrations if needed
      if (needsMigration) {
        this.runMigrations(metadata.version);
      }
    } catch (e) {
      logger.error({ err: e }, 'credit_store_load_error');
    }
  }

  private runMigrations(fromVersion: number): void {
    try {
      // Combine all data for migration
      const combinedData: CreditDataCurrent = {
        balances: Object.fromEntries(this.balances),
        transactions: this.transactions,
        purchases: Object.fromEntries(this.purchases),
        referrals: Object.fromEntries(this.referrals),
        streakRewards: Object.fromEntries(this.streakRewards),
      };

      // Run migrations
      const result = creditMigrations.migrate({
        version: fromVersion,
        migratedAt: null,
        data: combinedData,
      });

      if (result.wasModified) {
        // Update in-memory data
        this.balances = new Map(Object.entries(result.data.data.balances));
        this.transactions = result.data.data.transactions;
        this.purchases = new Map(Object.entries(result.data.data.purchases));
        this.referrals = new Map(Object.entries(result.data.data.referrals));
        this.streakRewards = new Map(Object.entries(result.data.data.streakRewards));
        this.schemaVersion = result.data.version;

        // Save migrated data
        this.save();
        this.saveSchemaMetadata();

        logger.info(
          {
            fromVersion,
            toVersion: this.schemaVersion,
            migrationsApplied: result.migrationsApplied,
          },
          'credit_store_migrated'
        );
      }
    } catch (err) {
      logger.error({ fromVersion, err }, 'credit_store_migration_error');
    }
  }

  private save(): void {
    try {
      const dir = dirname(this.balancesFile);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }

      // Use encrypted storage for sensitive financial data
      // Automatically encrypts if DATA_ENCRYPTION_KEY is configured
      writeEncryptedJson(
        this.balancesFile,
        Object.fromEntries(this.balances)
      );
      writeEncryptedJson(
        this.transactionsFile,
        this.transactions.slice(-10000) // 최근 10000건만 유지
      );
      writeEncryptedJson(
        this.purchasesFile,
        Object.fromEntries(this.purchases)
      );
      writeEncryptedJson(
        this.referralsFile,
        Object.fromEntries(this.referrals)
      );
      writeEncryptedJson(
        this.streakRewardsFile,
        Object.fromEntries(this.streakRewards)
      );
    } catch (e) {
      console.error('CreditStore save error:', e);
    }
  }

  /**
   * Get mutex key for user-specific locking
   */
  private getMutexKey(userKey: string): string {
    return `credit:${userKey}`;
  }

  // ----------------------------------------------------------
  // Balance Operations
  // ----------------------------------------------------------

  /**
   * 사용자 크레딧 잔액 조회
   */
  getBalance(userKey: string): CreditBalance {
    const existing = this.balances.get(userKey);
    if (existing) return existing;

    const newBalance: CreditBalance = {
      userKey,
      credits: 0,
      totalPurchased: 0,
      totalUsed: 0,
      lastUpdated: new Date().toISOString(),
    };
    this.balances.set(userKey, newBalance);
    this.save();
    return newBalance;
  }

  /**
   * 크레딧이 충분한지 확인
   */
  hasEnoughCredits(userKey: string, amount: number): boolean {
    const balance = this.getBalance(userKey);
    return balance.credits >= amount;
  }

  // ----------------------------------------------------------
  // Credit Operations
  // ----------------------------------------------------------

  /**
   * 크레딧 추가 (구매, 보너스 등)
   */
  addCredits(
    userKey: string,
    amount: number,
    type: 'purchase' | 'bonus' | 'refund',
    description: string,
    orderId?: string,
    sku?: string
  ): CreditTransaction {
    const balance = this.getBalance(userKey);
    balance.credits += amount;
    if (type === 'purchase') {
      balance.totalPurchased += amount;
    }
    balance.lastUpdated = new Date().toISOString();

    const transaction: CreditTransaction = {
      id: generateTransactionId(),
      userKey,
      type,
      amount,
      balance: balance.credits,
      description,
      orderId,
      sku,
      timestamp: new Date().toISOString(),
    };

    this.transactions.push(transaction);
    this.balances.set(userKey, balance);
    this.save();

    return transaction;
  }

  /**
   * 크레딧 사용 (차감) - 동기 버전 (내부용)
   * @deprecated Use useCreditsAsync for thread-safe operations
   */
  useCredits(
    userKey: string,
    amount: number,
    description: string
  ): { success: boolean; transaction?: CreditTransaction; error?: string } {
    const balance = this.getBalance(userKey);

    if (balance.credits < amount) {
      return {
        success: false,
        error: 'insufficient_credits',
      };
    }

    balance.credits -= amount;
    balance.totalUsed += amount;
    balance.lastUpdated = new Date().toISOString();

    const transaction: CreditTransaction = {
      id: generateTransactionId(),
      userKey,
      type: 'use',
      amount: -amount,
      balance: balance.credits,
      description,
      timestamp: new Date().toISOString(),
    };

    this.transactions.push(transaction);
    this.balances.set(userKey, balance);
    this.save();

    return { success: true, transaction };
  }

  /**
   * 크레딧 사용 (차감) - 비동기 버전 (뮤텍스 적용)
   * Thread-safe credit usage with mutex locking
   */
  async useCreditsAsync(
    userKey: string,
    amount: number,
    description: string
  ): Promise<{ success: boolean; transaction?: CreditTransaction; error?: string }> {
    return mutex.withLock(this.getMutexKey(userKey), () => {
      return this.useCredits(userKey, amount, description);
    });
  }

  // ----------------------------------------------------------
  // Purchase Operations
  // ----------------------------------------------------------

  /**
   * 구매 기록 생성 (결제 시작)
   */
  createPurchase(
    orderId: string,
    userKey: string,
    sku: string,
    amount: number
  ): PurchaseRecord {
    const product = CREDIT_PRODUCTS.find(p => p.sku === sku);
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

    this.purchases.set(orderId, purchase);
    this.save();

    return purchase;
  }

  /**
   * 구매 완료 처리 (상품 지급)
   */
  completePurchase(orderId: string): {
    success: boolean;
    purchase?: PurchaseRecord;
    transaction?: CreditTransaction;
    error?: string;
  } {
    const purchase = this.purchases.get(orderId);

    if (!purchase) {
      return { success: false, error: 'purchase_not_found' };
    }

    if (purchase.status === 'completed') {
      return { success: false, error: 'already_completed' };
    }

    if (purchase.status === 'refunded') {
      return { success: false, error: 'already_refunded' };
    }

    // 크레딧 지급
    const product = CREDIT_PRODUCTS.find(p => p.sku === purchase.sku);
    const productName = product?.nameKorean || purchase.sku;
    const description = `${productName} 구매 (+${purchase.credits} 크레딧)`;

    const transaction = this.addCredits(
      purchase.userKey,
      purchase.credits,
      'purchase',
      description,
      orderId,
      purchase.sku
    );

    // 구매 상태 업데이트
    purchase.status = 'completed';
    purchase.completedAt = new Date().toISOString();
    this.purchases.set(orderId, purchase);
    this.save();

    return { success: true, purchase, transaction };
  }

  /**
   * 구매 조회
   */
  getPurchase(orderId: string): PurchaseRecord | undefined {
    return this.purchases.get(orderId);
  }

  /**
   * 사용자의 구매 이력 조회
   */
  getUserPurchases(userKey: string): PurchaseRecord[] {
    return Array.from(this.purchases.values())
      .filter(p => p.userKey === userKey)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  /**
   * 미완료 구매 조회 (복원용)
   */
  getPendingPurchases(userKey: string): PurchaseRecord[] {
    return Array.from(this.purchases.values())
      .filter(p => p.userKey === userKey && p.status === 'pending');
  }

  // ----------------------------------------------------------
  // Transaction History
  // ----------------------------------------------------------

  /**
   * 사용자 트랜잭션 이력 조회
   */
  getTransactionHistory(userKey: string, limit: number = 50): CreditTransaction[] {
    return this.transactions
      .filter(t => t.userKey === userKey)
      .slice(-limit)
      .reverse();
  }

  // ----------------------------------------------------------
  // Referral Reward Operations
  // ----------------------------------------------------------

  /**
   * 레퍼럴 보상 청구
   * - 초대자와 피초대자 모두 크레딧 보상
   * - 같은 쌍은 하루에 한 번만 보상
   */
  claimReferralReward(
    inviterKey: string,
    inviteeKey: string,
    dateKey: string,
    claimerKey: string
  ): {
    success: boolean;
    credits?: number;
    alreadyClaimed?: boolean;
    error?: string;
    transaction?: CreditTransaction;
  } {
    // 동일 인물 체크
    if (inviterKey === inviteeKey) {
      return { success: false, error: 'same_user' };
    }

    // 청구자가 유효한지 확인 (초대자 또는 피초대자만 가능)
    if (claimerKey !== inviterKey && claimerKey !== inviteeKey) {
      return { success: false, error: 'unauthorized_claimer' };
    }

    const referralId = `ref_${inviterKey}_${inviteeKey}_${dateKey}`;
    let referral = this.referrals.get(referralId);

    // 새 레퍼럴 레코드 생성
    if (!referral) {
      referral = {
        id: referralId,
        inviterKey,
        inviteeKey,
        dateKey,
        inviterCredited: false,
        inviteeCredited: false,
        createdAt: new Date().toISOString(),
      };
      this.referrals.set(referralId, referral);
    }

    const isInviter = claimerKey === inviterKey;
    const alreadyClaimed = isInviter ? referral.inviterCredited : referral.inviteeCredited;

    if (alreadyClaimed) {
      return { success: true, credits: 0, alreadyClaimed: true };
    }

    // 보상 크레딧 결정
    const credits = isInviter
      ? REFERRAL_REWARDS.inviterCredits
      : REFERRAL_REWARDS.inviteeCredits;

    // 크레딧 지급
    const description = isInviter
      ? `친구 초대 보상 (+${credits} 크레딧)`
      : `초대 수락 보상 (+${credits} 크레딧)`;

    const transaction = this.addCredits(claimerKey, credits, 'bonus', description);

    // 보상 완료 표시
    if (isInviter) {
      referral.inviterCredited = true;
    } else {
      referral.inviteeCredited = true;
    }
    this.referrals.set(referralId, referral);
    this.save();

    return { success: true, credits, alreadyClaimed: false, transaction };
  }

  /**
   * 레퍼럴 보상 상태 조회
   */
  getReferralStatus(
    inviterKey: string,
    inviteeKey: string,
    dateKey: string
  ): ReferralRecord | null {
    const referralId = `ref_${inviterKey}_${inviteeKey}_${dateKey}`;
    return this.referrals.get(referralId) || null;
  }

  /**
   * 사용자의 레퍼럴 통계 조회
   */
  getReferralStats(userKey: string): {
    totalInvited: number;
    totalCreditsEarned: number;
  } {
    let totalInvited = 0;
    let totalCreditsEarned = 0;

    for (const referral of this.referrals.values()) {
      if (referral.inviterKey === userKey && referral.inviterCredited) {
        totalInvited++;
        totalCreditsEarned += REFERRAL_REWARDS.inviterCredits;
      }
      if (referral.inviteeKey === userKey && referral.inviteeCredited) {
        totalCreditsEarned += REFERRAL_REWARDS.inviteeCredits;
      }
    }

    return { totalInvited, totalCreditsEarned };
  }

  // ----------------------------------------------------------
  // Streak Reward Operations
  // ----------------------------------------------------------

  /**
   * 스트릭 보상 청구
   * - 마일스톤 보상 (7, 14, 21, 30일)
   * - 데일리 보너스 (3일마다 +1)
   */
  claimStreakReward(
    userKey: string,
    dateKey: string,
    streak: number
  ): {
    success: boolean;
    rewards: Array<{ type: 'milestone' | 'daily_bonus'; credits: number; name: string }>;
    totalCredits: number;
    alreadyClaimed: boolean;
  } {
    const rewards: Array<{ type: 'milestone' | 'daily_bonus'; credits: number; name: string }> = [];
    let totalCredits = 0;

    // 오늘 이미 보상을 받았는지 확인
    const dailyKey = `streak_${userKey}_${dateKey}`;
    if (this.streakRewards.has(dailyKey)) {
      return { success: true, rewards: [], totalCredits: 0, alreadyClaimed: true };
    }

    // 마일스톤 보상 확인
    const milestone = STREAK_REWARDS.find(r => r.days === streak);
    if (milestone) {
      rewards.push({
        type: 'milestone',
        credits: milestone.credits,
        name: milestone.name,
      });
      totalCredits += milestone.credits;

      // 트랜잭션 기록
      this.addCredits(
        userKey,
        milestone.credits,
        'bonus',
        `${milestone.name} 보상 (+${milestone.credits} 크레딧)`
      );
    }

    // 3일 간격 데일리 보너스 확인
    if (streak >= STREAK_DAILY_BONUS.interval && streak % STREAK_DAILY_BONUS.interval === 0) {
      // 마일스톤과 겹치지 않는 경우에만
      if (!milestone) {
        rewards.push({
          type: 'daily_bonus',
          credits: STREAK_DAILY_BONUS.credits,
          name: `${streak}일 연속 방문 보너스`,
        });
        totalCredits += STREAK_DAILY_BONUS.credits;

        // 트랜잭션 기록
        this.addCredits(
          userKey,
          STREAK_DAILY_BONUS.credits,
          'bonus',
          `${streak}일 연속 방문 보너스 (+${STREAK_DAILY_BONUS.credits} 크레딧)`
        );
      }
    }

    // 일일 보상 청구 기록 (중복 방지)
    if (rewards.length > 0) {
      const dailyRecord: StreakRewardRecord = {
        id: dailyKey,
        userKey,
        dateKey,
        streak,
        rewardType: rewards[0].type,
        credits: totalCredits,
        createdAt: new Date().toISOString(),
      };
      this.streakRewards.set(dailyKey, dailyRecord);
      this.save();
    }

    return { success: true, rewards, totalCredits, alreadyClaimed: false };
  }

  /**
   * 스트릭 보상 히스토리 조회
   */
  getStreakRewardHistory(userKey: string, limit: number = 30): StreakRewardRecord[] {
    return Array.from(this.streakRewards.values())
      .filter(r => r.userKey === userKey)
      .sort((a, b) => b.dateKey.localeCompare(a.dateKey))
      .slice(0, limit);
  }

  /**
   * 스트릭 보상 통계 조회
   */
  getStreakRewardStats(userKey: string): {
    totalCreditsEarned: number;
    milestonesReached: number[];
    lastRewardDate: string | null;
  } {
    let totalCreditsEarned = 0;
    const milestonesReached: number[] = [];
    let lastRewardDate: string | null = null;
    let lastCreatedAt: string | null = null;

    for (const record of this.streakRewards.values()) {
      if (record.userKey === userKey) {
        totalCreditsEarned += record.credits;
        if (record.rewardType === 'milestone') {
          milestonesReached.push(record.streak);
        }
        // dateKey로 최신 날짜 비교 (createdAt 대신 dateKey 직접 비교)
        if (!lastRewardDate || record.dateKey > lastRewardDate) {
          lastRewardDate = record.dateKey;
        }
      }
    }

    return {
      totalCreditsEarned,
      milestonesReached: [...new Set(milestonesReached)].sort((a, b) => a - b),
      lastRewardDate,
    };
  }

  /**
   * 오늘 보상을 받았는지 확인
   */
  hasClaimedStreakRewardToday(userKey: string, dateKey: string): boolean {
    const dailyKey = `streak_${userKey}_${dateKey}`;
    return this.streakRewards.has(dailyKey);
  }
}

// ============================================================
// Helper Functions
// ============================================================

/**
 * SKU로 상품 정보 조회
 */
export function getProductBySku(sku: string): CreditProduct | undefined {
  return CREDIT_PRODUCTS.find(p => p.sku === sku);
}

/**
 * 액션별 크레딧 비용 조회
 */
export function getCreditCost(action: string): number {
  return CREDIT_COSTS[action]?.cost || 0;
}

/**
 * 전체 상품 목록 조회
 */
export function getAllProducts(): CreditProduct[] {
  return CREDIT_PRODUCTS;
}

/**
 * 전체 비용 정보 조회
 */
export function getAllCosts(): Record<string, CreditCost> {
  return CREDIT_COSTS;
}

/**
 * 레퍼럴 보상 설정 조회
 */
export function getReferralRewards(): ReferralRewardConfig {
  return REFERRAL_REWARDS;
}

/**
 * 스트릭 보상 설정 조회
 */
export function getStreakRewardConfig(): {
  milestones: StreakRewardTier[];
  dailyBonus: typeof STREAK_DAILY_BONUS;
} {
  return {
    milestones: STREAK_REWARDS,
    dailyBonus: STREAK_DAILY_BONUS,
  };
}
