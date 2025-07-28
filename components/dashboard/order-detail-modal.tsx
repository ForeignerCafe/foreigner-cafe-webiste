"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Order } from "./order-columns"
import Image from "next/image"
import toast from "react-hot-toast"
import axiosInstance from "@/lib/axios"

interface OrderDetailModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
  onOrderUpdate: (updatedOrder: Order) => void
}

const statusOptions = [
  { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { value: "confirmed", label: "Confirmed", color: "bg-blue-100 text-blue-800" },
  { value: "preparing", label: "Preparing", color: "bg-orange-100 text-orange-800" },
  { value: "ready", label: "Ready", color: "bg-purple-100 text-purple-800" },
  { value: "delivered", label: "Delivered", color: "bg-green-100 text-green-800" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
]

export function OrderDetailModal({ order, isOpen, onClose, onOrderUpdate }: OrderDetailModalProps) {
  const [status, setStatus] = useState(order?.status || "pending")
  const [notes, setNotes] = useState(order?.notes || "")
  const [isUpdating, setIsUpdating] = useState(false)

  if (!order) return null

  const handleUpdateOrder = async () => {
    setIsUpdating(true)
    const toastId = toast.loading("Updating order...")

    try {
      const response = await axiosInstance.put(`/api/orders/${order._id}`, {
        status,
        notes,
      })

      if (response.data.success) {
        toast.success("Order updated successfully!", { id: toastId })
        onOrderUpdate(response.data.data)
        onClose()
      } else {
        toast.error(response.data.message || "Failed to update order", { id: toastId })
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update order", { id: toastId })
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find((option) => option.value === status)
    return statusOption?.color || "bg-gray-100 text-gray-800"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order Details - {order.orderNumber}</span>
            <Badge className={getStatusColor(order.status)}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div>
                <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Name</Label>
                <p className="font-medium">{order.customerInfo.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</Label>
                <p className="font-medium">{order.customerInfo.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</Label>
                <p className="font-medium">{order.customerInfo.phone}</p>
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Address</Label>
                <p className="font-medium">{order.customerInfo.address}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden">
                    <Image
                      src={item.product.images[0] || "/placeholder.svg?height=64&width=64"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${item.total.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total Amount:</span>
            <span>${order.totalAmount.toFixed(2)}</span>
          </div>

          {/* Order Management */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Order Management</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this order..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleUpdateOrder} disabled={isUpdating} className="bg-orange-500 hover:bg-orange-600">
                {isUpdating ? "Updating..." : "Update Order"}
              </Button>
            </div>
          </div>

          {/* Order Timeline */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Order Timeline</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Created:</span>
                <span>{new Date(order.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
                <span>{new Date(order.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
