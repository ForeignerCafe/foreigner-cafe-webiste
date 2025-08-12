"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Experience {
  id: string
  title: string
  slug: string
  description: string
  imageSrc: string
  alt: string
  buttonText: string
  isPublished: boolean
}

export default function ExperiencesPageClient() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const response = await fetch("/api/experiences")
      const data = await response.json()

      if (data.success) {
        setExperiences(data.data)
      } else {
        setError("Failed to load experiences")
      }
    } catch (error) {
      console.error("Error fetching experiences:", error)
      setError("Failed to load experiences")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Hero Section Skeleton */}
        <div className="relative h-96 bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="h-12 bg-gray-300 rounded w-64 mb-4 mx-auto"></div>
              <div className="h-6 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={fetchExperiences}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/experiences-hero.webp')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Our Experiences</h1>
          <p className="text-xl">Discover unique moments and create lasting memories with us.</p>
        </div>
      </div>

      {/* Experiences Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {experiences.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Experiences Available</h2>
            <p className="text-gray-600">Check back soon for exciting new experiences!</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Experiences</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From coffee tastings to special events, discover what makes Foreigner Cafe unique.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiences.map((experience) => (
                <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video">
                    <Image
                      src={experience.imageSrc || "/placeholder.svg?height=300&width=400"}
                      alt={experience.alt || experience.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-3">{experience.title}</h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">{experience.description}</p>
                    <Link href={`/experiences/${experience.slug}`}>
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        {experience.buttonText || "Learn More"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
