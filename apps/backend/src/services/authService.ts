import bcrypt from 'bcryptjs';
import  jwt  from 'jsonwebtoken';
import prisma from '../models/prismaClient';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const signUp = async (data:{email:string;password:string;name?:string})=>{
    const hashedPassword = await bcrypt.hash(data.password,SALT_ROUNDS);
    const user = await prisma.user.create({
        data:{
            email:data.email,
            password:hashedPassword,
            name:data.name
        }
    });
    return user;
}

export const signIn = async (data:{email:string;password:string})=>{    
    const user = await prisma.user.findUnique({
        where:{
            email:data.email
        }
    });
    if(!user){
        throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(data.password,user.password);
    if(!isPasswordValid){
        throw new Error("Invalid password");
    }
    const token = jwt.sign({userId:user.id},JWT_SECRET);
    return token;
}       