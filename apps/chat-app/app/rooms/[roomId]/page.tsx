"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../../components/Layout';
import MessageList from '../../../components/MessageList';
import MessageInput from '../../../components/MessageInput';
import { getMessagesByRoom } from '../../../services/message'; 
import { Message } from '@/type';
import LoadingSpinner from '@/components/Loading';
import { useWebSocket } from '@/services/websocket';


const RoomPage = ({ params }: { params: any }) => {
  const router = useRouter(); 
  const roomId = params.roomId;
  console.log(roomId);
  const { sendMessage } = useWebSocket(Number(roomId));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getMessagesByRoom(Number(roomId));

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

  if (roomId === "base") {
    return <div>Open a chat</div>;
  }

  // if (loading) return <p><LoadingSpinner/></p>;

  return (
    <Layout>
      <div className="flex flex-col  text-black ">
        <div className="flex-grow overflow-y-auto p-2 mx-auto max-w-4xl w-full"> 
          {error && <p className="text-red-500">{error}</p>}
          <MessageList roomId={Number(roomId)} />
        </div>
        <div className="p-4 border-t flex ml-52  ">
          <MessageInput sendMessage={sendMessage} roomId={Number(roomId)} />
        </div>
      </div>
    </Layout>
  );
}

export default RoomPage;
