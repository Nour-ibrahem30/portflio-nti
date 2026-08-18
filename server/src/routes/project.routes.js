import { Router } from 'express';
import * as ctrl from '../controllers/project.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { projectValidator } from '../validators/index.js';
import { handleValidation } from '../middleware/validation.middleware.js';

const router = Router();

router.get('/', ctrl.getAll);
router.get('/slug/:slug', ctrl.getBySlug);
router.get('/:id', ctrl.getById);

router.post('/', protect, adminOnly, projectValidator, handleValidation, ctrl.create);
router.put('/:id', protect, adminOnly, projectValidator, handleValidation, ctrl.update);
router.delete('/:id', protect, adminOnly, ctrl.remove);

export default router;
