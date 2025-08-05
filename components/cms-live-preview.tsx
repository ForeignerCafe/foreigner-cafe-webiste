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

interface LivePreviewProps {
  isEnabled: boolean
  sectionId: string
  previewData: any
  position?: { x: number; y: number }
}

export function LivePreviewTooltip({ isEnabled, sectionId, previewData, position = { x: 0, y: 0 } }: LivePreviewProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState(position)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isEnabled && sectionId && previewData) {
      setIsVisible(true)

      // Find the section element and position tooltip near it
      const sectionElement = document.getElementById(sectionId)
      if (sectionElement) {
        const rect = sectionElement.getBoundingClientRect()
        setTooltipPosition({
          x: rect.right + 20,
          y: rect.top + window.scrollY,
        })
      }
    } else {
      setIsVisible(false)
    }
  }, [isEnabled, sectionId, previewData])

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible && sectionId) {
        const sectionElement = document.getElementById(sectionId)
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect()
          setTooltipPosition({
            x: rect.right + 20,
            y: rect.top + window.scrollY,
          })
        }
      }
    }

    if (isVisible && !isExpanded) {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [isVisible, sectionId, isExpanded])

  if (!isVisible) return null

  // Don't show preview for sections that don't have proper components
  const unavailableSections = ["hero-parallax", "events", "gallery", "header", "footer"]
  if (unavailableSections.includes(sectionId)) {
    return createPortal(
      <div
        className="fixed z-[9999] bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg p-4 max-w-sm"
        style={{
          left: `${tooltipPosition.x}px`,
          top: `${tooltipPosition.y}px`,
          transform: tooltipPosition.x > window.innerWidth - 350 ? "translateX(-100%)" : "none",
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-yellow-800">Preview Unavailable</span>
          <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-yellow-700">
          Live preview is not available for this section type. Please check the actual website to see changes.
        </p>
      </div>,
      document.body,
    )
  }

  const renderPreviewComponent = () => {
    // Create a mock context provider for the preview components
    const PreviewWrapper = ({ children }: { children: React.ReactNode }) => (
      <div className="bg-white min-h-screen">{children}</div>
    )

    switch (sectionId) {
      case "hero":
        return (
          <PreviewWrapper>
            <div style={{ transform: "scale(0.3)", transformOrigin: "top left", width: "333%" }}>
              <Hero />
            </div>
          </PreviewWrapper>
        )
      case "whats-on":
        return (
          <PreviewWrapper>
            <div style={{ transform: "scale(0.4)", transformOrigin: "top left", width: "250%" }}>
              <EventsSection />
            </div>
          </PreviewWrapper>
        )
      case "brand":
        return (
          <PreviewWrapper>
            <div style={{ transform: "scale(0.4)", transformOrigin: "top left", width: "250%" }}>
              <BrandSection />
            </div>
          </PreviewWrapper>
        )
      case "experiences":
        return (
          <PreviewWrapper>
            <div style={{ transform: "scale(0.4)", transformOrigin: "top left", width: "250%" }}>
              <ExperiencesSection />
            </div>
          </PreviewWrapper>
        )
      case "dine-drink":
        return (
          <PreviewWrapper>
            <div style={{ transform: "scale(0.4)", transformOrigin: "top left", width: "250%" }}>
              <DineDrinkSection />
            </div>
          </PreviewWrapper>
        )
      case "faqs":
        return (
          <PreviewWrapper>
            <div style={{ transform: "scale(0.4)", transformOrigin: "top left", width: "250%" }}>
              <FAQsSection />
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
        isExpanded ? "inset-4 max-w-none max-h-none" : "max-w-sm w-80 max-h-96"
      }`}
      style={
        isExpanded
          ? { left: "1rem", top: "1rem", right: "1rem", bottom: "1rem" }
          : {
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transform: tooltipPosition.x > window.innerWidth - 350 ? "translateX(-100%)" : "none",
            }
      }
    >
      <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">Live Preview - {sectionId}</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="h-6 w-6 p-0">
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className={`overflow-auto ${isExpanded ? "h-full" : "max-h-80"}`}>{renderPreviewComponent()}</div>
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
