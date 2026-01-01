/**
 * Invite Store Integration Tests
 *
 * Tests for Redis-based invite system.
 * Issue #36: Redis 초대 생성 → 참가 → 페어링
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import type { Redis } from 'ioredis';

// Create a mock Redis client
const createMockRedis = () => {
  const store = new Map<string, { value: string; expireAt?: number }>();

  return {
    store, // Expose for testing

    setex: vi.fn(async (key: string, ttl: number, value: string) => {
      store.set(key, { value, expireAt: Date.now() + ttl * 1000 });
      return 'OK';
    }),

    get: vi.fn(async (key: string) => {
      const entry = store.get(key);
      if (!entry) return null;
      if (entry.expireAt && Date.now() > entry.expireAt) {
        store.delete(key);
        return null;
      }
      return entry.value;
    }),

    del: vi.fn(async (key: string) => {
      const existed = store.has(key);
      store.delete(key);
      return existed ? 1 : 0;
    }),

    clear: () => store.clear(),
  };
};

let mockRedis: ReturnType<typeof createMockRedis>;

// Mock the redis module
vi.mock('../lib/redis.js', () => ({
  getRedis: () => mockRedis,
}));

// Mock the lock module
vi.mock('../lib/lock.js', () => ({
  withLock: async <T>(_key: string, fn: () => Promise<T>) => fn(),
}));

// Import after mocking
const { RedisInviteStore } = await import('./inviteStore.js');

describe('RedisInviteStore', () => {
  let store: InstanceType<typeof RedisInviteStore>;

  beforeEach(() => {
    mockRedis = createMockRedis();
    store = new RedisInviteStore();
  });

  afterEach(() => {
    mockRedis.clear();
    vi.clearAllMocks();
  });

  describe('createInvite', () => {
    it('should create an invite with generated ID', async () => {
      const inviterKey = 'user-inviter-123';

      const invite = await store.createInvite(inviterKey);

      expect(invite.inviteId).toBeDefined();
      expect(invite.inviteId.length).toBe(24); // 12 bytes hex = 24 chars
      expect(invite.inviterKey).toBe(inviterKey);
      expect(invite.expiresAt).toBeGreaterThan(Date.now());
      expect(invite.inviteeKey).toBeUndefined();
    });

    it('should store invite in Redis with TTL', async () => {
      const inviterKey = 'user-123';

      await store.createInvite(inviterKey);

      expect(mockRedis.setex).toHaveBeenCalledTimes(1);
      const [key, ttl, value] = mockRedis.setex.mock.calls[0];
      expect(key).toContain('invite:');
      expect(ttl).toBeGreaterThan(0);
      expect(JSON.parse(value)).toMatchObject({ inviterKey });
    });

    it('should use default 24h TTL', async () => {
      const inviterKey = 'user-123';
      const now = Date.now();

      const invite = await store.createInvite(inviterKey);

      const expectedExpiry = now + 24 * 60 * 60 * 1000;
      expect(invite.expiresAt).toBeGreaterThanOrEqual(expectedExpiry - 1000);
      expect(invite.expiresAt).toBeLessThanOrEqual(expectedExpiry + 1000);
    });

    it('should support custom TTL', async () => {
      const inviterKey = 'user-123';
      const customTtlMs = 60 * 60 * 1000; // 1 hour
      const now = Date.now();

      const invite = await store.createInvite(inviterKey, customTtlMs);

      expect(invite.expiresAt).toBeGreaterThanOrEqual(now + customTtlMs - 1000);
      expect(invite.expiresAt).toBeLessThanOrEqual(now + customTtlMs + 1000);
    });
  });

  describe('getInvite', () => {
    it('should retrieve existing invite', async () => {
      const inviterKey = 'user-123';
      const created = await store.createInvite(inviterKey);

      const retrieved = await store.getInvite(created.inviteId);

      expect(retrieved).not.toBeNull();
      expect(retrieved!.inviteId).toBe(created.inviteId);
      expect(retrieved!.inviterKey).toBe(inviterKey);
    });

    it('should return null for non-existent invite', async () => {
      const result = await store.getInvite('non-existent-id');

      expect(result).toBeNull();
    });

    it('should return null for expired invite (via Redis TTL)', async () => {
      const inviterKey = 'user-123';
      // Redis TTL is in seconds, so minimum effective TTL is 1 second
      const shortTtlMs = 500; // Will become 1 second due to Math.ceil()

      const invite = await store.createInvite(inviterKey, shortTtlMs);

      // Wait for Redis TTL expiration (1 second + buffer)
      await new Promise((r) => setTimeout(r, 1100));

      const result = await store.getInvite(invite.inviteId);
      expect(result).toBeNull();
    }, 5000); // Increase timeout to 5 seconds
  });

  describe('joinInvite', () => {
    it('should allow invitee to join unpaired invite', async () => {
      const inviterKey = 'inviter-123';
      const inviteeKey = 'invitee-456';

      const invite = await store.createInvite(inviterKey);
      const result = await store.joinInvite(invite.inviteId, inviteeKey);

      expect(result.rec).not.toBeNull();
      expect(result.role).toBe('invitee');
      expect(result.partnerKey).toBe(inviterKey);
      expect(result.status).toBe('paired');
    });

    it('should return inviter status when inviter checks', async () => {
      const inviterKey = 'inviter-123';

      const invite = await store.createInvite(inviterKey);
      const result = await store.joinInvite(invite.inviteId, inviterKey);

      expect(result.rec).not.toBeNull();
      expect(result.role).toBe('inviter');
      expect(result.status).toBe('pending');
    });

    it('should return paired status when inviter checks after pairing', async () => {
      const inviterKey = 'inviter-123';
      const inviteeKey = 'invitee-456';

      const invite = await store.createInvite(inviterKey);
      await store.joinInvite(invite.inviteId, inviteeKey);

      const result = await store.joinInvite(invite.inviteId, inviterKey);

      expect(result.role).toBe('inviter');
      expect(result.partnerKey).toBe(inviteeKey);
      expect(result.status).toBe('paired');
    });

    it('should return paired status when same invitee returns', async () => {
      const inviterKey = 'inviter-123';
      const inviteeKey = 'invitee-456';

      const invite = await store.createInvite(inviterKey);
      await store.joinInvite(invite.inviteId, inviteeKey);

      const result = await store.joinInvite(invite.inviteId, inviteeKey);

      expect(result.role).toBe('invitee');
      expect(result.partnerKey).toBe(inviterKey);
      expect(result.status).toBe('paired');
    });

    it('should reject outsider after invite is paired', async () => {
      const inviterKey = 'inviter-123';
      const inviteeKey = 'invitee-456';
      const outsiderKey = 'outsider-789';

      const invite = await store.createInvite(inviterKey);
      await store.joinInvite(invite.inviteId, inviteeKey);

      const result = await store.joinInvite(invite.inviteId, outsiderKey);

      expect(result.error).toBe('used');
      expect(result.status).toBe('paired');
    });

    it('should return null for non-existent invite', async () => {
      const result = await store.joinInvite('non-existent', 'user-123');

      expect(result.rec).toBeNull();
    });

    it('should return expired status for expired invite', async () => {
      const inviterKey = 'inviter-123';
      const invite = await store.createInvite(inviterKey, 100);

      await new Promise((r) => setTimeout(r, 150));

      const result = await store.joinInvite(invite.inviteId, 'new-user');

      expect(result.rec).toBeNull();
      expect(result.status).toBe('expired');
    });
  });

  describe('reissueInvite', () => {
    it('should allow inviter to reissue their invite', async () => {
      const inviterKey = 'inviter-123';

      const oldInvite = await store.createInvite(inviterKey);
      const result = await store.reissueInvite(oldInvite.inviteId, inviterKey);

      expect(result.ok).toBe(true);
      expect(result.inviteId).toBeDefined();
      expect(result.inviteId).not.toBe(oldInvite.inviteId);
    });

    it('should reject reissue from non-inviter', async () => {
      const inviterKey = 'inviter-123';
      const otherUser = 'other-user';

      const invite = await store.createInvite(inviterKey);
      const result = await store.reissueInvite(invite.inviteId, otherUser);

      expect(result.ok).toBe(false);
      expect(result.reason).toBe('forbidden');
    });

    it('should reject reissue for non-existent invite', async () => {
      const result = await store.reissueInvite('non-existent', 'user-123');

      expect(result.ok).toBe(false);
      expect(result.reason).toBe('not_found');
    });

    it('should revoke old invite after reissue', async () => {
      const inviterKey = 'inviter-123';

      const oldInvite = await store.createInvite(inviterKey);
      await store.reissueInvite(oldInvite.inviteId, inviterKey);

      // Old invite should be revoked
      const oldResult = await store.joinInvite(oldInvite.inviteId, 'new-user');
      expect(oldResult.rec).toBeNull();
    });
  });

  describe('Invite Pairing Flow', () => {
    it('should complete full invite -> join -> paired flow', async () => {
      const inviterKey = 'alice-123';
      const inviteeKey = 'bob-456';

      // 1. Alice creates invite
      const invite = await store.createInvite(inviterKey);
      expect(invite.inviteId).toBeDefined();

      // 2. Alice checks status (pending)
      const aliceCheck1 = await store.joinInvite(invite.inviteId, inviterKey);
      expect(aliceCheck1.status).toBe('pending');
      expect(aliceCheck1.partnerKey).toBeUndefined();

      // 3. Bob joins
      const bobJoin = await store.joinInvite(invite.inviteId, inviteeKey);
      expect(bobJoin.status).toBe('paired');
      expect(bobJoin.partnerKey).toBe(inviterKey);
      expect(bobJoin.role).toBe('invitee');

      // 4. Alice checks status (paired)
      const aliceCheck2 = await store.joinInvite(invite.inviteId, inviterKey);
      expect(aliceCheck2.status).toBe('paired');
      expect(aliceCheck2.partnerKey).toBe(inviteeKey);
      expect(aliceCheck2.role).toBe('inviter');
    });
  });
});
