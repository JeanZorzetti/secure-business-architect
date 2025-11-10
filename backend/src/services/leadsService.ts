import { Prisma, LeadStatus, Priority } from '@prisma/client';
import prisma from '../config/database';
import {
  CreateLeadDTO,
  UpdateLeadDTO,
  LeadListQuery,
  LeadStats,
  CreateInteractionDTO,
  UpdateInteractionDTO,
  CreateNoteDTO,
  UpdateNoteDTO,
  TimelineItem,
} from '../types/lead.types';

class LeadsService {
  // ==================== LEADS CRUD ====================

  async createLead(data: CreateLeadDTO) {
    return prisma.contact.create({
      data: {
        ...data,
        leadStatus: data.leadStatus || LeadStatus.NEW,
        priority: data.priority || Priority.MEDIUM,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findAllLeads(query: LeadListQuery) {
    const {
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      leadStatus,
      priority,
      assignedTo,
      source,
      search,
      dateFrom,
      dateTo,
      tags,
      hasNextFollowUp,
    } = query;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.ContactWhereInput = {};

    // Lead status filter
    if (leadStatus) {
      where.leadStatus = Array.isArray(leadStatus)
        ? { in: leadStatus }
        : leadStatus;
    }

    // Priority filter
    if (priority) {
      where.priority = Array.isArray(priority)
        ? { in: priority }
        : priority;
    }

    // Assigned to filter
    if (assignedTo) {
      where.assignedTo = assignedTo;
    }

    // Source filter
    if (source) {
      where.source = source;
    }

    // Search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Date range filter
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) where.createdAt.gte = new Date(dateFrom);
      if (dateTo) where.createdAt.lte = new Date(dateTo);
    }

    // Tags filter
    if (tags && tags.length > 0) {
      where.tags = {
        hasSome: tags,
      };
    }

    // Next follow-up filter
    if (hasNextFollowUp !== undefined) {
      where.nextFollowUp = hasNextFollowUp
        ? { not: null }
        : null;
    }

    // Execute query
    const [leads, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          interactions: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
          notes: {
            where: { isPinned: true },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
      }),
      prisma.contact.count({ where }),
    ]);

    return {
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findLeadById(id: string) {
    const lead = await prisma.contact.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        interactions: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        notes: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: [
            { isPinned: 'desc' },
            { createdAt: 'desc' },
          ],
        },
      },
    });

    if (!lead) {
      throw new Error('Lead não encontrado');
    }

    return lead;
  }

  async updateLead(id: string, data: UpdateLeadDTO) {
    // Convert string dates to Date objects
    const updateData: any = { ...data };
    if (data.lastContact) {
      updateData.lastContact = new Date(data.lastContact);
    }
    if (data.nextFollowUp) {
      updateData.nextFollowUp = new Date(data.nextFollowUp);
    }

    return prisma.contact.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async deleteLead(id: string) {
    return prisma.contact.delete({
      where: { id },
    });
  }

  async convertLead(id: string, userId: string, notes?: string) {
    const lead = await prisma.contact.update({
      where: { id },
      data: {
        leadStatus: LeadStatus.CONVERTED,
        lastContact: new Date(),
      },
    });

    // Create interaction for conversion
    if (notes) {
      await this.createInteraction({
        contactId: id,
        userId,
        type: 'OTHER',
        notes: `Lead convertido: ${notes}`,
      });
    }

    return lead;
  }

  async getLeadStats(): Promise<LeadStats> {
    const [
      total,
      byStatus,
      byPriority,
      upcomingFollowUps,
      overdueFollowUps,
    ] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.groupBy({
        by: ['leadStatus'],
        _count: true,
      }),
      prisma.contact.groupBy({
        by: ['priority'],
        _count: true,
      }),
      prisma.contact.count({
        where: {
          nextFollowUp: {
            gte: new Date(),
            lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // next 7 days
          },
        },
      }),
      prisma.contact.count({
        where: {
          nextFollowUp: {
            lt: new Date(),
          },
        },
      }),
    ]);

    const statusMap = byStatus.reduce((acc, item) => {
      if (item.leadStatus) {
        acc[item.leadStatus] = item._count;
      }
      return acc;
    }, {} as Record<LeadStatus, number>);

    const priorityMap = byPriority.reduce((acc, item) => {
      acc[item.priority] = item._count;
      return acc;
    }, {} as Record<Priority, number>);

    return {
      total,
      byStatus: statusMap,
      byPriority: priorityMap,
      upcomingFollowUps,
      overdueFollowUps,
    };
  }

  // ==================== INTERACTIONS ====================

  async createInteraction(data: CreateInteractionDTO) {
    // Update lastContact on lead
    await prisma.contact.update({
      where: { id: data.contactId },
      data: { lastContact: new Date() },
    });

    return prisma.interaction.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findInteractionsByContactId(contactId: string) {
    return prisma.interaction.findMany({
      where: { contactId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateInteraction(id: string, data: UpdateInteractionDTO) {
    return prisma.interaction.update({
      where: { id },
      data,
    });
  }

  async deleteInteraction(id: string) {
    return prisma.interaction.delete({
      where: { id },
    });
  }

  // ==================== NOTES ====================

  async createNote(data: CreateNoteDTO) {
    return prisma.note.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findNotesByContactId(contactId: string) {
    return prisma.note.findMany({
      where: { contactId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [
        { isPinned: 'desc' },
        { createdAt: 'desc' },
      ],
    });
  }

  async updateNote(id: string, data: UpdateNoteDTO) {
    return prisma.note.update({
      where: { id },
      data,
    });
  }

  async deleteNote(id: string) {
    return prisma.note.delete({
      where: { id },
    });
  }

  // ==================== TIMELINE ====================

  async getLeadTimeline(contactId: string): Promise<TimelineItem[]> {
    const [interactions, notes] = await Promise.all([
      this.findInteractionsByContactId(contactId),
      this.findNotesByContactId(contactId),
    ]);

    const timeline: TimelineItem[] = [
      ...interactions.map((interaction) => ({
        id: interaction.id,
        type: 'interaction' as const,
        timestamp: interaction.createdAt,
        userId: interaction.userId,
        userName: interaction.user.name,
        content: interaction.notes,
        metadata: { type: interaction.type },
      })),
      ...notes.map((note) => ({
        id: note.id,
        type: 'note' as const,
        timestamp: note.createdAt,
        userId: note.userId,
        userName: note.user.name,
        content: note.content,
        metadata: { isPinned: note.isPinned },
      })),
    ];

    // Sort by timestamp descending
    return timeline.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  // ==================== EXPORT ====================

  async exportLeads(query: LeadListQuery) {
    const { leads } = await this.findAllLeads({
      ...query,
      limit: 10000, // max export limit
    });

    return leads.map((lead) => ({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone || '',
      company: lead.company || '',
      status: lead.leadStatus,
      priority: lead.priority,
      assignedTo: lead.user?.name || '',
      source: lead.source || '',
      tags: lead.tags.join(', '),
      lastContact: lead.lastContact?.toISOString() || '',
      nextFollowUp: lead.nextFollowUp?.toISOString() || '',
      createdAt: lead.createdAt.toISOString(),
    }));
  }
}

export const leadsService = new LeadsService();
