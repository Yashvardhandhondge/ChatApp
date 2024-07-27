// backend/services/userService.ts
import prisma from "../models/prismaClient"; // Adjust the import according to your project structure

export const updateProfile = async (userId: number, data: any) => {
  return await prisma.user.update({
    where: { id: userId },
    data,
  });
};

export const getUserProfile = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};
