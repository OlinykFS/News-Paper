import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('access_token');
      console.log('Token from localStorage:', token);

      if (token) {
        try {
          api.defaults.headers.common['Authorization'] = `JWT ${token}`;
          console.log('Checking token...');
          await api.get('/auth/users/me/');
          setIsAuthenticated(true);
          console.log('User authenticated');
        } catch (err) {
          console.error('Token validation failed', err);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          api.defaults.headers.common['Authorization'] = '';
          setIsAuthenticated(false);
          console.log('User not authenticated');
        }
      } else {
        setIsAuthenticated(false);
        console.log('No token found');
      }

      setLoading(false); 
    };

    checkToken();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('auth/jwt/create/', { email, password });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      api.defaults.headers.common['Authorization'] = `JWT ${response.data.access}`;
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      api.defaults.headers.common['Authorization'] = '';
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
