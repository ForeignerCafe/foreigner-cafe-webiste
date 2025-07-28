"use client";

import { useState, useEffect, useRef } from "react";
import { Instagram, Heart, MessageCircle } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=400",
    alt: "Latte art",
    likes: 234,
    comments: 12,
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=400",
    alt: "Cafe interior",
    likes: 189,
    comments: 8,
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=400",
    alt: "Fresh pastries",
    likes: 156,
    comments: 15,
  },
  {
    id: 4,
    src: "/placeholder.svg?height=400&width=400",
    alt: "Coffee beans",
    likes: 298,
    comments: 22,
  },
  {
    id: 5,
    src: "/placeholder.svg?height=400&width=400",
    alt: "Barista working",
    likes: 167,
    comments: 9,
  },
  {
    id: 6,
    src: "/placeholder.svg?height=400&width=400",
    alt: "Community event",
    likes: 245,
    comments: 18,
  },
];

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-center mb-4">
            <Instagram className="w-8 h-8 text-orange-500 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-black">
              @foreignercafe
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow our journey and see what's brewing in our community
          </p>
        </div>

        {/* Masonry-style Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative group cursor-pointer transition-all duration-500 ${
                index % 3 === 0 ? "md:row-span-2" : ""
              } ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center transition-opacity duration-300 ${
                  hoveredImage === image.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-white text-center">
                  <div className="flex items-center justify-center space-x-4 mb-2">
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 mr-1" />
                      <span>{image.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-5 h-5 mr-1" />
                      <span>{image.comments}</span>
                    </div>
                  </div>
                  <p className="text-sm opacity-90">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://instagram.com/foreignercafe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
