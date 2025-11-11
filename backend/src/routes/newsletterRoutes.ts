import { Router } from 'express';
import { newsletterController } from '../controllers/newsletterController';
import { campaignController } from '../controllers/campaignController';
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
 * @route   POST /api/newsletter/confirm/:token
 * @desc    Confirmar inscrição na newsletter
 * @access  Public
 */
router.post('/confirm/:token', (req, res) => newsletterController.confirmSubscription(req, res));

/**
 * @route   GET /api/newsletter/unsubscribe/:token
 * @desc    Cancelar inscrição
 * @access  Public
 */
router.get('/unsubscribe/:token', (req, res) => newsletterController.unsubscribe(req, res));

// ==================== CAMPAIGN ROUTES (devem vir ANTES das rotas genéricas) ====================

/**
 * @route   GET /api/newsletter/campaigns/stats
 * @desc    Estatísticas de campanhas
 * @access  Private (Admin)
 */
router.get('/campaigns/stats', authenticateToken, requireAdmin, (req, res) =>
  campaignController.getStats(req, res)
);

/**
 * @route   GET /api/newsletter/campaigns
 * @desc    Listar campanhas
 * @access  Private (Admin)
 */
router.get('/campaigns', authenticateToken, requireAdmin, (req, res) =>
  campaignController.findAllCampaigns(req, res)
);

/**
 * @route   POST /api/newsletter/campaign
 * @desc    Criar nova campanha
 * @access  Private (Admin)
 */
router.post('/campaign', authenticateToken, requireAdmin, (req, res) =>
  campaignController.createCampaign(req, res)
);

/**
 * @route   GET /api/newsletter/campaigns/:id
 * @desc    Buscar campanha por ID
 * @access  Private (Admin)
 */
router.get('/campaigns/:id', authenticateToken, requireAdmin, (req, res) =>
  campaignController.findCampaignById(req, res)
);

/**
 * @route   PUT /api/newsletter/campaigns/:id
 * @desc    Atualizar campanha
 * @access  Private (Admin)
 */
router.put('/campaigns/:id', authenticateToken, requireAdmin, (req, res) =>
  campaignController.updateCampaign(req, res)
);

/**
 * @route   DELETE /api/newsletter/campaigns/:id
 * @desc    Deletar campanha
 * @access  Private (Admin)
 */
router.delete('/campaigns/:id', authenticateToken, requireAdmin, (req, res) =>
  campaignController.deleteCampaign(req, res)
);

/**
 * @route   POST /api/newsletter/campaigns/:id/send
 * @desc    Enviar campanha
 * @access  Private (Admin)
 */
router.post('/campaigns/:id/send', authenticateToken, requireAdmin, (req, res) =>
  campaignController.sendCampaign(req, res)
);

/**
 * @route   POST /api/newsletter/campaigns/:id/schedule
 * @desc    Agendar campanha
 * @access  Private (Admin)
 */
router.post('/campaigns/:id/schedule', authenticateToken, requireAdmin, (req, res) =>
  campaignController.scheduleCampaign(req, res)
);

/**
 * @route   POST /api/newsletter/campaigns/:id/cancel
 * @desc    Cancelar agendamento
 * @access  Private (Admin)
 */
router.post('/campaigns/:id/cancel', authenticateToken, requireAdmin, (req, res) =>
  campaignController.cancelScheduledCampaign(req, res)
);

// ==================== NEWSLETTER SUBSCRIBER ROUTES ====================

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
