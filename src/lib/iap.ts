/**
 * In-App Purchase (IAP) - 토스 인앱결제 연동
 *
 * @apps-in-toss/web-framework SDK의 IAP 기능을 래핑
 * 개발 환경에서는 모킹으로 동작
 */

import { getAuthHeaders } from './api-signing.js';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787';

// 개발 모드 체크
const isDev = import.meta.env.DEV;

// ============================================================
// Types
// ============================================================

export interface CreditProduct {
  sku: string;
  name: string;
  nameKorean: string;
  credits: number;
  price: number;
  bonus?: number;
  totalCredits: number;
  priceFormatted: string;
}

export interface CreditBalance {
  credits: number;
  totalPurchased: number;
  totalUsed: number;
  lastUpdated: string;
}

export interface PurchaseResult {
  success: boolean;
  orderId?: string;
  credits?: number;
  error?: string;
}

interface IAPModule {
  createOneTimePurchaseOrder: (options: {
    options: {
      sku: string;
      processProductGrant?: (params: { orderId: string }) => Promise<boolean>;
    };
    onEvent: (event: { type: string; data?: { orderId?: string } }) => void;
    onError: (error: unknown) => void;
  }) => () => void;
  getPendingOrders: () => Promise<{ orders?: Array<{ orderId: string }> }>;
  completeProductGrant: (params: { orderId: string }) => Promise<void>;
  getCompletedOrRefundedOrders: () => Promise<{ orders?: Array<{ orderId: string; sku: string }> }>;
}

// ============================================================
// IAP Module Loader
// ============================================================

let iapModule: IAPModule | null = null;

async function getIAPModule(): Promise<IAPModule | null> {
  if (iapModule) return iapModule;

  try {
    // 동적으로 @apps-in-toss/web-framework에서 IAP 모듈 로드 시도
    const module = await import('@apps-in-toss/web-framework');
    if ('IAP' in module && module.IAP) {
      iapModule = module.IAP as IAPModule;
      console.log('IAP module loaded from SDK');
      return iapModule;
    }
  } catch (e) {
    console.log('IAP module not available, using mock');
  }

  return null;
}

// ============================================================
// API Functions
// ============================================================

/**
 * 복채 상품 목록 조회
 */
export async function getProducts(): Promise<CreditProduct[]> {
  try {
    const res = await fetch(`${API_BASE}/api/credits/products`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const data = await res.json();
    return data.products || [];
  } catch (e) {
    console.error('Failed to get products:', e);
    return [];
  }
}

/**
 * 복채 잔액 조회
 */
export async function getBalance(userKey: string): Promise<CreditBalance | null> {
  try {
    const authHeaders = await getAuthHeaders(userKey);
    const res = await fetch(
      `${API_BASE}/api/credits/balance?userKey=${encodeURIComponent(userKey)}`,
      {
        headers: authHeaders,
      },
    );
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const data = await res.json();
    return data.balance || null;
  } catch (e) {
    console.error('Failed to get balance:', e);
    return null;
  }
}

/**
 * 복채 사용 (차감)
 */
export async function consumeCredits(
  userKey: string,
  action: string,
  description?: string,
): Promise<{ success: boolean; remainingCredits?: number; error?: string }> {
  try {
    const authHeaders = await getAuthHeaders(userKey);
    const res = await fetch(`${API_BASE}/api/credits/use`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders },
      body: JSON.stringify({ userKey, action, description }),
    });
    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error || 'use_failed' };
    }

    return { success: true, remainingCredits: data.remainingCredits };
  } catch (e) {
    console.error('Failed to use credits:', e);
    return { success: false, error: 'network_error' };
  }
}

/**
 * 복채 충분 여부 확인
 */
