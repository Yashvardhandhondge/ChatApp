import { Request,Response } from "express";
import prisma from "../models/prismaClient";
import { error } from "console";
import { parse } from "path";
import exp from "constants";

export const sendmessage = async (req:Request,res:Response)=>{
    try{
        const {content,roomId} = req.body;
        const userId = req.userId;
        if(!userId){
       throw new Error('User not Authenticated');
        }

        const message = await prisma.message.create({
            data:{
                content,
                userId,
                roomId,
            }
        })
        res.status(201).json(message)
    }catch(error){
        res.status(400).json({error:error})
    }
}


export const editMessage = async (req: Request, res: Response) => {
    try {
        const { messageId, content } = req.body;
        const userId = req.userId;

        if (!userId) {
            throw new Error("User not authenticated");
        }

        console.log(`Authenticated userId: ${userId}`);
        console.log(`Attempting to edit messageId: ${messageId}`);

        
        const message = await prisma.message.findUnique({
            where: { id: messageId },
        });

        console.log(`Query result for messageId ${messageId}:`, message);

        if (!message) {
            console.log("Message not found");
            return res.status(404).json({ error: "Message not found" });
        }

        console.log(`Message userId: ${message.userId}`);

        if (message.userId !== userId) {
            console.log("User is not authorized to edit this message");
            return res.status(403).json({ error: "You are not authorized to edit this message" });
        }

      
        const updatedMessage = await prisma.message.update({
            where: { id: messageId },
            data: { content, editedAt: new Date() },
        });

        res.status(200).json(updatedMessage);
    } catch (error) {
        console.log("Error in editMessage:", error);
        res.status(400).json({ error: error });
    }
};
export const getMessages = async(req:Request,res:Response)=>{
    try{
        const {roomId} = req.params;
        const messages = await prisma.message.findMany({
            where:{roomId:parseInt(roomId)},
            include:{user:true,reactions:true},
        })
        res.status(200).json(messages)
    }catch(error){
        res.status(400).json({error:error})
    }
}

export const deleteMessage = async(req:Request,res:Response)=>{ 
    try{
        const {messageId} = req.body;
        const userId = req.userId;
        if(!userId){
            throw new Error("User not authenticated");
        }
        const message = await prisma.message.delete({
            where:{id:messageId},
        })
        res.status(200).json(message)
    }catch(error){
        res.status(400).json({error:error})
    }
}   