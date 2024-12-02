
import { loginUser, registerUser } from './api';
import jwt from "jsonwebtoken"
import { getDecode } from './jwt';
export const login = async (username: string, password: string) => {
  try {
    const response = await loginUser(username, password);
    const { token } = response.data;
    
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const register = async (email: string, password: string,name:string,image:string) => {
  try {
    const response = await registerUser(email, password, name,image);
        const { token } = response.data;
    
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const logout = () => {
  
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getId:()=> Promise<any> = async () => {
  const token = getToken();
  if (!token) {
    return null;
  }
  const data = await getDecode(token)
  console.log(data);
  return data;
}