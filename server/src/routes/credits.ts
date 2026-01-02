/**
 * Credits API Routes
 *
 * 복채 관리 및 인앱결제 연동 API
 * Security: IAP server-side verification required for purchase completion
 */

import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {
  CreditStore,
  CREDIT_PRODUCTS,
  CREDIT_COSTS,
  getProductBySku,
  getCreditCost,
  getAllProducts,
  getAllCosts,
  getReferralRewards,
  getStreakRewardConfig,
} from '../credits/store.js';
import { verifyTossPayment, markPaymentProcessed, isPaymentProcessed } from '../lib/iapVerifier.js';
import { logger } from '../lib/logger.js';
import {
  validate,
  BalanceRequestSchema,
  UseCreditsRequestSchema,
  PurchaseStartRequestSchema,
  PurchaseCompleteRequestSchema,
  ReferralClaimRequestSchema,
  ReferralStatusRequestSchema,
  StreakClaimRequestSchema,
  StreakStatusRequestSchema,
  TransactionHistoryRequestSchema,
  UserKeyQuerySchema,
  PurchasesQuerySchema,
  PendingQuerySchema,
  StreakHistoryQuerySchema,
} from '../lib/validation.js';

// ============================================================
// Types
// ============================================================

interface BalanceRequest {
  userKey: string;
}

interface UseCreditsRequest {
  userKey: string;
  action: string;
  description?: string;
}

interface PurchaseStartRequest {
  userKey: string;
  orderId: string;
  sku: string;
  amount: number;
}

interface PurchaseCompleteRequest {
  orderId: string;
  paymentKey: string; // Required for Toss Payments verification
}

interface PurchaseHistoryRequest {
  userKey: string;
}

interface TransactionHistoryRequest {
  userKey: string;
  limit?: number;
}

interface ReferralClaimRequest {
  inviterKey: string;
  inviteeKey: string;
  dateKey: string;
  claimerKey: string;
}

interface ReferralStatsRequest {
  userKey: string;
}

interface StreakClaimRequest {
  userKey: string;
  dateKey: string;
  streak: number;
}

// ============================================================
// Store Instance
// ============================================================

let creditStore: CreditStore;

// ============================================================
// Route Registration
// ============================================================

