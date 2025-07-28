import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag } from "lucide-react";
import axiosInstance from "@/lib/axios";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  shortCaption: string;
  mainImage?: string;
  publishedAt: string;
  tags: string[];
}

async function getBlogs(): Promise<Blog[]> {
  try {
    const res = await axiosInstance.get("/api/blog/public", {
      headers: {
        "Cache-Control": "no-store",
      },
    });

    return res.data.blogs || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Blog | Foreigners Cafe - Stories, Updates & Community",
  description:
    "Discover the latest stories, updates, and community highlights from Foreigners Cafe. Read about our events, menu updates, and the vibrant community that makes us special.",
  keywords:
    "Foreigners Cafe blog, cafe stories, community updates, events, menu highlights",
  openGraph: {
    title: "Blog | Foreigners Cafe",
    description:
      "Discover the latest stories, updates, and community highlights from Foreigners Cafe.",
    type: "website",
    url: "/blogs",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200",
        width: 1200,
        height: 630,
        alt: "Foreigners Cafe Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Foreigners Cafe",
    description:
      "Discover the latest stories, updates, and community highlights from Foreigners Cafe.",
    images: ["/placeholder.svg?height=630&width=1200"],
  },
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-50 to-orange-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the latest stories, updates, and community highlights
              from Foreigners Cafe
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {blogs.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No blogs available yet
              </h2>
              <p className="text-gray-600">
                Check back soon for exciting stories and updates!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <Link href={`/blogs/${blog.slug}`}>
                    <div className="relative h-48 w-full">
                      <Image
                        src={
                          blog.mainImage ||
                          "/placeholder.svg?height=300&width=400&query=blog+post"
                        }
                        alt={blog.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>

                    <Link href={`/blogs/${blog.slug}`}>
                      <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-orange-600 transition-colors">
                        {blog.title}
                      </h2>
                    </Link>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.shortCaption}
                    </p>

                    {blog.tags?.length > 0 && (
                      <div className="flex items-center flex-wrap gap-2 mb-4">
                        <Tag className="w-4 h-4 text-gray-400" />
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{blog.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-2"
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
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
