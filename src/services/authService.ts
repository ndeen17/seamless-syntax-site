
import { AUTH_ENDPOINTS } from '@/config/api';

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface VerifyCodeData {
  email: string;
  verificationCode: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ApproveForgotPasswordData {
  email: string;
  verificationCode: string;
}

interface ChangePasswordData {
  email: string;
  oldPassword: string;
  newPassword: string;
}

// Helper function for API requests
const apiRequest = async (url: string, method: string, data?: any) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include', // Important for cookies/sessions
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Auth service functions
export const authService = {
  signup: (data: SignupData) => 
    apiRequest(AUTH_ENDPOINTS.SIGNUP, 'POST', data),
  
  login: (data: LoginData) => 
    apiRequest(AUTH_ENDPOINTS.LOGIN, 'POST', data),
  
  verifyCode: (data: VerifyCodeData) => 
    apiRequest(AUTH_ENDPOINTS.VERIFY_CODE, 'POST', data),
  
  logout: () => 
    apiRequest(AUTH_ENDPOINTS.LOGOUT, 'POST'),
  
  forgotPassword: (data: ForgotPasswordData) => 
    apiRequest(AUTH_ENDPOINTS.FORGOT_PASSWORD, 'POST', data),
  
  approveForgotPassword: (data: ApproveForgotPasswordData) => 
    apiRequest(AUTH_ENDPOINTS.APPROVE_FORGOT_PASSWORD, 'POST', data),
  
  changePassword: (data: ChangePasswordData) => 
    apiRequest(AUTH_ENDPOINTS.CHANGE_PASSWORD, 'POST', data),
  
  verifyUser: () => 
    apiRequest(AUTH_ENDPOINTS.VERIFY_USER, 'GET'),
  
  verifyPasswordChange: () => 
    apiRequest(AUTH_ENDPOINTS.VERIFY_PASSWORD_CHANGE, 'GET'),
};
