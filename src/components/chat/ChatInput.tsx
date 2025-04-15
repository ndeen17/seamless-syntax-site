
import React, { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, X } from 'lucide-react';
import { getFileIcon } from '@/utils/fileHelpers';

interface ChatInputProps {
  onSendMessage: (content: string) => Promise<void>;
  onSendFiles: (files: File[]) => Promise<void>;
  isSending: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onSendFiles, isSending }) => {
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async () => {
    if (!message.trim() && selectedFiles.length === 0) return;
    
    if (selectedFiles.length > 0) {
      await onSendFiles(selectedFiles);
      setSelectedFiles([]);
    }
    
    if (message.trim()) {
      await onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col w-full">
      {selectedFiles.length > 0 && (
        <div className="border border-gray-100 rounded-lg bg-gray-50 p-3 mb-3">
          <p className="text-xs text-gray-500 mb-2">Selected files:</p>
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center bg-white rounded-lg px-3 py-2 text-sm border shadow-sm"
              >
                {getFileIcon(file.name)}
                <span className="mx-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {file.name}
                </span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 bg-white rounded-lg">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleAttachClick}
          className="flex-shrink-0 text-gray-500 hover:text-indigo-600"
          disabled={isSending}
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        
        <Input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          disabled={isSending}
        />
        
        <Button
          type="button"
          onClick={handleSendMessage}
          disabled={isSending || (!message.trim() && selectedFiles.length === 0)}
          className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700"
        >
          <Send className="h-4 w-4" />
        </Button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
      </div>
    </div>
  );
};

export default ChatInput;
