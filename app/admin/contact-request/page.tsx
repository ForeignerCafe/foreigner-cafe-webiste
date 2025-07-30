// @ts-nocheck
"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, Clock, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

import { DataTable } from "@/components/dashboard/table";
import StatsCard from "@/components/dashboard/statsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { contactRequestColumns } from "@/components/dashboard/contact-columns";
import { DeleteConfirmationModal } from "@/components/dashboard/delete-confirmation-modal";
import { ContactDetailModal } from "@/components/dashboard/ContactDetailModal";
import axiosInstance from "@/lib/axios";

const ContactRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  const [stats, setStats] = useState({
    contactRequests: {
      total: 0,
      thisMonth: 0,
      acknowledged: 0,
      pending: 0,
    },
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch all contact requests
  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/contact");
      setRequests(res.data.requests || []);
    } catch (error) {
      toast.error("Failed to load contact requests");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch stats from /api/stats
  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await axiosInstance.get("/api/stats");
      setStats((prev) => ({
        ...prev,
        contactRequests: res.data.stats.contactRequests,
      }));
    } catch (error) {
      toast.error("Failed to fetch stats");
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
    fetchStats();
  }, [fetchRequests, fetchStats]);

  const handleDeleteClick = (id) => {
    setSelectedRequestId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.delete(`/api/contact?id=${selectedRequestId}`);
      setRequests((prev) =>
        prev.filter((req) => req._id !== selectedRequestId)
      );
      toast.success("Request deleted");
    } catch (error) {
      toast.error("Failed to delete request");
    } finally {
      setDeleteModalOpen(false);
      setSelectedRequestId(null);
    }
  };

  const handleViewDetail = async (rowData) => {
    try {
      const res = await axiosInstance.get(`/api/contact?id=${rowData._id}`);
      setSelectedRequest(res.data.request || rowData);
      setViewModalOpen(true);
    } catch (error) {
      toast.error("Failed to load request details");
    }
  };

  const handleMarkAsAcknowledged = async (rowData) => {
    try {
      await axiosInstance.patch(`/api/contact?id=${rowData._id}`, {
        status: "read",
      });
      toast.success("Marked as acknowledged");
      setRequests((prev) =>
        prev.map((req) =>
          req._id === rowData._id ? { ...req, status: "read" } : req
        )
      );
      fetchStats(); // refresh stats after update
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // Skeleton loader for stats cards
  const StatsCardsSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-2">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={`stats-${i}`} className="h-24 w-full rounded-lg" />
      ))}
    </div>
  );

  const statsData = [
    {
      icon: <Mail className="text-white" size={20} />,
      bgColor: "bg-[#00D492]",
      value: stats.contactRequests.total,
      label: "Total Requests",
    },
    {
      icon: <Mail className="text-white" size={20} />,
      bgColor: "bg-[#D5764D]",
      value: stats.contactRequests.thisMonth,
      label: "This Month",
    },
    {
      icon: <CheckCircle className="text-white" size={20} />,
      bgColor: "bg-[#5E736C]",
      value: stats.contactRequests.acknowledged,
      label: "Acknowledged",
    },
    {
      icon: <Clock className="text-white" size={20} />,
      bgColor: "bg-[#00D492]",
      value: stats.contactRequests.pending,
      label: "Pending Requests",
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Request"
        description="Are you sure you want to delete this request?"
      />

      {/* Stats Cards */}
      {statsLoading ? (
        <StatsCardsSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-2">
          {statsData.map((item, i) => (
            <StatsCard key={i} {...item} />
          ))}
        </div>
      )}

      <div className="rounded-lg border p-4 shadow-sm">
        <h1 className="text-2xl font-semibold mb-4">All Requests</h1>
        {loading ? (
          <Skeleton className="h-48 w-full rounded-md" />
        ) : (
          <DataTable
            columns={contactRequestColumns(
              handleViewDetail,
              handleDeleteClick,
              handleMarkAsAcknowledged
            )}
            data={requests}
            searchableColumn="name"
            searchableColumnTitle="Customer Name"
            enablePagination
          />
        )}
      </div>

      <ContactDetailModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        contact={selectedRequest}
      />
    </div>
  );
};

export default ContactRequestsPage;
