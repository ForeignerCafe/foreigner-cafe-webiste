import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import BlogView from "@/models/BlogView";
import ContactRequest from "@/models/ContactRequest";
import Subscriber from "@/models/Subscriber";
import Visitor from "@/models/Visitor";

export async function GET() {
  try {
    await connectDB();

    // Get current date info
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(
      currentYear,
      currentMonth + 1,
      0,
      23,
      59,
      59,
      999
    );

    // Basic counts
    const [
      totalSubscribers,
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalContactRequests,
      thisMonthContactRequests,
      acknowledgedContactRequests,
      pendingContactRequests,
      uniqueVisitors,
    ] = await Promise.all([
      Subscriber.countDocuments(),
      Blog.countDocuments(),
      Blog.countDocuments({ status: "published" }),
      Blog.countDocuments({ status: "draft" }),
      ContactRequest.countDocuments(),
      ContactRequest.countDocuments({
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      }),
      ContactRequest.countDocuments({ status: "read" }),
      ContactRequest.countDocuments({ status: "pending" }),
      Visitor.countDocuments(),
    ]);

    // Device data aggregation
    const deviceData = await Visitor.aggregate([
      {
        $group: {
          _id: "$deviceType",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: "$_id",
          value: "$count",
          color: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", "Mobile"] }, then: "#6366F1" },
                { case: { $eq: ["$_id", "Desktop"] }, then: "#06AED4" },
                { case: { $eq: ["$_id", "Tablet"] }, then: "#10B981" },
              ],
              default: "#8B5CF6",
            },
          },
        },
      },
    ]);

    // Monthly blog stats - last 7 months
    const monthlyBlogStats = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const year = date.getFullYear();
      const month = date.getMonth();

      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0, 23, 59, 59, 999);

      // Count blogs created in this month
      const blogsCount = await Blog.countDocuments({
        createdAt: { $gte: monthStart, $lte: monthEnd },
      });

      // Count total views that occurred in this month (actual numbers, not in thousands)
      const viewsCount = await BlogView.countDocuments({
        viewedAt: { $gte: monthStart, $lte: monthEnd },
      });

      monthlyBlogStats.push({
        month: date.toLocaleDateString("en-US", { month: "short" }),
        blogs: blogsCount,
        views: viewsCount, // Keep actual numbers for better chart scaling
      });
    }

    const stats = {
      subscribers: totalSubscribers,
      blogs: {
        total: totalBlogs,
        published: publishedBlogs,
        draft: draftBlogs,
      },
      contactRequests: {
        total: totalContactRequests,
        thisMonth: thisMonthContactRequests,
        acknowledged: acknowledgedContactRequests,
        pending: pendingContactRequests,
      },
      uniqueVisitors,
      deviceData,
      monthlyBlogStats,
    };

    return Response.json({ stats });
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return new Response("Failed to load stats", { status: 500 });
  }
}
