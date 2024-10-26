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

  if (!profile) return <p><LoadingSpinner /></p>;

  return (
    <Layout>
      <div className="flex flex-col md:flex-row p-4"> {/* Added padding */}
        <div className="flex-shrink-0 md:w-1/4 flex justify-center items-center"> {/* Avatar Section */}
          <img 
            src={profile.avatarUrl} 
            alt="Avatar" 
            className="w-24 h-24 rounded-full shadow-md" // Increased size for better visibility
          />
        </div>
        <div className="md:w-3/4 p-4 flex flex-col justify-start"> {/* Profile Info Section */}
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <div className="mb-4">
            <strong>Name:</strong> {profile.name}
          </div>
          <div className="mb-4">
            <strong>Email:</strong> {profile.email}
          </div>
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
