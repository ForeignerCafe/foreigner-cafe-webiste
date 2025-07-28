// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { parse, isSameMonth } from "date-fns";
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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch all requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosInstance.get("/api/contact");
        setRequests(res.data.requests || []);
      } catch (error) {
        toast.error("Failed to load contact requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

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
      setSelectedRequest(res.data.request || rowData); // fallback
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

    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const now = new Date();
  const thisMonthCount = requests.filter((r) =>
    isSameMonth(
      parse(r.createdAt, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date()),
      now
    )
  ).length;

  const statsData = [
    {
      icon: <Mail className="text-white" size={20} />,
      bgColor: "bg-[#00D492]",
      value: requests.length,
      label: "Total Requests",
    },
    {
      icon: <Mail className="text-white" size={20} />,
      bgColor: "bg-[#D5764D]",
      value: thisMonthCount,
      label: "This Month",
    },
    {
      icon: <CheckCircle className="text-white" size={20} />,
      bgColor: "bg-[#5E736C]",
      value: requests.filter(
        (r) => r.status === "read" || r.status === "read"
      ).length,
      label: "Acknowledged",
    },
    {
      icon: <Clock className="text-white" size={20} />,
      bgColor: "bg-[#00D492]",
      value: requests.filter((r) => r.status === "Pending").length,
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

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-2">
        {statsData.map((item, i) => (
          <StatsCard key={i} {...item} />
        ))}
      </div>

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
