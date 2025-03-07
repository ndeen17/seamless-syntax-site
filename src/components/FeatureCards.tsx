
import React from 'react';
import { ArrowRight, Search, Package, HeartHandshake, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";

const FeatureCards = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-12">What would you like to do?</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Buy & Sell Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">Buy & Sell End-to-End</h3>
            <p className="text-gray-600 mb-6">No agencies or brokers. Direct connection between buyers and sellers through our price marketplace.</p>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-flippa-lightBlue rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-flippa-blue" />
              </div>
              <div>
                <h4 className="font-medium">Low flat fee</h4>
                <p className="text-sm text-gray-500">No commission or hidden fees</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Button variant="outline" className="border-gray-200 text-gray-700">
                Browse Businesses
              </Button>
              <Button className="bg-flippa-blue hover:bg-blue-700 text-white">
                List Now
              </Button>
            </div>
          </div>
          
          {/* Select Services Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">Select Services For Your Deal</h3>
            <p className="text-gray-600 mb-6">Choose a broker or service to work with to help negotiate and facilitate your business transaction.</p>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-flippa-lightBlue rounded-full flex items-center justify-center">
                <HeartHandshake className="h-6 w-6 text-flippa-blue" />
              </div>
              <div>
                <h4 className="font-medium">Highly vetted – highly curated</h4>
                <p className="text-sm text-gray-500">Only the best service providers</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button className="bg-flippa-blue hover:bg-blue-700 text-white">
                Find Services
              </Button>
            </div>
          </div>
        </div>
        
        {/* Partners */}
        <div className="mt-16 grid grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Your Objective</p>
            <div className="h-16 bg-white rounded-md border border-gray-200 flex items-center justify-center">
              <span className="font-medium text-gray-800">I want help</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Level</p>
            <div className="h-16 bg-white rounded-md border border-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800">Premium Tier</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Marketplace</p>
            <div className="h-16 bg-white rounded-md border border-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-800">Websites</span>
            </div>
          </div>
        </div>
        
        {/* Discover Section */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-4">
              <Search className="h-5 w-5 text-flippa-blue mr-2" />
              <h3 className="font-medium">Businesses for sale</h3>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex-shrink-0 mt-1"></div>
                  <div>
                    <p className="text-sm font-medium">Business #{i + 1}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span className="inline-block w-16">Type</span>
                      <span>eCommerce</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="inline-block w-16">Price</span>
                      <span>$125,000</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-4">
              <Users className="h-5 w-5 text-flippa-blue mr-2" />
              <h3 className="font-medium">Meet our Brokers</h3>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 1 }).map((_, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">Mark Peterson</p>
                    <p className="text-xs text-gray-500">eCommerce Advisor</p>
                    <p className="text-xs text-gray-500">Empire Flippers</p>
                    <div className="flex mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-4 w-4 text-yellow-400">★</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-4">
              <Users className="h-5 w-5 text-flippa-blue mr-2" />
              <h3 className="font-medium">Buyer Mandates</h3>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 1 }).map((_, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">Peter Jackson</p>
                    <p className="text-xs text-gray-500">Private Investor</p>
                    <p className="text-xs text-gray-500">PJ Acquisitions</p>
                    <div className="flex mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-4 w-4 text-yellow-400">★</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-4">
              <Search className="h-5 w-5 text-flippa-blue mr-2" />
              <h3 className="font-medium">Get a Free Valuation</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Find out what your online business is worth with our free valuation tool</p>
            <div className="mt-8">
              <Button className="w-full bg-flippa-blue hover:bg-blue-700 text-white">
                Get Free Valuation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
