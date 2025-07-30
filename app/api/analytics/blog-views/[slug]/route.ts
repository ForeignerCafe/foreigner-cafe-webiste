import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import BlogView from "@/models/BlogView"
import Blog from "@/models/Blog"

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB()

    const { slug } = await params

    // Find the blog
    const blog = await Blog.findOne({ slug })
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    // Get total view count
    const totalViews = await BlogView.countDocuments({ blogId: blog._id })

    return NextResponse.json({ totalViews })
  } catch (error) {
    console.error("Error fetching blog views:", error)
    return NextResponse.json({ error: "Failed to fetch blog views" }, { status: 500 })
  }
}
