import { connectDB } from "@/lib/db";
import Subscriber from "@/models/Subscriber";
import Blog from "@/models/Blog";
import ContactRequest from "@/models/ContactRequest";

export async function GET() {
  try {
    await connectDB();

    const [
      subscriberCount,
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      contactRequests,
    ] = await Promise.all([
      Subscriber.countDocuments(),

      Blog.countDocuments(),
      Blog.countDocuments({ status: "published" }),
      Blog.countDocuments({ status: "draft" }),

      ContactRequest.aggregate([
        {
          $group: {
            _id: { type: "$type", status: "$status" },
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    // Organize contact stats
    const contactStats: Record<string, Record<string, number>> = {};
    for (const { _id, count } of contactRequests) {
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
        },
        contactRequests: contactStats,
      },
    });
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return new Response("Failed to fetch stats", { status: 500 });
  }
}
