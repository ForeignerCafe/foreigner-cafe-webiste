"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Save, Loader2, Eye, EyeOff, Monitor, ChevronDown } from "lucide-react"
import toast from "react-hot-toast"
import axiosInstance from "@/lib/axios"
import { FormSkeleton } from "@/components/ui/skeleton-components"
import Image from "next/image"

interface FAQ {
  question: string
  answer: string
}

interface FAQsPageData {
  heroSection: {
    title: string
    subtitle: string
    backgroundImage: string
  }
  title: string
  subtitle: string
  faqs: FAQ[]
}

function FAQsPagePreview({ data }: { data: FAQsPageData }) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  return (
    <div className="bg-white min-h-[600px] rounded-lg border overflow-hidden">
      <div className="transform scale-50 origin-top-left w-[200%]">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[400px] lg:h-[500px] flex items-center justify-center text-center text-white overflow-hidden mb-10">
          <Image
            src={data.heroSection.backgroundImage || "/placeholder.svg?height=500&width=1200"}
            alt="FAQs hero"
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

        {/* FAQs Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">{data.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{data.subtitle}</p>
            </div>

            <div className="max-w-4xl mx-auto">
              {data.faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 mb-4">
                  <button
                    className="w-full text-left py-6 flex justify-between items-center hover:text-orange-500 transition-colors"
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  >
                    <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openFAQ === index ? "rotate-180" : ""}`} />
                  </button>
                  {openFAQ === index && (
                    <div className="pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default function FAQsCMSPage() {
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [previewEnabled, setPreviewEnabled] = useState(false)

  const [faqsPageData, setFaqsPageData] = useState<FAQsPageData>({
    heroSection: {
      title: "",
      subtitle: "",
      backgroundImage: "",
    },
    title: "",
    subtitle: "",
    faqs: [],
  })

  useEffect(() => {
    fetchFAQsPageData()
  }, [])

  const fetchFAQsPageData = async () => {
    try {
      setInitialLoading(true)
      const response = await axiosInstance.get("/api/cms/faqs")
      if (response.data.success) {
        const existingData = response.data.data
        setFaqsPageData({
          heroSection: {
            title: "Frequently Asked Questions",
            subtitle: "Find answers to common questions about our cafe and services.",
            backgroundImage: "/images/faqs-hero.webp",
          },
          title: existingData.title || "FREQUENTLY ASKED QUESTIONS",
          subtitle: existingData.subtitle || "Everything you need to know about visiting Foreigner Cafe",
          faqs: existingData.faqs || [],
        })
      }
    } catch (error) {
      console.error("Failed to fetch FAQs page data:", error)
      // Set default data if API fails
      setFaqsPageData({
        heroSection: {
          title: "Frequently Asked Questions",
          subtitle: "Find answers to common questions about our cafe and services.",
          backgroundImage: "/images/faqs-hero.webp",
        },
        title: "FREQUENTLY ASKED QUESTIONS",
        subtitle: "Everything you need to know about visiting Foreigner Cafe",
        faqs: [
          {
            question: "Do you take reservations?",
            answer:
              "Yes, we accept reservations for parties up to 12 people. Larger groups should contact us directly for special arrangements.",
          },
          {
            question: "What are your opening hours?",
            answer:
              "We're open Monday-Friday 7:30am-4:00pm for dine-in and 7:00am-4:00pm for takeaway. Weekend hours are 7:30am-4:00pm for both dine-in and takeaway.",
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
        title: faqsPageData.title,
        subtitle: faqsPageData.subtitle,
        faqs: faqsPageData.faqs,
      }
      const response = await axiosInstance.put("/api/cms/faqs", dataToSave)

      if (response.data.success) {
        toast.success("FAQs page updated successfully!")
      } else {
        toast.error("Failed to update FAQs page")
      }
    } catch (error) {
      toast.error("Failed to update FAQs page")
    } finally {
      setLoading(false)
    }
  }

  const addFAQ = () => {
    setFaqsPageData((prev) => ({
      ...prev,
      faqs: [
        ...prev.faqs,
        {
          question: "",
          answer: "",
        },
      ],
    }))
  }

  const removeFAQ = (index: number) => {
    setFaqsPageData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }))
  }

  const updateFAQ = (index: number, field: keyof FAQ, value: string) => {
    setFaqsPageData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq)),
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">FAQs Page Management</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Manage your frequently asked questions page</p>
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
            <CardDescription>Manage the main hero section of your FAQs page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="hero-title">Title</Label>
              <Input
                id="hero-title"
                value={faqsPageData.heroSection.title}
                onChange={(e) =>
                  setFaqsPageData((prev) => ({
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
                value={faqsPageData.heroSection.subtitle}
                onChange={(e) =>
                  setFaqsPageData((prev) => ({
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
                value={faqsPageData.heroSection.backgroundImage}
                onChange={(e) =>
                  setFaqsPageData((prev) => ({
                    ...prev,
                    heroSection: { ...prev.heroSection, backgroundImage: e.target.value },
                  }))
                }
                placeholder="Enter background image URL"
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQs Section Settings */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>FAQs Section</CardTitle>
            <CardDescription>Manage the main FAQs section settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="faqs-title">Section Title</Label>
              <Input
                id="faqs-title"
                value={faqsPageData.title}
                onChange={(e) => setFaqsPageData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter section title"
              />
            </div>
            <div>
              <Label htmlFor="faqs-subtitle">Section Subtitle</Label>
              <Input
                id="faqs-subtitle"
                value={faqsPageData.subtitle}
                onChange={(e) => setFaqsPageData((prev) => ({ ...prev, subtitle: e.target.value }))}
                placeholder="Enter section subtitle"
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>FAQs</CardTitle>
            <CardDescription>Manage frequently asked questions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Questions & Answers</h3>
              <Button onClick={addFAQ} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add FAQ
              </Button>
            </div>
            {faqsPageData.faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-sm bg-background">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">FAQ {index + 1}</h4>
                  <Button onClick={() => removeFAQ(index)} variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Question</Label>
                    <Input
                      value={faq.question}
                      onChange={(e) => updateFAQ(index, "question", e.target.value)}
                      placeholder="Enter question"
                    />
                  </div>
                  <div>
                    <Label>Answer</Label>
                    <Textarea
                      value={faq.answer}
                      onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                      placeholder="Enter answer"
                      rows={3}
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
            Save FAQs Page
          </Button>
        </div>

        {/* Preview */}
        {previewEnabled && (
          <Card className="mt-6 border-blue-200 bg-blue-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Live Preview - FAQs Page
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <FAQsPagePreview data={faqsPageData} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
