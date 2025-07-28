// @ts-nocheck
"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  PlusCircle,
  FileText,
  FileCheck2,
  FileX2,
  Archive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/dashboard/table";
import StatsCard from "@/components/dashboard/statsCard";
import axiosInstance from "@/lib/axios";
import { getBlogColumns } from "@/components/dashboard/blog-colums";
import type { Blog } from "@/models/Blog";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    blogs: { total: 0, published: 0, draft: 0, archived: 0 },
  });

  // Fetch blogs
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/blog");
      setBlogs(res.data.blogs || []);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch blog stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/api/stats");
      setStats(res.data.stats);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
    fetchStats();
  }, [fetchBlogs, fetchStats]);

  // Skeleton Loader
  const TableSkeleton = () => (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
        {[...Array(6)].map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-12 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  const statsData = [
    {
      icon: <FileText className="text-white" size={20} />,
      bgColor: "bg-[#1B17A6]",
      value: stats.blogs.total,
      label: "Total Blogs",
    },
    {
      icon: <FileCheck2 className="text-white" size={20} />,
      bgColor: "bg-[#00D492]",
      value: stats.blogs.published,
      label: "Published Blogs",
    },
    {
      icon: <FileX2 className="text-white" size={20} />,
      bgColor: "bg-yellow-500",
      value: stats.blogs.draft,
      label: "Draft Blogs",
    },
    {
      icon: <Archive className="text-white" size={20} />,
      bgColor: "bg-gray-600",
      value: stats.blogs.archived || 0,
      label: "Archived Blogs",
    },
  ];

  return (
    <div className="p-4 w-full max-w-screen-2xl mx-auto space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
        {statsData.map((item, index) => (
          <StatsCard key={index} {...item} />
        ))}
      </div>

      {/* Page Title and Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
        <h1 className="text-2xl font-semibold">All Blogs</h1>
        <Link href="/admin/add-blog" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Blog
          </Button>
        </Link>
      </div>

      {/* Data Table */}
      {loading ? (
        <TableSkeleton />
      ) : (
        <div className="overflow-x-auto">
          <DataTable
            columns={getBlogColumns(fetchBlogs)}
            data={blogs}
            searchableColumn="title"
            searchableColumnTitle="Title"
            enablePagination={true}
          />
        </div>
      )}
    </div>
  );
}
