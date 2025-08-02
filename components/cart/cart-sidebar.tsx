"use client";

import type React from "react";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Minus, Trash2, ShoppingBag, Loader2, Tag } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import Image from "next/image";
import toast from "react-hot-toast";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } =
    useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
    // Reset coupon if cart items change
    setAppliedDiscount(0);
    setCouponMessage("");
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    // Reset coupon if cart items change
    setAppliedDiscount(0);
    setCouponMessage("");
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setShowCheckout(true);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      setCouponMessage("Please enter a coupon code.");
      return;
    }

    setSubmitting(true);
    setCouponMessage("");
    setAppliedDiscount(0);

    try {
      const response = await fetch("/api/shop/apply-coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ couponCode, totalAmount: getTotalPrice() }),
      });

      const data = await response.json();

      if (data.success) {
        setAppliedDiscount(data.discountApplied); // Changed from discountAmount
        setCouponMessage(
          `Coupon applied! You saved $${data.discountApplied.toFixed(2)}`
        ); // Changed from discountAmount
        toast.success("Coupon applied successfully!");
      } else {
        setCouponMessage(data.message || "Invalid or expired coupon.");
        toast.error(data.message || "Failed to apply coupon.");
      }
    } catch (error) {
      console.error("Apply coupon error:", error);
      setCouponMessage("An error occurred while applying the coupon.");
      toast.error("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !customerInfo.name ||
      !customerInfo.email ||
      !customerInfo.phone ||
      !customerInfo.address
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const orderData = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        customerInfo: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: customerInfo.address,
        },
        notes: customerInfo.notes,
        appliedCoupon:
          appliedDiscount > 0
            ? { discountAmount: appliedDiscount, code: couponCode }
            : undefined,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Order placed successfully!");
        clearCart();
        setCustomerInfo({
          name: "",
          email: "",
          phone: "",
          address: "",
          notes: "",
        });
        setCouponCode("");
        setAppliedDiscount(0);
        setCouponMessage("");
        setShowCheckout(false);
        onClose();
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (error) {
      toast.error("Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  const originalTotalPrice = getTotalPrice();
  const finalTotalPrice = Math.max(0, originalTotalPrice - appliedDiscount);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setShowCheckout(false); // Reset to cart view when closing
          setCouponCode("");
          setAppliedDiscount(0);
          setCouponMessage("");
        }
        onClose();
      }}
    >
      <SheetContent
        side="left"
        className="w-full sm:w-[400px] p-0 flex flex-col"
      >
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            {showCheckout ? "Checkout" : "Shopping Cart"}
          </SheetTitle>
        </SheetHeader>

        {!showCheckout ? (
          <>
            <ScrollArea className="flex-1 p-6">
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 border rounded-lg"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-orange-500 font-semibold">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.stock}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {items.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="coupon-code">Coupon Code</Label>
                  <div className="flex gap-2">
                    <Input
                      id="coupon-code"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleApplyCoupon} disabled={submitting}>
                      {submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Tag className="h-4 w-4" />
                      )}
                      <span className="sr-only">Apply Coupon</span>
                    </Button>
                  </div>
                  {couponMessage && (
                    <p
                      className={`text-sm ${appliedDiscount > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {couponMessage}
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Subtotal:</span>
                  <span>${originalTotalPrice.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between items-center text-base text-green-600">
                    <span>Discount:</span>
                    <span>-${appliedDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xl font-bold text-orange-500">
                  <span>Total:</span>
                  <span>${finalTotalPrice.toFixed(2)}</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            <ScrollArea className="flex-1 p-6">
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="space-y-4">
                  <h3 className="font-semibold">Customer Information</h3>

                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          phone: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Delivery Address *</Label>
                    <Textarea
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          address: e.target.value,
                        })
                      }
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={customerInfo.notes}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          notes: e.target.value,
                        })
                      }
                      rows={2}
                      placeholder="Any special instructions..."
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-semibold">Order Summary</h3>
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.title} x {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Subtotal:</span>
                    <span>${originalTotalPrice.toFixed(2)}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Coupon Discount:</span>
                      <span>-${appliedDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg text-orange-500">
                    <span>Total:</span>
                    <span>${finalTotalPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Payment: Cash on Delivery
                  </p>
                </div>
              </form>
            </ScrollArea>

            <div className="border-t p-6 space-y-3">
              <Button
                onClick={handlePlaceOrder}
                disabled={submitting}
                className="w-full bg-orange-500 hover:bg-orange-600"
                size="lg"
              >
                {submitting && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                Place Order (Cash on Delivery)
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCheckout(false)}
                className="w-full"
              >
                Back to Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
