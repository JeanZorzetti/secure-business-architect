import { api } from '@/lib/api';
import type {
  Newsletter,
  NewsletterFilters,
  PaginatedNewsletters,
  NewsletterStats,
} from '@/types/newsletter';

export const newsletterApi = {
  /**
   * Listar inscritos com filtros e paginação
   */
  async getAll(filters?: NewsletterFilters): Promise<PaginatedNewsletters> {
    const params = new URLSearchParams();

    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await api.get<PaginatedNewsletters>(`/newsletter?${params.toString()}`);
    return response.data;
  },

  /**
   * Buscar inscrito por ID
   */
  async getById(id: string): Promise<Newsletter> {
    const response = await api.get<Newsletter>(`/newsletter/${id}`);
    return response.data;
  },

  /**
   * Deletar inscrito
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/newsletter/${id}`);
  },

  /**
   * Obter estatísticas da newsletter
   */
  async getStats(): Promise<NewsletterStats> {
    const response = await api.get<NewsletterStats>('/newsletter/stats');
    return response.data;
  },

  /**
   * Exportar lista de inscritos (CSV)
   */
  async export(status?: string): Promise<Blob> {
    const params = status ? `?status=${status}` : '';
    const response = await api.get(`/newsletter/export${params}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
