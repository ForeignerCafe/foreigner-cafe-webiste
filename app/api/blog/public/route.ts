import { connectDB } from "@/lib/db"
import Blog from "@/models/Blog"

// GET: Return all published blogs for public access
export async function GET() {
  try {
    await connectDB()
    const blogs = await Blog.find({
      status: "published",
    })
      .sort({
        publishedAt: -1,
      })
      .select("title slug shortCaption mainImage publishedAt tags")

    return Response.json({ blogs })
  } catch (error) {
    console.error("GET /api/blog/public error:", error)
    return new Response("Failed to load blogs", { status: 500 })
  }
}
