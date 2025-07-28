"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"

export interface Order {
  _id: string
  orderNumber: string
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
  }
  items: Array<{
    product: {
      _id: string
      title: string
      images: string[]
    }
    title: string
    price: number
    quantity: number
    total: number
  }>
  totalAmount: number
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
  paymentMethod: string
  notes?: string
  createdAt: string
  updatedAt: string
}

interface OrderColumnsProps {
  onViewOrder: (order: Order) => void
  onUpdateStatus: (order: Order, status: string) => void
  onDeleteOrder: (orderId: string) => void
}

export const createOrderColumns = ({
  onViewOrder,
  onUpdateStatus,
  onDeleteOrder,
}: OrderColumnsProps): ColumnDef<Order>[] => [
  {
    accessorKey: "orderNumber",
    header: "Order #",
    cell: ({ row }) => {
      const orderNumber = row.getValue("orderNumber") as string
      return <div className="font-medium">{orderNumber}</div>
    },
  },
  {
    accessorKey: "customerInfo",
    header: "Customer",
    cell: ({ row }) => {
      const customerInfo = row.getValue("customerInfo") as Order["customerInfo"]
      return (
        <div>
          <div className="font-medium">{customerInfo.name}</div>
          <div className="text-sm text-muted-foreground">{customerInfo.email}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => {
      const items = row.getValue("items") as Order["items"]
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
      return (
        <div>
          {totalItems} item{totalItems !== 1 ? "s" : ""}
        </div>
      )
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("totalAmount"))
      return <div className="font-medium">${amount.toFixed(2)}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusColors = {
        pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        preparing: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
        ready: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
        delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      }

      return (
        <Badge className={statusColors[status as keyof typeof statusColors]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return <div className="text-sm">{format(date, "MMM dd, yyyy")}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original

      const getNextStatus = (currentStatus: string) => {
        const statusFlow = {
          pending: "confirmed",
          confirmed: "preparing",
          preparing: "ready",
          ready: "delivered",
        }
        return statusFlow[currentStatus as keyof typeof statusFlow]
      }

      const nextStatus = getNextStatus(order.status)

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onViewOrder(order)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {nextStatus && (
              <DropdownMenuItem onClick={() => onUpdateStatus(order, nextStatus)}>
                <Edit className="mr-2 h-4 w-4" />
                Mark as {nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1)}
              </DropdownMenuItem>
            )}
            {order.status !== "cancelled" && order.status !== "delivered" && (
              <DropdownMenuItem onClick={() => onUpdateStatus(order, "cancelled")}>
                <Edit className="mr-2 h-4 w-4" />
                Cancel Order
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDeleteOrder(order._id)} className="text-red-600 dark:text-red-400">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
