import { api } from '@/lib/api';
import type {
  BlogPost,
  CreateBlogPostDTO,
  UpdateBlogPostDTO,
  BlogPostFilters,
  PaginatedBlogPosts,
  BlogStats,
} from '@/types/blog';

export const blogApi = {
  /**
   * Listar posts com filtros e paginação (admin)
   */
  async getAll(filters?: BlogPostFilters): Promise<PaginatedBlogPosts> {
    const params = new URLSearchParams();

    if (filters?.status) params.append('status', filters.status);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await api.get<PaginatedBlogPosts>(`/blog/admin/posts?${params.toString()}`);
    return response.data;
  },

  /**
   * Buscar post por ID (admin)
   */
  async getById(id: string): Promise<BlogPost> {
    const response = await api.get<BlogPost>(`/blog/admin/posts/${id}`);
    return response.data;
  },

  /**
   * Criar post (admin)
   */
  async create(data: CreateBlogPostDTO): Promise<BlogPost> {
    const response = await api.post<BlogPost>('/blog/admin/posts', data);
    return response.data;
  },

  /**
   * Atualizar post (admin)
   */
  async update(id: string, data: UpdateBlogPostDTO): Promise<BlogPost> {
    const response = await api.put<BlogPost>(`/blog/admin/posts/${id}`, data);
    return response.data;
  },

  /**
   * Deletar post (admin)
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/blog/admin/posts/${id}`);
  },

  /**
   * Publicar post (admin)
   */
  async publish(id: string): Promise<{ message: string; post: BlogPost }> {
    const response = await api.patch<{ message: string; post: BlogPost }>(
      `/blog/admin/posts/${id}/publish`
    );
    return response.data;
  },

  /**
   * Despublicar post (admin)
   */
  async unpublish(id: string): Promise<{ message: string; post: BlogPost }> {
    const response = await api.patch<{ message: string; post: BlogPost }>(
      `/blog/admin/posts/${id}/unpublish`
    );
    return response.data;
  },

  /**
   * Obter estatísticas do blog (admin)
   */
  async getStats(): Promise<BlogStats> {
    const response = await api.get<BlogStats>('/blog/admin/stats');
    return response.data;
  },

  /**
   * Listar categorias (admin)
   */
  async getCategories(): Promise<{ categories: string[] }> {
    const response = await api.get<{ categories: string[] }>('/blog/categories');
    return response.data;
  },
};
