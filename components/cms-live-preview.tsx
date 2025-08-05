"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { X, Eye, EyeOff, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Import existing components
import EventsShowcaseSection from "@/components/events-showcase-section"
import Gallery from "@/components/gallery"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

interface LivePreviewProps {
  isEnabled: boolean
  sectionId: string
  previewData: any
  position?: { x: number; y: number }
}

// Simple preview components for sections that don't have dedicated components yet
const HeroPreview = ({ data }: { data: any }) => (
  <div className="relative h-screen bg-black text-white flex items-center justify-center">
    <video
      className="absolute inset-0 w-full h-full object-cover opacity-50"
      src={data?.videoUrl || "/placeholder.svg?height=600&width=1200"}
      autoPlay
      muted
      loop
    />
    <div className="relative z-10 text-center max-w-4xl px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">{data?.title || "Hero Title"}</h1>
      <h2 className="text-xl md:text-2xl mb-6">{data?.subtitle || "Hero Subtitle"}</h2>
      <p className="text-lg mb-8">{data?.description || "Hero description goes here"}</p>
      <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors">
        Explore Menu
      </button>
    </div>
  </div>
)

const WhatsOnPreview = ({ data }: { data: any }) => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">{data?.title || "WHAT'S ON"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(
          data?.events || [
            {
              title: "Sample Event",
              description: "Sample description",
              image: "/placeholder.svg?height=300&width=400",
            },
          ]
        ).map((event: any, index: number) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={event.image || "/placeholder.svg?height=300&width=400"}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <a href={event.linkHref} className="text-orange-500 hover:text-orange-600 font-medium">
                {event.linkText || "Learn More"}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const BrandPreview = ({ data }: { data: any }) => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      {(
        data?.storyElements || [
          {
            title: "Our Story",
            text: "Sample story text",
            media: { src: "/placeholder.svg?height=400&width=600", type: "image" },
          },
        ]
      ).map((element: any, index: number) => (
        <div
          key={element.id || index}
          className={`flex flex-col ${element.layout === "left" ? "md:flex-row" : "md:flex-row-reverse"} items-center mb-16`}
        >
          <div className="md:w-1/2 mb-8 md:mb-0">
            {element.media.type === "video" ? (
              <video src={element.media.src} className="w-full h-auto rounded-lg" controls />
            ) : (
              <img
                src={element.media.src || "/placeholder.svg?height=400&width=600"}
                alt={element.media.alt}
                className="w-full h-auto rounded-lg"
              />
            )}
          </div>
          <div className="md:w-1/2 md:px-8">
            <h3 className="text-2xl font-bold mb-4">{element.title}</h3>
            <p className="text-gray-600 leading-relaxed">{element.text}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
)

const ExperiencesPreview = ({ data }: { data: any }) => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Experiences</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {(
          data?.experiences || [
            {
              title: "Sample Experience",
              description: "Sample description",
              imageSrc: "/placeholder.svg?height=300&width=400",
            },
          ]
        ).map((exp: any, index: number) => (
          <div key={exp.id || index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={exp.imageSrc || "/placeholder.svg?height=300&width=400"}
              alt={exp.alt}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
              <p className="text-gray-600 mb-4">{exp.description}</p>
              <a href={exp.linkHref} className="text-orange-500 hover:text-orange-600 font-medium">
                {exp.linkText || "Learn More"}
              </a>
            </div>
          </div>
        ))}
      </div>
      {data?.testimonials && data.testimonials.length > 0 && (
        <div className="bg-white rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-8">What Our Customers Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.testimonials.map((testimonial: any, index: number) => (
              <div key={index} className="text-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg?height=80&width=80"}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <p className="text-gray-600 italic mb-2">"{testimonial.quote}"</p>
                <p className="font-medium">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </section>
)

const DineDrinkPreview = ({ data }: { data: any }) => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Dine & Drink</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {(
          data?.venues || [
            {
              name: "Sample Venue",
              location: "Sample Location",
              description: "Sample description",
              image: "/placeholder.svg?height=300&width=400",
            },
          ]
        ).map((venue: any, index: number) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={venue.image || "/placeholder.svg?height=300&width=400"}
              alt={venue.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{venue.name}</h3>
              <p className="text-orange-500 font-medium mb-2">{venue.location}</p>
              <p className="text-gray-600">{venue.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const FAQsPreview = ({ data }: { data: any }) => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{data?.title || "Frequently Asked Questions"}</h2>
        <p className="text-gray-600">{data?.subtitle || "Find answers to common questions"}</p>
      </div>
      <div className="space-y-4">
        {(data?.faqs || [{ question: "Sample Question?", answer: "Sample answer goes here." }]).map(
          (faq: any, index: number) => (
            <div key={index} className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h3 className="text-lg font-medium">{faq.question}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  </section>
)

export function LivePreviewTooltip({ isEnabled, sectionId, previewData, position = { x: 0, y: 0 } }: LivePreviewProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isEnabled && sectionId && previewData) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isEnabled, sectionId, previewData])

  if (!isVisible) return null

  const renderPreviewComponent = () => {
    const PreviewWrapper = ({ children }: { children: React.ReactNode }) => (
      <div className="bg-white min-h-screen overflow-hidden">{children}</div>
    )

    try {
      switch (sectionId) {
        case "hero":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.25)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "400%",
                }}
              >
                <HeroPreview data={previewData} />
              </div>
            </PreviewWrapper>
          )
        case "whats-on":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.3)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "333%",
                }}
              >
                <WhatsOnPreview data={previewData} />
              </div>
            </PreviewWrapper>
          )
        case "brand":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.3)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "333%",
                }}
              >
                <BrandPreview data={previewData} />
              </div>
            </PreviewWrapper>
          )
        case "experiences":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.3)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "333%",
                }}
              >
                <ExperiencesPreview data={previewData} />
              </div>
            </PreviewWrapper>
          )
        case "dine-drink":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.3)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "333%",
                }}
              >
                <DineDrinkPreview data={previewData} />
              </div>
            </PreviewWrapper>
          )
        case "faqs":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.3)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "333%",
                }}
              >
                <FAQsPreview data={previewData} />
              </div>
            </PreviewWrapper>
          )
        case "events":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.3)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "333%",
                }}
              >
                <EventsShowcaseSection />
              </div>
            </PreviewWrapper>
          )
        case "gallery":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.3)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "333%",
                }}
              >
                <Gallery />
              </div>
            </PreviewWrapper>
          )
        case "header":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.4)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "250%",
                }}
              >
                <Navigation />
                <div className="h-32 bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-600">Header Navigation Preview</p>
                </div>
              </div>
            </PreviewWrapper>
          )
        case "footer":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.3)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "333%",
                }}
              >
                <div className="h-32 bg-gray-100 flex items-center justify-center mb-4">
                  <p className="text-gray-600">Website Content Above Footer</p>
                </div>
                <Footer />
              </div>
            </PreviewWrapper>
          )
        default:
          return (
            <div className="p-4 text-center text-gray-500">
              <p>Preview not available for section: {sectionId}</p>
            </div>
          )
      }
    } catch (error) {
      console.error("Preview error for section:", sectionId, error)
      return (
        <div className="p-4 text-center text-red-500">
          <p>Error loading preview for {sectionId}</p>
          <p className="text-sm mt-2">Check console for details</p>
        </div>
      )
    }
  }

  return createPortal(
    <div
      ref={tooltipRef}
      className={`fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${
        isExpanded ? "inset-4 max-w-none max-h-none" : "w-[500px] h-[400px]"
      }`}
      style={isExpanded ? { left: "1rem", top: "1rem", right: "1rem", bottom: "1rem" } : { left: "20px", top: "80px" }}
    >
      <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          Live Preview - {sectionId.replace("-", " ").toUpperCase()}
        </span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="h-6 w-6 p-0">
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className={`overflow-auto ${isExpanded ? "h-full" : "h-full"}`}>{renderPreviewComponent()}</div>
    </div>,
    document.body,
  )
}

export function LivePreviewToggle({
  isEnabled,
  onToggle,
}: {
  isEnabled: boolean
  onToggle: (enabled: boolean) => void
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onToggle(!isEnabled)}
      className={`fixed top-20 right-4 z-50 ${isEnabled ? "bg-green-50 border-green-200 text-green-700" : ""}`}
    >
      {isEnabled ? (
        <>
          <EyeOff className="h-4 w-4 mr-2" />
          Hide Preview
        </>
      ) : (
        <>
          <Eye className="h-4 w-4 mr-2" />
          Show Preview
        </>
      )}
    </Button>
  )
}
