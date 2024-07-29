// types.ts

// User Profile type
export interface UserProfile {
    id: number;
    email: string;
    name?: string;
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // Message type
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
  
  // Notification type
  export interface Notification {
    id: number;
    type: string;
    message: string;
    userId: number;
    read: boolean;
    createdAt: string;
  }
  
  // Reaction type
  export interface Reaction {
    id: number;
    type: string;
    userId: number;
    messageId: number;
    createdAt: string;
  }
  
  // Room type
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
  
  // Profile Update type
  export interface ProfileUpdate {
    name?: string;
    email?: string;
    avatarUrl?: string;
  }
  
  // Error type for API responses
  export interface ApiError {
    message: string;
  }
  // types.ts

export interface UserProfile {
    id: number;
    email: string;
    name?: string;
    avatarUrl?: string;
    // Include other profile fields as necessary
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
  
  