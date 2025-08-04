//@ts-nocheck
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import type { Order } from "@/components/dashboard/order-columns" // Reusing the Order interface
import { Package, Truck, CheckCircle, XCircle, Clock, UtensilsCrossed, DollarSign } from "lucide-react"

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleTrackOrder = async () => {
    if (!orderNumber.trim()) {
      setError("Please enter an order number.")
      setOrder(null)
      return
    }

    setLoading(true)
    setError(null)
    setOrder(null)

    try {
      const response = await fetch(`/api/orders/by-number/${orderNumber}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch order details.")
      }

      if (data.success && data.data) {
        setOrder(data.data)
        toast({
          title: "Order Found",
          description: `Details for order ${orderNumber} are displayed.`,
        })
      } else {
        setError("Order not found. Please check the order number.")
        toast({
          title: "Order Not Found",
          description: "No order found with the provided number.",
          variant: "destructive",
        })
      }
    } catch (err: any) {
      console.error("Error tracking order:", err)
      setError(err.message || "An unexpected error occurred.")
      toast({
        title: "Error",
        description: err.message || "Failed to fetch order details.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    let colorClass = ""
    let icon = null
    const statusText = status.charAt(0).toUpperCase() + status.slice(1)

    switch (status.toLowerCase()) {
      case "pending":
        colorClass = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
        icon = <Clock className="h-4 w-4 mr-1" />
        break
      case "confirmed":
        colorClass = "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        icon = <CheckCircle className="h-4 w-4 mr-1" />
        break
      case "preparing":
        colorClass = "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
        icon = <UtensilsCrossed className="h-4 w-4 mr-1" />
        break
      case "ready":
        colorClass = "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
        icon = <Package className="h-4 w-4 mr-1" />
        break
      case "delivered":
        colorClass = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        icon = <Truck className="h-4 w-4 mr-1" />
        break
      case "cancelled":
        colorClass = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        icon = <XCircle className="h-4 w-4 mr-1" />
        break
      default:
        colorClass = "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        break
    }

    return (
      <Badge className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
        {icon} {statusText}
      </Badge>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div
        className="relative h-[50vh] sm:h-[60vh] md:h-[75vh] bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{ backgroundImage: `url('/images/Iced.webp?height=800&width=1600')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-white max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg">Track Your Order</h1>
          <p className="mt-3 text-base sm:text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
            Enter your order number below to get the latest status updates.
          </p>
        </div>
      </div>

      {/* Main Content - Order Tracking Card */}
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12 -mt-12 sm:-mt-16 md:-mt-24 relative z-20">
        <Card className="w-full max-w-2xl mx-auto p-4 sm:p-6 shadow-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-gray-50">
              Find Your Order
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Input
                type="text"
                placeholder="e.g., FC123456789"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTrackOrder()
                  }
                }}
                className="flex-1 p-2 sm:p-3 text-sm sm:text-base border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                aria-label="Order Number Input"
              />
              <Button
                onClick={handleTrackOrder}
                disabled={loading}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold"
              >
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">◌</span> Tracking...
                  </>
                ) : (
                  "Track Order"
                )}
              </Button>
            </div>
            {error && <p className="text-red-600 text-sm text-center font-medium">{error}</p>}
          </CardContent>
        </Card>

        {loading && (
          <Card className="w-full max-w-7xl mx-auto mt-6 sm:mt-8 shadow-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 bg-white dark:bg-gray-900">
            <Skeleton className="h-6 sm:h-8 w-1/2 sm:w-2/3 mb-3 sm:mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <Skeleton className="h-5 sm:h-6 w-full" />
              <Skeleton className="h-5 sm:h-6 w-full" />
              <Skeleton className="h-5 sm:h-6 w-full" />
              <Skeleton className="h-5 sm:h-6 w-full" />
            </div>
            <Skeleton className="h-5 sm:h-6 w-1/3 mt-4 sm:mt-6 mb-2" />
            <Skeleton className="h-16 sm:h-20 w-full" />
          </Card>
        )}

        {order && (
          <Card className="w-full max-w-7xl mx-auto mt-6 sm:mt-8 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 sm:p-5">
            <CardHeader className="pb-3 sm:pb-4 border-b dark:border-gray-800">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <CardTitle className="text-xl sm:text-2xl font-bold">
                  Order #{order.orderNumber}
                </CardTitle>
                {getStatusBadge(order.status)}
              </div>
              <CardDescription className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
                Placed on {format(new Date(order.createdAt), "MMM dd, yyyy 'at' hh:mm a")}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-gray-800 dark:text-gray-200">Customer Information</h3>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Name:</span> {order.customerInfo.name}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Email:</span> {order.customerInfo.email}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Phone:</span> {order.customerInfo.phone}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Address:</span> {order.customerInfo.address}
                  </p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-gray-800 dark:text-gray-200">Payment & Delivery</h3>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Payment Method:</span>{" "}
                    {order.paymentMethod === "cash_on_delivery" ? "Cash on Delivery" : order.paymentMethod}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Delivery Type:</span> {order.deliveryType}
                  </p>
                  {order.deliveryType === "delivery" && (
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Delivery Address:</span> {order.deliveryAddress}
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t pt-4 sm:pt-6 dark:border-gray-800">
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-800 dark:text-gray-200">Order Items</h3>
                <ul className="space-y-3 sm:space-y-4">
                  {order.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between pb-3 sm:pb-4 border-b last:border-b-0 last:pb-0 dark:border-gray-800"
                    >
                      <div className="flex items-center gap-2 sm:gap-4">
                        {item.product?.images?.[0] ? (
                          <img
                            src={item.product.images[0] || "/placeholder.svg"}
                            alt={item.title}
                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg shadow-sm"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?height=64&width=64&text=No Image"
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs">
                            No Image
                          </div>
                        )}
                        <div>
                          <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-50">{item.title}</p>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-50">${item.total.toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {order.notes && (
                <div className="border-t pt-4 sm:pt-6 dark:border-gray-800">
                  <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-gray-800 dark:text-gray-200">Additional Notes</h3>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-2 sm:p-3 rounded-md">
                    {order.notes}
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-3 sm:pt-4 dark:border-gray-800">
              <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-50">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                Total: ${order.totalAmount.toFixed(2)}
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}