import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Blog } from "@/models/Blog"

export async function GET() {
  try {
    await connectDB()

    const blogs = await Blog.find({ isPublished: true })
      .populate("category", "name slug")
      .populate("author", "name email")
      .select("title slug excerpt featuredImage category author publishedAt readTime tags")
      .sort({ publishedAt: -1 })
      .limit(20)
      .lean()

    return NextResponse.json(
      { success: true, blogs },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    )
  } catch (error) {
    console.error("Error fetching public blogs:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch blogs", blogs: [] }, { status: 500 })
  }
}
