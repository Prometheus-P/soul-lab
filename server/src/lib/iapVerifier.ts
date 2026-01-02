/**
 * IAP (In-App Purchase) Server-Side Verification
 *
 * Verifies purchases with payment provider before granting credits.
 * Prevents fraud by ensuring payment was actually completed.
 *
 * For Toss Payments:
 * - Uses Payment Confirm API to verify transaction
 * - Checks amount, status, and orderId match
 */
import fs from 'node:fs';
import path from 'node:path';
import { getConfig } from '../config/index.js';
import { logger } from './logger.js';
import { writeFileAtomic } from './atomicWrite.js';

export interface PaymentVerificationResult {
  verified: boolean;
  error?: string;
  paymentData?: {
    orderId: string;
    amount: number;
    status: string;
    approvedAt?: string;
  };
}

export interface PurchaseVerificationRequest {
  orderId: string;
  paymentKey: string;
  amount: number;
}

/**
 * Verify payment with Toss Payments API
 *
 * Security: Mock verification ONLY allowed in test environment.
 * Development and production ALWAYS require real Toss credentials.
 */
export async function verifyTossPayment(
  request: PurchaseVerificationRequest,
): Promise<PaymentVerificationResult> {
  const config = getConfig();

  // Check if Toss secret key is configured
  const tossSecretKey = process.env.TOSS_PAYMENTS_SECRET_KEY;

  if (!tossSecretKey) {
    // Test environment: allow mock verification for unit tests only
    if (config.NODE_ENV === 'test') {
      logger.debug({ orderId: request.orderId }, 'iap_verification_mocked_test_env');
      return {
        verified: true,
        paymentData: {
          orderId: request.orderId,
          amount: request.amount,
          status: 'DONE',
          approvedAt: new Date().toISOString(),
        },
      };
    }

    // Development and production without secret key: reject
    // Security: Never skip verification outside of test environment
    logger.error({ env: config.NODE_ENV }, 'iap_verification_failed_no_secret_key');
    return {
      verified: false,
      error: 'payment_verification_not_configured',
    };
  }

  try {
    // Call Toss Payments Confirm API
    const authHeader = Buffer.from(`${tossSecretKey}:`).toString('base64');

    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: request.orderId,
        paymentKey: request.paymentKey,
        amount: request.amount,
      }),
    });

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as Record<string, unknown>;
      logger.warn(
        {
          orderId: request.orderId,
          status: response.status,
          error: errorData,
        },
        'iap_verification_api_error',
      );

      return {
        verified: false,
        error:
          (typeof errorData.code === 'string' ? errorData.code : null) ||
          'payment_verification_failed',
      };
    }

    const paymentData = (await response.json()) as {
      orderId: string;
      status: string;
      totalAmount: number;
      approvedAt?: string;
    };

    // Verify payment status
    if (paymentData.status !== 'DONE') {
      logger.warn(
        { orderId: request.orderId, status: paymentData.status },
        'iap_verification_invalid_status',
      );
      return {
        verified: false,
        error: 'payment_not_completed',
      };
    }

    // Verify amount matches
    if (paymentData.totalAmount !== request.amount) {
      logger.warn(
        {
          orderId: request.orderId,
          expected: request.amount,
          actual: paymentData.totalAmount,
        },
        'iap_verification_amount_mismatch',
      );
      return {
        verified: false,
        error: 'payment_amount_mismatch',
      };
    }

    logger.info({ orderId: request.orderId, amount: request.amount }, 'iap_verification_success');

    return {
      verified: true,
      paymentData: {
        orderId: paymentData.orderId,
        amount: paymentData.totalAmount,
        status: paymentData.status,
        approvedAt: paymentData.approvedAt,
      },
    };
  } catch (error) {
    logger.error({ orderId: request.orderId, error }, 'iap_verification_exception');
    return {
      verified: false,
      error: 'payment_verification_error',
    };
  }
}

/**
 * Idempotency check - ensure same payment isn't processed twice
 * Uses file-based persistence to survive server restarts.
 */
type ProcessedPaymentsDB = Record<string, { processedAt: number; orderId?: string }>;

const IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

let processedPayments: ProcessedPaymentsDB = {};
let filePath: string | null = null;
let initialized = false;

/**
 * Initialize the processed payments store with a data directory.
 * Must be called before using markPaymentProcessed/isPaymentProcessed.
 */
export function initProcessedPaymentsStore(dataDir: string): void {
  if (initialized) return;

  fs.mkdirSync(dataDir, { recursive: true });
  filePath = path.join(dataDir, 'processed_payments.json');

  // Load existing data
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      processedPayments = JSON.parse(raw) as ProcessedPaymentsDB;
      logger.info({ count: Object.keys(processedPayments).length }, 'iap_idempotency_loaded');
    }
  } catch (err) {
    logger.warn({ err }, 'iap_idempotency_load_failed');
    processedPayments = {};
  }

  // Cleanup old records on startup
  cleanupIdempotencyRecords();
  initialized = true;
}

function saveProcessedPayments(): void {
  if (!filePath) return;
  try {
    writeFileAtomic(filePath, JSON.stringify(processedPayments, null, 2));
  } catch (err) {
    logger.error({ err }, 'iap_idempotency_save_failed');
  }
}

export function markPaymentProcessed(paymentKey: string, orderId?: string): void {
  processedPayments[paymentKey] = { processedAt: Date.now(), orderId };
  saveProcessedPayments();
}

export function isPaymentProcessed(paymentKey: string): boolean {
  const record = processedPayments[paymentKey];
  if (!record) return false;

  // Check TTL
  if (Date.now() - record.processedAt > IDEMPOTENCY_TTL_MS) {
    delete processedPayments[paymentKey];
    saveProcessedPayments();
    return false;
  }

  return true;
}

/**
 * Cleanup old idempotency records (call periodically)
 */
export function cleanupIdempotencyRecords(): void {
  const now = Date.now();
  let cleaned = 0;

  for (const key of Object.keys(processedPayments)) {
    if (now - processedPayments[key].processedAt > IDEMPOTENCY_TTL_MS) {
      delete processedPayments[key];
      cleaned++;
    }
  }

  if (cleaned > 0) {
    saveProcessedPayments();
    logger.info({ cleaned }, 'iap_idempotency_cleanup');
  }
}
