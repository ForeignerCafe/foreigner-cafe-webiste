"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Coffee Cupping Session",
    date: "March 15, 2024",
    time: "2:00 PM - 4:00 PM",
    location: "Main Cafe Area",
    attendees: 12,
    maxAttendees: 15,
    description:
      "Learn the art of coffee tasting with our head barista. Discover flavor notes and brewing techniques.",
    image:
      "https://mtpak.coffee/wp-content/uploads/2022/11/What-are-the-ideal-cups-for-consumer-cupping-sessions_1.jpg",
  },
  {
    id: 2,
    title: "Local Artist Showcase",
    date: "March 22, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "Gallery Wall",
    attendees: 25,
    maxAttendees: 40,
    description:
      "Monthly exhibition featuring works from local artists. Wine and coffee pairings available.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Community Book Club",
    date: "March 29, 2024",
    time: "7:00 PM - 8:30 PM",
    location: "Reading Nook",
    attendees: 8,
    maxAttendees: 12,
    description:
      'This month we\'re discussing "The Seven Husbands of Evelyn Hugo". New members welcome!',
    image: "/placeholder.svg?height=200&width=300",
  },
];

export default function Events() {
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
    <section ref={sectionRef} className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our community events and connect with fellow coffee lovers and
            creatives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card
              key={event.id}
              className={`group overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:scale-110 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {event.attendees}/{event.maxAttendees} spots
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-black mb-3 group-hover:text-orange-500 transition-colors duration-300">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.attendees} attending</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 text-sm">
                  {event.description}
                </p>

                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={event.attendees >= event.maxAttendees}
                >
                  {event.attendees >= event.maxAttendees
                    ? "Event Full"
                    : "Reserve Spot"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 bg-transparent"
          >
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}
