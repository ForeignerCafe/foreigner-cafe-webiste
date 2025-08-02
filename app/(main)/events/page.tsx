"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import EventsShowcaseSection from "@/components/events-showcase-section"
import { ReservationModal } from "@/components/reserveModal"
import { useState } from "react"
import EventsCarousel from "@/components/EventCarosel"

const contentData = [
  {
    category: "A Space To Unwind",
    title: "Thoughtful Settings for Meaningful Occasions",
    description:
      "Foreigner Café offers intimate spaces for storytelling nights, themed brunches, poetry readings, and more. Designed with intention and comfort, our venues are the perfect backdrop for experiences that feel personal, honest, and memorable.",
    imageSrc: "/images/pink.webp",
    imageAlt: "Elegant restaurant interior",
    imagePosition: "right", // Image on the right, text on the left on desktop
  },
  {
    category: "Your Next Masterpiece",
    title: "Flexible Settings with Heart and Style",
    description:
      "We understand that no two stories are the same. That’s why our team works with you to shape your event around your voice, your rhythm, and your meaning. From layout to lighting, menu to music, Foreigner Café is here to make it feel right, never rushed, never distant.",
    imageSrc: "/images/sitting.webp",
    imageAlt: "Restaurant dining area",
    imagePosition: "left", // Image on the left, text on the right on desktop
  },
  {
    category: "Curated Spaces",
    title: "A Backdrop That Feels Like a Story",
    description:
      "Each of our event spaces is shaped with warmth and detail from the textures to the lighting to the intentional stillness between sounds. Whether under soft evening lights or in the hum of a morning gathering, Foreigner Cafe is where spaces don’t just host your event they become part of its story.",
    imageSrc: "/images/dining.webp",
    imageAlt: "Modern bar area",
    imagePosition: "right", // Image on the right, text on the left on desktop
  },
]

const eventSpacesData = [
  {
    imageSrc: "/images/main-hall.webp",
    imageAlt: "Main Hall",
    title: "Main Hall",
    description:
      "Our Main Hall offers energy, elegance, and moments, woven into thoughtful clusters, warm lighting, and flexible layouts. It's designed for everything.",
  },
  {
    imageSrc: "/images/dining.webp",
    imageAlt: "Dining Spaces",
    title: "Dining Spaces",
    description:
      "Our dining spaces are designed for intimate togetherness, whether you're planning a storytelling event, a celebration, or a celebratory feast.",
  },
  {
    imageSrc: "/images/bar-lounge.webp",
    imageAlt: "Bar & Lounge",
    title: "Bar & Lounge",
    description:
      "Be it for your gathering or a casual bar & lounge, our event space offers an intimate, luxurious, and flexible layout, all about forming connections.",
  },
  {
    imageSrc: "/images/wedding-hall.webp",
    imageAlt: "Wedding Hall",
    title: "Wedding Hall",
    description:
      "Our ceremony space is a beautiful blend of urban oasis and wedding memories. It's a stunning environment for a luxurious, magical, and romantic event.",
  },
]

export default function Component() {
    const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Hero Section */}
      <section
        id="home"
        className="relative w-full min-h-screen overflow-hidden">
        <Image src="/images/events.webp" alt="Restaurant interior" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4 mt-0 pt-0 sm:mt-[2rem] sm:pt-[2rem] md:mt-[4rem] md:pt-[3rem]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-4xl mt-20 uppercase">
            Events at Foreigner Cafe
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl">
            Host your next event with us and create memories that last a lifetime.
          </p>
          <Button
            onClick={() => setIsReservationModalOpen(true)}
            className="hover:scale-110 mt-8 bg-[#EC4E20] hover:bg-[#f97316] hover:text-black text-white px-8 py-3 text-lg ">
            Book Now
          </Button>
        </div>
      </section>

      {/* Events Section */}
		      <EventsCarousel />

		  
		  
      {/* Image & Text Section */}
      <section className="bg-white">
        {" "}
        <div className="container mx-auto px-4 md:px-6 lg:px-0 mt-0">
          <div className="grid grid-cols-1">
            {" "}
            {contentData.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 justify-items-start m-6">
                {/* Text Content */}
                <div
                  className={
                    item.imagePosition === "right"
                      ? "order-2 md:order-1 p-4 sm:p-8 md:p-16"
                      : "order-2 md:order-2 p-4 sm:p-8 md:p-16"
                  }
                >
                  <p className="text-sm text-gray-500 mb-2 uppercase underline underline-offset-1 cursor-pointer tracking-wide">
                    {item.category}
                  </p>
                  <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-[0.9rem] mb-6 font-normal text-wrap">{item.description}</p>
                  
                </div>
                {/* Image */}
                <div className={item.imagePosition === "right" ? "order-1 md:order-2 w-full h-[500px]" : "order-1 md:order-1 w-full h-[400px]" }>
                  <Image
                    src={item.imageSrc || "/placeholder.svg"}
                    alt={item.imageAlt}
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
      {/* Our Event Spaces Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14 mt-6">
            <h2 className="text-3xl md:text-4xl font-bold text-black">OUR EVENT SPACES</h2>
            <p className="mt-2 text-gray-600 text-lg">
              Our event spaces are crafted for connection inviting you to gather, celebrate, and feel at home.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-4 mx-4 sm:mx-8 md:mx-16 lg:mx-[8rem]">
            {eventSpacesData.map((space, index) => (
              <Card key={index} className="overflow-hidden shadow-lg">
                <div className="w-full h-[300px]">
                  <Image
                    src={space.imageSrc || "/placeholder.svg"}
                    alt={space.imageAlt}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-7">
                  <h3 className="text-xl text-center uppercase font-semibold text-gray-800 mb-2">{space.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{space.description}</p>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 mt-5  justify-center">
                    
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
