"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useWebSocket } from '@/services/websocket';
import { getMessages } from '@/services/api'; 

interface MessageListProps {
  roomId: number;
}

interface Message {
  id: number;
  content: string;
  userId: number;
  createdAt: string;
  user: {
    name: string;
    avatarUrl?: string; 
  };
}

const MessageList: React.FC<MessageListProps> = ({ roomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null); 
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

    const ws = new WebSocket('https://chatapp-8ock.onrender.com');
    // const ws = new WebSocket('http://localhost:3000.com');

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'joinRoom', roomId }));
    };

    ws.onmessage = (event: MessageEvent) => {
      const newMessage = JSON.parse(event.data);
      console.log(newMessage);
      
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Append new message at the bottom
    };

    return () => {
      ws.close();
    };
  }, [roomId]);

  useEffect(() => {
    
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="bg-purple-50 p-4 rounded-lg shadow-md mb-4 max-h-96 overflow-y-auto w-1/2"> {/* Set widths for different screen sizes */}
      <ul className="space-y-4"> 
        {messages.map((message) => (
          <li key={message.id} className="border-b border-gray-200 py-2 flex items-start">
            {message.user?.avatarUrl && (
              <img 
                src={message.user.avatarUrl}
                alt={message.user.name}
                className="w-10 h-10 rounded-full mr-3 shadow-sm" 
              />
            )}
            <div className="flex flex-col">
              <div className="font-semibold text-purple-800">
                {message.user?.name}
              </div>
              <p className="text-purple-900">{message.content}</p>
              <span className="text-sm text-purple-600">
                {new Date(message.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div ref={messagesEndRef} /> 
    </div>
  );
};

export default MessageList;
