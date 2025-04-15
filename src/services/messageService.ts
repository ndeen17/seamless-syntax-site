
import { MESSAGE_ENDPOINTS, FILE_ENDPOINTS } from '@/config/api';
import { toast } from "sonner";

export interface Message {
  id: string;
  message: string;
  content?: string; // Add content as an alias for message
  ticket_id: string;
  message_type: string;
  sender_id: string;
  sender?: string; // Add sender as an alias for sender_id
  admin_id: string;
  time_received: string;
  timestamp?: string; // Add timestamp as an alias for time_received
  seen_by_admin: number;
  seen_by_user: number;
  seen?: boolean; // Add seen as an alias for seen_by_user
  attachments?: string[];
}

interface SendMessageParams {
  message: string;
  ticket_id: string;
  message_type: string;
  sender_id: string;
  admin_id: string;
  attachments?: File[];
}

interface FetchMessagesParams {
  ticket_id: string;
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
export const uploadFiles = async (
  files: File[],
  senderId: string,
  receiverId: string,
  ticketId: string,
  // message:string
): Promise<string[]> => {
  try {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    // sender, ticketId, receiverId
    // Add Idadditional data to the form
    formData.append("senderId", senderId);
    formData.append("receiverId", receiverId);
    formData.append("ticketId", ticketId);
    // formData.append("fileMessage", message);

    const response = await apiRequest(FILE_ENDPOINTS.UPLOAD, "POST", formData);
    return response.fileUrls;
  } catch (error) {
    console.error("File upload error:", error);
    toast.error("Failed to upload files");
    throw error;
  }
};

// Message service functions
export const messageService = {
  sendMessage: async ({message, ticket_id, message_type, sender_id, admin_id, attachments }: SendMessageParams): Promise<Message> => {
    try {
      // Upload files first if any
      let fileUrls: string[] = [];
      if (attachments && attachments.length > 0) {
        fileUrls = await uploadFiles(attachments, sender_id, admin_id, ticket_id);
        return;
      }else if (attachments && attachments.length > 0 && message !=="") {
        fileUrls = await uploadFiles(attachments, sender_id, admin_id, ticket_id);
        const response = await apiRequest(MESSAGE_ENDPOINTS.SEND_USER, 'POST', {
          message, 
          ticket_id, 
          message_type, 
          sender_id,
          admin_id,
          attachments: fileUrls
        });
        return response.message; 
      }else{
        const response = await apiRequest(MESSAGE_ENDPOINTS.SEND_USER, 'POST', {
          message, 
          ticket_id, 
          message_type, 
          sender_id,
          admin_id,
          attachments: fileUrls
        });
        return response.message; 
      }
    } catch (error) {
      toast.error("Failed to send message");
      throw error;
    }
  },
  
  fetchMessages: async ({ ticket_id }: FetchMessagesParams): Promise<Message[]> => {
    try {
      const response = await apiRequest(MESSAGE_ENDPOINTS.FETCH_PER_TICKET, 'POST', { ticket_id });
      // console.log(response)
      
      // Map the messages to ensure consistent property access
      const messages = response.result.map((msg: any) => ({
        ...msg,
        content: msg.message,
        sender: msg.sender_id,
        timestamp: msg.time_received,
        seen: msg.seen_by_user === 1
      }));
      
      return messages;
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
