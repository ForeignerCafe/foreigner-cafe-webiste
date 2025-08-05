"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { X, Eye, EyeOff, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Import actual components for live preview
import Hero from "@/components/hero"
import EventsSection from "@/components/events-section"
import BrandSection from "@/components/brand-section"
import ExperiencesSection from "@/components/experiences-section"
import DineDrinkSection from "@/components/dine-drink-section"
import FAQsSection from "@/components/faqs-section"
import EventsShowcaseSection from "@/components/eventsSection"
import Gallery from "@/components/gallery"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

interface LivePreviewProps {
  isEnabled: boolean
  sectionId: string
  previewData: any
  position?: { x: number; y: number }
}

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
    // Create a mock context provider for the preview components
    const PreviewWrapper = ({ children }: { children: React.ReactNode }) => (
      <div className="bg-white min-h-screen overflow-hidden">{children}</div>
    )

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
              <Hero />
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
              <EventsSection />
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
              <BrandSection />
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
              <ExperiencesSection />
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
              <DineDrinkSection />
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
              <FAQsSection />
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
            <p>Preview not available for this section</p>
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
