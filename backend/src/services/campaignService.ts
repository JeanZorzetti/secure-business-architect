import { Prisma, CampaignStatus } from '@prisma/client';
import prisma from '../config/database';
import {
  CreateCampaignDTO,
  UpdateCampaignDTO,
  CampaignFilters,
  PaginatedCampaigns,
  CampaignStats,
} from '../types/campaign.types';

class CampaignService {
  // ==================== CRUD ====================

  async createCampaign(data: CreateCampaignDTO, userId: string) {
    return prisma.newsletterCampaign.create({
      data: {
        ...data,
        createdBy: userId,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findAllCampaigns(filters: CampaignFilters): Promise<PaginatedCampaigns> {
    const {
      page = 1,
      limit = 20,
      status,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = filters;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.NewsletterCampaignWhereInput = {};

    // Status filter
    if (status) {
      where.status = status;
    }

    // Search filter (subject)
    if (search) {
      where.subject = { contains: search, mode: 'insensitive' };
    }

    // Execute queries in parallel
    const [campaigns, total] = await Promise.all([
      prisma.newsletterCampaign.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.newsletterCampaign.count({ where }),
    ]);

    return {
      campaigns,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findCampaignById(id: string) {
    const campaign = await prisma.newsletterCampaign.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!campaign) {
      throw new Error('Campanha não encontrada');
    }

    return campaign;
  }

  async updateCampaign(id: string, data: UpdateCampaignDTO) {
    // Check if campaign exists
    await this.findCampaignById(id);

    return prisma.newsletterCampaign.update({
      where: { id },
      data,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async deleteCampaign(id: string) {
    // Check if campaign exists
    await this.findCampaignById(id);

    return prisma.newsletterCampaign.delete({
      where: { id },
    });
  }

  // ==================== CAMPAIGN ACTIONS ====================

  async sendCampaign(id: string) {
    const campaign = await this.findCampaignById(id);

    // Validar que a campanha está em DRAFT ou SCHEDULED
    if (campaign.status !== CampaignStatus.DRAFT && campaign.status !== CampaignStatus.SCHEDULED) {
      throw new Error('Campanha já foi enviada ou está em envio');
    }

    // Contar inscritos ativos
    const activeSubscribers = await prisma.newsletter.count({
      where: { status: 'ACTIVE' },
    });

    // Atualizar status para SENDING
    await prisma.newsletterCampaign.update({
      where: { id },
      data: {
        status: CampaignStatus.SENDING,
        recipientCount: activeSubscribers,
      },
    });

    // TODO: Aqui você implementaria a lógica real de envio de emails
    // Por enquanto, vamos simular um envio imediato

    // Simular delay de envio
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Atualizar para SENT
    return prisma.newsletterCampaign.update({
      where: { id },
      data: {
        status: CampaignStatus.SENT,
        sentAt: new Date(),
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async scheduleCampaign(id: string, scheduledFor: Date) {
    const campaign = await this.findCampaignById(id);

    // Validar que a campanha está em DRAFT
    if (campaign.status !== CampaignStatus.DRAFT) {
      throw new Error('Apenas campanhas em rascunho podem ser agendadas');
    }

    // Validar que a data é futura
    if (scheduledFor <= new Date()) {
      throw new Error('Data de agendamento deve ser futura');
    }

    return prisma.newsletterCampaign.update({
      where: { id },
      data: {
        status: CampaignStatus.SCHEDULED,
        scheduledFor,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async cancelScheduledCampaign(id: string) {
    const campaign = await this.findCampaignById(id);

    // Validar que a campanha está SCHEDULED
    if (campaign.status !== CampaignStatus.SCHEDULED) {
      throw new Error('Apenas campanhas agendadas podem ser canceladas');
    }

    return prisma.newsletterCampaign.update({
      where: { id },
      data: {
        status: CampaignStatus.DRAFT,
        scheduledFor: null,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  // ==================== STATS ====================

  async getStats(): Promise<CampaignStats> {
    const [campaigns, byStatusData] = await Promise.all([
      prisma.newsletterCampaign.findMany({
        select: {
          status: true,
          recipientCount: true,
          openCount: true,
          clickCount: true,
        },
      }),
      prisma.newsletterCampaign.groupBy({
        by: ['status'],
        _count: {
          id: true,
        },
      }),
    ]);

    // Inicializar contagem por status
    const byStatus: Record<CampaignStatus, number> = {
      DRAFT: 0,
      SCHEDULED: 0,
      SENDING: 0,
      SENT: 0,
      FAILED: 0,
    };

    // Preencher contagem por status
    byStatusData.forEach((item) => {
      byStatus[item.status] = item._count.id;
    });

    // Calcular estatísticas
    const sentCampaigns = campaigns.filter((c) => c.status === CampaignStatus.SENT);
    const totalSent = sentCampaigns.length;
    const totalRecipients = sentCampaigns.reduce((sum, c) => sum + c.recipientCount, 0);
    const totalOpens = sentCampaigns.reduce((sum, c) => sum + c.openCount, 0);
    const totalClicks = sentCampaigns.reduce((sum, c) => sum + c.clickCount, 0);

    const averageOpenRate = totalRecipients > 0 ? (totalOpens / totalRecipients) * 100 : 0;
    const averageClickRate = totalRecipients > 0 ? (totalClicks / totalRecipients) * 100 : 0;

    return {
      total: campaigns.length,
      byStatus,
      totalSent,
      totalRecipients,
      averageOpenRate: Math.round(averageOpenRate * 100) / 100,
      averageClickRate: Math.round(averageClickRate * 100) / 100,
    };
  }
}

export const campaignService = new CampaignService();
