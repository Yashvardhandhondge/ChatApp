
"use client"
// components/RegisterForm.tsx

import React, { useState } from 'react';
import { registerUser } from '@/services/api';
import { ApiError } from 'next/dist/server/api-utils'; // Define types in types.ts

const RegisterForm: React.FC = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    name: '',
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
      await registerUser(formValues.email, formValues.password);
      setSuccess('Registration successful! You can now log in.');
      setFormValues({ email: '', password: '', name: '' });
    } catch (err: any) {
      if (err.response?.data) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
