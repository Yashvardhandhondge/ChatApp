"use client";
import React, { useState } from 'react';
import { UserProfile } from '@/type';
import imageCompression from 'browser-image-compression';

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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();
        reader.onloadend = () => {
          setFormValues((prev) => ({ ...prev, avatarUrl: reader.result as string }));
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  };

  const handleSubmit = () => {
    onSave(formValues);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto"> {/* Set a max width for larger screens */}
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="name"
          value={formValues.name || ''}
          onChange={handleInputChange}
          className="block w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </label>
      <label className="block mb-2">
        Email:
        <input
          type="email"
          name="email"
          value={formValues.email || ''}
          onChange={handleInputChange}
          className="block w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </label>
      <label className="block mb-4">
        Avatar:
        {formValues.avatarUrl && (
          <img
            src={formValues.avatarUrl}
            alt="Avatar"
            className="w-20 h-20 rounded-full border border-gray-300 mb-2 object-cover mx-auto" // Center the avatar
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </label>
      <div className="flex flex-col sm:flex-row justify-between">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 mb-2 sm:mb-0 w-full sm:w-auto"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
