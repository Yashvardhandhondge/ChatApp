import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import prisma from './models/prismaClient';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import roomRoutes from './routes/roomRoutes';
import messageRoutes from './routes/messageRoutes';
import reactionRoutes from './routes/reactionRoutes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reactions', reactionRoutes);

let userId = 0
export const setUserId = (id:number)=> userId = id

interface ExtendedWebSocket extends WebSocket {
  userId?: number;
}

const wss = new WebSocketServer({ server });

wss.on('connection', (ws: ExtendedWebSocket) => {
  console.log('A user connected');

 
  ws.userId = 1; 

  ws.on('message', async (data: string) => {
    try {
      const message = JSON.parse(data);

      switch (message.type) {
        case 'joinRoom':
          joinRoom(ws, message.roomId);
          break;
        case 'sendMessage':
          await sendMessage(ws, message);
          break;
        default:
          console.log('Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('Error handling message:', error);
      ws.send(JSON.stringify({ error: 'Invalid message format' }));
    }
  });

  ws.on('close', () => {
    console.log('A user disconnected');
  });
});

function joinRoom(ws: ExtendedWebSocket, roomId: number) {
  console.log(`User joined room ${roomId}`);
  ws.send(JSON.stringify({ message: `Joined room ${roomId}` }));
}

async function sendMessage(ws: ExtendedWebSocket, message: any) {
  try {
    if (!ws.userId) {
      throw new Error('User not authenticated');
    }

    const { content, roomId } = message;

    const newMessage = await prisma.message.create({
      data: {
        content,
        userId: userId,
        roomId,
      },
    });

   
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newMessage));
      }
    });
  } catch (error) {
    console.error('Error sending message:', error);
    ws.send(JSON.stringify({ error: error }));
  }
}
