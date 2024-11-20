"use client";
import Layout from "@/components/Layout";
import RoomList from "@/components/RoomList";
import SearchRooms from "@/components/SearchRoom";
import { createRoom } from "@/services/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa"; 


const Page = () => {
  const [formdata, setFormdata] = useState({
    name: "Default room",
    description: "A room",
    isPrivate: false,
    type: "dunno",
    joinable: true,
  });
  const [showForm, setShowForm] = useState(false); 
  const router = useRouter();

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : false;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    router.push('/rooms');
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await createRoom(
        formdata.name,
        formdata.description,
        formdata.isPrivate,
        formdata.type,
        formdata.joinable
      );
      console.log("Room created");

      setShowForm(false); 
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  return (
    <Layout>
      <div className="text-black">
       
    

        {!showForm ? (
          <div className="flex flex-col items-center mt-6">
            <h3 className="text-2xl font-semibold text-gray-950 mb-3">
              Want a new room for your own?
            </h3>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 p-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-300"
            >
              <FaPlus />
              Create a Room
            </button>
          </div>
        ) : (
          <form
            className="flex flex-col gap-5 border border-gray-400 p-6 rounded-lg bg-purple-100 mt-6 max-w-md mx-auto shadow-lg"
            onSubmit={handleSubmit}
          >
            <h3 className="text-2xl font-semibold text-purple-600 mb-4">Create Your Room</h3>
            
            
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="self-end text-purple-600 hover:text-purple-800"
            >
              <FaTimes className="h-6 w-6" />
            </button>

            <input
              name="name"
              className="px-4 py-2 rounded-md border border-gray-400 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              placeholder="Room Name"
              value={formdata.name}
              onChange={handleChange}
            />
            <input
              name="description"
              className="px-4 py-2 rounded-md border border-gray-400 hover:border hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              placeholder="Room Description"
              value={formdata.description}
              onChange={handleChange}
            />
            <div className="flex items-center">
              <input
                name="isPrivate"
                type="checkbox"
                checked={formdata.isPrivate}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-gray-700">Private Room</label>
            </div>
            <select
  name="type"
  value={formdata.type}
  onChange={handleChange}

  className="px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-0 focus:border-purple-500 bg-transparent"
>
  <option value="dunno">Unknown</option>
  <option value="public">Public</option>
  <option value="private">Private</option>
</select>

            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-300 hover:text-black transition duration-300"
            >
              Submit
            </button>
          </form>
        )}
         <div className="p-7">
          <SearchRooms />
        </div>
           <div className="text-black ml-6">
          <RoomList
            currentUserId={70}
            onRoomSelect={async (roomId) => {
              router.push(`/rooms/${roomId}`);
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Page;