export async function checkCredits(
  userKey: string,
  action: string,
): Promise<{ hasEnough: boolean; cost: number; currentBalance: number; shortfall: number }> {
  try {
    const authHeaders = await getAuthHeaders(userKey);
    const res = await fetch(`${API_BASE}/api/credits/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders },
      body: JSON.stringify({ userKey, action }),
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const data = await res.json();
    return {
      hasEnough: data.hasEnough || false,
      cost: data.cost || 0,
      currentBalance: data.currentBalance || 0,
      shortfall: data.shortfall || 0,
    };
  } catch (e) {
    console.error('Failed to check credits:', e);
    return { hasEnough: false, cost: 0, currentBalance: 0, shortfall: 0 };
  }
}

// ============================================================
// IAP Functions
// ============================================================

/**
 * 주문 ID 생성
 */
function generateOrderId(): string {
  return `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * 서버에 구매 시작 알림
 */
async function notifyPurchaseStart(
  userKey: string,
  orderId: string,
  sku: string,
  amount: number,
): Promise<boolean> {
  try {
    const authHeaders = await getAuthHeaders(userKey);
    const res = await fetch(`${API_BASE}/api/credits/purchase/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders },
      body: JSON.stringify({ userKey, orderId, sku, amount }),
    });
    return res.ok;
  } catch (e) {
    console.error('Failed to notify purchase start:', e);
    return false;
  }
}

/**
 * 서버에 구매 완료 알림 (복채 지급)
 */
async function notifyPurchaseComplete(orderId: string): Promise<{
  success: boolean;
  newBalance?: number;
  credits?: number;
}> {
  try {
    const res = await fetch(`${API_BASE}/api/credits/purchase/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    });
    const data = await res.json();

    if (!res.ok) {
      return { success: false };
    }

    return {
      success: true,
      newBalance: data.newBalance,
      credits: data.purchase?.credits,
    };
  } catch (e) {
    console.error('Failed to notify purchase complete:', e);
    return { success: false };
  }
}

/**
 * 인앱결제 구매 요청
 */
export async function purchaseCredits(
  userKey: string,
  product: CreditProduct,
): Promise<PurchaseResult> {
  const orderId = generateOrderId();

  // 1. 서버에 구매 시작 알림
  const startOk = await notifyPurchaseStart(userKey, orderId, product.sku, product.price);
  if (!startOk) {
    return { success: false, error: 'purchase_start_failed' };
  }

  // IAP 모듈 로드 시도
  const iap = await getIAPModule();

  if (iap) {
    // 실제 IAP SDK 사용
    return new Promise((resolve) => {
      let cleanup: (() => void) | undefined;

      try {
        cleanup = iap.createOneTimePurchaseOrder({
          options: {
            sku: product.sku,
            processProductGrant: async ({ orderId: completedOrderId }: { orderId: string }) => {
              console.log('processProductGrant called:', completedOrderId);
              const result = await notifyPurchaseComplete(completedOrderId);
              if (result.success) {
                console.log('Credits granted:', result.credits);
                return true;
              } else {
                console.error('Failed to grant credits');
                return false;
              }
            },
          },
          onEvent: (event: { type: string; data?: { orderId?: string } }) => {
            console.log('IAP event:', event);
            if (event.type === 'success') {
              cleanup?.();
              resolve({
                success: true,
                orderId: event.data?.orderId || orderId,
                credits: product.totalCredits,
              });
            }
          },
          onError: (error: unknown) => {
            console.error('IAP error:', error);
            cleanup?.();
            resolve({ success: false, error: 'iap_error' });
          },
        });
      } catch (e) {
        console.error('IAP exception:', e);
        resolve({ success: false, error: 'iap_exception' });
      }
    });
  } else if (isDev) {
    // 개발 모드: 모킹으로 즉시 결제 완료 처리
    console.log('[DEV] Mock IAP purchase for:', product.sku);

    // 사용자에게 확인 요청
    const confirmed = window.confirm(
      `[개발 모드] 결제를 시뮬레이션합니다.\n\n` +
        `상품: ${product.nameKorean}\n` +
        `복채: ${product.totalCredits}\n` +
        `가격: ${product.priceFormatted}\n\n` +
        `결제를 진행하시겠습니까?`,
    );

    if (!confirmed) {
      return { success: false, error: 'user_cancelled' };
    }

    // 서버에 구매 완료 처리
    const result = await notifyPurchaseComplete(orderId);

    if (result.success) {
      return {
        success: true,
        orderId,
        credits: product.totalCredits,
      };
    } else {
      return { success: false, error: 'complete_failed' };
    }
  } else {
    // 프로덕션에서 IAP 불가
    console.error('IAP module not available in production');
    return { success: false, error: 'iap_not_available' };
  }
}

/**
 * 미결 구매 복원
 */
export async function restorePendingPurchases(userKey: string): Promise<number> {
  const iap = await getIAPModule();

  if (iap) {
    try {
      const pendingOrders = await iap.getPendingOrders();

      if (!pendingOrders?.orders?.length) {
        return 0;
      }

      let restored = 0;

      for (const order of pendingOrders.orders) {
        const result = await notifyPurchaseComplete(order.orderId);

        if (result.success) {
          await iap.completeProductGrant({ orderId: order.orderId });
          restored++;
        }
      }

      return restored;
    } catch (e) {
      console.error('Failed to restore pending purchases:', e);
      return 0;
    }
  } else {
    // IAP 없으면 서버에서 pending 조회
    try {
      const res = await fetch(
        `${API_BASE}/api/credits/pending?userKey=${encodeURIComponent(userKey)}`,
      );
      const data = await res.json();

      if (!data.pending?.length) {
        return 0;
      }

      let restored = 0;

      for (const purchase of data.pending) {
        const result = await notifyPurchaseComplete(purchase.orderId);
        if (result.success) {
          restored++;
        }
      }

      return restored;
    } catch (e) {
      console.error('Failed to restore from server:', e);
      return 0;
    }
  }
}

/**
 * 완료된 구매 내역 조회
 */
export async function getCompletedPurchases(): Promise<
  Array<{
    orderId: string;
    sku: string;
  }>
> {
  const iap = await getIAPModule();

  if (iap) {
    try {
      const result = await iap.getCompletedOrRefundedOrders();
      return result?.orders || [];
    } catch (e) {
      console.error('Failed to get completed purchases:', e);
      return [];
    }
  } else {
    // IAP 없으면 빈 배열 반환
    return [];
  }
}

// ============================================================
// Credit Action Constants
// ============================================================

export const CREDIT_ACTIONS = {
  DAILY_FORTUNE: 'daily_fortune',
  TAROT_INTERPRET: 'tarot_interpret',
  AI_CHAT: 'ai_chat',
  SYNASTRY_ANALYSIS: 'synastry_analysis',
  DETAILED_REPORT: 'detailed_report',
} as const;

export type CreditAction = (typeof CREDIT_ACTIONS)[keyof typeof CREDIT_ACTIONS];

// ============================================================
// Referral Reward Functions
// ============================================================

export interface ReferralRewardConfig {
  inviterCredits: number;
  inviteeCredits: number;
}

export interface ReferralClaimResult {
  success: boolean;
  credits?: number;
  alreadyClaimed?: boolean;
  newBalance?: number;
  error?: string;
}

export interface ReferralStats {
  totalInvited: number;
  totalCreditsEarned: number;
}

/**
 * 레퍼럴 보상 설정 조회
 */
export async function getReferralRewards(): Promise<ReferralRewardConfig | null> {
  try {
    const res = await fetch(`${API_BASE}/api/credits/referral/rewards`);
    const data = await res.json();
    return data.rewards || null;
  } catch (e) {
    console.error('Failed to get referral rewards:', e);
    return null;
  }
}

/**
 * 레퍼럴 보상 청구
 * - 초대자와 피초대자 모두 호출 가능
 * - 각자 한 번씩만 보상 받음
 */
export async function claimReferralReward(
  inviterKey: string,
  inviteeKey: string,
  dateKey: string,
  claimerKey: string,
): Promise<ReferralClaimResult> {
  try {
    const authHeaders = await getAuthHeaders(claimerKey);
    const res = await fetch(`${API_BASE}/api/credits/referral/claim`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders },
      body: JSON.stringify({ inviterKey, inviteeKey, dateKey, claimerKey }),
    });
    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error || 'claim_failed' };
    }

    return {
      success: true,
      credits: data.credits,
      alreadyClaimed: data.alreadyClaimed,
      newBalance: data.newBalance,
    };
  } catch (e) {
    console.error('Failed to claim referral reward:', e);
    return { success: false, error: 'network_error' };
  }
}

