// services/auth.ts

import { loginUser, registerUser } from './api';

export const login = async (username: string, password: string) => {
  try {
    const response = await loginUser(username, password);
    const { token } = response.data;
    // Save token to localStorage
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const register = async (username: string, password: string) => {
  try {
    const response = await registerUser(username, password);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const logout = () => {
  // Remove token from localStorage
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
