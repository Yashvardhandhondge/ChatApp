import { Socket } from "socket.io";

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET|| "secret";

export const socketAuthMiddleware =(socket:Socket,next:Function)=>{
    const token = socket.handshake.headers['authorization']?.split("")[1];

    if(!token){
        console.log("No token provided");
        return next(new Error("No token provided"));
    }
    jwt.verify(token,JWT_SECRET,(err:any,user:any)=>{
        if(err){
            console.log("JWT verification error:",err);
            return next(new Error("Invalid token"));
        }
        (socket as any).userId = user.userId;
        next();
    })
}