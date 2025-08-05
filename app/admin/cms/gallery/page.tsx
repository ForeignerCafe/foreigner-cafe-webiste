"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Save, Plus, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import axiosInstance from "@/lib/axios"
import { ImageUpload } from "@/components/dashboard/image-upload"

interface GalleryImage {
  id: string
  url: string
  alt: string
  caption?: string
}

interface GallerySection {
  id: string
  title: string
  category: string
  images: GalleryImage[]
}

interface GalleryPageData {
  hero: {
    title: string
    subtitle: string
    backgroundImage: string
  }
  sections: GallerySection[]
}

const GalleryPagePreview = ({ data }: { data: GalleryPageData }) => {
  const [activeFilter, setActiveFilter] = useState("all")

  const categories = ["all", ...Array.from(new Set(data.sections.map((s) => s.category)))]
  const filteredSections =
    activeFilter === "all" ? data.sections : data.sections.filter((s) => s.category === activeFilter)

  return (
    <div
      className="w-full bg-white rounded-lg overflow-hidden"
      style={{ transform: "scale(0.5)", transformOrigin: "top left", width: "200%", height: "200%" }}
    >
      {/* Hero Section Preview */}
      <div
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${data.hero.backgroundImage || "/placeholder.svg?height=400&width=800"})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-4xl font-bold mb-4">{data.hero.title || "Gallery Title"}</h1>
          <p className="text-xl">{data.hero.subtitle || "Gallery subtitle"}</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="p-8">
        <div className="flex justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === category ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSections.map((section) => (
            <div key={section.id} className="space-y-4">
              <h3 className="text-xl font-bold">{section.title}</h3>
              <div className="grid grid-cols-2 gap-2">
                {section.images.slice(0, 4).map((image, idx) => (
                  <div key={image.id} className={`${idx === 0 ? "col-span-2 row-span-2" : ""}`}>
                    <img
                      src={image.url || "/placeholder.svg?height=200&width=300"}
                      alt={image.alt}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function GalleryPageCMS() {
  const [data, setData] = useState<GalleryPageData>({
    hero: {
      title: "",
      subtitle: "",
      backgroundImage: "",
    },
    sections: [],
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [previewEnabled, setPreviewEnabled] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/cms/gallery")
      if (response.data.success) {
        setData(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching gallery data:", error)
      toast.error("Failed to load gallery data")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await axiosInstance.post("/api/cms/gallery", data)
      if (response.data.success) {
        toast.success("Gallery page updated successfully!")
      } else {
        toast.error("Failed to update gallery page")
      }
    } catch (error) {
      console.error("Error saving gallery:", error)
      toast.error("Failed to save changes")
    } finally {
      setSaving(false)
    }
  }

  const addSection = () => {
    const newSection: GallerySection = {
      id: Date.now().toString(),
      title: "",
      category: "",
      images: [],
    }
    setData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }))
  }

  const removeSection = (id: string) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== id),
    }))
  }

  const updateSection = (id: string, field: keyof GallerySection, value: any) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => (section.id === id ? { ...section, [field]: value } : section)),
    }))
  }

  const addImageToSection = (sectionId: string) => {
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      url: "",
      alt: "",
      caption: "",
    }
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, images: [...section.images, newImage] } : section,
      ),
    }))
  }

  const removeImageFromSection = (sectionId: string, imageId: string) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, images: section.images.filter((img) => img.id !== imageId) } : section,
      ),
    }))
  }

  const updateImage = (sectionId: string, imageId: string, field: keyof GalleryImage, value: string) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              images: section.images.map((img) => (img.id === imageId ? { ...img, [field]: value } : img)),
            }
          : section,
      ),
    }))
  }

  const togglePreview = (section: string) => {
    setPreviewEnabled((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gallery Page Management</h1>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="space-y-8">
        {/* Hero Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Hero Section</CardTitle>
            <Button variant="outline" size="sm" onClick={() => togglePreview("hero")}>
              {previewEnabled.hero ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {previewEnabled.hero ? "Hide Preview" : "Show Preview"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="hero-title">Title</Label>
              <Input
                id="hero-title"
                value={data.hero.title}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, title: e.target.value },
                  }))
                }
                placeholder="Enter hero title"
              />
            </div>
            <div>
              <Label htmlFor="hero-subtitle">Subtitle</Label>
              <Input
                id="hero-subtitle"
                value={data.hero.subtitle}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, subtitle: e.target.value },
                  }))
                }
                placeholder="Enter hero subtitle"
              />
            </div>
            <div>
              <Label>Background Image</Label>
              <ImageUpload
                value={data.hero.backgroundImage}
                onChange={(url) =>
                  setData((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, backgroundImage: url },
                  }))
                }
              />
            </div>

            {previewEnabled.hero && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">Hero Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden" style={{ height: "200px" }}>
                    <div
                      className="relative h-96 bg-cover bg-center flex items-center justify-center"
                      style={{
                        backgroundImage: `url(${data.hero.backgroundImage || "/placeholder.svg?height=400&width=800"})`,
                        transform: "scale(0.5)",
                        transformOrigin: "top left",
                        width: "200%",
                        height: "200%",
                      }}
                    >
                      <div className="absolute inset-0 bg-black/50"></div>
                      <div className="relative text-center text-white z-10">
                        <h1 className="text-4xl font-bold mb-4">{data.hero.title || "Gallery Title"}</h1>
                        <p className="text-xl">{data.hero.subtitle || "Gallery subtitle"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Gallery Sections */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Gallery Sections</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => togglePreview("gallery")}>
                {previewEnabled.gallery ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {previewEnabled.gallery ? "Hide Preview" : "Show Preview"}
              </Button>
              <Button onClick={addSection} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {data.sections.map((section, index) => (
              <div key={section.id} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Section {index + 1}</h4>
                  <Button variant="destructive" size="sm" onClick={() => removeSection(section.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Section Title</Label>
                    <Input
                      value={section.title}
                      onChange={(e) => updateSection(section.id, "title", e.target.value)}
                      placeholder="Section title"
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input
                      value={section.category}
                      onChange={(e) => updateSection(section.id, "category", e.target.value)}
                      placeholder="e.g., interior, food, events"
                    />
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Images</Label>
                    <Button variant="outline" size="sm" onClick={() => addImageToSection(section.id)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Image
                    </Button>
                  </div>
                  {section.images.map((image, imgIndex) => (
                    <div key={image.id} className="border rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Image {imgIndex + 1}</span>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeImageFromSection(section.id, image.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label>Image</Label>
                          <ImageUpload
                            value={image.url}
                            onChange={(url) => updateImage(section.id, image.id, "url", url)}
                          />
                        </div>
                        <div>
                          <Label>Alt Text</Label>
                          <Input
                            value={image.alt}
                            onChange={(e) => updateImage(section.id, image.id, "alt", e.target.value)}
                            placeholder="Alt text for accessibility"
                          />
                        </div>
                        <div>
                          <Label>Caption (Optional)</Label>
                          <Input
                            value={image.caption || ""}
                            onChange={(e) => updateImage(section.id, image.id, "caption", e.target.value)}
                            placeholder="Image caption"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {previewEnabled.gallery && data.sections.length > 0 && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">Gallery Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden" style={{ height: "400px" }}>
                    <GalleryPagePreview data={data} />
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
