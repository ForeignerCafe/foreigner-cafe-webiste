"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import LocationModal from "@/components/location-modal" // Import the new modal component

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false) // State for the modal

  useEffect(() => {
    setIsLoaded(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        {/* Gradient overlays with mouse interaction */}
        <div
          className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 107, 53, 0.3) 0%, transparent 50%)`,
          }}
        />
      </div>
      {/* Hero Video Background */}
      <div className="absolute inset-0">
        <video
          src="https://res.cloudinary.com/dxtclcoxh/video/upload/v1752141159/yt1z.net_-_BARISTA_Cafe_Promo_Video_Cinematic_Real_Estate_video_Epic_B-Roll_1080p60_httacw.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dynamic overlay that responds to mouse */}
        <div
          className="absolute inset-0 transition-all duration-500 ease-out"
          style={{
            background: `linear-gradient(135deg,
              rgba(0, 0, 0, ${0.4 + (mousePosition.y / 100) * 0.2}) 0%,
              rgba(0, 0, 0, ${0.6 - (mousePosition.x / 100) * 0.2}) 100%)`,
          }}
        />
      </div>
      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center ">
        <div className="text-center text-white max-w-6xl mx-auto px-6">
          {/* Main Title with staggered animation */}
          <div className="overflow-hidden mb-6 mt-[5rem]">
            <h1
              className={`text-display-md font-display transition-all duration-1500 ease-out ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
              }`}
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                transform: `translateY(${isLoaded ? 0 : 100}px) scale(${1 + (mousePosition.x / 100) * 0.05})`,
              }}
            >
              FOREIGNER CAFE
            </h1>
          </div>
          {/* Subtitle */}
          <div className="overflow-hidden mb-8">
            <p
              className={`text-2xl font-light transition-all duration-1500 ease-out delay-300 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
              }`}
              style={{
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              A Space for Community & Craft
            </p>
          </div>
          {/* Description */}
          <div className="overflow-hidden mb-12">
            <p
              className={`text-body-lg max-w-3xl mx-auto opacity-90 transition-all duration-1500 ease-out delay-500 ${
                isLoaded ? "translate-y-0 opacity-90" : "translate-y-full opacity-0"
              }`}
              style={{
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              More than a coffee shop — we're a gathering place for people, ideas, and craft. Rooted in hospitality and
              culture, our space is a warm invitation to slow down and connect.
            </p>
          </div>
          {/* CTA Button with hover effects */}
          <div className="overflow-hidden">
            <Button
              onClick={() => setShowLocationModal(true)} // Changed onClick to open the modal
              className={` overflow-hidden bg-[#EC4E20] text-white px-12 py-6 text-lg font-bold tracking-wide transition-all  duration-1500 ease-out delay-700 hover:bg-orange-500 `}
              style={{
                transform: `translateY(${isLoaded ? 0 : 100}px) scale(${1 + (mousePosition.y / 100) * 0.02})`,
                boxShadow: "0 10px 30px rgba(255, 107, 53, 0.3)",
              }}
            >
              <span className=" z-10">Visit Us</span>
            </Button>
          </div>
          {/* Scroll indicator */}
          <div
            className={`absolute mt-[1rem] left-1/2 transform -translate-x-1/2 transition-all duration-2000 ease-out delay-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            <div className="flex flex-col items-center text-white/80">
              <span className="text-sm mb-2 tracking-wide">SCROLL TO EXPLORE</span>
              <div className="w-px h-12 bg-white/40 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-full h-full bg-orange animate-pulse"
                  style={{ animationDuration: "2s" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Location Modal */}
      <LocationModal open={showLocationModal} onOpenChange={setShowLocationModal} />
    </section>
  )
}
