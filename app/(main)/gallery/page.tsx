"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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

          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton
                key={i}
                className={`w-full rounded-lg ${i % 3 === 0 ? "h-80" : i % 2 === 0 ? "h-60" : "h-48"}`}
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
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 uppercase"
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Explore moments and memories from our cafe
          </motion.p>
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
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 max-w-7xl mx-auto">
            {selectedSectionData.images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="break-inside-avoid group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                  {/* Caption Overlay */}
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm font-medium">{image.caption}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
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
