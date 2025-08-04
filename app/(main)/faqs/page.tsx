"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
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

export default function Component() {
  const [faqsData, setFaqsData] = useState<FAQsData>({
    title: "Got Questions? We're Here to Help.",
    subtitle:
      "From planning your perfect event to finding the right cake we've gathered the answers to your most asked questions, all in one place.",
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen">
        {/* Hero Section Loading */}
        <section className="relative h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-center text-white overflow-hidden">
          <Image
            src="/images/faqs.webp"
            alt="People gathering under string lights"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
          <div className="relative z-10 px-4 max-w-4xl mx-auto space-y-6">
            <div className="h-12 bg-white/20 rounded w-96 mx-auto animate-pulse mb-8"></div>
            <div className="h-6 bg-white/20 rounded w-64 mx-auto animate-pulse mb-6"></div>
            <div className="h-12 bg-white/20 rounded w-32 mx-auto animate-pulse"></div>
          </div>
        </section>

        {/* FAQs Section Loading */}
        <section className="w-full py-12 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-10 md:mb-12">
              <div className="h-12 bg-gray-200 rounded w-32 mx-auto mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
            </div>

            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border border-gray-200 animate-pulse">
                  <div className="w-full px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-center text-white overflow-hidden">
        <Image
          src="/images/faqs.webp"
          alt="People gathering under string lights"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
        <div className="relative z-10 px-4 max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-8 mt-10 uppercase">
            {faqsData.title}
          </h1>
          <p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto pb-6">{faqsData.subtitle}</p>
          <Button
            onClick={() => scrollToSection("faq")}
            className="hover:scale-110 bg-[#EC4E20] hover:bg-[#f97316] hover:text-black text-white px-8 py-3 text-lg"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faq" className="w-full py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-5xl font-bold text-black mb-4">FAQS</h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              We&apos;ve compiled the most common queries about our cafe, catering, and experiences to make things
              easier for you.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqsData.faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="border-b border-gray-200 last:border-b-0 py-4"
              >
                <AccordionTrigger className="flex justify-between items-center w-full text-left text-lg md:text-xl font-medium text-gray-800 hover:no-underline hover:text-[#EC4E20] focus:no-underline focus:ring-0 focus:outline-none transition-colors duration-200">
                  <span className="flex items-center gap-2">
                    <span className="text-gray-500 text-base md:text-lg">{index + 1}.</span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 text-gray-600 text-base md:text-md leading-relaxed pl-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  )
}
