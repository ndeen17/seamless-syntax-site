
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserHeader from "@/components/UserHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Message, messageService } from "@/services/messageService";
import { ticketService } from "@/services/ticketService";
import { authService } from "@/services/authService";
import ChatWindow from "@/components/chat/ChatWindow";
import { toast } from "sonner";

const ChatPage: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [ticketSubject, setTicketSubject] = useState("Support Ticket");

  // Check authentication and load messages
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.verifyUser();
        if (user) {
          setUserId(user.id);
          return user;
        } else {
          toast.error("Please log in to view this ticket");
          navigate("/login");
          return null;
        }
      } catch (error) {
        console.error("Authentication error", error);
        toast.error("Authentication error");
        navigate("/login");
        return null;
      }
    };

    const loadMessages = async () => {
      if (!ticketId) {
        navigate("/tickets");
        return;
      }

      try {
        setIsLoading(true);
        const user = await checkAuth();
        if (!user) return;

        // Fetch ticket data to get subject
        try {
          const ticket = await ticketService.getTicket(ticketId);
          if (ticket) {
            setTicketSubject(ticket.subject);
          }
        } catch (error) {
          console.error("Error fetching ticket details:", error);
        }

        // Fetch messages
        const fetchedMessages = await messageService.fetchMessages({
          ticket_id: ticketId,
        });

        if (fetchedMessages.length === 0) {
          toast.info("No messages found for this ticket.");
        }
        setMessages(fetchedMessages);

        // Mark unread admin messages as read
        fetchedMessages.forEach((msg) => {
          if ((msg.seen_by_user === 0 || msg.seen === false) && 
              (msg.sender_id === "admin" || msg.sender === "admin")) {
            messageService.markAsSeen(msg.id);
          }
        });
      } catch (error) {
        console.error("Error loading messages:", error);
        toast.error("Failed to load messages");
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();

    // Set up polling for new messages every 30 seconds
    const interval = setInterval(async () => {
      if (ticketId && userId) {
        try {
          const fetchedMessages = await messageService.fetchMessages({
            ticket_id: ticketId,
          });

          setMessages(fetchedMessages);

          // Mark unread admin messages as read
          fetchedMessages.forEach((msg) => {
            if ((msg.seen_by_user === 0 || msg.seen === false) && 
                (msg.sender_id === "admin" || msg.sender === "admin")) {
              messageService.markAsSeen(msg.id);
            }
          });
        } catch (error) {
          console.error("Error polling messages:", error);
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [ticketId, navigate]);

  const handleSendMessage = async (content: string, type: string = "text") => {
    if (!ticketId || !content.trim() || !userId) return;
    setIsSending(true);
    try {
      const sentMessage = await messageService.sendMessage({
        message: content.trim(),
        ticket_id: ticketId,
        message_type: type,
        sender_id: userId,
        admin_id: "admin",
      });

      setMessages((prev) => [...prev, sentMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const handleSendFiles = async (
    content: string,
    files: File[],
    type: string = "file"
  ) => {
    if (!ticketId || files.length === 0 || !userId) return;
    setIsSending(true);
    try {
      const sentMessage = await messageService.sendMessage({
        message: content,
        ticket_id: ticketId,
        message_type: type,
        sender_id: userId,
        admin_id: "admin",
        attachments: files,
      });
      toast.success("Files uploaded successfully");
      
      // Refresh the messages list to show the new files
      const fetchedMessages = await messageService.fetchMessages({
        ticket_id: ticketId,
      });
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error sending files:", error);
      toast.error("Failed to send files. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <UserHeader />
      
      <main className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/tickets")}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <h1 className="text-xl font-bold">{ticketSubject}</h1>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md border flex-1">
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            isSending={isSending}
            onSendMessage={handleSendMessage}
            onSendFiles={(content, files) => handleSendFiles(content, files)}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatPage;
