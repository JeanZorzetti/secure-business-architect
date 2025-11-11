import { UserRole } from '@prisma/client';

// User Preferences
export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  notifications?: {
    email?: boolean;
    push?: boolean;
    newsletter?: boolean;
  };
}

// User DTOs
export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export interface UpdateUserDTO {
  email?: string;
  name?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface UpdateProfileDTO {
  name?: string;
  email?: string;
  avatar?: string;
  preferences?: UserPreferences;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences?: UserPreferences;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserListQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  isActive?: boolean;
}
