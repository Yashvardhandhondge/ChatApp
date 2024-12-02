"use client";
import React, { useState, useEffect } from 'react';
import { UserProfile } from '@/type';
import { getUserProfile } from '@/services/api'; 
import Layout from '@/components/Layout';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/Loading';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getUserProfile();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  const handleEditClick = () => {
    router.push('/Edit');
  };

  const handleHomeClick = () => {
    router.push('/rooms');
  }

  if (!profile) return <p><LoadingSpinner /></p>;

  return (
    <Layout>
      <div className="flex flex-col md:flex-row p-4"> 
        <div className="flex-shrink-0 md:w-1/4 flex justify-center items-center"> 
          <img 
            src={profile.avatarUrl} 
            alt="Avatar" 
            className="w-24 h-24 rounded-full shadow-md" 
          />
        </div>
        <div className="md:w-3/4 p-4 flex flex-col justify-start"> 
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <div className="mb-4">
            <strong>Name:</strong> {profile.name}
          </div>
          <div className="mb-4">
            <strong>Email:</strong> {profile.email}
          </div>
          <button
            onClick={handleEditClick}
            className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4 w-60 hover:bg-purple-800 transition-transform hover:scale-95"
          >
            Edit Profile
          </button>
          <button
            onClick={handleHomeClick}
            className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4 w-60 hover:bg-purple-800 transition-transform hover:scale-95"
          >
            Back to Home Page 
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
