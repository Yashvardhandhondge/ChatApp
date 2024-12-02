"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getRoomsByName } from "@/services/api"; 
import { Room } from "@/type";
import Button from "./ui/Button";

const SearchRooms: React.FC = () => {
  const [username, setUsername] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = async () => {
    try {
      const fetchedRooms = await getRoomsByName(username);
      setRooms(fetchedRooms.data);
    } catch (err) {
      if ((err as any).response?.data) {
        setError((err as any).response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleRoomClick = (roomId: number) => {
    router.push(`/rooms/${roomId}`); 
  };

  return (
    <div className="search-rooms flex ">
      
      <button
        onClick={handleSearch}
        className="relative h-14 inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
      >
        <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-purple-500 group-hover:h-full"></span>
        <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
          <svg
            className="w-5 h-5 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </span>
        <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
          <svg
            className="w-5 h-5 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </span>
        <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
          Search
        </span>
      </button>
      <br />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter room name"
        className="px-3 py-2 h-14 border-gray-700 ml-8 border hover:border-purple-500  rounded-md"
      />
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {rooms.map((room) => (
          <Button
            key={room.id}
            className="border  ml-4 p-2 mb-4 h-14 border-gray-500 hover:border-purple-500 rounded border-solid py-2 cursor-pointer"
            onClick={() => handleRoomClick(room.id)}
          >
            {room.name}
          </Button>
        ))}
      </ul>
    </div>
  );
};

export default SearchRooms;
