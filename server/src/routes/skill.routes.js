import { Router } from 'express';
import * as ctrl from '../controllers/skill.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { skillValidator } from '../validators/index.js';
import { handleValidation } from '../middleware/validation.middleware.js';

const router = Router();
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', protect, adminOnly, skillValidator, handleValidation, ctrl.create);
router.put('/:id', protect, adminOnly, skillValidator, handleValidation, ctrl.update);
router.delete('/:id', protect, adminOnly, ctrl.remove);
export default router;
