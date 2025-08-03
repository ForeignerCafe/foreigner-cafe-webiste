"use client"

import { useEffect, useState } from "react"
import Hero from "@/components/hero"
import { HeroParallax } from "@/components/ui/hero-parallax"
import EventsShowcaseSection from "@/components/events-showcase-section"
import EventsSection from "@/components/eventsSection"
import BrandSection from "@/components/brand-section"
import ExperiencesSection from "@/components/experiences-section"
import DineDrinkSection from "@/components/dine-drink-section"
import LatestBlogsSection from "@/components/latest-blogs-section"
import InstagramFeed from "@/components/instagram-feed"
import AnalyticsTracker from "@/components/analytics-tracker"
import axiosInstance from "@/lib/axios"

interface HeroParallaxProduct {
  id: number
  title: string
  link: string
  thumbnail: string
}

export default function HomePage() {
  const [heroParallaxProducts, setHeroParallaxProducts] = useState<HeroParallaxProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHeroParallaxProducts()
  }, [])

  const fetchHeroParallaxProducts = async () => {
    try {
      const response = await axiosInstance.get("/api/cms/hero-parallax")
      if (response.data.success) {
        setHeroParallaxProducts(response.data.data.products)
      }
    } catch (error) {
      console.error("Failed to fetch hero parallax products:", error)
      // Fallback to default products if API fails
      setHeroParallaxProducts([
        {
          id: 1,
          title: "Coffee Experience",
          link: "/experiences",
          thumbnail: "/placeholder.svg?height=400&width=400",
        },
        {
          id: 2,
          title: "Events",
          link: "/events",
          thumbnail: "/placeholder.svg?height=400&width=400",
        },
        // Add more fallback products as needed
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <AnalyticsTracker />
      <Hero />
      {!loading && heroParallaxProducts.length > 0 && <HeroParallax products={heroParallaxProducts} />}
      <EventsShowcaseSection />
      <EventsSection />
      <BrandSection />
      <ExperiencesSection />
      <DineDrinkSection />
      <LatestBlogsSection />
      <InstagramFeed />
    </main>
  )
}
