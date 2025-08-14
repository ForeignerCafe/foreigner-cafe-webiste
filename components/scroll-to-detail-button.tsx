"use client"

import type React from "react"

import { Button } from "@/components/ui/button"

interface ScrollToDetailButtonProps {
  children: React.ReactNode
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
}

export function ScrollToDetailButton({ children, className, size = "lg" }: ScrollToDetailButtonProps) {
  const scrollToDetail = () => {
    const detailSection = document.getElementById("detail-section")
    if (detailSection) {
      detailSection.scrollIntoView({ behavior: "smooth" })
    }
  }
  return (
    <Button size={size} className={className} onClick={scrollToDetail}>
      {children}
    </Button>
  )
}
