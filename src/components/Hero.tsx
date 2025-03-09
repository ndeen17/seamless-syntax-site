
import React from 'react';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-hero-pattern text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            #1 Platform to Buy & Sell
            <br />
            <span className="text-white/90">Affiliate sites</span>
          </h1>
          
          {/* Search bar */}
          <div className="mt-8 max-w-2xl mx-auto relative">
            <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="e.g. Shopping, Travel..."
                className="flex-grow px-6 py-4 text-gray-800 focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 transition-colors duration-300 flex items-center">
                <Search className="h-5 w-5" />
                <span className="ml-2">Search</span>
              </button>
            </div>
          </div>
          
          {/* Category pills */}
          <div className="flex flex-wrap justify-center mt-6 gap-2">
            <div className="bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-sm border border-white/20">
              Trending
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-sm border border-white/20">
              SaaS
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-sm border border-white/20">
              eCommerce
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-sm border border-white/20">
              Content
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-sm border border-white/20">
              Marketplace
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-sm border border-white/20">
              Service
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-sm border border-white/20">
              App
            </div>
          </div>
          
          {/* Payment methods */}
          <div className="mt-12 mb-4">
            <p className="text-sm text-white/70 mb-4">Over 300,000 people trust AccsMarket globally</p>
            <div className="flex justify-center space-x-2 overflow-x-auto py-2">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="h-6 w-10 bg-white/20 rounded-sm animate-pulse-light" style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
