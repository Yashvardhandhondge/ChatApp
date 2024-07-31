
"use client"
import React from 'react';
import Layout from '../../components/Layout';
import RegisterForm from '../../components/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen">
        <RegisterForm />
      </div>
      <div>
        <p>Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
      </div>
    </Layout>
  );
};

export default RegisterPage;