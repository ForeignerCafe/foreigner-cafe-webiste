"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import axiosInstance from "@/lib/axios"
import { Skeleton } from "@/components/ui/skeleton"

interface CateringHeroSection {
  cakeMenu: {
    image: string
    title: string
    buttonText: string
    buttonLink: string
  }
  fullMenu: {
    image: string
    title: string
    buttonText: string
    buttonLink: string
  }
}

interface CateringIntroSection {
  image: string
  title: string
  description: string
  menuLink: string
}

interface CateringCarouselItem {
  id: number
  title: string
  description: string
  price: string
  image: string
}

interface CateringCarouselSection {
  title: string
  description: string
  items: CateringCarouselItem[]
}

interface CateringYourWayItem {
  id: number
  src: string
  alt: string
  title: string
  description: string
}

interface CateringYourWaySection {
  title: string
  description: string
  items: CateringYourWayItem[]
}

interface CateringPageData {
  hero: CateringHeroSection
  cateringIntro: CateringIntroSection
  lunchPacks: CateringCarouselSection
  cakeRange: CateringCarouselSection
  cateringYourWay: CateringYourWaySection
}

interface CateringPageProps {
  cateringData?: CateringPageData;
}

// Skeleton Components
const ImageSkeleton = ({ className = '' }: { className?: string }) => (
  <Skeleton className={`w-full h-full rounded-lg animate-pulse ${className}`} />
);

const TextSkeleton = ({ lines = 1, className = '' }: { lines?: number, className?: string }) => (
  <div className={className}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i} 
        className={`h-4 ${i === lines - 1 ? 'w-4/5' : 'w-full'} mb-2 animate-pulse`} 
      />
    ))}
  </div>
);

const CardSkeleton = () => (
  <Card className="flex flex-col items-center shadow-lg rounded-3xl bg-white">
    <Skeleton className="rounded-t-xl rounded-b-xl w-full h-[200px] animate-pulse" />
    <CardHeader className="text-center p-3 sm:p-4 pb-1 sm:pb-2">
      <Skeleton className="h-6 w-3/4 mx-auto animate-pulse" />
    </CardHeader>
    <CardContent className="text-center px-3 sm:px-4">
      <TextSkeleton lines={2} />
    </CardContent>
  </Card>
);

const HeroSkeleton = () => (
  <div className="flex flex-col md:flex-row h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full sm:mt-0">
    <ImageSkeleton className="w-full md:w-1/2 h-1/2 md:h-full" />
    <ImageSkeleton className="w-full md:w-1/2 h-1/2 md:h-full" />
  </div>
);

const CateringCardSkeleton = () => (
  <Card className="relative h-64 sm:h-72 md:h-80 lg:h-88 rounded-lg overflow-hidden shadow-lg">
    <ImageSkeleton className="absolute inset-0 w-full h-full" />
    <div className="absolute inset-0 bg-black/60 flex flex-col justify-end text-white p-4 sm:p-5">
      <Skeleton className="h-8 w-3/4 mb-4 animate-pulse" />
      <TextSkeleton lines={2} className="text-gray-200" />
    </div>
  </Card>
);

