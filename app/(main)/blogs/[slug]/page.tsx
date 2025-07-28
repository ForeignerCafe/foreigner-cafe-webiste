// app/(main)/blogs/[slug]/page.tsx
export const dynamic = "force-dynamic";
export const dynamicParams = true;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import axiosInstance from "@/lib/axios";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  shortCaption: string;
  body: string;
  mainImage?: string;
  publishedAt: string;
  tags: string[];
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const res = await axiosInstance.get(`/api/blog/slug/${slug}`, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

// Dynamic Metadata
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const blog = await getBlog(params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Foreigners Cafe",
      description: "The requested blog post could not be found.",
    };
  }

  const imageUrl = blog.mainImage || "/placeholder.svg?height=630&width=1200";

  return {
    title: `${blog.title} | Foreigners Cafe Blog`,
    description: blog.shortCaption,
    keywords: blog.tags.join(", "),
    openGraph: {
      title: blog.title,
      description: blog.shortCaption,
      type: "article",
      url: `/blogs/${blog.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      publishedTime: blog.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.shortCaption,
      images: [imageUrl],
    },
  };
}

// Page Component
export default async function BlogDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const blog = await getBlog(params.slug);

  if (!blog) notFound();

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-8">
        <Link
          href="/blogs"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
      </div>

      {blog.mainImage && (
        <div className="relative h-64 md:h-96 w-full mb-8">
          <Image
            src={blog.mainImage || "/placeholder.svg"}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <article className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6">{blog.shortCaption}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            {blog.tags.length > 0 && (
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.body }}
          />
        </div>
      </article>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Explore More Stories
          </h2>
          <p className="text-gray-600 mb-8">
            Discover more exciting content from Foreigners Cafe
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            View All Blogs
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
      </section>
    </main>
  );
}
