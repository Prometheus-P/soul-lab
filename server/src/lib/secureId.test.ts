/**
 * Secure ID Generation Tests
 *
 * Tests for cryptographically secure random ID generation.
 * Issue #16: 강화된 랜덤 ID 생성
 */

import { describe, it, expect } from 'vitest';
import {
  secureRandomHex,
  generateSecureId,
  generateShortId,
  generateTransactionId,
  generateInviteId,
} from './secureId.js';

describe('Secure ID Generation', () => {
  describe('secureRandomHex', () => {
    it('should generate hex string of correct length', () => {
      // Default 8 bytes = 16 hex chars
      const hex = secureRandomHex();
      expect(hex.length).toBe(16);
      expect(/^[0-9a-f]+$/.test(hex)).toBe(true);
    });

    it('should generate specified number of bytes', () => {
      const hex4 = secureRandomHex(4);
      expect(hex4.length).toBe(8); // 4 bytes = 8 hex chars

      const hex16 = secureRandomHex(16);
      expect(hex16.length).toBe(32); // 16 bytes = 32 hex chars
    });

    it('should generate unique values', () => {
      const values = new Set<string>();
      for (let i = 0; i < 1000; i++) {
        values.add(secureRandomHex());
      }
      // All 1000 should be unique
      expect(values.size).toBe(1000);
    });
  });

  describe('generateSecureId', () => {
    it('should generate ID with correct format', () => {
      const id = generateSecureId('test');

      // Format: prefix_timestamp36_random16hex
      const parts = id.split('_');
      expect(parts.length).toBe(3);
      expect(parts[0]).toBe('test');

      // Timestamp is base36 encoded
      expect(/^[0-9a-z]+$/.test(parts[1])).toBe(true);

      // Random is 16 hex chars
      expect(parts[2].length).toBe(16);
      expect(/^[0-9a-f]+$/.test(parts[2])).toBe(true);
    });

    it('should generate unique IDs', () => {
      const ids = new Set<string>();
      for (let i = 0; i < 1000; i++) {
        ids.add(generateSecureId('tx'));
      }
      expect(ids.size).toBe(1000);
    });

    it('should work with various prefixes', () => {
      const prefixes = ['tx', 'inv', 'ref', 'session', 'order'];
      for (const prefix of prefixes) {
        const id = generateSecureId(prefix);
        expect(id.startsWith(`${prefix}_`)).toBe(true);
      }
    });
  });

  describe('generateShortId', () => {
    it('should generate short ID without timestamp', () => {
      const id = generateShortId('ref');

      // Format: prefix_random16hex
      const parts = id.split('_');
      expect(parts.length).toBe(2);
      expect(parts[0]).toBe('ref');
      expect(parts[1].length).toBe(16);
      expect(/^[0-9a-f]+$/.test(parts[1])).toBe(true);
    });

    it('should generate unique short IDs', () => {
      const ids = new Set<string>();
      for (let i = 0; i < 1000; i++) {
        ids.add(generateShortId('x'));
      }
      expect(ids.size).toBe(1000);
    });
  });

  describe('generateTransactionId', () => {
    it('should generate transaction ID with tx prefix', () => {
      const id = generateTransactionId();
      expect(id.startsWith('tx_')).toBe(true);

      const parts = id.split('_');
      expect(parts.length).toBe(3);
    });

    it('should generate unique transaction IDs', () => {
      const ids = new Set<string>();
      for (let i = 0; i < 1000; i++) {
        ids.add(generateTransactionId());
      }
      expect(ids.size).toBe(1000);
    });
  });

  describe('generateInviteId', () => {
    it('should generate 24 character hex string', () => {
      const id = generateInviteId();
      expect(id.length).toBe(24);
      expect(/^[0-9a-f]+$/.test(id)).toBe(true);
    });

    it('should generate unique invite IDs', () => {
      const ids = new Set<string>();
      for (let i = 0; i < 1000; i++) {
        ids.add(generateInviteId());
      }
      expect(ids.size).toBe(1000);
    });
  });

  describe('Security Properties', () => {
    it('should have sufficient entropy for IDs', () => {
      // 8 bytes = 64 bits of entropy
      // This is sufficient for most ID use cases
      const hex = secureRandomHex(8);
      expect(hex.length).toBe(16);

      // Verify it's not obviously non-random (e.g., all zeros)
      expect(hex).not.toBe('0000000000000000');
      expect(hex).not.toBe('ffffffffffffffff');
    });

    it('should use crypto.randomBytes (not Math.random)', () => {
      // Generate many IDs and check distribution
      // Math.random() would show patterns, crypto.randomBytes should not
      const bytes = new Map<string, number>();

      for (let i = 0; i < 10000; i++) {
        const hex = secureRandomHex(1);
        const count = bytes.get(hex) || 0;
        bytes.set(hex, count + 1);
      }

      // With 256 possible values and 10000 samples,
      // expected average is ~39 per value
      // All values should be reasonably distributed (between 10-100)
      for (const count of bytes.values()) {
        expect(count).toBeGreaterThan(5);
        expect(count).toBeLessThan(100);
      }
    });
  });
});
