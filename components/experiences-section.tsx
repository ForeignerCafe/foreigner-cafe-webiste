"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Experience {
  id: number
  title: string
  slug: string
  description: string
  imageSrc: string
  alt?: string
  buttonText: string
}

interface Testimonial {
  quote: string
  name: string
  avatar: string
}

interface ExperiencesSectionData {
  experiences: Experience[]
  testimonials: Testimonial[]
}

export default function ExperiencesSection() {
  const [data, setData] = useState<ExperiencesSectionData>({
    experiences: [],
    testimonials: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch("/api/cms/experiences")
      const result = await response.json()

      if (result.success) {
        // Filter only published experiences
        const publishedExperiences = result.data.experiences.filter((exp: any) => exp.isPublished !== false)

        setData({
          experiences: publishedExperiences,
          testimonials: result.data.testimonials || [],
        })
      }
    } catch (error) {
      console.error("Error fetching experiences:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-96 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (data.experiences.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Experiences</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover unique moments and create lasting memories with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {data.experiences.slice(0, 6).map((experience) => (
            <div
              key={experience.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative aspect-video">
                <Image
                  src={experience.imageSrc || "/placeholder.svg?height=300&width=400"}
                  alt={experience.alt || experience.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3">{experience.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-3">{experience.description}</p>
                <Link href={`/experiences/${experience.slug}`}>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">{experience.buttonText}</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        {data.testimonials.length > 0 && (
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-center mb-12">What Our Guests Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg?height=50&width=50"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View All Button */}
        {data.experiences.length > 6 && (
          <div className="text-center mt-12">
            <Link href="/experiences">
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
              >
                View All Experiences
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
