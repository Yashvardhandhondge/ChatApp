import { UserProfile } from '@/type';
import axios from 'axios';

const API_URL = 'https://chatapp-8ock.onrender.com/api';
// const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);



export const registerUser = (email: string, password: string, name: string, avatarUrl: string) =>
  api.post('/auth/register', { email, password, name, avatarUrl });

export const loginUser = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const sendMessage = (content: string, roomId: number) =>
  api.post('/messages/send', { content, roomId });

export const editMessage = (messageId: number, content: string) =>
  api.patch('/messages/edit', { messageId, content });

export const getMessages = (roomId: number) =>
  api.get(`/messages/${roomId}`);

export const deleteMessage = (messageId: number) =>
  api.delete('/messages/delete', { data: { messageId } });

export const addReaction = (type: string, messageId: number) =>
  api.post('/reactions', { type, messageId });

export const getReactions = (messageId: number) =>
  api.get(`/reactions/${messageId}`);

export const deleteReaction = (reactionId: number) =>
  api.delete('/reactions', { data: { reactionId } });

export const createRoom = (name: string, description: string, isPrivate: boolean, type: string, joinable: boolean) =>
  api.post('/rooms', { name, description, isPrivate, type, joinable });

export const joinRoom = (roomId: number) =>
  api.post('/rooms/join', { roomId });

export const getRooms = () =>
  api.get('/rooms');

export const getRoom = (roomId: number) =>
  api.get(`/rooms/${roomId}`);

export const getUsersInRoom = (roomId: number) =>
  api.get(`/rooms/${roomId}/users`);

export const allowUserToJoinRoom = (roomId: number, userId: number) =>
  api.post('/rooms/allowJoin', { roomId, userId });

export const getRoomsByUser = (userId: number) =>
  api.get(`/rooms/user/${userId}`);

export const getRoomsByName = (name: string) =>
  api.get(`/rooms/room/${name}`);

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await api.get('/users/profile'); 
  return response.data
};

export const updateUserProfile = (name: string, email: string, avatarUrl: string) =>
  api.patch('/users/profile', { name, email, avatarUrl });

export const checkUserStatus = async (): Promise<{ isRegistered: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); 
  return { isRegistered: false }; 
};

export const deleteUserProfile = async () : Promise<void> => {
  const response = await api.delete(`/users/profile`);
  return response.data;
}

export const DeleteRoom = async (roomId : number)  => {
 await  api.get(`/rooms/delete/${roomId}`);
}