import express from 'express';
import { createRoom, joinRoom, getRooms, getRoom, getUsersInRoom, allowUserToJoinRoom, getRoomsByUser, getRoomsByName,deleteRoom} from '../controllers/roomController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticateToken, createRoom);
router.post('/join', authenticateToken, joinRoom);
router.get('/', authenticateToken, getRooms);
router.get('/:roomId', authenticateToken, getRoom);
router.get('/:roomId/users', authenticateToken, getUsersInRoom);
router.post('/allowJoin', authenticateToken, allowUserToJoinRoom);
router.get('/user/:userId', authenticateToken, getRoomsByUser); 
router.get('/room/:name', authenticateToken, getRoomsByName); 
router.get('/delete/:roomId', authenticateToken, deleteRoom);
export default router;
