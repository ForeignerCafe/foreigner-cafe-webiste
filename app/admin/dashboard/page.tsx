"use client"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Users, FileText, Mail, Eye, PlusCircle, ArrowRight, MessageSquare, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import axiosInstance from "@/lib/axios"
import { DataTable } from "@/components/dashboard/table"
import StatsCard from "@/components/dashboard/statsCard"
import MonthlyBlogStatsChart from "@/components/dashboard/left-chart"
import RatioOfDevicesChart from "@/components/dashboard/right-chart"
import { getBlogColumns } from "@/components/dashboard/blog-colums"
import type { Blog } from "@/models/Blog"

// Skeleton loader
const TableSkeleton = () => (
  <div className="space-y-4 w-full">
    <div className="grid grid-cols-5 gap-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={`header-${i}`} className="h-10 w-full rounded-md" />
      ))}
    </div>
    {[...Array(5)].map((_, rowIndex) => (
      <div key={`row-${rowIndex}`} className="grid grid-cols-5 gap-4">
        {[...Array(5)].map((_, colIndex) => (
          <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-12 w-full rounded-md" />
        ))}
      </div>
    ))}
  </div>
)

export default function DashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    subscribers: 0,
    blogs: { total: 0, published: 0, draft: 0 },
    contactRequests: { total: 0, thisMonth: 0, acknowledged: 0, pending: 0 },
    uniqueVisitors: 0,
    deviceData: [],
    monthlyBlogStats: [],
  })

  const fetchBlogs = useCallback(async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get("/api/blog")
      setBlogs(res.data.blogs || [])
    } catch (err) {
      console.error("Failed to fetch blogs:", err)
      toast({
        title: "Error",
        description: "Failed to fetch blogs",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchStats = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/api/stats")
      setStats(res.data.stats)
    } catch (err) {
      console.error("Failed to fetch stats:", err)
      toast({
        title: "Error",
        description: "Failed to fetch dashboard stats",
        variant: "destructive",
      })
    }
  }, [])

  useEffect(() => {
    fetchBlogs()
    fetchStats()
  }, [fetchBlogs, fetchStats])

  const recentBlogs = [...blogs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 7)

  const statsData = [
    {
      icon: <Users className="text-white" size={20} />,
      bgColor: "bg-indigo-600",
      value: stats.subscribers,
      label: "Total Subscribers",
    },
    {
      icon: <FileText className="text-white" size={20} />,
      bgColor: "bg-[#1B17A6]",
      value: stats.blogs.total,
      label: "Total Blogs",
    },
    {
      icon: <Mail className="text-white" size={20} />,
      bgColor: "bg-[#00D492]",
      value: stats.contactRequests.total || 0,
      label: "Contact Requests",
    },
    {
      icon: <Eye className="text-white" size={20} />,
      bgColor: "bg-[#EF4D68]",
      value: stats.uniqueVisitors,
      label: "Unique Visitors",
    },
  ]

  const contactRequestStats = [
    {
      icon: <MessageSquare className="text-white" size={20} />,
      bgColor: "bg-blue-600",
      value: stats.contactRequests.thisMonth || 0,
      label: "This Month's Requests",
    },
    {
      icon: <CheckCircle className="text-white" size={20} />,
      bgColor: "bg-green-600",
      value: stats.contactRequests.acknowledged || 0,
      label: "Acknowledged Requests",
    },
    {
      icon: <Clock className="text-white" size={20} />,
      bgColor: "bg-orange-600",
      value: stats.contactRequests.pending || 0,
      label: "Pending Requests",
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-2">
        {statsData.map((item, index) => (
          <StatsCard key={index} {...item} />
        ))}
      </div>

      {/* Contact Request Stats Cards
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
        {contactRequestStats.map((item, index) => (
          <StatsCard key={`contact-${index}`} {...item} />
        ))}
      </div> */}

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-10">
        <div className="col-span-1 lg:col-span-6 rounded-lg overflow-hidden">
          <MonthlyBlogStatsChart data={stats.monthlyBlogStats} />
        </div>
        <div className="col-span-1 lg:col-span-4 rounded-lg overflow-hidden">
          <RatioOfDevicesChart
            chartData={
              stats.deviceData.length > 0
                ? stats.deviceData
                : [
                    { name: "Mobile", value: 68, color: "#6366F1" },
                    { name: "Desktop", value: 32, color: "#06AED4" },
                  ]
            }
          />
        </div>
      </div>

      {/* Recent Blogs Table */}
      <div className="rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
          <h1 className="text-xl sm:text-2xl font-semibold">Recent Blogs</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <Link href="/admin/blogs" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/admin/add-blog" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-4">
          {loading ? (
            <TableSkeleton />
          ) : (
            <DataTable
              columns={getBlogColumns(fetchBlogs)}
              data={recentBlogs}
              searchableColumn="title"
              searchableColumnTitle="Title"
              enablePagination={false}
            />
          )}
        </div>
      </div>
    </div>
  )
}
