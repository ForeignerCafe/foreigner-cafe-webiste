"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Save, Plus, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import axiosInstance from "@/lib/axios"
import { ImageUpload } from "@/components/dashboard/image-upload"

interface Experience {
  id: string
  title: string
  description: string
  image: string
  link: string
  buttonText: string
}

interface Testimonial {
  id: string
  name: string
  text: string
  avatar: string
  rating: number
}

interface ExperiencesPageData {
  hero: {
    title: string
    subtitle: string
    backgroundImage: string
  }
  experiences: Experience[]
  testimonials: Testimonial[]
}

const ExperiencesPagePreview = ({ data }: { data: ExperiencesPageData }) => {
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
          <h1 className="text-4xl font-bold mb-4">{data.hero.title || "Experiences Title"}</h1>
          <p className="text-xl">{data.hero.subtitle || "Experiences subtitle"}</p>
        </div>
      </div>

      {/* Experiences Grid */}
      {data.experiences.length > 0 && (
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.experiences.map((experience) => (
              <div key={experience.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  src={experience.image || "/placeholder.svg?height=200&width=300"}
                  alt={experience.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3">{experience.title}</h3>
                  <p className="text-gray-600 mb-4">{experience.description}</p>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    {experience.buttonText || "Learn More"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials */}
      {data.testimonials.length > 0 && (
        <div className="p-8 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg?height=50&width=50"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ExperiencesPageCMS() {
  const [data, setData] = useState<ExperiencesPageData>({
    hero: {
      title: "",
      subtitle: "",
      backgroundImage: "",
    },
    experiences: [],
    testimonials: [],
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [previewEnabled, setPreviewEnabled] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/cms/experiences")
      if (response.data.success) {
        setData(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching experiences data:", error)
      toast.error("Failed to load experiences data")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await axiosInstance.post("/api/cms/experiences", data)
      if (response.data.success) {
        toast.success("Experiences page updated successfully!")
      } else {
        toast.error("Failed to update experiences page")
      }
    } catch (error) {
      console.error("Error saving experiences:", error)
      toast.error("Failed to save changes")
    } finally {
      setSaving(false)
    }
  }

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: "",
      description: "",
      image: "",
      link: "",
      buttonText: "Learn More",
    }
    setData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
    }))
  }

  const removeExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }))
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: "",
      text: "",
      avatar: "",
      rating: 5,
    }
    setData((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, newTestimonial],
    }))
  }

  const removeTestimonial = (id: string) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((test) => test.id !== id),
    }))
  }

  const updateTestimonial = (id: string, field: keyof Testimonial, value: string | number) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((test) => (test.id === id ? { ...test, [field]: value } : test)),
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
        <h1 className="text-3xl font-bold">Experiences Page Management</h1>
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
                        <h1 className="text-4xl font-bold mb-4">{data.hero.title || "Experiences Title"}</h1>
                        <p className="text-xl">{data.hero.subtitle || "Experiences subtitle"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Experiences */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Experiences</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => togglePreview("experiences")}>
                {previewEnabled.experiences ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {previewEnabled.experiences ? "Hide Preview" : "Show Preview"}
              </Button>
              <Button onClick={addExperience} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {data.experiences.map((experience, index) => (
              <div key={experience.id} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Experience {index + 1}</h4>
                  <Button variant="destructive" size="sm" onClick={() => removeExperience(experience.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={experience.title}
                      onChange={(e) => updateExperience(experience.id, "title", e.target.value)}
                      placeholder="Experience title"
                    />
                  </div>
                  <div>
                    <Label>Button Text</Label>
                    <Input
                      value={experience.buttonText}
                      onChange={(e) => updateExperience(experience.id, "buttonText", e.target.value)}
                      placeholder="Button text"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={experience.description}
                      onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                      placeholder="Experience description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Image</Label>
                    <ImageUpload
                      value={experience.image}
                      onChange={(url) => updateExperience(experience.id, "image", url)}
                    />
                  </div>
                  <div>
                    <Label>Link URL</Label>
                    <Input
                      value={experience.link}
                      onChange={(e) => updateExperience(experience.id, "link", e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            ))}

            {previewEnabled.experiences && data.experiences.length > 0 && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">Experiences Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden" style={{ height: "300px" }}>
                    <div
                      className="p-8"
                      style={{ transform: "scale(0.5)", transformOrigin: "top left", width: "200%" }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.experiences.map((experience) => (
                          <div key={experience.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                            <img
                              src={experience.image || "/placeholder.svg?height=200&width=300"}
                              alt={experience.title}
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                              <h3 className="font-bold text-xl mb-3">{experience.title}</h3>
                              <p className="text-gray-600 mb-4">{experience.description}</p>
                              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                                {experience.buttonText || "Learn More"}
                              </Button>
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

        {/* Testimonials */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Testimonials</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => togglePreview("testimonials")}>
                {previewEnabled.testimonials ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {previewEnabled.testimonials ? "Hide Preview" : "Show Preview"}
              </Button>
              <Button onClick={addTestimonial} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {data.testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Testimonial {index + 1}</h4>
                  <Button variant="destructive" size="sm" onClick={() => removeTestimonial(testimonial.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={testimonial.name}
                      onChange={(e) => updateTestimonial(testimonial.id, "name", e.target.value)}
                      placeholder="Customer name"
                    />
                  </div>
                  <div>
                    <Label>Rating</Label>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={testimonial.rating}
                      onChange={(e) => updateTestimonial(testimonial.id, "rating", Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Testimonial Text</Label>
                    <Textarea
                      value={testimonial.text}
                      onChange={(e) => updateTestimonial(testimonial.id, "text", e.target.value)}
                      placeholder="Customer testimonial"
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Avatar Image</Label>
                    <ImageUpload
                      value={testimonial.avatar}
                      onChange={(url) => updateTestimonial(testimonial.id, "avatar", url)}
                    />
                  </div>
                </div>
              </div>
            ))}

            {previewEnabled.testimonials && data.testimonials.length > 0 && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">Testimonials Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden" style={{ height: "300px" }}>
                    <div
                      className="p-8 bg-gray-50"
                      style={{ transform: "scale(0.5)", transformOrigin: "top left", width: "200%" }}
                    >
                      <h2 className="text-3xl font-bold text-center mb-8">What Our Guests Say</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.testimonials.map((testimonial) => (
                          <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                              <img
                                src={testimonial.avatar || "/placeholder.svg?height=50&width=50"}
                                alt={testimonial.name}
                                className="w-12 h-12 rounded-full mr-4"
                              />
                              <div>
                                <h4 className="font-semibold">{testimonial.name}</h4>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <span
                                      key={i}
                                      className={`text-sm ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                                    >
                                      ★
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-600 italic">"{testimonial.text}"</p>
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
      </div>
    </div>
  )
}
