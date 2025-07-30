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
    storyElements: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBrandContent()
  }, [])

  const fetchBrandContent = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get("/api/cms/brand-section")
      if (response.data.success) {
        setContent(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch brand content:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          {[1, 2].map((i) => (
            <div key={i} className="grid lg:grid-cols-2 gap-12 items-center mb-20 last:mb-0">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
              <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {content.storyElements.map((element) => (
          <div
            key={element.id}
            className={`grid lg:grid-cols-2 gap-12 items-center mb-20 last:mb-0 ${
              element.layout === "left" ? "lg:grid-flow-col-dense" : ""
            }`}
          >
            {/* Text Content */}
            <div className={element.layout === "left" ? "lg:col-start-2" : ""}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{element.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">{element.text}</p>
              {element.media.linkHref && (
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
                  <a href={element.media.linkHref}>Learn More</a>
                </Button>
              )}
            </div>

            {/* Media Content */}
            <div className={`relative ${element.layout === "left" ? "lg:col-start-1" : ""}`}>
              {element.media.type === "image" ? (
                <img
                  src={element.media.src || "/placeholder.svg"}
                  alt={element.media.alt || element.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              ) : (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                  poster="/placeholder.svg?height=400&width=600"
                >
                  <source src={element.media.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
