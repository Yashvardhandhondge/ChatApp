
export interface UserProfile {
  id: number;
  email: string;
  password: string;
  name?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
  status: string;
}


  export interface Message {
    id: number;
    content: string;
    createdAt: string;
    userId: number;
    roomId: number;
    editedAt?: string;
    isRead: boolean;
    readBy: number[];
  }
  
  
  export interface Notification {
    id: number;
    type: string;
    message: string;
    userId: number;
    read: boolean;
    createdAt: string;
  }
  
 
  export interface Reaction {
    id: number;
    type: string;
    userId: number;
    messageId: number;
    createdAt: string;
  }
  
  export interface Room {
    id: number;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    private: boolean;
    type?: string;
    joinable: boolean;
  }
  
  
  export interface ProfileUpdate {
    name?: string;
    email?: string;
    avatarUrl?: string;
  }
  
 
  export interface ApiError {
    message: string;
  }
 


  
  export interface ProfileFormProps {
    initialProfile: UserProfile | null;
  }
  // types.ts

export interface Message {
    id: number;
    content: string;
    createdAt: string;
    userId: number;
    roomId: number;
    user?: UserProfile; // Optional, if you include user info with messages
  }
  
  export interface UserProfile {
    id: number;
    email: string;
    name?: string;
    avatarUrl?: string;
  }
  
  export interface MessageListProps {
    messages: Message[];
  }
  
  