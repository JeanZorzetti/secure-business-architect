export interface UploadedFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  path: string;
  uploadedBy: string;
  createdAt: Date;
}

export interface UploadOptions {
  maxSize?: number; // em bytes
  allowedMimeTypes?: string[];
  folder?: string;
}

export interface UploadResponse {
  success: boolean;
  file?: UploadedFile;
  error?: string;
}

export interface DeleteFileResponse {
  success: boolean;
  message: string;
}

// Configuração de upload
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
  ],
  UPLOAD_DIR: 'uploads',
  IMAGES_DIR: 'uploads/images',
} as const;
