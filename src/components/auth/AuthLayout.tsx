
import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <Link to="/" className="inline-block">
              <span className="sr-only">AccsMarket</span>
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-900 flex items-center">
                  <span className="bg-red-600 text-white px-3 py-1 rounded mr-1">ACCS</span>
                  market.com
                </span>
              </div>
            </Link>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
