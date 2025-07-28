"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { useState, useRef, useEffect } from "react";
import { ReservationModal } from "./reserveModal";

const events = [
  {
    id: 1,
    title: "WEDDINGS",
    imageSrc: "/images/couple.webp",
    linkHref: "#",
  },
  {
    id: 2,
    title: "CELEBRATIONS",
    imageSrc: "/images/celebration.webp",
    linkHref: "#",
  },
  {
    id: 3,
    title: "CORPORATE",
    imageSrc: "/images/corporate.webp",
    linkHref: "#",
  },
];

export default function EventsShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false); // Moved inside the component

  const handleDotClick = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.children[index] as HTMLElement;
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const newActiveIndex = Math.round(scrollPosition / containerWidth);
      setActiveIndex(newActiveIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="event"
      className="bg-white py-12 lg:py-20 mb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
            EVENTS
          </h2>
          <p className="text-gray-600 text-sm sm:text-lg mt-3 sm:mt-4 text-center">
            From bringing people together and intimate gatherings to creative moments see what's happening.
          </p>
        </div>

        {/* Event Cards Grid / Horizontal Scroll */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory pb-4 gap-4 md:grid md:grid-cols-3 md:gap-8 hide-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {events.map((event) => (
            <Link
              key={event.id}
              href={event.linkHref}
              className="group block relative bg-white transition-shadow duration-300 rounded-lg flex-shrink-0 w-[calc(100vw-3rem)] sm:w-[calc(100vw-4rem)] snap-center md:w-auto"
            >
              {/* Image container with custom arched top */}
              <div
                className="relative w-full h-[320px] sm:h-[400px] md:h-[520px] overflow-hidden"
                style={{
                  borderTopLeftRadius: "500px",
                  borderTopRightRadius: "500px",
                }}
              >
                <Image
                  src={event.imageSrc || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                {/* Title */}
                <h3 className="absolute bottom-6 left-0 right-0 text-center text-xl sm:text-2xl font-bold uppercase text-white px-4">
                  {event.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Orange Dots Navigation (Mobile Only) */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 focus-outline:none border-none focus-visible:outline-none ${activeIndex === index ? "bg-orange-600 w-2 h-2" : "bg-orange-400"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-20 flex flex-col items-center gap-3 sm:gap-4">
          <h3 className="text-black text-2xl sm:text-3xl font-bold text-center">
            READY TO HOST AT FOREIGNER CAFE?
          </h3>
          <p className="text-gray-600 text-md sm:text-md text-center max-w-2xl px-4 sm:px-6">
            Whether its wedding, dinner celebration or corporate gathering, we would love to help you make it unforgettable. Foreigner Cafe is here to bring your vision to life. Let us help you create an experience that feels personal, meaningful, and beautifully memorable.
          </p>
          <Button
            onClick={() => setIsReservationModalOpen(true)}
            className="uppercase border border-[#EC4E20] bg-transparent text-[#EC4E20] hover:bg-[#f97316] hover:text-black hover:scale-110 text-xs sm:text-sm px-6 py-3"
          >
            Book your event
          </Button>
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <ReservationModal
        open={isReservationModalOpen}
        onOpenChange={setIsReservationModalOpen}
      />
    </section>
  );
}
