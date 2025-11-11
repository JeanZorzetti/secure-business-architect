import prisma from '../config/database';
import { env } from '../config/env';
import { logger } from '../config/logger';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

interface IndexNowSubmission {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

class SeoService {
  private readonly baseUrl: string;
  private readonly indexNowKey: string;

  constructor() {
    this.baseUrl = env.FRONTEND_URL || 'https://jbadvocacia.roilabs.com.br';
    this.indexNowKey = env.INDEXNOW_KEY || this.generateIndexNowKey();
  }

  /**
   * Gera sitemap.xml dinâmico
   */
  async generateSitemap(): Promise<string> {
    const urls: SitemapUrl[] = [];

    // Páginas estáticas
    const staticPages = [
      { loc: '/', changefreq: 'daily' as const, priority: 1.0 },
      { loc: '/sobre', changefreq: 'weekly' as const, priority: 0.8 },
      { loc: '/servicos', changefreq: 'weekly' as const, priority: 0.9 },
      { loc: '/insights', changefreq: 'daily' as const, priority: 0.9 },
      { loc: '/contato', changefreq: 'monthly' as const, priority: 0.7 },
    ];

    urls.push(...staticPages.map(page => ({
      ...page,
      loc: `${this.baseUrl}${page.loc}`,
    })));

    // Serviços dinâmicos
    const services = await prisma.service.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
      orderBy: { order: 'asc' },
    });

    urls.push(...services.map((service: { slug: string; updatedAt: Date }) => ({
      loc: `${this.baseUrl}/servicos/${service.slug}`,
      lastmod: service.updatedAt.toISOString(),
      changefreq: 'weekly' as const,
      priority: 0.8,
    })));

