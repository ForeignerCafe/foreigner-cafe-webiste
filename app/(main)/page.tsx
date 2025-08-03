import Hero from "@/components/hero"
import BrandSection from "@/components/brand-section"
import ExperiencesSection from "@/components/experiences-section"
import InteriorSection from "@/components/interior-section"
import FAQsSection from "@/components/faqs-section"
import InstagramFeed from "@/components/instagram-feed"
import DineDrinkSection from "@/components/dine-drink-section"
import { HeroParallax } from "@/components/ui/hero-parallax"
import Events from "@/components/eventsSection"
import LatestBlogsSection from "@/components/latest-blogs-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <HeroParallax />
      <Events />
      {/* <EventsShowcaseSection /> */}
      <LatestBlogsSection />
      <DineDrinkSection />
      <BrandSection />
      {/* <MenuSection /> */}
      <ExperiencesSection />
      <InstagramFeed />
      <InteriorSection />
      {/* <StorySection /> */}
      {/* <EventsSection /> */}
      {/* <PromoSection /> */}
      <FAQsSection />
      {/* <InfoSection /> */}
    </main>
  )
}
