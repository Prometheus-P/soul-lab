import 'dotenv/config';
import { initSentry } from './lib/sentry.js';

// Sentry 초기화 (가장 먼저 실행)
initSentry();

import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { EventLogger } from './logger.js';
import { createRateLimiter } from './lib/rateLimiter.js';
import { createInviteStore } from './stores/inviteStore.js';
import { createRewardStore } from './stores/rewardStore.js';
import { ProfileStore } from './profile/store.js';
import { fortuneRoutes } from './routes/fortune.js';
import { creditRoutes } from './routes/credits.js';
import { adminRoutes } from './routes/admin.js';
import { authRoutes } from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import { pushRoutes } from './routes/push.js';
import { leaderboardRoutes } from './routes/leaderboard.js';
import { loadConfig } from './config/index.js';
import { logger as pinoLogger } from './lib/logger.js';
import { requestContextPlugin } from './middleware/requestContext.js';
import { errorHandlerPlugin } from './middleware/errorHandler.js';
import { userAuthPlugin } from './middleware/userAuth.js';
import { globalRateLimitMiddleware } from './middleware/globalRateLimit.js';
import { isRedisHealthy, closeRedis } from './lib/redis.js';
import { initProcessedPaymentsStore } from './lib/iapVerifier.js';

const config = loadConfig();

const app = Fastify({
  logger: false, // Using custom pino logger instead
});

const PORT = config.PORT;
const DATA_DIR = config.DATA_DIR;

// Invite TTL: 24h
const INVITE_TTL_MS = 24 * 60 * 60 * 1000;

// Rate limit (Redis sliding-window)
const INVITE_WINDOW_MS = 60 * 60 * 1000; // 1h
const INVITE_LIMIT_PER_IP = config.INVITE_LIMIT_PER_IP;
const INVITE_LIMIT_PER_USER = config.INVITE_LIMIT_PER_USER;

const REWARD_WINDOW_MS = 10 * 60 * 1000; // 10m (spam 방지)
const REWARD_LIMIT_PER_IP = config.REWARD_LIMIT_PER_IP;
const REWARD_LIMIT_PER_USER = config.REWARD_LIMIT_PER_USER;

// Redis-based stores (async operations with distributed locking)
const inviteStore = createInviteStore();
const rewardStore = createRewardStore();

// File-based stores (still using local filesystem)
const profiles = new ProfileStore(DATA_DIR);
const logger = new EventLogger(DATA_DIR);

// Initialize IAP idempotency cache (survives server restarts)
initProcessedPaymentsStore(DATA_DIR);

const limiter = createRateLimiter();

// CORS configuration - use whitelist in production
const corsOrigin = (() => {
  if (config.CORS_ORIGINS) {
    const origins = config.CORS_ORIGINS.split(',')
      .map((o) => o.trim())
      .filter(Boolean);
    return origins.length > 0 ? origins : true;
  }
  // Development: allow all origins
  if (config.NODE_ENV === 'development') {
    return true;
  }
  // Default production: deny all cross-origin
  return false;
})();

await app.register(cors, {
  origin: corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Correlation-Id',
    'X-User-Key',
    'X-Timestamp',
    'X-Signature',
    'X-Session-Token',
  ],
});

// Security headers (helmet)
await app.register(helmet, {
  // Content Security Policy - API server doesn't serve HTML, but good baseline
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles for error pages
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"], // Prevent clickjacking
      upgradeInsecureRequests: [],
    },
  },
  // HTTP Strict Transport Security - force HTTPS
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  // Prevent MIME type sniffing
  noSniff: true,
  // XSS filter (legacy browsers)
  xssFilter: true,
  // Prevent clickjacking
  frameguard: { action: 'deny' },
  // Hide X-Powered-By header
  hidePoweredBy: true,
  // Referrer Policy
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  // Cross-Origin policies
  crossOriginEmbedderPolicy: false, // Disable for API compatibility
  crossOriginOpenerPolicy: { policy: 'same-origin' },
  crossOriginResourcePolicy: { policy: 'same-origin' },
});

// Register middleware plugins
await app.register(requestContextPlugin);
await app.register(errorHandlerPlugin);
await app.register(userAuthPlugin);
await app.register(globalRateLimitMiddleware);

// Register auth routes (session tokens)
await app.register(authRoutes);

// Register fortune routes (astrology, tarot, AI)
await app.register(fortuneRoutes);

// Register credit routes (IAP, credits)
await app.register(creditRoutes, { dataDir: DATA_DIR });

// Register admin routes (dashboard)
await app.register(adminRoutes, { dataDir: DATA_DIR, store: inviteStore, rewards: rewardStore });

