import { Contact, ContactStatus } from '@prisma/client';

export interface CreateContactDTO {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export interface UpdateContactDTO {
  status?: ContactStatus;
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
