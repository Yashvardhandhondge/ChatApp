
import 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}
export interface UserProfile {
  id: number;
  email: string;
  password: string;
  name: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
  status: string;
}

