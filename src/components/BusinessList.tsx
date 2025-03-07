
import React from 'react';
import { Star, ChevronRight, Heart, ShoppingCart, Activity, BarChart, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface BusinessCardProps {
  title: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  monthlyNet: string;
  monthlyRevenue: string;
  yearlyProfit: string;
  multiplesType: string;
  multiples: string;
  age: string;
  tags?: string[];
  verified?: boolean;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  title,
  category,
  price,
  rating,
  reviews,
  monthlyNet,
  monthlyRevenue,
  yearlyProfit,
  multiplesType,
  multiples,
  age,
  tags,
  verified
}) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4 hover:shadow-md transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Left thumbnail */}
        <div className="w-full md:w-40 h-32 md:h-full bg-gray-100 flex items-center justify-center p-4 relative">
          <div className="w-24 h-24 bg-blue-50 flex items-center justify-center rounded">
            <Globe className="h-10 w-10 text-flippa-blue" />
          </div>
          {verified && (
            <div className="absolute top-2 left-2 bg-flippa-blue text-white text-xs px-2 py-1 rounded-full">
              Verified
            </div>
          )}
        </div>
        
        {/* Main content */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-flippa-navy hover:text-flippa-blue">
                {title}
              </h3>
              <div className="flex items-center mt-1">
                <span className="text-sm font-medium text-gray-600 mr-2">{category}</span>
                {rating > 0 && (
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({reviews} reviews)</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-flippa-navy">{price}</div>
              <div className="text-xs text-gray-500">Initial Asking Price</div>
            </div>
          </div>
          
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <span key={index} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <div className="text-xs text-gray-500">Monthly Net</div>
              <div className="font-medium">{monthlyNet}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Revenue</div>
              <div className="font-medium">{monthlyRevenue}/mo</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">{multiplesType}</div>
              <div className="font-medium">{multiples}x</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Age</div>
              <div className="font-medium">{age}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Yearly Profit</div>
              <div className="font-medium">{yearlyProfit}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Multiple</div>
              <div className="font-medium">{multiples}x</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-t border-gray-200">
        <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
          <Heart className="h-4 w-4 mr-1" />
          Watch
        </Button>
        <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
          View Listing
        </Button>
      </div>
    </div>
  );
};

const BusinessList = () => {
  const businesses = [
    {
      title: "SaaS | Business",
      category: "Software",
      price: "USD $650,000",
      rating: 4,
      reviews: 15,
      monthlyNet: "$16,000",
      monthlyRevenue: "$20,000",
      yearlyProfit: "$192,000",
      multiplesType: "Revenue Multiple",
      multiples: "2.7",
      age: "3 years 10 mos",
      tags: ["Verified Seller", "Financial Data Verified"],
      verified: true
    },
    {
      title: "Chrome Extension | Internet",
      category: "Internet",
      price: "USD $30,000",
      rating: 4,
      reviews: 8,
      monthlyNet: "$1,000",
      monthlyRevenue: "$1,000",
      yearlyProfit: "$12,000",
      multiplesType: "Revenue Multiple",
      multiples: "2.5",
      age: "1 year 2 mos",
      verified: false
    },
    {
      title: "SaaS | Education",
      category: "Education",
      price: "USD $16,250",
      rating: 3,
      reviews: 6,
      monthlyNet: "$650",
      monthlyRevenue: "$650",
      yearlyProfit: "$7,800",
      multiplesType: "Revenue Multiple",
      multiples: "2.1",
      age: "2 years 3 mos",
      verified: false
    },
    {
      title: "SaaS | Business",
      category: "Software",
      price: "USD $650,000",
      rating: 5,
      reviews: 22,
      monthlyNet: "$13,500",
      monthlyRevenue: "$18,200",
      yearlyProfit: "$162,000",
      multiplesType: "Revenue Multiple",
      multiples: "3.3",
      age: "4 years 11 mos",
      tags: ["Verified Seller", "Financial Data Verified"],
      verified: true
    },
    {
      title: "SaaS | General Knowledge",
      category: "Knowledge Base",
      price: "USD $156,000",
      rating: 4,
      reviews: 12,
      monthlyNet: "$3,250",
      monthlyRevenue: "$4,100",
      yearlyProfit: "$39,000",
      multiplesType: "Revenue Multiple",
      multiples: "3.2",
      age: "2 years 6 mos",
      verified: true
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-2xl font-bold mb-6">Browse top online businesses</h2>
        <p className="text-gray-600 mb-8">Plenty of proven, profitable businesses with strong growth potential to choose from.</p>
        
        {/* Filter tabs */}
        <div className="flex overflow-x-auto space-x-4 mb-8 py-2">
          <button className="px-4 py-2 text-sm font-medium text-flippa-blue border-b-2 border-flippa-blue">
            Businesses
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-flippa-blue border-b-2 border-transparent hover:border-gray-300">
            Content/Advertising
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-flippa-blue border-b-2 border-transparent hover:border-gray-300">
            Apps
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-flippa-blue border-b-2 border-transparent hover:border-gray-300">
            Domains
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-flippa-blue border-b-2 border-transparent hover:border-gray-300">
            Starter Sites
          </button>
        </div>
        
        {/* Business listings */}
        <div className="space-y-6">
          {businesses.map((business, index) => (
            <BusinessCard key={index} {...business} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessList;
