"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

export default function HomePage() {
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
    {
      quote:
        "The unique blend of flavors at Foreigner Cafe is simply unparalleled. Each cup tells a story, making every visit a delightful journey for the senses.",
      name: "Jessica P.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      quote:
        "Foreigner Cafe's commitment to quality is evident in every detail, from the meticulously prepared drinks to the cozy seating. It's a true haven for coffee lovers.",
      name: "Chris W.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      quote:
        "I've tried many coffee shops, but Foreigner Cafe stands out. The welcoming atmosphere and consistently great coffee make it a place I always look forward to visiting.",
      name: "Olivia M.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      quote:
        "Foreigner Cafe provides an enchanting escape from the ordinary. It's more than just a coffee shop; it's an experience that nourishes the soul.",
      name: "Daniel K.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-center text-white overflow-hidden">
        <Image
          src="/images/expHero.webp"
          alt="People gathering under string lights"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
        <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight  sm:mb-10 mt-14 uppercase">
            Every Gathering Becomes a Memory
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-xl max-w-2xl mx-auto pb-6 sm:pb-10">
            Discover immersive, soulful experiences that bring people together—through stories, food, and presence.
          </p>
          <Button
            onClick={() => scrollToSection("words")}
            className="hover:scale-110 bg-[#EC4E20] hover:bg-[#f97316] hover:text-black text-white px-6 sm:px-8 py-3 text-base sm:text-lg ">
            Learn More
          </Button>
        </div>
      </section>

      {/* Words From Community Section */}
      <section
        id="words"
        className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-4 mt-6 sm:mt-10 tracking-wide">
            WORDS FROM COMMUNITY
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-8 sm:mb-14">
            Hear from the people who've made Foreigner part of their everyday a place for reflection, conversation, and good coffee.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mx-4 sm:mx-8 lg:mx-20 mt-6 sm:mt-10">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="bg-white shadow-lg p-4 sm:p-6 flex flex-col text-left rounded-[0.5rem] items-center"
              >
                <CardContent className="p-0 w-full">
                  <Quote className="text-[#EC4E20] w-6 h-6 sm:w-8 sm:h-8 mb-3 sm:mb-4 mx-auto" />
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center space-x-3 sm:space-x-4 justify-start">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-black text-xs sm:text-sm">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">San Francisco</p>
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
