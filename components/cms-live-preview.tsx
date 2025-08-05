"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { X, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LivePreviewProps {
  isEnabled: boolean
  sectionId: string
  previewContent: React.ReactNode
  position?: { x: number; y: number }
}

export function LivePreviewTooltip({
  isEnabled,
  sectionId,
  previewContent,
  position = { x: 0, y: 0 },
}: LivePreviewProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState(position)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isEnabled && sectionId) {
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
  }, [isEnabled, sectionId])

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

    if (isVisible) {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [isVisible, sectionId])

  if (!isVisible) return null

  return createPortal(
    <div
      ref={tooltipRef}
      className="fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-2xl max-w-sm w-80 max-h-96 overflow-hidden"
      style={{
        left: `${tooltipPosition.x}px`,
        top: `${tooltipPosition.y}px`,
        transform: tooltipPosition.x > window.innerWidth - 350 ? "translateX(-100%)" : "none",
      }}
    >
      <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">Live Preview</span>
        <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="h-6 w-6 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4 overflow-auto max-h-80">
        <div className="transform scale-75 origin-top-left w-[133%]">{previewContent}</div>
      </div>
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
