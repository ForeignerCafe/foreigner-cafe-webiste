import Hero from "@/components/hero";
import InfoSection from "@/components/info-section";
import PromoSection from "@/components/promo-section";
import BrandSection from "@/components/brand-section";
import MenuSection from "@/components/menu-section";
import ExperiencesSection from "@/components/experiences-section";
import InteriorSection from "@/components/interior-section";
import StorySection from "@/components/story-section";
import EventsSection from "@/components/events-section";
import FAQsSection from "@/components/faqs-section";
import Footer from "@/components/footer";
import InstagramFeed from "@/components/instagram-feed";
import DineDrinkSection from "@/components/dine-drink-section"; // New component import
import EventsShowcaseSection from "@/components/events-showcase-section";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { products } from "@/lib/data";
import Events from "@/components/eventsSection";
import LatestBlogsSection from "@/components/latest-blogs-section";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <HeroParallax products={products} />
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
      <InfoSection />
    </main>
  );
}
