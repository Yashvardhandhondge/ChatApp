"use client";

import React, { useState, useEffect } from 'react';
import { UserProfile } from '@/type';
import { getUserProfile, updateUserProfile } from '@/services/api'; 
import Layout from '@/components/Layout';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/Loading';

const EditProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getUserProfile();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSuccess(null);
    setProfile({
      ...profile!,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (profile && profile.name && profile.email) {
        await updateUserProfile(profile.name, profile.email, profile.avatarUrl || '');
        setSuccess("Successfully updated your profile!!");
        
        router.push('/profile');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile) return <p><LoadingSpinner/></p>;

  return (
    <Layout>
      <div className="flex flex-col p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='text-green-500 italic text-center'>{success}</div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={profile.name || ''}
              placeholder='Enter name'
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              placeholder='Enter email'
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700">
              Avatar URL
            </label>
            <input
              id="avatarUrl"
              name="avatarUrl"
              type="text"
              value={profile.avatarUrl || ''}
              placeholder='Enter avatar URL'
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditProfilePage;
