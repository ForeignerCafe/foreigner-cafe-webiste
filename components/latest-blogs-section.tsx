"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  featuredImage?: string
  category?: {
    name: string
    slug: string
  }
  author?: {
    name: string
  }
  publishedAt: string
  readTime?: number
  tags?: string[]
}

export function LatestBlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/blog/public")
      if (response.ok) {
        const data = await response.json()
        if (data.success && Array.isArray(data.blogs)) {
          setBlogs(data.blogs.slice(0, 3)) // Get latest 3 blogs
        }
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-8"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (blogs.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest from Our Blog</h2>
            <p className="text-gray-600">No blog posts available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest from Our Blog</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest stories, coffee tips, and community highlights
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog) => (
            <Card key={blog._id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={blog.featuredImage || "/placeholder.svg?height=250&width=400"}
                  alt={blog.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                {blog.category && (
                  <Badge className="absolute top-4 left-4 bg-orange-500 text-white">{blog.category.name}</Badge>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(blog.publishedAt)}</span>
                  </div>
                  {blog.readTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{blog.readTime} min</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                  <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{blog.excerpt}</p>
                {blog.author && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <User className="w-4 h-4" />
                    <span>By {blog.author.name}</span>
                  </div>
                )}
                <Link href={`/blogs/${blog.slug}`}>
                  <Button variant="ghost" className="p-0 h-auto text-orange-500 hover:text-orange-600">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/blogs">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
              View All Blog Posts
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
