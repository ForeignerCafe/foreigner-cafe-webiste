"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"

interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  featuredImage: string
  category: {
    name: string
    slug: string
  }
  author: {
    name: string
    email: string
  }
  publishedAt: string
  readTime: number
  tags: string[]
}

export default function LatestBlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blog/public")
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setBlogs(data.blogs.slice(0, 3)) // Get latest 3 blogs
        }
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-64 h-8 bg-gray-200 animate-pulse rounded mx-auto mb-4" />
            <div className="w-96 h-4 bg-gray-200 animate-pulse rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="w-full h-48 bg-gray-200 animate-pulse" />
                <div className="p-6 space-y-4">
                  <div className="w-32 h-6 bg-gray-200 animate-pulse rounded" />
                  <div className="w-full h-4 bg-gray-200 animate-pulse rounded" />
                  <div className="w-3/4 h-4 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Stories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest news, stories, and insights from our community and beyond.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card key={blog._id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={blog.featuredImage || "/placeholder.svg?height=300&width=400"}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{blog.category?.name || "General"}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {blog.readTime} min read
                  </div>
                </div>
                <CardTitle className="text-xl line-clamp-2">{blog.title}</CardTitle>
                <CardDescription className="line-clamp-3">{blog.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {blog.author?.name || "Anonymous"}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(blog.publishedAt)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="w-full">
                  <Link href={`/blogs/${blog.slug}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {blogs.length > 0 && (
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/blogs">View All Stories</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
