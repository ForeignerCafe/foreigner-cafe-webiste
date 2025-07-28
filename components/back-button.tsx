"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BackButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => window.history.back()}
      className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white/20 dark:bg-black/40 backdrop-blur-sm border border-white/30 dark:border-white/20 hover:bg-orange-500/20 hover:border-orange-400/50 transition-all duration-200 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
    >
      <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
    </Button>
  )
}