/**
 * 레퍼럴 통계 조회
 */
export async function getReferralStats(userKey: string): Promise<ReferralStats | null> {
  try {
    const authHeaders = await getAuthHeaders(userKey);
    const res = await fetch(
      `${API_BASE}/api/credits/referral/stats?userKey=${encodeURIComponent(userKey)}`,
      { headers: authHeaders },
    );
    const data = await res.json();
    return data.stats || null;
  } catch (e) {
    console.error('Failed to get referral stats:', e);
    return null;
  }
}

// ============================================================
// Streak Reward Functions
// ============================================================

export interface StreakRewardTier {
  days: number;
  credits: number;
  name: string;
}

export interface StreakRewardConfig {
  milestones: StreakRewardTier[];
  dailyBonus: {
    interval: number;
    credits: number;
  };
}

export interface StreakReward {
  type: 'milestone' | 'daily_bonus';
  credits: number;
  name: string;
}

export interface StreakClaimResult {
  success: boolean;
  rewards: StreakReward[];
  totalCredits: number;
  alreadyClaimed: boolean;
  newBalance?: number;
}

export interface StreakRewardStats {
  totalCreditsEarned: number;
  milestonesReached: number[];
  lastRewardDate: string | null;
}

/**
 * 스트릭 보상 설정 조회
 */
