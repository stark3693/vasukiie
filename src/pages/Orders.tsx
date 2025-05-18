import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShoppingBag, Package, CreditCard, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface OrderItem {
  id: string;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total_price: number;
  date: string;
  status: string;
  estimatedDelivery: string;
  paymentMethod: string;
  paymentStatus: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
  } | null;
}

const Orders = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // If not authenticated and finished loading, redirect to auth page
  if (!user && !authLoading) {
    return <Navigate to="/auth" />;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      try {
        // Fetch orders from Supabase
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select(`
            id,
            total_price,
            created_at,
            estimated_delivery,
            order_status,
            payment_method,
            payment_status,
            addresses:address_id (street, city, state, zip_code)
          `)
          .order('created_at', { ascending: false });

        if (ordersError) throw ordersError;

        // For each order, fetch its items
        const ordersWithItems = await Promise.all(
          ordersData.map(async (order) => {
            // Get order items
            const { data: itemsData, error: itemsError } = await supabase
              .from("order_items")
              .select("id, product_id, quantity, price, color, size")
              .eq("order_id", order.id);

            if (itemsError) throw itemsError;
            
            // Map to our OrderItem format
            // In a real application, we would fetch product details from the database
            // Here we're using dummy images since our products are stored locally
            const items: OrderItem[] = itemsData.map(item => ({
              id: item.id,
              product_id: item.product_id,
              name: `Product #${item.product_id}`, // In a real app, fetch product name
              price: item.price,
              quantity: item.quantity,
              image: `/placeholder.svg`, // Replace with real product images
              color: item.color || undefined,
              size: item.size || undefined
            }));

            return {
              id: order.id,
              items,
              total_price: order.total_price,
              date: order.created_at,
              status: order.order_status,
              estimatedDelivery: order.estimated_delivery,
              paymentMethod: order.payment_method,
              paymentStatus: order.payment_status,
              address: order.addresses
            };
          })
        );

        setOrders(ordersWithItems);
      } catch (error: any) {
        toast.error("Failed to load orders", {
          description: error.message
        });
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM dd, yyyy");
    } catch (error) {
      return "Invalid Date";
    }
  };

  const isDelivered = (estimatedDelivery: string) => {
    return new Date() > new Date(estimatedDelivery);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container-custom pt-32 pb-16 flex items-center justify-center">
          <p>Loading your orders...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container-custom pt-32 pb-16">
        <h1 className="heading-lg mb-8">My Orders</h1>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-sm shadow p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                  <div>
                    <h2 className="heading-sm mb-1">Order {order.id.slice(0, 8)}</h2>
                    <p className="text-gray-500 text-sm">
                      Placed on {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <Badge 
                      className={`text-xs py-1 px-2 ${getStatusColor(
                        isDelivered(order.estimatedDelivery) ? "Delivered" : order.status
                      )}`}
                    >
                      {isDelivered(order.estimatedDelivery) ? "Delivered" : "In Transit"}
                    </Badge>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Total:</span> ${order.total_price.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 py-4">
                  {order.address && (
                    <div className="mb-3 text-sm">
                      <span className="font-medium">Shipping to:</span> {order.address.street}, {order.address.city}, {order.address.state} {order.address.zip_code}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-4 mb-3">
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-1">Payment:</span> 
                      <Badge className={`text-xs ml-1 ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-medium mr-1">Method:</span>
                      {order.paymentMethod === "cod" ? (
                        <div className="flex items-center">
                          <DollarSign className="h-3.5 w-3.5 mr-1" />
                          <span>Cash on Delivery</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <CreditCard className="h-3.5 w-3.5 mr-1" />
                          <span>Online Payment</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="mb-2 text-sm font-medium">
                    {isDelivered(order.estimatedDelivery) 
                      ? "Delivered on " + formatDate(order.estimatedDelivery)
                      : "Estimated delivery by " + formatDate(order.estimatedDelivery)}
                  </p>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="items">
                      <AccordionTrigger className="text-sm">
                        View Order Details ({order.items.length} {order.items.length === 1 ? "item" : "items"})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 mt-2">
                          {order.items.map((item) => (
                            <div key={item.id} 
                                className="flex gap-4 border-b border-gray-100 pb-4">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-16 h-20 object-cover rounded-sm"
                              />
                              <div className="flex-grow">
                                <h3 className="font-medium">Product #{item.product_id}</h3>
                                <div className="text-sm text-gray-500 mt-1">
                                  {item.color && <span className="mr-2">Color: {item.color}</span>}
                                  {item.size && <span>Size: {item.size}</span>}
                                </div>
                                <div className="text-sm mt-1">Quantity: {item.quantity}</div>
                                <div className="text-sm font-medium mt-1">${(item.price * item.quantity).toFixed(2)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="heading-md mb-4">No Orders Yet</h2>
            <p className="mb-8 text-gray-600 max-w-md mx-auto">
              You haven't placed any orders yet. Browse our beautiful collection and find something you'll love.
            </p>
            <Link to="/products">
              <Button className="bg-boutique-taupe hover:bg-boutique-taupe/90">
                Browse Products
              </Button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
