import { Request, Response, NextFunction } from 'express';
import { analyticsService } from '../services/analyticsService';
import { logger } from '../config/logger';

/**
 * Middleware para tracking automático de page views e eventos
 *
 * Funcionalidades:
 * - Registra automaticamente page views em rotas públicas
 * - Captura IP, User-Agent e metadata da requisição
 * - Ignora rotas admin, API internas e assets
 * - Não bloqueia a resposta (tracking assíncrono)
 */

// Rotas que não devem ser rastreadas
const IGNORED_PATHS = [
  '/api/admin',
  '/api/auth',
  '/api/analytics/track', // Evitar rastreamento duplicado
  '/health',
  '/favicon.ico',
  '/.well-known',
];

// Extensões de arquivos estáticos que não devem ser rastreadas
const IGNORED_EXTENSIONS = [
  '.js',
  '.css',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.map',
];

/**
 * Verifica se o path deve ser ignorado
 */
function shouldIgnorePath(path: string): boolean {
  // Ignorar paths específicos
  if (IGNORED_PATHS.some((ignored) => path.startsWith(ignored))) {
    return true;
  }

  // Ignorar extensões de arquivos estáticos
  if (IGNORED_EXTENSIONS.some((ext) => path.endsWith(ext))) {
    return true;
  }

  return false;
}

/**
 * Extrai informações úteis da requisição
 */
function extractRequestMetadata(req: Request): Record<string, any> {
  return {
    method: req.method,
    path: req.path,
    query: Object.keys(req.query).length > 0 ? req.query : undefined,
    referrer: req.get('referer') || req.get('referrer'),
    language: req.get('accept-language')?.split(',')[0],
    protocol: req.protocol,
    host: req.get('host'),
  };
}

/**
 * Middleware de tracking automático
 */
export const trackingMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  // Passar para o próximo middleware imediatamente
  next();

  // Processar tracking de forma assíncrona (não bloqueia a resposta)
  setImmediate(async () => {
    try {
      // Verificar se deve ignorar esta rota
      if (shouldIgnorePath(req.path)) {
        return;
      }

      // Capturar IP e User-Agent
      const ip =
        (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
        req.ip ||
        req.socket.remoteAddress ||
        'unknown';

      const userAgent = req.get('user-agent') || 'unknown';

      // Extrair metadata da requisição
      const metadata = extractRequestMetadata(req);

      // Determinar o tipo de evento baseado na rota
      let event = 'page_view';
      let entityType = 'page';
      let entityId: string | undefined;

      // Detectar visualização de post de blog
      if (req.path.startsWith('/api/blog/posts/')) {
        event = 'blog_post_view';
        entityType = 'blog_post';
        // Extrair slug do path (ex: /api/blog/posts/my-post-slug)
        const pathParts = req.path.split('/');
        entityId = pathParts[pathParts.length - 1];
      }
      // Detectar visualização de serviço
      else if (req.path.startsWith('/api/services/')) {
        event = 'service_view';
        entityType = 'service';
        const pathParts = req.path.split('/');
        entityId = pathParts[pathParts.length - 1];
      }
      // Detectar outras rotas públicas
      else if (req.path.startsWith('/api/newsletter')) {
        event = 'newsletter_interaction';
        entityType = 'newsletter';
      } else if (req.path.startsWith('/api/contact')) {
        event = 'contact_interaction';
        entityType = 'contact';
      }

      // Registrar o evento
      await analyticsService.trackEvent({
        event,
        entityType,
        entityId,
        ipAddress: ip,
        userAgent,
        metadata,
      });

      logger.debug(
        {
          event,
          entityType,
          entityId,
          path: req.path,
          ip,
        },
        'Tracking event recorded'
      );
    } catch (error) {
      // Falhas no tracking não devem afetar a aplicação
      logger.error(
        {
          error,
          path: req.path,
        },
        'Failed to track event'
      );
    }
  });
};

/**
 * Middleware de tracking para rotas específicas
 * Permite customizar o evento e entityType
 */
export function createCustomTrackingMiddleware(
  event: string,
  entityType: string
) {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    next();

    setImmediate(async () => {
      try {
        const ip =
          (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
          req.ip ||
          req.socket.remoteAddress ||
          'unknown';

        const userAgent = req.get('user-agent') || 'unknown';
        const metadata = extractRequestMetadata(req);

        await analyticsService.trackEvent({
          event,
          entityType,
          entityId: req.params.id || req.params.slug,
          ipAddress: ip,
          userAgent,
          metadata,
        });
      } catch (error) {
        logger.error({ error }, `Failed to track custom event: ${event}`);
      }
    });
  };
}
