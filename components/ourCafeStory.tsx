"use client"

import { useState, useEffect } from "react"
import axiosInstance from "@/lib/axios"

interface StorySection {
  title: string
  content: string
  mainImage: string
  smallImage: string
}

interface CafeStoryContent {
  sections: StorySection[]
}

export default function OurCafeStory() {
  const [content, setContent] = useState<CafeStoryContent>({
    sections: [],
  })

  useEffect(() => {
    fetchCafeStoryContent()
  }, [])

  const fetchCafeStoryContent = async () => {
    try {
      const response = await axiosInstance.get("/api/cms/cafe-story")
      if (response.data.success) {
        setContent(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch cafe story content:", error)
    }
  }

  if (content.sections.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Cafe Story</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the journey that brought us here
          </p>
        </div>

        {/* Story Sections */}
        <div className="space-y-16">
          {content.sections.map((section, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{section.title}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{section.content}</p>

                {/* Small Image */}
                <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                  <img
                    src={section.smallImage || "/placeholder.svg"}
                    alt={`${section.title} detail`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Main Image */}
              <div className="flex-1">
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={section.mainImage || "/placeholder.svg"}
                    alt={section.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
