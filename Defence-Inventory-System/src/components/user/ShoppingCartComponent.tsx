
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ShoppingCart, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  specifications: string;
}

interface ShoppingCartComponentProps {
  cartItems: CartItem[];
  onRemoveFromCart: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export const ShoppingCartComponent = ({ 
  cartItems, 
  onRemoveFromCart, 
  onUpdateQuantity 
}: ShoppingCartComponentProps) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    // In a real app, this would process the order
    toast.success("Order submitted successfully! You will receive a confirmation email shortly.");
    
    // Clear cart after successful order
    cartItems.forEach(item => onRemoveFromCart(item.id));
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      onRemoveFromCart(productId);
    } else {
      onUpdateQuantity(productId, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600">Browse our product catalog to add items to your cart.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
        <div className="text-sm text-gray-600">{cartItems.length} items</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">SKU: {item.sku}</p>
                    <p className="text-sm text-gray-600">{item.specifications}</p>
                    <p className="text-lg font-bold text-blue-600 mt-2">
                      ${item.price} per unit
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Qty:</span>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                        className="w-20"
                      />
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold">
                        ${(item.price * item.quantity).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        ${item.price} × {item.quantity}
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRemoveFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
                size="lg"
              >
                <CreditCard className="h-5 w-5" />
                Place Order
              </Button>
              
              <div className="text-xs text-gray-500 text-center">
                By placing this order, you agree to our terms and conditions.
                You will receive an order confirmation email.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
