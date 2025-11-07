import { api } from '@/lib/api';
import type {
  Contact,
  ContactFilters,
  PaginatedContacts,
  ContactStats,
  ContactStatus,
} from '@/types/contact';

export const contactsApi = {
  /**
   * Listar contatos com filtros e paginação
   */
  async getAll(filters?: ContactFilters): Promise<PaginatedContacts> {
    const params = new URLSearchParams();

    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await api.get<PaginatedContacts>(`/contacts?${params.toString()}`);
    return response.data;
  },

  /**
   * Buscar contato por ID
   */
  async getById(id: string): Promise<Contact> {
    const response = await api.get<Contact>(`/contacts/${id}`);
    return response.data;
  },

  /**
   * Atualizar status do contato
   */
  async updateStatus(id: string, status: ContactStatus): Promise<Contact> {
    const response = await api.patch<Contact>(`/contacts/${id}/status`, { status });
    return response.data;
  },

  /**
   * Deletar contato
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/contacts/${id}`);
  },

  /**
   * Obter estatísticas de contatos
   */
  async getStats(): Promise<ContactStats> {
    const response = await api.get<ContactStats>('/contacts/stats');
    return response.data;
  },
};
