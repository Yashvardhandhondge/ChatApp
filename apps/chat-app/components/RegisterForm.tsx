"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/api';
import { FaUser, FaEnvelope, FaLock, FaImage } from 'react-icons/fa';
import Link from 'next/link';
import { register } from '@/services/auth';
const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    name: '',
    imageUrl: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await register(formValues.email, formValues.password, formValues.name, formValues.imageUrl);
      setSuccess('Registration successful! Redirecting to rooms...');
      router.push("/rooms");
    } catch (err: any) {
      if (err.response?.data) {
        setError(err.response.data.message);
      } else {
        console.log(err);
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center bg-gradient-to-br from-purple-600 to-blue-500 py-8 px-4 min-h-screen w-screen">
      {/* <div className="flex-1 ">
        <img
          src="https://herobot.app/wp-content/uploads/2022/11/11-Reasons-Why-A-Chat-Application-Is-Great-For-Business_1.jpg"
          className="w-full h-auto max-w-[800px] rounded-lg bg-gradient-to-br from-purple-600 to-blue-500"
          alt=""
        />
      </div> */}
      <div className="w-full max-w-md p-8 rounded-lg shadow-xl bg-gradient-to-br from-purple-600 to-blue-500  flex flex-col">
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
        <form onSubmit={handleSubmit} className="w-full">
          <h2 className="text-pretty text-slate-950 text-2xl font-['Neue Montreal'] mb-6 text-center">
            Register
          </h2>
          <div className="mb-4 relative">
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              className="w-full p-3 pl-10 text-black border border-purple-600 rounded-full transition duration-300 focus:border-[#00dfc4] focus:outline-none"
              placeholder="Name"
              required
            />
            <FaUser className="absolute left-5 top-4 text-purple-600" />
          </div>
          <div className="mb-4 relative">
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              className="w-full p-3 pl-10 text-black border border-purple-600 rounded-full transition duration-300 focus:border-[#00dfc4] focus:outline-none"
              placeholder="Email"
              required
            />
            <FaEnvelope className="absolute left-5 top-4 text-purple-600" />
          </div>
          <div className="mb-4 relative">
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              className="w-full p-3 pl-10 text-black border border-purple-600 rounded-full transition duration-300 focus:border-[#00dfc4] focus:outline-none"
              placeholder="Password"
              required
            />
            <FaLock className="absolute left-5 top-4 text-purple-600" />
          </div>
          <div className="mb-4 relative">
            <input
              type="text"
              name="imageUrl"
              value={formValues.imageUrl}
              onChange={handleInputChange}
              className="w-full p-3 pl-10 text-black border border-purple-600 rounded-full transition duration-300 focus:border-[#00dfc4] focus:outline-none"
              placeholder="Enter Profile Image URL"
              required
            />
            <FaImage className="absolute left-5 top-4 text-purple-600" />
          </div>
          {formValues.imageUrl && (
            <div className="mb-4 flex justify-center">
              <img
                src={formValues.imageUrl}
                alt="Avatar Preview"
                className="w-20 h-20 rounded-full border-2 border-purple-600 object-cover"
              />
            </div>
          )}
          <div className="mb-4">
            <input
              type="submit"
              value="Create Account"
              className="w-full bg-purple-300 text-[#223243] py-2 rounded-full font-semibold cursor-pointer transition duration-200 hover:bg-[#00bfae] shadow-lg"
            />
          </div>
          <div className="mb-4 text-center">
            <p className="text text-pretty text-white">
              Already Have an Account?{' '}
              <Link href="/login" className="text-purple-300 hover:text-purple-700">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
