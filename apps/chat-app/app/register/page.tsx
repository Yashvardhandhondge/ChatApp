
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
    </Layout>
  );
};

export default RegisterPage;
