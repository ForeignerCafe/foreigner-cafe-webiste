import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  shortCaption: string;
  mainImage?: string;
  publishedAt: string;
  tags: string[];
}

async function getLatestBlogs(): Promise<Blog[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`
      : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const url = `${baseUrl}/blog/public`;

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const blogs = data.blogs || [];

    // Return only the latest 5 blogs
    return blogs.slice(0, 5);
  } catch (error) {
    console.error("Error fetching latest blogs:", error);
    return [];
  }
}

export default async function LatestBlogsSection() {
  const blogs = await getLatestBlogs();

  if (blogs.length === 0) {
    return null;
  }

  const largeBlogs = blogs.slice(0, 2);
  const smallBlogs = blogs.slice(2, 5);

  return (
    <section className="bg-white py-6 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            LATEST BLOGS
          </h2>
        </div>

        {/* Top Row: Large Blog Cards with specific desktop widths */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {largeBlogs.map((blog, index) => (
            <div
              key={blog._id}
              className={`group ${
                index === 0 ? "lg:col-span-5" : "lg:col-span-7"
              }`}
            >
              <Link href={`/blogs/${blog.slug}`}>
                <div className="overflow-hidden mb-6 relative h-64">
                  <Image
                    src={
                      blog.mainImage ||
                      "/placeholder.svg?height=300&width=600&query=blog+post"
                    }
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <Link href={`/blogs/${blog.slug}`}>
                <h3 className="text-xl font-bold text-black mb-3 hover:text-orange-600 transition-colors">
                  {blog.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {blog.shortCaption}
              </p>
              <Link
                href={`/blogs/${blog.slug}`}
                className="text-sm text-orange-600 font-medium hover:text-orange-700 transition-colors duration-200 hover:underline"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Row: Small Blog Cards with Overlay */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {smallBlogs.map((blog) => (
            <div
              key={blog._id}
              className="group relative overflow-hidden rounded-lg"
            >
              <Link href={`/blogs/${blog.slug}`}>
                <div className="relative h-64 w-full">
                  <Image
                    src={
                      blog.mainImage ||
                      "/placeholder.svg?height=256&width=400&query=blog+post"
                    }
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-lg font-bold text-white">{blog.title}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Blogs Link */}
        <div className="text-center mt-12">
          <Link
            href="/blogs"
            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors duration-200"
          >
            View All Stories
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
