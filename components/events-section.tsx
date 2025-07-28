"use client";

import { Button } from "@/components/ui/button";

export default function EventsSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="whats-on" className="bg-white py-12 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-[32px] font-bold tracking-[1.5px] text-black animate-fade-in-up">
            WHAT'S ON
          </h2>
          <Button
            onClick={() => scrollToSection("events-all")}
            variant="outline"
            className="text-[11px] tracking-[1px] font-medium border-gray-300 text-gray-700 hover:border-[#1a3d2e] hover:text-[#1a3d2e] px-4 py-2 rounded-none bg-transparent transition-all duration-200 animate-fade-in-up"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Event 1 */}
          <div className="group cursor-pointer animate-fade-in-up">
            <div className="overflow-hidden mb-6">
              <img
                src="/placeholder.svg?height=320&width=480"
                alt="Patisserie High Tea setup"
                className="w-full h-[320px] object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="text-[18px] font-bold mb-3 tracking-[1px] text-black group-hover:text-[#f77f00] transition-colors duration-200">
              PATISSERIE HIGH TEA
            </h3>
            <p className="text-[12px] text-gray-600 mb-4 leading-relaxed">
              Overlooking the working patisserie through a 4-inch high tea of
              sweet and savoury delights in your own private space in our
              historic garden.
            </p>
            <button
              onClick={() => scrollToSection("experiences")}
              className="text-[12px] text-[#1a3d2e] font-medium hover:text-[#f77f00] transition-colors duration-200 hover:underline"
            >
              Visit Patisserie High Tea
            </button>
          </div>

          {/* Event 2 */}
          <div
            className="group cursor-pointer animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="overflow-hidden mb-6">
              <img
                src="/placeholder.svg?height=320&width=480"
                alt="Glasshouse High Tea in garden setting"
                className="w-full h-[320px] object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="text-[18px] font-bold mb-3 tracking-[1px] text-black group-hover:text-[#f77f00] transition-colors duration-200">
              GLASSHOUSE HIGH TEA
            </h3>
            <p className="text-[12px] text-gray-600 mb-4 leading-relaxed">
              Indulge in a lavish high tea of sweet and savoury delights in your
              own private space in our historic garden.
            </p>
            <button
              onClick={() => scrollToSection("experiences")}
              className="text-[12px] text-[#1a3d2e] font-medium hover:text-[#f77f00] transition-colors duration-200 hover:underline"
            >
              Visit Glasshouse High Tea
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
