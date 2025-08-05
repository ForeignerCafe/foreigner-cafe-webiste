"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Star, Quote } from "lucide-react"
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
    experiences: [
      {
        id: 1,
        title: "Coffee Tasting Sessions",
        description:
          "Join our expert baristas for guided coffee tasting sessions where you'll discover the nuances of different coffee origins, brewing methods, and flavor profiles.",
        imageSrc: "/placeholder.svg?height=300&width=400",
        alt: "Coffee tasting session",
        linkText: "Book Session",
        linkHref: "/experiences/coffee-tasting",
      },
      {
        id: 2,
        title: "Latte Art Workshops",
        description:
          "Learn the art of creating beautiful latte designs from our skilled baristas. Perfect for coffee enthusiasts who want to master this impressive skill.",
        imageSrc: "/placeholder.svg?height=300&width=400",
        alt: "Latte art workshop",
        linkText: "Join Workshop",
        linkHref: "/experiences/latte-art",
      },
      {
        id: 3,
        title: "Cultural Events",
        description:
          "Experience diverse cultures through our regular events featuring international music, art exhibitions, and cultural celebrations that bring our community together.",
        imageSrc: "/placeholder.svg?height=300&width=400",
        alt: "Cultural event",
        linkText: "View Events",
        linkHref: "/events",
      },
    ],
    testimonials: [
      {
        quote:
          "The coffee tasting session was incredible! I learned so much about different coffee origins and brewing techniques. The staff is incredibly knowledgeable and passionate.",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=60&width=60",
      },
      {
        quote:
          "Foreigner Cafe has become my second home. The atmosphere is perfect for working, and the cultural events always introduce me to something new and exciting.",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=60&width=60",
      },
    ],
  })

  useEffect(() => {
    fetchExperiencesContent()
  }, [])

  const fetchExperiencesContent = async () => {
    try {
      const response = await axiosInstance.get("/api/cms/experiences")
      if (response.data.success) {
        setContent(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch experiences content:", error)
    }
  }

  return (
    <section id="experiences" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Experiences */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 animate-fade-in-up">EXPERIENCES</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Immerse yourself in unique experiences that go beyond just great coffee
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {content.experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={experience.imageSrc || "/placeholder.svg?height=250&width=400"}
                  alt={experience.alt || experience.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-4 group-hover:text-orange-500 transition-colors duration-200">
                  {experience.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">{experience.description}</p>

                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200"
                  onClick={() => window.open(experience.linkHref, "_blank")}
                >
                  {experience.linkText}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">What Our Guests Say</h3>
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-gray-50 rounded-lg p-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <Quote className="w-8 h-8 text-orange-500 mb-4" />
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg?height=50&width=50"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-black">{testimonial.name}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
