"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/lib/axios"

interface WhatsOnEvent {
  title: string
  description: string
  image: string
  linkText: string
  linkHref: string
}

interface WhatsOnSection {
  title: string
  events: WhatsOnEvent[]
}

export default function EventsSection() {
  const [content, setContent] = useState<WhatsOnSection>({
    title: "WHAT'S ON",
    events: [],
  })

  useEffect(() => {
    fetchWhatsOnContent()
  }, [])

  const fetchWhatsOnContent = async () => {
    try {
      const response = await axiosInstance.get("/api/cms/whats-on")
      if (response.data.success) {
        setContent(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch what's on content:", error)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section id="whats-on" className="bg-white py-12 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-[32px] font-bold tracking-[1.5px] text-black animate-fade-in-up">{content.title}</h2>
          <Button
            onClick={() => scrollToSection("events-all")}
            variant="outline"
            className="text-[11px] tracking-[1px] font-medium border-gray-300 text-gray-700 hover:border-[#1a3d2e] hover:text-[#1a3d2e] px-4 py-2 rounded-none bg-transparent transition-all duration-200 animate-fade-in-up"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {content.events.map((event, index) => (
            <div
              key={index}
              className="group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="overflow-hidden mb-6">
                <img
                  src={event.image || "/placeholder.svg?height=320&width=480"}
                  alt={event.title}
                  className="w-full h-[320px] object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-[18px] font-bold mb-3 tracking-[1px] text-black group-hover:text-[#f77f00] transition-colors duration-200">
                {event.title}
              </h3>
              <p className="text-[12px] text-gray-600 mb-4 leading-relaxed">{event.description}</p>
              <button
                onClick={() => scrollToSection(event.linkHref.replace("#", ""))}
                className="text-[12px] text-[#1a3d2e] font-medium hover:text-[#f77f00] transition-colors duration-200 hover:underline"
              >
                {event.linkText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
