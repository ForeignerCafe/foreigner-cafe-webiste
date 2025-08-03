import type { Metadata } from "next"
import ExperiencesSection from "@/components/experiences-section"

export const metadata: Metadata = {
  title: "Experiences | Foreigner Cafe - Coffee Workshops & Events",
  description:
    "Join our unique coffee experiences including brewing workshops, tasting sessions, and special events at Foreigner Cafe.",
  keywords: "coffee workshop, coffee tasting, cafe experiences, coffee classes, barista training",
  openGraph: {
    title: "Experiences | Foreigner Cafe",
    description:
      "Join our unique coffee experiences including brewing workshops, tasting sessions, and special events at Foreigner Cafe.",
    type: "website",
    url: "/experiences",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200",
        width: 1200,
        height: 630,
        alt: "Foreigner Cafe Experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experiences | Foreigner Cafe",
    description:
      "Join our unique coffee experiences including brewing workshops, tasting sessions, and special events at Foreigner Cafe.",
    images: ["/placeholder.svg?height=630&width=1200"],
  },
}

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat h-[500px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=500&width=1200')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Text content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Coffee Experiences</h1>
          <p className="text-xl max-w-2xl mx-auto drop-shadow-md">
            Discover the art of coffee through our hands-on workshops and unique experiences
          </p>
        </div>
      </section>

      {/* Experiences Section */}
      <ExperiencesSection />
    </main>
  )
}
