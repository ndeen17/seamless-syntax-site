import React, { useEffect, useRef } from "react";
import { Message } from "@/services/messageService";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  isSending: boolean;
  onSendMessage: (content: string) => Promise<void>;
  onSendFiles: (content: string, files: File[]) => Promise<void>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isLoading,
  isSending,
  onSendMessage,
  onSendFiles,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          // Loading skeleton
          <>
            <div className="flex justify-start mb-4">
              <Skeleton className="h-24 w-2/3 rounded-lg" />
            </div>
            <div className="flex justify-end mb-4">
              <Skeleton className="h-16 w-1/2 rounded-lg" />
            </div>
            <div className="flex justify-start mb-4">
              <Skeleton className="h-20 w-3/5 rounded-lg" />
            </div>
          </>
        ) : messages.length > 0 ? (
          // Messages sorted by time_received
          [...messages]
            .sort(
              (a, b) =>
                new Date(a.time_received).getTime() -
                new Date(b.time_received).getTime()
            )
            .map((msg) => (
              <ChatMessage
                key={msg.id}
                id={msg.id}
                content={msg.message}
                sender={msg.sender_id}
                time_received={msg.time_received}
                seen={msg.seen_by_user}
                attachments={[]}
              />
            ))
        ) : (
          // No messages
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">
              No messages yet. Start the conversation!
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <ChatInput
          onSendMessage={onSendMessage}
          onSendFiles={onSendFiles}
          isSending={isSending}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
