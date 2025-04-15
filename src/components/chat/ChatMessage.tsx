import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { FileText, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  id: string;
  content: string;
  sender: string;
  time_received: string;
  seen: number;
  attachments?: string[];
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content = "", // Default to an empty string
  sender,
  time_received,
  seen,
  attachments = [],
}) => {
  const [fetchedImage, setFetchedImage] = useState<string | null>(null);

  const isUser = sender !== "admin";

  // Fetch image if content starts with "get/"
  useEffect(() => {
    if (content.startsWith("get-image")) {
      console.log(content);
      const fetchImage = async (link: string) => {
        try {
          const response = await fetch(
            `https://aitool.asoroautomotive.com/api/${link}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const imageSrc = await response.text();
          setFetchedImage(imageSrc);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };

      fetchImage(content);
    }
  }, [content]);

  const isUrl = (str: string) => {
    try {
      return Boolean(new URL(str));
    } catch (e) {
      return false;
    }
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext || "")) {
      return <Image className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  const isImageUrl = (url: string) => {
    const ext = url.split(".").pop()?.toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "webp"].includes(ext || "");
  };

  return (
    <div
      className={cn(
        "flex flex-col max-w-[55%] rounded-lg p-3 mb-3 relative",
        isUser
          ? "ml-auto bg-gray-800 text-white"
          : "mr-auto bg-gray-100 text-gray-800"
      )}
    >
      {!seen && !isUser && (
        <div
          className="absolute -left-2 top-1 h-2 w-2 rounded-full bg-red-500"
          title="New message"
        ></div>
      )}

      {/* Normal text content */}
      {content &&
        !content.startsWith("get-image") &&
        !content.includes("get-image") &&
        !isUrl(content) && <div className="break-words">{content}</div>}
      {content &&
        !content.startsWith("get-image") &&
        !content.includes("get-image") && <div className="break-words"></div>}

      {/* Dynamically fetched image */}
      {fetchedImage && (
        <img
          src={fetchedImage}
          alt="Fetched"
          className="max-w-full rounded max-h-[300px] object-contain mt-2"
        />
      )}

      {/* Attachments */}
      {attachments && attachments.length > 0 && (
        <div className="mt-2 space-y-2">
          {attachments.map((url, idx) => (
            <div key={idx} className="flex flex-col">
              {isImageUrl(url) ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={url}
                    alt={`Attachment ${idx + 1}`}
                    className="max-w-full rounded max-h-[200px] object-contain"
                  />
                </a>
              ) : (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center text-sm underline",
                    isUser ? "text-white" : "text-blue-600"
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

      {/* time_received */}
      {/* time_received */}
      <div
        className={cn(
          "text-xs mt-1",
          isUser ? "text-blue-100" : "text-gray-500"
        )}
      >
        {time_received && !isNaN(new Date(time_received).getTime())
          ? formatDistanceToNow(new Date(time_received), { addSuffix: true })
          : ""}
      </div>
    </div>
  );
};

export default ChatMessage;
