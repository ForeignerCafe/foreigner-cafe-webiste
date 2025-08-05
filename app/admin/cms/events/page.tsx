"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Save, Plus, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import axiosInstance from "@/lib/axios"
import Image from "next/image"

interface EventSpace {
  id: string
  name: string
  description: string
  image: string
  capacity: string
}

interface ContentSection {
  id: string
  category: string
  title: string
  description: string
  image: string
  imagePosition: "left" | "right"
}

interface EventsPageData {
  hero: {
    title: string
    subtitle: string
    backgroundImage: string
  }
  contentSections: ContentSection[]
  eventSpaces: EventSpace[]
}

const EventsPagePreview = ({ data }: { data: EventsPageData }) => {
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
          <h1 className="text-4xl font-bold mb-4">{data.hero.title || "Events Title"}</h1>
          <p className="text-xl">{data.hero.subtitle || "Events subtitle"}</p>
        </div>
      </div>

      {/* Content Sections Preview */}
      <div className="p-8 space-y-12">
        {data.contentSections.map((section) => (
          <div
            key={section.id}
            className={`flex items-center gap-8 ${section.imagePosition === "right" ? "flex-row-reverse" : ""}`}
          >
            <div className="flex-1">
              <span className="text-orange-500 text-sm font-semibold uppercase tracking-wide">{section.category}</span>
              <h2 className="text-3xl font-bold mt-2 mb-4">{section.title}</h2>
              <p className="text-gray-600">{section.description}</p>
            </div>
            <div className="flex-1">
              <Image
                src={section.image || "/placeholder.svg?height=300&width=400"}
                alt={section.title}
                width={400}
                height={300}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Event Spaces Preview */}
      {data.eventSpaces.length > 0 && (
        <div className="p-8 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-8">Our Event Spaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.eventSpaces.map((space) => (
              <div key={space.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <Image
                  src={space.image || "/placeholder.svg?height=200&width=300"}
                  alt={space.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{space.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{space.description}</p>
                  <p className="text-orange-500 font-semibold">Capacity: {space.capacity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function EventsPageCMS() {
  const [data, setData] = useState<EventsPageData>({
    hero: {
      title: "Events at Foreigner Cafe",
      subtitle: "Host your next event with us and create memories that last a lifetime.",
      backgroundImage: "/images/events.webp",
    },
    contentSections: [
      {
        id: "1",
        category: "A Space To Unwind",
        title: "Thoughtful Settings for Meaningful Occasions",
        description:
          "Foreigner Café offers intimate spaces for storytelling nights, themed brunches, poetry readings, and more. Designed with intention and comfort, our venues are the perfect backdrop for experiences that feel personal, honest, and memorable.",
        image: "/images/pink.webp",
        imagePosition: "right",
      },
      {
        id: "2",
        category: "Your Next Masterpiece",
        title: "Flexible Settings with Heart and Style",
        description:
          "We understand that no two stories are the same. That's why our team works with you to shape your event around your voice, your rhythm, and your meaning. From layout to lighting, menu to music, Foreigner Café is here to make it feel right, never rushed, never distant.",
        image: "/images/sitting.webp",
        imagePosition: "left",
      },
    ],
    eventSpaces: [
      {
        id: "1",
        name: "Main Hall",
        description:
          "Our Main Hall offers energy, elegance, and moments, woven into thoughtful clusters, warm lighting, and flexible layouts. It's designed for everything.",
        image: "/images/main-hall.webp",
        capacity: "Up to 80 guests",
      },
      {
        id: "2",
        name: "Dining Spaces",
        description:
          "Our dining spaces are designed for intimate togetherness, whether you're planning a storytelling event, a celebration, or a celebratory feast.",
        image: "/images/dining.webp",
        capacity: "Up to 40 guests",
      },
    ],
  })

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [previewEnabled, setPreviewEnabled] = useState<{ [key: string]: boolean }>({})

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await axiosInstance.put("/api/cms/events", data)
      if (response.data.success) {
        toast.success("Events page updated successfully!")
      } else {
        toast.error("Failed to update events page")
      }
    } catch (error) {
      console.error("Error saving events page:", error)
      toast.error("Failed to save changes")
    } finally {
      setSaving(false)
    }
  }

  const addContentSection = () => {
    const newSection: ContentSection = {
      id: Date.now().toString(),
      category: "",
      title: "",
      description: "",
      image: "",
      imagePosition: "left",
    }
    setData((prev) => ({
      ...prev,
      contentSections: [...prev.contentSections, newSection],
    }))
  }

  const removeContentSection = (id: string) => {
    setData((prev) => ({
      ...prev,
      contentSections: prev.contentSections.filter((section) => section.id !== id),
    }))
  }

  const updateContentSection = (id: string, field: keyof ContentSection, value: string) => {
    setData((prev) => ({
      ...prev,
      contentSections: prev.contentSections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section,
      ),
    }))
  }

  const addEventSpace = () => {
    const newSpace: EventSpace = {
      id: Date.now().toString(),
      name: "",
      description: "",
      image: "",
      capacity: "",
    }
    setData((prev) => ({
      ...prev,
      eventSpaces: [...prev.eventSpaces, newSpace],
    }))
  }

  const removeEventSpace = (id: string) => {
    setData((prev) => ({
      ...prev,
      eventSpaces: prev.eventSpaces.filter((space) => space.id !== id),
    }))
  }

  const updateEventSpace = (id: string, field: keyof EventSpace, value: string) => {
    setData((prev) => ({
      ...prev,
      eventSpaces: prev.eventSpaces.map((space) => (space.id === id ? { ...space, [field]: value } : space)),
    }))
  }

  const togglePreview = (section: string) => {
    setPreviewEnabled((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events Page Management</h1>
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
              <Label htmlFor="hero-bg">Background Image URL</Label>
              <Input
                id="hero-bg"
                value={data.hero.backgroundImage}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, backgroundImage: e.target.value },
                  }))
                }
                placeholder="Enter background image URL"
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
                        <h1 className="text-4xl font-bold mb-4">{data.hero.title || "Events Title"}</h1>
                        <p className="text-xl">{data.hero.subtitle || "Events subtitle"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Content Sections */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Content Sections</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => togglePreview("content")}>
                {previewEnabled.content ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {previewEnabled.content ? "Hide Preview" : "Show Preview"}
              </Button>
              <Button onClick={addContentSection} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {data.contentSections.map((section, index) => (
              <div key={section.id} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Section {index + 1}</h4>
                  <Button variant="destructive" size="sm" onClick={() => removeContentSection(section.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Input
                      value={section.category}
                      onChange={(e) => updateContentSection(section.id, "category", e.target.value)}
                      placeholder="e.g., PRIVATE EVENTS"
                    />
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={section.title}
                      onChange={(e) => updateContentSection(section.id, "title", e.target.value)}
                      placeholder="Section title"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={section.description}
                      onChange={(e) => updateContentSection(section.id, "description", e.target.value)}
                      placeholder="Section description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={section.image}
                      onChange={(e) => updateContentSection(section.id, "image", e.target.value)}
                      placeholder="Enter image URL"
                    />
                  </div>
                  <div>
                    <Label>Image Position</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`position-${section.id}`}
                          value="left"
                          checked={section.imagePosition === "left"}
                          onChange={(e) =>
                            updateContentSection(section.id, "imagePosition", e.target.value as "left" | "right")
                          }
                          className="mr-2"
                        />
                        Left
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`position-${section.id}`}
                          value="right"
                          checked={section.imagePosition === "right"}
                          onChange={(e) =>
                            updateContentSection(section.id, "imagePosition", e.target.value as "left" | "right")
                          }
                          className="mr-2"
                        />
                        Right
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {previewEnabled.content && data.contentSections.length > 0 && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">Content Sections Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden" style={{ height: "300px" }}>
                    <div
                      className="p-8 space-y-12"
                      style={{ transform: "scale(0.5)", transformOrigin: "top left", width: "200%" }}
                    >
                      {data.contentSections.map((section) => (
                        <div
                          key={section.id}
                          className={`flex items-center gap-8 ${section.imagePosition === "right" ? "flex-row-reverse" : ""}`}
                        >
                          <div className="flex-1">
                            <span className="text-orange-500 text-sm font-semibold uppercase tracking-wide">
                              {section.category}
                            </span>
                            <h2 className="text-3xl font-bold mt-2 mb-4">{section.title}</h2>
                            <p className="text-gray-600">{section.description}</p>
                          </div>
                          <div className="flex-1">
                            <Image
                              src={section.image || "/placeholder.svg?height=300&width=400"}
                              alt={section.title}
                              width={400}
                              height={300}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Event Spaces */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Event Spaces</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => togglePreview("spaces")}>
                {previewEnabled.spaces ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {previewEnabled.spaces ? "Hide Preview" : "Show Preview"}
              </Button>
              <Button onClick={addEventSpace} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Space
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {data.eventSpaces.map((space, index) => (
              <div key={space.id} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Space {index + 1}</h4>
                  <Button variant="destructive" size="sm" onClick={() => removeEventSpace(space.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={space.name}
                      onChange={(e) => updateEventSpace(space.id, "name", e.target.value)}
                      placeholder="Space name"
                    />
                  </div>
                  <div>
                    <Label>Capacity</Label>
                    <Input
                      value={space.capacity}
                      onChange={(e) => updateEventSpace(space.id, "capacity", e.target.value)}
                      placeholder="e.g., Up to 50 guests"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={space.description}
                      onChange={(e) => updateEventSpace(space.id, "description", e.target.value)}
                      placeholder="Space description"
                      rows={2}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Image URL</Label>
                    <Input
                      value={space.image}
                      onChange={(e) => updateEventSpace(space.id, "image", e.target.value)}
                      placeholder="Enter image URL"
                    />
                  </div>
                </div>
              </div>
            ))}

            {previewEnabled.spaces && data.eventSpaces.length > 0 && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">Event Spaces Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden" style={{ height: "250px" }}>
                    <div
                      className="p-8 bg-gray-50"
                      style={{ transform: "scale(0.5)", transformOrigin: "top left", width: "200%" }}
                    >
                      <h2 className="text-3xl font-bold text-center mb-8">Our Event Spaces</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.eventSpaces.map((space) => (
                          <div key={space.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                            <Image
                              src={space.image || "/placeholder.svg?height=200&width=300"}
                              alt={space.name}
                              width={300}
                              height={200}
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                              <h3 className="font-bold text-lg mb-2">{space.name}</h3>
                              <p className="text-gray-600 text-sm mb-2">{space.description}</p>
                              <p className="text-orange-500 font-semibold">Capacity: {space.capacity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Full Page Preview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Full Page Preview</CardTitle>
            <Button variant="outline" size="sm" onClick={() => togglePreview("fullPage")}>
              {previewEnabled.fullPage ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {previewEnabled.fullPage ? "Hide Preview" : "Show Preview"}
            </Button>
          </CardHeader>
          {previewEnabled.fullPage && (
            <CardContent>
              <div className="overflow-hidden border rounded-lg" style={{ height: "600px" }}>
                <EventsPagePreview data={data} />
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
