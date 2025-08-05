"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import axiosInstance from "@/lib/axios"

interface Venue {
  name: string
  location: string
  description: string
  image: string
}

interface DineDrinkContent {
  venues: Venue[]
}

export default function DineDrinkSection() {
  const [content, setContent] = useState<DineDrinkContent>({
    venues: [
      {
        name: "Main Dining Hall",
        location: "Ground Floor",
        description:
          "Our spacious main dining area features comfortable seating, natural lighting, and a warm atmosphere perfect for casual dining, business meetings, or catching up with friends.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        name: "Rooftop Bar",
        location: "Top Floor",
        description:
          "Enjoy panoramic city views while sipping on craft cocktails and specialty drinks. Our rooftop bar offers an elevated experience with a curated selection of wines and spirits.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        name: "Private Dining Room",
        location: "Second Floor",
        description:
          "Perfect for intimate gatherings, business dinners, or special celebrations. Our private dining room accommodates up to 20 guests with personalized service and custom menus.",
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
  })

  useEffect(() => {
    fetchDineDrinkContent()
  }, [])

  const fetchDineDrinkContent = async () => {
    try {
      const response = await axiosInstance.get("/api/cms/dine-drink")
      if (response.data.success) {
        setContent(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch dine & drink content:", error)
    }
  }

  return (
    <section id="dine-drink" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 animate-fade-in-up">DINE + DRINK</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Discover our diverse dining spaces, each designed to offer a unique experience
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.venues.map((venue, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={venue.image || "/placeholder.svg?height=300&width=400"}
                  alt={venue.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              </div>

              <div className="p-6">
                <div className="flex items-center mb-3">
                  <MapPin className="w-4 h-4 text-orange-500 mr-2" />
                  <span className="text-sm text-gray-500 font-medium">{venue.location}</span>
                </div>

                <h3 className="text-xl font-bold text-black mb-4 group-hover:text-orange-500 transition-colors duration-200">
                  {venue.name}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">{venue.description}</p>

                <Button
                  variant="outline"
                  className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-200 bg-transparent"
                >
                  Reserve Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
            View All Venues
          </Button>
        </div>
      </div>
    </section>
  )
}
