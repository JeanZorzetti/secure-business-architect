import { Router } from 'express';
import { uploadController } from '../controllers/uploadController';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware';
import { uploadSingle, uploadMultiple } from '../middlewares/uploadMiddleware';

const router = Router();

/**
 * @route   POST /api/admin/upload/image
 * @desc    Upload de imagem única
 * @access  Private (Admin)
 */
router.post(
  '/image',
  authenticateToken,
  requireAdmin,
  uploadSingle,
  (req, res) => uploadController.uploadImage(req, res)
);

/**
 * @route   GET /api/admin/upload/images-list
 * @desc    Listar todas as imagens
 * @access  Private (Admin)
 */
router.get(
  '/images-list',
  authenticateToken,
  requireAdmin,
  (req, res) => uploadController.listImages(req, res)
);

/**
 * @route   POST /api/admin/upload/images
 * @desc    Upload de múltiplas imagens
 * @access  Private (Admin)
 */
router.post(
  '/images',
  authenticateToken,
  requireAdmin,
  uploadMultiple,
  (req, res) => uploadController.uploadImages(req, res)
);

/**
 * @route   DELETE /api/admin/upload/:filename
 * @desc    Deletar imagem
 * @access  Private (Admin)
 */
router.delete(
  '/:filename',
  authenticateToken,
  requireAdmin,
  (req, res) => uploadController.deleteImage(req, res)
);

export default router;
