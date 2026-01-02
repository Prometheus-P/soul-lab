/**
 * Global Rate Limiting Middleware
 *
 * Applies baseline rate limiting to all API routes.
 * Individual routes can have stricter limits on top of this.
 */

import type { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';
import { checkRateLimit } from '../lib/rateLimiter.js';
import { logger } from '../lib/logger.js';

// Global limits (per IP)
const GLOBAL_LIMIT = 100; // requests per window
const GLOBAL_WINDOW_MS = 60 * 1000; // 1 minute

// AI endpoint limits (more restrictive due to cost)
const AI_LIMIT = 10; // requests per window
const AI_WINDOW_MS = 60 * 1000; // 1 minute

// Paths that require stricter limits (AI endpoints)
const AI_PATHS = ['/api/ai/', '/api/tarot/interpret', '/api/fortune/daily'];

// Paths excluded from rate limiting
const EXCLUDED_PATHS = ['/health', '/ready'];

function getClientIp(request: FastifyRequest): string {
  // Check common proxy headers
  const forwarded = request.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].split(',')[0].trim();
  }

  const realIp = request.headers['x-real-ip'];
  if (typeof realIp === 'string') {
    return realIp;
  }

  return request.ip;
}

const globalRateLimitPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
    const path = request.url.split('?')[0];

    // Skip excluded paths
    if (EXCLUDED_PATHS.some((p) => path === p)) {
      return;
    }

    // Skip non-API paths
    if (!path.startsWith('/api')) {
      return;
    }

    const ip = getClientIp(request);

    // Check if this is an AI endpoint (stricter limits)
    const isAiEndpoint = AI_PATHS.some((p) => path.startsWith(p));

    if (isAiEndpoint) {
      const aiResult = await checkRateLimit({
        key: `global:ai:${ip}`,
        limit: AI_LIMIT,
        windowMs: AI_WINDOW_MS,
      });

      if (!aiResult.ok) {
        logger.warn({ ip, path, resetAt: aiResult.resetAt }, 'ai_rate_limited');
        reply.header('Retry-After', String(aiResult.retryAfter ?? 60));
        reply.header('X-RateLimit-Limit', String(AI_LIMIT));
        reply.header('X-RateLimit-Remaining', '0');
        reply.header('X-RateLimit-Reset', String(Math.ceil(aiResult.resetAt / 1000)));
        return reply.code(429).send({
          error: 'rate_limited',
          message: 'AI endpoint rate limit exceeded',
          retryAfter: aiResult.retryAfter,
        });
      }

      reply.header('X-RateLimit-Limit', String(AI_LIMIT));
      reply.header('X-RateLimit-Remaining', String(aiResult.remaining));
      reply.header('X-RateLimit-Reset', String(Math.ceil(aiResult.resetAt / 1000)));
    }

    // Global rate limit for all API endpoints
    const globalResult = await checkRateLimit({
      key: `global:api:${ip}`,
      limit: GLOBAL_LIMIT,
      windowMs: GLOBAL_WINDOW_MS,
    });

    if (!globalResult.ok) {
      logger.warn({ ip, path, resetAt: globalResult.resetAt }, 'global_rate_limited');
      reply.header('Retry-After', String(globalResult.retryAfter ?? 60));
      reply.header('X-RateLimit-Limit', String(GLOBAL_LIMIT));
      reply.header('X-RateLimit-Remaining', '0');
      reply.header('X-RateLimit-Reset', String(Math.ceil(globalResult.resetAt / 1000)));
      return reply.code(429).send({
        error: 'rate_limited',
        message: 'Too many requests',
        retryAfter: globalResult.retryAfter,
      });
    }

    // Set rate limit headers (global limits take precedence if not AI)
    if (!isAiEndpoint) {
      reply.header('X-RateLimit-Limit', String(GLOBAL_LIMIT));
      reply.header('X-RateLimit-Remaining', String(globalResult.remaining));
      reply.header('X-RateLimit-Reset', String(Math.ceil(globalResult.resetAt / 1000)));
    }
  });
};

export const globalRateLimitMiddleware = fp(globalRateLimitPlugin, {
  name: 'globalRateLimit',
  dependencies: [],
});
