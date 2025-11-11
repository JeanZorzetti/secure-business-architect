import { Router } from 'express';
import { uploadController } from '../controllers/uploadController';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware';
import { uploadSingle } from '../middlewares/uploadMiddleware';

const router = Router();

/**
 * @route   POST /api/admin/upload/image
 * @desc    Upload de imagem com otimização, thumbnail e suporte a Cloudinary
 * @access  Private (Admin)
 *
 * Body (multipart/form-data):
 * - image: File (obrigatório)
 * - folder: string (opcional, padrão: 'blog')
 * - generateThumbnail: boolean (opcional, padrão: true)
 * - thumbnailWidth: number (opcional, padrão: 300)
 * - thumbnailHeight: number (opcional, padrão: 300)
 * - optimize: boolean (opcional, padrão: true)
 */
router.post(
  '/image',
  authenticateToken,
  requireAdmin,
  uploadSingle,
  (req, res) => uploadController.uploadImage(req, res)
);

/**
 * @route   DELETE /api/admin/upload/image/:publicId
 * @desc    Deletar imagem (local ou Cloudinary)
 * @access  Private (Admin)
 */
router.delete(
  '/image/:publicId',
  authenticateToken,
  requireAdmin,
  (req, res) => uploadController.deleteImage(req, res)
);

export default router;
