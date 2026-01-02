import { FastifyPluginAsync, FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import { logger } from '../lib/logger.js';
import { isProduction } from '../config/index.js';
import { sanitizeForErrorMessage } from '../lib/promptSecurity.js';
import { captureException } from '../lib/sentry.js';

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    requestId: string;
    details?: unknown;
  };
}

const HTTP_STATUS_TO_ERROR_CODE: Record<number, string> = {
  400: 'VALIDATION_ERROR',
  401: 'UNAUTHORIZED',
  402: 'INSUFFICIENT_CREDITS',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  429: 'RATE_LIMITED',
  500: 'INTERNAL_ERROR',
  503: 'SERVICE_UNAVAILABLE',
};

function getErrorCode(statusCode: number): string {
  return HTTP_STATUS_TO_ERROR_CODE[statusCode] || 'INTERNAL_ERROR';
}

export const errorHandlerPlugin: FastifyPluginAsync = async (app) => {
  app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    const statusCode = error.statusCode || 500;
    const errorCode = getErrorCode(statusCode);
    const isProd = isProduction();

    logger.error(
      {
        requestId: request.requestId,
        correlationId: request.correlationId,
        method: request.method,
        path: request.url,
        statusCode,
        errorCode,
        error: {
          message: error.message,
          code: error.code,
          stack: isProd ? undefined : error.stack,
        },
      },
      'request_error',
    );

    // Sentry에 에러 캡처 (5xx 에러만)
    if (statusCode >= 500) {
      captureException(error, {
        requestId: request.requestId,
        method: request.method,
        path: request.url,
        extra: {
          correlationId: request.correlationId,
          statusCode,
          errorCode,
        },
      });
    }

    // In production, sanitize error messages to prevent information leakage
    // - 5xx errors: generic message
    // - 4xx errors: sanitized message (no paths, IPs, or internal details)
    let userMessage: string;
    if (isProd) {
      if (statusCode >= 500) {
        userMessage = 'Internal server error';
      } else {
        // Sanitize 4xx error messages to remove sensitive info
        userMessage = sanitizeForErrorMessage(error.message);
      }
    } else {
      userMessage = error.message;
    }

    const response: ErrorResponse = {
      success: false,
      error: {
        code: errorCode,
        message: userMessage,
        requestId: request.requestId,
        // Include correlationId for log tracing (safe to expose)
        ...(request.correlationId ? { correlationId: request.correlationId } : {}),
        // Only include stack trace in development
        ...(isProd ? {} : { details: error.stack }),
      },
    };

    reply.status(statusCode).send(response);
  });

  app.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
    const response: ErrorResponse = {
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: `Route ${request.method} ${request.url} not found`,
        requestId: request.requestId,
      },
    };

    reply.status(404).send(response);
  });
};
