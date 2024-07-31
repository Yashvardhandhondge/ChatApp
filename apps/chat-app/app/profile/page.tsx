"use client"
import React, { useState, useEffect } from 'react';
import { UserProfile } from '@/type';
import { getUserProfile } from '@/services/api'; // Adjust if needed
import Layout from '@/components/Layout';
import Profile from '@/components/profile';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
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

  if (!profile) return <p>Loading profile...</p>;

  return (
    <Layout>
      <div className="flex h-screen flex-col md:flex-row">
        <div >
          
        </div>
        <div className="md:w-3/4 p-4 flex flex-col justify-start">
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <div>
              <div className="mb-4">
                <strong>Name:</strong> {profile.name}
              </div>
              <div className="mb-4">
                <strong>Email:</strong> {profile.email}
              </div>
              <div className="mb-4">
                <strong>Avatar:</strong> <img src={profile.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full" />
              </div>
            </div>
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