// Register profile routes (user data sync)
await app.register(profileRoutes, { profileStore: profiles });

// Register push notification routes
await app.register(pushRoutes);

// Register leaderboard routes
await app.register(leaderboardRoutes);

function meta(req: any) {
  const ip = req.ip;
  const ua = String(req.headers?.['user-agent'] ?? '');
  return { ip, ua };
}

function rateKey(prefix: string, v: string) {
  return `${prefix}:${v}`;
}

app.get('/health', async () => ({ ok: true }));

app.get('/ready', async (req, reply) => {
  const checks: Record<string, boolean> = {
    redis: false,
    aiProvider: false,
  };

  // Check Redis connection
  try {
    checks.redis = await isRedisHealthy();
  } catch {
    checks.redis = false;
  }

  // Check if at least one AI provider is configured
  checks.aiProvider = !!(config.OPENAI_API_KEY || config.ANTHROPIC_API_KEY);

  const ready = checks.redis; // AI provider is optional

  if (!ready) {
    pinoLogger.warn({ checks }, 'readiness_check_failed');
    return reply.code(503).send({ ok: false, checks });
  }

  return { ok: true, checks };
});

app.post('/api/invites', async (req, reply) => {
  const body = (req.body ?? {}) as any;
  const inviterKey = String(body.inviterKey ?? '').trim();
  if (!inviterKey) return reply.code(400).send({ error: 'inviterKey_required' });

  const { ip, ua } = meta(req);

  const ipRate = await limiter.allow(
    rateKey('invite_ip', ip),
    INVITE_LIMIT_PER_IP,
    INVITE_WINDOW_MS,
  );
  if (!ipRate.ok) {
    logger.log({
      ts: Date.now(),
      type: 'invite_create_rate_limited',
      ip,
      ua,
      inviterKey,
      resetAt: ipRate.resetAt,
    });
    return reply.code(429).send({ error: 'rate_limited', resetAt: ipRate.resetAt });
  }

  const userRate = await limiter.allow(
    rateKey('invite_user', inviterKey),
    INVITE_LIMIT_PER_USER,
    INVITE_WINDOW_MS,
  );
  if (!userRate.ok) {
    logger.log({
      ts: Date.now(),
      type: 'invite_create_rate_limited',
      ip,
      ua,
      inviterKey,
      resetAt: userRate.resetAt,
    });
    return reply.code(429).send({ error: 'rate_limited', resetAt: userRate.resetAt });
  }

  const rec = await inviteStore.createInvite(inviterKey, INVITE_TTL_MS);

  logger.log({
    ts: Date.now(),
    type: 'invite_created',
    ip,
    ua,
    inviterKey,
    inviteId: rec.inviteId,
    expiresAt: rec.expiresAt,
  });

  return { inviteId: rec.inviteId, expiresAt: rec.expiresAt };
});

app.get('/api/invites/:id', async (req, reply) => {
  const id = (req.params as any).id as string;
  const rec = await inviteStore.getInvite(id);
  if (!rec) return reply.code(404).send({ error: 'not_found' });

  const now = Date.now();
  const status = rec.expiresAt <= now ? 'expired' : rec.inviteeKey ? 'paired' : 'pending';
  return { inviteId: rec.inviteId, status, expiresAt: rec.expiresAt };
});

app.post('/api/invites/:id/join', async (req, reply) => {
  const id = (req.params as any).id as string;
  const body = (req.body ?? {}) as any;
  const userKey = String(body.userKey ?? '').trim();
  if (!userKey) return reply.code(400).send({ error: 'userKey_required' });

  const { ip, ua } = meta(req);

  const out = await inviteStore.joinInvite(id, userKey);

  if (!out.rec) {
    logger.log({
      ts: Date.now(),
      type: 'invite_join_not_found',
      ip,
      ua,
      inviteId: id,
      userKey,
      status: out.status,
    });
    return reply.code(404).send({ error: out.status === 'expired' ? 'expired' : 'not_found' });
  }

  if (out.error === 'used') {
    logger.log({
      ts: Date.now(),
      type: 'invite_join_used_blocked',
      ip,
      ua,
      inviteId: id,
      userKey,
      inviterKey: out.rec.inviterKey,
      inviteeKey: out.rec.inviteeKey,
    });
    return reply.code(403).send({ error: 'used' });
  }

  logger.log({
    ts: Date.now(),
    type: 'invite_joined',
    ip,
    ua,
    inviteId: id,
    userKey,
    role: out.role,
    status: out.status,
    partnerKey: out.partnerKey ?? null,
  });

  return {
    inviteId: id,
    status: out.status,
    role: out.role,
    partnerKey: out.partnerKey ?? null,
    expiresAt: out.rec.expiresAt,
  };
});

