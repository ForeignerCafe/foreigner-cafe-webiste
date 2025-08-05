"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Save, Plus, Trash2, ChevronDown } from "lucide-react"
import toast from "react-hot-toast"
import axiosInstance from "@/lib/axios"

interface FAQ {
  id: string
  question: string
  answer: string
}

interface FAQsPageData {
  hero: {
    title: string
    subtitle: string
    backgroundImage: string
  }
  faqSection: {
    title: string
    subtitle: string
  }
  faqs: FAQ[]
}

const FAQsPagePreview = ({ data }: { data: FAQsPageData }) => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

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
          <h1 className="text-4xl font-bold mb-4">{data.hero.title || "FAQs Title"}</h1>
          <p className="text-xl">{data.hero.subtitle || "FAQs subtitle"}</p>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">{data.faqSection.title || "Frequently Asked Questions"}</h2>
          <p className="text-gray-600">{data.faqSection.subtitle || "Find answers to common questions"}</p>
        </div>

        <div className="space-y-4">
          {data.faqs.map((faq) => (
            <div key={faq.id} className="border rounded-lg">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
              >
                <span className="font-semibold">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openFAQ === faq.id ? "rotate-180" : ""}`} />
              </button>
              {openFAQ === faq.id && <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function FAQsPageCMS() {
  const [data, setData] = useState<FAQsPageData>({
    hero: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our cafe and services.",
      backgroundImage: "/images/faqs-hero.webp",
    },
    faqSection: {
      title: "FREQUENTLY ASKED QUESTIONS",
      subtitle: "Everything you need to know about visiting Foreigner Cafe",
    },
    faqs: [
      {
        id: "1",
        question: "Do you take reservations?",
        answer:
          "Yes, we accept reservations for parties up to 12 people. Larger groups should contact us directly for special arrangements.",
      },
      {
        id: "2",
        question: "What are your opening hours?",
        answer:
          "We're open Monday-Friday 7:30am-4:00pm for dine-in and 7:00am-4:00pm for takeaway. Weekend hours are 7:30am-4:00pm for both dine-in and takeaway.",
      },
    ],
  })

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [previewEnabled, setPreviewEnabled] = useState<{ [key: string]: boolean }>({})

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await axiosInstance.put("/api/cms/faqs", data)
      if (response.data.success) {
        toast.success("FAQs page updated successfully!")
      } else {
        toast.error("Failed to update FAQs page")
      }
    } catch (error) {
      console.error("Error saving FAQs:", error)
      toast.error("Failed to save changes")
    } finally {
      setSaving(false)
    }
  }

  const addFAQ = () => {
    const newFAQ: FAQ = {
      id: Date.now().toString(),
      question: "",
      answer: "",
    }
    setData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, newFAQ],
    }))
  }

  const removeFAQ = (id: string) => {
    setData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((faq) => faq.id !== id),
    }))
  }

  const updateFAQ = (id: string, field: keyof FAQ, value: string) => {
    setData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq)),
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
        <h1 className="text-3xl font-bold">FAQs Page Management</h1>
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
                        <h1 className="text-4xl font-bold mb-4">{data.hero.title || "FAQs Title"}</h1>
                        <p className="text-xl">{data.hero.subtitle || "FAQs subtitle"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* FAQ Section Settings */}
        <Card>
          <CardHeader>
            <CardTitle>FAQ Section Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="faq-title">Section Title</Label>
              <Input
                id="faq-title"
                value={data.faqSection.title}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    faqSection: { ...prev.faqSection, title: e.target.value },
                  }))
                }
                placeholder="e.g., Frequently Asked Questions"
              />
            </div>
            <div>
              <Label htmlFor="faq-subtitle">Section Subtitle</Label>
              <Input
                id="faq-subtitle"
                value={data.faqSection.subtitle}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    faqSection: { ...prev.faqSection, subtitle: e.target.value },
                  }))
                }
                placeholder="e.g., Find answers to common questions"
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQs Management */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>FAQs</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => togglePreview("faqs")}>
                {previewEnabled.faqs ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {previewEnabled.faqs ? "Hide Preview" : "Show Preview"}
              </Button>
              <Button onClick={addFAQ} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add FAQ
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {data.faqs.map((faq, index) => (
              <div key={faq.id} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">FAQ {index + 1}</h4>
                  <Button variant="destructive" size="sm" onClick={() => removeFAQ(faq.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Question</Label>
                    <Input
                      value={faq.question}
                      onChange={(e) => updateFAQ(faq.id, "question", e.target.value)}
                      placeholder="Enter the question"
                    />
                  </div>
                  <div>
                    <Label>Answer</Label>
                    <Textarea
                      value={faq.answer}
                      onChange={(e) => updateFAQ(faq.id, "answer", e.target.value)}
                      placeholder="Enter the answer"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            ))}

            {previewEnabled.faqs && data.faqs.length > 0 && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">FAQs Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden border rounded-lg" style={{ height: "400px" }}>
                    <FAQsPagePreview data={data} />
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
                <FAQsPagePreview data={data} />
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
