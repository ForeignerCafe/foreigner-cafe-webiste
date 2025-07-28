"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Quote } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const testimonials = [
  {
    quote:
      "Foreigner Cafe has truly redefined my coffee experience. The ambiance is perfect for deep conversations and quiet reflection.",
    name: "Sarah J.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote:
      "Every time I step into Foreigner Cafe, the aroma of freshly brewed coffee instantly uplifts my spirits. It's my go-to place for a peaceful start to the day.",
    name: "Michael B.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote:
      "Foreigner Cafe exceeds expectations with its friendly staff and delicious pastries. It's a hidden gem that deserves all the praise. Highly recommended!",
    name: "Emily R.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote:
      "Foreigner Cafe is where I find my calm amidst the city's hustle. The serene environment and exceptional coffee make it my favorite spot to unwind.",
    name: "David L.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const experiences = [
  {
    id: 1,
    title: "COFFEE CUPPING SESSIONS",
    description:
      "Join our expert baristas for an educational journey through coffee origins, processing methods, and tasting techniques.",
    imageSrc: "/images/coffeeSession.webp",
    linkText: "Learn More & Book",
    linkHref: "#reservations",
  },
  {
    id: 2,
    title: "PRIVATE EVENTS",
    description:
      "Host your special occasions in our intimate space, complete with custom menus and personalized service.",
    imageSrc: "/images/private.webp",
    alt: "Private Events",
    linkText: "Inquire About Events",
    linkHref: "#contact",
  },
];

export default function ExperiencesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <main>
      {/* EXPERIENCES SECTION */}
      <section
        ref={sectionRef}
        id="experiences"
        className="bg-gray-50 py-10 sm:py-12 lg:py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-black mb-4 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              EXPERIENCES
            </h2>
            <p
              className={`text-sm sm:text-base text-gray-600 leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Unique dining experiences that bring our community together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className={`group transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <Link
                  href={experience.linkHref}
                  className="block relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 mb-5"
                >
                  <Image
                    src={experience.imageSrc || "/placeholder.svg"}
                    alt={experience.alt || experience.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-52 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {experience.title}
                    </span>
                  </div>
                </Link>
                <h3 className="text-lg sm:text-xl font-bold text-black mb-2">
                  {experience.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {experience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-10 sm:py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">
              Testimonials
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              What our customers say
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white shadow-md p-6 flex flex-col text-left rounded-xl items-start"
              >
                <CardContent className="p-0 w-full">
                  <Quote className="text-[#EC4E20] w-6 h-6 mb-4" />
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-black text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-gray-500">San Francisco</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
