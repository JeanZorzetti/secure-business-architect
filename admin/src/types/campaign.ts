// Campaign status enum
export const CampaignStatus = {
  DRAFT: 'DRAFT',
  SCHEDULED: 'SCHEDULED',
  SENDING: 'SENDING',
  SENT: 'SENT',
  FAILED: 'FAILED',
} as const;

export type CampaignStatus = typeof CampaignStatus[keyof typeof CampaignStatus];

// User info (simplified)
export interface CampaignUser {
  id: string;
  name: string;
  email: string;
}

// Campaign interface
export interface Campaign {
  id: string;
  subject: string;
  content: string;
  status: CampaignStatus;
  scheduledFor: string | null; // ISO date string
  sentAt: string | null; // ISO date string
  recipientCount: number;
  openCount: number;
  clickCount: number;
  createdBy: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  creator?: CampaignUser;
}

// DTOs for creating/updating
export interface CreateCampaignDTO {
  subject: string;
  content: string;
  scheduledFor?: string; // ISO date string
}

export interface UpdateCampaignDTO {
  subject?: string;
  content?: string;
  scheduledFor?: string; // ISO date string
}

export interface ScheduleCampaignDTO {
  scheduledFor: string; // ISO date string
}

// Filters and query
export interface CampaignFilters {
  page?: number;
  limit?: number;
  status?: CampaignStatus;
  search?: string;
  sortBy?: 'createdAt' | 'scheduledFor' | 'sentAt';
  sortOrder?: 'asc' | 'desc';
}

// Paginated response
export interface PaginatedCampaigns {
  campaigns: Campaign[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Statistics
export interface CampaignStats {
  total: number;
  byStatus: Record<CampaignStatus, number>;
  totalSent: number;
  totalRecipients: number;
  averageOpenRate: number;
  averageClickRate: number;
}
