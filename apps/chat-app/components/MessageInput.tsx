
"use client"
import React, { useState } from 'react';
import { useWebSocket } from '@/services/websocket'; // Ensure this hook is set up correctly

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
      setMessage(''); // Clear the input field after sending
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-4">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;