export async function creditRoutes(app: FastifyInstance, opts: { dataDir: string }): Promise<void> {
  // Initialize credit store
  creditStore = new CreditStore(opts.dataDir);

  // ----------------------------------------------------------
  // Product & Cost Info
  // ----------------------------------------------------------

  /**
   * GET /api/credits/products
   * 복채 상품 목록 조회
   */
  app.get('/api/credits/products', async () => {
    return {
      success: true,
      products: getAllProducts().map((p) => ({
        ...p,
        totalCredits: p.credits + (p.bonus || 0),
        priceFormatted: `₩${p.price.toLocaleString()}`,
      })),
    };
  });

  /**
   * GET /api/credits/costs
   * 복채 사용 비용 조회
   */
  app.get('/api/credits/costs', async () => {
    return {
      success: true,
      costs: getAllCosts(),
    };
  });

  // ----------------------------------------------------------
  // Balance Operations
  // ----------------------------------------------------------

  /**
   * GET /api/credits/balance?userKey=xxx
   * 복채 잔액 조회
   */
  app.get('/api/credits/balance', async (req: FastifyRequest, reply: FastifyReply) => {
    const validation = validate(BalanceRequestSchema, req.query);
    if (!validation.success) {
      return reply.code(400).send({ error: validation.error });
    }

    const { userKey } = validation.data;
    const balance = creditStore.getBalance(userKey);

    return {
      success: true,
      balance: {
        credits: balance.credits,
        totalPurchased: balance.totalPurchased,
        totalUsed: balance.totalUsed,
        lastUpdated: balance.lastUpdated,
      },
    };
  });

  /**
   * POST /api/credits/check
   * 복채 충분 여부 확인
   */
  app.post('/api/credits/check', async (req: FastifyRequest, reply: FastifyReply) => {
    const validation = validate(UseCreditsRequestSchema, req.body);
    if (!validation.success) {
      return reply.code(400).send({ error: validation.error });
    }

    const { userKey, action } = validation.data;
    const cost = getCreditCost(action);
    if (cost === 0) {
      return reply.code(400).send({ error: 'invalid action' });
    }

    const hasEnough = creditStore.hasEnoughCredits(userKey, cost);
    const balance = creditStore.getBalance(userKey);

    return {
      success: true,
      hasEnough,
      cost,
      currentBalance: balance.credits,
      shortfall: hasEnough ? 0 : cost - balance.credits,
    };
  });

  /**
   * POST /api/credits/use
   * 복채 사용 (차감)
   */
  app.post('/api/credits/use', async (req: FastifyRequest, reply: FastifyReply) => {
    const validation = validate(UseCreditsRequestSchema, req.body);
    if (!validation.success) {
      return reply.code(400).send({ error: validation.error });
    }

    const { userKey, action, description: descOverride } = validation.data;
    const costInfo = CREDIT_COSTS[action];
    if (!costInfo) {
      return reply.code(400).send({ error: 'invalid action' });
    }

    const description = descOverride || costInfo.actionKorean;
    const result = await creditStore.useCreditsAsync(userKey, costInfo.cost, description);

    if (!result.success) {
      return reply.code(402).send({
        error: result.error,
        message: '복채이 부족합니다.',
        required: costInfo.cost,
        current: creditStore.getBalance(userKey).credits,
      });
    }

    return {
      success: true,
      transaction: result.transaction,
      remainingCredits: creditStore.getBalance(userKey).credits,
    };
  });

  // ----------------------------------------------------------
  // Purchase Operations (IAP Integration)
  // ----------------------------------------------------------

  /**
   * POST /api/credits/purchase/start
   * 구매 시작 (주문 생성)
   * - 인앱결제 시작 전에 호출
   */
  app.post('/api/credits/purchase/start', async (req: FastifyRequest, reply: FastifyReply) => {
    const validation = validate(PurchaseStartRequestSchema, req.body);
    if (!validation.success) {
      return reply.code(400).send({ error: validation.error });
    }

    const { userKey, orderId, sku, amount } = validation.data;
    const product = getProductBySku(sku);
    if (!product) {
      return reply.code(400).send({ error: 'invalid sku' });
    }

    // 이미 존재하는 주문인지 확인
    const existingPurchase = creditStore.getPurchase(orderId);
    if (existingPurchase) {
      return reply.code(409).send({
        error: 'order_exists',
        purchase: existingPurchase,
      });
    }

    const purchase = creditStore.createPurchase(orderId, userKey, sku, amount || product.price);

    return {
      success: true,
      purchase: {
        orderId: purchase.orderId,
        sku: purchase.sku,
        credits: purchase.credits,
        status: purchase.status,
      },
    };
  });

  /**
   * POST /api/credits/purchase/complete
   * 구매 완료 (상품 지급)
   * - 인앱결제 processProductGrant 콜백에서 호출
   * - Toss Payments 서버 사이드 검증 필수
   */
  app.post('/api/credits/purchase/complete', async (req: FastifyRequest, reply: FastifyReply) => {
    const validation = validate(PurchaseCompleteRequestSchema, req.body);
    if (!validation.success) {
      return reply.code(400).send({ error: validation.error });
    }

    const { orderId, paymentKey } = validation.data;

    // 1. Idempotency check - 이미 처리된 결제인지 확인
    if (isPaymentProcessed(paymentKey)) {
      logger.warn({ paymentKey }, 'duplicate_payment_attempt');
      return reply.code(409).send({ error: 'payment_already_processed' });
    }

    // 2. 구매 정보 조회
    const purchase = creditStore.getPurchase(orderId);
    if (!purchase) {
      return reply.code(404).send({ error: 'purchase_not_found' });
    }

    if (purchase.status === 'completed') {
      return reply.code(409).send({ error: 'already_completed' });
    }

    // 3. Toss Payments 서버 사이드 검증
    const verification = await verifyTossPayment({
      orderId,
      paymentKey,
      amount: purchase.amount,
    });

    if (!verification.verified) {
      logger.warn({ orderId, error: verification.error }, 'iap_verification_failed');
      return reply.code(402).send({
        error: 'payment_verification_failed',
        detail: verification.error,
      });
    }

    // 4. 결제 처리 완료 마킹 (중복 방지, 파일 영속화)
    markPaymentProcessed(paymentKey, orderId);

    // 5. 복채 지급 (mutex-protected)
    const result = await creditStore.completePurchaseAsync(orderId);

    if (!result.success) {
      const statusCode = result.error === 'purchase_not_found' ? 404 : 409;
      return reply.code(statusCode).send({ error: result.error });
    }

    logger.info(
      { orderId, credits: purchase.credits, userKey: purchase.userKey },
      'iap_credits_granted',
    );

    return {
      success: true,
      purchase: result.purchase,
      transaction: result.transaction,
      newBalance: creditStore.getBalance(result.purchase!.userKey).credits,
    };
  });

  /**
   * GET /api/credits/purchase/:orderId
   * 구매 상태 조회
   */
  app.get('/api/credits/purchase/:orderId', async (req: FastifyRequest, reply: FastifyReply) => {
    const params = req.params as { orderId: string };

    const purchase = creditStore.getPurchase(params.orderId);
    if (!purchase) {
      return reply.code(404).send({ error: 'purchase_not_found' });
    }

    return {
      success: true,
      purchase,
    };
  });

  /**
   * GET /api/credits/purchases?userKey=xxx
   * 사용자 구매 이력 조회
   */
  app.get('/api/credits/purchases', async (req: FastifyRequest, reply: FastifyReply) => {
    const validation = validate(PurchasesQuerySchema, req.query);
    if (!validation.success) {
      return reply.code(400).send({ error: validation.error });
    }

    const { userKey } = validation.data;
    const purchases = creditStore.getUserPurchases(userKey);

    return {
      success: true,
      purchases,
    };
  });

  /**
   * GET /api/credits/pending?userKey=xxx
   * 미완료 구매 조회 (복원용)
   */
  app.get('/api/credits/pending', async (req: FastifyRequest, reply: FastifyReply) => {
    const validation = validate(PendingQuerySchema, req.query);
    if (!validation.success) {
      return reply.code(400).send({ error: validation.error });
    }

    const { userKey } = validation.data;
    const pending = creditStore.getPendingPurchases(userKey);

    return {
      success: true,
      pending,
    };
  });

  // ----------------------------------------------------------
  // Transaction History
  // ----------------------------------------------------------

  /**
   * GET /api/credits/transactions?userKey=xxx&limit=50
   * 복채 사용 내역 조회
   */
  app.get('/api/credits/transactions', async (req: FastifyRequest, reply: FastifyReply) => {
    const validation = validate(TransactionHistoryRequestSchema, req.query);
    if (!validation.success) {
      return reply.code(400).send({ error: validation.error });
    }

    const { userKey, limit } = validation.data;
    const transactions = creditStore.getTransactionHistory(userKey, limit);

    return {
      success: true,
      transactions,
    };
  });

  // ----------------------------------------------------------
  // Referral Reward Operations
  // ----------------------------------------------------------

  /**
   * GET /api/credits/referral/rewards
   * 레퍼럴 보상 설정 조회
   */
  app.get('/api/credits/referral/rewards', async () => {
    return {
      success: true,
      rewards: getReferralRewards(),
    };
  });

  /**
   * POST /api/credits/referral/claim
   * 레퍼럴 보상 청구
   * - 초대자: 친구 초대 보상
   * - 피초대자: 초대 수락 보상
   */
  app.post('/api/credits/referral/claim', async (req: FastifyRequest, reply: FastifyReply) => {
    const validation = validate(ReferralClaimRequestSchema, req.body);
    if (!validation.success) {
      return reply.code(400).send({ error: validation.error });
    }

    const { inviterKey, inviteeKey, dateKey, claimerKey } = validation.data;

    // Verify authenticated user matches the claimerKey
    if (req.verifiedUserKey && req.verifiedUserKey !== claimerKey) {
      return reply.code(403).send({
        error: 'forbidden',
        message: 'Cannot claim rewards for another user',
      });
    }

    const result = await creditStore.claimReferralRewardAsync(
      inviterKey,
      inviteeKey,
      dateKey,
      claimerKey,
    );

    if (!result.success) {
      return reply.code(400).send({
        error: result.error,
        message:
          result.error === 'same_user'
            ? '자기 자신을 초대할 수 없습니다.'
            : '보상을 받을 권한이 없습니다.',
      });
    }

    return {
      success: true,
      credits: result.credits,
      alreadyClaimed: result.alreadyClaimed,
      transaction: result.transaction,
      newBalance: creditStore.getBalance(claimerKey).credits,
    };
  });

  /**
   * GET /api/credits/referral/status?inviterKey=xxx&inviteeKey=yyy&dateKey=zzz
   * 레퍼럴 보상 상태 조회
   */
  app.get('/api/credits/referral/status', async (req: FastifyRequest, reply: FastifyReply) => {
    const validation = validate(ReferralStatusRequestSchema, req.query);
    if (!validation.success) {
      return reply.code(400).send({ error: validation.error });
    }

    const { inviterKey, inviteeKey, dateKey } = validation.data;
    const status = creditStore.getReferralStatus(inviterKey, inviteeKey, dateKey);

    return {
      success: true,
      status,
    };
  });

  /**
   * GET /api/credits/referral/stats?userKey=xxx
   * 사용자의 레퍼럴 통계 조회
   */
  app.get('/api/credits/referral/stats', async (req: FastifyRequest, reply: FastifyReply) => {
    const validation = validate(UserKeyQuerySchema, req.query);
    if (!validation.success) {
      return reply.code(400).send({ error: validation.error });
    }

    const { userKey } = validation.data;
    const stats = creditStore.getReferralStats(userKey);

    return {
      success: true,
      stats,
    };
  });

  // ----------------------------------------------------------
  // Streak Reward Operations
  // ----------------------------------------------------------

  /**
   * GET /api/credits/streak/config
   * 스트릭 보상 설정 조회
   */
  app.get('/api/credits/streak/config', async () => {
    return {
      success: true,
      config: getStreakRewardConfig(),
    };
  });

  /**
   * POST /api/credits/streak/claim
   * 스트릭 보상 청구
   */
  app.post('/api/credits/streak/claim', async (req: FastifyRequest, reply: FastifyReply) => {
    const validation = validate(StreakClaimRequestSchema, req.body);
    if (!validation.success) {
      return reply.code(400).send({ error: validation.error });
    }

    const { userKey, dateKey, streak } = validation.data;
    const result = await creditStore.claimStreakRewardAsync(userKey, dateKey, streak);

    return {
      success: true,
      rewards: result.rewards,
      totalCredits: result.totalCredits,
      alreadyClaimed: result.alreadyClaimed,
      newBalance: creditStore.getBalance(userKey).credits,
    };
  });

  /**
   * GET /api/credits/streak/status?userKey=xxx&dateKey=yyy
   * 오늘 스트릭 보상 수령 여부 확인
   */
  app.get('/api/credits/streak/status', async (req: FastifyRequest, reply: FastifyReply) => {
    const validation = validate(StreakStatusRequestSchema, req.query);
    if (!validation.success) {
      return reply.code(400).send({ error: validation.error });
    }

    const { userKey, dateKey } = validation.data;
    const claimed = creditStore.hasClaimedStreakRewardToday(userKey, dateKey);

    return {
      success: true,
      claimed,
    };
  });

  /**
   * GET /api/credits/streak/stats?userKey=xxx
   * 스트릭 보상 통계 조회
   */
  app.get('/api/credits/streak/stats', async (req: FastifyRequest, reply: FastifyReply) => {
    const validation = validate(UserKeyQuerySchema, req.query);
    if (!validation.success) {
      return reply.code(400).send({ error: validation.error });
    }

    const { userKey } = validation.data;
    const stats = creditStore.getStreakRewardStats(userKey);

    return {
      success: true,
      stats,
    };
  });

  /**
   * GET /api/credits/streak/history?userKey=xxx&limit=30
   * 스트릭 보상 히스토리 조회
   */
  app.get('/api/credits/streak/history', async (req: FastifyRequest, reply: FastifyReply) => {
    const validation = validate(StreakHistoryQuerySchema, req.query);
    if (!validation.success) {
      return reply.code(400).send({ error: validation.error });
    }

    const { userKey, limit } = validation.data;
    const history = creditStore.getStreakRewardHistory(userKey, limit);

    return {
      success: true,
      history,
    };
  });
}
