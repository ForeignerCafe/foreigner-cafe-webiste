"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
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
    <section ref={sectionRef} className="py-12 lg:py-20 bg-gray-50" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              More than a coffee shop
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Foreigner Cafe is more than a coffee shop — we're a space where
              stories are shared over craft coffee, and culture meets community.
              Our industrial-modern aesthetic creates the perfect backdrop for
              meaningful connections.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              From our exposed brick walls to our carefully curated menu, every
              detail is designed to foster authentic experiences and celebrate
              the art of hospitality.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  5+
                </div>
                <div className="text-gray-600">Years Serving</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  50k+
                </div>
                <div className="text-gray-600">Cups Brewed</div>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="/placeholder.svg?height=300&width=250"
                  alt="Coffee brewing"
                  className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
                <img
                  src="/placeholder.svg?height=200&width=250"
                  alt="Cafe interior"
                  className="w-full h-32 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src="/placeholder.svg?height=200&width=250"
                  alt="Barista at work"
                  className="w-full h-32 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
                <img
                  src="/placeholder.svg?height=300&width=250"
                  alt="Community gathering"
                  className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
