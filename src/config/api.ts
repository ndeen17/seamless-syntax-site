
// Base API URL - reading from environment variable with fallback
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Auth endpoints
export const AUTH_ENDPOINTS = {
  SIGNUP: `${API_BASE_URL}/user-signup`,
  LOGIN: `${API_BASE_URL}/user-login`,
  VERIFY_CODE: `${API_BASE_URL}/verify-user-code`,
  LOGOUT: `${API_BASE_URL}/user-logout`,
  FORGOT_PASSWORD: `${API_BASE_URL}/user-forgot-password`,
  APPROVE_FORGOT_PASSWORD: `${API_BASE_URL}/approve-forgot-password`,
  CHANGE_PASSWORD: `${API_BASE_URL}/change-password`,
  VERIFY_USER: `${API_BASE_URL}/verifyUser`,
  VERIFY_PASSWORD_CHANGE: `${API_BASE_URL}/verifyPasswordChange`,
};

// User endpoints
export const USER_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/users`,
  GET_BY_ID: (id: string) => `${API_BASE_URL}/users/${id}`,
  UPDATE: (id: string) => `${API_BASE_URL}/users/${id}`,
  DELETE: (id: string) => `${API_BASE_URL}/users/${id}`,
};

// Ticket endpoints
export const TICKET_ENDPOINTS = {
  CREATE: `${API_BASE_URL}/create-ticket`,
  CLOSE: `${API_BASE_URL}/close-ticket`,
};
