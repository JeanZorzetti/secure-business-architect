import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  getCloudinaryThumbnailUrl,
  getCloudinaryOptimizedUrl,
} from '../config/cloudinary';
import { multerUtils } from '../config/multer';
import env from '../config/env';
import { logger } from '../config/logger';

export interface ImageUploadResult {
  url: string;
  publicId?: string;
  thumbnail?: string;
  optimized?: string;
  width: number;
  height: number;
  size: number;
  format: string;
  filename: string;
}

export interface ThumbnailOptions {
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  quality?: number;
}

class UploadService {
  /**
   * Upload de imagem com otimização e geração de thumbnail
   */
  async uploadImage(
    file: Express.Multer.File,
    options: {
      folder?: string;
      generateThumbnail?: boolean;
      thumbnailOptions?: ThumbnailOptions;
      optimize?: boolean;
    } = {}
  ): Promise<ImageUploadResult> {
    const {
      folder = 'blog',
      generateThumbnail = true,
      thumbnailOptions = {},
      optimize = true,
    } = options;

    try {
      logger.info({ filename: file.originalname }, 'Iniciando upload de imagem');

      // Processar imagem com Sharp
      const processedImage = await this.processImage(file.buffer, {
        optimize,
        ...thumbnailOptions,
      });

      // Verificar se deve usar cloud storage
      const useCloud = env.USE_CLOUD_STORAGE || env.CLOUDINARY_CLOUD_NAME;

      if (useCloud && env.CLOUDINARY_CLOUD_NAME) {
        // Upload para Cloudinary
        return await this.uploadToCloud(processedImage, {
          folder,
          filename: this.generateFilename(file.originalname),
          generateThumbnail,
          thumbnailOptions,
        });
      } else {
        // Upload local
        return await this.uploadToLocal(processedImage, {
          folder,
          filename: this.generateFilename(file.originalname),
          generateThumbnail,
          thumbnailOptions,
        });
      }
    } catch (error) {
      logger.error({ error, filename: file.originalname }, 'Erro ao fazer upload');
      throw new Error('Falha ao fazer upload da imagem');
    }
  }

  /**
   * Processar e otimizar imagem com Sharp
   */
  private async processImage(
    buffer: Buffer,
    options: {
      optimize?: boolean;
      width?: number;
      height?: number;
      quality?: number;
    } = {}
  ): Promise<Buffer> {
    const { optimize = true, width, height, quality = 85 } = options;

    let pipeline = sharp(buffer);

    // Redimensionar se especificado
    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    if (optimize) {
      // Otimizar com base no formato
      pipeline = pipeline
        .jpeg({ quality, progressive: true, mozjpeg: true })
        .png({ quality, compressionLevel: 9 })
        .webp({ quality });
    }

    return await pipeline.toBuffer();
  }

  /**
   * Gerar thumbnail
   */
  private async generateThumbnail(
    buffer: Buffer,
    options: ThumbnailOptions = {}
  ): Promise<Buffer> {
    const {
      width = 300,
      height = 300,
      fit = 'cover',
      quality = 80,
    } = options;

    return await sharp(buffer)
      .resize(width, height, { fit })
      .jpeg({ quality, progressive: true })
      .toBuffer();
  }

  /**
   * Upload para Cloudinary
   */
  private async uploadToCloud(
    buffer: Buffer,
    options: {
      folder: string;
      filename: string;
      generateThumbnail: boolean;
      thumbnailOptions: ThumbnailOptions;
    }
  ): Promise<ImageUploadResult> {
    const { folder, filename, generateThumbnail, thumbnailOptions } = options;

    // Upload da imagem principal
    const result = await uploadToCloudinary(buffer, {
      folder,
      filename: filename.replace(/\.[^/.]+$/, ''), // Remove extensão
    });

    // URLs otimizadas e thumbnail via Cloudinary transformations
    const optimizedUrl = getCloudinaryOptimizedUrl(result.publicId);
    const thumbnailUrl = generateThumbnail
      ? getCloudinaryThumbnailUrl(
          result.publicId,
          thumbnailOptions.width,
          thumbnailOptions.height
        )
      : undefined;

    logger.info(
      { publicId: result.publicId, url: result.url },
      'Upload para Cloudinary concluído'
    );

    return {
      url: result.url,
      publicId: result.publicId,
      thumbnail: thumbnailUrl,
      optimized: optimizedUrl,
      width: result.width,
      height: result.height,
      size: result.bytes,
      format: result.format,
      filename,
    };
  }

