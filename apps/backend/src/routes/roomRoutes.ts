import express from 'express';
import { createRoom, joinRoom, getRooms } from '../controllers/roomController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticateToken, createRoom);
router.post('/join', authenticateToken, joinRoom);
router.get('/', authenticateToken, getRooms);

export default router;
