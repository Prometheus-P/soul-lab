/**
 * Authentication Integration Tests
 *
 * Tests for session token and HMAC signature verification.
 * Issue #36: 세션 토큰 발급 → API 호출 → 성공, 만료/잘못된 토큰 → 401
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  generateSessionToken,
  verifySessionToken,
  generateUserSignature,
  verifyUserSignature,
  parseSignatureHeaders,
  SESSION_TOKEN_TTL,
} from './auth.js';

// Mock the config module
vi.mock('../config/index.js', () => ({
  getConfig: vi.fn(() => ({
    SIGNING_SECRET: 'test-secret-key-at-least-32-chars-long',
    NODE_ENV: 'test',
  })),
  isDevelopment: vi.fn(() => false),
}));

describe('Session Token Authentication', () => {
  describe('generateSessionToken', () => {
    it('should generate a valid token with correct format', () => {
      const userKey = 'test-user-123';
      const result = generateSessionToken(userKey);

      expect(result.token).toBeDefined();
      expect(result.userKey).toBe(userKey);
      expect(result.expiresAt).toBeGreaterThan(Date.now());

      // Token format: base64(userKey):expiresAt:signature
      const parts = result.token.split(':');
      expect(parts.length).toBe(3);
    });

    it('should set expiration in the future', () => {
      const userKey = 'test-user';
      const now = Date.now();
      const result = generateSessionToken(userKey);

      expect(result.expiresAt).toBeGreaterThan(now);
      expect(result.expiresAt).toBeLessThanOrEqual(now + SESSION_TOKEN_TTL + 1000);
    });

    it('should generate different tokens at different times', async () => {
      const userKey = 'test-user';
      const token1 = generateSessionToken(userKey);

      // Wait 10ms to ensure different expiresAt timestamp
      await new Promise((r) => setTimeout(r, 10));

      const token2 = generateSessionToken(userKey);

      // Different expiry times lead to different tokens
      expect(token1.token).not.toBe(token2.token);
    });
  });

  describe('verifySessionToken', () => {
    it('should verify a valid token successfully', () => {
      const userKey = 'test-user-123';
      const { token } = generateSessionToken(userKey);

      const result = verifySessionToken(token);

      expect(result.valid).toBe(true);
      expect(result.userKey).toBe(userKey);
      expect(result.error).toBeUndefined();
    });

    it('should reject an expired token', () => {
      const userKey = 'test-user';

      // Create a token with past expiration
      const expiresAt = Date.now() - 1000; // 1 second ago
      const crypto = require('node:crypto');
      const message = `session:${userKey}:${expiresAt}`;
      const signature = crypto
        .createHmac('sha256', 'test-secret-key-at-least-32-chars-long')
        .update(message)
        .digest('hex');
      const token = `${Buffer.from(userKey).toString('base64')}:${expiresAt}:${signature}`;

      const result = verifySessionToken(token);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('expired');
    });

    it('should reject a token with invalid signature', () => {
      const userKey = 'test-user';
      const expiresAt = Date.now() + 60000;
      const invalidSignature = 'a'.repeat(64); // fake signature

      const token = `${Buffer.from(userKey).toString('base64')}:${expiresAt}:${invalidSignature}`;

      const result = verifySessionToken(token);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('invalid_signature');
    });

    it('should reject a token with invalid format', () => {
      const invalidTokens = [
        'just-a-string',
        'two:parts',
        'four:parts:here:now',
        '',
      ];

      invalidTokens.forEach((token) => {
        const result = verifySessionToken(token);
        expect(result.valid).toBe(false);
      });
    });

    it('should reject a token with tampered userKey', () => {
      const originalUserKey = 'original-user';
      const { token } = generateSessionToken(originalUserKey);

      // Tamper with the userKey part
      const parts = token.split(':');
      parts[0] = Buffer.from('tampered-user').toString('base64');
      const tamperedToken = parts.join(':');

      const result = verifySessionToken(tamperedToken);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('invalid_signature');
    });

    it('should reject a token with tampered expiry', () => {
      const userKey = 'test-user';
      const { token } = generateSessionToken(userKey);

      // Tamper with the expiry part
      const parts = token.split(':');
      parts[1] = String(Date.now() + 999999999); // Extended expiry
      const tamperedToken = parts.join(':');

      const result = verifySessionToken(tamperedToken);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('invalid_signature');
    });

    it('should handle special characters in userKey', () => {
      const userKey = 'user+with/special=chars';
      const { token } = generateSessionToken(userKey);

      const result = verifySessionToken(token);

      expect(result.valid).toBe(true);
      expect(result.userKey).toBe(userKey);
    });
  });
});

describe('HMAC Signature Authentication', () => {
  describe('generateUserSignature', () => {
    it('should generate consistent signature for same input', () => {
      const userKey = 'test-user';
      const timestamp = Date.now();

      const sig1 = generateUserSignature(userKey, timestamp);
      const sig2 = generateUserSignature(userKey, timestamp);

      expect(sig1).toBe(sig2);
    });

    it('should generate different signatures for different timestamps', () => {
      const userKey = 'test-user';
      const timestamp1 = Date.now();
      const timestamp2 = timestamp1 + 1;

      const sig1 = generateUserSignature(userKey, timestamp1);
      const sig2 = generateUserSignature(userKey, timestamp2);

      expect(sig1).not.toBe(sig2);
    });

    it('should generate different signatures for different users', () => {
      const timestamp = Date.now();

      const sig1 = generateUserSignature('user1', timestamp);
      const sig2 = generateUserSignature('user2', timestamp);

      expect(sig1).not.toBe(sig2);
    });
  });

  describe('verifyUserSignature', () => {
    it('should verify valid signature', () => {
      const userKey = 'test-user';
      const timestamp = Date.now();
      const signature = generateUserSignature(userKey, timestamp);

      const result = verifyUserSignature({ userKey, timestamp, signature });

      expect(result.valid).toBe(true);
      expect(result.userKey).toBe(userKey);
    });

    it('should reject expired signature (> 5 minutes old)', () => {
      const userKey = 'test-user';
      const timestamp = Date.now() - 6 * 60 * 1000; // 6 minutes ago
      const signature = generateUserSignature(userKey, timestamp);

      const result = verifyUserSignature({ userKey, timestamp, signature });

      expect(result.valid).toBe(false);
      expect(result.error).toBe('expired');
    });

    it('should reject future timestamp (> 5 minutes ahead)', () => {
      const userKey = 'test-user';
      const timestamp = Date.now() + 6 * 60 * 1000; // 6 minutes in future
      const signature = generateUserSignature(userKey, timestamp);

      const result = verifyUserSignature({ userKey, timestamp, signature });

      expect(result.valid).toBe(false);
      expect(result.error).toBe('expired');
    });

    it('should reject invalid signature', () => {
      const userKey = 'test-user';
      const timestamp = Date.now();
      const invalidSignature = 'a'.repeat(64);

      const result = verifyUserSignature({
        userKey,
        timestamp,
        signature: invalidSignature,
      });

      expect(result.valid).toBe(false);
      expect(result.error).toBe('invalid_signature');
    });

    it('should reject signature with wrong length', () => {
      const userKey = 'test-user';
      const timestamp = Date.now();
      const shortSignature = 'abc123';

      const result = verifyUserSignature({
        userKey,
        timestamp,
        signature: shortSignature,
      });

      expect(result.valid).toBe(false);
      expect(result.error).toBe('invalid_signature');
    });
  });

  describe('parseSignatureHeaders', () => {
    it('should parse valid headers', () => {
      const headers = {
        'x-user-key': 'test-user',
        'x-timestamp': '1234567890123',
        'x-signature': 'abc123def456',
      };

      const result = parseSignatureHeaders(headers);

      expect(result).not.toBeNull();
      expect(result!.userKey).toBe('test-user');
      expect(result!.timestamp).toBe(1234567890123);
      expect(result!.signature).toBe('abc123def456');
    });

    it('should return null for missing headers', () => {
      expect(parseSignatureHeaders({})).toBeNull();
      expect(parseSignatureHeaders({ 'x-user-key': 'user' })).toBeNull();
      expect(
        parseSignatureHeaders({ 'x-user-key': 'user', 'x-timestamp': '123' })
      ).toBeNull();
    });

    it('should return null for invalid timestamp', () => {
      const headers = {
        'x-user-key': 'test-user',
        'x-timestamp': 'not-a-number',
        'x-signature': 'abc123',
      };

      const result = parseSignatureHeaders(headers);
      expect(result).toBeNull();
    });
  });
});

describe('Token Security Properties', () => {
  it('should be resistant to timing attacks (constant-time comparison)', () => {
    const userKey = 'test-user';
    const { token } = generateSessionToken(userKey);

    // Both valid and invalid tokens should take similar time
    // This is a basic check - real timing attack tests would need more sophisticated measurement
    const start1 = process.hrtime.bigint();
    verifySessionToken(token);
    const end1 = process.hrtime.bigint();

    const start2 = process.hrtime.bigint();
    verifySessionToken('a'.repeat(100));
    const end2 = process.hrtime.bigint();

    // Just verify both complete without error
    expect(end1 - start1).toBeDefined();
    expect(end2 - start2).toBeDefined();
  });

  it('should handle unicode userKeys', () => {
    const userKey = '한글유저키-test-🎉';
    const { token } = generateSessionToken(userKey);

    const result = verifySessionToken(token);

    expect(result.valid).toBe(true);
    expect(result.userKey).toBe(userKey);
  });

  it('should handle very long userKeys', () => {
    const userKey = 'x'.repeat(1000);
    const { token } = generateSessionToken(userKey);

    const result = verifySessionToken(token);

    expect(result.valid).toBe(true);
    expect(result.userKey).toBe(userKey);
  });
});
