"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Save, Loader2, Video, ImageIcon } from "lucide-react"
import toast from "react-hot-toast"
import axiosInstance from "@/lib/axios"

interface HeroContent {
  title: string
  subtitle: string
  description: string
  videoUrl: string
}

interface WhatsOnEvent {
  title: string
  description: string
  image: string
  linkText: string
  linkHref: string
}

interface WhatsOnSection {
  title: string
  events: WhatsOnEvent[]
}

interface EventImage {
  src: string
  alt: string
}

interface EventsSection {
  title: string
  description: string
  buttonText: string
  buttonLink: string
  eventImages: EventImage[]
}

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

interface Experience {
  id: number
  title: string
  description: string
  imageSrc: string
  alt?: string
  linkText: string
  linkHref: string
}

interface Testimonial {
  quote: string
  name: string
  avatar: string
}

interface ExperiencesSection {
  experiences: Experience[]
  testimonials: Testimonial[]
}

interface Venue {
  name: string
  location: string
  description: string
  image: string
}

interface DineDrinkContent {
  venues: Venue[]
}

export default function CMSPage() {
  const [loading, setLoading] = useState(false)
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: "",
    subtitle: "",
    description: "",
    videoUrl: "",
  })
  const [whatsOnSection, setWhatsOnSection] = useState<WhatsOnSection>({
    title: "",
    events: [],
  })
  const [eventsSection, setEventsSection] = useState<EventsSection>({
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    eventImages: [],
  })
  const [brandSection, setBrandSection] = useState<BrandSection>({
    storyElements: [],
  })
  const [experiencesSection, setExperiencesSection] = useState<ExperiencesSection>({
    experiences: [],
    testimonials: [],
  })
  const [dineDrinkContent, setDineDrinkContent] = useState<DineDrinkContent>({
    venues: [],
  })

  // Fetch all content on component mount
  useEffect(() => {
    fetchAllContent()
  }, [])

  const fetchAllContent = async () => {
    try {
      const [heroRes, whatsOnRes, eventsRes, brandRes, experiencesRes, dineDrinkRes] = await Promise.all([
        axiosInstance.get("/api/cms/hero"),
        axiosInstance.get("/api/cms/whats-on"),
        axiosInstance.get("/api/cms/events"),
        axiosInstance.get("/api/cms/brand-section"),
        axiosInstance.get("/api/cms/experiences"),
        axiosInstance.get("/api/cms/dine-drink"),
      ])

      if (heroRes.data.success) setHeroContent(heroRes.data.data)
      if (whatsOnRes.data.success) setWhatsOnSection(whatsOnRes.data.data)
      if (eventsRes.data.success) setEventsSection(eventsRes.data.data)
      if (brandRes.data.success) setBrandSection(brandRes.data.data)
      if (experiencesRes.data.success) setExperiencesSection(experiencesRes.data.data)
      if (dineDrinkRes.data.success) setDineDrinkContent(dineDrinkRes.data.data)
    } catch (error) {
      toast.error("Failed to fetch content")
    }
  }

  // Hero Section Handlers
  const handleHeroSave = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.put("/api/cms/hero", heroContent)
      if (response.data.success) {
        toast.success("Hero content updated successfully!")
      } else {
        toast.error("Failed to update hero content")
      }
    } catch (error) {
      toast.error("Failed to update hero content")
    } finally {
      setLoading(false)
    }
  }

  // What's On Section Handlers
  const handleWhatsOnAddEvent = () => {
    setWhatsOnSection((prev) => ({
      ...prev,
      events: [...prev.events, { title: "", description: "", image: "", linkText: "", linkHref: "" }],
    }))
  }

  const handleWhatsOnRemoveEvent = (index: number) => {
    setWhatsOnSection((prev) => ({
      ...prev,
      events: prev.events.filter((_, i) => i !== index),
    }))
  }

  const handleWhatsOnUpdateEvent = (index: number, field: keyof WhatsOnEvent, value: string) => {
    setWhatsOnSection((prev) => ({
      ...prev,
      events: prev.events.map((event, i) => (i === index ? { ...event, [field]: value } : event)),
    }))
  }

  const handleWhatsOnSave = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.put("/api/cms/whats-on", whatsOnSection)
      if (response.data.success) {
        toast.success("What's On section updated successfully!")
      } else {
        toast.error("Failed to update What's On section")
      }
    } catch (error) {
      toast.error("Failed to update What's On section")
    } finally {
      setLoading(false)
    }
  }

  // Events Section Handlers
  const handleEventsAddImage = () => {
    setEventsSection((prev) => ({
      ...prev,
      eventImages: [...prev.eventImages, { src: "", alt: "" }],
    }))
  }

  const handleEventsRemoveImage = (index: number) => {
    setEventsSection((prev) => ({
      ...prev,
      eventImages: prev.eventImages.filter((_, i) => i !== index),
    }))
  }

  const handleEventsUpdateImage = (index: number, field: keyof EventImage, value: string) => {
    setEventsSection((prev) => ({
      ...prev,
      eventImages: prev.eventImages.map((image, i) => (i === index ? { ...image, [field]: value } : image)),
    }))
  }

  const handleEventsSave = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.put("/api/cms/events", eventsSection)
      if (response.data.success) {
        toast.success("Events section updated successfully!")
      } else {
        toast.error("Failed to update events section")
      }
    } catch (error) {
      toast.error("Failed to update events section")
    } finally {
      setLoading(false)
    }
  }

  // Brand Section Handlers
  const handleBrandAddStoryElement = () => {
    const newId = Math.max(...brandSection.storyElements.map((el) => el.id), 0) + 1
    setBrandSection((prev) => ({
      storyElements: [
        ...prev.storyElements,
        {
          id: newId,
          layout: "right",
          title: "",
          text: "",
          media: {
            type: "image",
            src: "",
            alt: "",
            linkHref: "",
          },
        },
      ],
    }))
  }

  const handleBrandRemoveStoryElement = (id: number) => {
    setBrandSection((prev) => ({
      storyElements: prev.storyElements.filter((el) => el.id !== id),
    }))
  }

  const handleBrandUpdateStoryElement = (id: number, field: string, value: any) => {
    setBrandSection((prev) => ({
      storyElements: prev.storyElements.map((el) =>
        el.id === id
          ? field.includes("media.")
            ? { ...el, media: { ...el.media, [field.split(".")[1]]: value } }
            : { ...el, [field]: value }
          : el,
      ),
    }))
  }

  const handleBrandSave = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.put("/api/cms/brand-section", brandSection)
      if (response.data.success) {
        toast.success("Brand section updated successfully!")
      } else {
        toast.error("Failed to update brand section")
      }
    } catch (error) {
      toast.error("Failed to update brand section")
    } finally {
      setLoading(false)
    }
  }

  // Experiences Section Handlers
  const handleExperiencesAddExperience = () => {
    const newId = Math.max(...experiencesSection.experiences.map((exp) => exp.id), 0) + 1
    setExperiencesSection((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: newId,
          title: "",
          description: "",
          imageSrc: "",
          alt: "",
          linkText: "",
          linkHref: "",
        },
      ],
    }))
  }

  const handleExperiencesRemoveExperience = (id: number) => {
    setExperiencesSection((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }))
  }

  const handleExperiencesUpdateExperience = (id: number, field: keyof Experience, value: string | number) => {
    setExperiencesSection((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const handleExperiencesAddTestimonial = () => {
    setExperiencesSection((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, { quote: "", name: "", avatar: "" }],
    }))
  }

  const handleExperiencesRemoveTestimonial = (index: number) => {
    setExperiencesSection((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index),
    }))
  }

  const handleExperiencesUpdateTestimonial = (index: number, field: keyof Testimonial, value: string) => {
    setExperiencesSection((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((testimonial, i) =>
        i === index ? { ...testimonial, [field]: value } : testimonial,
      ),
    }))
  }

  const handleExperiencesSave = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.put("/api/cms/experiences", experiencesSection)
      if (response.data.success) {
        toast.success("Experiences section updated successfully!")
      } else {
        toast.error("Failed to update experiences section")
      }
    } catch (error) {
      toast.error("Failed to update experiences section")
    } finally {
      setLoading(false)
    }
  }

  // Dine & Drink Section Handlers
  const handleDineDrinkAddVenue = () => {
    setDineDrinkContent((prev) => ({
      venues: [...prev.venues, { name: "", location: "", description: "", image: "" }],
    }))
  }

  const handleDineDrinkRemoveVenue = (index: number) => {
    setDineDrinkContent((prev) => ({
      venues: prev.venues.filter((_, i) => i !== index),
    }))
  }

  const handleDineDrinkUpdateVenue = (index: number, field: keyof Venue, value: string) => {
    setDineDrinkContent((prev) => ({
      venues: prev.venues.map((venue, i) => (i === index ? { ...venue, [field]: value } : venue)),
    }))
  }

  const handleDineDrinkSave = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.put("/api/cms/dine-drink", dineDrinkContent)
      if (response.data.success) {
        toast.success("Dine & Drink content updated successfully!")
      } else {
        toast.error("Failed to update dine & drink content")
      }
    } catch (error) {
      toast.error("Failed to update dine & drink content")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Content Management System</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your homepage content sections</p>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="whats-on">What's On</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="brand">Cafe Story</TabsTrigger>
          <TabsTrigger value="experiences">Experiences</TabsTrigger>
          <TabsTrigger value="dine-drink">Dine & Drink</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>
                Manage the main hero section of your homepage including the background video
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hero-title">Title</Label>
                <Input
                  id="hero-title"
                  value={heroContent.title}
                  onChange={(e) => setHeroContent((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter hero title"
                />
              </div>
              <div>
                <Label htmlFor="hero-subtitle">Subtitle</Label>
                <Input
                  id="hero-subtitle"
                  value={heroContent.subtitle}
                  onChange={(e) => setHeroContent((prev) => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Enter hero subtitle"
                />
              </div>
              <div>
                <Label htmlFor="hero-description">Description</Label>
                <Textarea
                  id="hero-description"
                  value={heroContent.description}
                  onChange={(e) => setHeroContent((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter hero description"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="hero-video" className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Background Video URL
                </Label>
                <Input
                  id="hero-video"
                  value={heroContent.videoUrl}
                  onChange={(e) => setHeroContent((prev) => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="Enter video URL (e.g., /videos/hero.mp4 or https://example.com/video.mp4)"
                />
                <p className="text-sm text-gray-500 mt-1">Use local paths like /videos/hero.mp4 or external URLs</p>
              </div>
              <Button onClick={handleHeroSave} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Hero Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* What's On Section */}
        <TabsContent value="whats-on">
          <Card>
            <CardHeader>
              <CardTitle>What's On Section</CardTitle>
              <CardDescription>Manage the "What's On" showcase section (events-section.tsx)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="whats-on-title">Section Title</Label>
                <Input
                  id="whats-on-title"
                  value={whatsOnSection.title}
                  onChange={(e) => setWhatsOnSection((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter section title (e.g., WHAT'S ON)"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Events</h3>
                  <Button onClick={handleWhatsOnAddEvent} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                  </Button>
                </div>

                {whatsOnSection.events.map((event, index) => (
                  <div key={index} className="border rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Event {index + 1}</h4>
                      <Button onClick={() => handleWhatsOnRemoveEvent(index)} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label>Event Title</Label>
                        <Input
                          value={event.title}
                          onChange={(e) => handleWhatsOnUpdateEvent(index, "title", e.target.value)}
                          placeholder="Enter event title"
                        />
                      </div>
                      <div>
                        <Label>Event Image URL</Label>
                        <Input
                          value={event.image}
                          onChange={(e) => handleWhatsOnUpdateEvent(index, "image", e.target.value)}
                          placeholder="Enter image URL"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <Label>Description</Label>
                      <Textarea
                        value={event.description}
                        onChange={(e) => handleWhatsOnUpdateEvent(index, "description", e.target.value)}
                        placeholder="Enter event description"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Link Text</Label>
                        <Input
                          value={event.linkText}
                          onChange={(e) => handleWhatsOnUpdateEvent(index, "linkText", e.target.value)}
                          placeholder="Enter link text"
                        />
                      </div>
                      <div>
                        <Label>Link URL</Label>
                        <Input
                          value={event.linkHref}
                          onChange={(e) => handleWhatsOnUpdateEvent(index, "linkHref", e.target.value)}
                          placeholder="Enter link URL"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={handleWhatsOnSave} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save What's On Section
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Section */}
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Events Section</CardTitle>
              <CardDescription>Manage the main events section with carousel (eventsSection.tsx)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="events-title">Section Title</Label>
                  <Input
                    id="events-title"
                    value={eventsSection.title}
                    onChange={(e) => setEventsSection((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter section title"
                  />
                </div>
                <div>
                  <Label htmlFor="events-button-text">Button Text</Label>
                  <Input
                    id="events-button-text"
                    value={eventsSection.buttonText}
                    onChange={(e) => setEventsSection((prev) => ({ ...prev, buttonText: e.target.value }))}
                    placeholder="Enter button text"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="events-description">Description</Label>
                <Textarea
                  id="events-description"
                  value={eventsSection.description}
                  onChange={(e) => setEventsSection((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter section description"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="events-button-link">Button Link</Label>
                <Input
                  id="events-button-link"
                  value={eventsSection.buttonLink}
                  onChange={(e) => setEventsSection((prev) => ({ ...prev, buttonLink: e.target.value }))}
                  placeholder="Enter button link URL"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Event Images</h3>
                  <Button onClick={handleEventsAddImage} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                </div>

                {eventsSection.eventImages.map((image, index) => (
                  <div key={index} className="border rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Image {index + 1}</h4>
                      <Button onClick={() => handleEventsRemoveImage(index)} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Image URL</Label>
                        <Input
                          value={image.src}
                          onChange={(e) => handleEventsUpdateImage(index, "src", e.target.value)}
                          placeholder="Enter image URL"
                        />
                      </div>
                      <div>
                        <Label>Alt Text</Label>
                        <Input
                          value={image.alt}
                          onChange={(e) => handleEventsUpdateImage(index, "alt", e.target.value)}
                          placeholder="Enter alt text"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={handleEventsSave} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Events Section
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Brand Section (Cafe Story) */}
        <TabsContent value="brand">
          <Card>
            <CardHeader>
              <CardTitle>Cafe Story Section</CardTitle>
              <CardDescription>Manage your cafe's story elements with images and videos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Story Elements</h3>
                <Button onClick={handleBrandAddStoryElement} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Story Element
                </Button>
              </div>

              {brandSection.storyElements.map((element) => (
                <div key={element.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Story Element {element.id}</h4>
                    <Button onClick={() => handleBrandRemoveStoryElement(element.id)} variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={element.title}
                        onChange={(e) => handleBrandUpdateStoryElement(element.id, "title", e.target.value)}
                        placeholder="Enter story title"
                      />
                    </div>
                    <div>
                      <Label>Layout</Label>
                      <Select
                        value={element.layout}
                        onValueChange={(value) => handleBrandUpdateStoryElement(element.id, "layout", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Media Left, Text Right</SelectItem>
                          <SelectItem value="right">Media Right, Text Left</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label>Story Text</Label>
                    <Textarea
                      value={element.text}
                      onChange={(e) => handleBrandUpdateStoryElement(element.id, "text", e.target.value)}
                      placeholder="Enter story text"
                      rows={4}
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h5 className="font-medium mb-3 flex items-center gap-2">
                      {element.media.type === "image" ? (
                        <ImageIcon className="w-4 h-4" />
                      ) : (
                        <Video className="w-4 h-4" />
                      )}
                      Media Settings
                    </h5>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label>Media Type</Label>
                        <Select
                          value={element.media.type}
                          onValueChange={(value) => handleBrandUpdateStoryElement(element.id, "media.type", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="image">Image</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Media URL</Label>
                        <Input
                          value={element.media.src}
                          onChange={(e) => handleBrandUpdateStoryElement(element.id, "media.src", e.target.value)}
                          placeholder="Enter media URL"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Alt Text</Label>
                        <Input
                          value={element.media.alt || ""}
                          onChange={(e) => handleBrandUpdateStoryElement(element.id, "media.alt", e.target.value)}
                          placeholder="Enter alt text"
                        />
                      </div>
                      <div>
                        <Label>Link URL (optional)</Label>
                        <Input
                          value={element.media.linkHref || ""}
                          onChange={(e) => handleBrandUpdateStoryElement(element.id, "media.linkHref", e.target.value)}
                          placeholder="Enter link URL"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Button onClick={handleBrandSave} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Cafe Story Section
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Experiences Section */}
        <TabsContent value="experiences">
          <Card>
            <CardHeader>
              <CardTitle>Experiences Section</CardTitle>
              <CardDescription>Manage experiences and testimonials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Experiences */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Experiences</h3>
                  <Button onClick={handleExperiencesAddExperience} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </div>

                {experiencesSection.experiences.map((experience) => (
                  <div key={experience.id} className="border rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Experience {experience.id}</h4>
                      <Button
                        onClick={() => handleExperiencesRemoveExperience(experience.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label>Experience Title</Label>
                        <Input
                          value={experience.title}
                          onChange={(e) => handleExperiencesUpdateExperience(experience.id, "title", e.target.value)}
                          placeholder="Enter experience title"
                        />
                      </div>
                      <div>
                        <Label>Image URL</Label>
                        <Input
                          value={experience.imageSrc}
                          onChange={(e) => handleExperiencesUpdateExperience(experience.id, "imageSrc", e.target.value)}
                          placeholder="Enter image URL"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <Label>Description</Label>
                      <Textarea
                        value={experience.description}
                        onChange={(e) =>
                          handleExperiencesUpdateExperience(experience.id, "description", e.target.value)
                        }
                        placeholder="Enter experience description"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Alt Text</Label>
                        <Input
                          value={experience.alt || ""}
                          onChange={(e) => handleExperiencesUpdateExperience(experience.id, "alt", e.target.value)}
                          placeholder="Enter alt text"
                        />
                      </div>
                      <div>
                        <Label>Link Text</Label>
                        <Input
                          value={experience.linkText}
                          onChange={(e) => handleExperiencesUpdateExperience(experience.id, "linkText", e.target.value)}
                          placeholder="Enter link text"
                        />
                      </div>
                      <div>
                        <Label>Link URL</Label>
                        <Input
                          value={experience.linkHref}
                          onChange={(e) => handleExperiencesUpdateExperience(experience.id, "linkHref", e.target.value)}
                          placeholder="Enter link URL"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonials */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Testimonials</h3>
                  <Button onClick={handleExperiencesAddTestimonial} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Testimonial
                  </Button>
                </div>

                {experiencesSection.testimonials.map((testimonial, index) => (
                  <div key={index} className="border rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Testimonial {index + 1}</h4>
                      <Button onClick={() => handleExperiencesRemoveTestimonial(index)} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="mb-4">
                      <Label>Quote</Label>
                      <Textarea
                        value={testimonial.quote}
                        onChange={(e) => handleExperiencesUpdateTestimonial(index, "quote", e.target.value)}
                        placeholder="Enter testimonial quote"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Customer Name</Label>
                        <Input
                          value={testimonial.name}
                          onChange={(e) => handleExperiencesUpdateTestimonial(index, "name", e.target.value)}
                          placeholder="Enter customer name"
                        />
                      </div>
                      <div>
                        <Label>Avatar URL</Label>
                        <Input
                          value={testimonial.avatar}
                          onChange={(e) => handleExperiencesUpdateTestimonial(index, "avatar", e.target.value)}
                          placeholder="Enter avatar URL"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={handleExperiencesSave} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Experiences Section
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dine & Drink Section */}
        <TabsContent value="dine-drink">
          <Card>
            <CardHeader>
              <CardTitle>Dine & Drink Section</CardTitle>
              <CardDescription>Manage your dining venues and bars</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Venues</h3>
                <Button onClick={handleDineDrinkAddVenue} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Venue
                </Button>
              </div>

              {dineDrinkContent.venues.map((venue, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Venue {index + 1}</h4>
                    <Button onClick={() => handleDineDrinkRemoveVenue(index)} variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label>Venue Name</Label>
                      <Input
                        value={venue.name}
                        onChange={(e) => handleDineDrinkUpdateVenue(index, "name", e.target.value)}
                        placeholder="Enter venue name"
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={venue.location}
                        onChange={(e) => handleDineDrinkUpdateVenue(index, "location", e.target.value)}
                        placeholder="Enter location"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={venue.description}
                        onChange={(e) => handleDineDrinkUpdateVenue(index, "description", e.target.value)}
                        placeholder="Enter venue description"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={venue.image}
                        onChange={(e) => handleDineDrinkUpdateVenue(index, "image", e.target.value)}
                        placeholder="Enter image URL"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={handleDineDrinkSave} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Dine & Drink Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
