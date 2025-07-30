import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { EventsSection } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let eventsSection = await EventsSection.findOne()

    // Create default content if none exists
    if (!eventsSection) {
      eventsSection = await EventsSection.create({
        title: "WHAT'S ON",
        events: [
          {
            title: "Live Music Nights",
            description: "Join us every Friday for live acoustic performances by local artists.",
            image: "/placeholder.svg?height=400&width=600",
            linkText: "Learn More",
            linkHref: "/events",
          },
          {
            title: "Coffee Cupping Sessions",
            description: "Discover the art of coffee tasting with our expert baristas.",
            image: "/placeholder.svg?height=400&width=600",
            linkText: "Book Session",
            linkHref: "/experiences",
          },
        ],
      })
    }

    return NextResponse.json({ success: true, data: eventsSection })
  } catch (error) {
    console.error("Error fetching events section:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch events section" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { title, events } = body

    if (!title || !events || !Array.isArray(events)) {
      return NextResponse.json({ success: false, message: "Title and events array are required" }, { status: 400 })
    }

    let eventsSection = await EventsSection.findOne()

    if (eventsSection) {
      eventsSection.title = title
      eventsSection.events = events
      await eventsSection.save()
    } else {
      eventsSection = await EventsSection.create({
        title,
        events,
      })
    }

    return NextResponse.json({ success: true, data: eventsSection })
  } catch (error) {
    console.error("Error updating events section:", error)
    return NextResponse.json({ success: false, message: "Failed to update events section" }, { status: 500 })
  }
}
