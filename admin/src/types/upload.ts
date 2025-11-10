export interface UploadedFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  path: string;
  uploadedBy: string;
  createdAt: string;
}

export interface UploadResponse {
  success: boolean;
  file?: UploadedFile;
  error?: string;
}

export interface MultipleUploadResponse {
  success: boolean;
  files?: UploadedFile[];
  error?: string;
}

export interface DeleteFileResponse {
  success: boolean;
  message: string;
}

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
