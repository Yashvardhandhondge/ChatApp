
"use client";
import React, { useEffect, useState } from 'react';
import { useWebSocket } from '@/services/websocket';
import { getMessages } from '@/services/api'; // Importing the function to fetch messages

interface MessageListProps {
  roomId: number;
}

interface Message {
  id: number;
  content: string;
  userId: number;
  createdAt: string;
}

const MessageList: React.FC<MessageListProps> = ({ roomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { sendMessage } = useWebSocket(roomId);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getMessages(roomId);
        setMessages(fetchedMessages.data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();

    const ws = new WebSocket('ws://localhost:3001');
    
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'joinRoom', roomId }));
    };

    ws.onmessage = (event: MessageEvent) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return () => {
      ws.close();
    };
  }, [roomId]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 max-h-96 overflow-y-auto">
      <ul>
        {messages.map((message) => (
          <li key={message.id} className="border-b border-gray-200 py-2">
            <div className="font-semibold text-gray-700">
              {`User ${message.userId}`}
            </div>
            <p className="text-gray-900">{message.content}</p>
            <span className="text-sm text-gray-500">
              {new Date(message.createdAt).toLocaleTimeString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
