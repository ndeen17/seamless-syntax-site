
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestion } from "lucide-react";
import SupportTicketDialog from "./SupportTicketDialog";

const SupportTicketButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setIsDialogOpen(true)}
        className="text-sm font-medium text-gray-700 hover:text-blue-600 flex items-center"
      >
        <MessageCircleQuestion className="h-4 w-4 mr-1" />
        Support
      </Button>
      
      <SupportTicketDialog 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </>
  );
};

export default SupportTicketButton;
