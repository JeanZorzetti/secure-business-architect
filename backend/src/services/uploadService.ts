import { UploadedFile, DeleteFileResponse, UPLOAD_CONFIG } from '../types/upload.types';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

class UploadService {
  /**
   * Salvar informações do arquivo no banco de dados
   */
  async saveFileInfo(
    file: Express.Multer.File,
    userId: string,
    folder: string = 'images'
  ): Promise<UploadedFile> {
    const fileId = uuidv4();
    const fileExtension = path.extname(file.originalname);
    const filename = `${fileId}${fileExtension}`;
    const relativePath = `${folder}/${filename}`;

    // Salvar no banco de dados (opcional - para tracking)
    // Por enquanto, retornamos os dados sem persistir no DB
    // Se quiser persistir, precisaria criar model UploadedFile no Prisma

    const uploadedFile: UploadedFile = {
      id: fileId,
      filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url: `/uploads/${relativePath}`,
      path: relativePath,
      uploadedBy: userId,
      createdAt: new Date(),
    };

    return uploadedFile;
  }

  /**
   * Mover arquivo temporário para diretório final
   */
  async moveFile(
    tempPath: string,
    finalPath: string
  ): Promise<void> {
    const dir = path.dirname(finalPath);

    // Criar diretório se não existir
    await fs.mkdir(dir, { recursive: true });

    // Mover arquivo
    await fs.rename(tempPath, finalPath);
  }

  /**
   * Deletar arquivo
   */
  async deleteFile(filename: string): Promise<DeleteFileResponse> {
    try {
      const filePath = path.join(process.cwd(), UPLOAD_CONFIG.UPLOAD_DIR, filename);

      // Verificar se arquivo existe
      await fs.access(filePath);

      // Deletar arquivo
      await fs.unlink(filePath);

      return {
        success: true,
        message: 'Arquivo deletado com sucesso',
      };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return {
          success: false,
          message: 'Arquivo não encontrado',
        };
      }

      throw error;
    }
  }

  /**
   * Obter URL pública do arquivo
   */
  getPublicUrl(filename: string, baseUrl: string): string {
    return `${baseUrl}/uploads/${filename}`;
  }

  /**
   * Validar se arquivo é uma imagem
   */
  isValidImage(mimeType: string): boolean {
    return (UPLOAD_CONFIG.ALLOWED_IMAGE_TYPES as readonly string[]).includes(mimeType);
  }

  /**
   * Validar tamanho do arquivo
   */
  isValidSize(size: number): boolean {
    return size <= UPLOAD_CONFIG.MAX_FILE_SIZE;
  }
}

export const uploadService = new UploadService();
