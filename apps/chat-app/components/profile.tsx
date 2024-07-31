
"use client";
import React, { useState, useEffect } from 'react';
import { UserProfile } from '@/type';
import { getUserProfile, updateUserProfile } from '@/services/api';
import ProfileForm from '@/components/ProfileForm';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    id: 0,
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
    createdAt: new Date,
    updatedAt: new Date,
    lastLogin: new Date,
    status: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getUserProfile();
        
        console.log(user);
        
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
        const updatedData = await updateUserProfile(profile.name||"", profile.email,profile.avatarUrl||"");
        setProfile(updatedData.data);
      }
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleCancel = () => {
   
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!profile) return <p>No profile data available.</p>;

  return (
    <div className="profile-container">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <ProfileForm
        user={profile}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Profile;
