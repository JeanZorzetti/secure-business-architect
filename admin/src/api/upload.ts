import { api } from '@/lib/api';
import type {
  UploadResponse,
  MultipleUploadResponse,
  DeleteFileResponse,
} from '@/types/upload';

export const uploadApi = {
  /**
   * Upload de imagem única
   */
  uploadImage: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post<UploadResponse>('/admin/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  /**
   * Upload de múltiplas imagens
   */
  uploadImages: async (files: File[]): Promise<MultipleUploadResponse> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    const response = await api.post<MultipleUploadResponse>('/admin/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  /**
   * Deletar imagem
   */
  deleteImage: async (filename: string): Promise<DeleteFileResponse> => {
    const response = await api.delete<DeleteFileResponse>(`/admin/upload/${filename}`);
    return response.data;
  },
};
