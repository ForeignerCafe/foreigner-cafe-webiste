"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Save, Plus, Trash2 } from 'lucide-react'
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

interface EventSlide {
  id: string
  title: string
  description: string
  leftImage: {
    src: string
    alt: string
  }
  rightImages: {
    src: string
    alt: string
    text?: string
  }[]
  topRightLinkText: string
}

interface EventCarouselData {
  slides: EventSlide[]
  bottomSection: {
    heading: string
    text: string
    buttonText: string
  }
}

const EventsPagePreview = ({ data, carouselData }: { data: EventsPageData, carouselData: EventCarouselData }) => {
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

      {/* Event Carousel Preview (simplified) */}
      {carouselData.slides.length > 0 && (
        <div className="p-8 bg-gray-100">
          <h2 className="text-3xl font-bold text-center mb-8">Event Carousel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {carouselData.slides.map((slide) => (
              <div key={slide.id} className="bg-white rounded-lg overflow-hidden shadow-md p-4">
                <h3 className="font-bold text-lg mb-2">{slide.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{slide.description}</p>
                <div className="flex gap-2 mt-2">
                  <Image src={slide.leftImage.src || "/placeholder.svg"} alt={slide.leftImage.alt} width={100} height={70} className="object-cover rounded" />
                  {slide.rightImages.map((img, idx) => (
                    <Image key={idx} src={img.src || "/placeholder.svg"} alt={img.alt} width={100} height={70} className="object-cover rounded" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <h3 className="text-xl font-bold">{carouselData.bottomSection.heading}</h3>
            <p className="text-gray-600">{carouselData.bottomSection.text}</p>
            <Button className="mt-4">{carouselData.bottomSection.buttonText}</Button>
          </div>
        </div>
      )}

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
                src={section.image || "/placeholder.svg"}
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
                  src={space.image || "/placeholder.svg"}
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
  const [eventsPageData, setEventsPageData] = useState<EventsPageData>({
    hero: {
      title: "",
      subtitle: "",
      backgroundImage: "",
    },
    contentSections: [],
    eventSpaces: [],
  })

  const [eventCarouselData, setEventCarouselData] = useState<EventCarouselData>({
    slides: [],
    bottomSection: {
      heading: "",
      text: "",
      buttonText: "",
    },
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [previewEnabled, setPreviewEnabled] = useState<{ [key: string]: boolean }>({})

 

  useEffect(() => {
    const fetchAllEventsData = async () => {
      setLoading(true)
      try {
        const [pageRes, carouselRes] = await Promise.all([
          axiosInstance.get("/api/cms/events-page"),
          axiosInstance.get("/api/cms/event-carousel"),
        ])

        if (pageRes.data.success) {
          setEventsPageData(pageRes.data.data)
        } else {
          toast.error("Failed to fetch events page data")
        }

        if (carouselRes.data.success) {
          setEventCarouselData(carouselRes.data.data)
        } else {
           toast.error("Failed to fetch events page data")
        }
      } catch (error) {
        console.error("Error fetching all events data:", error)
         toast.error("Failed to fetch events page data")
      } finally {
        setLoading(false)
      }
    }
    fetchAllEventsData()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const [pageSaveRes, carouselSaveRes] = await Promise.all([
        axiosInstance.put("/api/cms/events-page", eventsPageData),
        axiosInstance.put("/api/cms/event-carousel", eventCarouselData),
      ])

      if (pageSaveRes.data.success && carouselSaveRes.data.success) {
        toast.success("Events page and event carousel updated successfully!")
      } else {
         toast.error("Failed to fetch events page data")
      }
    } catch (error) {
      console.error("Error saving events page:", error)
       toast.error("Failed to fetch events page data")
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
    setEventsPageData((prev) => ({
      ...prev,
      contentSections: [...prev.contentSections, newSection],
    }))
  }

  const removeContentSection = (id: string) => {
    setEventsPageData((prev) => ({
      ...prev,
      contentSections: prev.contentSections.filter((section) => section.id !== id),
    }))
  }

  const updateContentSection = (id: string, field: keyof ContentSection, value: string) => {
    setEventsPageData((prev) => ({
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
    setEventsPageData((prev) => ({
      ...prev,
      eventSpaces: [...prev.eventSpaces, newSpace],
    }))
  }

  const removeEventSpace = (id: string) => {
    setEventsPageData((prev) => ({
      ...prev,
      eventSpaces: prev.eventSpaces.filter((space) => space.id !== id),
    }))
  }

  const updateEventSpace = (id: string, field: keyof EventSpace, value: string) => {
    setEventsPageData((prev) => ({
      ...prev,
      eventSpaces: prev.eventSpaces.map((space) => (space.id === id ? { ...space, [field]: value } : space)),
    }))
  }

  const addCarouselSlide = () => {
    const newSlide: EventSlide = {
      id: Date.now().toString(),
      title: "",
      description: "",
      leftImage: { src: "", alt: "" },
      rightImages: [{ src: "", alt: "", text: "" }],
      topRightLinkText: "",
    }
    setEventCarouselData((prev) => ({
      ...prev,
      slides: [...prev.slides, newSlide],
    }))
  }

  const removeCarouselSlide = (id: string) => {
    setEventCarouselData((prev) => ({
      ...prev,
      slides: prev.slides.filter((slide) => slide.id !== id),
    }))
  }

  const updateCarouselSlide = (slideId: string, field: keyof EventSlide, value: any) => {
    setEventCarouselData((prev) => ({
      ...prev,
      slides: prev.slides.map((slide) =>
        slide.id === slideId ? { ...slide, [field]: value } : slide,
      ),
    }))
  }

  const updateCarouselRightImage = (slideId: string, imageIndex: number, field: keyof EventSlide['rightImages'][0], value: string) => {
    setEventCarouselData((prev) => ({
      ...prev,
      slides: prev.slides.map((slide) =>
        slide.id === slideId
          ? {
              ...slide,
              rightImages: slide.rightImages.map((img, idx) =>
                idx === imageIndex ? { ...img, [field]: value } : img
              ),
            }
          : slide
      ),
    }));
  };

  const addCarouselRightImage = (slideId: string) => {
    setEventCarouselData((prev) => ({
      ...prev,
      slides: prev.slides.map((slide) =>
        slide.id === slideId
          ? {
              ...slide,
              rightImages: [...slide.rightImages, { src: "", alt: "", text: "" }],
            }
          : slide
      ),
    }));
  };

  const removeCarouselRightImage = (slideId: string, imageIndex: number) => {
    setEventCarouselData((prev) => ({
      ...prev,
      slides: prev.slides.map((slide) =>
        slide.id === slideId
          ? {
              ...slide,
              rightImages: slide.rightImages.filter((_, idx) => idx !== imageIndex),
            }
          : slide
      ),
    }));
  };


  const updateCarouselBottomSection = (field: keyof EventCarouselData['bottomSection'], value: string) => {
    setEventCarouselData((prev) => ({
      ...prev,
      bottomSection: { ...prev.bottomSection, [field]: value },
    }))
  }

  const togglePreview = (section: string) => {
    setPreviewEnabled((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  if (loading) {
    return <div className="p-6 max-w-7xl mx-auto text-center">Loading CMS data...</div>
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
                value={eventsPageData.hero.title}
                onChange={(e) =>
                  setEventsPageData((prev) => ({
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
                value={eventsPageData.hero.subtitle}
                onChange={(e) =>
                  setEventsPageData((prev) => ({
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
                value={eventsPageData.hero.backgroundImage}
                onChange={(e) =>
                  setEventsPageData((prev) => ({
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
                        backgroundImage: `url(${eventsPageData.hero.backgroundImage || "/placeholder.svg"})`,
                        transform: "scale(0.5)",
                        transformOrigin: "top left",
                        width: "200%",
                        height: "200%",
                      }}
                    >
                      <div className="absolute inset-0 bg-black/50"></div>
                      <div className="relative text-center text-white z-10">
                        <h1 className="text-4xl font-bold mb-4">{eventsPageData.hero.title || "Events Title"}</h1>
                        <p className="text-xl">{eventsPageData.hero.subtitle || "Events subtitle"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Event Carousel */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Event Carousel</CardTitle>
            <div className="flex gap-2">
              {/* <Button variant="outline" size="sm" onClick={() => togglePreview("carousel")}>
                {previewEnabled.carousel ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {previewEnabled.carousel ? "Hide Preview" : "Show Preview"}
              </Button> */}
              <Button onClick={addCarouselSlide} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Slide
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {eventCarouselData.slides.map((slide, index) => (
              <div key={slide.id} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Slide {index + 1}</h4>
                  <Button variant="destructive" size="sm" onClick={() => removeCarouselSlide(slide.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={slide.title}
                      onChange={(e) => updateCarouselSlide(slide.id, "title", e.target.value)}
                      placeholder="Slide title"
                    />
                  </div>
                  <div>
                    <Label>Top Right Link Text</Label>
                    <Input
                      value={slide.topRightLinkText}
                      onChange={(e) => updateCarouselSlide(slide.id, "topRightLinkText", e.target.value)}
                      placeholder="e.g., VIEW MORE"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={slide.description}
                      onChange={(e) => updateCarouselSlide(slide.id, "description", e.target.value)}
                      placeholder="Slide description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Left Image URL</Label>
                    <Input
                      value={slide.leftImage.src}
                      onChange={(e) => updateCarouselSlide(slide.id, "leftImage", { ...slide.leftImage, src: e.target.value })}
                      placeholder="Enter left image URL"
                    />
                  </div>
                  <div>
                    <Label>Left Image Alt Text</Label>
                    <Input
                      value={slide.leftImage.alt}
                      onChange={(e) => updateCarouselSlide(slide.id, "leftImage", { ...slide.leftImage, alt: e.target.value })}
                      placeholder="Enter left image alt text"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Right Images</Label>
                    {slide.rightImages.map((img, imgIndex) => (
                      <div key={imgIndex} className="flex items-center gap-2 mb-2">
                        <Input
                          value={img.src}
                          onChange={(e) => updateCarouselRightImage(slide.id, imgIndex, "src", e.target.value)}
                          placeholder={`Right Image ${imgIndex + 1} URL`}
                        />
                        <Input
                          value={img.alt}
                          onChange={(e) => updateCarouselRightImage(slide.id, imgIndex, "alt", e.target.value)}
                          placeholder={`Right Image ${imgIndex + 1} Alt Text`}
                        />
                        <Input
                          value={img.text || ""}
                          onChange={(e) => updateCarouselRightImage(slide.id, imgIndex, "text", e.target.value)}
                          placeholder={`Right Image ${imgIndex + 1} Text (Optional)`}
                        />
                        <Button variant="destructive" size="sm" onClick={() => removeCarouselRightImage(slide.id, imgIndex)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addCarouselRightImage(slide.id)}>
                      <Plus className="w-4 h-4 mr-2" /> Add Right Image
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div className="border rounded-lg p-4 mt-4 space-y-4">
              <h4 className="font-semibold">Bottom Section</h4>
              <div>
                <Label>Heading</Label>
                <Input
                  value={eventCarouselData.bottomSection.heading}
                  onChange={(e) => updateCarouselBottomSection("heading", e.target.value)}
                  placeholder="Bottom section heading"
                />
              </div>
              <div>
                <Label>Text</Label>
                <Textarea
                  value={eventCarouselData.bottomSection.text}
                  onChange={(e) => updateCarouselBottomSection("text", e.target.value)}
                  placeholder="Bottom section text"
                  rows={2}
                />
              </div>
              <div>
                <Label>Button Text</Label>
                <Input
                  value={eventCarouselData.bottomSection.buttonText}
                  onChange={(e) => updateCarouselBottomSection("buttonText", e.target.value)}
                  placeholder="Button text"
                />
              </div>
            </div>

            {previewEnabled.carousel && eventCarouselData.slides.length > 0 && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">Event Carousel Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden" style={{ height: "300px" }}>
                    <div
                      className="p-8 bg-gray-100"
                      style={{ transform: "scale(0.5)", transformOrigin: "top left", width: "200%" }}
                    >
                      <h2 className="text-3xl font-bold text-center mb-8">Event Carousel</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {eventCarouselData.slides.map((slide) => (
                          <div key={slide.id} className="bg-white rounded-lg overflow-hidden shadow-md p-4">
                            <h3 className="font-bold text-lg mb-2">{slide.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">{slide.description}</p>
                            <div className="flex gap-2 mt-2">
                              <Image src={slide.leftImage.src || "/placeholder.svg"} alt={slide.leftImage.alt} width={100} height={70} className="object-cover rounded" />
                              {slide.rightImages.map((img, idx) => (
                                <Image key={idx} src={img.src || "/placeholder.svg"} alt={img.alt} width={100} height={70} className="object-cover rounded" />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-center mt-8">
                        <h3 className="text-xl font-bold">{eventCarouselData.bottomSection.heading}</h3>
                        <p className="text-gray-600">{eventCarouselData.bottomSection.text}</p>
                        <Button className="mt-4">{eventCarouselData.bottomSection.buttonText}</Button>
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
              {/* <Button variant="outline" size="sm" onClick={() => togglePreview("content")}>
                {previewEnabled.content ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {previewEnabled.content ? "Hide Preview" : "Show Preview"}
              </Button> */}
              <Button onClick={addContentSection} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {eventsPageData.contentSections.map((section, index) => (
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

            {previewEnabled.content && eventsPageData.contentSections.length > 0 && (
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
                      {eventsPageData.contentSections.map((section) => (
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
                              src={section.image || "/placeholder.svg"}
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
              {/* <Button variant="outline" size="sm" onClick={() => togglePreview("spaces")}>
                {previewEnabled.spaces ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {previewEnabled.spaces ? "Hide Preview" : "Show Preview"}
              </Button> */}
              <Button onClick={addEventSpace} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Space
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {eventsPageData.eventSpaces.map((space, index) => (
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

            {previewEnabled.spaces && eventsPageData.eventSpaces.length > 0 && (
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
                        {eventsPageData.eventSpaces.map((space) => (
                          <div key={space.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                            <Image
                              src={space.image || "/placeholder.svg"}
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
        {/* <Card>
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
                <EventsPagePreview data={eventsPageData} carouselData={eventCarouselData} />
              </div>
            </CardContent>
          )}
        </Card> */}
      </div>
    </div>
  )
}
