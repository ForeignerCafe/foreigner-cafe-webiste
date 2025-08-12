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

export default function EventsPageClient({ 
  data, 
  carouselData 
}: { 
  data: EventsPageData, 
  carouselData: EventCarouselData 
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

      {/* Events Carousel Section */}
      <EventsCarousel 
        eventData={carouselData.slides} 
        bottomSectionContent={carouselData.bottomSection} 
      />

      {/* Image & Text Sections */}
      <section className="bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-0 mt-0">
          <div className="grid grid-cols-1">
            {data.contentSections.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 justify-items-start m-6">
                <div className={
                  item.imagePosition === "right" 
                    ? "order-2 md:order-1 p-4 sm:p-8 md:p-16" 
                    : "order-2 md:order-2 p-4 sm:p-8 md:p-16"
                }>
                  <p className="text-sm text-gray-500 mb-2 uppercase underline underline-offset-1 cursor-pointer tracking-wide">
                    {item.category}
                  </p>
                  <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-[0.9rem] mb-6 font-normal text-wrap">
                    {item.description}
                  </p>
                </div>
                <div className={
                  item.imagePosition === "right" 
                    ? "order-1 md:order-2 w-full h-[500px]" 
                    : "order-1 md:order-1 w-full h-[400px]"
                }>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={200}
                    className="w-full h-full object-cover shadow-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Spaces Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14 mt-6">
            <h2 className="text-3xl md:text-4xl font-bold text-black">OUR EVENT SPACES</h2>
            <p className="mt-2 text-gray-600 text-lg">
              Our event spaces are crafted for connection inviting you to gather, celebrate, and feel at home.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-4 mx-4 sm:mx-8 md:mx-16 lg:mx-[8rem]">
            {data.eventSpaces.map((space) => (
              <Card key={space.id} className="overflow-hidden shadow-lg">
                <div className="w-full h-[300px]">
                  <Image
                    src={space.image}
                    alt={space.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-7">
                  <h3 className="text-xl text-center uppercase font-semibold text-gray-800 mb-2">
                    {space.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {space.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 mt-5 justify-center">
                    <Button variant="link" className="text-[#EC4E20] underline">
                      VIEW VENUE
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ReservationModal
        open={isReservationModalOpen}
        onOpenChange={setIsReservationModalOpen}
      />
    </div>
  )
}
