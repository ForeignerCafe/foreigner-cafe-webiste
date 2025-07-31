"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/lib/axios"
import LocationModal from "./location-modal"

interface HeroContent {
  title: string
  subtitle: string
  description: string
  videoUrl: string
}

export default function Hero() {
   
  const [showLocationModal, setShowLocationModal] = useState(false) // State for the modal
  const [content, setContent] = useState<HeroContent>({
    title: "Welcome to Foreigners Cafe",
    subtitle: "Where Stories Begin",
    description: "Experience exceptional coffee, delicious food, and warm hospitality in our cozy atmosphere.",
    videoUrl: "/videos/hero-video.mp4",
  })
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    fetchHeroContent()
  }, [])

  useEffect(() => {
    // Force video reload when URL changes
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

  if (isLoading) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gray-900 ">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-96 mx-auto mb-4"></div>
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-300 rounded w-80 mx-auto mb-8"></div>
            <div className="h-12 bg-gray-300 rounded w-40 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }


 




  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        key={content.videoUrl} // Force re-render when URL changes
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={content.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-4 md:mt-18 mt-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">{content.title}</h1>
          <h2 className="text-2xl md:text-3xl font-light mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {content.subtitle}
          </h2>
          <p
            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            {content.description}
          </p>
          <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <Button
              onClick={() => setShowLocationModal(true)} // Changed onClick to open the modal
              className={` overflow-hidden bg-[#EC4E20] text-white px-12 py-6 text-lg font-bold tracking-wide transition-all  duration-1500 ease-out delay-700 hover:bg-orange-500 `}
             
            >
              <span className=" z-10">Visit Us</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Location Modal */}
      <LocationModal open={showLocationModal} onOpenChange={setShowLocationModal} />
      
    </section>
  )
}
