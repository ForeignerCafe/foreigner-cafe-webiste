"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; // Import Next.js Image component
import image1 from "@/public/images/loader-images/f-loader.jpeg";
import image2 from "@/public/images/loader-images/o-loader.jpeg";
import image3 from "@/public/images/loader-images/r-loader.jpeg";
import image4 from "@/public/images/loader-images/e-loader.jpeg";
import { useIsMobile } from "@/hooks/use-mobile"; // Import the useIsMobile hook

// Define the letters and their image sources
const cafeLetters = [
  { letter: "F", src: image1 },
  { letter: "O", src: image2 },
  { letter: "R", src: image3 },
  { letter: "E", src: image4 },
  { letter: "I", src: image1 },
  { letter: "G", src: image2 },
  { letter: "N", src: image3 },
  { letter: "E", src: image4 },
  { letter: "R", src: image1 },
  // Second row starts here
  { letter: "C", src: image2 },
  { letter: "A", src: image3 },
  { letter: "F", src: image4 },
  { letter: "E", src: image1 },
];

// Desktop-specific floating cafe elements
const floatingCafeElementsDesktop = [
  {
    id: 1,
    src: "/placeholder.svg?height=100&width=100", // Coffee bean
    alt: "Coffee bean",
    size: "w-16 h-16 md:w-24 md:h-24",
    position: "top-[10%] left-[15%] md:top-[10%] md:left-[25%]",
    animation: "animate-floatSlow",
    delay: "0s",
    blur: "blur-sm",
    opacity: "opacity-70",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=150&width=150", // Coffee cup
    alt: "Coffee cup",
    size: "w-20 h-20 md:w-32 md:h-32",
    position: "bottom-[15%] right-[10%] md:bottom-[20%] md:right-[33%]",
    animation: "animate-floatSlow",
    delay: "1s",
    blur: "blur-md",
    opacity: "opacity-60",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=80&width=80", // Steam/swirl
    alt: "Steam swirl",
    size: "w-12 h-12 md:w-20 md:h-20",
    position: "top-[30%] right-[5%] md:top-[33%] md:right-[10%]",
    animation: "animate-fadeMoveBlur",
    delay: "0.5s",
    blur: "blur-lg",
    opacity: "opacity-80",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=110&width=110", // Another coffee bean
    alt: "Coffee bean",
    size: "w-14 h-14 md:w-22 md:h-22",
    position: "bottom-[5%] left-[5%] md:bottom-[10%] md:left-[20%]",
    animation: "animate-floatSlow",
    delay: "1.5s",
    blur: "blur-sm",
    opacity: "opacity-75",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=90&width=90", // Small coffee cup
    alt: "Small coffee cup",
    size: "w-10 h-10 md:w-18 md:h-18",
    position: "top-[5%] left-[50%] -translate-x-1/2 md:top-[20%] md:left-[10%]",
    animation: "animate-fadeMoveBlur",
    delay: "2s",
    blur: "blur-md",
    opacity: "opacity-65",
  },
];

