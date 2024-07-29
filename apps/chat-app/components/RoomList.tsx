"use client"
// components/RoomList.tsx

import React, { useEffect, useState } from 'react';
import { getRooms } from '@/services/api';
import { Room } from '@/type'; // Define types in types.ts

interface RoomListProps {
  onRoomSelect: (roomId: number) => void;
}

const RoomList: React.FC<RoomListProps> = ({ onRoomSelect }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const fetchedRooms = await getRooms();
        setRooms(fetchedRooms.data);
      } catch (err) {
        if ((err as any).response?.data) {
          setError((err as any).response.data.message);
        } else {
          setError('An unexpected error occurred.');
        }
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Chat Rooms</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <li
              key={room.id}
              onClick={() => onRoomSelect(room.id)}
              className="cursor-pointer p-2 hover:bg-gray-200 rounded"
            >
              {room.name}
            </li>
          ))
        ) : (
          <p>No rooms available.</p>
        )}
      </ul>
    </div>
  );
};

export default RoomList;
