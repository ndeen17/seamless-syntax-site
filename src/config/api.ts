
// Base API URL - replace with your actual backend URL
export const API_BASE_URL = 'http://localhost:5000/api'; // Change this to your backend URL

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
