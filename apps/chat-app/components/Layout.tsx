"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { TiMessages } from "react-icons/ti";
import { getUserProfile } from '@/services/api'; 
import ProfileDropdown from "@/components/ProfileDropdown";
import { UserProfile } from '@/type';
import LoadingSpinner from "./Loading";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if(token){
      const data = await getUserProfile();
      setProfile(data);}
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    push("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCloseDropdown = () => {
    setDropdownOpen(false);
  };

  const handleEditProfile = () => {
    push('/Edit');
    handleCloseDropdown();
  };

  const isAuthPage = pathname === "/" || pathname === "/register" || pathname === "/login";

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="navbar bg-base-100 flex justify-between items-center px-4 relative p-4">
        <div className="flex items-center">
          <TiMessages className="text-3xl mr-2 text-purple-500" />
          <span className="text-3xl font-['Founders_Grotesk_X-Condensed']" style={{ fontFamily: "Poppins, sans-serif" }}>
            <Link href="/">Y-Chat</Link>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 text-xl hover:text-purple-500 transition-transform">
            Home
          </Link>
          <Link href="/rooms" className="text-gray-700 text-xl hover:text-purple-500 transition-transform">
            Rooms
          </Link>
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden relative">
          <button onClick={toggleDropdown} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          {dropdownOpen && (
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link href="/" onClick={handleCloseDropdown}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/rooms" onClick={handleCloseDropdown}>
                  Rooms
                </Link>
              </li>
            </ul>
          )}
        </div>

        <div className="navbar-end flex items-center space-x-4">
          {!isAuthPage && profile && (
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center space-x-2">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">N/A</span>
                  </div>
                )}
                <span className="hidden md:block">{profile.name}</span>
              </button>
              {dropdownOpen && (
                <ProfileDropdown
                  profile={profile}
                  onClose={handleCloseDropdown}
                  onEdit={handleEditProfile}
                />
              )}
            </div>
          )}

          {isAuthPage ? (
            <Link
              href="/login"
              className="rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 py-2 px-4 text-sm text-white shadow-md hover:shadow-lg hover:text-white hover:bg-purple-700 transition-transform"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 py-2 px-4 text-sm text-white shadow-md hover:shadow-lg hover:text-white hover:bg-purple-700 transition-transform"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      <Head>
        <title>Y-Chat</title>
        <meta name="description" content="A real-time chat application" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap" rel="stylesheet" />
      </Head>

      <main className="flex-grow">{children}</main>

      <footer className="bottom-0 left-0 right-0 bg-white text-black py-4 text-center">
        <div className="container mx-auto">
          <p>&copy; 2024 Chat App. All rights reserved. Designed by Yashvardhan ❤️</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
