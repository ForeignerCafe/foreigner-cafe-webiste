"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    id: 1,
    name: "Signature Espresso",
    description: "Rich, bold blend with notes of dark chocolate and caramel",
    price: "$4.50",
    image: "/placeholder.svg?height=300&width=300",
    category: "Coffee",
  },
  {
    id: 2,
    name: "Artisan Croissant",
    description: "Buttery, flaky pastry baked fresh daily",
    price: "$3.25",
    image: "/placeholder.svg?height=300&width=300",
    category: "Pastry",
  },
  {
    id: 3,
    name: "Cold Brew Float",
    description: "House cold brew with vanilla bean ice cream",
    price: "$5.75",
    image: "/placeholder.svg?height=300&width=300",
    category: "Specialty",
  },
  {
    id: 4,
    name: "Avocado Toast",
    description: "Sourdough with smashed avocado, hemp seeds, and lime",
    price: "$8.50",
    image: "/placeholder.svg?height=300&width=300",
    category: "Food",
  },
  {
    id: 5,
    name: "Matcha Latte",
    description: "Ceremonial grade matcha with steamed oat milk",
    price: "$5.25",
    image: "/placeholder.svg?height=300&width=300",
    category: "Tea",
  },
];

export default function FeaturedMenu() {
  const [isVisible, setIsVisible] = useState(false);
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
    <section ref={sectionRef} className="py-12 lg:py-20 bg-white" id="menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Featured Menu
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Carefully crafted selections that showcase our commitment to quality
            and flavor
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Card
              key={item.id}
              className={`group overflow-hidden hover:shadow-xl transition-all duration-500 ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              } ${index === 2 ? "lg:col-span-2" : ""} ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-black group-hover:text-orange-500 transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="text-lg font-bold text-orange-500">
                    {item.price}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-300 bg-transparent"
                >
                  Add to Order
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
          >
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
}
