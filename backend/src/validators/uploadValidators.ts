import { z } from 'zod';
import { UPLOAD_CONFIG } from '../types/upload.types';

export const uploadImageSchema = z.object({
  file: z.custom<Express.Multer.File>((file) => {
    if (!file) {
      return false;
    }

    // Validar tipo MIME
    if (!UPLOAD_CONFIG.ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      throw new Error(
        `Tipo de arquivo não permitido. Tipos aceitos: ${UPLOAD_CONFIG.ALLOWED_IMAGE_TYPES.join(', ')}`
      );
    }

    // Validar tamanho
    if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
      throw new Error(
        `Arquivo muito grande. Tamanho máximo: ${UPLOAD_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB`
      );
    }

    return true;
  }),
});

export const deleteFileSchema = z.object({
  filename: z.string().min(1, 'Nome do arquivo é obrigatório'),
});
