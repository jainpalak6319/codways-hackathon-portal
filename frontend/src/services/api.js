import axios from 'axios';

// Central Axios instance. Swap baseURL / add interceptors here when the
// real Express backend is ready. All service files below import this.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('devdash_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Small helper to simulate realistic network latency for mock services
export const mockDelay = (data, ms = 400) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));
