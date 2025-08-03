import { connectDB } from "@/lib/db"
import Blog from "@/models/Blog"
import type { NextRequest } from "next/server"

// GET: Return all published blogs for public access
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    // Add cache headers to prevent infinite loops
    const blogs = await Blog.find({
      status: "published",
    })
      .sort({
        publishedAt: -1,
      })
      .select("title slug shortCaption mainImage publishedAt tags")
      .lean() // Use lean() for better performance and to prevent mongoose document issues

    return new Response(JSON.stringify({ blogs }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    })
  } catch (error) {
    console.error("GET /api/blog/public error:", error)
    return new Response(JSON.stringify({ error: "Failed to load blogs", blogs: [] }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
