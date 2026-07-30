import { Router } from 'express';
import { createOrderController } from '../../controllers/paymentController';
import { isAuthenticates } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/order', isAuthenticates, createOrderController);

export default router;