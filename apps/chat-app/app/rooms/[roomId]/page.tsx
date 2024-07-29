
"use client"
import React, { useEffect, useState } from 'react';
import {  useRouter } from 'next/navigation'; 
import { NextRouter } from 'next/router';
import Layout from '../../../components/Layout';
import MessageList from '../../../components/MessageList';
import MessageInput from '../../../components/MessageInput';
import { getMessagesByRoom } from '../../../services/message'; 
import { Message } from '@/type'; 

const RoomPage: React.FC = () => {
  const router: NextRouter = useRouter(); 
  const { roomId } = router.query;

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getMessagesByRoom(Number(roomId));
        setMessages(fetchedMessages);
        setLoading(false);
      } catch (err) {
        if ((err as any).response?.data) {
          setError((err as any).response.data.message);
        } else {
          setError('An unexpected error occurred.');
        }
        setLoading(false);
      }
    };

    fetchMessages();
  }, [roomId]);

  const handleSendMessage = async (content: string) => {
    try {
    //   Ideally, you would handle message sending through WebSocket directly
    //   If using API, ensure it matches your setup
    //   const newMessage = await sendMessage({
    //     content,
    //     roomId: Number(roomId),
    //   });
    //   setMessages([...messages, newMessage]);
      
    //   For WebSocket-based sending
    //   sendMessage({
    //     content,
    //     roomId: Number(roomId),
    //   });
    } catch (err) {
      if ((err as any).response?.data) {
        setError((err as any).response.data.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="flex flex-col h-screen">
        <div className="flex-grow overflow-y-auto p-4">
          {error && <p className="text-red-500">{error}</p>}
          <MessageList roomId={Number(roomId)} />
        </div>
        <div className="p-4 border-t">
          <MessageInput roomId={Number(roomId)} />
        </div>
      </div>
    </Layout>
  );
};

export default RoomPage;
