"use client";
import React, { useState } from 'react';
import { useWebSocket } from '@/services/websocket'; 
import { FaPaperPlane } from 'react-icons/fa'; 

interface MessageInputProps {
  roomId: number;
}

const MessageInput: React.FC<MessageInputProps> = ({ roomId }) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useWebSocket(roomId);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() !== '') {
      sendMessage(JSON.stringify({
        type: 'sendMessage',
        content: message,
        roomId,
      }));
      setMessage(''); 
    }
  };

  return (
    <div className="bg-purple-50 p-4 shadow-md rounded-lg mb-4">
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow px-3 py-2 mb-2 lg:mb-0 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md flex items-center lg:ml-2"
        >
          <FaPaperPlane className="mr-2" /> 
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
