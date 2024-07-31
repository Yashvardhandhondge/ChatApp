
"use client"
import React, { useEffect, useState } from 'react';
import {  useRouter } from 'next/navigation'; 
import { NextRouter } from 'next/router';
import Layout from '../../../components/Layout';
import MessageList from '../../../components/MessageList';
import MessageInput from '../../../components/MessageInput';
import { getMessagesByRoom } from '../../../services/message'; 
import { Message } from '@/type'; 
import { joinRoom } from '@/services/api';

const RoomPage = ({params}:{params:any}) => {
  const router = useRouter(); 
  const roomId  = params.roomId;
  console.log(roomId);
  

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

  if(roomId == "base"){
    return(
      <div>
        Open a chat
      </div>
    )
  }

  if (loading) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="flex flex-col  text-black">
      
        <div className="flex-grow overflow-y-auto p-4">
          {error && <p className="text-red-500">{error}</p>}
          <MessageList roomId={Number(roomId)} />
        </div>
  

        <div className="p-4 border-t flex items-center">
          <MessageInput roomId={Number(roomId)} />
          <button 
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => { /* Implement join room functionality */ }}
          >
            Join
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default RoomPage;