import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { Request, Response, NextFunction } from 'express';
import env from './env';
import { logger } from './logger';

/**
 * Configuração do Sentry para error tracking e performance monitoring
 *
 * Features:
 * - Captura automática de erros não tratados
 * - Performance monitoring (APM)
 * - Request tracking
 * - User context
 * - Release tracking
 * - Environment tagging
 *
 * Variáveis de ambiente necessárias:
 * - SENTRY_DSN: URL do projeto Sentry
 * - SENTRY_ENVIRONMENT (opcional): production, staging, development
 * - SENTRY_TRACES_SAMPLE_RATE (opcional): 0.0 a 1.0
 * - SENTRY_PROFILES_SAMPLE_RATE (opcional): 0.0 a 1.0
 */

interface SentryConfig {
  dsn?: string;
  environment?: string;
  tracesSampleRate?: number;
  profilesSampleRate?: number;
  enabled?: boolean;
}

/**
 * Verifica se o Sentry está habilitado
 */
export function isSentryEnabled(): boolean {
  return !!(
    env.SENTRY_DSN &&
    env.SENTRY_DSN !== '' &&
    env.SENTRY_DSN !== 'your-sentry-dsn-here'
  );
}

/**
 * Inicializar Sentry
 */
export function initSentry(): void {
  if (!isSentryEnabled()) {
    logger.info('Sentry disabled (SENTRY_DSN not configured)');
    return;
  }

  try {
    const config: SentryConfig = {
      dsn: env.SENTRY_DSN,
      environment: env.SENTRY_ENVIRONMENT || env.NODE_ENV,
      tracesSampleRate: env.SENTRY_TRACES_SAMPLE_RATE || 0.1,
      profilesSampleRate: env.SENTRY_PROFILES_SAMPLE_RATE || 0.1,
    };

    Sentry.init({
      dsn: config.dsn,
      environment: config.environment,

      // Performance Monitoring
      tracesSampleRate: config.tracesSampleRate,
      profilesSampleRate: config.profilesSampleRate,

      // Integrations
      integrations: [
        nodeProfilingIntegration(),
      ],

      // Before send hook - filtrar dados sensíveis
      beforeSend(event) {
        // Remover dados sensíveis dos logs
        if (event.request) {
          // Remover headers sensíveis
          if (event.request.headers) {
            delete event.request.headers.authorization;
            delete event.request.headers.cookie;
            delete event.request.headers['x-api-key'];
          }

          // Remover query params sensíveis
          if (event.request.query_string && typeof event.request.query_string === 'string') {
            event.request.query_string = event.request.query_string
              .replace(/token=[^&]*/g, 'token=***')
              .replace(/password=[^&]*/g, 'password=***')
              .replace(/api_key=[^&]*/g, 'api_key=***');
          }
        }

        // Remover dados sensíveis do body
        if (event.request?.data) {
          const data = event.request.data as any;
          if (data.password) data.password = '***';
          if (data.token) data.token = '***';
          if (data.apiKey) data.apiKey = '***';
        }

        return event;
      },

      // Ignorar certos erros
      ignoreErrors: [
        // Erros de rede comuns
        'Network request failed',
        'NetworkError',
        'Failed to fetch',
        // Timeouts
        'timeout',
        'ETIMEDOUT',
        // User aborted
        'AbortError',
        'Request aborted',
        // Rate limiting
        'Too Many Requests',
        'Rate limit exceeded',
      ],
    });

    logger.info(
      {
        environment: config.environment,
        tracesSampleRate: config.tracesSampleRate,
        profilesSampleRate: config.profilesSampleRate,
      },
      '✅ Sentry initialized'
    );
  } catch (error) {
    logger.error({ error }, '❌ Failed to initialize Sentry');
  }
}

/**
 * Middleware para capturar requisições no Sentry
 * Deve ser aplicado ANTES de todas as rotas
 */
export function sentryRequestHandler() {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!isSentryEnabled()) {
      return next();
    }

    // Capturar contexto da requisição
    Sentry.setContext('http', {
      method: req.method,
      url: req.url,
      query: req.query,
      headers: {
        'user-agent': req.get('user-agent'),
        'referer': req.get('referer'),
      },
    });

    next();
  };
}

/**
 * Middleware de tracing para performance monitoring
 * Simplificado - apenas passa para o próximo handler
 */
export function sentryTracingHandler() {
  return (_req: Request, _res: Response, next: NextFunction) => {
    next();
  };
}

/**
 * Middleware de erro do Sentry
 * Deve ser aplicado DEPOIS de todas as rotas, mas ANTES do errorHandler
 */
export function sentryErrorHandler() {
  return (err: any, _req: Request, _res: Response, next: NextFunction) => {
    if (!isSentryEnabled()) {
      return next(err);
    }

    // Enviar apenas erros 500+
    const statusCode = err.statusCode || 500;
    if (statusCode >= 500) {
      Sentry.captureException(err);
    }

    next(err);
  };
}

/**
 * Capturar exceção manualmente
 */
export function captureException(error: Error, context?: Record<string, any>) {
  if (!isSentryEnabled()) {
    return;
  }

  Sentry.captureException(error, {
    contexts: context ? { additional: context } : undefined,
  });
}

/**
 * Capturar mensagem manualmente
 */
export function captureMessage(
  message: string,
  level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'info',
  context?: Record<string, any>
) {
  if (!isSentryEnabled()) {
    return;
  }

  Sentry.captureMessage(message, {
    level,
    contexts: context ? { additional: context } : undefined,
  });
}

/**
 * Adicionar contexto de usuário
 */
export function setUserContext(user: {
  id: string;
  email?: string;
  username?: string;
}) {
  if (!isSentryEnabled()) {
    return;
  }

  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.username,
  });
}

/**
 * Limpar contexto de usuário
 */
export function clearUserContext() {
  if (!isSentryEnabled()) {
    return;
  }

  Sentry.setUser(null);
}

/**
 * Adicionar breadcrumb (rastro de eventos)
 */
export function addBreadcrumb(
  message: string,
  category: string,
  data?: Record<string, any>
) {
  if (!isSentryEnabled()) {
    return;
  }

  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level: 'info',
  });
}

export default Sentry;
