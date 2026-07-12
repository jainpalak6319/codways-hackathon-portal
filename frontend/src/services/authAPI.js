import { mockDelay } from './api';

export async function login(email, password) {
  return mockDelay({ token: 'mock-jwt-token', user: { name: 'Admin User', role: 'Super Admin', email } });
}
export async function logout() {
  localStorage.removeItem('devdash_token');
  return mockDelay({ success: true });
}
export async function getCurrentUser() {
  return mockDelay({ name: 'Admin User', role: 'Super Admin', email: 'admin@devdash.io' });
}
