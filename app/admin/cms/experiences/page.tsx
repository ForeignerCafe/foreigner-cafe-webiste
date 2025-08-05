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

interface ExperiencesPageData {
  heroSection: {
    title: string
    subtitle: string
    backgroundImage: string
  }
  experiences: Experience[]
  testimonials: Testimonial[]
}

function ExperiencesPagePreview({ data }: { data: ExperiencesPageData }) {
  return (
    <div className="bg-white min-h-[600px] rounded-lg border overflow-hidden">
      <div className="transform scale-50 origin-top-left w-[200%]">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[400px] lg:h-[500px] flex items-center justify-center text-center text-white overflow-hidden mb-10">
          <Image
            src={data.heroSection.backgroundImage || "/placeholder.svg?height=500&width=1200"}
            alt="Experiences hero"
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

        {/* Experiences Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-black">OUR EXPERIENCES</h2>
              <p className="mt-2 text-gray-600 text-lg">
                Discover unique experiences crafted with care and attention to detail.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.experiences.map((experience) => (
                <div key={experience.id} className="group">
                  <div className="overflow-hidden rounded-lg mb-4">
                    <Image
                      src={experience.imageSrc || "/placeholder.svg?height=300&width=400"}
                      alt={experience.alt || experience.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{experience.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{experience.description}</p>
                  <a
                    href={experience.linkHref}
                    className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
                  >
                    {experience.linkText}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {data.testimonials.length > 0 && (
          <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-black">WHAT OUR GUESTS SAY</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg?height=60&width=60"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{testimonial.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default function ExperiencesCMSPage() {
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [previewEnabled, setPreviewEnabled] = useState(false)

  const [experiencesPageData, setExperiencesPageData] = useState<ExperiencesPageData>({
    heroSection: {
      title: "",
      subtitle: "",
      backgroundImage: "",
    },
    experiences: [],
    testimonials: [],
  })

  useEffect(() => {
    fetchExperiencesPageData()
  }, [])

  const fetchExperiencesPageData = async () => {
    try {
      setInitialLoading(true)
      const response = await axiosInstance.get("/api/cms/experiences")
      if (response.data.success) {
        const existingData = response.data.data
        setExperiencesPageData({
          heroSection: {
            title: "Our Experiences",
            subtitle: "Discover unique moments and create lasting memories with us.",
            backgroundImage: "/images/experiences-hero.webp",
          },
          experiences: existingData.experiences || [],
          testimonials: existingData.testimonials || [],
        })
      }
    } catch (error) {
      console.error("Failed to fetch experiences page data:", error)
      // Set default data if API fails
      setExperiencesPageData({
        heroSection: {
          title: "Our Experiences",
          subtitle: "Discover unique moments and create lasting memories with us.",
          backgroundImage: "/images/experiences-hero.webp",
        },
        experiences: [
          {
            id: 1,
            title: "Coffee Tasting Experience",
            description: "Discover the nuances of our specialty coffee blends with our expert baristas.",
            imageSrc: "/placeholder.svg?height=300&width=400",
            alt: "Coffee tasting session",
            linkText: "Book Now",
            linkHref: "/experiences/coffee-tasting",
          },
        ],
        testimonials: [
          {
            quote: "The coffee here is absolutely exceptional. Every visit feels like a warm hug.",
            name: "Sarah Johnson",
            avatar: "/placeholder.svg?height=60&width=60",
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
      const dataToSave = {
        experiences: experiencesPageData.experiences,
        testimonials: experiencesPageData.testimonials,
      }
      const response = await axiosInstance.put("/api/cms/experiences", dataToSave)

      if (response.data.success) {
        toast.success("Experiences page updated successfully!")
      } else {
        toast.error("Failed to update experiences page")
      }
    } catch (error) {
      toast.error("Failed to update experiences page")
    } finally {
      setLoading(false)
    }
  }

  const addExperience = () => {
    const newId = Math.max(...experiencesPageData.experiences.map((e) => e.id), 0) + 1
    setExperiencesPageData((prev) => ({
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

  const removeExperience = (id: number) => {
    setExperiencesPageData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }))
  }

  const updateExperience = (id: number, field: keyof Experience, value: string | number) => {
    setExperiencesPageData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }))
  }

  const addTestimonial = () => {
    setExperiencesPageData((prev) => ({
      ...prev,
      testimonials: [
        ...prev.testimonials,
        {
          quote: "",
          name: "",
          avatar: "",
        },
      ],
    }))
  }

  const removeTestimonial = (index: number) => {
    setExperiencesPageData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index),
    }))
  }

  const updateTestimonial = (index: number, field: keyof Testimonial, value: string) => {
    setExperiencesPageData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t, i) => (i === index ? { ...t, [field]: value } : t)),
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Experiences Page Management</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Manage your experiences page content</p>
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
            <CardDescription>Manage the main hero section of your experiences page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="hero-title">Title</Label>
              <Input
                id="hero-title"
                value={experiencesPageData.heroSection.title}
                onChange={(e) =>
                  setExperiencesPageData((prev) => ({
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
                value={experiencesPageData.heroSection.subtitle}
                onChange={(e) =>
                  setExperiencesPageData((prev) => ({
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
                value={experiencesPageData.heroSection.backgroundImage}
                onChange={(e) =>
                  setExperiencesPageData((prev) => ({
                    ...prev,
                    heroSection: { ...prev.heroSection, backgroundImage: e.target.value },
                  }))
                }
                placeholder="Enter background image URL"
              />
            </div>
          </CardContent>
        </Card>

        {/* Experiences */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Experiences</CardTitle>
            <CardDescription>Manage your experiences offerings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Experiences</h3>
              <Button onClick={addExperience} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </div>
            {experiencesPageData.experiences.map((experience) => (
              <div key={experience.id} className="border rounded-lg p-4 shadow-sm bg-background">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">Experience {experience.id}</h4>
                  <Button onClick={() => removeExperience(experience.id)} variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Experience Title</Label>
                    <Input
                      value={experience.title}
                      onChange={(e) => updateExperience(experience.id, "title", e.target.value)}
                      placeholder="Enter experience title"
                    />
                  </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={experience.imageSrc}
                      onChange={(e) => updateExperience(experience.id, "imageSrc", e.target.value)}
                      placeholder="Enter image URL"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Label>Description</Label>
                  <Textarea
                    value={experience.description}
                    onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                    placeholder="Enter experience description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Alt Text</Label>
                    <Input
                      value={experience.alt || ""}
                      onChange={(e) => updateExperience(experience.id, "alt", e.target.value)}
                      placeholder="Enter alt text"
                    />
                  </div>
                  <div>
                    <Label>Link Text</Label>
                    <Input
                      value={experience.linkText}
                      onChange={(e) => updateExperience(experience.id, "linkText", e.target.value)}
                      placeholder="Enter link text"
                    />
                  </div>
                  <div>
                    <Label>Link URL</Label>
                    <Input
                      value={experience.linkHref}
                      onChange={(e) => updateExperience(experience.id, "linkHref", e.target.value)}
                      placeholder="Enter link URL"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Testimonials</CardTitle>
            <CardDescription>Manage customer testimonials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Testimonials</h3>
              <Button onClick={addTestimonial} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </div>
            {experiencesPageData.testimonials.map((testimonial, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-sm bg-background">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">Testimonial {index + 1}</h4>
                  <Button onClick={() => removeTestimonial(index)} variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="mb-4">
                  <Label>Quote</Label>
                  <Textarea
                    value={testimonial.quote}
                    onChange={(e) => updateTestimonial(index, "quote", e.target.value)}
                    placeholder="Enter testimonial quote"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Customer Name</Label>
                    <Input
                      value={testimonial.name}
                      onChange={(e) => updateTestimonial(index, "name", e.target.value)}
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div>
                    <Label>Avatar URL</Label>
                    <Input
                      value={testimonial.avatar}
                      onChange={(e) => updateTestimonial(index, "avatar", e.target.value)}
                      placeholder="Enter avatar URL"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={loading} className="w-full md:w-auto">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Experiences Page
          </Button>
        </div>

        {/* Preview */}
        {previewEnabled && (
          <Card className="mt-6 border-blue-200 bg-blue-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Live Preview - Experiences Page
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ExperiencesPagePreview data={experiencesPageData} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
