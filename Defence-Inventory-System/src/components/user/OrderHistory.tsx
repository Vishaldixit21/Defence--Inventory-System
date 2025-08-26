
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Package, DollarSign, Truck } from "lucide-react";

interface OrderHistoryProps {
  agencyName: string;
}

export const OrderHistory = ({ agencyName }: OrderHistoryProps) => {
  // Mock order history data
  const orders = [
    {
      id: "ORD-001",
      orderDate: "2024-06-20",
      status: "pending",
      items: [
        { name: "Steel Security Fence Panel", quantity: 50, price: 150 },
        { name: "Concrete Fence Posts", quantity: 25, price: 80 }
      ],
      totalAmount: 9500,
      deliveryDate: "2024-07-15",
      trackingNumber: null
    },
    {
      id: "ORD-005",
      orderDate: "2024-05-15",
      status: "delivered",
      items: [
        { name: "Barbed Wire Coils", quantity: 20, price: 45 },
        { name: "Security Gate Hardware", quantity: 5, price: 300 }
      ],
      totalAmount: 2400,
      deliveryDate: "2024-05-25",
      trackingNumber: "TRK-789012"
    },
    {
      id: "ORD-006",
      orderDate: "2024-04-10",
      status: "delivered",
      items: [
        { name: "Anti-Climb Security Mesh", quantity: 30, price: 85 }
      ],
      totalAmount: 2550,
      deliveryDate: "2024-04-20",
      trackingNumber: "TRK-345678"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "processing": return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case "shipped": return <Badge className="bg-purple-100 text-purple-800">Shipped</Badge>;
      case "delivered": return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Package className="h-4 w-4 text-yellow-600" />;
      case "processing": return <Package className="h-4 w-4 text-blue-600" />;
      case "shipped": return <Truck className="h-4 w-4 text-purple-600" />;
      case "delivered": return <Package className="h-4 w-4 text-green-600" />;
      default: return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
        <Badge variant="secondary">{orders.length} Total Orders</Badge>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600">Your order history will appear here once you place your first order.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      Order {order.id}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Ordered: {order.orderDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        ${order.totalAmount.toLocaleString()}
                      </div>
                      {order.trackingNumber && (
                        <div className="flex items-center gap-1">
                          <Truck className="h-4 w-4" />
                          Tracking: {order.trackingNumber}
                        </div>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Order Items:</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">${(item.price * item.quantity).toLocaleString()}</div>
                            <div className="text-gray-600">
                              {item.quantity} × ${item.price}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t">
                    <div>
                      <div className="text-sm text-gray-600">
                        {order.status === "delivered" ? "Delivered" : "Expected Delivery"}
                      </div>
                      <div className="font-semibold">{order.deliveryDate}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      )}
                      {order.trackingNumber && order.status === "shipped" && (
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Track Package
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
