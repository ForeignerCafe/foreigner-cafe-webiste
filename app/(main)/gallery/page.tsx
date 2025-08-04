"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import axiosInstance from "@/lib/axios"

interface GalleryImage {
  id: number
  src: string
  alt: string
  caption?: string
}

interface GallerySection {
  id: number
  name: string
  description?: string
  images: GalleryImage[]
}

interface GalleryData {
  sections: GallerySection[]
}

export default function GalleryPage() {
  const [galleryData, setGalleryData] = useState<GalleryData>({ sections: [] })
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSection, setSelectedSection] = useState<number | null>(null)

  useEffect(() => {
    fetchGalleryData()
  }, [])

  const fetchGalleryData = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get("/api/cms/gallery")
      if (response.data.success) {
        setGalleryData(response.data.data)
        if (response.data.data.sections.length > 0) {
          setSelectedSection(response.data.data.sections[0].id)
        }
      }
    } catch (error) {
      console.error("Failed to fetch gallery data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedSectionData = galleryData.sections.find((section) => section.id === selectedSection)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10 w-32" />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton
                key={i}
                className={`rounded-lg ${
                  i % 7 === 0
                    ? "md:col-span-2 md:row-span-2 h-96"
                    : i % 5 === 0
                      ? "lg:col-span-2 h-48"
                      : i % 3 === 0
                        ? "md:row-span-2 h-80"
                        : "h-48"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 uppercase">Gallery</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Explore moments and memories from our cafe</p>
        </div>

        {/* Section Filters */}
        {galleryData.sections.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {galleryData.sections.map((section) => (
              <Badge
                key={section.id}
                variant={selectedSection === section.id ? "default" : "outline"}
                className={`cursor-pointer px-6 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  selectedSection === section.id
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "text-gray-600 hover:text-orange-500 hover:border-orange-500"
                }`}
                onClick={() => setSelectedSection(section.id)}
              >
                {section.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Selected Section Description */}
        {selectedSectionData?.description && (
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{selectedSectionData.description}</p>
          </div>
        )}

        {/* Bento Grid Gallery */}
        {selectedSectionData && selectedSectionData.images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {selectedSectionData.images.map((image, index) => {
              // Create varied grid patterns for bento layout
              let gridClass = "h-48" // default height

              if (index % 7 === 0) {
                gridClass = "md:col-span-2 md:row-span-2 h-96" // Large square
              } else if (index % 5 === 0) {
                gridClass = "lg:col-span-2 h-48" // Wide rectangle
              } else if (index % 3 === 0) {
                gridClass = "md:row-span-2 h-80" // Tall rectangle
              }

              return (
                <Card
                  key={image.id}
                  className={`group overflow-hidden hover:shadow-xl transition-all duration-300 ${gridClass}`}
                >
                  <div className="relative overflow-hidden h-full">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                    {/* Caption Overlay */}
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {image.caption}
                        </p>
                      </div>
                    )}

                    {/* Hover overlay with image info */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-xs font-medium text-gray-800">
                          {index + 1} / {selectedSectionData.images.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No images available in this section.</p>
          </div>
        )}

        {/* Empty State */}
        {galleryData.sections.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Gallery is being updated. Please check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
