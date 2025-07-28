import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { type NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{ slug: string }>;
};

export async function GET(req: NextRequest, context: Context) {
  try {
    await connectDB();

    // Await the params before accessing slug
    const params = await context.params;
    const slug = params?.slug;

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const blog = await Blog.findOne({
      slug,
      status: "published",
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("GET /api/blog/slug/[slug] error:", error);
    }

    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
