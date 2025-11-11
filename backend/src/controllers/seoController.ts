import { Request, Response } from 'express';
import { seoService } from '../services/seoService';
import { logger } from '../config/logger';

class SeoController {
  /**
   * GET /sitemap.xml
   * Retorna sitemap.xml dinâmico
   */
  async getSitemap(_req: Request, res: Response): Promise<void> {
    try {
      const sitemap = await seoService.generateSitemap();

      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache 1 hora
      res.send(sitemap);
    } catch (error) {
      logger.error({ error }, 'Failed to generate sitemap');
      res.status(500).json({ error: 'Failed to generate sitemap' });
    }
  }

  /**
   * GET /robots.txt
   * Retorna robots.txt
   */
  getRobotsTxt(_req: Request, res: Response): void {
    try {
      const robotsTxt = seoService.generateRobotsTxt();

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache 24 horas
      res.send(robotsTxt);
    } catch (error) {
      logger.error({ error }, 'Failed to generate robots.txt');
      res.status(500).json({ error: 'Failed to generate robots.txt' });
    }
  }

  /**
   * GET /:key.txt
   * Retorna chave IndexNow para verificação
   */
  getIndexNowKey(req: Request, res: Response): void {
    try {
      const { key } = req.params;
      const validKey = seoService.getIndexNowKey();

      if (key !== validKey) {
        res.status(404).send('Not Found');
        return;
      }

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Cache-Control', 'public, max-age=2592000'); // Cache 30 dias
      res.send(validKey);
    } catch (error) {
      logger.error({ error }, 'Failed to serve IndexNow key');
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * POST /api/admin/seo/notify-indexnow
   * Notifica IndexNow sobre URLs atualizadas (Admin only)
   */
  async notifyIndexNow(req: Request, res: Response): Promise<void> {
    try {
      const { urls } = req.body;

      if (!urls || (Array.isArray(urls) && urls.length === 0)) {
        res.status(400).json({ error: 'URLs are required' });
        return;
      }

      await seoService.notifyIndexNow(urls);

      res.json({
        success: true,
        message: 'IndexNow notification sent',
        urls: Array.isArray(urls) ? urls : [urls],
      });
    } catch (error) {
      logger.error({ error }, 'Failed to notify IndexNow');
      res.status(500).json({ error: 'Failed to notify IndexNow' });
    }
  }

  /**
   * GET /api/seo/meta/:type/:identifier
   * Retorna meta tags para uma página específica
   */
  async getMetaTags(req: Request, res: Response): Promise<void> {
    try {
      const { type, identifier } = req.params;

      let metaTags;

      switch (type) {
        case 'post':
          metaTags = await this.getPostMetaTags(identifier);
          break;
        case 'service':
          metaTags = await this.getServiceMetaTags(identifier);
          break;
        default:
          res.status(400).json({ error: 'Invalid type' });
          return;
      }

      if (!metaTags) {
        res.status(404).json({ error: 'Not found' });
        return;
      }

      res.json(metaTags);
    } catch (error) {
      logger.error({ error }, 'Failed to generate meta tags');
      res.status(500).json({ error: 'Failed to generate meta tags' });
    }
  }

  /**
   * GET /api/seo/schema/:type/:identifier
   * Retorna Schema.org markup para uma página
   */
  async getSchemaMarkup(req: Request, res: Response): Promise<void> {
    try {
      const { type, identifier } = req.params;

      let schema;

      switch (type) {
        case 'organization':
          schema = seoService.generateSchemaOrg('organization', {});
          break;
        case 'person':
          schema = seoService.generateSchemaOrg('person', {});
          break;
        case 'post':
          schema = await this.getPostSchema(identifier);
          break;
        case 'service':
          schema = await this.getServiceSchema(identifier);
          break;
        default:
          res.status(400).json({ error: 'Invalid type' });
          return;
      }

      if (!schema) {
        res.status(404).json({ error: 'Not found' });
        return;
      }

      res.json(schema);
    } catch (error) {
      logger.error({ error }, 'Failed to generate schema markup');
      res.status(500).json({ error: 'Failed to generate schema markup' });
    }
  }

  // Private helpers

  private async getPostMetaTags(slug: string) {
    const prisma = (await import('../config/database')).default;

    const post = await prisma.blogPost.findUnique({
      where: { slug },
      select: {
        title: true,
        excerpt: true,
        featuredImage: true,
        slug: true,
        author: true,
        publishedAt: true,
        updatedAt: true,
      },
    });

    if (!post || !post.publishedAt) return null;

    return seoService.generateMetaTags({
      title: `${post.title} | Jennifer Barreto`,
      description: post.excerpt || '',
      image: post.featuredImage || undefined,
      url: `https://jbadvocacia.roilabs.com.br/insights/${post.slug}`,
      type: 'article',
      author: post.author,
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    });
  }

  private async getServiceMetaTags(slug: string) {
    const prisma = (await import('../config/database')).default;

    const service = await prisma.service.findUnique({
      where: { slug },
      select: {
        title: true,
        shortDescription: true,
        slug: true,
      },
    });

    if (!service) return null;

    return seoService.generateMetaTags({
      title: `${service.title} | Jennifer Barreto`,
      description: service.shortDescription,
      url: `https://jbadvocacia.roilabs.com.br/servicos/${service.slug}`,
      type: 'website',
    });
  }

  private async getPostSchema(slug: string) {
    const prisma = (await import('../config/database')).default;

    const post = await prisma.blogPost.findUnique({
      where: { slug },
      select: {
        title: true,
        excerpt: true,
        featuredImage: true,
        slug: true,
        author: true,
        publishedAt: true,
        updatedAt: true,
      },
    });

    if (!post || !post.publishedAt) return null;

    return seoService.generateSchemaOrg('article', {
      title: post.title,
      description: post.excerpt,
      image: post.featuredImage,
      slug: post.slug,
      author: post.author,
      publishedAt: post.publishedAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    });
  }

  private async getServiceSchema(slug: string) {
    const prisma = (await import('../config/database')).default;

    const service = await prisma.service.findUnique({
      where: { slug },
      select: {
        title: true,
        shortDescription: true,
      },
    });

    if (!service) return null;

    return seoService.generateSchemaOrg('service', {
      title: service.title,
      description: service.shortDescription,
    });
  }
}

export const seoController = new SeoController();
