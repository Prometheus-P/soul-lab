/**
 * Cryptographically Secure ID Generation
 *
 * Replaces Math.random() with crypto.randomBytes() for
 * unpredictable, collision-resistant identifiers.
 */

import { randomBytes } from 'node:crypto';

/**
 * Generate a cryptographically secure random hex string
 * @param bytes Number of random bytes (default: 8 = 16 hex chars)
 */
export function secureRandomHex(bytes = 8): string {
  return randomBytes(bytes).toString('hex');
}

/**
 * Generate a secure ID with prefix and timestamp
 * Format: {prefix}_{timestamp36}_{random16hex}
 *
 * @example
 * generateSecureId('tx') => 'tx_m1abc123_a1b2c3d4e5f67890'
 * generateSecureId('inv') => 'inv_m1abc456_fedcba9876543210'
 */
export function generateSecureId(prefix: string): string {
  const timestamp = Date.now().toString(36);
  const random = secureRandomHex(8); // 16 hex chars
  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Generate a short secure ID (no timestamp)
 * Format: {prefix}_{random16hex}
 *
 * @example
 * generateShortId('ref') => 'ref_a1b2c3d4e5f67890'
 */
export function generateShortId(prefix: string): string {
  return `${prefix}_${secureRandomHex(8)}`;
}

/**
 * Generate a secure transaction ID
 * Convenience wrapper for credit/payment transactions
 */
export function generateTransactionId(): string {
  return generateSecureId('tx');
}

/**
 * Generate a secure invite ID (24 hex chars = 12 bytes)
 * Note: inviteStore already uses crypto.randomBytes directly
 */
export function generateInviteId(): string {
  return randomBytes(12).toString('hex');
}
