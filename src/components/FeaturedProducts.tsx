
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedProducts, Product } from "@/services/digitalProductsService";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getPlatformImage } from "@/utils/platformImages";

const FeaturedProducts = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: fetchFeaturedProducts,
  });

  const truncateDescription = (description) => {
    if (!description) return '';
    const words = description.split(" ");
    if (words.length > 10) {
      return words.slice(0, 5).join(" ") + "...";
    }
    return description;
  };

  // Group products by platform - with proper null checking
  const groupedProducts = React.useMemo(() => {
    if (!products || !Array.isArray(products)) return {};
    
    return products.reduce((acc: { [key: string]: Product[] }, product) => {
      if (!product || !product.platform_name) return acc;
      
      if (!acc[product.platform_name]) {
        acc[product.platform_name] = [];
      }
      acc[product.platform_name].push(product);
      return acc;
    }, {});
  }, [products]);

  if (isLoading) {
    return (
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
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Unable to load featured products. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  // If groupedProducts is empty or invalid, show a message
  if (!groupedProducts || Object.keys(groupedProducts).length === 0) {
    return (
      <Alert>
        <AlertDescription>
          No featured products available at the moment.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedProducts).map(([platform, platformProducts]) => (
        <div
          key={platform}
          id={platform.toLowerCase()}
          className="bg-white w-[99%] mx-auto rounded-lg shadow-sm overflow-hidden scroll-mt-32 sm:w-[65%]"
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-l font-bold">{platform} accounts</h2>
            <span className="text-sm text-gray-500">
              {platformProducts.reduce(
                (total, product) => total + (product.stock_quantity || 0),
                0
              )}{" "}
              total accounts
            </span>
          </div>
          <div className="divide-y">
            {platformProducts.map((product) => {
              let borderClass = "";
              let stockMessage = `${product.stock_quantity || 0} in stock`;
              if (!product.stock_quantity) {
                borderClass = "border-red-800";
              } else if (product.stock_quantity < 10) {
                borderClass = "border-yellow-800";
              }

              return (
                <div
                  key={product.id}
                  className={`p-4 hover:bg-gray-50 flex items-center justify-between transition-colors border ${borderClass} rounded-lg mb-3`}
                >
                  <div className="flex items-center space-x-4 w-full">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                      <img
                        src={getPlatformImage(product.platform_name)}
                        alt={product.platform_name}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div className="w-full">
                      <h3 className="font-medium">{product.category || 'Unknown'}</h3>
                      <p className="text-sm text-gray-500">
                        {truncateDescription(product.description)}
                      </p>
                      <span
                        className={`block text-sm font-bold ${borderClass} mt-2`}
                      >
                        {stockMessage}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Link
                      to={`/digital-products/${product.id}`}
                      className="px-4 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;