export async function getStreakRewardConfig(): Promise<StreakRewardConfig | null> {
  try {
    const res = await fetch(`${API_BASE}/api/credits/streak/config`);
    const data = await res.json();
    return data.config || null;
  } catch (e) {
    console.error('Failed to get streak reward config:', e);
    return null;
  }
}

/**
 * 스트릭 보상 청구
 */
export async function claimStreakReward(
  userKey: string,
  dateKey: string,
  streak: number,
): Promise<StreakClaimResult> {
  try {
    const authHeaders = await getAuthHeaders(userKey);
    const res = await fetch(`${API_BASE}/api/credits/streak/claim`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders },
      body: JSON.stringify({ userKey, dateKey, streak }),
    });
    const data = await res.json();

    if (!res.ok) {
      return { success: false, rewards: [], totalCredits: 0, alreadyClaimed: false };
    }

    return {
      success: true,
      rewards: data.rewards || [],
      totalCredits: data.totalCredits || 0,
      alreadyClaimed: data.alreadyClaimed || false,
      newBalance: data.newBalance,
    };
  } catch (e) {
    console.error('Failed to claim streak reward:', e);
    return { success: false, rewards: [], totalCredits: 0, alreadyClaimed: false };
  }
}

/**
 * 오늘 스트릭 보상 수령 여부 확인
 */
export async function hasClaimedStreakToday(userKey: string, dateKey: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${API_BASE}/api/credits/streak/status?userKey=${encodeURIComponent(userKey)}&dateKey=${encodeURIComponent(dateKey)}`,
    );
    const data = await res.json();
    return data.claimed || false;
  } catch (e) {
    console.error('Failed to check streak claim status:', e);
    return false;
  }
}

/**
 * 스트릭 보상 통계 조회
 */
export async function getStreakRewardStats(userKey: string): Promise<StreakRewardStats | null> {
  try {
    const authHeaders = await getAuthHeaders(userKey);
    const res = await fetch(
      `${API_BASE}/api/credits/streak/stats?userKey=${encodeURIComponent(userKey)}`,
      { headers: authHeaders },
    );
    const data = await res.json();
    return data.stats || null;
  } catch (e) {
    console.error('Failed to get streak reward stats:', e);
    return null;
  }
}
