"use client"

import type React from "react"
import { Eye, EyeOff, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
}

export function LivePreviewPanel({ isEnabled, sectionId, previewData }: LivePreviewProps) {
  if (!isEnabled || !sectionId) return null

  // Don't show preview for sections that don't have proper components
  const unavailableSections = ["hero-parallax", "events", "gallery", "header", "footer"]

  if (unavailableSections.includes(sectionId)) {
    return (
      <Card className="mt-6 border-yellow-200 bg-yellow-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-yellow-800 flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Preview Unavailable
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-yellow-700">
            Live preview is not available for this section type. Please check the actual website to see changes.
          </p>
        </CardContent>
      </Card>
    )
  }

  const renderPreviewComponent = () => {
    const PreviewWrapper = ({ children }: { children: React.ReactNode }) => (
      <div className="bg-white min-h-[400px] rounded-lg border overflow-hidden">
        <div className="transform scale-50 origin-top-left w-[200%]">{children}</div>
      </div>
    )

    switch (sectionId) {
      case "hero":
        return (
          <PreviewWrapper>
            <div className="h-[600px]">
              <Hero />
            </div>
          </PreviewWrapper>
        )
      case "whats-on":
        return (
          <PreviewWrapper>
            <EventsSection />
          </PreviewWrapper>
        )
      case "brand":
        return (
          <PreviewWrapper>
            <BrandSection />
          </PreviewWrapper>
        )
      case "experiences":
        return (
          <PreviewWrapper>
            <ExperiencesSection />
          </PreviewWrapper>
        )
      case "dine-drink":
        return (
          <PreviewWrapper>
            <DineDrinkSection />
          </PreviewWrapper>
        )
      case "faqs":
        return (
          <PreviewWrapper>
            <FAQsSection />
          </PreviewWrapper>
        )
      default:
        return (
          <Card className="border-gray-200">
            <CardContent className="p-8 text-center text-gray-500">
              <Monitor className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Preview not available for this section</p>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <Card className="mt-6 border-blue-200 bg-blue-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
          <Monitor className="h-4 w-4" />
          Live Preview - {sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace("-", " ")}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="bg-white rounded-lg border p-4 overflow-hidden">{renderPreviewComponent()}</div>
      </CardContent>
    </Card>
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
    <div className="fixed top-20 right-4 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onToggle(!isEnabled)}
        className={`shadow-lg ${isEnabled ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100" : "bg-white hover:bg-gray-50"}`}
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
    </div>
  )
}
