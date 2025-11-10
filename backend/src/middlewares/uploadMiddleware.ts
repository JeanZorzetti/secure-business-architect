import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UPLOAD_CONFIG } from '../types/upload.types';
import { Request } from 'express';

// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    // Diretório será criado pelo uploadService se não existir
    cb(null, UPLOAD_CONFIG.IMAGES_DIR);
  },
  filename: (_req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const filename = `${uuidv4()}${fileExtension}`;
    cb(null, filename);
  },
});

// Filtro de arquivos
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Verificar tipo MIME
  if ((UPLOAD_CONFIG.ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Tipo de arquivo não permitido. Tipos aceitos: ${UPLOAD_CONFIG.ALLOWED_IMAGE_TYPES.join(', ')}`
      )
    );
  }
};

// Configuração do multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: UPLOAD_CONFIG.MAX_FILE_SIZE,
  },
});

// Middleware de upload único
export const uploadSingle = upload.single('image');

// Middleware de upload múltiplo
export const uploadMultiple = upload.array('images', 10);
