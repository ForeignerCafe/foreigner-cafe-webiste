"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import axiosInstance from "@/lib/axios"
import Link from "next/link"

interface Event {
  title: string
  image: string
}

interface EventsContent {
  sectionTitle: string
  sectionSubtitle: string
  events: Event[]
  ctaTitle: string
  ctaDescription: string
  ctaButtonText: string
  ctaButtonLink: string
}

export default function EventsShowcaseSection() {
  const [content, setContent] = useState<EventsContent>({
    sectionTitle: "Upcoming Events",
    sectionSubtitle: "Join us for exciting experiences",
    events: [],
    ctaTitle: "Book Your Experience",
    ctaDescription: "Don't miss out on our special events",
    ctaButtonText: "Reserve Now",
    ctaButtonLink: "/events",
  })
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetchEventsContent()
  }, [])

  const fetchEventsContent = async () => {
    try {
      const response = await axiosInstance.get("/api/cms/events")
      if (response.data.success) {
        setContent(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch events content:", error)
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % content.events.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + content.events.length) % content.events.length)
  }

  if (content.events.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{content.sectionTitle}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{content.sectionSubtitle}</p>
        </div>

        {/* Events Carousel */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {content.events.map((event, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-0">
                      <div className="relative h-64 md:h-80">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end">
                          <div className="p-6 text-white">
                            <h3 className="text-2xl md:text-3xl font-bold">{event.title}</h3>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {content.events.length > 1 && (
            <>
              <Button
                onClick={prevSlide}
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                onClick={nextSlide}
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Dots Indicator */}
          {content.events.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {content.events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-orange-500" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">{content.ctaTitle}</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">{content.ctaDescription}</p>
          <Link href={content.ctaButtonLink}>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
              {content.ctaButtonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
