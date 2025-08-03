"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQ {
  question: string
  answer: string
}

interface FAQsContent {
  title: string
  subtitle: string
  faqs: FAQ[]
}

export default function FAQsSection() {
  const [faqsContent, setFaqsContent] = useState<FAQsContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const fetchFAQsContent = async () => {
      try {
        const response = await fetch("/api/cms/faqs")
        if (response.ok) {
          const data = await response.json()
          setFaqsContent(data.content)
        }
      } catch (error) {
        console.error("Error fetching FAQs content:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFAQsContent()
  }, [])

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-64 h-8 bg-gray-200 animate-pulse rounded mx-auto mb-4" />
            <div className="w-96 h-4 bg-gray-200 animate-pulse rounded mx-auto" />
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-full h-6 bg-gray-200 animate-pulse rounded mb-4" />
                <div className="w-3/4 h-4 bg-gray-200 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!faqsContent) return null

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{faqsContent.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{faqsContent.subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqsContent.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
