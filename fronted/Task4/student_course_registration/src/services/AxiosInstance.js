// src/services/axiosInstance.js
import axios from 'axios';
import AuthInstance from './AuthService';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = AuthInstance.getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Basic ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
