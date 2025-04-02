
import axios from 'axios';
import { API_BASE_URL } from '@/config/api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
}

export const DIGITAL_PRODUCTS_ENDPOINTS = {
  FEATURED: `${API_BASE_URL}/featured-products`,
  ALL: `${API_BASE_URL}/digital-products`,
  DETAILS: (id: string) => `${API_BASE_URL}/digital-products/${id}`,
  DOWNLOAD: `${API_BASE_URL}/download-digital-products`,
};

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(DIGITAL_PRODUCTS_ENDPOINTS.FEATURED);
    return response.data.featuredProducts || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(DIGITAL_PRODUCTS_ENDPOINTS.ALL);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};

export const fetchProductDetails = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(DIGITAL_PRODUCTS_ENDPOINTS.DETAILS(id));
    return response.data;
  } catch (error) {
    console.error(`Error fetching product details for ID ${id}:`, error);
    throw error;
  }
};
