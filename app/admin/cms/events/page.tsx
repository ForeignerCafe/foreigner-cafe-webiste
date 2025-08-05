"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Save, Loader2, Eye, EyeOff, Monitor } from "lucide-react"
import toast from "react-hot-toast"
import axiosInstance from "@/lib/axios"
import { FormSkeleton } from "@/components/ui/skeleton-components"
import Image from "next/image"

interface EventSpace {
  id: number
  imageSrc: string
  imageAlt: string
  title: string
  description: string
}

interface EventContent {
  id: number
  category: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  imagePosition: "left" | "right"
}

interface EventsPageData {
  heroSection: {
    title: string
    subtitle: string
    backgroundImage: string
  }
  contentSections: EventContent[]
  eventSpaces: EventSpace[]
}

function EventsPagePreview({ data }: { data: EventsPageData }) {
  return (
    <div className="bg-white min-h-[600px] rounded-lg border overflow-hidden">
      <div className="transform scale-50 origin-top-left w-[200%]">
        {/* Hero Section */}
        <section className="relative w-full min-h-screen overflow-hidden">
          <Image
            src={data.heroSection.backgroundImage || "/placeholder.svg?height=800&width=1200"}
            alt="Events hero"
            width={1200}
            height={800}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-4xl mt-20 uppercase">
              {data.heroSection.title}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl">{data.heroSection.subtitle}</p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-0 mt-0">
            <div className="grid grid-cols-1">
              {data.contentSections.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 justify-items-start m-6">
                  <div
                    className={
                      item.imagePosition === "right"
                        ? "order-2 md:order-1 p-4 sm:p-8 md:p-16"
                        : "order-2 md:order-2 p-4 sm:p-8 md:p-16"
                    }
                  >
                    <p className="text-sm text-gray-500 mb-2 uppercase underline underline-offset-1 cursor-pointer tracking-wide">
                      {item.category}
                    </p>
                    <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-[0.9rem] mb-6 font-normal text-wrap">{item.description}</p>
                  </div>
                  <div
                    className={
                      item.imagePosition === "right"
                        ? "order-1 md:order-2 w-full h-[500px]"
                        : "order-1 md:order-1 w-full h-[400px]"
                    }
                  >
                    <Image
                      src={item.imageSrc || "/placeholder.svg?height=400&width=600"}
                      alt={item.imageAlt}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover shadow-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Spaces */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14 mt-6">
              <h2 className="text-3xl md:text-4xl font-bold text-black">OUR EVENT SPACES</h2>
              <p className="mt-2 text-gray-600 text-lg">
                Our event spaces are crafted for connection inviting you to gather, celebrate, and feel at home.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-4 mx-4 sm:mx-8 md:mx-16 lg:mx-[8rem]">
              {data.eventSpaces.map((space, index) => (
                <div key={index} className="overflow-hidden shadow-lg border rounded-lg">
                  <div className="w-full h-[300px]">
                    <Image
                      src={space.imageSrc || "/placeholder.svg?height=300&width=400"}
                      alt={space.imageAlt}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl text-center uppercase font-semibold text-gray-800 mb-2">{space.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{space.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default function EventsCMSPage() {
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [previewEnabled, setPreviewEnabled] = useState(false)

  const [eventsPageData, setEventsPageData] = useState<EventsPageData>({
    heroSection: {
      title: "",
      subtitle: "",
      backgroundImage: "",
    },
    contentSections: [],
    eventSpaces: [],
  })

  useEffect(() => {
    fetchEventsPageData()
  }, [])

  const fetchEventsPageData = async () => {
    try {
      setInitialLoading(true)
      const response = await axiosInstance.get("/api/cms/events-page")
      if (response.data.success) {
        setEventsPageData(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch events page data:", error)
      // Set default data if API fails
      setEventsPageData({
        heroSection: {
          title: "Events at Foreigner Cafe",
          subtitle: "Host your next event with us and create memories that last a lifetime.",
          backgroundImage: "/images/events.webp",
        },
        contentSections: [
          {
            id: 1,
            category: "A Space To Unwind",
            title: "Thoughtful Settings for Meaningful Occasions",
            description:
              "Foreigner Café offers intimate spaces for storytelling nights, themed brunches, poetry readings, and more. Designed with intention and comfort, our venues are the perfect backdrop for experiences that feel personal, honest, and memorable.",
            imageSrc: "/images/pink.webp",
            imageAlt: "Elegant restaurant interior",
            imagePosition: "right",
          },
          {
            id: 2,
            category: "Your Next Masterpiece",
            title: "Flexible Settings with Heart and Style",
            description:
              "We understand that no two stories are the same. That's why our team works with you to shape your event around your voice, your rhythm, and your meaning. From layout to lighting, menu to music, Foreigner Café is here to make it feel right, never rushed, never distant.",
            imageSrc: "/images/sitting.webp",
            imageAlt: "Restaurant dining area",
            imagePosition: "left",
          },
        ],
        eventSpaces: [
          {
            id: 1,
            imageSrc: "/images/main-hall.webp",
            imageAlt: "Main Hall",
            title: "Main Hall",
            description:
              "Our Main Hall offers energy, elegance, and moments, woven into thoughtful clusters, warm lighting, and flexible layouts. It's designed for everything.",
          },
          {
            id: 2,
            imageSrc: "/images/dining.webp",
            imageAlt: "Dining Spaces",
            title: "Dining Spaces",
            description:
              "Our dining spaces are designed for intimate togetherness, whether you're planning a storytelling event, a celebration, or a celebratory feast.",
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
      const response = await axiosInstance.put("/api/cms/events-page", eventsPageData)
      if (response.data.success) {
        toast.success("Events page updated successfully!")
      } else {
        toast.error("Failed to update events page")
      }
    } catch (error) {
      toast.error("Failed to update events page")
    } finally {
      setLoading(false)
    }
  }

  const addContentSection = () => {
    const newId = Math.max(...eventsPageData.contentSections.map((s) => s.id), 0) + 1
    setEventsPageData((prev) => ({
      ...prev,
      contentSections: [
        ...prev.contentSections,
        {
          id: newId,
          category: "",
          title: "",
          description: "",
          imageSrc: "",
          imageAlt: "",
          imagePosition: "right",
        },
      ],
    }))
  }

  const removeContentSection = (id: number) => {
    setEventsPageData((prev) => ({
      ...prev,
      contentSections: prev.contentSections.filter((s) => s.id !== id),
    }))
  }

  const updateContentSection = (id: number, field: keyof EventContent, value: any) => {
    setEventsPageData((prev) => ({
      ...prev,
      contentSections: prev.contentSections.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }))
  }

  const addEventSpace = () => {
    const newId = Math.max(...eventsPageData.eventSpaces.map((s) => s.id), 0) + 1
    setEventsPageData((prev) => ({
      ...prev,
      eventSpaces: [
        ...prev.eventSpaces,
        {
          id: newId,
          imageSrc: "",
          imageAlt: "",
          title: "",
          description: "",
        },
      ],
    }))
  }

  const removeEventSpace = (id: number) => {
    setEventsPageData((prev) => ({
      ...prev,
      eventSpaces: prev.eventSpaces.filter((s) => s.id !== id),
    }))
  }

  const updateEventSpace = (id: number, field: keyof EventSpace, value: any) => {
    setEventsPageData((prev) => ({
      ...prev,
      eventSpaces: prev.eventSpaces.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Events Page Management</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Manage your events page content and layout</p>
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
            <CardDescription>Manage the main hero section of your events page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="hero-title">Title</Label>
              <Input
                id="hero-title"
                value={eventsPageData.heroSection.title}
                onChange={(e) =>
                  setEventsPageData((prev) => ({
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
                value={eventsPageData.heroSection.subtitle}
                onChange={(e) =>
                  setEventsPageData((prev) => ({
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
                value={eventsPageData.heroSection.backgroundImage}
                onChange={(e) =>
                  setEventsPageData((prev) => ({
                    ...prev,
                    heroSection: { ...prev.heroSection, backgroundImage: e.target.value },
                  }))
                }
                placeholder="Enter background image URL"
              />
            </div>
          </CardContent>
        </Card>

        {/* Content Sections */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Content Sections</CardTitle>
            <CardDescription>Manage the main content sections with images and text</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Sections</h3>
              <Button onClick={addContentSection} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </div>
            {eventsPageData.contentSections.map((section) => (
              <div key={section.id} className="border rounded-lg p-4 shadow-sm bg-background">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">Section {section.id}</h4>
                  <Button onClick={() => removeContentSection(section.id)} variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Category</Label>
                    <Input
                      value={section.category}
                      onChange={(e) => updateContentSection(section.id, "category", e.target.value)}
                      placeholder="Enter category"
                    />
                  </div>
                  <div>
                    <Label>Image Position</Label>
                    <select
                      value={section.imagePosition}
                      onChange={(e) => updateContentSection(section.id, "imagePosition", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <Label>Title</Label>
                  <Input
                    value={section.title}
                    onChange={(e) => updateContentSection(section.id, "title", e.target.value)}
                    placeholder="Enter section title"
                  />
                </div>
                <div className="mb-4">
                  <Label>Description</Label>
                  <Textarea
                    value={section.description}
                    onChange={(e) => updateContentSection(section.id, "description", e.target.value)}
                    placeholder="Enter section description"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={section.imageSrc}
                      onChange={(e) => updateContentSection(section.id, "imageSrc", e.target.value)}
                      placeholder="Enter image URL"
                    />
                  </div>
                  <div>
                    <Label>Image Alt Text</Label>
                    <Input
                      value={section.imageAlt}
                      onChange={(e) => updateContentSection(section.id, "imageAlt", e.target.value)}
                      placeholder="Enter image alt text"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Event Spaces */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Event Spaces</CardTitle>
            <CardDescription>Manage your event spaces showcase section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Spaces</h3>
              <Button onClick={addEventSpace} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Space
              </Button>
            </div>
            {eventsPageData.eventSpaces.map((space) => (
              <div key={space.id} className="border rounded-lg p-4 shadow-sm bg-background">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">Space {space.id}</h4>
                  <Button onClick={() => removeEventSpace(space.id)} variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={space.title}
                      onChange={(e) => updateEventSpace(space.id, "title", e.target.value)}
                      placeholder="Enter space title"
                    />
                  </div>
                  <div>
                    <Label>Image Alt Text</Label>
                    <Input
                      value={space.imageAlt}
                      onChange={(e) => updateEventSpace(space.id, "imageAlt", e.target.value)}
                      placeholder="Enter image alt text"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Label>Description</Label>
                  <Textarea
                    value={space.description}
                    onChange={(e) => updateEventSpace(space.id, "description", e.target.value)}
                    placeholder="Enter space description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={space.imageSrc}
                    onChange={(e) => updateEventSpace(space.id, "imageSrc", e.target.value)}
                    placeholder="Enter image URL"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={loading} className="w-full md:w-auto">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Events Page
          </Button>
        </div>

        {/* Preview */}
        {previewEnabled && (
          <Card className="mt-6 border-blue-200 bg-blue-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Live Preview - Events Page
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <EventsPagePreview data={eventsPageData} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
