import { Router } from 'express';
import { capturePaymentController, createOrderController } from '../../controllers/paymentController.js';
import { isAuthenticates } from '../../middlewares/authMiddleware.js';

const router = Router();

router.post('/order', isAuthenticates, createOrderController);
router.post('/capture', capturePaymentController);

export default router;