import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Wallet } from 'lucide-react';

const WalletButton: React.FC = () => {
  const navigate = useNavigate();

  const handleWalletAccess = () => {
    navigate("/wallet");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center text-blue-600 hover:text-blue-800"
      onClick={handleWalletAccess}
    >
      <Wallet className="h-4 w-4 mr-1" />
      <span className="hidden sm:inline">Wallet</span>
    </Button>
  );
};

export default WalletButton;