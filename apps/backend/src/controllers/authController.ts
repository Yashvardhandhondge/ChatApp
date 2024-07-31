//Test Comment
import { Request,Response } from "express";
import {signUp,signIn} from "../services/authService";

export const register = async (req:Request,res:Response) => {

    try{
        const user = await signUp(req.body);
        res.status(201).json(user);
    }catch(error: any){
        res.status(400).json({error:error.message});
    }
}

export const login = async (req:Request,res:Response) => {
    try{
        const token = await signIn(req.body);
        res.status(200).json({token});
    }catch(error:any){
        res.status(400).json({error:error.message});
    }
}
