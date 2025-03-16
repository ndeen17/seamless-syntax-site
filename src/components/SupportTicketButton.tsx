
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestion } from "lucide-react";
import SupportTicketDialog from "./SupportTicketDialog";
import { MESSAGE_ENDPOINTS } from "@/config/api";
import { useIsMobile } from "@/hooks/use-mobile";

const SupportTicketButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const isMobile = useIsMobile();

  // Optimized to use useCallback to avoid re-creating function on every render
  const checkUnreadMessages = useCallback(async () => {
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
  }, []);
  
  // Check for unread messages
  useEffect(() => {
    // Check immediately and then every minute
    checkUnreadMessages();
    const interval = setInterval(checkUnreadMessages, 60000);
    
    return () => clearInterval(interval);
  }, [checkUnreadMessages]);
  
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
        size={isMobile ? "icon" : "sm"} 
        onClick={() => setIsDialogOpen(true)}
        className={`relative transition-all ${
          isMobile 
            ? "h-9 w-9 p-0" 
            : "text-sm font-medium text-gray-700 hover:text-blue-600 flex items-center"
        }`}
        aria-label="Support"
      >
        <MessageCircleQuestion className={isMobile ? "h-5 w-5" : "h-4 w-4 mr-1"} />
        {!isMobile && "Support"}
        {hasUnreadMessages && (
          <span 
            className={`absolute bg-red-500 rounded-full ${
              isMobile 
                ? "-top-1 -right-1 h-2.5 w-2.5" 
                : "-top-1 -right-1 h-2 w-2"
            }`}
            aria-label="You have unread messages"
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
