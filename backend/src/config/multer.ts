import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Diretórios de upload
const UPLOAD_DIR = path.join(__dirname, '../../uploads');
const IMAGES_DIR = path.join(UPLOAD_DIR, 'images');
const TEMP_DIR = path.join(UPLOAD_DIR, 'temp');

// Criar diretórios se não existirem
[UPLOAD_DIR, IMAGES_DIR, TEMP_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Tipos de arquivo permitidos
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
];

// Extensões permitidas
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Tamanho máximo: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Validação de arquivo
 */
const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  // Verificar tipo MIME
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(
      new Error(
        `Tipo de arquivo não permitido. Use: ${ALLOWED_EXTENSIONS.join(', ')}`
      )
    );
  }

  // Verificar extensão
  const ext = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return cb(
      new Error(
        `Extensão de arquivo não permitida. Use: ${ALLOWED_EXTENSIONS.join(', ')}`
      )
    );
  }

  cb(null, true);
};

/**
 * Storage local (usado antes do upload para cloud)
 */
const localStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, TEMP_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

/**
 * Configuração do Multer para upload local
 */
export const uploadLocal = multer({
  storage: localStorage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1, // Um arquivo por vez
  },
});

/**
 * Configuração do Multer para memória (usado com Sharp)
 */
export const uploadMemory = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
  },
});

/**
 * Utilitários
 */
export const multerUtils = {
  UPLOAD_DIR,
  IMAGES_DIR,
  TEMP_DIR,
  ALLOWED_MIME_TYPES,
  ALLOWED_EXTENSIONS,
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_MB: MAX_FILE_SIZE / (1024 * 1024),
};
