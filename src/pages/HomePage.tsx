import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import UserHomePage from "./UserHomePage";
import GuestHomePage from "./GuestHomePage";

const HomePage: React.FC = () => {
  const { checkAuthStatus, isAuthenticated } = useAuth();
  const [status, setstatus] = useState(false);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await checkAuthStatus();
        // console.log(response);
        if (response.message === "Please log in again.") {
          setstatus(false);
        } else {
          setstatus(true);
        }
      } catch (error) {
        console.error("Error in fetching auth status:", error);
      }
    };

    fetchAuthStatus();
  }, []);
  return status ? <UserHomePage /> : <GuestHomePage />;
};

export default HomePage;
