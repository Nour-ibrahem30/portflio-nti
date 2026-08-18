import { Router } from 'express';
import * as ctrl from '../controllers/education.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = Router();
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', protect, adminOnly, ctrl.create);
router.put('/:id', protect, adminOnly, ctrl.update);
router.delete('/:id', protect, adminOnly, ctrl.remove);
export default router;
