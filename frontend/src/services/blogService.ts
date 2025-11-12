import api from './api';

// Types matching backend schema
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  author: string;
  category: string;
  tags: string[];
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt?: string | null;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  order: number;
  isActive: boolean;
}

export interface PaginatedResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BlogFilters {
  status?: 'DRAFT' | 'PUBLISHED';
  category?: string;
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
}

const blogService = {
  /**
   * Get all published blog posts
   */
  async getPosts(filters?: BlogFilters): Promise<PaginatedResponse> {
    const params = new URLSearchParams();

    if (filters?.category) params.append('category', filters.category);
    if (filters?.tag) params.append('tag', filters.tag);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await api.get<PaginatedResponse>(`/blog/posts?${params.toString()}`);
    return response.data;
  },

  /**
   * Search blog posts
   */
  async searchPosts(query: string, filters?: Omit<BlogFilters, 'search'>): Promise<PaginatedResponse> {
    const params = new URLSearchParams();
    params.append('q', query);

    if (filters?.category) params.append('category', filters.category);
    if (filters?.tag) params.append('tag', filters.tag);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await api.get<PaginatedResponse>(`/blog/posts/search?${params.toString()}`);
    return response.data;
  },

  /**
   * Get single blog post by slug
   */
  async getPostBySlug(slug: string): Promise<BlogPost> {
    const response = await api.get<BlogPost>(`/blog/posts/${slug}`);
    return response.data;
  },

  /**
   * Get all categories
   */
  async getCategories(): Promise<BlogCategory[]> {
    const response = await api.get<BlogCategory[]>('/blog/categories');
    return response.data;
  },

  /**
   * Increment view count for a post
   * Note: This should be called client-side when post is viewed
   */
  async incrementViews(slug: string): Promise<void> {
    // The backend might track this automatically via analytics
    // or we can implement a dedicated endpoint
    try {
      await api.post(`/analytics/track`, {
        event: 'blog_post_view',
        entityId: slug,
        entityType: 'blog_post'
      });
    } catch (error) {
      // Silent fail - don't break UI if analytics fail
      console.warn('Failed to track blog view:', error);
    }
  },
};

export default blogService;
