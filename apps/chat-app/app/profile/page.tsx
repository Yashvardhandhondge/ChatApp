
"use client"
import React, { useState, useEffect } from 'react';
import { ProfileFormProps, UserProfile } from '@/type';
import { updateUserProfile } from '@/services/api'; // Adjust if needed

const ProfileForm: React.FC<ProfileFormProps> = ({ initialProfile }) => {
  const [profile, setProfile] = useState<UserProfile | null>(initialProfile);

  useEffect(() => {
    setProfile(initialProfile);
  }, [initialProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile!,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (profile && profile.name && profile.email) {
        await updateUserProfile(profile.name, profile.email);
        // Handle success (e.g., show a success message or redirect)
      }
    } catch (err) {
      // Handle error (e.g., show an error message)
    }
  };

  if (!profile) return <p>No profile data available.</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={profile.name || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
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
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
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
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Save Changes
      </button>
    </form>
  );
};

export default ProfileForm;
