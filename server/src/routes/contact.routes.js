import { Router } from 'express';
import * as ctrl from '../controllers/contact.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { contactValidator } from '../validators/index.js';
import { handleValidation } from '../middleware/validation.middleware.js';

const router = Router();
router.post('/', contactValidator, handleValidation, ctrl.create);
router.get('/', protect, adminOnly, ctrl.getAll);
router.get('/:id', protect, adminOnly, ctrl.getById);
router.patch('/:id/status', protect, adminOnly, ctrl.updateStatus);
router.delete('/:id', protect, adminOnly, ctrl.remove);
export default router;