app.post('/api/invites/:id/reissue', async (req, reply) => {
  const id = (req.params as any).id as string;
  const body = (req.body ?? {}) as any;
  const userKey = String(body.userKey ?? '').trim();
  if (!userKey) return reply.code(400).send({ error: 'userKey_required' });

  const { ip, ua } = meta(req);

  const out = await inviteStore.reissueInvite(id, userKey, INVITE_TTL_MS);
  if (!out.ok) {
    logger.log({
      ts: Date.now(),
      type: 'invite_reissue_failed',
      ip,
      ua,
      inviteId: id,
      userKey,
      reason: out.reason,
    });
    if (out.reason === 'forbidden') return reply.code(403).send({ error: 'forbidden' });
    if (out.reason === 'expired') return reply.code(404).send({ error: 'expired' });
    return reply.code(404).send({ error: 'not_found' });
  }

  logger.log({
    ts: Date.now(),
    type: 'invite_reissued',
    ip,
    ua,
    oldInviteId: id,
    inviterKey: userKey,
    newInviteId: out.inviteId,
    expiresAt: out.expiresAt,
  });

  return out;
});

// 보상형 광고 "1일 1회" 서버 기록 (완벽한 검증은 불가하지만, 다중 기기/리플레이 방어에 도움)
app.post('/api/rewards/earn', async (req, reply) => {
  const body = (req.body ?? {}) as any;
  const userKey = String(body.userKey ?? '').trim();
  const dateKey = String(body.dateKey ?? '').trim(); // e.g. 2025-12-26
  const scope = typeof body.scope === 'string' ? body.scope : undefined;

  if (!userKey) return reply.code(400).send({ error: 'userKey_required' });
  if (!dateKey) return reply.code(400).send({ error: 'dateKey_required' });

  const { ip, ua } = meta(req);

  const ipRate = await limiter.allow(
    rateKey('reward_ip', ip),
    REWARD_LIMIT_PER_IP,
    REWARD_WINDOW_MS,
  );
  const userRate = await limiter.allow(
    rateKey('reward_user', userKey),
    REWARD_LIMIT_PER_USER,
    REWARD_WINDOW_MS,
  );
  if (!ipRate.ok || !userRate.ok) {
    logger.log({ ts: Date.now(), type: 'reward_rate_limited', ip, ua, userKey, dateKey, scope });
    return reply.code(429).send({ error: 'rate_limited' });
  }

  // Redis TTL handles cleanup automatically (45 days)
  const out = await rewardStore.earn(userKey, dateKey, scope, { ip, ua });

  logger.log({
    ts: Date.now(),
    type: 'reward_earned',
    ip,
    ua,
    userKey,
    dateKey,
    scope,
    already: out.already,
  });

  return { ok: true, already: out.already };
});

// Check if reward was already earned (for client pre-check)
app.get('/api/rewards/check', async (req, reply) => {
  const query = req.query as Record<string, string>;
  const userKey = String(query.userKey ?? '').trim();
  const dateKey = String(query.dateKey ?? '').trim();

  if (!userKey) return reply.code(400).send({ error: 'userKey_required' });
  if (!dateKey) return reply.code(400).send({ error: 'dateKey_required' });

  const key = `${userKey}:${dateKey}`;
  const record = await rewardStore.getByKey(key);

  if (record) {
    return { earned: true, earnedAt: record.earnedAt };
  }

  return { earned: false };
});

// Graceful shutdown handler
async function gracefulShutdown(signal: string) {
  pinoLogger.info({ signal }, 'shutdown_signal_received');

  try {
    await app.close();
    pinoLogger.info('fastify_closed');
  } catch (err) {
    pinoLogger.error({ err }, 'fastify_close_error');
  }

  try {
    await closeRedis();
    pinoLogger.info('redis_closed');
  } catch (err) {
    pinoLogger.error({ err }, 'redis_close_error');
  }

  process.exit(0);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

app
  .listen({ port: PORT, host: '0.0.0.0' })
  .then(() => {
    pinoLogger.info({ port: PORT, dataDir: DATA_DIR, env: config.NODE_ENV }, 'server_started');

    // Security warning for development mode
    if (config.NODE_ENV === 'development') {
      pinoLogger.warn(
        'Running in DEVELOPMENT mode - auth signature verification is relaxed. ' +
          'Do NOT use in production!',
      );
    }
  })
  .catch((err) => {
    pinoLogger.fatal({ err }, 'server_startup_failed');
    process.exit(1);
  });
