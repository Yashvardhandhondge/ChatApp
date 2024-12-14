
import express from 'express';
import { updateUserProfile, getcurrentUserProfile,deleteUserProfile1 } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/profile', authenticateToken, getcurrentUserProfile);
router.patch('/profile', authenticateToken, updateUserProfile);
router.delete('/profile',authenticateToken,deleteUserProfile1);

export default router;
