import { Router } from 'express';
import { contactController } from '../controllers/contactController';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware';
import rateLimit from 'express-rate-limit';
import env from '../config/env';

const router = Router();

// Rate limiter específico para criação de contatos (público)
const contactRateLimiter = rateLimit({
  windowMs: env.CONTACT_RATE_LIMIT_WINDOW_MS,
  max: env.CONTACT_RATE_LIMIT_MAX,
  message: 'Muitas solicitações. Tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * @route   POST /api/contacts
 * @desc    Criar novo contato (público - formulário do site)
 * @access  Public (com rate limit)
 */
router.post('/', contactRateLimiter, (req, res) => contactController.create(req, res));

/**
 * @route   GET /api/contacts/stats
 * @desc    Obter estatísticas de contatos
 * @access  Private (Admin)
 */
router.get('/stats', authenticateToken, requireAdmin, (req, res) =>
  contactController.getStats(req, res)
);

/**
 * @route   GET /api/contacts
 * @desc    Listar todos os contatos com filtros
 * @access  Private (Admin)
 */
router.get('/', authenticateToken, requireAdmin, (req, res) =>
  contactController.findAll(req, res)
);

/**
 * @route   GET /api/contacts/:id
 * @desc    Buscar contato por ID
 * @access  Private (Admin)
 */
router.get('/:id', authenticateToken, requireAdmin, (req, res) =>
  contactController.findById(req, res)
);

/**
 * @route   PATCH /api/contacts/:id/status
 * @desc    Atualizar status do contato
 * @access  Private (Admin)
 */
router.patch('/:id/status', authenticateToken, requireAdmin, (req, res) =>
  contactController.updateStatus(req, res)
);

/**
 * @route   DELETE /api/contacts/:id
 * @desc    Deletar contato
 * @access  Private (Admin)
 */
router.delete('/:id', authenticateToken, requireAdmin, (req, res) =>
  contactController.delete(req, res)
);

export default router;
