
"use client"
import React from 'react';
import Layout from '../../components/Layout';
import LoginForm from '../../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
   <>
      <div className="flex justify-center items-center min-h-screen w-screen">
        <LoginForm />
      </div>
      </>

  );
};






export default LoginPage;