
import { MESSAGE_ENDPOINTS, FILE_ENDPOINTS } from '@/config/api';
import { toast } from "sonner";

export interface Message {
  id: string;
  ticketId: string;
  content: string;
  sender: 'user' | 'admin';
  timestamp: string;
  seen: boolean;
  attachments?: string[];
}

interface SendMessageParams {
  ticketId: string;
  content: string;
  attachments?: File[];
}

interface FetchMessagesParams {
  ticketId: string;
}

// Helper function for API requests with environment-aware logging
const apiRequest = async (url: string, method: string, data?: any) => {
  try {
    // For debugging in development only
    if (import.meta.env.DEV) {
      console.log(`Making ${method} request to: ${url}`);
      if (data) console.log('Request data:', data);
    }

    const options: RequestInit = {
      method,
      credentials: 'include', // Important for cookies/sessions
    };

    // Handle file uploads
    if (data instanceof FormData) {
      options.body = data;
    } else if (data) {
      options.headers = {
        'Content-Type': 'application/json',
      };
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const responseData = await response.json();
    
    // Log response in development
    if (import.meta.env.DEV) {
      console.log('Response:', responseData);
    }

    if (!response.ok) {
      throw new Error(responseData.message || 'Something went wrong');
    }

    return responseData;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// File upload service
export const uploadFiles = async (files: File[]): Promise<string[]> => {
  try {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    
    const response = await apiRequest(FILE_ENDPOINTS.UPLOAD, 'POST', formData);
    return response.fileUrls;
  } catch (error) {
    console.error('File upload error:', error);
    toast.error("Failed to upload files");
    throw error;
  }
};

// Message service functions
export const messageService = {
  sendMessage: async ({ ticketId, content, attachments }: SendMessageParams): Promise<Message> => {
    try {
      // Upload files first if any
      let fileUrls: string[] = [];
      if (attachments && attachments.length > 0) {
        fileUrls = await uploadFiles(attachments);
      }
      
      const response = await apiRequest(MESSAGE_ENDPOINTS.SEND_USER, 'POST', {
        ticketId,
        content,
        attachments: fileUrls
      });
      
      return response.message;
    } catch (error) {
      toast.error("Failed to send message");
      throw error;
    }
  },
  
  fetchMessages: async ({ ticketId }: FetchMessagesParams): Promise<Message[]> => {
    try {
      const response = await apiRequest(MESSAGE_ENDPOINTS.FETCH_PER_TICKET, 'POST', { ticketId });
      return response.messages;
    } catch (error) {
      toast.error("Failed to fetch messages");
      throw error;
    }
  },
  
  markAsSeen: async (messageId: string): Promise<void> => {
    try {
      await apiRequest(MESSAGE_ENDPOINTS.MARK_SEEN_BY_USER, 'PUT', { messageId });
    } catch (error) {
      console.error('Failed to mark message as seen:', error);
      // Don't show toast for this as it's a background operation
    }
  }
};
