"use client"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Dummy data for more items to enable carousel functionality
const allLunchPacks = [
  {
    id: 1,
    title: "Seasonal fruit salad cup",
    description: "Roast chicken & herb mayo sandwich Pickled vegetable bowl",
    price: "$18.99",
    image: "/images/salad.webp",
  },
  {
    id: 2,
    title: "Veggie Artisan Box",
    description: "CHummus & veggie wrap Chopped lentil salad",
    price: "$15.50",
    image: "/images/veggie.webp",
  },
  {
    id: 3,
    title: "Comfort Lunch Crates",
    description: " Roasted veggie wraps, salad, spiced lentil bowls",
    price: "$12.00",
    image: "/images/comfort.webp",
  },
  {
    id: 4,
    title: "Vegan Power Bowl",
    description: "Nutrient-rich bowl with quinoa, roasted veggies, and tahini dressing.",
    price: "$16.75",
    image: "/images/salad.webp",
  },
  {
    id: 5,
    title: "Mediterranean Mezze",
    description: "Hummus, falafel, pita, and fresh vegetable sticks.",
    price: "$19.25",
    image: "/images/veggie.webp",
  },
  {
    id: 6,
    title: "Kids Fun Pack",
    description: "Kid-friendly sandwiches, fruit, and a sweet treat.",
    price: "$10.00",
    image: "/images/salad.webp",
  },
]

const allCakeRange = [
  {
    id: 1,
    title: "Cardamom Rose Dream",
    description: "Decadent layers of rich chocolate and creamy fudge.",
    price: "$45.00",
    image: "/images/rose.webp",
  },
  {
    id: 2,
    title: "Classic Carrot",
    description: "Light and fluffy vanilla cake with a delicate bean flavor.",
    price: "$40.00",
    image: "/images/carrot.webp",
  },
  {
    id: 3,
    title: "Lemon Olive Oil Cake",
    description: "Tangy lemon filling topped with sweet, fluffy meringue.",
    price: "$35.00",
    image: "/images/lemon.webp",
  },
  {
    id: 4,
    title: "Red Velvet Delight",
    description: "Classic red velvet with cream cheese frosting.",
    price: "$42.00",
    image: "/images/rose.webp",
  },
  {
    id: 5,
    title: "Carrot Cake Supreme",
    description: "Moist carrot cake with walnuts and spiced cream cheese.",
    price: "$38.00",
    image: "/images/carrot.webp",
  },
  {
    id: 6,
    title: "Strawberry Shortcake",
    description: "Fresh strawberries and whipped cream on a light sponge.",
    price: "$39.50",
    image: "/images/lemon.webp",
  },
]

const cateringData = [
  {
    id: 1,
    src: "/images/corporateCat.webp",
    alt: "Office Catering",
    title: "CORPORATE CATERING",
    description:
      "From team lunches to client meetings, our corporate catering brings meals to your workplace. We make it easy to impress no stress, just good food and good energy.",
  },
  {
    id: 2,
    src: "/images/hosting.webp",
    alt: "At Home Hosting",
    title: "AT HOME HOSTING",
    description:
      "Invite Foreigner Café to your table. With our curated drop-off catering, you can host at home without the fuss everything from breakfast spreads to dinner platters.",
  },
  {
    id: 3,
    src: "/images/cele.webp",
    alt: "Corporate Catering",
    title: "CELEBRATION CATERING",
    description:
      "Planning an intimate dinner, a baby shower, or an anniversary brunch? Our catering turns any moment into a memory with sweet details, and extra  charm your guests will remember.",
  },
  {
    id: 4,
    src: "/images/weds.webp",
    alt: "Private Catering",
    title: "WEDDING CATERING",
    description:
      "From styled grazing tables to custom cakes our wedding catering is designed to reflect your story. We work closely with you to create an experience that feels personal and full of flavor.",
  },
]

