import axios from 'axios';
import adminClient from './adminClient';
import userClient from './userClient';
import trainerClient from './trainerClient';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://venom.8bitsol.com/backend/public/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token if available (check all possible tokens)
    const adminToken = localStorage.getItem('adminToken');
    const userToken = localStorage.getItem('userToken');
    const trainerToken = localStorage.getItem('trainerToken');

    const token = adminToken || userToken || trainerToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('adminToken');
      localStorage.removeItem('userToken');
      localStorage.removeItem('trainerToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const formDataApi = axios.create({
  baseURL: 'https://venom.8bitsol.com/backend/public/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

formDataApi.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem('adminToken');
    const userToken = localStorage.getItem('userToken');
    const trainerToken = localStorage.getItem('trainerToken');

    const token = adminToken || userToken || trainerToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

formDataApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('userToken');
      localStorage.removeItem('trainerToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  adminLogin: (data: { email: string; password: string }) =>
    api.post('/auth/login', { ...data, role: 'admin' }),

  trainerLogin: (data: { email: string; password: string }) =>
    api.post('/auth/login', { ...data, role: 'trainer' }),

  userLogin: (data: { email: string; password: string }) =>
    api.post('/auth/login', { ...data, role: 'user' }),

  register: (data: any) => api.post('/auth/register', data),

  logout: () => api.post('/auth/logout'),
};

// Admin API
export const adminAPI = {
  // Dashboard
  getDashboard: () => adminClient.get('/dashboard'),

  // Members
  listMembers: () => adminClient.get('/members'),
  createMember: (data: any) => adminClient.post('/members', data),
  getMemberById: (id: string | number) => adminClient.get(`/members/${id}`),
  updateMember: (id: string | number, data: any) => adminClient.put(`/members/${id}`, data),
  deleteMember: (id: string | number) => adminClient.delete(`/members/${id}`),
  assignTrainerToMember: (memberId: string | number, trainerId: string | number) =>
    adminClient.post(`/members/${memberId}/assign-trainer`, { trainer_id: trainerId }),

  // Trainers
  listTrainers: () => adminClient.get('/trainers'),
  createTrainer: (data: any) => adminClient.post('/trainers', data),
  updateTrainer: (id: string | number, data: any) => adminClient.put(`/trainers/${id}`, data),
  deleteTrainer: (id: string | number) => adminClient.delete(`/trainers/${id}`),

  // Plans
  listPlans: () => adminClient.get('/plans'),
  createPlan: (data: any) => adminClient.post('/plans', data),
  updatePlan: (id: string | number, data: any) => adminClient.put(`/plans/${id}`, data),
  deletePlan: (id: string | number) => adminClient.delete(`/plans/${id}`),

  // Guidelines
  listGuidelines: () => adminClient.get('/guidelines'),
  createGuideline: (data: any) => adminClient.post('/guidelines', data),
  updateGuideline: (id: string | number, data: any) => adminClient.put(`/guidelines/${id}`, data),
  deleteGuideline: (id: string | number) => adminClient.delete(`/guidelines/${id}`),
};

// Trainer API
export const trainerAPI = {
  getDashboard: () => trainerClient.get('/dashboard'),
  listMembers: () => trainerClient.get('/members'),
};

// User API
export const userAPI = {
  getDashboard: () => userClient.get('/dashboard'),
  getAssignedTrainer: () => userClient.get('/trainer'),
  getCurrentWorkoutPlan: () => userClient.get('/workout-plan'),
};

export default api;

