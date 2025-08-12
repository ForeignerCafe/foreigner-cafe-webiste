"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Users } from "lucide-react"
import Link from "next/link"
import axiosInstance from "@/lib/axios"

interface Experience {
  id: number
  title: string
  slug: string
  description: string
  content: string
  imageSrc: string
  alt?: string
  buttonText: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export default function ExperiencePage() {
  const params = useParams()
  const slug = params.slug as string
  const [experience, setExperience] = useState<Experience | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchExperience()
  }, [slug])

  const fetchExperience = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get(`/api/experiences/${slug}`)
      if (response.data.success) {
        setExperience(response.data.data)
      } else {
        setError("Experience not found")
      }
    } catch (error) {
      console.error("Failed to fetch experience:", error)
      setError("Failed to load experience")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen">
        {/* Loading Hero */}
        <section className="relative h-[400px] sm:h-[500px] md:h-[600px] bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <div className="h-8 bg-white/20 rounded w-32 mb-4"></div>
              <div className="h-12 bg-white/20 rounded w-96 mb-4"></div>
              <div className="h-6 bg-white/20 rounded w-64"></div>
            </div>
          </div>
        </section>

        {/* Loading Content */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="h-6 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-5/6 mb-8 animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  if (error || !experience) {
    return (
      <main className="flex flex-col min-h-screen">
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Experience Not Found</h1>
            <p className="text-gray-600 mb-8">The experience you're looking for doesn't exist or has been removed.</p>
            <Link href="/experiences">
              <Button className="bg-[#EC4E20] hover:bg-[#f97316] text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Experiences
              </Button>
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
        <Image
          src={experience.imageSrc || "/placeholder.svg"}
          alt={experience.alt || experience.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <Link
              href="/experiences"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Experiences
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">{experience.title}</h1>
            <p className="text-lg sm:text-xl text-white/90 mb-6">{experience.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-white/80">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Available Daily
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Duration Varies
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                All Welcome
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg max-w-none">
              <div className="experience-content" dangerouslySetInnerHTML={{ __html: experience.content }} />
            </article>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-gray-50 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Experience This?</h3>
              <p className="text-gray-600 mb-6">
                Join us for this unique experience and create lasting memories at Foreigner Cafe.
              </p>
              <Button
                className="bg-[#EC4E20] hover:bg-[#f97316] text-white px-8 py-3 text-lg"
                onClick={() => {
                  // You can implement booking logic here
                  window.location.href = "tel:+1234567890" // Replace with actual booking system
                }}
              >
                {experience.buttonText}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Experiences Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">More Experiences</h2>
            <p className="text-gray-600">Discover other unique experiences we offer</p>
          </div>
          <div className="text-center">
            <Link href="/experiences">
              <Button
                variant="outline"
                className="border-[#EC4E20] text-[#EC4E20] hover:bg-[#EC4E20] hover:text-white bg-transparent"
              >
                View All Experiences
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
