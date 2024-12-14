

import axios from 'axios';
import { Message } from '@/type'; 

const API_URL = 'http://localhost:3001/api/messages';

export const getMessagesByRoom = async (roomId: number): Promise<Message[]> => {
  try {
    const response = await axios.get(`${API_URL}/${roomId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (messageData: { content: string; roomId: number }): Promise<Message> => {
  try {
    const response = await axios.post(`${API_URL}/send`, messageData);
    return response.data;
  } catch (error) {
    throw error;
  }
};