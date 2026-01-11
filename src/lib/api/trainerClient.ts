import axios from 'axios';

// Create axios instance for trainer API calls
const trainerClient = axios.create({
  baseURL: 'http://localhost:8000/api/trainer',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
trainerClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage or wherever you store it
    const token = localStorage.getItem('trainerToken');
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
trainerClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors (401, 403, etc.)
    if (error.response?.status === 401) {
      // Unauthorized - redirect to trainer login
      localStorage.removeItem('trainerToken');
      window.location.href = '/trainer/login';
    }
    return Promise.reject(error);
  }
);

export default trainerClient;

