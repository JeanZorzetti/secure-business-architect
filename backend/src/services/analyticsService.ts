import prisma from '../config/database';
import { logger } from '../config/logger';
import type {
  CreateAnalyticsDTO,
  AnalyticsOverview,
  TopPost,
  AnalyticsTrend,
  AnalyticsFilters,
} from '../types/analytics.types';

class AnalyticsService {
  /**
   * Registrar evento de analytics
   */
  async trackEvent(data: CreateAnalyticsDTO): Promise<void> {
    try {
      await prisma.analytics.create({
        data: {
          event: data.event,
          entityId: data.entityId,
          entityType: data.entityType,
          metadata: data.metadata,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
        },
      });
    } catch (error) {
      logger.error({ error, data }, 'Erro ao registrar evento de analytics');
      // Não lançar erro para não quebrar a requisição principal
    }
  }

  /**
   * Buscar visão geral de métricas
   */
  async getOverview(): Promise<AnalyticsOverview> {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Total de visualizações (eventos de view)
    const totalViews = await prisma.analytics.count({
      where: { event: 'blog_post_view' },
    });

    // Total de contatos
    const totalContacts = await prisma.contact.count();

    // Total de inscritos na newsletter
    const totalNewsletterSubscribers = await prisma.newsletter.count({
      where: { status: 'ACTIVE' },
    });

    // Total de posts publicados
    const totalBlogPosts = await prisma.blogPost.count({
      where: { status: 'PUBLISHED' },
    });

    // Contatos deste mês
    const contactsThisMonth = await prisma.contact.count({
      where: {
        createdAt: {
          gte: firstDayOfMonth,
        },
      },
    });

    // Inscritos deste mês
    const subscribersThisMonth = await prisma.newsletter.count({
      where: {
        subscribedAt: {
          gte: firstDayOfMonth,
        },
        status: 'ACTIVE',
      },
    });

    // Posts publicados este mês
    const postsThisMonth = await prisma.blogPost.count({
      where: {
        publishedAt: {
          gte: firstDayOfMonth,
        },
        status: 'PUBLISHED',
      },
    });

    // Visualizações este mês
    const viewsThisMonth = await prisma.analytics.count({
      where: {
        event: 'blog_post_view',
        createdAt: {
          gte: firstDayOfMonth,
        },
      },
    });

    return {
      totalViews,
      totalContacts,
      totalNewsletterSubscribers,
      totalBlogPosts,
      contactsThisMonth,
      subscribersThisMonth,
      postsThisMonth,
      viewsThisMonth,
    };
  }

  /**
   * Buscar posts mais visualizados
   */
  async getTopPosts(limit: number = 10): Promise<TopPost[]> {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'PUBLISHED',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        viewCount: true,
        publishedAt: true,
      },
      orderBy: {
        viewCount: 'desc',
      },
      take: limit,
    });

    return posts;
  }

  /**
   * Buscar tendência de contatos (últimos N dias)
   */
  async getContactsTrend(days: number = 30): Promise<AnalyticsTrend[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const contacts = await prisma.contact.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      _count: {
        id: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Agrupar por data (sem hora)
    const trendMap = new Map<string, number>();

    contacts.forEach((contact) => {
      const dateKey = contact.createdAt.toISOString().split('T')[0];
      const currentCount = trendMap.get(dateKey) || 0;
      trendMap.set(dateKey, currentCount + contact._count.id);
    });

    // Converter para array e preencher datas faltantes com 0
    const trend: AnalyticsTrend[] = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];

      trend.push({
        date: dateKey,
        count: trendMap.get(dateKey) || 0,
      });
    }

    return trend;
  }

  /**
   * Buscar tendência de visualizações de blog (últimos N dias)
   */
  async getBlogViewsTrend(days: number = 30): Promise<AnalyticsTrend[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const views = await prisma.analytics.groupBy({
      by: ['createdAt'],
      where: {
        event: 'blog_post_view',
        createdAt: {
          gte: startDate,
        },
      },
      _count: {
        id: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Agrupar por data (sem hora)
    const trendMap = new Map<string, number>();

    views.forEach((view) => {
      const dateKey = view.createdAt.toISOString().split('T')[0];
      const currentCount = trendMap.get(dateKey) || 0;
      trendMap.set(dateKey, currentCount + view._count.id);
    });

    // Converter para array e preencher datas faltantes com 0
    const trend: AnalyticsTrend[] = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];

      trend.push({
        date: dateKey,
        count: trendMap.get(dateKey) || 0,
      });
    }

    return trend;
  }

  /**
   * Incrementar view count de um post
   */
  async incrementPostViewCount(postId: string): Promise<void> {
    try {
      await prisma.blogPost.update({
        where: { id: postId },
        data: {
          viewCount: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      logger.error({ error, postId }, 'Erro ao incrementar view count do post');
    }
  }

  /**
   * Buscar eventos de analytics com filtros
   */
  async getEvents(filters: AnalyticsFilters): Promise<any[]> {
    const where: any = {};

    if (filters.event) {
      where.event = filters.event;
    }

    if (filters.entityType) {
      where.entityType = filters.entityType;
    }

    if (filters.startDate || filters.endDate) {
      where.createdAt = {};

      if (filters.startDate) {
        where.createdAt.gte = filters.startDate;
      }

      if (filters.endDate) {
        where.createdAt.lte = filters.endDate;
      }
    }

    const events = await prisma.analytics.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: 1000, // Limite de segurança
    });

    return events;
  }
}

export const analyticsService = new AnalyticsService();
