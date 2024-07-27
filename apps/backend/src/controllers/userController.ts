// backend/controllers/userController.ts
import { Request, Response } from 'express';
import { updateProfile,getUserProfile } from '../services/userService';

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    if (!req.userId) throw new Error('User not authenticated');
    const user = await updateProfile(req.userId, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getcurrentUserProfile = async (req: Request, res: Response) => {
  try {
    if (!req.userId) throw new Error('User not authenticated');
    const user = await getUserProfile(req.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
