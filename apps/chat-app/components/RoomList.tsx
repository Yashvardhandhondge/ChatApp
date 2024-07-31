"use client"


import React, { useEffect, useState } from 'react';
import { getRooms, joinRoom } from '@/services/api';
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
              className="cursor-pointer  hover:bg-gray-200 rounded"
            ><button className='bg-green-500 w-full p-2' onClick={async ()=>{
              const user = await joinRoom(Number(room.id));
              console.log(user);
              
             }}>

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