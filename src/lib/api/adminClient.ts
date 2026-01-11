import axios from 'axios';

// Create axios instance for admin API calls
const adminClient = axios.create({
  baseURL: 'http://localhost:8000/api/admin',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
adminClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage or wherever you store it
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
adminClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors (401, 403, etc.)
    if (error.response?.status === 401) {
      // Unauthorized - redirect to admin login
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default adminClient;

