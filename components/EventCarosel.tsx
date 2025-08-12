"use client";
import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ReservationModal } from "./reserveModal";
import { useState } from "react";

interface EventSlide {
  id: string;
  title: string;
  description: string;
  leftImage: {
    src: string;
    alt: string;
  };
  rightImages: {
    src: string;
    alt: string;
    text?: string;
  }[];
  topRightLinkText: string;
}

interface EventCarouselProps {
  eventData: EventSlide[];
  bottomSectionContent: {
    heading: string;
    text: string;
    buttonText: string;
  };
}

export default function EventsCarousel({ eventData, bottomSectionContent }: EventCarouselProps) {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Dynamic Carousel Section */}
      <div className="flex-grow flex flex-col justify-center py-8 sm:py-12 md:pt-20">
        <Carousel
          setApi={setApi}
          className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {eventData.map((event) => (
              <CarouselItem key={event.id} className="basis-full">
                <div className="flex flex-col items-center w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-start w-full max-w-5xl mx-auto mt-4 sm:mt-8 px-4">
                    {/* Left Column - Text and Bottom Image */}
                    <div className="flex flex-col space-y-4 sm:space-y-6 order-2 lg:order-1">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                        {event.title}
                      </h2>
                      <p className="text-gray-700 leading-relaxed max-w-md text-sm sm:text-base">
                        {event.description}
                      </p>
                      <div className="w-full mt-4">
                        <Image
                          src={event.leftImage.src || "/placeholder.svg"}
                          alt={event.leftImage.alt}
                          width={600}
                          height={400}
                          className="w-full h-[16rem] sm:h-[18rem] object-cover rounded-lg shadow-md"
                        />
                      </div>
                    </div>

                    {/* Right Column - Top Image */}
                    <div className="flex flex-col items-center lg:items-start space-y-4 sm:space-y-6 order-1 lg:order-2">
                      <div className="w-full">
                        {event.rightImages.map((img, imgIndex) => (
                          <React.Fragment key={imgIndex}>
                            <Image
                              src={img.src || "/placeholder.svg"}
                              alt={img.alt}
                              width={600}
                              height={400}
                              className="w-full h-[16rem] sm:h-[18rem] object-cover rounded-lg shadow-md"
                            />
                            {img.text && (
                              <p className="text-gray-700 text-center lg:text-left max-w-[350px] text-sm sm:text-base leading-relaxed mt-2 sm:mt-4">
                                {img.text}
                              </p>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* 3-Dot Navigation */}
        <div className="flex justify-center space-x-2 mt-8 sm:mt-12 mb-8 sm:mb-16">
          {eventData.map((_, dotIndex) => (
            <button
              key={dotIndex}
              className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                dotIndex === current ? "bg-[#EC4E20]" : "bg-[#EC4E20]/30"
              }`}
              onClick={() => api?.scrollTo(dotIndex)}
              aria-label={`Go to slide ${dotIndex + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Static Bottom Section */}
      <div className="w-full max-w-3xl mx-auto text-center px-4 pb-8 sm:pb-12 md:pb-20 lg:pb-24">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
          {bottomSectionContent.heading}
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
          {bottomSectionContent.text}
        </p>
        <Button
          onClick={() => setIsReservationModalOpen(true)}
          className=" uppercase border border-[#EC4E20] bg-transparent text-[#EC4E20] hover:bg-[#f97316] hover:text-black hover:scale-110 text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3"
        >
          {bottomSectionContent.buttonText}
        </Button>
      </div>

      <ReservationModal
        open={isReservationModalOpen}
        onOpenChange={setIsReservationModalOpen}
      />
    </div>
  );
}
