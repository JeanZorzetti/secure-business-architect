import { Comment, CommentStatus } from '@prisma/client';

/**
 * Types para sistema de comentários
 */

// DTOs para criação
export interface CreateCommentDTO {
  postId: string;
  name: string;
  email: string;
  content: string;
  ipAddress?: string;
  userAgent?: string;
}

// DTOs para atualização (admin)
export interface UpdateCommentDTO {
  name?: string;
  email?: string;
  content?: string;
  status?: CommentStatus;
}

// DTOs para moderação
export interface ModerateCommentDTO {
  status: CommentStatus;
}

// Response types
export interface CommentResponse extends Comment {}

export interface CommentListResponse {
  comments: CommentResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CommentStatsResponse {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  todayCount: number;
  weekCount: number;
}

// Query filters
export interface CommentFilters {
  postId?: string;
  status?: CommentStatus;
  email?: string;
  search?: string; // Busca em name, email ou content
  startDate?: Date;
  endDate?: Date;
}

export interface CommentListParams extends CommentFilters {
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'name';
  sortOrder?: 'asc' | 'desc';
}

// Public response (sem dados sensíveis)
export interface PublicCommentResponse {
  id: string;
  name: string;
  content: string;
  createdAt: Date;
}

export interface PublicCommentListResponse {
  comments: PublicCommentResponse[];
  total: number;
}
