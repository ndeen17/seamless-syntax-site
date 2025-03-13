
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestion } from "lucide-react";
import SupportTicketDialog from "./SupportTicketDialog";
import { MESSAGE_ENDPOINTS } from "@/config/api";

interface UnreadCountResponse {
  count: number;
}

const SupportTicketButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  // Check for unread messages
  useEffect(() => {
    const checkUnreadMessages = async () => {
      try {
        const response = await fetch(MESSAGE_ENDPOINTS.FETCH_ALL, {
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          // Check if any messages from admin are unread
          const unreadExists = data.messages?.some(
            (msg: any) => msg.sender === 'admin' && !msg.seen
          );
          setHasUnreadMessages(unreadExists);
        }
      } catch (error) {
        console.error("Failed to check unread messages:", error);
      }
    };
    
    // Check immediately and then every minute
    checkUnreadMessages();
    const interval = setInterval(checkUnreadMessages, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // When dialog opens, reset the unread indicator
  useEffect(() => {
    if (isDialogOpen) {
      setHasUnreadMessages(false);
    }
  }, [isDialogOpen]);

  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setIsDialogOpen(true)}
        className="text-sm font-medium text-gray-700 hover:text-blue-600 flex items-center relative"
      >
        <MessageCircleQuestion className="h-4 w-4 mr-1" />
        Support
        {hasUnreadMessages && (
          <span 
            className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"
            title="You have unread messages"
          ></span>
        )}
      </Button>
      
      <SupportTicketDialog 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </>
  );
};

export default SupportTicketButton;
