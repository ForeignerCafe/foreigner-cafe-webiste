// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { DataTable } from "@/components/dashboard/table";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteConfirmationModal } from "@/components/dashboard/delete-confirmation-modal";
import axiosInstance from "@/lib/axios";
import { getSubscribersColumns } from "@/components/dashboard/subscribers-columns";

const TableSkeleton = () => (
  <div className="space-y-4 w-full">
    <div className="grid grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={`header-${i}`} className="h-10 w-full rounded-md" />
      ))}
    </div>
    {[...Array(5)].map((_, rowIndex) => (
      <div key={`row-${rowIndex}`} className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, colIndex) => (
          <Skeleton
            key={`cell-${rowIndex}-${colIndex}`}
            className="h-12 w-full rounded-md"
          />
        ))}
      </div>
    ))}
  </div>
);

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    subscriberId: null,
    subscriberEmail: "",
  });

  const fetchSubscribers = async () => {
    try {
      const res = await axiosInstance.get("/api/subscribers");
      setSubscribers(res.data.subscribers || []);
    } catch (err) {
      console.error("Error fetching subscribers:", err);
      toast.error("Failed to load subscribers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting subscriber...");

    try {
      const subscriber = subscribers.find((s) => s._id === id);
      if (!subscriber) throw new Error("Subscriber not found");

      await axiosInstance.delete("/api/subscribers", {
        data: { email: subscriber.email },
      });

      toast.success("Subscriber deleted successfully!", { id: toastId });

      // Re-fetch the subscribers list
      fetchSubscribers();
    } catch (err) {
      console.error("Error deleting subscriber:", err);
      toast.error("Failed to delete subscriber", { id: toastId });
    } finally {
      setDeleteModalState({
        isOpen: false,
        subscriberId: null,
        subscriberEmail: "",
      });
    }
  };

  const openDeleteModal = (id, email) => {
    setDeleteModalState({
      isOpen: true,
      subscriberId: id,
      subscriberEmail: email,
    });
  };
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
          <h1 className="text-xl sm:text-2xl font-semibold">All Subscribers</h1>
        </div>

        <div className="mt-2">
          {loading ? (
            <TableSkeleton />
          ) : (
            <DataTable
              columns={getSubscribersColumns(openDeleteModal)}
              data={subscribers}
              searchableColumn="email"
              searchableColumnTitle="Email"
              enablePagination={true}
            />
          )}
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModalState.isOpen}
        onClose={() =>
          setDeleteModalState({
            isOpen: false,
            subscriberId: null,
            subscriberEmail: "",
          })
        }
        onConfirm={() => handleDelete(deleteModalState.subscriberId)}
        title="Delete Subscriber"
        description={`Are you sure you want to delete ${deleteModalState.subscriberEmail}? This action cannot be undone.`}
      />
    </div>
  );
}
