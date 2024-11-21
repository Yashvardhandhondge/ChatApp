"use client";
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa"; // Icon for the send button
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { useWebSocket } from "@/services/websocket";
import { useRouter } from "next/navigation";
interface MessageInputProps {
  roomId: number;
}

const MessageInput: React.FC<MessageInputProps> = ({ roomId }) => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useWebSocket(roomId);
  const router = useRouter();
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      sendMessage(
        JSON.stringify({
          type: "sendMessage",
          content: message,
          roomId,
        })
      );
      setMessage(""); 
      push();
      router.refresh();
    }
  };
const push = () => {
  router.push(`/rooms/${roomId}`);
}
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-4  fixed bottom-9 left-1 sm:w-[370px] md:right-0 md:w-[760px] md:bottom-14  lg:bottom-14 lg:left-80 lg:right-0 lg:w-[900px] bg-white bg-opacity-10 backdrop-blur-lg shadow-md rounded-lg">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow bg-purple-50 text-purple-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none rounded-md px-4 py-2"
        />
        <button
          onClick={handleSendMessage}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md flex items-center"
        >
          <FaPaperPlane className="mr-2" />
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
