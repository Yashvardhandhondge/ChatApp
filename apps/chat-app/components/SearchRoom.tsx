"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRoomsByName } from '@/services/api'; // Ensure you have a service to fetch rooms by name
import { Room } from '@/type';

const SearchRooms: React.FC = () => {
  const [username, setUsername] = useState('');
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
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleRoomClick = (roomId: number) => {
    router.push(`/rooms/${roomId}`); // Navigate to the room page
  };

  return (
    <div className="search-rooms">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter room name"
        className="px-3 py-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleSearch}
        className="ml-2 p-2 bg-blue-500 text-white rounded-md"
      >
        Search
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {rooms.map((room) => (
          <li
            key={room.id}
            className="border-b border-gray-200 py-2 cursor-pointer"
            onClick={() => handleRoomClick(room.id)}
          >
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchRooms;
