import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ticketService } from "@/services/ticketService";
import { messageService, Message } from "@/services/messageService";
import { authService } from "@/services/authService";
import { FileText, Paperclip, Send, X, Image, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

const TicketPage: React.FC = () => {
  // User and ticket form states
  const [userId, setUserId] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("general");
  const [initialMessage, setInitialMessage] = useState("");
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Messaging states
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // On mount, verify user auth status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.verifyUser();
        if (user) setUserId(user.id);
      } catch (error) {
        console.error("User not authenticated", error);
      }
    };
    checkAuth();
  }, []);

  // After ticket creation, fetch messages every 30 secs
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (ticketId) {
      const fetchMessages = async () => {
        try {
          const msgs = await messageService.fetchMessages({ ticketId });
          setMessages(msgs);
          // Optionally mark messages as seen:
          msgs.forEach(msg => {
            if (!msg.seen && msg.sender === "admin") {
              messageService.markAsSeen(msg.id);
            }
          });
          scrollToBottom();
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        }
      };
      fetchMessages();
      interval = setInterval(fetchMessages, 30000);
    }
    return () => interval && clearInterval(interval);
  }, [ticketId]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Create a new ticket (and send initial message)
  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !initialMessage.trim()) return;
    setIsSubmitting(true);
    try {
      const response = await ticketService.createTicket({
        subject,
        message: initialMessage,
        category,
        user_id: userId
      });
      setTicketId(response.ticketId);
      // Add initial message to conversation
      setMessages([
        {
          id: response.messageId,
          ticketId: response.ticketId,
          content: initialMessage,
          sender: "user",
          timestamp: new Date().toISOString(),
          seen: true
        }
      ]);
    } catch (error) {
      console.error("Ticket creation failed:", error);
      alert("Failed to create ticket. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle file selection for message attachments
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  // Send additional message in an existing ticket
  const handleSendMessage = async () => {
    if (!newMessage.trim() && selectedFiles.length === 0) return;
    if (!ticketId) return;
    setIsSendingMessage(true);
    try {
      const sentMsg = await messageService.sendMessage({
        ticketId,
        content: newMessage,
        attachments: selectedFiles
      });
      setMessages(prev => [...prev, sentMsg]);
      setNewMessage("");
      setSelectedFiles([]);
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message.");
    } finally {
      setIsSendingMessage(false);
    }
  };

  // Get file icon based on file extension for attachments
  const getFileIcon = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext || "")) {
      return <Image className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen container mx-auto p-4">
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <MessageCircleQuestion className="h-6 w-6 text-blue-600" />
        Support Ticket
      </h1>

      {!ticketId ? (
        // Ticket creation form
        <form onSubmit={handleCreateTicket} className="max-w-lg mx-auto space-y-4 p-4 border rounded-md shadow">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
              placeholder="Brief description of your issue"
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="general">General</option>
              <option value="technical">Technical</option>
              <option value="billing">Billing</option>
              <option value="account">Account</option>
            </select>
          </div>
          <div>
            <Label htmlFor="initialMessage">Message</Label>
            <Textarea
              id="initialMessage"
              value={initialMessage}
              onChange={e => setInitialMessage(e.target.value)}
              required
              rows={5}
              placeholder="Describe your issue in detail"
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
            {isSubmitting ? "Submitting Ticket..." : "Create Ticket"}
          </Button>
        </form>
      ) : (
        // Conversation area for existing ticket
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="border p-4 rounded-md shadow h-96 overflow-y-auto">
            {messages.map(msg => (
              <div key={msg.id} className={cn("p-3 rounded-lg my-2 max-w-[80%]", msg.sender === "user" ? "bg-blue-600 text-white self-end" : "bg-gray-100 text-gray-800 self-start")}>
                <div>{msg.content}</div>
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {msg.attachments.map((fileUrl, idx) => (
                      <a key={idx} href={fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm underline">
                        {getFileIcon(fileUrl)}
                        <span className="ml-1">Attachment {idx + 1}</span>
                      </a>
                    ))}
                  </div>
                )}
                <div className="text-xs mt-1 text-gray-500">
                  {new Date(msg.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={handleAttachClick}>
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button type="button" onClick={handleSendMessage} disabled={isSendingMessage || (!newMessage.trim() && selectedFiles.length === 0)} className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4" />
            </Button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-2 border-t pt-2">
              <p className="text-sm text-gray-500">Selected files:</p>
              <div className="flex flex-wrap gap-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center bg-gray-100 rounded-md px-2 py-1 text-sm">
                    {getFileIcon(file.name)}
                    <span className="mx-1 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {file.name}
                    </span>
                    <button onClick={() => removeFile(index)} className="text-gray-500 hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketPage;