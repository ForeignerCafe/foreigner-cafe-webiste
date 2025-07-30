import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import BlogView from "@/models/BlogView"
import Blog from "@/models/Blog"
import { parseUserAgent, getClientIP } from "@/lib/analytics"

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const { blogSlug, sessionId } = await req.json()

    if (!blogSlug || !sessionId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Find the blog
    const blog = await Blog.findOne({ slug: blogSlug })
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    const ipAddress = getClientIP(req)
    const userAgent = req.headers.get("user-agent") || ""
    const deviceInfo = parseUserAgent(userAgent)

    // Check if this view has already been tracked in the last hour (prevent refresh spam)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)

    const existingView = await BlogView.findOne({
      $or: [
        { ipAddress, blogId: blog._id, viewedAt: { $gte: oneHourAgo } },
        { sessionId, blogId: blog._id, viewedAt: { $gte: oneHourAgo } },
      ],
    })

    if (existingView) {
      // Return current view count without tracking
      const totalViews = await BlogView.countDocuments({ blogId: blog._id })
      return NextResponse.json({
        tracked: false,
        reason: "Recently viewed",
        totalViews,
      })
    }

    // Create new blog view record
    const blogView = new BlogView({
      blogId: blog._id,
      blogSlug,
      ipAddress,
      sessionId,
      userAgent,
      ...deviceInfo,
      viewedAt: new Date(),
    })

    await blogView.save()

    // Get updated view count
    const totalViews = await BlogView.countDocuments({ blogId: blog._id })

    return NextResponse.json({
      tracked: true,
      viewId: blogView._id,
      totalViews,
    })
  } catch (error) {
    console.error("Error tracking blog view:", error)
    return NextResponse.json({ error: "Failed to track blog view" }, { status: 500 })
  }
}
