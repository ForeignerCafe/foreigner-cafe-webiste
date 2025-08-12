//@ts-nocheck
"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import EventsCarousel from "@/components/EventCarosel"
import { ReservationModal } from "@/components/reserveModal"
import { Skeleton } from "@/components/ui/skeleton"
import { EventsPageData, EventCarouselData } from "./types"

export default function EventsPageClient2({ 
  data, 

}: { 
  data: EventsPageData, 
  
}) {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Hero Section */}
      <section id="home" className="relative w-full min-h-screen overflow-hidden">
        {!isImageLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full" />
        )}
        <Image 
          src={data.hero.backgroundImage} 
          alt="Restaurant interior" 
          fill 
          className="object-cover" 
          priority 
          onLoadingComplete={() => setIsImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4 mt-0 pt-0 sm:mt-[2rem] sm:pt-[2rem] md:mt-[4rem] md:pt-[3rem]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-4xl mt-20 uppercase">
            {data.hero.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl">
            {data.hero.subtitle}
          </p>
          <Button
            onClick={() => setIsReservationModalOpen(true)}
            className="hover:scale-110 mt-8 bg-[#EC4E20] hover:bg-[#f97316] hover:text-black text-white px-8 py-3 text-lg">
            Book Now
          </Button>
        </div>
      </section>

      <ReservationModal
        open={isReservationModalOpen}
        onOpenChange={setIsReservationModalOpen}
      />
    </div>
  )
}
