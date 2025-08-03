import type { Metadata } from "next"
import Image from "next/image"

interface GalleryImage {
  url: string
  alt: string
  caption: string
}

interface GallerySection {
  title: string
  description: string
  images: GalleryImage[]
}

interface GalleryContent {
  title: string
  subtitle: string
  sections: GallerySection[]
}

async function getGalleryContent(): Promise<GalleryContent | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`
      : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    const url = `${baseUrl}/cms/gallery`

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()
    return data.content
  } catch (error) {
    console.error("Error fetching gallery content:", error)
    return null
  }
}

export const metadata: Metadata = {
  title: "Gallery | Foreigner Cafe - Photos & Moments",
  description: "Explore our gallery showcasing the ambiance, delicious food, and memorable moments at Foreigner Cafe.",
  keywords: "Foreigner Cafe gallery, cafe photos, food photography, ambiance, interior",
  openGraph: {
    title: "Gallery | Foreigner Cafe",
    description:
      "Explore our gallery showcasing the ambiance, delicious food, and memorable moments at Foreigner Cafe.",
    type: "website",
    url: "/gallery",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200",
        width: 1200,
        height: 630,
        alt: "Foreigner Cafe Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Foreigner Cafe",
    description:
      "Explore our gallery showcasing the ambiance, delicious food, and memorable moments at Foreigner Cafe.",
    images: ["/placeholder.svg?height=630&width=1200"],
  },
}

export default async function GalleryPage() {
  const galleryContent = await getGalleryContent()

  if (!galleryContent) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h1>
            <p className="text-gray-600">Gallery content is currently unavailable.</p>
          </div>
        </div>
      </main>
    )
  }

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">{galleryContent.title}</h1>
          <p className="text-xl max-w-2xl mx-auto drop-shadow-md">{galleryContent.subtitle}</p>
        </div>
      </section>

      {/* Gallery Sections */}
      <div className="container mx-auto px-4 py-16">
        {galleryContent.sections.map((section, sectionIndex) => (
          <section key={sectionIndex} className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{section.title}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{section.description}</p>
            </div>

            {/* Bento Grid Layout */}
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {section.images.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  className="break-inside-avoid group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      style={{
                        aspectRatio: "auto",
                      }}
                    />
                    {/* Overlay with caption */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm font-medium">{image.caption}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
