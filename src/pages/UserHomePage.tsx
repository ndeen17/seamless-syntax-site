import React, { useEffect } from "react";
import Header from "@/components/UserHeader";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import WalletButton from "@/components/WalletButton";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const UserHomePage = () => {
  const [status, setstatus] = React.useState(false);
  const { checkAuthStatus } = useAuth();
  const navigate = useNavigate(); // Initialize the navigate hook

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

  useEffect(() => {
    if (!status) {
      navigate("/"); // Redirect to the visitors' page
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Full-featured header for signed in users */}
      <Header />
      <main className="flex-grow">
        <Hero />
        <section className="container mx-auto px-4 py-12">
          <WalletButton /> {/* Add WalletButton for signed-in users */}
          <FeaturedProducts />
          {/* Other full-access features (orders, account management, etc.) can be added here */}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UserHomePage;
