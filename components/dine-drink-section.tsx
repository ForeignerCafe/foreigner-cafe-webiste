"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/lib/axios"
import { ReservationModal } from "@/components/reserveModal"

interface Venue {
  name: string
  location: string
  description: string
  image: string
  link?: string
  bookLink?: string
}

interface DineDrinkContent {
  venues: Venue[]
}

export default function DineDrinkSection() {
  const [content, setContent] = useState<DineDrinkContent>({
    venues: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    fetchDineDrinkContent()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const fetchDineDrinkContent = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get("/api/cms/dine-drink")
      if (response.data.success) {
        setContent(response.data.data)
        setIsVisible(true)
      }
    } catch (error) {
      console.error("Failed to fetch dine & drink content:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <section className="bg-white py-8 sm:py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12">
            <div className="h-8 sm:h-10 md:h-12 lg:h-14 bg-gray-200 rounded w-64 mb-4 md:mb-0 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group overflow-hidden rounded-lg animate-pulse">
                <div className="h-52 sm:h-64 bg-gray-200"></div>
                <div className="p-4 sm:p-6 bg-white h-[240px] sm:h-[220px]">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded mb-2 sm:mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (content.venues.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} className="bg-white py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-0">
            DINE + DRINK
          </h2>
        </div>

        {/* Venue Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {content.venues.map((venue, index) => (
            <div
              key={index}
              className={`group overflow-hidden rounded-lg transition-all duration-500 transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              {venue.link ? (
                <Link href={venue.link} className="block overflow-hidden">
                  <img
                    src={venue.image || "/placeholder.svg"}
                    alt={venue.name}
                    className="w-full h-52 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>
              ) : (
                <div className="block overflow-hidden">
                  <img
                    src={venue.image || "/placeholder.svg"}
                    alt={venue.name}
                    className="w-full h-52 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="p-4 sm:p-6 bg-white flex flex-col h-[240px] sm:h-[220px]">
                {/* Location */}
                <div className="flex items-center text-gray-600 text-sm font-medium mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-cafeGreen" />
                  <span className="tracking-wide">{venue.location}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3">{venue.name}</h3>

                {/* Description */}
                <p className="text-sm text-gray-700 leading-relaxed mb-4 sm:mb-6 flex-grow">{venue.description}</p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
                  <Button
                    onClick={() => setIsReservationModalOpen(true)}
                    className="bg-[#EC4E20] hover:bg-[#f97316] text-white hover:text-black "
                  >
                    Book Event
                  </Button>
                  {venue.link && (
                    <Button
                      asChild
                      variant="link"
                      className="flex-1 text-cafeGreen hover:text-black hover:underline px-0 justify-center sm:justify-start"
                    >
                      <Link href={venue.link}>View Venue</Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ReservationModal open={isReservationModalOpen} onOpenChange={setIsReservationModalOpen} />
    </section>
  )
}
