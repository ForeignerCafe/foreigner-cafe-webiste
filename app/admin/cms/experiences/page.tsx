"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Eye, EyeOff, Save, Plus, Trash2, Edit } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import axiosInstance from "@/lib/axios"
import Image from "next/image"
import RichTextEditor from "@/components/rich-text-editor"

interface Experience {
  id: string
  title: string
  slug: string
  description: string
  content: string
  imageSrc: string
  alt: string
  buttonText: string
  isPublished: boolean
  createdAt?: string
  updatedAt?: string
}

interface Testimonial {
  id: string
  name: string
  text: string
  avatar: string
  rating: number
}

interface ExperiencesPageData {
  experiences: Experience[]
  testimonials: Testimonial[]
}

const ExperiencesPagePreview = ({ data }: { data: ExperiencesPageData }) => {
  return (
    <div
      className="w-full bg-white rounded-lg overflow-hidden"
      style={{ transform: "scale(0.5)", transformOrigin: "top left", width: "200%", height: "200%" }}
    >
      {/* Experiences Grid */}
      {data.experiences.length > 0 && (
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.experiences
              .filter((exp) => exp.isPublished)
              .map((experience) => (
                <div key={experience.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={experience.imageSrc || "/placeholder.svg?height=200&width=300"}
                    alt={experience.title}
                    width={300}
                    height={200}
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
                  <Image
                    src={testimonial.avatar || "/placeholder.svg?height=50&width=50"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
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
    experiences: [],
    testimonials: [],
  })

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [previewEnabled, setPreviewEnabled] = useState<{ [key: string]: boolean }>({})
  const [editingExperience, setEditingExperience] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get("/api/cms/experiences")
      if (response.data.success) {
        setData(response.data.data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch experiences data",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching experiences:", error)
      toast({
        title: "Error",
        description: "Failed to fetch experiences data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await axiosInstance.put("/api/cms/experiences", data)
      if (response.data.success) {
        toast({
          title: "Success",
          description: "Experiences page updated successfully!",
        })
        setData(response.data.data)
      } else {
        toast({
          title: "Error",
          description: "Failed to update experiences page",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving experiences:", error)
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: "",
      slug: "",
      description: "",
      content: "<p>Write your experience content here...</p>",
      imageSrc: "",
      alt: "",
      buttonText: "Learn More",
      isPublished: true,
    }
    setData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
    }))
    setEditingExperience(newExperience.id)
  }

  const removeExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }))
    if (editingExperience === id) {
      setEditingExperience(null)
    }
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
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
      <div className="p-6 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
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
                  <div className="flex items-center gap-4">
                    <h4 className="font-semibold">Experience {index + 1}</h4>
                    {experience.slug && (
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">/{experience.slug}</span>
                    )}
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={experience.isPublished}
                        onCheckedChange={(checked) => updateExperience(experience.id, "isPublished", checked)}
                      />
                      <Label className="text-sm">Published</Label>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingExperience(editingExperience === experience.id ? null : experience.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => removeExperience(experience.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={experience.imageSrc}
                      onChange={(e) => updateExperience(experience.id, "imageSrc", e.target.value)}
                      placeholder="Enter image URL"
                    />
                  </div>
                  <div>
                    <Label>Alt Text</Label>
                    <Input
                      value={experience.alt}
                      onChange={(e) => updateExperience(experience.id, "alt", e.target.value)}
                      placeholder="Image alt text"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <Label>Description (Short summary)</Label>
                  <Textarea
                    value={experience.description}
                    onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                    placeholder="Brief description for cards and previews"
                    rows={3}
                  />
                </div>

                {editingExperience === experience.id && (
                  <div className="border-t pt-4 mt-4">
                    <Label className="text-lg font-semibold mb-4 block">Experience Content (Rich Text)</Label>
                    <RichTextEditor
                      initialContent={experience.content}
                      onContentChange={(content) => updateExperience(experience.id, "content", content)}
                    />
                  </div>
                )}
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
                        {data.experiences
                          .filter((exp) => exp.isPublished)
                          .map((experience) => (
                            <div key={experience.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                              <Image
                                src={experience.imageSrc || "/placeholder.svg?height=200&width=300"}
                                alt={experience.title}
                                width={300}
                                height={200}
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
                    <Label>Avatar Image URL</Label>
                    <Input
                      value={testimonial.avatar}
                      onChange={(e) => updateTestimonial(testimonial.id, "avatar", e.target.value)}
                      placeholder="Enter avatar URL"
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
                              <Image
                                src={testimonial.avatar || "/placeholder.svg?height=50&width=50"}
                                alt={testimonial.name}
                                width={50}
                                height={50}
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
                <ExperiencesPagePreview data={data} />
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
