import { LeadStatus, Priority, InteractionType } from '@prisma/client';

// Lead DTOs
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
  lastContact?: Date | null;
  nextFollowUp?: Date | null;
}

export interface LeadFilters {
  leadStatus?: LeadStatus | LeadStatus[];
  priority?: Priority | Priority[];
  assignedTo?: string;
  source?: string;
  search?: string; // search in name, email, company
  dateFrom?: Date;
  dateTo?: Date;
  tags?: string[];
  hasNextFollowUp?: boolean;
}

export interface LeadListQuery {
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'name' | 'leadStatus' | 'priority' | 'nextFollowUp';
  sortOrder?: 'asc' | 'desc';
  // Filters (flat structure for easier use in service)
  leadStatus?: LeadStatus | LeadStatus[];
  priority?: Priority | Priority[];
  assignedTo?: string;
  source?: string;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  tags?: string[];
  hasNextFollowUp?: boolean;
}

// Interaction DTOs
export interface CreateInteractionDTO {
  contactId: string;
  userId: string;
  type: InteractionType;
  notes: string;
}

export interface UpdateInteractionDTO {
  type?: InteractionType;
  notes?: string;
}

// Note DTOs
export interface CreateNoteDTO {
  contactId: string;
  userId: string;
  content: string;
  isPinned?: boolean;
}

export interface UpdateNoteDTO {
  content?: string;
  isPinned?: boolean;
}

// Timeline item (union of interactions and notes)
export interface TimelineItem {
  id: string;
  type: 'interaction' | 'note' | 'status_change';
  timestamp: Date;
  userId: string;
  userName?: string;
  content: string;
  metadata?: any;
}

// Lead statistics
export interface LeadStats {
  total: number;
  byStatus: Record<LeadStatus, number>;
  byPriority: Record<Priority, number>;
  upcomingFollowUps: number;
  overdueFollowUps: number;
}
