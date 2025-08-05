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
        title: "Where Stories Come to Life",
        description:
          "Join us for unforgettable experiences at our cafe. From intimate coffee tastings and live acoustic sessions to art exhibitions and book clubs, we create moments that bring our community together over exceptional coffee and shared passions.",
        buttonText: "Explore All Events",
        buttonLink: "/events",
        eventImages: [
          {
            src: "/images/couple.webp",
            alt: "Wedding",
          },
          {
            src: "/images/celebration.webp",
            alt: "Celebration",
          },
          {
            src: "/images/corporate.webp",
            alt: "Corporate",
          },
          {
            src: "/images/private.webp",
            alt: "Private Meeting",
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
    const { title, description, buttonText, buttonLink, eventImages } = body

    if (!title || !description || !buttonText || !buttonLink || !eventImages || !Array.isArray(eventImages)) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
    }

    let eventsSection = await EventsSection.findOne()

    if (eventsSection) {
      eventsSection.title = title
      eventsSection.description = description
      eventsSection.buttonText = buttonText
      eventsSection.buttonLink = buttonLink
      eventsSection.eventImages = eventImages
      await eventsSection.save()
    } else {
      eventsSection = await EventsSection.create({
        title,
        description,
        buttonText,
        buttonLink,
        eventImages,
      })
    }

    return NextResponse.json({ success: true, data: eventsSection })
  } catch (error) {
    console.error("Error updating events section:", error)
    return NextResponse.json({ success: false, message: "Failed to update events section" }, { status: 500 })
  }
}
