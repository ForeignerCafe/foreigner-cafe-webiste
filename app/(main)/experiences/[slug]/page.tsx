import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
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

export default async function ExperiencePage({ params }: { params: { slug: string } }) {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/experiences">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Experiences
            </Button>
          </Link>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">{experience.title}</h1>
            <p className="text-xl text-gray-600">{experience.description}</p>

            <div className="flex items-center gap-6 text-sm text-gray-500">
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
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {experience.imageSrc && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={experience.imageSrc || "/placeholder.svg"}
              alt={experience.alt || experience.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <article className="prose prose-lg max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: experience.content }}
            className="prose prose-lg prose-gray max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:text-gray-700 prose-ol:text-gray-700
              prose-li:text-gray-700 prose-li:leading-relaxed
              prose-blockquote:border-l-orange-500 prose-blockquote:bg-orange-50 prose-blockquote:p-4
              prose-img:rounded-lg prose-img:shadow-md
              prose-hr:border-gray-200"
          />
        </article>

        {/* Call to Action */}
        <div className="mt-12 p-8 bg-orange-50 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Experience This?</h3>
          <p className="text-gray-600 mb-6">Join us at Foreigner Cafe and create unforgettable memories.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              {experience.buttonText || "Book Now"}
            </Button>
            <Link href="/experiences">
              <Button variant="outline" size="lg">
                Explore More Experiences
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
