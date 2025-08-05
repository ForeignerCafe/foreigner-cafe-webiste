"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/lib/axios"

interface StoryElement {
  id: number
  layout: "left" | "right"
  title: string
  text: string
  media: {
    type: "image" | "video"
    src: string
    alt?: string
    linkHref?: string
  }
}

interface BrandSection {
  storyElements: StoryElement[]
}

export default function BrandSection() {
  const [content, setContent] = useState<BrandSection>({
    storyElements: [
      {
        id: 1,
        layout: "left",
        title: "Our Story",
        text: "Founded in the heart of the city, Foreigner Cafe began as a dream to create a space where cultures converge over exceptional coffee. Our journey started with a simple belief: that great coffee has the power to bring people together, regardless of where they come from.",
        media: {
          type: "image",
          src: "/placeholder.svg?height=400&width=600",
          alt: "Cafe interior story",
        },
      },
      {
        id: 2,
        layout: "right",
        title: "Our Mission",
        text: "We're committed to sourcing the finest beans from around the world, supporting local communities, and creating an inclusive environment where everyone feels at home. Every cup tells a story, and we're here to help you discover yours.",
        media: {
          type: "image",
          src: "/placeholder.svg?height=400&width=600",
          alt: "Coffee beans and roasting",
        },
      },
    ],
  })

  useEffect(() => {
    fetchBrandContent()
  }, [])

  const fetchBrandContent = async () => {
    try {
      const response = await axiosInstance.get("/api/cms/brand-section")
      if (response.data.success) {
        setContent(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch brand content:", error)
    }
  }

  return (
    <section id="our-story" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 animate-fade-in-up">OUR CAFE STORY</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }} />
        </div>

        <div className="space-y-24">
          {content.storyElements.map((element, index) => (
            <div
              key={element.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {/* Media */}
              <div className={`${element.layout === "right" ? "lg:order-2" : ""}`}>
                {element.media.type === "video" ? (
                  <video autoPlay muted loop playsInline className="w-full h-[400px] object-cover rounded-lg shadow-lg">
                    <source src={element.media.src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={element.media.src || "/placeholder.svg?height=400&width=600"}
                    alt={element.media.alt || element.title}
                    className="w-full h-[400px] object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>

              {/* Content */}
              <div className={`${element.layout === "right" ? "lg:order-1" : ""}`}>
                <h3 className="text-3xl md:text-4xl font-bold text-black mb-6">{element.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">{element.text}</p>
                {element.media.linkHref && (
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
                    onClick={() => window.open(element.media.linkHref, "_blank")}
                  >
                    Learn More
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
