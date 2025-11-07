import { api } from '@/lib/api';
import type {
  Service,
  CreateServiceDTO,
  UpdateServiceDTO,
  ReorderServiceDTO,
} from '@/types/service';

export const servicesApi = {
  /**
   * Listar todos os serviços (admin)
   */
  async getAll(): Promise<Service[]> {
    const response = await api.get<Service[]>('/services/admin/all');
    return response.data;
  },

  /**
   * Buscar serviço por ID (admin)
   */
  async getById(id: string): Promise<Service> {
    const response = await api.get<Service>(`/services/admin/${id}`);
    return response.data;
  },

  /**
   * Criar serviço (admin)
   */
  async create(data: CreateServiceDTO): Promise<Service> {
    const response = await api.post<Service>('/services/admin', data);
    return response.data;
  },

  /**
   * Atualizar serviço (admin)
   */
  async update(id: string, data: UpdateServiceDTO): Promise<Service> {
    const response = await api.put<Service>(`/services/admin/${id}`, data);
    return response.data;
  },

  /**
   * Deletar serviço (admin)
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/services/admin/${id}`);
  },

  /**
   * Toggle ativo/inativo (admin)
   */
  async toggleActive(id: string): Promise<{ message: string; service: Service }> {
    const response = await api.patch<{ message: string; service: Service }>(
      `/services/admin/${id}/toggle`
    );
    return response.data;
  },

  /**
   * Reordenar serviços (admin)
   */
  async reorder(services: ReorderServiceDTO[]): Promise<{ message: string }> {
    const response = await api.patch<{ message: string }>(
      '/services/admin/reorder',
      { services }
    );
    return response.data;
  },
};
