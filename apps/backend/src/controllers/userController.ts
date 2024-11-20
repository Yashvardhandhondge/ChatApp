import { Request, Response } from 'express';
import { updateProfile, getUserProfile,deleteUserProfile } from '../services/userService';

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    if (!req.userId) throw new Error('User not authenticated');
    const { avatarUrl, ...rest } = req.body;
    const user = await updateProfile(req.userId, rest, avatarUrl || null);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getcurrentUserProfile = async (req: Request, res: Response) => {
  try {
    if (!req.userId) throw new Error('User not authenticated');
    const user = await getUserProfile(req.userId);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUserProfile1 = async (req:Request , res:Response) => {
 try{
  if(!req.userId) throw new Error('User not authenticated');
  const user = await deleteUserProfile(req.userId);
  res.status(200).json(user);
 } catch (error: any) {
  res.status(400).json({ error: error.message });
 }
}
