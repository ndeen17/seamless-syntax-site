
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { authService } from "@/services/authService";

const WalletButton: React.FC = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setIsLoading(true);
        const user = await authService.verifyUser();
        
        // Uncomment and implement this when wallet service is ready
        // if (user && user.id) {
        //   const walletData = await getWalletBalance(user.id);
        //   if (walletData) {
        //     setBalance(walletData.balance);
        //   }
        // }
      } catch (error) {
        console.error("Failed to fetch wallet balance:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, []);

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
      <span className="hidden sm:inline">
        {isLoading
          ? "Loading..."
          : balance !== null
          ? `$${balance.toFixed(2)}`
          : "My Wallet"}
      </span>
    </Button>
  );
};

export default WalletButton;
