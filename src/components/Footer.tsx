
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="container-custom py-12">
        {/* Get a fast start section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4">Get a fast start under $2,500</h2>
          <p className="text-gray-600 mb-6">Explore proven starter sites that are cash-flowing and ready for your expertise</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            {/* Starter Site Card */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-40 h-32 md:h-full bg-gray-100 flex items-center justify-center p-4">
                  <div className="w-24 h-24 bg-blue-50 flex items-center justify-center rounded">
                    <span className="text-xl font-semibold text-flippa-blue">T</span>
                  </div>
                </div>
                
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-flippa-navy">ThemeForest Newsletter</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm font-medium text-gray-600">Newsletter</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-flippa-navy">USD $150</div>
                      <div className="text-xs text-gray-500">Buy it Now</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <div className="text-xs text-gray-500">Monthly Rev</div>
                      <div className="font-medium">$0</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Subscribers</div>
                      <div className="font-medium">500</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Age</div>
                      <div className="font-medium">3 mos</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-t border-gray-200">
                <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
                  Watch
                </Button>
                <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
                  View Listing
                </Button>
              </div>
            </div>
            
            {/* Second Starter Site Card */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-40 h-32 md:h-full bg-gray-100 flex items-center justify-center p-4">
                  <div className="w-24 h-24 bg-blue-50 flex items-center justify-center rounded">
                    <span className="text-xl font-semibold text-flippa-blue">G</span>
                  </div>
                </div>
                
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-flippa-navy">GainDigital.com (Amazon Affiliate, Niche)</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm font-medium text-gray-600">Affiliate</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-flippa-navy">USD $150</div>
                      <div className="text-xs text-gray-500">Buy it Now</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <div className="text-xs text-gray-500">Monthly Rev</div>
                      <div className="font-medium">$20</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Sessions</div>
                      <div className="font-medium">1,500</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Age</div>
                      <div className="font-medium">3 mos</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-t border-gray-200">
                <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
                  Watch
                </Button>
                <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
                  View Listing
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main footer links */}
        <div className="grid md:grid-cols-6 gap-8">
          <div className="md:col-span-2">
            <a href="/" className="block mb-4">
              <span className="text-2xl font-bold text-flippa-navy">Flippa.</span>
            </a>
            <p className="text-gray-600 text-sm mb-4">
              The #1 platform to buy and sell online businesses, trusted by over 3 million entrepreneurs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                <span className="text-gray-600 text-sm">F</span>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                <span className="text-gray-600 text-sm">T</span>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                <span className="text-gray-600 text-sm">L</span>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                <span className="text-gray-600 text-sm">I</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Buy</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">Websites</a></li>
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">Ecommerce</a></li>
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">SaaS</a></li>
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">Apps</a></li>
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">Content Sites</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Sell</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">List Your Business</a></li>
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">Broker Services</a></li>
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">Website Valuation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">Success Stories</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">Podcast</a></li>
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">Affiliate Program</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">Press</a></li>
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-flippa-blue text-sm">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-500">&copy; 2023 Flippa.com Pty Ltd. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-sm text-gray-500 hover:text-flippa-blue">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-flippa-blue">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-flippa-blue">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
