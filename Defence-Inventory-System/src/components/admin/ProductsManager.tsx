
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Wrench, CheckCircle, Clock } from "lucide-react";

export const ProductsManager = () => {
  // Mock product data
  const products = [
    {
      id: 1,
      name: "Steel Security Fence Panel",
      sku: "SSF-001",
      status: "ready",
      quantity: 150,
      location: "Warehouse A",
      lastUpdated: "2024-06-25",
      specifications: "2m x 3m, Galvanized Steel"
    },
    {
      id: 2,
      name: "Concrete Fence Posts",
      sku: "CFP-002",
      status: "in_production",
      quantity: 200,
      location: "Production Line 1",
      lastUpdated: "2024-06-26",
      specifications: "3m height, Reinforced"
    },
    {
      id: 3,
      name: "Barbed Wire Coils",
      sku: "BWC-003",
      status: "ready",
      quantity: 75,
      location: "Warehouse B",
      lastUpdated: "2024-06-24",
      specifications: "Galvanized, 450mm diameter"
    },
    {
      id: 4,
      name: "Electronic Gate System",
      sku: "EGS-004",
      status: "under_maintenance",
      quantity: 12,
      location: "Service Center",
      lastUpdated: "2024-06-27",
      specifications: "Automated, Card Access"
    },
    {
      id: 5,
      name: "Chain Link Fencing",
      sku: "CLF-005",
      status: "in_production",
      quantity: 300,
      location: "Production Line 2",
      lastUpdated: "2024-06-26",
      specifications: "50mm mesh, 2m height"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in_production": return <Clock className="h-4 w-4 text-blue-600" />;
      case "under_maintenance": return <Wrench className="h-4 w-4 text-orange-600" />;
      default: return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready": return <Badge className="bg-green-100 text-green-800">Ready</Badge>;
      case "in_production": return <Badge className="bg-blue-100 text-blue-800">In Production</Badge>;
      case "under_maintenance": return <Badge className="bg-orange-100 text-orange-800">Under Maintenance</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const statusCounts = {
    ready: products.filter(p => p.status === "ready").length,
    in_production: products.filter(p => p.status === "in_production").length,
    under_maintenance: products.filter(p => p.status === "under_maintenance").length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Product Inventory</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">Add New Product</Button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-700">{statusCounts.ready}</div>
                <div className="text-sm text-green-600">Ready Products</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-700">{statusCounts.in_production}</div>
                <div className="text-sm text-blue-600">In Production</div>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-700">{statusCounts.under_maintenance}</div>
                <div className="text-sm text-orange-600">Under Maintenance</div>
              </div>
              <Wrench className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products List */}
      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="text-sm text-gray-600 mt-1">SKU: {product.sku}</div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(product.status)}
                  {getStatusBadge(product.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Quantity</div>
                  <div className="font-semibold text-lg">{product.quantity}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Location</div>
                  <div className="font-semibold">{product.location}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Last Updated</div>
                  <div className="font-semibold">{product.lastUpdated}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Specifications</div>
                  <div className="font-semibold text-sm">{product.specifications}</div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm">View Details</Button>
                {product.status === "ready" && (
                  <Button variant="outline" size="sm" className="text-green-600 border-green-300">
                    Mark Available
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
