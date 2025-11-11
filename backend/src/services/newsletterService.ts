import prisma from '../config/database';
import { SubscriptionStatus } from '@prisma/client';
import type {
  SubscribeNewsletterDTO,
  NewsletterFilters,
  PaginatedNewsletters,
  NewsletterStats,
} from '../types/newsletter.types';

export class NewsletterService {
  /**
   * Inscrever email na newsletter (público)
   */
  async subscribe(subscribeDTO: SubscribeNewsletterDTO) {
    const { email } = subscribeDTO;

    // Verificar se já existe
    const existing = await prisma.newsletter.findUnique({
      where: { email },
    });

    // Se já existe e está ativo, retornar o existente
    if (existing && existing.status === SubscriptionStatus.ACTIVE) {
      return {
        message: 'Email já cadastrado na newsletter',
        subscriber: existing,
        alreadySubscribed: true,
      };
    }

    // Se já existe mas está cancelado, reativar
    if (existing && existing.status === SubscriptionStatus.UNSUBSCRIBED) {
      const reactivated = await prisma.newsletter.update({
        where: { email },
        data: {
          status: SubscriptionStatus.ACTIVE,
          subscribedAt: new Date(),
          unsubscribedAt: null,
        },
      });

      return {
        message: 'Inscrição reativada com sucesso!',
        subscriber: reactivated,
        alreadySubscribed: false,
      };
    }

    // Criar nova inscrição
    const subscriber = await prisma.newsletter.create({
      data: { email },
    });

    return {
      message: 'Inscrição realizada com sucesso!',
      subscriber,
      alreadySubscribed: false,
    };
  }

  /**
   * Confirmar inscrição via token (público)
   */
  async confirmSubscription(token: string) {
    const subscriber = await prisma.newsletter.findUnique({
      where: { confirmToken: token },
    });

    if (!subscriber) {
      throw new Error('Token inválido ou inscrição não encontrada');
    }

    if (subscriber.confirmedAt) {
      return {
        message: 'Email já confirmado anteriormente',
        subscriber,
        alreadyConfirmed: true,
      };
    }

    const confirmed = await prisma.newsletter.update({
      where: { confirmToken: token },
      data: {
        confirmedAt: new Date(),
        confirmToken: null, // Remove token após confirmação
        status: SubscriptionStatus.ACTIVE,
      },
    });

    return {
      message: 'Email confirmado com sucesso!',
      subscriber: confirmed,
      alreadyConfirmed: false,
    };
  }

  /**
   * Cancelar inscrição (público)
   */
  async unsubscribe(token: string) {
    const subscriber = await prisma.newsletter.findUnique({
      where: { unsubscribeToken: token },
    });

    if (!subscriber) {
      throw new Error('Token inválido ou inscrição não encontrada');
    }

    if (subscriber.status === SubscriptionStatus.UNSUBSCRIBED) {
      return {
        message: 'Você já cancelou sua inscrição anteriormente',
        subscriber,
      };
    }

    const unsubscribed = await prisma.newsletter.update({
      where: { unsubscribeToken: token },
      data: {
        status: SubscriptionStatus.UNSUBSCRIBED,
        unsubscribedAt: new Date(),
      },
    });

    return {
      message: 'Inscrição cancelada com sucesso',
      subscriber: unsubscribed,
    };
  }

  /**
   * Listar inscritos com filtros e paginação (admin)
   */
  async findAll(filters: NewsletterFilters): Promise<PaginatedNewsletters> {
    const { status, search, page = 1, limit = 10 } = filters;

    const skip = (page - 1) * limit;

    // Construir where clause
    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.email = { contains: search, mode: 'insensitive' };
    }

    // Buscar inscritos
    const [subscribers, total] = await Promise.all([
      prisma.newsletter.findMany({
        where,
        skip,
        take: limit,
        orderBy: { subscribedAt: 'desc' },
      }),
      prisma.newsletter.count({ where }),
    ]);

    return {
      subscribers,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Buscar inscrito por ID (admin)
   */
  async findById(id: string) {
    const subscriber = await prisma.newsletter.findUnique({
      where: { id },
    });

    if (!subscriber) {
      throw new Error('Inscrito não encontrado');
    }

    return subscriber;
  }

  /**
   * Deletar inscrito (admin)
   */
  async delete(id: string) {
    const subscriber = await prisma.newsletter.findUnique({
      where: { id },
    });

    if (!subscriber) {
      throw new Error('Inscrito não encontrado');
    }

    await prisma.newsletter.delete({
      where: { id },
    });

    return { message: 'Inscrito deletado com sucesso' };
  }

  /**
   * Exportar lista de emails (admin)
   */
  async export(status?: SubscriptionStatus) {
    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    const subscribers = await prisma.newsletter.findMany({
      where,
      select: {
        email: true,
        status: true,
        subscribedAt: true,
      },
      orderBy: { subscribedAt: 'desc' },
    });

    return subscribers;
  }

  /**
   * Estatísticas da newsletter (admin)
   */
  async getStats(): Promise<NewsletterStats> {
    // Data de início do mês atual
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [total, active, unsubscribed, thisMonth] = await Promise.all([
      prisma.newsletter.count(),
      prisma.newsletter.count({ where: { status: SubscriptionStatus.ACTIVE } }),
      prisma.newsletter.count({ where: { status: SubscriptionStatus.UNSUBSCRIBED } }),
      prisma.newsletter.count({
        where: {
          subscribedAt: { gte: startOfMonth },
          status: SubscriptionStatus.ACTIVE,
        },
      }),
    ]);

    return {
      total,
      active,
      unsubscribed,
      thisMonth,
    };
  }
}

export const newsletterService = new NewsletterService();
