import { Request, Response } from 'express';
import { uploadService } from '../services/uploadService';
import { logger } from '../config/logger';
import env from '../config/env';
import { UploadResponse } from '../types/upload.types';

class UploadController {
  /**
   * Upload de imagem única
   * POST /api/admin/upload/image
   */
  async uploadImage(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          error: 'Nenhum arquivo foi enviado',
        });
        return;
      }

      const userId = req.user!.id;

      // Salvar informações do arquivo
      const fileInfo = await uploadService.saveFileInfo(req.file, userId, 'images');

      // Gerar URL pública
      const publicUrl = uploadService.getPublicUrl(fileInfo.path, env.BACKEND_URL);

      const response: UploadResponse = {
        success: true,
        file: {
          ...fileInfo,
          url: publicUrl,
        },
      };

      logger.info({ userId, filename: fileInfo.filename }, 'Image uploaded successfully');
      res.status(201).json(response);
    } catch (error) {
      logger.error({ error }, 'Error uploading image');
      res.status(500).json({
        success: false,
        error: 'Erro ao fazer upload da imagem',
      });
    }
  }

  /**
   * Upload de múltiplas imagens
   * POST /api/admin/upload/images
   */
  async uploadImages(req: Request, res: Response): Promise<void> {
    try {
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        res.status(400).json({
          success: false,
          error: 'Nenhum arquivo foi enviado',
        });
        return;
      }

      const userId = req.user!.id;
      const files = req.files as Express.Multer.File[];

      // Processar todos os arquivos
      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          const fileInfo = await uploadService.saveFileInfo(file, userId, 'images');
          const publicUrl = uploadService.getPublicUrl(fileInfo.path, env.BACKEND_URL);
          return {
            ...fileInfo,
            url: publicUrl,
          };
        })
      );

      logger.info(
        { userId, count: uploadedFiles.length },
        'Multiple images uploaded successfully'
      );
      res.status(201).json({
        success: true,
        files: uploadedFiles,
      });
    } catch (error) {
      logger.error({ error }, 'Error uploading images');
      res.status(500).json({
        success: false,
        error: 'Erro ao fazer upload das imagens',
      });
    }
  }

  /**
   * Deletar imagem
   * DELETE /api/admin/upload/:filename
   */
  async deleteImage(req: Request, res: Response): Promise<void> {
    try {
      const { filename } = req.params;

      if (!filename) {
        res.status(400).json({
          success: false,
          error: 'Nome do arquivo é obrigatório',
        });
        return;
      }

      const result = await uploadService.deleteFile(filename);

      if (!result.success) {
        res.status(404).json(result);
        return;
      }

      logger.info({ filename }, 'Image deleted successfully');
      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Error deleting image');
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar imagem',
      });
    }
  }

  /**
   * Listar imagens
   * GET /api/admin/upload/images
   */
  async listImages(_req: Request, res: Response): Promise<void> {
    try {
      const images = await uploadService.listImages(env.BACKEND_URL);

      logger.info({ count: images.length }, 'Images listed successfully');
      res.json({
        success: true,
        images,
      });
    } catch (error) {
      logger.error({ error }, 'Error listing images');
      res.status(500).json({
        success: false,
        error: 'Erro ao listar imagens',
      });
    }
  }
}

export const uploadController = new UploadController();
