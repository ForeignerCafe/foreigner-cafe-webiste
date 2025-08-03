import type { Metadata } from "next"
import FAQsSection from "@/components/faqs-section"

export const metadata: Metadata = {
  title: "FAQs | Foreigner Cafe - Frequently Asked Questions",
  description:
    "Find answers to common questions about Foreigner Cafe including hours, menu options, reservations, catering, and more.",
  keywords: "Foreigner Cafe FAQ, cafe hours, reservations, menu questions, catering info",
  openGraph: {
    title: "FAQs | Foreigner Cafe",
    description:
      "Find answers to common questions about Foreigner Cafe including hours, menu options, reservations, catering, and more.",
    type: "website",
    url: "/faqs",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200",
        width: 1200,
        height: 630,
        alt: "Foreigner Cafe FAQs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQs | Foreigner Cafe",
    description:
      "Find answers to common questions about Foreigner Cafe including hours, menu options, reservations, catering, and more.",
    images: ["/placeholder.svg?height=630&width=1200"],
  },
}

export default function FAQsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=400&width=1200')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Text content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Frequently Asked Questions</h1>
          <p className="text-xl max-w-2xl mx-auto drop-shadow-md">Everything you need to know about Foreigner Cafe</p>
        </div>
      </section>

      {/* FAQs Section */}
      <FAQsSection />
    </main>
  )
}
