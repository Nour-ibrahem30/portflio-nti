import { Router } from 'express';
import * as ctrl from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authLoginValidator } from '../validators/index.js';
import { handleValidation } from '../middleware/validation.middleware.js';

const router = Router();

router.post('/login', authLoginValidator, handleValidation, ctrl.login);
router.get('/me', protect, ctrl.me);

export default router;
