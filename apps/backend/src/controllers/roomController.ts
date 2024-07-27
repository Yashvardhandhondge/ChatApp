import { Request,Response } from "express";
import prisma from "../models/prismaClient";

export const createRoom = async (req:Request,res:Response) => {

    try{
        const {name,description,isPrivate,type,joinable}=req.body;;
        const room = await prisma.room.create({
            data:{
                name,
                description,
                private:isPrivate,
                type,
                joinable
            }
        });
        res.status(201).json(room);
    }catch(error){
        res.status(400).json({error:error});
    }
}

export const joinRoom = async (req:Request,res:Response) => {   
    try{
        const {roomId} = req.body
        const userId = req.userId;
        if(!userId){
            throw new Error("User not authenticated");
        }
        const roomUser = await prisma.roomUser.create({
            data:{
                roomId,
                userId
            }
        })
        res.status(200).json(roomUser)
    }catch(error){
        res.status(400).json({error:error})
    }
}
 
export const getRooms = async (req:Request,res:Response)=>{
    try{
        const rooms = await prisma.room.findMany();
        res.status(200).json(rooms)
    }catch(error){
        res.status(400).json({error:error})
    }
}