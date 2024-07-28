import express from 'express';
import { sendmessage, editMessage, getMessages, deleteMessage } from '../controllers/messageController';    
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/send',authenticateToken,sendmessage);
router.patch('/edit',authenticateToken,editMessage);
router.get('/:roomId',authenticateToken,getMessages);
router.delete('/delete',authenticateToken,deleteMessage);

export default router;