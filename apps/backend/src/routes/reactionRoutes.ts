import { Router } from 'express';
import { addReaction, getReactions,deleteReaction } from '../controllers/reactionController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticateToken, addReaction);
router.get('/:messageId', authenticateToken, getReactions);
router.delete('/', authenticateToken, deleteReaction);
export default router;
