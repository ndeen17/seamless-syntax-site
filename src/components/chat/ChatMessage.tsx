
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FileText, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  id: string;
  content: string;
  sender: 'user' | 'admin';
  timestamp: string;
  seen: boolean;
  attachments?: string[];
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  sender,
  timestamp,
  seen,
  attachments = []
}) => {
  const isUser = sender === 'user';
  
  const getFileIcon = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext || "")) {
      return <Image className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  const isImageUrl = (url: string) => {
    const ext = url.split('.').pop()?.toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "webp"].includes(ext || "");
  };

  return (
    <div
      className={cn(
        "flex",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl p-4 relative shadow-sm",
          isUser
            ? "bg-indigo-600 text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-bl-none border"
        )}
      >
        {!seen && !isUser && (
          <div
            className="absolute -left-2 top-1 h-2 w-2 rounded-full bg-red-500"
            title="New message"
          />
        )}
        
        {content && <div className="break-words text-sm">{content}</div>}
        
        {attachments && attachments.length > 0 && (
          <div className="mt-3 space-y-2">
            {attachments.map((url, idx) => (
              <div key={idx} className="flex flex-col">
                {isImageUrl(url) ? (
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <img 
                      src={url} 
                      alt={`Attachment ${idx + 1}`} 
                      className="max-w-full rounded-lg max-h-[200px] object-cover"
                    />
                  </a>
                ) : (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center text-sm underline",
                      isUser ? "text-white/90 hover:text-white" : "text-indigo-600 hover:text-indigo-700"
                    )}
                  >
                    {getFileIcon(url)}
                    <span className="ml-1">Attachment {idx + 1}</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
        
        <div
          className={cn(
            "text-xs mt-2",
            isUser ? "text-indigo-100" : "text-gray-500"
          )}
        >
          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
