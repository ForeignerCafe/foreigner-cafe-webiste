"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReservationModal } from "./reserveModal";

const venues = [
  {
    id: 1,
    name: "THE POTTING SHED",
    location: "San Mateo",
    description:
      "Surround yourself with lush greenery at The Potting Shed and enjoy fresh seasonal dishes, with a cheeky tipple or two.",
    image: "/images/potting.webp",
    link: "/venues/potting-shed",
    bookLink: "/book/potting-shed",
  },
  {
    id: 2,
    name: "THE FOREIGNERS CAFE",
    location: "San Mateo",
    description:
      "Sit back and enjoy a hearty meal & sweet treats in one of Sydney's most iconic eateries. with crispy bites of history and a side of culture.",
    image: "/images/cafe.webp",
    link: "/venues/foreigners-cafe",
    bookLink: "/book/foreigners-cafe",
  },
  {
    id: 3,
    name: "THE COFFEE FACTORY",
    location: "SOUTH EVELEIGH",
    description:
      "Savour wholesome food and great coffee amongst the working machinery of The Coffee Factory's working roastery.",
    image: "/images/factory.webp",
    link: "/venues/coffee-factory",
    bookLink: "/book/coffee-factory",
  },
];

export default function DineDrinkSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-0">
            DINE + DRINK
          </h2>
        </div>

        {/* Venue Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {venues.map((venue, index) => (
            <div
              key={venue.id}
              className={`group overflow-hidden rounded-lg transition-all duration-500 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <Link href={venue.link} className="block overflow-hidden">
                <img
                  src={venue.image || "/placeholder.svg"}
                  alt={venue.name}
                  className="w-full h-52 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Link>

              <div className="p-4 sm:p-6 bg-white flex flex-col h-[240px] sm:h-[220px]">
                {/* Location */}
                <div className="flex items-center text-gray-600 text-sm font-medium mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-cafeGreen" />
                  <span className="tracking-wide">{venue.location}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3">
                  {venue.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-700 leading-relaxed mb-4 sm:mb-6 flex-grow">
                  {venue.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
                  <Button
                    onClick={() => setIsReservationModalOpen(true)}
                    className="bg-[#EC4E20] hover:bg-[#f97316] text-white hover:text-black "
                  >
                    Book Event
                  </Button>
                  {/* <Button
                    asChild
                    variant="link"
                    className="flex-1 text-cafeGreen hover:text-black hover:underline px-0 justify-center sm:justify-start"
                  >
                    <Link href={venue.link}>View Venue</Link>
                  </Button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ReservationModal
        open={isReservationModalOpen}
        onOpenChange={setIsReservationModalOpen}
      />
    </section>
  );
}