export default function Component() {
  const [currentLunchPackIndex, setCurrentLunchPackIndex] = useState(0)
  const [currentCakeIndex, setCurrentCakeIndex] = useState(0)

  const handlePrevLunchPack = () => {
    setCurrentLunchPackIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }

  const handleNextLunchPack = () => {
    setCurrentLunchPackIndex((prevIndex) => Math.min(allLunchPacks.length - 3, prevIndex + 1))
  }

  const handlePrevCake = () => {
    setCurrentCakeIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }

  const handleNextCake = () => {
    setCurrentCakeIndex((prevIndex) => Math.min(allCakeRange.length - 3, prevIndex + 1))
  }

  const visibleLunchPacks = allLunchPacks.slice(currentLunchPackIndex, currentLunchPackIndex + 3)
  const visibleCakeRange = allCakeRange.slice(currentCakeIndex, currentCakeIndex + 3)

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Hero Section - Updated with proper spacing */}
      <section
        id="home"
        className="flex flex-col md:flex-row h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full sm:mt-0 ">
        {/* Left Hero Half - Cake Menu */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
          <Image
            src="/images/cakeMenu.webp"
            alt="Display case with various cakes and pastries"
            width={960}
            height={700}
            className="absolute inset-0 object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center pt-20 md:pt-10 md:justify-center text-white p-4">
            <div className="bg-black/50 text-center w-full sm:w-[30rem] h-[8rem] px-4 sm:px-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">CAKE MENU</h1>
              <Button
                onClick={() =>
										window.open(
											"https://order.toasttab.com/online/foreigner-60-east-3rd-avenue",
											"_blank",
											"noopener,noreferrer"
										)
									}
                className="hover:scale-110 hover:bg-[#EC4E20] hover:text-black hover:border-none mt-4 sm:mt-6 bg-transparent border border-white text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg rounded-[0.4rem]">
                ORDER NOW
              </Button>
            </div>
          </div>
        </div>
        {/* Right Hero Half - Full Menu */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
          <Image
            src="/images/fullMenu.webp"
            alt="Person serving food from a buffet line"
            width={960}
            height={700}
            className="absolute inset-0 object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center pt-20 md:pt-10 md:justify-center text-white p-4">
            <div className="bg-black/50 text-center w-full sm:w-[30rem] h-[8rem] px-4 sm:px-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">FULL MENU</h1>
              <Button
                onClick={() =>
										window.open(
											"https://order.toasttab.com/online/foreigner-60-east-3rd-avenue",
											"_blank",
											"noopener,noreferrer"
										)
									}
                className="hover:scale-110 hover:bg-[#EC4E20] hover:text-black hover:border-none mt-4 sm:mt-6 bg-transparent border border-white text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg rounded-[0.4rem]">
                ORDER NOW
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Customer Catering Section */}
      <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-[8rem] bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12 lg:gap-20">
          <div className="w-full h-[20rem] sm:h-[25rem] md:w-1/2">
            <Image
              src="/images/catering.webp"
              alt="Colorful healthy food bowl"
              width={600}
              height={600}
              className="rounded-lg object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-3 sm:space-y-4 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">FOREIGNER CAFE CATERING</h2>
            <p className="text-gray-600 text-sm sm:text-md leading-relaxed">
              At Foreigner Cafe, we've always believed that food is more than just a meal it's a way to connect. Now,
              we're bringing our signature warmth and flavor to you, and celebration-ready packages designed to elevate
              any occasion.
            </p>
            <a
              href="https://mhm-timber.s3.amazonaws.com/public/member/r9bJd/lurgtAi7r1j5/morningbreakfastmenuexamplecompressed.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#e65100] hover:underline font-semibold text-base sm:text-lg"
            >
              View Menu
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-4 w-4 sm:h-5 sm:w-5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
		  </section>
		  

      {/* Boxes & Lunch Packs Section - With Carousel Controls */}
      <section className="mt-0 py-8 sm:py-12 md:py-20 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">BOXES & LUNCH PACKS</h2>
          <p className="mt-2 sm:mt-4 text-gray-600 text-sm sm:text-lg">
            Our event spaces are crafted for connection inviting you to gather, celebrate, and feel at home.
          </p>
          <div className="relative mt-6 sm:mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {visibleLunchPacks.map((item) => (
                <Card key={item.id} className="flex flex-col items-center shadow-lg rounded-3xl bg-white transition-transform duration-500 ease-in-out hover:scale-105">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="rounded-t-xl rounded-b-xl object-cover w-full "
                  />
                  <CardHeader className="text-center p-3 sm:p-4 pb-1 sm:pb-2">
                    <CardTitle className="text-lg sm:text-xl font-semibold text-black">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-gray-600 text-xs sm:text-sm px-3 sm:px-4">
                    <p>{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-6 sm:mt-8 space-x-4">
              <Button
                size="icon"
                className="rounded-full border border-[#EC4E20] w-8 h-8 sm:w-10 sm:h-10 text-[#EC4E20] hover:bg-transparent hover:text-[#EC4E20] cursor-pointer disabled:opacity-50 disabled:border-gray-600 disabled:text-gray-600 bg-transparent"
                onClick={handlePrevLunchPack}
                disabled={currentLunchPackIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                size="icon"
                className="rounded-full border border-[#EC4E20] w-8 h-8 sm:w-10 sm:h-10 text-[#EC4E20] hover:bg-transparent hover:text-[#EC4E20] cursor-pointer disabled:opacity-50 disabled:border-gray-600 disabled:text-gray-600 bg-transparent"
                onClick={handleNextLunchPack}
                disabled={currentLunchPackIndex >= allLunchPacks.length - 3}
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
		  </section>
		  
      {/* All Cake Range Section - With Carousel Controls */}
      <section className="bg-white py-8 sm:py-12 md:py-16 lg:py-2">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">ALL CAKE RANGE</h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-md">
            Indulge in our exquisite selection of freshly baked cakes.
          </p>
          <div className="relative mt-6 sm:mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {visibleCakeRange.map((item) => (
                <Card key={item.id} className="flex flex-col items-center shadow-lg rounded-3xl bg-white transition-transform duration-500 ease-in-out hover:scale-105 rounded-b-3xl ">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="rounded-t-xl rounded-b-xl object-cover w-full "
                  />
                  <CardHeader className="text-center p-3 sm:p-4 pb-1 sm:pb-2">
                    <CardTitle className="text-lg sm:text-xl font-semibold text-black">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-gray-600 text-xs sm:text-sm px-3 sm:px-4">
                    <p>{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-6 sm:mt-8 space-x-4">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full border border-[#EC4E20] w-8 h-8 sm:w-10 sm:h-10 text-[#EC4E20] hover:bg-transparent hover:text-[#EC4E20] cursor-pointer disabled:opacity-50 disabled:border-gray-600 disabled:text-gray-600 bg-transparent"
                onClick={handlePrevCake}
                disabled={currentCakeIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                size="icon"
                className="rounded-full border border-[#EC4E20] w-8 h-8 sm:w-10 sm:h-10 text-[#EC4E20] hover:bg-transparent hover:text-[#EC4E20] cursor-pointer disabled:opacity-50 disabled:border-gray-600 disabled:text-gray-600 bg-transparent"
                onClick={handleNextCake}
                disabled={currentCakeIndex >= allCakeRange.length - 3}
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
		  </section>
		  

      {/* Catering, Your Way Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-16 ">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">CATERING, YOUR WAY</h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-md px-4 sm:px-[5rem] md:px-[8rem] lg:px-[10rem]">
            Our curated offerings bring the soul of Foreigner Cafe to your table. Choose the catering style and let us
            take care of the rest.
          </p>
          <div className="mt-6 sm:mt-10 mx-4 sm:m-[2rem] md:m-[3rem] lg:m-[4rem] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {cateringData.map((item) => (
              <Card
                key={item.id}
                className="relative h-64 sm:h-72 md:h-80 lg:h-88 rounded-lg overflow-hidden shadow-lg transition-transform duration-500 ease-in-out hover:scale-105 "
              >
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  width={400}
                  height={300}
                  className="absolute inset-0 object-cover w-full h-full "
                />
                <div className="absolute inset-0 bg-black/60 flex flex-col  justify-end text-white p-4 sm:p-5">
                  <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-[3rem] uppercase">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-gray-200">{item.description}</CardDescription>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
