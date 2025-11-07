import { api } from '@/lib/api';
import type {
  Testimonial,
  CreateTestimonialDTO,
  UpdateTestimonialDTO,
  ReorderTestimonialDTO,
} from '../types/testimonial';

export const testimonialsApi = {
  // Listar todos os depoimentos (admin)
  getAll: async (): Promise<Testimonial[]> => {
    const response = await api.get<Testimonial[]>('/admin/testimonials');
    return response.data;
  },

  // Buscar depoimento por ID
  getById: async (id: string): Promise<Testimonial> => {
    const response = await api.get<Testimonial>(`/admin/testimonials/${id}`);
    return response.data;
  },

  // Criar novo depoimento
  create: async (data: CreateTestimonialDTO): Promise<Testimonial> => {
    const response = await api.post<Testimonial>('/admin/testimonials', data);
    return response.data;
  },

  // Atualizar depoimento
  update: async (id: string, data: UpdateTestimonialDTO): Promise<Testimonial> => {
    const response = await api.put<Testimonial>(`/admin/testimonials/${id}`, data);
    return response.data;
  },

  // Deletar depoimento
  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/testimonials/${id}`);
  },

  // Toggle publicar/despublicar
  togglePublish: async (id: string): Promise<Testimonial> => {
    const response = await api.patch<Testimonial>(`/admin/testimonials/${id}/toggle-publish`);
    return response.data;
  },

  // Reordenar depoimentos
  reorder: async (testimonials: ReorderTestimonialDTO[]): Promise<{ message: string; updated: number }> => {
    const response = await api.patch<{ message: string; updated: number }>(
      '/admin/testimonials/reorder',
      { testimonials }
    );
    return response.data;
  },
};
