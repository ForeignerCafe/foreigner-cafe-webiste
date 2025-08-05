"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import axiosInstance from "@/lib/axios"

interface FAQ {
  question: string
  answer: string
}

interface FAQsData {
  title: string
  subtitle: string
  faqs: FAQ[]
}

export default function FAQsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [faqsData, setFaqsData] = useState<FAQsData>({
    title: "FREQUENTLY ASKED QUESTIONS",
    subtitle: "Everything you need to know about visiting Foreigner Cafe",
    faqs: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFAQsData()
  }, [])

  const fetchFAQsData = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get("/api/cms/faqs")
      if (response.data.success) {
        setFaqsData(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch FAQs data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <section id="faqs" className="bg-white py-12 lg:py-20">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded w-96 mx-auto mb-6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
          </div>

          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="border border-gray-200 animate-pulse">
                <div className="w-full px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="faqs" className="bg-white py-12 lg:py-20">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[32px] font-bold tracking-[1.5px] text-black mb-6 animate-fade-in-up">
            {faqsData.title}
          </h2>
          <p
            className="text-[14px] text-gray-600 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {faqsData.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {faqsData.faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-[14px] font-medium text-black tracking-[0.5px]">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#1a3d2e]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#1a3d2e]" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-[12px] text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
