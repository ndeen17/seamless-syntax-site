
import { apiClient } from "./apiClient";
import { toast } from "@/lib/toast";
import { apiWrapper } from "./utils/apiUtils";

export const getFeaturedProducts = async () => {
  try {
    const response = await apiClient.get('/api/featured-products');
    // Ensure we always return an array, even if the response is empty or malformed
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    toast.error('Failed to load featured products');
    return []; // Return empty array on error
  }
};

export const postProductToHomepage = async (productData: any) => {
  return await apiWrapper(async () => {
    const response = await apiClient.post('/api/post-product-to-homepage', productData);
    return response.data;
  });
};

export const updateProductOnHomepage = async (id: string, productData: any) => {
  return await apiWrapper(async () => {
    const response = await apiClient.put('/api/update-product-on-homepage', { id, ...productData });
    return response.data;
  });
};

export const removeProductFromHomepage = async (id: string) => {
  return await apiWrapper(async () => {
    const response = await apiClient.delete(`/api/remove-product-from-homepage/${id}`);
    return response.data;
  });
};
