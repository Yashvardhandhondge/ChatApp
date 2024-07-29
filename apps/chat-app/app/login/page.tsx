// pages/login/page.tsx
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
    </Layout>
  );
};

export default LoginPage;
