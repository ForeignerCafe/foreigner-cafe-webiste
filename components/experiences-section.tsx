"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Experience {
  title: string
  description: string
  image: string
  features: string[]
  link: string
}

interface ExperiencesSectionData {
  title: string
  description: string
  experiences: Experience[]
}

export default function ExperiencesSection() {
  const [content, setContent] = useState<ExperiencesSectionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/cms/experiences")
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setContent(data.data)
        }
      }
    } catch (error) {
      console.error("Failed to fetch experiences content:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
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

  if (!content) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Experiences</h2>
            <p className="text-lg text-gray-600 mb-12">
              Discover unique experiences that bring people together through food, culture, and community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Coffee Tasting",
                  description: "Explore the world of specialty coffee with our expert-led tasting sessions.",
                  image: "/placeholder.svg?height=300&width=400",
                  features: ["Expert guidance", "Premium beans", "Tasting notes"],
                  link: "/experiences/coffee-tasting",
                },
                {
                  title: "Cultural Events",
                  description: "Join us for cultural celebrations and community gatherings.",
                  image: "/placeholder.svg?height=300&width=400",
                  features: ["Live music", "Traditional food", "Community spirit"],
                  link: "/experiences/cultural-events",
                },
                {
                  title: "Cooking Classes",
                  description: "Learn to prepare authentic dishes from around the world.",
                  image: "/placeholder.svg?height=300&width=400",
                  features: ["Hands-on learning", "Professional chefs", "Take-home recipes"],
                  link: "/experiences/cooking-classes",
                },
              ].map((experience, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={experience.image || "/placeholder.svg"}
                      alt={experience.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{experience.title}</CardTitle>
                    <CardDescription>{experience.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {experience.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild className="w-full">
                      <Link href={experience.link}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{content.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.experiences.map((experience, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={experience.image || "/placeholder.svg"}
                  alt={experience.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{experience.title}</CardTitle>
                <CardDescription>{experience.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {experience.features.map((feature, featureIndex) => (
                    <Badge key={featureIndex} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="w-full">
                  <Link href={experience.link}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
