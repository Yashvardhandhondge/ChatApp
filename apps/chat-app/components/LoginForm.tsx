"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../services/auth';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Link from 'next/link';
const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      await login(username, password);
      router.push('/rooms'); 
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center mt-[-60px] items-center bg-white">
   
      <div className="w-full max-w-md p-8 rounded-lg shadow-xl flex">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full">
          <h2 className="text-pretty text-slate-800 flex justify-center items-center text-2xl font-['Neue Montreal'] mb-6">Login</h2>
          <div className="mb-4 relative">
            <input
              type="text"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 pl-10 text-black border border-purple-600 rounded-full transition duration-300 focus:border-[#00dfc4] focus:outline-none"
              placeholder="Email"
              required
            />
            <FaEnvelope className="absolute left-5 top-4 text-purple-600" />
          </div>
          <div className="mb-6 relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-10 text-black border border-purple-600 rounded-full transition duration-300 focus:border-[#00dfc4] focus:outline-none"
              placeholder="Password"
              required
            />
            <FaLock className="absolute left-5 top-4 text-purple-600" />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-purple-300 text-[#223243] py-2 rounded-full font-semibold cursor-pointer transition duration-200 hover:bg-[#00bfae] shadow-lg"
            >
              Login
            </button>
          </div>
          <div className='mb-4'>
          <p className='text text-pretty text-gray-400'>
            New To platform?{' '}
            <Link href='/register' className='text-purple-400 hover:text-purple-700'>
            register
            </Link>
          </p>
          </div>
        </form>
      </div>
      <div>
        <img src="https://herobot.app/wp-content/uploads/2022/11/11-Reasons-Why-A-Chat-Application-Is-Great-For-Business_1.jpg" className='w-full h-full max-w-[800px]' alt="" />
      </div>
    </div>
  );
};

export default LoginForm;
