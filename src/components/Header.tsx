import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, ChevronDown, Menu, Globe, Flag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SupportTicketButton from "./SupportTicketButton";
import WalletButton from "./WalletButton";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { checkAuthStatus } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await checkAuthStatus();
        // console.log(response);
        if (response.message === "Please log in again.") {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error in fetching auth status:", error);
      }
    };

    fetchAuthStatus();
  }, []);

  return (
    <header className="w-full bg-white">
      {/* Top dark navbar */}
      <div className="bg-gray-800 text-white py-2">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm truncate max-w-[200px] sm:max-w-none">
            <span>AccsMarket - Social Media Accounts Store</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <a href="#" className="text-sm flex items-center">
              <span className="mr-1 hidden sm:inline">@accsmarket</span>
            </a>

            {/* Show sign up and login buttons only if not authenticated */}
            {!isAuthenticated && (
              <div className="flex items-center gap-2">
                <Link to="/signup" className="hidden sm:block">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white/10"
                  >
                    <span className="text-sm">+ Sign Up</span>
                  </Button>
                </Link>

                <Link to="/login">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <span className="text-sm sm:block">Login</span>
                  </Button>
                </Link>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <a href="#" className="flex items-center">
                <Flag className="h-4 w-4" />
                <span className="text-sm hidden sm:inline ml-1">Eng</span>
              </a>
              <a href="#" className="flex items-center">
                <Globe className="h-4 w-4" />
                <span className="text-sm hidden sm:inline ml-1">Рус</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Middle navigation - Mobile & Desktop */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center text-blue-900 mr-4">
                <span className="text-sm font-medium flex items-center">
                  <span className="bg-red-600 text-white px-2 py-1 rounded mr-1">
                    ACCS
                  </span>
                  <span className="hidden sm:inline">market.com</span>
                </span>
              </Link>

              {/* Mobile menu button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 sm:w-80">
                  <div className="flex flex-col gap-4 py-4">
                    <Link
                      to="/"
                      className="text-sm font-medium text-gray-700 hover:text-blue-600 px-4 py-2"
                    >
                      Home
                    </Link>

                    <div className="px-4 py-2">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Account Types
                      </p>
                      <div className="ml-2 flex flex-col gap-2">
                        <a
                          href="#"
                          className="text-sm text-gray-700 hover:text-blue-600"
                        >
                          Instagram
                        </a>
                        <a
                          href="#"
                          className="text-sm text-gray-700 hover:text-blue-600"
                        >
                          Facebook
                        </a>
                        <a
                          href="#"
                          className="text-sm text-gray-700 hover:text-blue-600"
                        >
                          Twitter
                        </a>
                        <a
                          href="#"
                          className="text-sm text-gray-700 hover:text-blue-600"
                        >
                          LinkedIn
                        </a>
                        <a
                          href="#"
                          className="text-sm text-gray-700 hover:text-blue-600"
                        >
                          Gmail
                        </a>
                        <a
                          href="#"
                          className="text-sm text-gray-700 hover:text-blue-600"
                        >
                          TikTok
                        </a>
                      </div>
                    </div>

                    <a
                      href="#"
                      className="text-sm font-medium text-gray-700 hover:text-blue-600 px-4 py-2"
                    >
                      FAQ
                    </a>

                    <a
                      href="#"
                      className="text-sm font-medium text-gray-700 hover:text-blue-600 px-4 py-2"
                    >
                      Terms of use
                    </a>

                    <Link
                      to="/orders"
                      className="text-sm font-medium text-gray-700 hover:text-blue-600 px-4 py-2"
                    >
                      My Orders
                    </Link>

                    <Link
                      to="/wallet"
                      className="text-sm font-medium text-gray-700 hover:text-blue-600 px-4 py-2"
                    >
                      My Wallet
                    </Link>

                    <a
                      href="#"
                      className="text-sm font-medium text-purple-600 hover:text-purple-700 px-4 py-2"
                    >
                      Become a seller
                    </a>

                    {!isAuthenticated && (
                      <Link to="/signup" className="md:hidden px-4 py-2">
                        <Button variant="outline" className="w-full">
                          <span className="text-sm">+ Sign Up</span>
                        </Button>
                      </Link>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop navigation */}
              <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-8">
                <SupportTicketButton />

                <Link
                  to="/"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Home
                </Link>

                <div className="relative group">
                  <button className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                    Account Types <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Instagram
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Facebook
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Twitter
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Gmail
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      TikTok
                    </a>
                  </div>
                </div>

                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  FAQ
                </a>

                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Terms of use
                </a>

                <Link
                  to="/orders"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  My Orders
                </Link>
              </div>
            </div>

            <div className="hidden md:flex md:items-center md:space-x-4">
              {isAuthenticated && <WalletButton />}{" "}
              {/* Show WalletButton only if authenticated */}
              <a
                href="#"
                className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center"
              >
                Become a seller
              </a>
            </div>

            {/* Mobile Support Button */}
            <div className="md:hidden flex items-center space-x-2">
              {isAuthenticated && <WalletButton />}{" "}
              {/* Show WalletButton only if authenticated */}
              <SupportTicketButton />
            </div>
          </nav>
        </div>
      </div>

      {/* Search bar section */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full sm:w-auto sm:flex-none mb-2 sm:mb-0">
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700 flex items-center w-full sm:w-auto justify-between"
              >
                <span>Social Media</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="relative w-full">
              <div className="flex flex-col sm:flex-row w-full gap-2">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for accounts"
                    className="w-full pl-10 pr-3 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto sm:rounded-l-none">
                  Advanced search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blue Banner */}
      <div className="bg-blue-50 py-2 text-center text-xs sm:text-sm px-2">
        <span className="text-blue-900">
          Verified social media accounts with full access. Buy securely today!
        </span>
        <a href="#" className="ml-1 text-blue-600 hover:underline font-medium">
          Learn more
        </a>
      </div>
    </header>
  );
};

export default Header;
