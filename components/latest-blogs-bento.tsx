import Image from "next/image"
import Link from "next/link"
import { Calendar, Tag } from "lucide-react"

interface Blog {
  _id: string
  title: string
  slug: string
  shortCaption: string
  mainImage?: string
  publishedAt: string
  tags: string[]
}

async function getLatestBlogs(): Promise<Blog[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`
      : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    const url = `${baseUrl}/blog/public`

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()
    const blogs = data.blogs || []

    // Return only the latest 5 blogs
    return blogs.slice(0, 5)
  } catch (error) {
    console.error("Error fetching latest blogs:", error)
    return []
  }
}

export default async function LatestBlogsBento() {
  const blogs = await getLatestBlogs()

  if (blogs.length === 0) {
    return null
  }

  const [featuredBlog, ...otherBlogs] = blogs

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Stories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest updates, stories, and highlights from our community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Featured Blog - Takes up 2 columns on large screens */}
          {featuredBlog && (
            <article className="lg:col-span-2 lg:row-span-2 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <Link href={`/blogs/${featuredBlog.slug}`}>
                <div className="relative h-64 lg:h-80 w-full">
                  <Image
                    src={
                      featuredBlog.mainImage ||
                      "/placeholder.svg?height=400&width=600&query=featured+blog+post" ||
                      "/placeholder.svg"
                    }
                    alt={featuredBlog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(featuredBlog.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-300 transition-colors">
                      {featuredBlog.title}
                    </h3>
                    <p className="text-gray-200 line-clamp-2 mb-4">{featuredBlog.shortCaption}</p>
                    {featuredBlog.tags?.length > 0 && (
                      <div className="flex items-center flex-wrap gap-2">
                        <Tag className="w-4 h-4" />
                        {featuredBlog.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          )}

          {/* Other Blogs - Smaller cards */}
          {otherBlogs.map((blog, index) => (
            <article
              key={blog._id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group ${
                index === 0 ? "lg:col-span-2" : "lg:col-span-1"
              }`}
            >
              <Link href={`/blogs/${blog.slug}`}>
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      blog.mainImage || "/placeholder.svg?height=300&width=400&query=blog+post" || "/placeholder.svg"
                    }
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <Link href={`/blogs/${blog.slug}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{blog.shortCaption}</p>
                {blog.tags?.length > 0 && (
                  <div className="flex items-center flex-wrap gap-2">
                    <Tag className="w-3 h-3 text-gray-400" />
                    {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* View All Blogs Link */}
        <div className="text-center mt-12">
          <Link
            href="/blogs"
            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors duration-200"
          >
            View All Stories
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
