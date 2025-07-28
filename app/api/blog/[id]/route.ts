import { connectDB } from "@/lib/db"
import Blog from "@/models/Blog"
import { type NextRequest, NextResponse } from "next/server"

// GET /api/blog/[id] – Get blog by ID for admin access
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    // Try to find by ID first (admin access)
    let blog = await Blog.findById(params.id)

    // If not found by ID, try by slug (for backward compatibility)
    if (!blog) {
      blog = await Blog.findOne({ slug: params.id })
    }

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error("GET /api/blog/[id] error:", error)
    return new Response("Failed to fetch blog", { status: 500 })
  }
}

// DELETE /api/blog/[id] – Delete blog by ID
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const deleted = await Blog.findByIdAndDelete(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE /api/blog/[id] error:", error)
    return new Response("Failed to delete blog", { status: 500 })
  }
}

// PUT /api/blog/[id] – Update blog (edit)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const body = await req.json()

    const updated = await Blog.findByIdAndUpdate(
      params.id,
      {
        ...body,
        publishedAt: body.status === "published" ? new Date() : undefined,
      },
      { new: true },
    )

    if (!updated) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error("PUT /api/blog/[id] error:", error)
    return new Response("Failed to update blog", { status: 500 })
  }
}

// PATCH /api/blog/[id]?action=archive – Archive blog
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const action = req.nextUrl.searchParams.get("action")

  if (action !== "archive") {
    return new Response("Unsupported action", { status: 400 })
  }

  try {
    await connectDB()
    const blog = await Blog.findById(params.id)

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    blog.status = "archived"
    await blog.save()

    return NextResponse.json({ success: true, blog })
  } catch (error) {
    console.error("PATCH /api/blog/[id] error:", error)
    return new Response("Failed to archive blog", { status: 500 })
  }
}
