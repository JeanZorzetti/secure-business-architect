export const PostStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
} as const;

export type PostStatus = typeof PostStatus[keyof typeof PostStatus];

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
  status: PostStatus;
  publishedAt?: string | null;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogPostDTO {
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  category: string;
  tags?: string[];
  publishedAt?: Date;
}

export interface UpdateBlogPostDTO {
  title?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  author?: string;
  category?: string;
  tags?: string[];
  publishedAt?: Date;
}

export interface BlogPostFilters {
  status?: PostStatus;
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedBlogPosts {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BlogStats {
  total: number;
  published: number;
  drafts: number;
  thisMonth: number;
}
