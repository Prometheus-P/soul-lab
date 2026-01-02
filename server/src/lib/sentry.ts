import * as Sentry from '@sentry/node';
import { getConfig } from '../config/index.js';

/**
 * Sentry 초기화
 * DSN이 설정되지 않으면 비활성화
 */
export function initSentry(): void {
  const config = getConfig();
  const dsn = config.SENTRY_DSN;

  if (!dsn) {
    if (config.NODE_ENV === 'development') {
      console.log('[Sentry] DSN not configured, skipping initialization');
    }
    return;
  }

  Sentry.init({
    dsn,
    environment: config.NODE_ENV,
    release: process.env.npm_package_version || '1.0.0',

    // 성능 샘플링 (10%)
    tracesSampleRate: 0.1,

    // 민감 정보 필터링
    beforeSend(event) {
      // birthdate, userKey 등 민감 정보 제거
      if (event.extra) {
        delete event.extra.birthdate;
        delete event.extra.userKey;
      }

      // request body에서 민감 정보 제거
      if (event.request?.data) {
        const data = event.request.data as Record<string, unknown>;
        if (typeof data === 'object') {
          delete data.birthdate;
          delete data.password;
        }
      }

      return event;
    },
  });

  if (config.NODE_ENV === 'development') {
    console.log('[Sentry] Initialized successfully');
  }
}

/**
 * 에러 캡처
 */
export function captureException(
  error: Error,
  context?: {
    requestId?: string;
    method?: string;
    path?: string;
    extra?: Record<string, unknown>;
  },
): void {
  Sentry.captureException(error, {
    extra: {
      requestId: context?.requestId,
      method: context?.method,
      path: context?.path,
      ...context?.extra,
    },
  });
}

/**
 * 사용자 컨텍스트 설정
 */
export function setSentryUser(userKey: string): void {
  Sentry.setUser({ id: userKey });
}

/**
 * 사용자 컨텍스트 초기화
 */
export function clearSentryUser(): void {
  Sentry.setUser(null);
}

export { Sentry };
