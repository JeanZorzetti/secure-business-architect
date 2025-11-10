import express from 'express';
import { leadsController } from '../controllers/leadsController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { apiLimiter } from '../middlewares/rateLimiter';

const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);
router.use(apiLimiter);

// ==================== LEADS CRUD ====================

// List leads with filters
router.get('/admin/leads', leadsController.findAllLeads.bind(leadsController));

// Get lead statistics
router.get('/admin/leads/stats', leadsController.getLeadStats.bind(leadsController));

// Export leads to CSV
router.get('/admin/leads/export', leadsController.exportLeads.bind(leadsController));

// Get lead by ID
router.get('/admin/leads/:id', leadsController.findLeadById.bind(leadsController));

// Create lead
router.post('/admin/leads', leadsController.createLead.bind(leadsController));

// Update lead
router.patch('/admin/leads/:id', leadsController.updateLead.bind(leadsController));

// Delete lead
router.delete('/admin/leads/:id', leadsController.deleteLead.bind(leadsController));

// Convert lead to client
router.patch('/admin/leads/:id/convert', leadsController.convertLead.bind(leadsController));

// ==================== INTERACTIONS ====================

// Get interactions for a lead
router.get('/admin/leads/:id/interactions', leadsController.getInteractionsByLead.bind(leadsController));

// Create interaction for a lead
router.post('/admin/leads/:id/interactions', leadsController.createInteraction.bind(leadsController));

// Update interaction
router.patch('/admin/interactions/:interactionId', leadsController.updateInteraction.bind(leadsController));

// Delete interaction
router.delete('/admin/interactions/:interactionId', leadsController.deleteInteraction.bind(leadsController));

// ==================== NOTES ====================

// Get notes for a lead
router.get('/admin/leads/:id/notes', leadsController.getNotesByLead.bind(leadsController));

// Create note for a lead
router.post('/admin/leads/:id/notes', leadsController.createNote.bind(leadsController));

// Update note
router.patch('/admin/notes/:noteId', leadsController.updateNote.bind(leadsController));

// Delete note
router.delete('/admin/notes/:noteId', leadsController.deleteNote.bind(leadsController));

// ==================== TIMELINE ====================

// Get complete timeline for a lead (interactions + notes)
router.get('/admin/leads/:id/timeline', leadsController.getLeadTimeline.bind(leadsController));

export default router;
