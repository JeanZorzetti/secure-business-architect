export const ContactStatus = {
  PENDING: 'PENDING',
  READ: 'READ',
  ARCHIVED: 'ARCHIVED',
} as const;

export type ContactStatus = typeof ContactStatus[keyof typeof ContactStatus];

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ContactFilters {
  status?: ContactStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedContacts {
  contacts: Contact[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ContactStats {
  total: number;
  pending: number;
  read: number;
  archived: number;
}
