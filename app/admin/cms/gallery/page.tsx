"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Save, Loader2, Eye, EyeOff, Monitor } from "lucide-react"
import toast from "react-hot-toast"
import axiosInstance from "@/lib/axios"
import { FormSkeleton } from "@/components/ui/skeleton-components"
import Image from "next/image"

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

interface GalleryPageData {
  heroSection: {
    title: string
    subtitle: string
    backgroundImage: string
  }
  sections: GallerySection[]
}

function GalleryPagePreview({ data }: { data: GalleryPageData }) {
  const [selectedSection, setSelectedSection] = useState<number | null>(
    data.sections.length > 0 ? data.sections[0].id : null,
  )

  const selectedSectionData = data.sections.find((section) => section.id === selectedSection)

  return (
    <div className="bg-white min-h-[600px] rounded-lg border overflow-hidden">
      <div className="transform scale-50 origin-top-left w-[200%]">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[400px] lg:h-[500px] flex items-center justify-center text-center text-white overflow-hidden mb-10">
          <Image
            src={data.heroSection.backgroundImage || "/placeholder.svg?height=500&width=1200"}
            alt="Gallery hero"
            width={1200}
            height={500}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
          <div className="relative z-10 px-4 max-w-4xl mx-auto space-y-2">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mt-10 uppercase">
              {data.heroSection.title}
            </h1>
            <p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto pb-6">{data.heroSection.subtitle}</p>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Section Filters */}
          {data.sections.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {data.sections.map((section) => (
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
                  <div
                    key={image.id}
                    className={`group overflow-hidden hover:shadow-xl transition-all duration-300 border rounded-lg ${gridClass}`}
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
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No images available in this section.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function GalleryCMSPage() {
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [previewEnabled, setPreviewEnabled] = useState(false)

  const [galleryPageData, setGalleryPageData] = useState<GalleryPageData>({
    heroSection: {
      title: "",
      subtitle: "",
      backgroundImage: "",
    },
    sections: [],
  })

  useEffect(() => {
    fetchGalleryPageData()
  }, [])

  const fetchGalleryPageData = async () => {
    try {
      setInitialLoading(true)
      const response = await axiosInstance.get("/api/cms/gallery")
      if (response.data.success) {
        // Transform the existing gallery data to match our page structure
        const existingData = response.data.data
        setGalleryPageData({
          heroSection: {
            title: "Explore Our Cafe Gallery",
            subtitle: "Savor the warmth and joy of every shared moment at our cafe.",
            backgroundImage: "/images/blues.webp",
          },
          sections: existingData.sections || [],
        })
      }
    } catch (error) {
      console.error("Failed to fetch gallery page data:", error)
      // Set default data if API fails
      setGalleryPageData({
        heroSection: {
          title: "Explore Our Cafe Gallery",
          subtitle: "Savor the warmth and joy of every shared moment at our cafe.",
          backgroundImage: "/images/blues.webp",
        },
        sections: [
          {
            id: 1,
            name: "Recent Events",
            description: "Highlights from our latest events and gatherings",
            images: [
              {
                id: 1,
                src: "/placeholder.svg?height=400&width=400",
                alt: "Event photo 1",
                caption: "Community gathering",
              },
            ],
          },
        ],
      })
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // Save both hero section and gallery sections
      const galleryData = { sections: galleryPageData.sections }
      const response = await axiosInstance.put("/api/cms/gallery", galleryData)

      if (response.data.success) {
        toast.success("Gallery page updated successfully!")
      } else {
        toast.error("Failed to update gallery page")
      }
    } catch (error) {
      toast.error("Failed to update gallery page")
    } finally {
      setLoading(false)
    }
  }

  const addSection = () => {
    const newId = Math.max(...galleryPageData.sections.map((s) => s.id), 0) + 1
    setGalleryPageData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: newId,
          name: "",
          description: "",
          images: [],
        },
      ],
    }))
  }

  const removeSection = (id: number) => {
    setGalleryPageData((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== id),
    }))
  }

  const updateSection = (id: number, field: string, value: string) => {
    setGalleryPageData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }))
  }

  const addImage = (sectionId: number) => {
    setGalleryPageData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              images: [
                ...s.images,
                { id: Math.max(...s.images.map((img) => img.id), 0) + 1, src: "", alt: "", caption: "" },
              ],
            }
          : s,
      ),
    }))
  }

  const removeImage = (sectionId: number, imageId: number) => {
    setGalleryPageData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, images: s.images.filter((img) => img.id !== imageId) } : s,
      ),
    }))
  }

  const updateImage = (sectionId: number, imageId: number, field: keyof GalleryImage, value: string | number) => {
    setGalleryPageData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId
          ? { ...s, images: s.images.map((img) => (img.id === imageId ? { ...img, [field]: value } : img)) }
          : s,
      ),
    }))
  }

  if (initialLoading) {
    return (
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="h-8 bg-gray-200 rounded w-96 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
        </div>
        <FormSkeleton />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Gallery Page Management</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Manage your gallery page content and images</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPreviewEnabled(!previewEnabled)}
          className={`${previewEnabled ? "bg-green-50 border-green-200 text-green-700" : ""}`}
        >
          {previewEnabled ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
          {previewEnabled ? "Hide Preview" : "Show Preview"}
        </Button>
      </div>

      <div className="space-y-8">
        {/* Hero Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
            <CardDescription>Manage the main hero section of your gallery page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="hero-title">Title</Label>
              <Input
                id="hero-title"
                value={galleryPageData.heroSection.title}
                onChange={(e) =>
                  setGalleryPageData((prev) => ({
                    ...prev,
                    heroSection: { ...prev.heroSection, title: e.target.value },
                  }))
                }
                placeholder="Enter hero title"
              />
            </div>
            <div>
              <Label htmlFor="hero-subtitle">Subtitle</Label>
              <Textarea
                id="hero-subtitle"
                value={galleryPageData.heroSection.subtitle}
                onChange={(e) =>
                  setGalleryPageData((prev) => ({
                    ...prev,
                    heroSection: { ...prev.heroSection, subtitle: e.target.value },
                  }))
                }
                placeholder="Enter hero subtitle"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="hero-bg">Background Image URL</Label>
              <Input
                id="hero-bg"
                value={galleryPageData.heroSection.backgroundImage}
                onChange={(e) =>
                  setGalleryPageData((prev) => ({
                    ...prev,
                    heroSection: { ...prev.heroSection, backgroundImage: e.target.value },
                  }))
                }
                placeholder="Enter background image URL"
              />
            </div>
          </CardContent>
        </Card>

        {/* Gallery Sections */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Gallery Sections</CardTitle>
            <CardDescription>Manage gallery sections and their images</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Gallery Sections</h3>
              <Button onClick={addSection} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </div>
            {galleryPageData.sections.map((section) => (
              <div key={section.id} className="border rounded-lg p-4 shadow-sm bg-background">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">
                    Section: {section.name || `Section ${section.id}`}
                  </h4>
                  <Button onClick={() => removeSection(section.id)} variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Section Name</Label>
                    <Input
                      value={section.name}
                      onChange={(e) => updateSection(section.id, "name", e.target.value)}
                      placeholder="Enter section name"
                    />
                  </div>
                  <div>
                    <Label>Description (optional)</Label>
                    <Input
                      value={section.description || ""}
                      onChange={(e) => updateSection(section.id, "description", e.target.value)}
                      placeholder="Enter section description"
                    />
                  </div>
                </div>

                {/* Images for this section */}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-700">Images</h5>
                    <Button onClick={() => addImage(section.id)} size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Image
                    </Button>
                  </div>
                  {section.images.map((image) => (
                    <div key={image.id} className="border rounded p-3 mb-3 bg-gray-50 dark:bg-transparent">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Image {image.id}</span>
                        <Button onClick={() => removeImage(section.id, image.id)} variant="destructive" size="sm">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label className="text-xs">Image URL</Label>
                          <Input
                            value={image.src}
                            onChange={(e) => updateImage(section.id, image.id, "src", e.target.value)}
                            placeholder="Enter image URL"
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Alt Text</Label>
                          <Input
                            value={image.alt}
                            onChange={(e) => updateImage(section.id, image.id, "alt", e.target.value)}
                            placeholder="Enter alt text"
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Caption (optional)</Label>
                          <Input
                            value={image.caption || ""}
                            onChange={(e) => updateImage(section.id, image.id, "caption", e.target.value)}
                            placeholder="Enter caption"
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={loading} className="w-full md:w-auto">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Gallery Page
          </Button>
        </div>

        {/* Preview */}
        {previewEnabled && (
          <Card className="mt-6 border-blue-200 bg-blue-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Live Preview - Gallery Page
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <GalleryPagePreview data={galleryPageData} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
