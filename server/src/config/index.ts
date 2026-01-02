import { z } from 'zod';

const envSchema = z.object({
  // Server
  NODE_ENV: z.enum(['development', 'staging', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(8787),
  DATA_DIR: z.string().default('server/data'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

  // Redis
  REDIS_URL: z.string().optional(), // e.g., redis://localhost:6379 or rediss://user:pass@host:port

  // Rate Limits - Invites
  INVITE_LIMIT_PER_IP: z.coerce.number().default(40),
  INVITE_LIMIT_PER_USER: z.coerce.number().default(20),

  // Rate Limits - Rewards
  REWARD_LIMIT_PER_IP: z.coerce.number().default(60),
  REWARD_LIMIT_PER_USER: z.coerce.number().default(20),

  // AI Providers
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  AI_DEFAULT_TIER: z.enum(['mini', 'standard', 'premium']).default('mini'),

  // Admin
  ADMIN_PASSWORD: z.string().min(8).optional(),
  JWT_SECRET: z.string().min(32).optional(),

  // User Authentication
  SIGNING_SECRET: z.string().min(32).optional(), // HMAC signing secret for user requests

  // CORS
  CORS_ORIGINS: z.string().optional(), // Comma-separated list of allowed origins

  // Profile Encryption
  PROFILE_ENCRYPTION_KEY: z.string().length(64).optional(), // 32-byte hex key for birthdate encryption

  // Data Encryption (for credit/transaction files)
  DATA_ENCRYPTION_KEY: z.string().length(64).optional(), // 32-byte hex key for sensitive data files

  // Web URLs (for OG tags and sharing)
  WEB_BASE_URL: z.string().url().optional(), // e.g., https://soul-lab.vercel.app
  OG_BASE_URL: z.string().url().optional(), // e.g., https://cdn.soul-lab.com (for OG images)

  // Monitoring
  SENTRY_DSN: z.string().optional(), // Sentry DSN for error tracking
});

export type Config = z.infer<typeof envSchema>;

let _config: Config | null = null;

export function loadConfig(): Config {
  if (_config) return _config;

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('Invalid environment variables:');
    for (const issue of result.error.issues) {
      console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
    }
    process.exit(1);
  }

  _config = result.data;
  return _config;
}

export function getConfig(): Config {
  if (!_config) {
    return loadConfig();
  }
  return _config;
}

export const isProduction = () => getConfig().NODE_ENV === 'production';
export const isDevelopment = () => getConfig().NODE_ENV === 'development';
