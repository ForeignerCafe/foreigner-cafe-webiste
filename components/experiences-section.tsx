"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import axiosInstance from "@/lib/axios"

interface Experience {
  id: number
  title: string
  slug: string
  description: string
  imageSrc: string
  alt?: string
  buttonText: string
  isPublished: boolean
}

interface ExperiencesData {
  experiences: Experience[]
}

export default function ExperiencesSection() {
  const [content, setContent] = useState<ExperiencesData>({
    experiences: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchExperiencesContent()
  }, [])

  const fetchExperiencesContent = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get("/api/experiences")
      if (response.data.success) {
        setContent(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch experiences content:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (content.experiences.length === 0) {
    return null
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-4 tracking-wide">
            UNIQUE EXPERIENCES
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
            Discover our carefully crafted experiences designed to create lasting memories and connections.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.experiences.slice(0, 3).map((experience) => (
            <Card
              key={experience.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={experience.imageSrc || "/placeholder.svg"}
                  alt={experience.alt || experience.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-black mb-3">{experience.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{experience.description}</p>
                <Link href={`/experiences/${experience.slug}`}>
                  <Button className="w-full bg-[#EC4E20] hover:bg-[#f97316] text-white">{experience.buttonText}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {content.experiences.length > 3 && (
          <div className="text-center mt-12">
            <Link href="/experiences">
              <Button
                variant="outline"
                className="border-[#EC4E20] text-[#EC4E20] hover:bg-[#EC4E20] hover:text-white px-8 py-3 bg-transparent"
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
