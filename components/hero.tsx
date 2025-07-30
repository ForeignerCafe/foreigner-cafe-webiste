"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import axiosInstance from "@/lib/axios"

interface HeroContent {
  title: string
  subtitle: string
  description: string
  videoUrl: string
}

export default function Hero() {
  const [content, setContent] = useState<HeroContent>({
    title: "FOREIGNER CAFE",
    subtitle: "A Space for Community & Craft",
    description:
      "More than a coffee shop — we're a gathering place for people, ideas, and craft. Rooted in hospitality and culture, our space is a warm invitation to slow down and connect.",
    videoUrl:
      "https://res.cloudinary.com/dxtclcoxh/video/upload/v1752141159/yt1z.net_-_BARISTA_Cafe_Promo_Video_Cinematic_Real_Estate_video_Epic_B-Roll_1080p60_httacw.mp4",
  })
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    fetchHeroContent()
  }, [])

  // Force video reload when URL changes
  useEffect(() => {
    if (videoRef.current && content.videoUrl) {
      videoRef.current.load()
    }
  }, [content.videoUrl])

  const fetchHeroContent = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get("/api/cms/hero")
      if (response.data.success) {
        setContent(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch hero content:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const scrollToNextSection = () => {
    const nextSection = document.querySelector("#whats-on")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (isLoading) {
    return (
      <section className="relative h-screen overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/placeholder.svg?height=1080&width=1920"
          key={content.videoUrl} // Force re-render when URL changes
        >
          <source src={content.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-wide">{content.title}</h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-6 tracking-wide">{content.subtitle}</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed opacity-90">{content.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-3 text-lg">
              Explore Menu
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-3 text-lg bg-transparent"
            >
              Book a Table
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={scrollToNextSection}
          className="text-white hover:text-gray-300 transition-colors animate-bounce"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  )
}
