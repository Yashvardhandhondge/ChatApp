
import React from 'react';
import { UserProfile } from '@/type';
import { useRouter } from 'next/navigation';
interface ProfileDropdownProps {
  profile: UserProfile;
  onClose: () => void;
  onEdit: () => void;
 
}


const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ profile, onClose, onEdit  }) => {
  const router = useRouter();
  const handleViewProfile = () => {
    router.push('/profile');
  };
  return (
    <div className="absolute right-0 mt-2 w-64 sm:w-72 lg:w-80 bg-gradient-to-br shadow-lg rounded-lg p-4 z-50">
      <button onClick={onClose} className="float-right text-red-400">
        ✕
      </button>
      <div className="flex items-center space-x-4 mb-4">
        <img src={profile.avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full" />
        <div className="flex-grow">
          <h2 className="text-lg font-semibold">{profile.name}</h2>
          <p className="text-sm text-gray-950">{profile.email}</p>
        </div>
      </div>
      <button
        onClick={handleViewProfile}
        className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-200"
      >
        View Profile
      </button>
      
      <button
        onClick={onEdit}
        className="w-full mt-4 bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-200"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileDropdown;
