"use client";
import React, { useState, useEffect } from 'react';
import { UserProfile } from '@/type';
import { getUserProfile, updateUserProfile } from '@/services/api';
import ProfileForm from '@/components/ProfileForm';
import LoadingSpinner from './Loading';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    id: 0,
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLogin: new Date(),
    status: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getUserProfile();
        setProfile(user);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (updatedProfile: Partial<UserProfile>) => {
    try {
      if (profile) {
        const updatedData = await updateUserProfile(profile.name || "", profile.email, profile.avatarUrl || "");
        setProfile(updatedData.data);
      }
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleCancel = () => {
    
  };

  if (loading) return <div className="flex justify-center"><LoadingSpinner /></div>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p>No profile data available.</p>;

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">User Profile</h1>
      <ProfileForm
        user={profile}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Profile;