  /**
   * Upload local (fallback)
   */
  private async uploadToLocal(
    buffer: Buffer,
    options: {
      folder: string;
      filename: string;
      generateThumbnail: boolean;
      thumbnailOptions: ThumbnailOptions;
    }
  ): Promise<ImageUploadResult> {
    const { folder, filename, generateThumbnail, thumbnailOptions } = options;

    // Criar diretório se não existir
    const uploadPath = path.join(multerUtils.IMAGES_DIR, folder);
    await fs.mkdir(uploadPath, { recursive: true });

    // Salvar imagem principal
    const imagePath = path.join(uploadPath, filename);
    await fs.writeFile(imagePath, buffer);

    // Gerar thumbnail se solicitado
    let thumbnailPath: string | undefined;
    if (generateThumbnail) {
      const thumbnailBuffer = await this.generateThumbnail(
        buffer,
        thumbnailOptions
      );
      const thumbnailFilename = `thumb_${filename}`;
      thumbnailPath = path.join(uploadPath, thumbnailFilename);
      await fs.writeFile(thumbnailPath, thumbnailBuffer);
    }

    // Obter metadados da imagem
    const metadata = await sharp(buffer).metadata();

    logger.info({ path: imagePath }, 'Upload local concluído');

    const baseUrl = `${env.BACKEND_URL}/uploads/images/${folder}`;

    return {
      url: `${baseUrl}/${filename}`,
      thumbnail: thumbnailPath
        ? `${baseUrl}/thumb_${filename}`
        : undefined,
      optimized: `${baseUrl}/${filename}`,
      width: metadata.width || 0,
      height: metadata.height || 0,
      size: buffer.length,
      format: metadata.format || 'unknown',
      filename,
    };
  }

  /**
   * Deletar imagem
   */
  async deleteImage(publicIdOrPath: string): Promise<void> {
    try {
      if (publicIdOrPath.includes('/')) {
        // É um publicId do Cloudinary
        await deleteFromCloudinary(publicIdOrPath);
        logger.info({ publicId: publicIdOrPath }, 'Imagem deletada do Cloudinary');
      } else {
        // É um caminho local
        const imagePath = path.join(multerUtils.IMAGES_DIR, publicIdOrPath);
        await fs.unlink(imagePath);

        // Tentar deletar thumbnail também
        const thumbnailPath = path.join(
          path.dirname(imagePath),
          `thumb_${path.basename(imagePath)}`
        );
        try {
          await fs.unlink(thumbnailPath);
        } catch {
          // Thumbnail pode não existir
        }

        logger.info({ path: imagePath }, 'Imagem deletada localmente');
      }
    } catch (error) {
      logger.error({ error, publicIdOrPath }, 'Erro ao deletar imagem');
      throw new Error('Falha ao deletar imagem');
    }
  }

  /**
   * Gerar nome único de arquivo
   */
  private generateFilename(originalName: string): string {
    const ext = path.extname(originalName);
    return `${uuidv4()}${ext}`;
  }

  /**
   * Validar arquivo
   */
  validateFile(file: Express.Multer.File): {
    valid: boolean;
    error?: string;
  } {
    // Verificar tamanho
    if (file.size > multerUtils.MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `Arquivo muito grande. Tamanho máximo: ${multerUtils.MAX_FILE_SIZE_MB}MB`,
      };
    }

    // Verificar tipo MIME
    if (!multerUtils.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return {
        valid: false,
        error: `Tipo de arquivo não permitido. Use: ${multerUtils.ALLOWED_EXTENSIONS.join(', ')}`,
      };
    }

    return { valid: true };
  }
}

export const uploadService = new UploadService();
