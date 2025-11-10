import { CampaignStatus } from '@prisma/client';

// Campaign DTO para criar campanha
export interface CreateCampaignDTO {
  subject: string;
  content: string;
  scheduledFor?: Date;
}

// Campaign DTO para atualizar campanha
export interface UpdateCampaignDTO {
  subject?: string;
  content?: string;
  scheduledFor?: Date;
}

// Filtros para listar campanhas
export interface CampaignFilters {
  page?: number;
  limit?: number;
  status?: CampaignStatus;
  search?: string;
  sortBy?: 'createdAt' | 'scheduledFor' | 'sentAt';
  sortOrder?: 'asc' | 'desc';
}

// Resposta paginada de campanhas
export interface PaginatedCampaigns {
  campaigns: Campaign[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Campaign interface completa
export interface Campaign {
  id: string;
  subject: string;
  content: string;
  status: CampaignStatus;
  scheduledFor: Date | null;
  sentAt: Date | null;
  recipientCount: number;
  openCount: number;
  clickCount: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  creator?: {
    id: string;
    name: string;
    email: string;
  };
}

// Estatísticas de campanhas
export interface CampaignStats {
  total: number;
  byStatus: Record<CampaignStatus, number>;
  totalSent: number;
  totalRecipients: number;
  averageOpenRate: number;
  averageClickRate: number;
}
