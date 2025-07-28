import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function WhyUs() {
  return (
    <section className="mt-6 lg:mt-6 mx-4 sm:mx-8 md:m-[10rem] bg-white mb-2">
      <div className="container mx-auto px-4 md:px-6">
        {/* Heading and Sub-heading */}
        <div className="text-center mb-16 sm:mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            WHY CHOOSE US?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto ">
            See what's on the calendar from unicorn days to creative corners and playtime magic.
          </p>
        </div>

        {/* Section 1: Designed with Intention */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Images - Left side */}
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[450px] lg:h-[500px] flex justify-center md:justify-start items-center">
            {/* Main image (larger, behind) */}
            <div className="relative w-[65%] h-[65%] rounded-3xl left-[30%] -top-20 overflow-hidden shadow-lg">
              <Image
                src="/images/top1.webp"
                alt="Cafe interior with tables and chairs"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
            {/* Overlay image (smaller, in front, offset) */}
            <div className="absolute top-[25%] right-[38%] w-[55%] h-[65%] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/top2.webp"
                alt="Close-up of coffee cup with latte art"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Text and Button - Right side */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 sm:space-y-6 mb-8 sm:mb-[5rem]">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              DESIGNED WITH INTENTION
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-md">
              Every corner tells a story crafted for comfort, beauty, and presence.
            </p>
            <Button className="bg-[#F5653E] hover:bg-[#E05A35] text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-[0.5rem] text-base sm:text-lg">
              VISIT US
            </Button>
          </div>
        </div>

        {/* Section 2: Rooted in Community */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Text and Button - Left side (opposite of section 1) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 sm:space-y-6 order-2 mt-6 md:order-1">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              ROOTED IN COMMUNITY
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-md">
              We're more than a café we're a space for real connection and shared moments.
            </p>
            <Button className="bg-[#F5653E] hover:bg-[#E05A35] text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-[0.5rem] text-base sm:text-lg">
              VISIT US
            </Button>
          </div>

          {/* Images - Right side (opposite of section 1) */}
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[450px] lg:h-[500px] flex justify-center md:justify-end items-center order-1 md:order-2">
            {/* Main image (larger, behind) */}
            <div className="relative w-[60%] h-[65%] top-20 rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/images/bottomPeople.webp"
                alt="Diverse group of people smiling"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
            {/* Overlay image (smaller, in front, offset) */}
            <div className="absolute top-[15%] left-[0%] w-[55%] h-[65%] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/bottomPeople1.webp"
                alt="People gathered at a community event"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
