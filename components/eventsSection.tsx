"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const eventImages = [
  {
    src: "/images/couple.webp",
    alt: "Wedding",
  },
  {
    src: "/images/celebration.webp",
    alt: "Celebration",
  },
  {
    src: "/images/corporate.webp",
    alt: "Corporate",
  },
  {
    src: "/images/private.webp",
    alt: "Private Meeting",
  },
]

export default function Events() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === eventImages.length - 1 ? 0 : prevIndex + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className=" md:mt-20 w-full py-16 md:py-24 lg:p-10 "> 
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Content - Left Column */}
          <div className="space-y-6 lg:space-y-8 lg:p-8">
            <div className="space-y-4">
              
              <h2 className=" font-bold tracking-tight text-4xl md:text-5xl text-black uppercase">
                Where Stories Come to Life
              </h2>
              <p className="text-md text-gray-600 leading-relaxed max-w-xl">
                Join us for unforgettable experiences at our cafe. From intimate coffee tastings and live acoustic
                sessions to art exhibitions and book clubs, we create moments that bring our community together over
                exceptional coffee and shared passions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                          <Link href="/events">
                               <Button className=" uppercase border border-[#EC4E20] bg-transparent text-[#EC4E20] hover:bg-[#f97316] hover:text-black hover:scale-110 text-xs sm:text-sm px-4 py-2">
                                  Explore All Events
                                   <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
              </Link>
    
            </div>
          </div>

          {/* Image Carousel - Right Column */}
          <div className="relative">
            <div className="relative h-[400px]  overflow-hidden rounded-2xl shadow-2xl">
              {/* Main Image Display */}
              <div className="relative w-full h-full">
                {eventImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ))}
              </div>

              {/* Floating Image Previews */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 space-y-4 hidden lg:block">
                {eventImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden shadow-lg transition-all duration-500 cursor-pointer ${
                      index === currentImageIndex
                        ? "scale-110 ring-4 ring-amber-400 ring-opacity-60"
                        : "scale-90 opacity-70 hover:opacity-100 hover:scale-100"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                  </div>
                ))}
              </div>

              {/* Progress Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                {eventImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>

              {/* Animated Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-amber-400 rounded-full animate-bounce opacity-80"></div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-orange-300 rounded-full animate-pulse opacity-60"></div>
              <div className="absolute top-1/4 -left-6 w-6 h-6 bg-yellow-400 rounded-full animate-ping opacity-40"></div>
            </div>

            {/* Background Decorative Blur */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-200 to-orange-200 rounded-2xl blur-3xl opacity-30 scale-110"></div>
          </div>
        </div>

        {/* Mobile Image Thumbnails */}
        <div className="mt-8 lg:hidden">
          <div className="flex justify-center space-x-4  pb-4">
            {eventImages.map((image, index) => (
              <div
                key={index}
                className={`flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  index === currentImageIndex ? "ring-2 ring-amber-400 scale-110" : "opacity-70"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
