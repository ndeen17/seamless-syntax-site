import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderList from "@/components/orders/OrderList";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Filter } from "lucide-react";
import { getOrders } from "@/services/orderService";
import { toast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";

// Mock orders data
const mockOrders = [
  {
    id: "ORD-1234",
    productName: "Instagram Account (10K Followers)",
    date: "2023-05-20T14:30:00",
    status: "completed" as const,
    totalAmount: 99.99,
  },
  {
    id: "ORD-5678",
    productName: "Twitter Verified Account",
    date: "2023-05-15T10:45:00",
    status: "processing" as const,
    totalAmount: 149.99,
  },
  {
    id: "ORD-9012",
    productName: "Facebook Business Page",
    date: "2023-05-10T09:15:00",
    status: "pending" as const,
    totalAmount: 79.99,
  },
  {
    id: "ORD-3456",
    productName: "TikTok Account (5K Followers)",
    date: "2023-05-05T16:20:00",
    status: "cancelled" as const,
    totalAmount: 59.99,
  },
];

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  // Check if user is already logged in
  // useEffect(() => {
  //   document.title = "My Orders - AccsMarket";
  //   const checkAuthStatus = async () => {
  //     try {
  //       const response = await authService.verifyUser();
  //       if (response.id) {
  //         // console.log(response);
  //         setUserId(response.id);
  //         setUserEmail(response.email);
  //         fetchOrders(response.id);
  //       }
  //     } catch (error) {
  //       console.error("Auth status check failed:", error);
  //     }
  //   };

  //   checkAuthStatus();
  // }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await authService.verifyUser();
        if (response) {
          console.log(response);
          setUserId(response.id);
          // const userTickets = await ticketService.getUserTickets(response);
          // if(userTickets.message==="Tickets not found.")
          // setTickets(userTickets);
        } else {
          navigate("/login");
          return null;
        }
      } catch (error) {
        console.error("Authentication error", error);
        // navigate("/login");
        return null;
      }
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    // Scroll to the top of the page when the component is mounted
    window.scrollTo(0, 0);
  }, []);

  const fetchOrders = async (id: string) => {
    try {
      const data = await getOrders(id);
      console.log(data.order);
      setOrders(data.order || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to load orders",
        description:
          "There was an error loading your orders. Please refresh the page.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center mb-2">
              <ShoppingCart className="h-6 w-6 mr-2 text-blue-600" />
              My Orders
            </h1>
            <p className="text-gray-600">View and manage your orders</p>
          </div>

          {/* <div className="mt-4 sm:mt-0">
            <Link to="/create-order">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-1" />
                New Order
              </Button>
            </Link>
          </div> */}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Order History</h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </div>
            <OrderList orders={orders} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default OrdersPage;
