
import express from 'express';
import { updateUserProfile, getcurrentUserProfile } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/profile', authenticateToken, getcurrentUserProfile);
router.patch('/profile', authenticateToken, updateUserProfile);

export default router;
