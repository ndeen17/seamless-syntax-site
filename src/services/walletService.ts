import axios from 'axios';
import { API_BASE_URL } from '@/config/api';

export const WALLET_ENDPOINTS = {
  BALANCE: (walletId: string) => `${API_BASE_URL}/wallet/${walletId}/balance`,
  ADD_FUNDS: `${API_BASE_URL}/wallet/add-funds`,
  WITHDRAW_FUNDS: `${API_BASE_URL}/wallet/withdraw-funds`,
  TRANSFER_FUNDS: `${API_BASE_URL}/wallet/transfer-funds`,
};

export const getWalletBalance = async (walletId: string) => {
  try {
    const response = await axios.get(WALLET_ENDPOINTS.BALANCE(walletId));
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    throw error;
  }
};

export const addFunds = async (data: any) => {
  try {
    const response = await axios.post(WALLET_ENDPOINTS.ADD_FUNDS, data);
    return response.data;
  } catch (error) {
    console.error('Error adding funds:', error);
    throw error;
  }
};

export const withdrawFunds = async (data: any) => {
  try {
    const response = await axios.post(WALLET_ENDPOINTS.WITHDRAW_FUNDS, data);
    return response.data;
  } catch (error) {
    console.error('Error withdrawing funds:', error);
    throw error;
  }
};

export const transferFunds = async (data: any) => {
  try {
    const response = await axios.post(WALLET_ENDPOINTS.TRANSFER_FUNDS, data);
    return response.data;
  } catch (error) {
    console.error('Error transferring funds:', error);
    throw error;
  }
};