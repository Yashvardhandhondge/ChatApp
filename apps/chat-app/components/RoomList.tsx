"use client"

import React, { useEffect, useState } from 'react';
import { getRooms, joinRoom } from '@/services/api';
import { Room } from '@/type'; 

interface RoomListProps {
  onRoomSelect: (roomId: number) => void;
  load: boolean;
}

const RoomList: React.FC<RoomListProps> = ({ onRoomSelect, load }) => {
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
  }, [load]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 font-serif">Available Rooms</h2>
      {error && <p className="text-red-500 mb-4 font-semibold">{error}</p>}
      <ul>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <li key={room.id} className="mt-2">
              <button 
                className='bg-purple-500 text-white hover:text-purple-500 hover:bg-white rounded w-92 p-2 transition duration-300'
                onClick={async () => {
                  const user = await joinRoom(Number(room.id));
                  console.log(user);
                  onRoomSelect(room.id); // 
                }}
              >
                {room.name}
              </button>
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
