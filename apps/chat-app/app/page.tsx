"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import { checkUserStatus } from '@/services/api'; 

const MyApp = () => {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const router = useRouter();

  
  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const { isRegistered } = await checkUserStatus();
        setIsRegistered(isRegistered);
      } catch (error) {
        console.error("Failed to check user status:", error);
      }
    };
    fetchUserStatus();
  }, []);

  const handleRegisterClick = () => {
    router.push('/register');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Y-Chat!</h1>
        <p className="text-lg text-gray-700 mb-6">
          {isRegistered === null
            ? 'Loading your status...'
            : 'Please choose an option to proceed:'
          }
        </p>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <p className="text-gray-600 mb-4">
            Whether you’re new to Y-Chat or returning, we’re excited to have you here. 
            Please select one of the options below to either register or log in.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleRegisterClick}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Register
            </button>
            <button
              onClick={handleLoginClick}
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-200"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyApp;
