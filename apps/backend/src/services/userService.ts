import prisma from "../models/prismaClient";
import { UserProfile } from "../types/custom"; 

export const updateProfile = async (userId: number, data: any, avatarUrl: string | null) => {
  if (avatarUrl) {
    data.avatarUrl = avatarUrl;
  }
  return await prisma.user.update({
    where: { id: userId },
    data,
  });
};

export const getUserProfile: (userId: number) => Promise<UserProfile | null> = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
      avatarUrl: true,
      createdAt: true,
      updatedAt: true,
      lastLogin: true,
      status: true,
      rooms:true
    }
  });
}