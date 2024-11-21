import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getRooms, joinRoom, DeleteRoom } from "@/services/api";
import { Room } from "@/type";
import { useRouter } from "next/navigation";

interface RoomCardProps {
  onRoomSelect: (roomId: number) => void;
  currentUserId: number;
}

const RoomCard: React.FC<RoomCardProps> = ({ onRoomSelect, currentUserId }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const fetchedRooms = await getRooms();
        setRooms(fetchedRooms.data);
      } catch (err) {
        setError((err as any).response?.data?.message || "An unexpected error occurred.");
      }
    };
    console.log("CurrUser"+currentUserId);
    
    
    fetchRooms();
  }, [currentUserId]);

  const router = useRouter();

  const handleDelete = async (roomId: number) => {
    try {
      // Call the API to delete the room
      await DeleteRoom(roomId);

      // Remove the deleted room from the state
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));

      // Optionally, you can navigate the user back to the rooms page after deletion
      router.push('/rooms');
    } catch (err) {
      setError((err as any).response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md p-4 rounded-lg shadow-md bg-purple-100 border-2 border-transparent hover:shadow-red-900 hover:ring-4"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
              <img
                src="https://pbs.twimg.com/media/Gcz8SWubcAE3twO?format=jpg&name=small"
                alt={`Room ${room.name}`}
                className="rounded-t-lg w-full h-full object-cover object-center"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="text-xl font-bold text-white">{room.name}</h2>
              </div>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="font-bold text-slate-900">
                {room.users.length} {room.users.length === 1 ? "user" : "users"}
              </span>

              {room.creatorId === currentUserId && (
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                  onClick={() => handleDelete(room.id)}
                >
                  Delete Room
                </button>
              )}

              <button
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                onClick={async () => {
                  await joinRoom(room.id);
                  onRoomSelect(room.id);
                }}
              >
                Join Room
              </button>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="text-white">No rooms available.</p>
      )}
    </div>
  );
};

export default RoomCard;
