
"use client"
import React, { useState } from 'react';
import { UserProfile } from '@/type'; // Define types in types.ts

interface ProfileFormProps {
  user: UserProfile;
  onSave: (profileData: Partial<UserProfile>) => void;
  onCancel: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user, onSave, onCancel }) => {
  const [formValues, setFormValues] = useState<Partial<UserProfile>>({
    name: user.name || '',
    email: user.email || '',
    avatarUrl: user.avatarUrl || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formValues);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4"> Profile</h2>
      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="name"
          value={formValues.name || ''}
          onChange={handleInputChange}
          className="block w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2">
        Email:
        <input
          type="email"
          name="email"
          value={formValues.email || ''}
          onChange={handleInputChange}
          className="block w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-4">
        Avatar URL:
        <img src={formValues.avatarUrl} alt="" />
      </label>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Save
      </button>
      <button
        onClick={onCancel}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
    </div>
  );
};

export default ProfileForm;