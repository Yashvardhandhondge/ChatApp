"use client";
import Layout from '@/components/Layout';
import RoomList from '@/components/RoomList';
import SearchRooms from '@/components/SearchRoom'; 
import { createRoom } from '@/services/api';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Page = () => {
    const [formdata, setFormdata] = useState({
        name: "Default room",
        description: "A room",
        isPrivate: false,
        type: "dunno",
        joinable: true,
    });

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
        const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
        
        setFormdata(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
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
            // Optionally redirect or show a success message
        } catch (error) {
            console.error("Failed to create room:", error);
        }
    };

    const router = useRouter();

    return (
        <Layout>
            <div className='text-black'>
                <form className='flex flex-col gap-5 border border-gray-700 p-5 rounded-md' onSubmit={handleSubmit}>
                    <h3 className='text-white'>Create Room</h3>
                    <input
                        name='name'
                        className='px-3 py-2 rounded-md'
                        type="text"
                        placeholder='Name of Room'
                        value={formdata.name}
                        onChange={handleChange}
                    />
                    <input
                        name='description'
                        className='px-3 py-2 rounded-md'
                        type="text"
                        placeholder='Description'
                        value={formdata.description}
                        onChange={handleChange}
                    />
                    <div className='flex items-center'>
                        <input
                            name='isPrivate'
                            type='checkbox'
                            checked={formdata.isPrivate}
                            onChange={handleChange}
                            className='mr-2'
                        />
                        <label>Private Room</label>
                    </div>
                    <select
                        name='type'
                        value={formdata.type}
                        onChange={handleChange}
                        className='px-3 py-2 rounded-md'
                    >
                        <option value="dunno">Unknown</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                    <button type='submit' className='p-3 bg-white rounded-md'>Submit</button>
                </form>
            </div>
            <div className='text-black mt-5'>
                <SearchRooms />
            </div>
            <div className='text-black mt-5'>
                <RoomList onRoomSelect={async (roomId) => {
                    router.push(`/rooms/${roomId}`);
                }} />
            </div>
        </Layout>
    );
};

export default Page;
