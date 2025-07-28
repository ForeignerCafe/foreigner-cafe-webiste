import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

// GET: Return all published blogs
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({
      publishedAt: -1,
    });

    return Response.json({ blogs });
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return new Response("Failed to load blogs", { status: 500 });
  }
}

// POST: Create a new blog with automatic slug
export async function POST(request: Request) {
  try {
    await connectDB();
    const {
      title,
      body,
      shortCaption,
      mainImage,
      status = "draft",
      tags = [],
    } = await request.json();

    if (!title || !body || !shortCaption) {
      return new Response("Missing required fields: title or body", {
        status: 400,
      });
    }

    const newBlog = new Blog({
      title,
      body,
      shortCaption,
      mainImage,
      status,
      tags,
      publishedAt: status === "published" ? new Date() : undefined,
    });

    const saved = await newBlog.save();

    return Response.json(saved);
  } catch (error) {
    console.error("POST /api/blog error:", error);
    return new Response("Failed to create blog", { status: 500 });
  }
}
