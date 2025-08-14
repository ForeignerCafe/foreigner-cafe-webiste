"use client"

import { useState, useEffect } from "react"
import axiosInstance from "@/lib/axios"
import Image from "next/image"
import Link from "next/link"

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
      <section id="brand" className="py-20">
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
    <section id="brand" className="py-20 md:m-10 md:mt-10 md:pt-0 md:pb-0">
      <div className="container mx-auto px-4  md:px-6">
        {/* Global Heading */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-16">
  <h2 className="text-3xl md:text-4xl font-bold text-black">OUR CAFE STORY</h2>
  <p className="text-gray-600 text-md mx-auto max-w-[80%] md:max-w-none">
    A place where people, stories, and stillness meet
    and every detail invites <br /> you to stay a little longer
  </p>
</div>

        {content.storyElements.map((element, index) => (
          <div
            key={element.id}
            className={`flex flex-col lg:flex-row items-center gap-12 transition-all duration-1000 ${
              element.layout === "left" ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Media Block - Preserving dynamic media type logic */}
            <div className="w-full lg:w-1/2 relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              {element.media.type === "image" ? (
                <Link href={element.media.linkHref || "#"} className="block group">
                  <Image
                    src={element.media.src || "/placeholder.svg"}
                    alt={element.media.alt || element.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {element.media.alt || element.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="relative w-full h-80 overflow-hidden">
                  <video
                    src={element.media.src}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label={element.media.alt || element.title}
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="text-white text-lg font-bold">{element.media.alt || element.title}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Text Block - Preserving dynamic content */}
            <div className="w-full lg:w-1/2 bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <h3 className="text-3xl font-bold text-black mb-4">{element.title}</h3>
              <p className="text-[14px] text-gray-700 leading-relaxed">{element.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
