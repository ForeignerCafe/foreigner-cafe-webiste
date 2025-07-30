"use client"

import { useEffect } from "react"

interface AnalyticsTrackerProps {
  blogSlug?: string
}

export default function AnalyticsTracker({ blogSlug }: AnalyticsTrackerProps) {
  useEffect(() => {
    // Generate or get session ID
    let sessionId = sessionStorage.getItem("visitor_session_id")
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36)
      sessionStorage.setItem("visitor_session_id", sessionId)
    }

    // Track visitor
    const trackVisitor = async () => {
      try {
        await fetch("/api/analytics/track-visitor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        })
      } catch (error) {
        console.error("Failed to track visitor:", error)
      }
    }

    // Track blog view if on blog page
    const trackBlogView = async () => {
      if (!blogSlug) return

      try {
        const response = await fetch("/api/analytics/track-blog-view", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ blogSlug, sessionId }),
        })

        const data = await response.json()

        // Update view count in the UI if element exists
        const viewCountElement = document.getElementById("blog-view-count")
        if (viewCountElement && data.totalViews) {
          viewCountElement.textContent = data.totalViews.toString()
        }
      } catch (error) {
        console.error("Failed to track blog view:", error)
      }
    }

    // Track visitor on page load
    trackVisitor()

    // Track blog view if on blog page
    if (blogSlug) {
      trackBlogView()
    }
  }, [blogSlug])

  return null
}