// Desktop-specific gradient balls
const gradientBallsDesktop = [
  {
    id: 1,
    size: "w-48 h-48 md:w-80 md:h-80",
    position: "top-[20%] left-[10%] md:top-[25%] md:left-[25%]",
    color: "rgba(255, 107, 53, 0.3)", // Orange
    animation: "animate-gradientPulse",
    delay: "0s",
  },
  {
    id: 2,
    size: "w-56 h-56 md:w-96 md:h-96",
    position: "bottom-[10%] right-[5%] md:bottom-[33%] md:right-[25%]",
    color: "rgba(26, 61, 46, 0.3)", // Cafe Green
    animation: "animate-gradientPulse",
    delay: "0.8s",
  },
  {
    id: 3,
    size: "w-40 h-40 md:w-88 md:h-88",
    position: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
    color: "rgba(255, 107, 53, 0.25)", // Orange
    animation: "animate-gradientPulse",
    delay: "1.5s",
  },
];

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const isMobile = useIsMobile(); // Determine if on mobile

  useEffect(() => {
    // Check if preloader has been shown in this session
    const hasPreloaderBeenShown = sessionStorage.getItem("preloaderShown");

    if (hasPreloaderBeenShown) {
      setIsLoading(false); // If already shown in this session, don't display it
      return;
    }

    // If not shown, mark it as shown immediately for this session
    sessionStorage.setItem("preloaderShown", "true");

    // Preloader visible for 6 seconds
    const timer = setTimeout(() => {
      setIsFadingOut(true); // Start fade out animation
    }, 3000); // Increased duration to 3 seconds

    return () => clearTimeout(timer);
  }, []); // Empty dependency array means it runs once on mount

  useEffect(() => {
    if (isFadingOut) {
      const fadeOutTimer = setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Matches the transition duration in CSS (1 second)

      return () => clearTimeout(fadeOutTimer);
    }
  }, [isFadingOut]); // Runs when isFadingOut changes

  if (!isLoading) {
    return null; // Don't render if loading is complete and faded out
  }

  // Mobile Preloader Version
  if (isMobile) {
    return (
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-1000 min-h-screen ${
          isFadingOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
          {/* First row: FOREIGNER */}
          <div className="flex justify-center gap-1">
            {cafeLetters.slice(0, 9).map((item, index) => (
              <p
                key={`mobile-letter-${item.letter}-${index}`}
                className="text-xl font-bold text-gray-800 animate-fade-in-scale-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {item.letter}
              </p>
            ))}
          </div>

          {/* Second row: CAFE */}
          <div className="flex justify-center gap-1">
            {cafeLetters.slice(9).map((item, index) => (
              <p
                key={`mobile-letter-${item.letter}-${index + 9}`}
                className="text-xl font-bold text-gray-800 animate-fade-in-scale-up"
                style={{ animationDelay: `${(index + 9) * 80}ms` }}
              >
                {item.letter}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop Preloader Version
  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-1000 min-h-screen ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient balls */}
        {gradientBallsDesktop.map((ball) => (
          <div
            key={ball.id}
            className={`absolute rounded-full ${ball.size} ${ball.position} ${ball.animation}`}
            style={{
              background: `radial-gradient(circle, ${ball.color} 0%, transparent 70%)`,
              animationDuration: "4s", // Adjust animation duration for gradient balls
              animationDelay: ball.delay,
              animationIterationCount: "infinite",
              animationDirection: "alternate",
            }}
          />
        ))}

        {/* Cafe elements */}
        {floatingCafeElementsDesktop.map((element) => (
          <div
            key={element.id}
            className={`absolute ${element.size} ${element.position} ${element.animation} ${element.blur} ${element.opacity}`}
            style={{
              animationDuration: "5s", // Adjust animation duration for floating elements
              animationDelay: element.delay,
              animationIterationCount: "infinite",
              animationDirection: "alternate",
            }}
          >
            <Image
              src={element.src || "/placeholder.svg"}
              alt={element.alt}
              fill
              className="object-contain" // Use object-contain for icons/elements
              priority // Load with high priority [^1][^2][^3]
            />
          </div>
        ))}
      </div>

      {/* Main FOREIGNER CAFE content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
        {/* First row: FOREIGNER */}
        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
          {cafeLetters.slice(0, 9).map((item, index) => (
            <div
              key={`letter-${item.letter}-${index}`}
              className="flex flex-col items-center animate-fade-in-scale-up"
              style={{ animationDelay: `${index * 100}ms` }} // Staggered entrance
            >
              <div
                className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 overflow-hidden shadow-md bg-gray-100 flex items-center justify-center animate-bounce-subtle"
                style={{
                  borderTopLeftRadius: "50%", // Circular top for an arched effect
                  borderTopRightRadius: "50%",
                }}
              >
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={`Letter ${item.letter}`}
                  fill // Use fill to make the image cover the parent div
                  className="object-cover"
                  priority // Load with high priority [^1][^2][^3]
                />
                {/* Optional overlay for subtle effect */}
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mt-2">
                {item.letter}
              </p>
            </div>
          ))}
        </div>

        {/* Second row: CAFE */}
        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
          {cafeLetters.slice(9).map((item, index) => (
            <div
              key={`letter-${item.letter}-${index + 9}`}
              className="flex flex-col items-center animate-fade-in-scale-up"
              style={{ animationDelay: `${(index + 9) * 100}ms` }} // Staggered entrance
            >
              <div
                className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 overflow-hidden shadow-md bg-gray-100 flex items-center justify-center animate-bounce-subtle"
                style={{
                  borderTopLeftRadius: "50%",
                  borderTopRightRadius: "50%",
                }}
              >
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={`Letter ${item.letter}`}
                  fill // Use fill to make the image cover the parent div
                  className="object-cover"
                  priority // Load with high priority [^1][^2][^3]
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mt-2">
                {item.letter}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
