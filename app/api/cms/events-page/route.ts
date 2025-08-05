import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { EventsPageContent } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let eventsPageContent = await EventsPageContent.findOne()

    // Create default content if none exists
    if (!eventsPageContent) {
      eventsPageContent = await EventsPageContent.create({
        heroSection: {
          title: "Events at Foreigner Cafe",
          subtitle: "Host your next event with us and create memories that last a lifetime.",
          backgroundImage: "/images/events.webp",
        },
        contentSections: [
          {
            id: 1,
            category: "A Space To Unwind",
            title: "Thoughtful Settings for Meaningful Occasions",
            description:
              "Foreigner Café offers intimate spaces for storytelling nights, themed brunches, poetry readings, and more. Designed with intention and comfort, our venues are the perfect backdrop for experiences that feel personal, honest, and memorable.",
            imageSrc: "/images/pink.webp",
            imageAlt: "Elegant restaurant interior",
            imagePosition: "right",
          },
          {
            id: 2,
            category: "Your Next Masterpiece",
            title: "Flexible Settings with Heart and Style",
            description:
              "We understand that no two stories are the same. That's why our team works with you to shape your event around your voice, your rhythm, and your meaning. From layout to lighting, menu to music, Foreigner Café is here to make it feel right, never rushed, never distant.",
            imageSrc: "/images/sitting.webp",
            imageAlt: "Restaurant dining area",
            imagePosition: "left",
          },
        ],
        eventSpaces: [
          {
            id: 1,
            imageSrc: "/images/main-hall.webp",
            imageAlt: "Main Hall",
            title: "Main Hall",
            description:
              "Our Main Hall offers energy, elegance, and moments, woven into thoughtful clusters, warm lighting, and flexible layouts. It's designed for everything.",
          },
          {
            id: 2,
            imageSrc: "/images/dining.webp",
            imageAlt: "Dining Spaces",
            title: "Dining Spaces",
            description:
              "Our dining spaces are designed for intimate togetherness, whether you're planning a storytelling event, a celebration, or a celebratory feast.",
          },
        ],
      })
    }

    return NextResponse.json({ success: true, data: eventsPageContent })
  } catch (error) {
    console.error("Error fetching events page content:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch events page content" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { heroSection, contentSections, eventSpaces } = body

    if (!heroSection || !contentSections || !eventSpaces) {
      return NextResponse.json({ success: false, message: "All sections are required" }, { status: 400 })
    }

    let eventsPageContent = await EventsPageContent.findOne()

    if (eventsPageContent) {
      eventsPageContent.heroSection = heroSection
      eventsPageContent.contentSections = contentSections
      eventsPageContent.eventSpaces = eventSpaces
      await eventsPageContent.save()
    } else {
      eventsPageContent = await EventsPageContent.create({
        heroSection,
        contentSections,
        eventSpaces,
      })
    }

    return NextResponse.json({ success: true, data: eventsPageContent })
  } catch (error) {
    console.error("Error updating events page content:", error)
    return NextResponse.json({ success: false, message: "Failed to update events page content" }, { status: 500 })
  }
}
