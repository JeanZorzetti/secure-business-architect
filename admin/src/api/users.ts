import { api } from '@/lib/api';
import type {
  User,
  UserFilters,
  PaginatedUsers,
  CreateUserDTO,
  UpdateUserDTO,
  UpdateProfileDTO,
  ChangePasswordDTO,
} from '@/types/user';

export const usersApi = {
  // ==================== PROFILE (SELF) ====================

  /**
   * Get own profile
   */
  async getProfile(): Promise<User> {
    const response = await api.get<User>('/admin/profile');
    return response.data;
  },

  /**
   * Update own profile
   */
  async updateProfile(data: UpdateProfileDTO): Promise<User> {
    const response = await api.put<User>('/admin/profile', data);
    return response.data;
  },

  /**
   * Change own password
   */
  async changePassword(data: ChangePasswordDTO): Promise<{ message: string }> {
    const response = await api.put<{ message: string }>('/admin/profile/password', data);
    return response.data;
  },

  // ==================== USER MANAGEMENT (SUPER ADMIN) ====================

  /**
   * List all users with filters and pagination
   */
  async getAll(filters?: UserFilters): Promise<PaginatedUsers> {
    const params = new URLSearchParams();

    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.role) params.append('role', filters.role);
    if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString());

    const response = await api.get<PaginatedUsers>(`/admin/users?${params.toString()}`);
    return response.data;
  },

  /**
   * Get user by ID
   */
  async getById(id: string): Promise<User> {
    const response = await api.get<User>(`/admin/users/${id}`);
    return response.data;
  },

  /**
   * Create new user
   */
  async create(data: CreateUserDTO): Promise<User> {
    const response = await api.post<User>('/admin/users', data);
    return response.data;
  },

  /**
   * Update user
   */
  async update(id: string, data: UpdateUserDTO): Promise<User> {
    const response = await api.put<User>(`/admin/users/${id}`, data);
    return response.data;
  },

  /**
   * Delete user
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/admin/users/${id}`);
  },

  /**
   * Toggle user active status
   */
  async toggleActive(id: string): Promise<User> {
    const response = await api.patch<User>(`/admin/users/${id}/toggle-active`);
    return response.data;
  },
};
