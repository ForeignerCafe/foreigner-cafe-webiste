"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Experience {
  title: string
  description: string
  image: string
  duration: string
  capacity: string
  price: string
  features: string[]
}

interface Testimonial {
  name: string
  rating: number
  comment: string
  experience: string
}

interface ExperiencesContent {
  title: string
  subtitle: string
  experiences: Experience[]
  testimonials: Testimonial[]
}

export default function ExperiencesSection() {
  const [experiencesContent, setExperiencesContent] = useState<ExperiencesContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperiencesContent = async () => {
      try {
        const response = await fetch("/api/cms/experiences")
        if (response.ok) {
          const data = await response.json()
          setExperiencesContent(data.content)
        }
      } catch (error) {
        console.error("Error fetching experiences content:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchExperiencesContent()
  }, [])

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
              <div key={i} className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="w-full h-48 bg-gray-200 animate-pulse" />
                <div className="p-6 space-y-4">
                  <div className="w-3/4 h-6 bg-gray-200 animate-pulse rounded" />
                  <div className="w-full h-4 bg-gray-200 animate-pulse rounded" />
                  <div className="w-2/3 h-4 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!experiencesContent) return null

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{experiencesContent.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{experiencesContent.subtitle}</p>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {experiencesContent.experiences.map((experience, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={experience.image || "/placeholder.svg"}
                  alt={experience.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{experience.title}</h3>
                <p className="text-gray-600 mb-4">{experience.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{experience.capacity}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <ul className="text-sm text-gray-600 space-y-1">
                    {experience.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">{experience.price}</span>
                  <Button className="bg-orange-600 hover:bg-orange-700">Book Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        {experiencesContent.testimonials.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">What Our Guests Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiencesContent.testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.experience}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/experiences">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg">
              View All Experiences
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
