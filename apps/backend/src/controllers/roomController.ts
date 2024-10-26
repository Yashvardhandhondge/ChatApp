import { Request, Response } from "express";
import prisma from "../models/prismaClient";

export const createRoom = async (req: Request, res: Response) => {
    try {
        const { name, description, isPrivate, type, joinable } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const room = await prisma.room.create({
            data: {
                name,
                description,
                private: isPrivate,
                type,
                joinable,
                users: {
                    connect: { id: userId }
                }
            }
        });
        res.status(201).json(room);
    } catch (error) {
        console.error("Error creating room:", error);
        res.status(400).json({ error: (error as Error).message || "An error occurred while creating the room" });
    }
};

export const joinRoom = async (req: Request, res: Response) => {
    try {
        const { roomId } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const existingRoomUser = await prisma.roomUser.findFirst({
            where: { roomId, userId }
        });

        if (existingRoomUser) {
            return res.status(400).json({ error: "User already in the room" });
        }

        await prisma.roomUser.create({
            data: { roomId, userId }
        });

        await prisma.user.update({
            where: { id: userId },
            data: { rooms: { connect: { id: roomId } } }
        });

        await prisma.room.update({
            where: { id: roomId },
            data: { users: { connect: { id: userId } } }
        });

        res.status(200).json({ message: "User joined the room successfully" });
    } catch (error) {
        console.error("Error joining room:", error);
        res.status(400).json({ error: (error as Error).message || "An error occurred while joining the room" });
    }
};
export const getRooms = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;

        const rooms = await prisma.room.findMany({
            where: {
                OR: [
                    { private: false }, 
                    {
                        users: {
                            some: { id: userId } 
                        }
                    }
                ]
            },
            include: {
                users: true, 
            }
        });
        
        res.status(200).json(rooms);
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(400).json({ error: (error as Error).message || "An error occurred while fetching rooms" });
    }
};

export const getRoom = async (req: Request, res: Response) => {
    try {
        const { roomId } = req.params;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const room = await prisma.room.findFirst({
            where: {
                id: parseInt(roomId),
                users: {
                    some: { id: userId }
                }
            }
        });

        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        res.status(200).json(room);
    } catch (error) {
        console.error("Error fetching room:", error);
        res.status(400).json({ error: (error as Error).message || "An error occurred while fetching the room" });
    }
};

export const getUsersInRoom = async (req: Request, res: Response) => {
    try {
        const { roomId } = req.params;

        const users = await prisma.user.findMany({
            where: {
                rooms: {
                    some: {
                        id: parseInt(roomId)
                    }
                }
            }
        });

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users in room:", error);
        res.status(400).json({ error: (error as Error).message || "An error occurred while fetching users in the room" });
    }
};

export const allowUserToJoinRoom = async (req: Request, res: Response) => {
    try {
        const { roomId, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID not provided" });
        }

        await prisma.roomUser.create({
            data: { roomId, userId }
        });

        await prisma.user.update({
            where: { id: userId },
            data: { rooms: { connect: { id: roomId } } }
        });

        await prisma.room.update({
            where: { id: roomId },
            data: { users: { connect: { id: userId } } }
        });

        res.status(200).json({ message: "User added to room successfully" });
    } catch (error) {
        console.error("Error allowing user to join room:", error);
        res.status(400).json({ error: (error as Error).message || "An error occurred while adding the user to the room" });
    }
};

export const getRoomsByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

       
        if (!req.userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const rooms = await prisma.room.findMany({
            where: {
                users: {
                    some: {
                        id: parseInt(userId)
                    }
                }
            },
            include:{
                
            }
        });

        res.status(200).json(rooms);
    } catch (error) {
        console.error("Error fetching rooms by user:", error);
        res.status(400).json({ error: (error as Error).message || "An error occurred while fetching rooms by user" });
    }
};

export const getRoomsByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        console.log(name);
        

       
        if (!req.userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const rooms = await prisma.room.findMany({
            where: {
                name: {
                    contains: name
                }
            },
            include:{
                
            }
        });

        res.status(200).json(rooms);
    } catch (error) {
        console.error("Error fetching rooms by user:", error);
        res.status(400).json({ error: (error as Error).message || "An error occurred while fetching rooms by user" });
    }
};


