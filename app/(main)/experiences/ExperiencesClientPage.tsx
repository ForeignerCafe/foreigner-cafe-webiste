// @ts-nocheck
"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"
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

interface Testimonial {
  quote: string
  name: string
  avatar: string
}

interface ExperiencesData {
  experiences: Experience[]
  testimonials: Testimonial[]
}

export default function ExperiencesClientPage() {
  const [content, setContent] = useState<ExperiencesData>({
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
      const response = await axiosInstance.get("/api/experiences")

      if (response?.data?.success) {
        setContent({
          experiences: Array.isArray(response.data.data?.experiences)
            ? response.data.data.experiences
            : [],
          testimonials: Array.isArray(response.data.data?.testimonials)
            ? response.data.data.testimonials
            : [],
        })
      } else {
        setContent({ experiences: [], testimonials: [] })
      }
    } catch (error) {
      console.error("Failed to fetch experiences content:", error)
      setContent({ experiences: [], testimonials: [] })
    } finally {
      setIsLoading(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
          </div>
        }
      >
        {isLoading ? (
          /* 🔹 Loading UI */
          <main className="flex flex-col min-h-screen">
            <section className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-center text-white overflow-hidden">
              <Image
                src="/images/expHero.webp"
                alt="Loading Experiences"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/50" />
            </section>
          </main>
        ) : (
          /* 🔹 Main UI */
          <main className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-center text-white overflow-hidden">
              <Image
                src="/images/expHero.webp"
                alt="People gathering under string lights"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight sm:mb-10 mt-14 uppercase">
                  Unique Experiences Await You
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-xl max-w-2xl mx-auto pb-6 sm:pb-10">
                  Discover our carefully crafted experiences designed to create lasting memories.
                </p>
                {Array.isArray(content.experiences) && content.experiences.length > 0 && (
                  <Button
                    onClick={() => scrollToSection("experiences")}
                    className="hover:scale-110 bg-[#EC4E20] hover:bg-[#f97316] hover:text-black text-white px-6 sm:px-8 py-3 text-base sm:text-lg"
                  >
                    Explore Experiences
                  </Button>
                )}
              </div>
            </section>

            {/* Experiences Section */}
            {Array.isArray(content.experiences) && content.experiences.length > 0 && (
              <section id="experiences" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                  <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-4 tracking-wide">
                      OUR EXPERIENCES
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
                      From coffee tastings to private events, discover unique ways to connect with our community.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {content.experiences.map((experience) => (
                      <Card key={experience.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
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
                            <Button className="w-full bg-[#EC4E20] hover:bg-[#f97316] text-white">
                              {experience.buttonText}
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Words From Community Section */}
            {Array.isArray(content.testimonials) && content.testimonials.length > 0 && (
              <section id="words" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-4 tracking-wide">
                    WORDS FROM COMMUNITY
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-8">
                    Hear from the people who've made Foreigner part of their everyday.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {content.testimonials.map((testimonial, index) => (
                      <Card key={index} className="bg-white shadow-lg p-4 flex flex-col items-center">
                        <CardContent className="p-0 w-full">
                          <Quote className="text-[#EC4E20] w-6 h-6 mb-3 mx-auto" />
                          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">
                            {testimonial.quote}
                          </p>
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                              <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                              <AvatarFallback>
                                {testimonial.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-black text-xs sm:text-sm">{testimonial.name}</p>
                              <p className="text-xs sm:text-sm text-gray-500">San Francisco</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </main>
        )}
      </Suspense>
    </div>
  )
}