    // Blog posts
    const posts = await prisma.blogPost.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true },
      orderBy: { publishedAt: 'desc' },
    });

    urls.push(...posts.map((post: { slug: string; updatedAt: Date }) => ({
      loc: `${this.baseUrl}/insights/${post.slug}`,
      lastmod: post.updatedAt.toISOString(),
      changefreq: 'monthly' as const,
      priority: 0.7,
    })));

    // Gerar XML
    return this.buildSitemapXml(urls);
  }

  /**
   * Gera robots.txt
   */
  generateRobotsTxt(): string {
    const sitemapUrl = `${this.baseUrl}/sitemap.xml`;

    return `# Robots.txt for ${this.baseUrl}
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

# Sitemaps
Sitemap: ${sitemapUrl}

# IndexNow
IndexNow-Key: ${this.indexNowKey}

# Crawl-delay (optional)
Crawl-delay: 1
`;
  }

  /**
   * Retorna a chave IndexNow para verificação
   */
  getIndexNowKey(): string {
    return this.indexNowKey;
  }

  /**
   * Notifica IndexNow sobre URLs atualizadas
   */
  async notifyIndexNow(urls: string | string[]): Promise<void> {
    if (!env.INDEXNOW_ENABLED) {
      logger.info('IndexNow disabled, skipping notification');
      return;
    }

    try {
      const urlList = Array.isArray(urls) ? urls : [urls];

      // IndexNow aceita URLs completas
      const fullUrls = urlList.map(url =>
        url.startsWith('http') ? url : `${this.baseUrl}${url}`
      );

      const payload: IndexNowSubmission = {
        host: new URL(this.baseUrl).hostname,
        key: this.indexNowKey,
        keyLocation: `${this.baseUrl}/${this.indexNowKey}.txt`,
        urlList: fullUrls,
      };

      // Submit to IndexNow API (múltiplos search engines)
      const searchEngines = [
        'https://api.indexnow.org/indexnow',
        'https://www.bing.com/indexnow',
        'https://yandex.com/indexnow',
      ];

      const results = await Promise.allSettled(
        searchEngines.map(endpoint =>
          fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        )
      );

      const successful = results.filter(r => r.status === 'fulfilled').length;
      logger.info({ urls: fullUrls, successful, total: searchEngines.length }, 'IndexNow notification sent');

    } catch (error) {
      logger.error({ error, urls }, 'Failed to notify IndexNow');
    }
  }

  /**
   * Gera meta tags dinâmicas para uma página
   */
  generateMetaTags(params: {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
  }): Record<string, string> {
    const {
      title,
      description,
      image = `${this.baseUrl}/og-image.jpg`,
      url = this.baseUrl,
      type = 'website',
      author,
      publishedTime,
      modifiedTime,
    } = params;

    const meta: Record<string, string> = {
      // Basic meta tags
      'title': title,
      'description': description,

      // Open Graph
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'og:url': url,
      'og:type': type,
      'og:site_name': 'Jennifer Barreto - Advogada Empresarial',

      // Twitter Card
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
    };

    // Article-specific meta tags
    if (type === 'article') {
      if (author) meta['article:author'] = author;
      if (publishedTime) meta['article:published_time'] = publishedTime;
      if (modifiedTime) meta['article:modified_time'] = modifiedTime;
    }

    return meta;
  }

  /**
   * Gera Schema.org markup para diferentes tipos de conteúdo
   */
  generateSchemaOrg(type: 'organization' | 'person' | 'article' | 'service', data: any): object {
    const baseContext = 'https://schema.org';

    switch (type) {
      case 'organization':
        return {
          '@context': baseContext,
          '@type': 'LegalService',
          name: 'Jennifer Barreto - Advocacia Empresarial',
          description: 'Advogada especializada em Direito Empresarial com foco estratégico',
          url: this.baseUrl,
          logo: `${this.baseUrl}/logo.png`,
          image: `${this.baseUrl}/og-image.jpg`,
          telephone: '+55-11-99999-9999',
          email: 'contato@jenniferbarreto.adv.br',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'São Paulo',
            addressRegion: 'SP',
            addressCountry: 'BR',
          },
          areaServed: 'BR',
          priceRange: '$$',
        };

      case 'person':
        return {
          '@context': baseContext,
          '@type': 'Person',
          name: 'Jennifer Barreto',
          jobTitle: 'Advogada Empresarial',
          description: 'Advogada especializada em Direito Empresarial com abordagem estratégica',
          url: this.baseUrl,
          image: data.image || `${this.baseUrl}/jennifer-barreto.jpg`,
          sameAs: [
            'https://linkedin.com/in/jenniferbarreto',
          ],
          worksFor: {
            '@type': 'LegalService',
            name: 'Jennifer Barreto - Advocacia Empresarial',
          },
        };

      case 'article':
        return {
          '@context': baseContext,
          '@type': 'Article',
          headline: data.title,
          description: data.description || data.excerpt,
          image: data.image || `${this.baseUrl}/og-image.jpg`,
          author: {
            '@type': 'Person',
            name: data.author || 'Jennifer Barreto',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Jennifer Barreto - Advocacia Empresarial',
            logo: {
              '@type': 'ImageObject',
              url: `${this.baseUrl}/logo.png`,
            },
          },
          datePublished: data.publishedAt,
          dateModified: data.updatedAt || data.publishedAt,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${this.baseUrl}/insights/${data.slug}`,
          },
        };

      case 'service':
        return {
          '@context': baseContext,
          '@type': 'Service',
          name: data.title,
          description: data.description,
          provider: {
            '@type': 'LegalService',
            name: 'Jennifer Barreto - Advocacia Empresarial',
          },
          areaServed: 'BR',
          serviceType: 'Legal Service',
        };

      default:
        return {};
    }
  }

  // Private helpers

  private buildSitemapXml(urls: SitemapUrl[]): string {
    const urlElements = urls.map(url => {
      const parts = [
        `    <url>`,
        `      <loc>${this.escapeXml(url.loc)}</loc>`,
      ];

      if (url.lastmod) {
        parts.push(`      <lastmod>${url.lastmod}</lastmod>`);
      }
      if (url.changefreq) {
        parts.push(`      <changefreq>${url.changefreq}</changefreq>`);
      }
      if (url.priority !== undefined) {
        parts.push(`      <priority>${url.priority}</priority>`);
      }

      parts.push(`    </url>`);
      return parts.join('\n');
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
  }

  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  private generateIndexNowKey(): string {
    // Generate a random UUID-like key for IndexNow
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

export const seoService = new SeoService();
