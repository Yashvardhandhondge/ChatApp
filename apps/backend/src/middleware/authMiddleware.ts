
import { log } from 'console';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET||"", (err: any, user: any) => {

    if (err){
        res.sendStatus(403);
        console.log(err);
        
        return res.send(err);
    }
    req.userId = user.userId;
    next();
  });
};
