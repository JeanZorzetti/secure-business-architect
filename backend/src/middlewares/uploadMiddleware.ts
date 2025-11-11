import { Request, Response, NextFunction } from 'express';
import { uploadMemory } from '../config/multer';
import { logger } from '../config/logger';

/**
 * Middleware para upload de imagem única (em memória para processamento com Sharp)
 */
export const uploadSingle = (req: Request, res: Response, next: NextFunction): void => {
  const upload = uploadMemory.single('image');

  upload(req, res, (err) => {
    if (err) {
      logger.error({ error: err }, 'Erro no upload de arquivo');

      if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(400).json({
          error: 'Arquivo muito grande. Tamanho máximo: 5MB',
        });
        return;
      }

      res.status(400).json({
        error: err.message || 'Erro ao fazer upload do arquivo',
      });
      return;
    }

    next();
  });
};

/**
 * Middleware para upload de múltiplas imagens
 */
export const uploadMultiple = (req: Request, res: Response, next: NextFunction): void => {
  const upload = uploadMemory.array('images', 10);

  upload(req, res, (err) => {
    if (err) {
      logger.error({ error: err }, 'Erro no upload de arquivos');

      if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(400).json({
          error: 'Um ou mais arquivos são muito grandes. Tamanho máximo: 5MB por arquivo',
        });
        return;
      }

      if (err.code === 'LIMIT_FILE_COUNT') {
        res.status(400).json({
          error: 'Muitos arquivos. Máximo: 10 arquivos',
        });
        return;
      }

      res.status(400).json({
        error: err.message || 'Erro ao fazer upload dos arquivos',
      });
      return;
    }

    next();
  });
};
