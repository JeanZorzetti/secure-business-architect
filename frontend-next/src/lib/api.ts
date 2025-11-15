// API client for blog and backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backjennifer.roilabs.com.br/api';

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

/**
 * Get all published blog posts with ISR
 * Revalidates every hour
 */
export async function getPosts(filters?: BlogFilters): Promise<PaginatedResponse> {
  const params = new URLSearchParams();

  if (filters?.category) params.append('category', filters.category);
  if (filters?.tag) params.append('tag', filters.tag);
  if (filters?.search) params.append('search', filters.search);
  if (filters?.page) params.append('page', filters.page.toString());
  if (filters?.limit) params.append('limit', filters.limit.toString());

  const url = `${API_BASE_URL}/blog/posts?${params.toString()}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // ISR: revalidate every 1 hour
    });

    if (!response.ok) {
      console.error(`[API] Failed to fetch posts: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[API] Error fetching posts from', url, error);
    throw error;
  }
}

/**
 * Search blog posts with ISR
 */
export async function searchPosts(
  query: string,
  filters?: Omit<BlogFilters, 'search'>
): Promise<PaginatedResponse> {
  const params = new URLSearchParams();
  params.append('q', query);

  if (filters?.category) params.append('category', filters.category);
  if (filters?.tag) params.append('tag', filters.tag);
  if (filters?.page) params.append('page', filters.page.toString());
  if (filters?.limit) params.append('limit', filters.limit.toString());

  const url = `${API_BASE_URL}/blog/posts/search?${params.toString()}`;

  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error('Failed to search posts');
  }

  return response.json();
}

/**
 * Get single blog post by slug with ISR
 */
export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const url = `${API_BASE_URL}/blog/posts/${slug}`;

  try {
    console.log(`[API] Fetching post from: ${url}`);

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`[API] Failed to fetch post ${slug}: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch post ${slug}: ${response.status} ${response.statusText}`);
    }

    const post = await response.json();
    console.log(`[API] Successfully fetched post: ${post.title}`);
    return post;
  } catch (error) {
    console.error('[API] Error fetching post from', url, error);
    throw error;
  }
}

/**
 * Get all active blog categories with ISR
 */
export async function getCategories(): Promise<BlogCategory[]> {
  const url = `${API_BASE_URL}/blog/categories`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`[API] Failed to fetch categories: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Backend returns {categories: ["string1", "string2", ...]}
    // Transform to BlogCategory objects
    const categoryNames = data.categories || [];
    return categoryNames.map((name: string, index: number) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      slug: name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-'),
      description: null,
      order: index,
      isActive: true,
    }));
  } catch (error) {
    console.error('[API] Error fetching categories from', url, error);
    throw error;
  }
}

/**
 * Increment view count for a post (client-side only)
 * This should be called from a client component
 */
export async function incrementViews(slug: string): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'blog_post_view',
        entityId: slug,
        entityType: 'blog_post',
      }),
    });
  } catch (error) {
    // Silent fail - don't break UI if analytics fail
    console.warn('Failed to track blog view:', error);
  }
}
