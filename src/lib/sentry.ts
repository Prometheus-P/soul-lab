import * as Sentry from '@sentry/react';

/**
 * Sentry 초기화
 * DSN이 설정되지 않으면 비활성화 (로컬 개발용)
 */
export function initSentry(): void {
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn) {
    if (import.meta.env.DEV) {
      console.log('[Sentry] DSN not configured, skipping initialization');
    }
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    release: import.meta.env.VITE_APP_VERSION || '1.0.0',

    // Performance Monitoring
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    // 성능 샘플링 (10%)
    tracesSampleRate: 0.1,

    // 세션 리플레이 샘플링
    replaysSessionSampleRate: 0.1, // 일반 세션 10%
    replaysOnErrorSampleRate: 1.0, // 에러 발생 시 100%

    // 민감 정보 필터링
    beforeSend(event) {
      // birthdate, userKey 등 민감 정보 제거
      if (event.extra) {
        delete event.extra.birthdate;
        delete event.extra.userKey;
      }
      return event;
    },
  });

  if (import.meta.env.DEV) {
    console.log('[Sentry] Initialized successfully');
  }
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
