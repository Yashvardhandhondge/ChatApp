"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { checkUserStatus } from '@/services/api';
import Button from '@/components/ui/Button';
import { MessageCircle, Users, Lock, BarChart2 } from 'lucide-react';

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

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    { icon: <MessageCircle className="w-6 h-6" />, title: "Live Chatting", description: "Real-time messaging for instant communication" },
    { icon: <Users className="w-6 h-6" />, title: "Public Rooms", description: "Join open discussions on various topics" },
    { icon: <Lock className="w-6 h-6" />, title: "Private Rooms", description: "Create secure spaces for confidential chats" },
    { icon: <BarChart2 className="w-6 h-6" />, title: "User Dashboard", description: "Track your activity and manage preferences" }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white">
        <header className="container mx-auto px-4 py-8">
          <nav className="flex justify-between items-center">
           
         
          </nav>
        </header>

        <main className="container mx-auto px-4 py-16">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-extrabold mb-6"
              variants={fadeIn}
            >
              Welcome to Y-Chat!
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8"
              variants={fadeIn}
            >
              Experience seamless communication with our interactive platform.
            </motion.p>
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
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            animate="animate"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 text-center"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-4xl mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm opacity-80">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </main>

       
      </div>
    </Layout>
  );
};

export default MyApp;
