
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="bg-hero-pattern text-white">
      <div className="container mx-auto px-4 py-10 md:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 px-2">
            #1 Platform to Buy & Sell
            <br />
            <span className="text-white/90">Social Media Accounts</span>
          </h1>
          
          {/* Search bar */}
          <div className="mt-6 md:mt-8 max-w-2xl mx-auto relative">
            <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg sm:rounded-full overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="e.g. Instagram, Facebook..."
                className="w-full flex-grow px-4 sm:px-6 py-3 sm:py-4 text-gray-800 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-4 transition-colors duration-300 flex items-center justify-center mt-1 sm:mt-0">
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="ml-2">Search</span>
              </button>
            </div>
          </div>
          
          {/* Category pills */}
          <div className="flex flex-wrap justify-center mt-6 gap-2 px-2">
            <div className="bg-white/10 backdrop-blur-sm text-white rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm border border-white/20">
              Trending
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-white rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm border border-white/20">
              Instagram
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-white rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm border border-white/20">
              Facebook
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-white rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm border border-white/20">
              Twitter
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-white rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm border border-white/20">
              LinkedIn
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-white rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm border border-white/20">
              Gmail
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-white rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm border border-white/20">
              TikTok
            </div>
          </div>
          
          {/* Payment methods */}
          <div className="mt-8 sm:mt-12 mb-4">
            <p className="text-xs sm:text-sm text-white/70 mb-2 sm:mb-4">Over 300,000 people trust AccsMarket globally</p>
            <div className="flex justify-center gap-1 sm:gap-2 overflow-x-auto py-2 px-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-5 sm:h-6 w-8 sm:w-10 bg-white/20 rounded-sm animate-pulse-light" style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
