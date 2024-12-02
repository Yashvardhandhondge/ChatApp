"use server"
import jwt from "jsonwebtoken"


export const getDecode = async (token: string) => {
    return  jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET || "secret")
}