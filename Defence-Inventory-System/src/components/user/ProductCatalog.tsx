
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Package, Search } from "lucide-react";
import { toast } from "sonner";

interface ProductCatalogProps {
  onAddToCart: (product: any, quantity: number) => void;
}

export const ProductCatalog = ({ onAddToCart }: ProductCatalogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // Mock available products (only ready products shown to agencies)
  const products = [
    {
      id: "1",
      name: "Steel Security Fence Panel",
      sku: "SSF-001",
      price: 150,
      availableQuantity: 150,
      specifications: "2m x 3m, Galvanized Steel",
      description: "High-security steel fence panels suitable for perimeter protection",
      category: "Fence Panels"
    },
    {
      id: "3",
      name: "Barbed Wire Coils",
      sku: "BWC-003",
      price: 45,
      availableQuantity: 75,
      specifications: "Galvanized, 450mm diameter",
      description: "Professional grade barbed wire for additional security",
      category: "Wire & Coils"
    },
    {
      id: "6",
      name: "Security Gate Hardware",
      sku: "SGH-006",
      price: 300,
      availableQuantity: 40,
      specifications: "Heavy duty, corrosion resistant",
      description: "Complete hardware kit for security gates",
      category: "Hardware"
    },
    {
      id: "7",
      name: "Anti-Climb Security Mesh",
      sku: "ACSM-007",
      price: 85,
      availableQuantity: 120,
      specifications: "358 mesh, 3m height",
      description: "High-security anti-climb mesh fencing",
      category: "Mesh Fencing"
    },
    {
      id: "8",
      name: "Concrete Security Barriers",
      sku: "CSB-008",
      price: 450,
      availableQuantity: 30,
      specifications: "2m x 1m x 0.5m, Reinforced",
      description: "Heavy-duty concrete barriers for vehicle access control",
      category: "Barriers"
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities({ ...quantities, [productId]: quantity });
  };

  const handleAddToCart = (product: any) => {
    const quantity = quantities[product.id] || 1;
    if (quantity > product.availableQuantity) {
      toast.error(`Only ${product.availableQuantity} units available`);
      return;
    }
    onAddToCart(product, quantity);
    toast.success(`Added ${quantity} ${product.name}(s) to cart`);
    setQuantities({ ...quantities, [product.id]: 1 });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Product Catalog</h2>
        <Badge variant="secondary">{filteredProducts.length} Products Available</Badge>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products by name, SKU, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="text-sm text-gray-600 mt-1">SKU: {product.sku}</div>
                  <Badge variant="outline" className="mt-2">{product.category}</Badge>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Available</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">{product.description}</p>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Specifications:</span> {product.specifications}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Available:</span> {product.availableQuantity} units
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    ${product.price} per unit
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`quantity-${product.id}`} className="text-sm">
                      Quantity
                    </Label>
                    <Input
                      id={`quantity-${product.id}`}
                      type="number"
                      min="1"
                      max={product.availableQuantity}
                      value={quantities[product.id] || 1}
                      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Package className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search terms to find what you're looking for.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
