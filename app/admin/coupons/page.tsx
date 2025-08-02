"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Loader2, CalendarIcon } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import { DeleteConfirmationModal } from "@/components/dashboard/delete-confirmation-modal";
import { DataTable } from "@/components/dashboard/table";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Coupon {
  _id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  expirationDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    type: "percentage" as "percentage" | "fixed",
    value: "",
    expirationDate: undefined as Date | undefined,
    isActive: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axiosInstance.get("/api/shop/coupon");
      if (response.data.success) {
        setCoupons(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code.trim() || !formData.type || formData.value === "") {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const couponData = {
        ...formData,
        value: Number.parseFloat(formData.value),
        expirationDate: formData.expirationDate?.toISOString(),
      };

      if (editingCoupon) {
        const response = await axiosInstance.put(
          `/api/shop/coupon/${editingCoupon._id}`,
          couponData
        );
        if (response.data.success) {
          toast.success("Coupon updated successfully");
          fetchCoupons();
        }
      } else {
        const response = await axiosInstance.post(
          "/api/shop/coupon",
          couponData
        );
        if (response.data.success) {
          toast.success("Coupon created successfully");
          fetchCoupons();
        }
      }
      handleCloseDialog();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save coupon");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value.toString(),
      expirationDate: coupon.expirationDate
        ? new Date(coupon.expirationDate)
        : undefined,
      isActive: coupon.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (coupon: Coupon) => {
    setCouponToDelete(coupon);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!couponToDelete) return;
    const toastId = toast.loading("Deleting coupon...");
    try {
      const response = await axiosInstance.delete(
        `/api/shop/coupon/${couponToDelete._id}`
      );
      if (response.data.success) {
        toast.success("Coupon deleted successfully", {
          id: toastId,
        });
        fetchCoupons();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete coupon");
    } finally {
      setIsDeleteModalOpen(false);
      setCouponToDelete(null);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCoupon(null);
    setFormData({
      code: "",
      type: "percentage",
      value: "",
      expirationDate: undefined,
      isActive: true,
    });
  };

  const columns: ColumnDef<Coupon>[] = [
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => (
        <div className="font-medium text-gray-900 dark:text-white">
          {row.original.code}
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={cn(
            "capitalize min-w-[90px] justify-center p-1 text-xs sm:text-sm",
            row.original.type === "percentage"
              ? "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-100 dark:border-purple-700"
              : "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700"
          )}
        >
          {row.original.type}
        </Badge>
      ),
    },
    {
      accessorKey: "value",
      header: "Value",
      cell: ({ row }) => (
        <span className="text-sm sm:text-base">
          {row.original.type === "percentage"
            ? `${row.original.value}%`
            : `$${row.original.value.toFixed(2)}`}
        </span>
      ),
    },
    {
      accessorKey: "expirationDate",
      header: "Expires On",
      cell: ({ row }) => (
        <span className="text-xs sm:text-sm">
          {row.original.expirationDate
            ? format(new Date(row.original.expirationDate), "MMM dd, yyyy")
            : "No Expiration"}
        </span>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Badge 
          variant={row.original.isActive ? "default" : "secondary"} 
          className="text-xs sm:text-sm"
        >
          {row.original.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-1 sm:space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEdit(row.original)}
            className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-2">Edit</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDeleteClick(row.original)}
            className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-2">Delete</span>
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Coupons
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Manage your discount codes
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-1" />
              <span>Add Coupon</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-xl max-h-[90vh] overflow-y-auto sm:w-full">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">
                {editingCoupon ? "Edit Coupon" : "Add New Coupon"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 p-2 font-body">
              {/* Coupon Code */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="code" className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                  Coupon Code *
                </Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  className="bg-white dark:bg-[#28282B] border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-sm sm:text-base"
                  placeholder="e.g., SUMMER20"
                  required
                />
              </div>

              {/* Type & Value */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Coupon Type */}
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="type" className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                    Coupon Type *
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: "percentage" | "fixed") =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger className="bg-white dark:bg-[#28282B] border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-sm sm:text-base">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#28282B] border-gray-300 dark:border-gray-600 shadow-lg rounded-md">
                      <SelectItem 
                        value="percentage" 
                        className="focus:bg-orange-50 dark:focus:bg-[#333336] transition-colors duration-150 text-sm sm:text-base"
                      >
                        Percentage
                      </SelectItem>
                      <SelectItem 
                        value="fixed" 
                        className="focus:bg-orange-50 dark:focus:bg-[#333336] transition-colors duration-150 text-sm sm:text-base"
                      >
                        Fixed Amount
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Value */}
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="value" className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                    Value *
                  </Label>
                  <Input
                    className="bg-white dark:bg-[#28282B] border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-sm sm:text-base"
                    id="value"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.value}
                    onChange={(e) =>
                      setFormData({ ...formData, value: e.target.value })
                    }
                    placeholder={
                      formData.type === "percentage"
                        ? "e.g., 20 (for 20%)"
                        : "e.g., 10 (for $10)"
                    }
                    required
                  />
                </div>
              </div>

              {/* Expiration Date */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="expirationDate" className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                  Expiration Date (Optional)
                </Label>
                <div className="relative">
                  <Input
                    name="expirationDate"
                    id="expirationDate"
                    className="bg-white dark:bg-[#28282B] border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 rounded-md pl-10 text-sm sm:text-base"
                    type="date"
                    value={formData.expirationDate ? format(formData.expirationDate, 'yyyy-MM-dd') : ''}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        expirationDate: e.target.value ? new Date(e.target.value) : undefined
                      });
                    }}
                  />
                  <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Active Checkbox */}
              <div className="flex items-center space-x-3 pt-1 sm:pt-2">
                <Checkbox
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: Boolean(checked) })
                  }
                  className="h-4 w-4 sm:h-5 sm:w-5 rounded border-gray-300 dark:border-gray-600 text-orange-500 focus:ring-orange-500 transition-colors duration-200"
                />
                <Label htmlFor="isActive" className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                  Active
                </Label>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 sm:space-x-3 pt-3 sm:pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#333336] transition-colors duration-200 text-sm sm:text-base"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-200 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-sm sm:text-base"
                >
                  {submitting ? (
                    <span className="flex items-center">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span>{editingCoupon ? "Update Coupon" : "Create Coupon"}</span>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-8 sm:mb-16">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">All Coupons</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {coupons.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <p className="text-sm sm:text-base text-gray-500">
                No coupons found. Create your first coupon!
              </p>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={coupons}
              searchableColumn="code"
              searchableColumnTitle="coupon code"
            />
          )}
        </CardContent>
      </Card>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Coupon"
        description={`Are you sure you want to delete coupon "${couponToDelete?.code}"? This action cannot be undone.`}
      />
    </div>
  );
}