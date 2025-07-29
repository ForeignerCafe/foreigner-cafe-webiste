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
import KidsEventsSection from "@/components/latest-blogs-section";
import EventsShowcaseSection from "@/components/events-showcase-section";
import AboutUs from "@/components/about-us";
import MenuHighlight from "@/components/menuHighlights";
import OurCafeStory from "@/components/ourCafeStory";
import WhatsOn from "@/components/whatsOn";
import WordsFromCommunity from "@/components/WordsFromCommunity";
import WhyUs from "@/components/whyUs";

export default function HomePage() {
  return (
    <main className="min-h-screen  bg-white">
      <Hero />
      <EventsShowcaseSection />
      <AboutUs />
      <MenuHighlight />
      <OurCafeStory />
      <WhatsOn />
      <InstagramFeed />
      <WhyUs />
      <WordsFromCommunity />
    </main>
  );
}
