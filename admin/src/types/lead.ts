// Enums
export const LeadStatus = {
  NEW: 'NEW',
  CONTACTED: 'CONTACTED',
  QUALIFIED: 'QUALIFIED',
  PROPOSAL: 'PROPOSAL',
  NEGOTIATION: 'NEGOTIATION',
  CONVERTED: 'CONVERTED',
  LOST: 'LOST',
} as const;

export type LeadStatus = typeof LeadStatus[keyof typeof LeadStatus];

export const Priority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const;

export type Priority = typeof Priority[keyof typeof Priority];

export const InteractionType = {
  EMAIL: 'EMAIL',
  PHONE: 'PHONE',
  MEETING: 'MEETING',
  WHATSAPP: 'WHATSAPP',
  OTHER: 'OTHER',
} as const;

export type InteractionType = typeof InteractionType[keyof typeof InteractionType];

// User info (simplified)
export interface LeadUser {
  id: string;
  name: string;
  email?: string;
}

// Lead interface
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message: string;
  leadStatus: LeadStatus;
  priority: Priority;
  source?: string | null;
  assignedTo?: string | null;
  tags: string[];
  lastContact?: string | null; // ISO date string
  nextFollowUp?: string | null; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  user?: LeadUser | null; // Assigned user
  interactions?: Interaction[];
  notes?: Note[];
}

// Interaction interface
export interface Interaction {
  id: string;
  contactId: string;
  userId: string;
  type: InteractionType;
  notes: string;
  createdAt: string; // ISO date string
  user: LeadUser;
}

// Note interface
export interface Note {
  id: string;
  contactId: string;
  userId: string;
  content: string;
  isPinned: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  user: LeadUser;
}

// Timeline item
export interface TimelineItem {
  id: string;
  type: 'interaction' | 'note' | 'status_change';
  timestamp: string; // ISO date string
  userId: string;
  userName?: string;
  content: string;
  metadata?: any;
}

// DTOs for creating/updating
export interface CreateLeadDTO {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  leadStatus?: LeadStatus;
  priority?: Priority;
  source?: string;
  assignedTo?: string;
  tags?: string[];
}

export interface UpdateLeadDTO {
  name?: string;
  email?: string;
  phone?: string | null;
  company?: string | null;
  message?: string;
  leadStatus?: LeadStatus;
  priority?: Priority;
  source?: string | null;
  assignedTo?: string | null;
  tags?: string[];
  lastContact?: string | null; // ISO date string
  nextFollowUp?: string | null; // ISO date string
}

export interface CreateInteractionDTO {
  type: InteractionType;
  notes: string;
}

export interface UpdateInteractionDTO {
  type?: InteractionType;
  notes?: string;
}

export interface CreateNoteDTO {
  content: string;
  isPinned?: boolean;
}

export interface UpdateNoteDTO {
  content?: string;
  isPinned?: boolean;
}

export interface ConvertLeadDTO {
  notes?: string;
}

// Filters and query
export interface LeadFilters {
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'name' | 'leadStatus' | 'priority' | 'nextFollowUp';
  sortOrder?: 'asc' | 'desc';
  leadStatus?: LeadStatus | LeadStatus[];
  priority?: Priority | Priority[];
  assignedTo?: string;
  source?: string;
  search?: string;
  dateFrom?: string; // ISO date string
  dateTo?: string; // ISO date string
  tags?: string[];
  hasNextFollowUp?: boolean;
}

// Paginated response
export interface PaginatedLeads {
  leads: Lead[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Statistics
export interface LeadStats {
  total: number;
  byStatus: Record<LeadStatus, number>;
  byPriority: Record<Priority, number>;
  upcomingFollowUps: number;
  overdueFollowUps: number;
}
