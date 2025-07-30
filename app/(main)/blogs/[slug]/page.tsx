// app/(main)/blogs/[slug]/page.tsx
export const dynamic = "force-dynamic"
export const dynamicParams = true

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Tag, Eye } from "lucide-react"
import axiosInstance from "@/lib/axios"
import AnalyticsTracker from "@/components/analytics-tracker"

interface Blog {
  _id: string
  title: string
  slug: string
  shortCaption: string
  body: string
  mainImage?: string
  publishedAt: string
  tags: string[]
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const res = await axiosInstance.get(`/api/blog/slug/${slug}`, {
      headers: {
        "Cache-Control": "no-store",
      },
    })
    return res.data
  } catch (error) {
    console.error("Error fetching blog:", error)
    return null
  }
}

async function getBlogViews(slug: string): Promise<number> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/analytics/blog-views/${slug}`,
      {
        cache: "no-store",
      },
    )
    const data = await res.json()
    return data.totalViews || 0
  } catch (error) {
    console.error("Error fetching blog views:", error)
    return 0
  }
}

// Dynamic Metadata
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const blog = await getBlog(params.slug)

  if (!blog) {
    return {
      title: "Blog Not Found | Foreigners Cafe",
      description: "The requested blog post could not be found.",
    }
  }

  const imageUrl = blog.mainImage || "/placeholder.svg?height=630&width=1200"

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
  }
}

// Page Component
export default async function BlogDetailPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const blog = await getBlog(params.slug)
  const initialViewCount = await getBlogViews(params.slug)

  if (!blog) notFound()

  return (
    <main className="min-h-screen bg-white ">
      <AnalyticsTracker blogSlug={params.slug} />

      {blog.mainImage && (
        <section className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center mb-12">
          {/* Background image */}
          <Image src={blog.mainImage || "/placeholder.svg"} alt={blog.title} fill className="object-cover" priority />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 z-0" />

          {/* Text Content */}
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">{blog.title}</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md">{blog.shortCaption}</p>
          </div>
        </section>
      )}

      <article className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{blog.title}</h1>

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

              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                <span id="blog-view-count">{initialViewCount}</span> views
              </div>
            </div>

            {blog.tags.length > 0 && (
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                {blog.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div
            className="prose max-w-6xl mx-auto prose-base md:prose-lg
             prose-headings:font-semibold prose-headings:tracking-tight prose-headings:scroll-mt-24
             prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
             prose-h1:mb-4 prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-2
             prose-p:leading-7 prose-p:my-4 text-gray-800
             prose-a:text-orange-600 hover:prose-a:underline
             prose-strong:text-gray-900
             prose-img:rounded-xl prose-img:shadow-md prose-img:my-6
             prose-blockquote:border-l-4 prose-blockquote:border-orange-300 prose-blockquote:bg-orange-50 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-gray-600
             prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-1 prose-code:rounded-md
             prose-ul:marker:text-orange-500 prose-ol:marker:text-orange-500
             dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: blog.body }}
          />
        </div>
      </article>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore More Stories</h2>
          <p className="text-gray-600 mb-8">Discover more exciting content from Foreigners Cafe</p>
          <Link
            href="/blogs"
            className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            View All Blogs
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  )
}
