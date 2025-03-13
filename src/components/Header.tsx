
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ChevronDown, Menu, Globe, Flag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SupportTicketButton from './SupportTicketButton';

const Header = () => {
  return (
    <header className="w-full bg-white">
      {/* Top dark navbar */}
      <div className="bg-gray-800 text-white py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="text-sm">
            <span>AccsMarket - Social Media Accounts Store</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm flex items-center">
              <span className="mr-1">@accsmarket</span>
            </a>
            
            <Link to="/signup">
              <Button size="sm" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <span className="text-sm">+ Sign Up</span>
              </Button>
            </Link>
            
            <Link to="/login">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <span className="text-sm">Login</span>
              </Button>
            </Link>
            
            <div className="flex items-center space-x-2">
              <a href="#" className="flex items-center">
                <Flag className="h-4 w-4 mr-1" />
                <span className="text-sm">Eng</span>
              </a>
              <a href="#" className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                <span className="text-sm">Рус</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Middle navigation */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center text-blue-900">
                <span className="text-sm font-medium flex items-center">
                  <span className="bg-red-600 text-white px-2 py-1 rounded mr-1">ACCS</span>
                  market.com
                </span>
              </Link>
              
              {/* Replace the support link with our new support ticket button */}
              <SupportTicketButton />
              
              <Link to="/" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                Home
              </Link>
              
              <div className="relative group">
                <button className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                  Account Types <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Instagram</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Facebook</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Twitter</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">LinkedIn</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Gmail</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">TikTok</a>
                </div>
              </div>
              
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                FAQ
              </a>
              
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                Terms of use
              </a>
            </div>
            
            <div>
              <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center">
                Become a seller
              </a>
            </div>
          </nav>
        </div>
      </div>
      
      {/* Search bar section */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4 flex items-center">
          <div className="flex items-center space-x-4 w-full">
            <div className="relative flex-none">
              <Button variant="default" className="bg-green-600 hover:bg-green-700 flex items-center">
                <span>Social Media</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative flex-grow">
              <div className="flex">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for social media accounts"
                    className="w-full pl-10 pr-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <Button className="bg-green-600 hover:bg-green-700 rounded-l-none">
                  Advanced search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Blue Banner */}
      <div className="bg-blue-50 py-2 text-center text-sm">
        <span className="text-blue-900">Verified social media accounts with full access. Buy securely today!</span>
        <a href="#" className="ml-1 text-blue-600 hover:underline font-medium">Learn more</a>
      </div>
    </header>
  );
};

export default Header;
