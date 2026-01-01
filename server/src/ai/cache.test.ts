/**
 * AI Cache Integration Tests
 *
 * Tests for Redis-based AI response caching.
 * Issue #36: AI 캐시 hit/miss 검증
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Create a mock Redis client
const createMockRedis = () => {
  const store = new Map<string, { value: string; expireAt?: number }>();

  return {
    store,

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

    scan: vi.fn(async () => ['0', []]),

    info: vi.fn(async () => 'used_memory_human:1M'),

    clear: () => store.clear(),
  };
};

let mockRedis: ReturnType<typeof createMockRedis>;

// Mock the redis module
vi.mock('../lib/redis.js', () => ({
  getRedis: () => mockRedis,
}));

// Mock logger
vi.mock('../lib/logger.js', () => ({
  logger: {
    debug: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

// Import after mocking
const {
  getCachedResponse,
  cacheResponse,
  withCache,
  buildDailyFortuneKey,
  buildTarotCacheKey,
  buildSynastryCacheKey,
  invalidateCache,
} = await import('./cache.js');

describe('AI Cache', () => {
  beforeEach(() => {
    mockRedis = createMockRedis();
  });

  afterEach(() => {
    mockRedis.clear();
    vi.clearAllMocks();
  });

  describe('getCachedResponse', () => {
    it('should return null for cache miss', async () => {
      const result = await getCachedResponse('non-existent-key');

      expect(result).toBeNull();
      expect(mockRedis.get).toHaveBeenCalledWith('non-existent-key');
    });

    it('should return cached response on hit', async () => {
      const mockResponse = {
        text: 'Your fortune today...',
        tokensUsed: 100,
        model: 'gpt-4o-mini',
        provider: 'openai',
        cachedAt: new Date().toISOString(),
        cacheHit: false,
      };

      mockRedis.store.set('test-key', {
        value: JSON.stringify(mockResponse),
      });

      const result = await getCachedResponse('test-key');

      expect(result).not.toBeNull();
      expect(result!.text).toBe('Your fortune today...');
      expect(result!.cacheHit).toBe(true); // Should be marked as cache hit
    });

    it('should return null for expired entries', async () => {
      const mockResponse = {
        text: 'Old fortune',
        tokensUsed: 100,
        model: 'gpt-4o-mini',
        provider: 'openai',
      };

      mockRedis.store.set('expired-key', {
        value: JSON.stringify(mockResponse),
        expireAt: Date.now() - 1000, // Expired
      });

      const result = await getCachedResponse('expired-key');

      expect(result).toBeNull();
    });
  });

  describe('cacheResponse', () => {
    it('should store response with correct TTL for daily_fortune', async () => {
      const response = {
        text: 'Your daily fortune',
        tokensUsed: 150,
        model: 'gpt-4o-mini',
        provider: 'openai' as const,
      };

      await cacheResponse('fortune-key', response, 'daily_fortune');

      expect(mockRedis.setex).toHaveBeenCalledTimes(1);
      const [key, ttl, value] = mockRedis.setex.mock.calls[0];
      expect(key).toBe('fortune-key');
      expect(ttl).toBe(24 * 60 * 60); // 24 hours
      expect(JSON.parse(value)).toMatchObject({ text: 'Your daily fortune' });
    });

    it('should store response with correct TTL for tarot_reading', async () => {
      const response = {
        text: 'The Fool appears...',
        tokensUsed: 200,
        model: 'claude-3-5-sonnet',
        provider: 'anthropic' as const,
      };

      await cacheResponse('tarot-key', response, 'tarot_reading');

      const [, ttl] = mockRedis.setex.mock.calls[0];
      expect(ttl).toBe(7 * 24 * 60 * 60); // 7 days
    });

    it('should include cachedAt timestamp', async () => {
      const response = {
        text: 'Fortune text',
        tokensUsed: 100,
        model: 'gpt-4o-mini',
        provider: 'openai' as const,
      };

      await cacheResponse('key', response, 'default');

      const [, , value] = mockRedis.setex.mock.calls[0];
      const parsed = JSON.parse(value);
      expect(parsed.cachedAt).toBeDefined();
      expect(new Date(parsed.cachedAt).getTime()).toBeGreaterThan(Date.now() - 1000);
    });
  });

  describe('withCache', () => {
    it('should return cached response on hit', async () => {
      const cachedResponse = {
        text: 'Cached fortune',
        tokensUsed: 100,
        model: 'gpt-4o-mini',
        provider: 'openai',
        cachedAt: new Date().toISOString(),
        cacheHit: false,
      };

      mockRedis.store.set('cache-key', { value: JSON.stringify(cachedResponse) });

      const fetchFn = vi.fn().mockResolvedValue({
        text: 'Fresh fortune',
        tokensUsed: 150,
        model: 'gpt-4o-mini',
        provider: 'openai',
      });

      const result = await withCache('cache-key', 'daily_fortune', fetchFn);

      expect(result.text).toBe('Cached fortune');
      expect(result.cacheHit).toBe(true);
      expect(fetchFn).not.toHaveBeenCalled(); // Should not call API
    });

    it('should call fetchFn on cache miss', async () => {
      const freshResponse = {
        text: 'Fresh fortune',
        tokensUsed: 150,
        model: 'gpt-4o-mini',
        provider: 'openai' as const,
      };

      const fetchFn = vi.fn().mockResolvedValue(freshResponse);

      const result = await withCache('miss-key', 'daily_fortune', fetchFn);

      expect(result.text).toBe('Fresh fortune');
      expect(result.cacheHit).toBe(false);
      expect(fetchFn).toHaveBeenCalledTimes(1);
    });

    it('should cache the response after fetch', async () => {
      const freshResponse = {
        text: 'Fresh fortune',
        tokensUsed: 150,
        model: 'gpt-4o-mini',
        provider: 'openai' as const,
      };

      const fetchFn = vi.fn().mockResolvedValue(freshResponse);

      await withCache('new-key', 'daily_fortune', fetchFn);

      expect(mockRedis.setex).toHaveBeenCalledTimes(1);
      const [key] = mockRedis.setex.mock.calls[0];
      expect(key).toBe('new-key');
    });
  });

  describe('Cache Key Builders', () => {
    describe('buildDailyFortuneKey', () => {
      it('should generate consistent keys for same params', () => {
        const params = {
          userKey: 'user-123',
          birthdate: '19900101',
          dateKey: '2024-01-15',
          zodiacSign: 'aquarius',
        };

        const key1 = buildDailyFortuneKey(params);
        const key2 = buildDailyFortuneKey(params);

        expect(key1).toBe(key2);
      });

      it('should generate different keys for different dates', () => {
        const params1 = {
          dateKey: '2024-01-15',
        };
        const params2 = {
          dateKey: '2024-01-16',
        };

        expect(buildDailyFortuneKey(params1)).not.toBe(buildDailyFortuneKey(params2));
      });
    });

    describe('buildTarotCacheKey', () => {
      it('should include spread type and cards', () => {
        const params = {
          userKey: 'user-123',
          spreadType: 'three',
          cardIds: ['1:false', '15:true', '21:false'],
          question: 'What about love?',
        };

        const key = buildTarotCacheKey(params);

        expect(key).toContain('ai:cache:');
        expect(key.length).toBe(41); // prefix (9) + 32 char hash = 41
      });

      it('should generate different keys for different card orders', () => {
        const params1 = {
          spreadType: 'three',
          cardIds: ['1:false', '15:true', '21:false'],
        };
        const params2 = {
          spreadType: 'three',
          cardIds: ['21:false', '1:false', '15:true'],
        };

        expect(buildTarotCacheKey(params1)).not.toBe(buildTarotCacheKey(params2));
      });
    });

    describe('buildSynastryCacheKey', () => {
      it('should generate same key regardless of birthdate order', () => {
        const key1 = buildSynastryCacheKey({
          birthdate1: '19900101',
          birthdate2: '19920315',
        });
        const key2 = buildSynastryCacheKey({
          birthdate1: '19920315',
          birthdate2: '19900101',
        });

        expect(key1).toBe(key2);
      });
    });
  });

  describe('invalidateCache', () => {
    it('should delete existing cache entry', async () => {
      mockRedis.store.set('key-to-delete', { value: 'data' });

      const result = await invalidateCache('key-to-delete');

      expect(result).toBe(true);
      expect(mockRedis.del).toHaveBeenCalledWith('key-to-delete');
    });

    it('should return false for non-existent key', async () => {
      const result = await invalidateCache('non-existent');

      expect(result).toBe(false);
    });
  });
});
