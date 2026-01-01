/**
 * Redis-based Sliding Window Rate Limiter
 *
 * Uses the sliding window log algorithm with Redis sorted sets.
 * More accurate than fixed window - no burst at window boundaries.
 */

import { getRedis } from './redis.js';
import { logger } from './logger.js';
import { secureRandomHex } from './secureId.js';

const RATE_LIMIT_PREFIX = 'ratelimit:';

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
  retryAfter?: number;
}

export interface RateLimitOptions {
  key: string;
  limit: number;
  windowMs: number;
}

/**
 * Check and consume rate limit using sliding window algorithm
 */
export async function checkRateLimit(options: RateLimitOptions): Promise<RateLimitResult> {
  const { key, limit, windowMs } = options;
  const redisKey = `${RATE_LIMIT_PREFIX}${key}`;
  const now = Date.now();
  const windowStart = now - windowMs;

  try {
    const redis = getRedis();
    const pipeline = redis.pipeline();

    // Remove old entries, count current, get oldest
    pipeline.zremrangebyscore(redisKey, '-inf', windowStart);
    pipeline.zcard(redisKey);
    pipeline.zrange(redisKey, 0, 0, 'WITHSCORES');

    const results = await pipeline.exec();
    if (!results) throw new Error('Pipeline returned null');

    const currentCount = results[1][1] as number;
    const oldestEntry = results[2][1] as string[];

    let resetAt = now + windowMs;
    if (oldestEntry && oldestEntry.length >= 2) {
      resetAt = parseFloat(oldestEntry[1]) + windowMs;
    }

    if (currentCount >= limit) {
      const retryAfter = Math.ceil((resetAt - now) / 1000);
      return { ok: false, remaining: 0, resetAt, retryAfter: retryAfter > 0 ? retryAfter : 1 };
    }

    const uniqueId = `${now}:${secureRandomHex(4)}`;
    await redis.zadd(redisKey, now, uniqueId);
    await redis.expire(redisKey, Math.ceil(windowMs / 1000) + 60);

    return { ok: true, remaining: Math.max(0, limit - currentCount - 1), resetAt };
  } catch (err) {
    logger.error({ err, key }, 'rate_limit_error');
    return { ok: true, remaining: limit - 1, resetAt: now + windowMs };
  }
}

/**
 * Sliding Window Rate Limiter Class (compatible interface)
 */
export class SlidingWindowLimiter {
  async allow(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
    return checkRateLimit({ key, limit, windowMs });
  }

  sweep(): void {
    // Redis TTL handles cleanup automatically
  }
}

export function createRateLimiter(): SlidingWindowLimiter {
  return new SlidingWindowLimiter();
}

export const rateLimiters = {
  inviteCreateByIp: (ip: string, limit: number, windowMs: number) =>
    checkRateLimit({ key: `invite:ip:${ip}`, limit, windowMs }),
  inviteCreateByUser: (userKey: string, limit: number, windowMs: number) =>
    checkRateLimit({ key: `invite:user:${userKey}`, limit, windowMs }),
  rewardByIp: (ip: string, limit: number, windowMs: number) =>
    checkRateLimit({ key: `reward:ip:${ip}`, limit, windowMs }),
  rewardByUser: (userKey: string, limit: number, windowMs: number) =>
    checkRateLimit({ key: `reward:user:${userKey}`, limit, windowMs }),
};
