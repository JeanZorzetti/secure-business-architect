import { Request, Response } from 'express';
import { uploadService } from '../services/uploadService';
import { logger } from '../config/logger';

export class UploadController {
  /**
   * POST /api/admin/upload/image
   * Upload de imagem com otimização e thumbnail
   */
  async uploadImage(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'Nenhum arquivo enviado' });
        return;
      }

      // Validar arquivo
      const validation = uploadService.validateFile(req.file);
      if (!validation.valid) {
        res.status(400).json({ error: validation.error });
        return;
      }

      // Obter opções do body
      const {
        folder = 'blog',
        generateThumbnail = true,
        thumbnailWidth = 300,
        thumbnailHeight = 300,
        optimize = true,
      } = req.body;

      // Fazer upload
      const result = await uploadService.uploadImage(req.file, {
        folder,
        generateThumbnail: generateThumbnail === 'true' || generateThumbnail === true,
        thumbnailOptions: {
          width: parseInt(thumbnailWidth) || 300,
          height: parseInt(thumbnailHeight) || 300,
          fit: 'cover',
        },
        optimize: optimize === 'true' || optimize === true,
      });

      logger.info(
        {
          filename: result.filename,
          url: result.url,
          size: result.size,
        },
        'Imagem enviada com sucesso'
      );

      res.status(201).json({
        message: 'Imagem enviada com sucesso',
        data: result,
      });
    } catch (error) {
      logger.error({ error }, 'Erro ao fazer upload de imagem');

      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao fazer upload de imagem' });
    }
  }

  /**
   * DELETE /api/admin/upload/image/:publicId
   * Deletar imagem
   */
  async deleteImage(req: Request, res: Response): Promise<void> {
    try {
      const { publicId } = req.params;

      if (!publicId) {
        res.status(400).json({ error: 'publicId é obrigatório' });
        return;
      }

      await uploadService.deleteImage(publicId);

      logger.info({ publicId }, 'Imagem deletada com sucesso');

      res.json({ message: 'Imagem deletada com sucesso' });
    } catch (error) {
      logger.error({ error }, 'Erro ao deletar imagem');

      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao deletar imagem' });
    }
  }
}

export const uploadController = new UploadController();
