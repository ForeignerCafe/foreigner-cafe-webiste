

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollToDetailButton } from "@/components/scroll-to-detail-button"
import ExperienceContent from "@/components/HtmlContent"

interface Experience {
  id: string
  title: string
  slug: string
  description: string
  content: string
  imageSrc: string
  alt: string
  buttonText: string
  isPublished: boolean
  createdAt?: string
  updatedAt?: string
}

async function getExperience(slug: string): Promise<Experience | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"
    const response = await fetch(`${baseUrl}/api/experiences/${slug}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.success ? data.data : null
  } catch (error) {
    console.error("Error fetching experience:", error)
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const experience = await getExperience(params.slug)

  if (!experience) {
    return {
      title: "Experience Not Found | Foreigner Cafe",
    }
  }

  return {
    title: `${experience.title} | Foreigner Cafe`,
    description: experience.description,
    openGraph: {
      title: experience.title,
      description: experience.description,
      images: experience.imageSrc ? [experience.imageSrc] : [],
    },
  }
}

export default async function ExperiencePage({
  params,
}: {
  params: { slug: string }
}) {
  const experience = await getExperience(params.slug)

  if (!experience) {
    notFound()
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const titleWords = experience.title.split(" ")
  const midPoint = Math.ceil(titleWords.length / 2)
  const firstLine = titleWords.slice(0, midPoint).join(" ")
  const secondLine = titleWords.slice(midPoint).join(" ")

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {experience.imageSrc ? (
        <section className="relative h-[550px] md:h-[600px] w-full flex items-center justify-center mb-12">
          {/* Background image */}
          <Image
            src={experience.imageSrc || "/placeholder.svg"}
            alt={experience.alt || experience.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 z-0" />

          {/* Back Button */}
          <div className="absolute top-6 left-4 z-20">
            <Link href="/experiences">
              <Button variant="ghost" className="text-white hover:bg-white/20 border border-white/30">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Experiences
              </Button>
            </Link>
          </div>

          {/* Title + Scroll Button */}
          <div className="relative z-10 text-center text-white px-4 mt-7">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight max-w-4xl">
              <span className="block">{firstLine}</span>
              {secondLine && <span className="block">{secondLine}</span>}
            </h1>
            <ScrollToDetailButton className="bg-orange-600 hover:bg-orange-700 shadow-lg px-8 py-3 text-lg font-medium">
              See Detail
            </ScrollToDetailButton>
          </div>
        </section>
      ) : (
        // Fallback hero section without image
        <section className="relative h-[400px] w-full flex items-center justify-center mb-12 bg-gradient-to-r from-orange-500 to-orange-600">
          {/* Back Button */}
          <div className="absolute top-6 left-4 z-20">
            <Link href="/experiences">
              <Button variant="ghost" className="text-white hover:bg-white/20 border border-white/30">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Experiences
              </Button>
            </Link>
          </div>

          {/* Title + Scroll Button */}
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight max-w-4xl">
              <span className="block">{firstLine}</span>
              {secondLine && <span className="block">{secondLine}</span>}
            </h1>
            <ScrollToDetailButton className="bg-white text-orange-600 hover:bg-gray-100 shadow-lg px-8 py-3 text-lg font-medium">
              See Detail
            </ScrollToDetailButton>
          </div>
        </section>
      )}

      {/* Details Section */}
      <div id="detail-section" className="max-w-6xl mx-auto px-4 mb-8 scroll-mt-24">
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
          {experience.createdAt && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Created {formatDate(experience.createdAt)}</span>
            </div>
          )}
          {experience.updatedAt && experience.updatedAt !== experience.createdAt && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Updated {formatDate(experience.updatedAt)}</span>
            </div>
          )}
        </div>

        {/* Content */}
       <ExperienceContent content={experience.content} />


        {/* Call to Action */}
        <div className="mt-10 p-8 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Experience This?</h3>
            <p className="text-gray-600 mb-8 text-lg">Join us at Foreigner Cafe and create unforgettable memories.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 px-8 py-3 text-lg font-medium">
                {experience.buttonText || "Book Now"}
              </Button>
              <Link href="/experiences">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-orange-300 text-orange-700 hover:bg-orange-50 px-8 py-3 text-lg font-medium bg-transparent"
                >
                  Explore More Experiences
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
