"use client";
import React, { useEffect, useRef, useState } from "react";
import { getMessages } from "@/services/api";
import { useWebSocket } from "@/services/websocket";

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
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();

    const ws = new WebSocket("https://chatapp-8ock.onrender.com");
    // const ws = new WebSocket("https://localhost:3001");
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "joinRoom", roomId }));
    };

    ws.onmessage = (event: MessageEvent) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
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
    <div className="flex-grow h-[500px]  overflow-y-auto bg-white bg-opacity-10 p-4 shadow-md">
      <ul className="space-y-4">
        {messages.map((message) => (
          <li key={message.id} className="flex items-start space-x-3">
          
            {message.user?.avatarUrl ? (
              <img
                src={message.user.avatarUrl}
                alt={message.user.name}
                className="w-10 h-10 rounded-full shadow-md"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                {message.user?.name[0]?.toUpperCase()}
              </div>
            )}

            <div className="flex flex-col">
              <div className="text-sm text-purple-300">{message.user?.name}</div>
              <div className="bg-white bg-opacity-20 text-white p-3 rounded-lg mt-1 shadow-md">
                {message.content}
              </div>
              <span className="text-xs text-gray-400">
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
