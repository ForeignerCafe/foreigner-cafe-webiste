import { connectDB } from "@/lib/db"
import Blog from "@/models/Blog"
import Subscriber from "@/models/Subscriber"
import ContactRequest from "@/models/ContactRequest"
import Visitor from "@/models/Visitor"
import BlogView from "@/models/BlogView"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectDB()

    // Get basic stats
    const [subscribers, blogs, contactRequests] = await Promise.all([
      Subscriber.countDocuments(),
      Blog.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            published: {
              $sum: { $cond: [{ $eq: ["$status", "published"] }, 1, 0] },
            },
            draft: {
              $sum: { $cond: [{ $eq: ["$status", "draft"] }, 1, 0] },
            },
          },
        },
      ]),
      ContactRequest.countDocuments(),
    ])

    // Get unique visitors count (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const uniqueVisitors = await Visitor.countDocuments({
      visitedAt: { $gte: thirtyDaysAgo },
    })

    // Get device analytics for the chart
    const deviceStats = await Visitor.aggregate([
      {
        $match: {
          visitedAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: "$deviceType",
          count: { $sum: 1 },
        },
      },
    ])

    // Calculate device percentages
    const totalDeviceVisits = deviceStats.reduce((sum, device) => sum + device.count, 0)
    const deviceData = deviceStats.map((device) => ({
      name: device._id,
      value: totalDeviceVisits > 0 ? Math.round((device.count / totalDeviceVisits) * 100) : 0,
      color: device._id === "Mobile" ? "#6366F1" : device._id === "Tablet" ? "#06AED4" : "#10B981",
    }))

    // Get monthly blog view stats for the chart
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyBlogStats = await BlogView.aggregate([
      {
        $match: {
          viewedAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$viewedAt" },
            month: { $month: "$viewedAt" },
          },
          views: { $sum: 1 },
          uniqueBlogs: { $addToSet: "$blogId" },
        },
      },
      {
        $project: {
          _id: 1,
          views: 1,
          blogs: { $size: "$uniqueBlogs" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ])

    // Format monthly data for the chart
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const chartData = monthlyBlogStats.map((stat) => ({
      month: monthNames[stat._id.month - 1],
      blogs: stat.blogs,
      views: stat.views,
    }))

    const stats = {
      subscribers,
      blogs: blogs[0] || { total: 0, published: 0, draft: 0 },
      contactRequests: { total: contactRequests },
      uniqueVisitors,
      deviceData,
      monthlyBlogStats: chartData,
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
