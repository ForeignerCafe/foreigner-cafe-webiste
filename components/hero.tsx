"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/lib/axios"

interface HeroContent {
  title: string
  subtitle: string
  description: string
  videoUrl: string
}

export default function Hero() {
  const [content, setContent] = useState<HeroContent>({
    title: "WELCOME TO FOREIGNER CAFE",
    subtitle: "Where Stories Meet Coffee",
    description: "Experience the perfect blend of culture, community, and exceptional coffee in the heart of the city.",
    videoUrl: "/placeholder.svg?height=800&width=1200",
  })

  useEffect(() => {
    fetchHeroContent()
  }, [])

  const fetchHeroContent = async () => {
    try {
      const response = await axiosInstance.get("/api/cms/hero")
      if (response.data.success) {
        setContent(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch hero content:", error)
    }
  }

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        {content.videoUrl && content.videoUrl.includes(".mp4") ? (
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src={content.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={content.videoUrl || "/placeholder.svg?height=800&width=1200&query=cafe+interior"}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">{content.title}</h1>
        <h2 className="text-xl md:text-2xl mb-8 font-light animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {content.subtitle}
        </h2>
        <p
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          {content.description}
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
            Reserve a Table
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg bg-transparent"
          >
            View Menu
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
