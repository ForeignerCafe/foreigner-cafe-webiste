import { connectDB } from "@/lib/db";
import Subscriber from "@/models/Subscriber";
import Blog from "@/models/Blog";
import ContactRequest from "@/models/ContactRequest";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      subscriberCount,
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      archivedBlogs,
      contactRequestsGrouped,
      totalContactRequests,
      thisMonthContactRequests,
      acknowledgedRequests,
      pendingRequests,
    ] = await Promise.all([
      Subscriber.countDocuments(),

      Blog.countDocuments(),
      Blog.countDocuments({ status: "published" }),
      Blog.countDocuments({ status: "draft" }),
      Blog.countDocuments({ status: "archived" }),

      // Grouped by type and status
      ContactRequest.aggregate([
        {
          $group: {
            _id: { type: "$type", status: "$status" },
            count: { $sum: 1 },
          },
        },
      ]),

      // Total contact requests
      ContactRequest.countDocuments(),

      // Contact requests this month
      ContactRequest.countDocuments({
        createdAt: { $gte: startOfMonth },
      }),

      // Acknowledged
      ContactRequest.countDocuments({ status: "read" }),

      // Pending
      ContactRequest.countDocuments({ status: "pending" }),
    ]);

    // Organize contact stats
    const contactStats: Record<string, Record<string, number>> = {};
    for (const { _id, count } of contactRequestsGrouped) {
      const type = _id.type || "unknown";
      const status = _id.status || "unknown";
      if (!contactStats[type]) contactStats[type] = {};
      contactStats[type][status] = count;
    }

    return Response.json({
      stats: {
        subscribers: subscriberCount,
        blogs: {
          total: totalBlogs,
          published: publishedBlogs,
          draft: draftBlogs,
          archived: archivedBlogs,
        },
        contactRequests: {
          groupedByTypeAndStatus: contactStats,
          total: totalContactRequests,
          thisMonth: thisMonthContactRequests,
          acknowledged: acknowledgedRequests,
          pending: pendingRequests,
        },
      },
    });
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return new Response("Failed to fetch stats", { status: 500 });
  }
}
