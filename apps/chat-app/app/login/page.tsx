
"use client"
import React from 'react';
import Layout from '../../components/Layout';
import LoginForm from '../../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen">
        <LoginForm />
      </div>
      <div>
        <p>Don&apos;t have an account? <a href="/register" className="text-blue-500 hover:underline">Register now</a></p>
      </div>
    </Layout>
  );
};






export default LoginPage;