"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Package, Clock, CheckCircle, Search } from "lucide-react";
import { DataTable } from "@/components/dashboard/table";
import {
  createOrderColumns,
  type Order,
} from "@/components/dashboard/order-columns";
import { OrderDetailModal } from "@/components/dashboard/order-detail-modal";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import StatsCard from "@/components/dashboard/statsCard";

interface OrderStats {
  pending: number;
  inProgress: number;
  completed: number;
  total: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState<OrderStats>({
    pending: 0,
    inProgress: 0,
    completed: 0,
    total: 0,
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
    calculateStats();
  }, [orders, searchTerm]);

  const fetchOrders = async () => {
    setLoading(true);
    setStatsLoading(true);
    try {
      const response = await axiosInstance.get("/api/orders");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
      setStatsLoading(false);
    }
  };

  const filterOrders = () => {
    if (!searchTerm) {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter(
      (order) =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.customerInfo.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const calculateStats = () => {
    const pending = orders.filter((order) => order.status === "pending").length;
    const inProgress = orders.filter((order) =>
      ["confirmed", "preparing", "ready"].includes(order.status)
    ).length;
    const completed = orders.filter((order) =>
      ["delivered", "cancelled"].includes(order.status)
    ).length;

    setStats({
      pending,
      inProgress,
      completed,
      total: orders.length,
    });
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (order: Order, newStatus: string) => {
    const toastId = toast.loading("Updating order status...");

    try {
      const response = await axiosInstance.put(`/api/orders/${order._id}`, {
        status: newStatus,
      });

      if (response.data.success) {
        toast.success("Order status updated successfully!", { id: toastId });
        fetchOrders(); // Refresh the orders list
      } else {
        toast.error(response.data.message || "Failed to update order status", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to update order status",
        { id: toastId }
      );
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this order? This action cannot be undone."
      )
    ) {
      return;
    }

    const toastId = toast.loading("Deleting order...");

    try {
      const response = await axiosInstance.delete(`/api/orders/${orderId}`);

      if (response.data.success) {
        toast.success("Order deleted successfully!", { id: toastId });
        fetchOrders(); // Refresh the orders list
      } else {
        toast.error(response.data.message || "Failed to delete order", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete order", {
        id: toastId,
      });
    }
  };

  const handleOrderUpdate = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === updatedOrder._id ? updatedOrder : order
      )
    );
    setSelectedOrder(updatedOrder);
  };

  const columns = createOrderColumns({
    onViewOrder: handleViewOrder,
    onUpdateStatus: handleUpdateStatus,
    onDeleteOrder: handleDeleteOrder,
  });

  // Skeleton loader for stats cards
  const StatsCardsSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={`stats-${i}`} className="h-24 w-full rounded-lg" />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const statsData = [
    {
      icon: <Clock className="text-white" size={20} />,
      bgColor: "bg-yellow-500",
      value: stats.pending,
      label: "Pending Orders",
    },
    {
      icon: <Package className="text-white" size={20} />,
      bgColor: "bg-blue-500",
      value: stats.inProgress,
      label: "In Progress",
    },
    {
      icon: <CheckCircle className="text-white" size={20} />,
      bgColor: "bg-green-500",
      value: stats.completed,
      label: "Completed",
    },
    {
      icon: <Package className="text-white" size={20} />,
      bgColor: "bg-gray-600",
      value: stats.total,
      label: "Total Orders",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      {statsLoading ? (
        <StatsCardsSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {statsData.map((item, i) => (
            <StatsCard key={i} {...item} />
          ))}
        </div>
      )}

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>All Orders</CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {orders.length === 0
                  ? "No orders found."
                  : "No orders match your search."}
              </p>
            </div>
          ) : (
            <DataTable columns={columns} data={filteredOrders} />
          )}
        </CardContent>
      </Card>

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
        onOrderUpdate={handleOrderUpdate}
      />
    </div>
  );
}
