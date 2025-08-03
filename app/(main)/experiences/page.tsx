"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
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

interface ExperiencesData {
  experiences: Experience[]
  testimonials: Testimonial[]
}

export default function ExperiencesPage() {
  const [experiencesData, setExperiencesData] = useState<ExperiencesData>({
    experiences: [],
    testimonials: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchExperiencesData()
  }, [])

  const fetchExperiencesData = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get("/api/cms/experiences")
      if (response.data.success) {
        setExperiencesData(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch experiences data:", error)
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

  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen">
        {/* Hero Section Loading */}
        <section className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
          <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-8 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-64 mx-auto mb-6 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
          </div>
        </section>

        {/* Content Loading */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8 animate-pulse"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mx-4 sm:mx-8 lg:mx-20 mt-6 sm:mt-10">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-lg p-6 animate-pulse">
                  <div className="w-6 h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-6 w-3/4"></div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="h-4 bg-gray-300 rounded w-20 mb-1"></div>
                      <div className="h-3 bg-gray-300 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
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
        <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
        <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight sm:mb-10 mt-14 uppercase">
            Every Gathering Becomes a Memory
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-xl max-w-2xl mx-auto pb-6 sm:pb-10">
            Discover immersive, soulful experiences that bring people together—through stories, food, and presence.
          </p>
          <Button
            onClick={() => scrollToSection("words")}
            className="hover:scale-110 bg-[#EC4E20] hover:bg-[#f97316] hover:text-black text-white px-6 sm:px-8 py-3 text-base sm:text-lg"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Words From Community Section */}
      <section id="words" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-4 mt-6 sm:mt-10 tracking-wide">
            WORDS FROM COMMUNITY
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-8 sm:mb-14">
            Hear from the people who've made Foreigner part of their everyday a place for reflection, conversation, and
            good coffee.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mx-4 sm:mx-8 lg:mx-20 mt-6 sm:mt-10">
            {experiencesData.testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg p-4 sm:p-6 flex flex-col text-left rounded-[0.5rem] items-center"
              >
                <CardContent className="p-0 w-full">
                  <Quote className="text-[#EC4E20] w-6 h-6 sm:w-8 sm:h-8 mb-3 sm:mb-4 mx-auto" />
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">{testimonial.quote}</p>
                  <div className="flex items-center space-x-3 sm:space-x-4 justify-start">
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

          {/* Empty State */}
          {experiencesData.testimonials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No testimonials available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
