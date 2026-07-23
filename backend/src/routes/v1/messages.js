import { Router } from 'express';
import { isAuthenticates } from '../../middlewares/authMiddleware.js';
import { getMessagesController, getPresignedUrlFromAWS } from '../../controllers/messageController.js';

const router = Router();

router.get('/pre-signed-url', isAuthenticates, getPresignedUrlFromAWS);
router.get('/:channelId' ,isAuthenticates, getMessagesController);

export default router;