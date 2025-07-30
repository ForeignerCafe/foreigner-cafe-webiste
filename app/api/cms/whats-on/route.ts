import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { WhatsOnSection } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let whatsOnSection = await WhatsOnSection.findOne()

    // Create default content if none exists
    if (!whatsOnSection) {
      whatsOnSection = await WhatsOnSection.create({
        title: "WHAT'S ON",
        events: [
          {
            title: "PATISSERIE HIGH TEA",
            description:
              "Overlooking the working patisserie through a 4-inch high tea of sweet and savoury delights in your own private space in our historic garden.",
            image: "/placeholder.svg?height=320&width=480",
            linkText: "Visit Patisserie High Tea",
            linkHref: "#experiences",
          },
          {
            title: "GLASSHOUSE HIGH TEA",
            description:
              "Indulge in a lavish high tea of sweet and savoury delights in your own private space in our historic garden.",
            image: "/placeholder.svg?height=320&width=480",
            linkText: "Visit Glasshouse High Tea",
            linkHref: "#experiences",
          },
        ],
      })
    }

    return NextResponse.json({ success: true, data: whatsOnSection })
  } catch (error) {
    console.error("Error fetching whats on section:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch whats on section" }, { status: 500 })
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

    let whatsOnSection = await WhatsOnSection.findOne()

    if (whatsOnSection) {
      whatsOnSection.title = title
      whatsOnSection.events = events
      await whatsOnSection.save()
    } else {
      whatsOnSection = await WhatsOnSection.create({
        title,
        events,
      })
    }

    return NextResponse.json({ success: true, data: whatsOnSection })
  } catch (error) {
    console.error("Error updating whats on section:", error)
    return NextResponse.json({ success: false, message: "Failed to update whats on section" }, { status: 500 })
  }
}
