"use client";
import { useEffect, useState, useRef } from 'react';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import { checkUserStatus } from '@/services/api';

const MyApp = () => {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, []);

  const handleRegisterClick = () => {
    router.push('/register');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start min-h-screen p-4 bg-white">
        
        
        <div className="hidden md:block md:ml-24">
          <video ref={videoRef} src="https://cdn-icons-mp4.flaticon.com/512/15374/15374789.mp4" autoPlay loop className="max-w-md rounded-lg" />
        </div>


        <div className="flex flex-col items-center justify-center text-center p-8 md:p-24 md:ml-8 w-full md:w-auto ml-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Founders_Grotesk_X-Condensed'] text-purple-600 ">Welcome to Y-Chat!</h1>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <p className="text-gray-600 mb-4">
              Whether you’re new to Y-Chat or returning, we’re excited to have you here.
              Please select one of the options below to either register or log in.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRegisterClick}
                className="bg-white border border-purple-400 text-purple-500 px-6 py-3 rounded-md hover:bg-purple-500 hover:text-white transition duration-200 flex items-center gap-2"
              >
                <FaUserPlus size={20} />
                Register Now
              </button>
              <button
                onClick={handleLoginClick}
                className="bg-purple-500 text-white px-14 py-3 rounded-md hover:text-purple-500 border hover:bg-white hover:border-purple-400 transition duration-200 flex items-center gap-2"
              >
                <FaSignInAlt size={20} />
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyApp;
