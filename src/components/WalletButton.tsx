
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Wallet } from 'lucide-react';

const WalletButton: React.FC = () => {
  return (
    <Link to="/wallet">
      <Button variant="ghost" size="sm" className="flex items-center text-blue-600 hover:text-blue-800">
        <Wallet className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">Wallet</span>
      </Button>
    </Link>
  );
};

export default WalletButton;
