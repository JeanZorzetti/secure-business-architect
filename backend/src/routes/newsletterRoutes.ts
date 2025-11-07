import { Router } from 'express';
import { newsletterController } from '../controllers/newsletterController';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware';
import rateLimit from 'express-rate-limit';
import env from '../config/env';

const router = Router();

// Rate limiter específico para inscrição na newsletter (público)
const subscribeRateLimiter = rateLimit({
  windowMs: env.CONTACT_RATE_LIMIT_WINDOW_MS, // Usar mesma config do contact
  max: 5, // 5 inscrições por hora
  message: 'Muitas tentativas de inscrição. Tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * @route   POST /api/newsletter/subscribe
 * @desc    Inscrever na newsletter
 * @access  Public (com rate limit)
 */
router.post('/subscribe', subscribeRateLimiter, (req, res) =>
  newsletterController.subscribe(req, res)
);

/**
 * @route   GET /api/newsletter/unsubscribe/:token
 * @desc    Cancelar inscrição
 * @access  Public
 */
router.get('/unsubscribe/:token', (req, res) => newsletterController.unsubscribe(req, res));

/**
 * @route   GET /api/newsletter/stats
 * @desc    Obter estatísticas da newsletter
 * @access  Private (Admin)
 */
router.get('/stats', authenticateToken, requireAdmin, (req, res) =>
  newsletterController.getStats(req, res)
);

/**
 * @route   GET /api/newsletter/export
 * @desc    Exportar lista de inscritos (CSV)
 * @access  Private (Admin)
 */
router.get('/export', authenticateToken, requireAdmin, (req, res) =>
  newsletterController.export(req, res)
);

/**
 * @route   GET /api/newsletter
 * @desc    Listar inscritos com filtros
 * @access  Private (Admin)
 */
router.get('/', authenticateToken, requireAdmin, (req, res) =>
  newsletterController.findAll(req, res)
);

/**
 * @route   GET /api/newsletter/:id
 * @desc    Buscar inscrito por ID
 * @access  Private (Admin)
 */
router.get('/:id', authenticateToken, requireAdmin, (req, res) =>
  newsletterController.findById(req, res)
);

/**
 * @route   DELETE /api/newsletter/:id
 * @desc    Deletar inscrito
 * @access  Private (Admin)
 */
router.delete('/:id', authenticateToken, requireAdmin, (req, res) =>
  newsletterController.delete(req, res)
);

export default router;
