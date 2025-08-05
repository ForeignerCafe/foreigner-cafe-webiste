"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"
import axiosInstance from "@/lib/axios"

interface Experience {
  id: number
  title: string
  description: string
  imageSrc: string
  alt?: string
  linkText: string
  linkHref: string
}

interface Testimonial {
  quote: string
  name: string
  avatar: string
}

interface ExperiencesSection {
  experiences: Experience[]
  testimonials: Testimonial[]
}

export default function ExperiencesSection() {
  const [content, setContent] = useState<ExperiencesSection>({
    experiences: [],
    testimonials: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchExperiencesContent()
  }, [])

  const fetchExperiencesContent = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get("/api/cms/experiences")
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
      <section id="experiences" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Experiences Loading */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg animate-pulse">
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
          {/* Testimonials Loading */}
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md animate-pulse">
                <div className="w-6 h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-6 w-3/4"></div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="experiences" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Experiences */}
        {content.experiences.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 uppercase">Experiences</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover unique experiences that go beyond just great coffee
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {content.experiences.slice(0, 2).map((experience) => (
                <Card key={experience.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={experience.imageSrc || "/placeholder.svg"}
                      alt={experience.alt || experience.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                      {experience.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{experience.description}</p>
                    <Button
                      asChild
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300"
                    >
                      <a href={experience.linkHref}>{experience.linkText}</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials */}
        {content.testimonials.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 uppercase">What Our Guests Say</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Hear from the community that makes our cafe special
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {content.testimonials.slice(0, 4).map((testimonial, index) => (
                  <Card
                    key={index}
                    className="bg-white shadow-md p-6 flex flex-col text-left rounded-xl items-start hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardContent className="p-0 w-full">
                      <Quote className="text-[#EC4E20] w-6 h-6 mb-4" />
                      <p className="text-gray-700 text-sm leading-relaxed mb-6">{testimonial.quote}</p>
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-black text-sm">{testimonial.name}</p>
                          <p className="text-xs text-gray-500">Valued Guest</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
