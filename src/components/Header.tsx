
import React from 'react';
import { Search, User, ChevronDown, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-flippa-navy">Flippa.</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-flippa-blue">
                Buy <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Websites</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Applications</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Online Businesses</a>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-flippa-blue">
                Sell <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">List Your Business</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Broker Services</a>
              </div>
            </div>
            <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-flippa-blue">Why Flippa</a>
            <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-flippa-blue">Blog</a>
            <div className="relative group">
              <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-flippa-blue">
                Tools <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Valuation Tool</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Resources</a>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-flippa-blue">
                Resources <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Help Center</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Success Stories</a>
              </div>
            </div>
          </nav>

          {/* Right Side Items */}
          <div className="flex items-center space-x-2">
            <a href="#" className="hidden md:block text-sm font-medium text-gray-700 hover:text-flippa-blue px-2">Get a Free Valuation</a>
            <Button className="hidden sm:inline-flex bg-white text-flippa-blue border border-flippa-blue hover:bg-flippa-lightBlue">
              Log in
            </Button>
            <Button className="hidden sm:inline-flex bg-flippa-blue hover:bg-blue-700 text-white transition-colors duration-300">
              Sign up
            </Button>
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Blue Banner */}
      <div className="bg-flippa-lightBlue py-2 text-center text-sm">
        <span className="text-flippa-navy">Just like a SnapChat but for the web? See it now.</span>
        <a href="#" className="ml-1 text-flippa-blue hover:underline font-medium">Learn more</a>
      </div>
    </header>
  );
};

export default Header;
