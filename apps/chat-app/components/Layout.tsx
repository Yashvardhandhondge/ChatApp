"use client"

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation'; 

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { push } = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    push('/login'); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Chat App</title>
        <meta name="description" content="A real-time chat application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-gray-800 text-white py-4">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-blue-400">Y-Chat</h1>
            <ul className="flex space-x-4 ml-6">
              <li>
                <a href="/" className="hover:text-gray-400">Home</a>
              </li>
              <li>
                <a href="/profile" className="hover:text-gray-400">Profile</a>
              </li>
              <li>
                <a href="/rooms" className="hover:text-gray-400">Rooms</a>
              </li>
            </ul>
          </div>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </nav>
      </header>
      <main className="flex-grow container mx-auto py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Chat App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
