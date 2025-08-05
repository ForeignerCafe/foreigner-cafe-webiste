"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import axiosInstance from "@/lib/axios"

interface FAQ {
  question: string
  answer: string
}

interface FAQsSection {
  title: string
  subtitle: string
  faqs: FAQ[]
}

export default function FAQsSection() {
  const [content, setContent] = useState<FAQsSection>({
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about Foreigner Cafe",
    faqs: [
      {
        question: "What are your opening hours?",
        answer:
          "We're open Monday to Friday from 7:00 AM to 10:00 PM, and weekends from 8:00 AM to 11:00 PM. We're here to serve you throughout the day!",
      },
      {
        question: "Do you offer WiFi for customers?",
        answer:
          "Yes! We provide complimentary high-speed WiFi for all our customers. Perfect for remote work, studying, or staying connected with friends and family.",
      },
      {
        question: "Can I make reservations for large groups?",
        answer:
          "We welcome large groups and offer special arrangements for parties of 8 or more. Please call us at least 24 hours in advance to ensure we can accommodate your group.",
      },
      {
        question: "Do you have vegan and gluten-free options?",
        answer:
          "Yes, we have a variety of vegan and gluten-free options available. Our menu clearly marks dietary restrictions, and our staff can help you choose the perfect meal that meets your needs.",
      },
      {
        question: "Is parking available?",
        answer:
          "We have a dedicated parking lot with 50 spaces available for our customers. Street parking is also available in the surrounding area.",
      },
    ],
  })

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    fetchFAQsContent()
  }, [])

  const fetchFAQsContent = async () => {
    try {
      const response = await axiosInstance.get("/api/cms/faqs")
      if (response.data.success) {
        setContent(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch FAQs content:", error)
    }
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faqs" className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 animate-fade-in-up">{content.title}</h2>
          <p className="text-xl text-gray-600 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {content.subtitle}
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }} />
        </div>

        <div className="space-y-4">
          {content.faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
              >
                <span className="text-lg font-semibold text-black pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-orange-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions? We'd love to help!</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  )
}
