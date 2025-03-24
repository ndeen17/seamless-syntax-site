
import axios from 'axios';
import { API_BASE_URL } from '@/config/api';

export const PAYMENT_ENDPOINTS = {
  CREATE_CRYPTO: `${API_BASE_URL}/create-crypto-payment`,
  CREATE_CURRENCY: `${API_BASE_URL}/create-currency-payment`,
  STATUS: (id: string) => `${API_BASE_URL}/payment/${id}/status`,
  USER_PAYMENTS: (userId: string) => `${API_BASE_URL}/user/${userId}/payments`,
  IPN: `${API_BASE_URL}/ipn`,
};

export const createCryptoPayment = async (paymentData: any) => {
  try {
    const response = await axios.post(PAYMENT_ENDPOINTS.CREATE_CRYPTO, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error creating crypto payment:', error);
    throw error;
  }
};

export const createCurrencyPayment = async (paymentData: any) => {
  try {
    const response = await axios.post(PAYMENT_ENDPOINTS.CREATE_CURRENCY, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error creating currency payment:', error);
    throw error;
  }
};

export const getPaymentStatus = async (paymentId: string) => {
  try {
    const response = await axios.get(PAYMENT_ENDPOINTS.STATUS(paymentId));
    return response.data;
  } catch (error) {
    console.error('Error getting payment status:', error);
    throw error;
  }
};

export const getUserPayments = async (userId: string) => {
  try {
    const response = await axios.get(PAYMENT_ENDPOINTS.USER_PAYMENTS(userId));
    return response.data;
  } catch (error) {
    console.error('Error getting user payments:', error);
    throw error;
  }
};
