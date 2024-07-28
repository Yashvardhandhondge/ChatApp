import { Request, Response } from "express";
import prisma from "../models/prismaClient"

export const addReaction = async (req: Request, res: Response) => {
    try {
        const { type, messageId } = req.body;
        const userId = req.userId;
        if (!userId) {
            throw new Error("User not authenticated");
        }
        const reaction = await prisma.reaction.create({
            data: {
                type,
                userId,
                messageId,
            },
        });
        res.status(201).json(reaction);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};


export const getReactions = async (req: Request, res: Response) => {
    try {
        const { messageId } = req.params;
        const reactions = await prisma.reaction.findMany({
            where: { messageId: parseInt(messageId) },
        });
        res.status(200).json(reactions);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const deleteReaction = async(req:Request,res:Response)=>{    
    try{
        const { reactionId } = req.body;
        const userId = req.userId;
        if (!userId) {
            throw new Error("User not authenticated");
        }

        if (typeof reactionId !== "number") {
            throw new Error("reactionId must be a number");
        }

        const reaction = await prisma.reaction.delete({
            where: { id: reactionId },
        });

        res.status(200).json(reaction);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}
