

import axios from 'axios';

const API_URL = 'http://localhost:3001/api';


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
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


export const registerUser = (username: string, password: string) =>
  api.post('/auth/register', { username, password });

export const loginUser = (username: string, password: string) =>
  api.post('/auth/login', { username, password });

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


export const getUserProfile = () =>
  api.get('/users/profile');

export const updateUserProfile = (username: string, email: string) =>
  api.patch('/users/profile', { username, email });
