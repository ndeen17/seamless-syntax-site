import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import { fetchAllProducts, Product } from "@/services/digitalProductsService";
import { getPlatformImage } from "@/utils/platformImages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

const DigitalProducts = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const searchQuery = searchParams.get("search") || "";

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: fetchAllProducts,
  });

  // Updated scroll behavior
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Add timeout to ensure DOM is ready
        setTimeout(() => {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }, 100);
      }
    }
  }, [location.hash, products]);

  // Group products by platform
  const groupedProducts = React.useMemo(() => {
    if (!products) return {};
    return products.reduce((acc: { [key: string]: Product[] }, product) => {
      if (!acc[product.platform_name]) {
        acc[product.platform_name] = [];
      }
      acc[product.platform_name].push(product);
      return acc;
    }, {});
  }, [products]);

  const filteredGroups = React.useMemo(() => {
    if (!groupedProducts) return {};
    const filtered: { [key: string]: Product[] } = {};
    
    Object.entries(groupedProducts).forEach(([platform, platformProducts]) => {
      const filteredProducts = platformProducts.filter(
        product => product.platform_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredProducts.length > 0) {
        filtered[platform] = filteredProducts;
      }
    });
    return filtered;
  }, [groupedProducts, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Accounts hub</h1>
          <p className="text-gray-600">
            Explore our products and discover amazing deals.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <Skeleton className="h-6 w-48 mb-4" />
                <div className="space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} className="h-16 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertDescription>
              Unable to load products. Please try again later.
            </AlertDescription>
          </Alert>
        ) : Object.entries(filteredGroups).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(filteredGroups).map(([platform, platformProducts]) => (
              <div 
                key={platform} 
                id={platform.toLowerCase()} 
                className="bg-white rounded-lg shadow-sm overflow-hidden scroll-mt-32"
              >
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{platform} accounts</h2>
                  <span className="text-sm text-gray-500">{platformProducts.length} total accounts</span>
                </div>
                <div className="divide-y">
                  {platformProducts.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 hover:bg-gray-50 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          <img
                            src={getPlatformImage(product.platform_name)}
                            alt={product.platform_name}
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">Aged accounts</h3>
                          <p className="text-sm text-gray-500">{product.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">{product.stock_quantity} in stock</span>
                        <Link
                          to={`/digital-products/${product.id}`}
                          className="px-4 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DigitalProducts;