export default function CateringPage({ cateringData: propCateringData }: CateringPageProps) {
  const [cateringData, setCateringData] = useState<CateringPageData | null>(propCateringData || null)
  const [loading, setLoading] = useState(!propCateringData)
  const [currentLunchPackIndex, setCurrentLunchPackIndex] = useState(0)
  const [currentCakeIndex, setCurrentCakeIndex] = useState(0)

  const lunchPackPrevRef = useRef<HTMLButtonElement>(null)
  const lunchPackNextRef = useRef<HTMLButtonElement>(null)
  const cakePrevRef = useRef<HTMLButtonElement>(null)
  const cakeNextRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!propCateringData) {
      const fetchCateringContent = async () => {
        try {
          const response = await axiosInstance.get("/api/cms/catering-page")
          if (response.data.success) {
            setCateringData(response.data.data)
          } else {
            console.error("Failed to fetch catering page content:", response.data.message)
          }
        } catch (error) {
          console.error("Error fetching catering page content:", error)
        } finally {
          setLoading(false)
        }
      }
      fetchCateringContent()
    }
  }, [propCateringData])

  useEffect(() => {
    if (propCateringData) {
      setCateringData(propCateringData);
      setLoading(false);
    }
  }, [propCateringData]);

  const handlePrevLunchPack = () => {
    setCurrentLunchPackIndex((prevIndex) => Math.max(0, prevIndex - 1))
    setTimeout(() => {
      lunchPackPrevRef.current?.focus()
      lunchPackPrevRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      })
    }, 100)
  }

  const handleNextLunchPack = () => {
    if (!cateringData) return
    setCurrentLunchPackIndex((prevIndex) => Math.min(cateringData.lunchPacks.items.length - 3, prevIndex + 1))
    setTimeout(() => {
      lunchPackNextRef.current?.focus()
      lunchPackNextRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      })
    }, 100)
  }

  const handlePrevCake = () => {
    setCurrentCakeIndex((prevIndex) => Math.max(0, prevIndex - 1))
    setTimeout(() => {
      cakePrevRef.current?.focus()
      cakePrevRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      })
    }, 100)
  }

  const handleNextCake = () => {
    if (!cateringData) return
    setCurrentCakeIndex((prevIndex) => Math.min(cateringData.cakeRange.items.length - 3, prevIndex + 1))
    setTimeout(() => {
      cakeNextRef.current?.focus()
      cakeNextRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      })
    }, 100)
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <HeroSkeleton />
        
        <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-[8rem] bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12 lg:gap-20">
            <ImageSkeleton className="w-full h-[20rem] sm:h-[25rem] md:w-1/2" />
            <div className="w-full md:w-1/2 space-y-3 sm:space-y-4 text-center md:text-left">
              <TextSkeleton lines={1} className="h-8 w-3/4 mx-auto md:mx-0" />
              <TextSkeleton lines={3} />
              <Skeleton className="h-10 w-32 mx-auto md:mx-0 animate-pulse" />
            </div>
          </div>
        </section>

        <section className="mt-0 py-8 sm:py-12 md:py-20 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
            <TextSkeleton lines={1} className="h-8 w-1/2 mx-auto mb-4" />
            <TextSkeleton lines={1} className="h-4 w-3/4 mx-auto mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
            <div className="flex justify-center mt-6 sm:mt-8 space-x-4">
              <Skeleton className="rounded-full w-10 h-10 animate-pulse" />
              <Skeleton className="rounded-full w-10 h-10 animate-pulse" />
            </div>
          </div>
        </section>

        <section className="bg-white py-8 sm:py-12 md:py-16 lg:py-2">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
            <TextSkeleton lines={1} className="h-8 w-1/2 mx-auto mb-4" />
            <TextSkeleton lines={1} className="h-4 w-3/4 mx-auto mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
            <div className="flex justify-center mt-6 sm:mt-8 space-x-4">
              <Skeleton className="rounded-full w-10 h-10 animate-pulse" />
              <Skeleton className="rounded-full w-10 h-10 animate-pulse" />
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-12 md:py-16 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
            <TextSkeleton lines={1} className="h-8 w-1/2 mx-auto mb-4" />
            <TextSkeleton lines={1} className="h-4 w-3/4 mx-auto mb-8" />
            <div className="mt-6 sm:mt-10 mx-4 sm:m-[2rem] md:m-[3rem] lg:m-[4rem] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <CateringCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (!cateringData) {
    return <div className="flex items-center justify-center min-h-screen">Failed to load catering content.</div>
  }

  const visibleLunchPacks = cateringData.lunchPacks.items.slice(currentLunchPackIndex, currentLunchPackIndex + 3)
  const visibleCakeRange = cateringData.cakeRange.items.slice(currentCakeIndex, currentCakeIndex + 3)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full sm:mt-0">
        {/* Left Hero Half - Cake Menu */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
          <Image
            src={cateringData.hero.cakeMenu.image || "/placeholder.svg?height=700&width=960&query=cake menu"}
            alt="Display case with various cakes and pastries"
            width={960}
            height={700}
            className="absolute inset-0 object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center pt-20 md:pt-10 md:justify-center text-white p-4">
            <div className="bg-black/50 text-center w-full sm:w-[30rem] h-[8rem] px-4 sm:px-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                {cateringData.hero.cakeMenu.title}
              </h1>
              <Button
                onClick={() => window.open(cateringData.hero.cakeMenu.buttonLink, "_blank")}
                className="hover:scale-110 hover:bg-[#EC4E20] hover:text-black hover:border-none mt-4 sm:mt-6 bg-transparent border border-white text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg rounded-[0.4rem]"
              >
                {cateringData.hero.cakeMenu.buttonText}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right Hero Half - Full Menu */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
          <Image
            src={cateringData.hero.fullMenu.image || "/placeholder.svg?height=700&width=960&query=full menu"}
            alt="Person serving food from a buffet line"
            width={960}
            height={700}
            className="absolute inset-0 object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center pt-20 md:pt-10 md:justify-center text-white p-4">
            <div className="bg-black/50 text-center w-full sm:w-[30rem] h-[8rem] px-4 sm:px-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                {cateringData.hero.fullMenu.title}
              </h1>
              <Button
                onClick={() => window.open(cateringData.hero.fullMenu.buttonLink, "_blank")}
                className="hover:scale-110 hover:bg-[#EC4E20] hover:text-black hover:border-none mt-4 sm:mt-6 bg-transparent border border-white text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg rounded-[0.4rem]"
              >
                {cateringData.hero.fullMenu.buttonText}
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
              src={cateringData.cateringIntro.image || "/placeholder.svg?height=600&width=600&query=colorful healthy food bowl"}
              alt="Colorful healthy food bowl"
              width={600}
              height={600}
              className="rounded-lg object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-3 sm:space-y-4 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">{cateringData.cateringIntro.title}</h2>
            <p className="text-gray-600 text-sm sm:text-md leading-relaxed">
              {cateringData.cateringIntro.description}
            </p>
            <a
              href={cateringData.cateringIntro.menuLink}
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

      {/* Boxes & Lunch Packs Section */}
      <section className="mt-0 py-8 sm:py-12 md:py-20 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">{cateringData.lunchPacks.title}</h2>
          <p className="mt-2 sm:mt-4 text-gray-600 text-sm sm:text-lg">
            {cateringData.lunchPacks.description}
          </p>
          <div className="relative mt-6 sm:mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {visibleLunchPacks.map((item) => (
                <Card
                  key={item.id}
                  className="flex flex-col items-center shadow-lg rounded-3xl bg-white transition-transform duration-500 ease-in-out hover:scale-105"
                >
                  <Image
                    src={item.image || "/placeholder.svg?height=200&width=300&query=lunch pack item"}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="rounded-t-xl rounded-b-xl object-cover w-full"
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
                ref={lunchPackPrevRef}
                size="icon"
                className="rounded-full border border-[#EC4E20] w-8 h-8 sm:w-10 sm:h-10 text-[#EC4E20] hover:bg-transparent hover:text-[#EC4E20] cursor-pointer disabled:opacity-50 disabled:border-gray-600 disabled:text-gray-600 bg-transparent"
                onClick={handlePrevLunchPack}
                disabled={currentLunchPackIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                ref={lunchPackNextRef}
                size="icon"
                className="rounded-full border border-[#EC4E20] w-8 h-8 sm:w-10 sm:h-10 text-[#EC4E20] hover:bg-transparent hover:text-[#EC4E20] cursor-pointer disabled:opacity-50 disabled:border-gray-600 disabled:text-gray-600 bg-transparent"
                onClick={handleNextLunchPack}
                disabled={currentLunchPackIndex >= cateringData.lunchPacks.items.length - 3}
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* All Cake Range Section */}
      <section className="bg-white py-8 sm:py-12 md:py-16 lg:py-2">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">{cateringData.cakeRange.title}</h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-md">
            {cateringData.cakeRange.description}
          </p>
          <div className="relative mt-6 sm:mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {visibleCakeRange.map((item) => (
                <Card
                  key={item.id}
                  className="flex flex-col items-center shadow-lg rounded-3xl bg-white transition-transform duration-500 ease-in-out hover:scale-105 rounded-b-3xl"
                >
                  <Image
                    src={item.image || "/placeholder.svg?height=200&width=300&query=cake item"}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="rounded-t-xl rounded-b-xl object-cover w-full"
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
                ref={cakePrevRef}
                variant="secondary"
                size="icon"
                className="rounded-full border border-[#EC4E20] w-8 h-8 sm:w-10 sm:h-10 text-[#EC4E20] hover:bg-transparent hover:text-[#EC4E20] cursor-pointer disabled:opacity-50 disabled:border-gray-600 disabled:text-gray-600 bg-transparent"
                onClick={handlePrevCake}
                disabled={currentCakeIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                ref={cakeNextRef}
                size="icon"
                className="rounded-full border border-[#EC4E20] w-8 h-8 sm:w-10 sm:h-10 text-[#EC4E20] hover:bg-transparent hover:text-[#EC4E20] cursor-pointer disabled:opacity-50 disabled:border-gray-600 disabled:text-gray-600 bg-transparent"
                onClick={handleNextCake}
                disabled={currentCakeIndex >= cateringData.cakeRange.items.length - 3}
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Catering, Your Way Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">{cateringData.cateringYourWay.title}</h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-md px-4 sm:px-[5rem] md:px-[8rem] lg:px-[10rem]">
            {cateringData.cateringYourWay.description}
          </p>
          <div className="mt-6 sm:mt-10 mx-4 sm:m-[2rem] md:m-[3rem] lg:m-[4rem] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {cateringData.cateringYourWay.items.map((item) => (
              <Card
                key={item.id}
                className="relative h-64 sm:h-72 md:h-80 lg:h-88 rounded-lg overflow-hidden shadow-lg transition-transform duration-500 ease-in-out hover:scale-105"
              >
                <Image
                  src={item.src || "/placeholder.svg?height=300&width=400&query=catering option"}
                  alt={item.alt}
                  width={400}
                  height={300}
                  className="absolute inset-0 object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/60 flex flex-col justify-end text-white p-4 sm:p-5">
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
