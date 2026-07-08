import { Router } from 'express';
import { isAuthenticates } from '../../middlewares/authMiddleware.js';
import { getMessagesController } from '../../controllers/messageController';

const router = Router();

router.get('/messages/:channelId' ,isAuthenticates, getMessagesController);

export default router;