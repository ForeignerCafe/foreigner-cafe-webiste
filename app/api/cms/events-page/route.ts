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
        hero: {
          title: "Events at Foreigner Cafe",
          subtitle: "Host your next event with us and create memories that last a lifetime.",
          backgroundImage: "/images/events.webp",
        },
        contentSections: [
          {
            id: "1",
            category: "A Space To Unwind",
            title: "Thoughtful Settings for Meaningful Occasions",
            description:
              "Foreigner Café offers intimate spaces for storytelling nights, themed brunches, poetry readings, and more. Designed with intention and comfort, our venues are the perfect backdrop for experiences that feel personal, honest, and memorable.",
            image: "/images/pink.webp",
            imagePosition: "right",
          },
          {
            id: "2",
            category: "Your Next Masterpiece",
            title: "Flexible Settings with Heart and Style",
            description:
              "We understand that no two stories are the same. That's why our team works with you to shape your event around your voice, your rhythm, and your meaning. From layout to lighting, menu to music, Foreigner Café is here to make it feel right, never rushed, never distant.",
            image: "/images/sitting.webp",
            imagePosition: "left",
          },
          {
            id: "3",
            category: "Curated Spaces",
            title: "A Backdrop That Feels Like a Story",
            description:
              "Each of our event spaces is shaped with warmth and detail from the textures to the lighting to the intentional stillness between sounds. Whether under soft evening lights or in the hum of a morning gathering, Foreigner Cafe is where spaces don’t just host your event they become part of its story.",
            image: "/images/dining.webp",
            imagePosition: "right",
          },
        ],
        eventSpaces: [
          {
            id: "1",
            name: "Main Hall",
            description:
              "Our Main Hall offers energy, elegance, and moments, woven into thoughtful clusters, warm lighting, and flexible layouts. It's designed for everything.",
            image: "/images/main-hall.webp",
            capacity: "Up to 80 guests",
          },
          {
            id: "2",
            name: "Dining Spaces",
            description:
              "Our dining spaces are designed for intimate togetherness, whether you're planning a storytelling event, a celebration, or a celebratory feast.",
            image: "/images/dining.webp",
            capacity: "Up to 40 guests",
          },
          {
            id: "3",
            name: "Bar & Lounge",
            description:
              "Be it for your gathering or a casual bar & lounge, our event space offers an intimate, luxurious, and flexible layout, all about forming connections.",
            image: "/images/bar-lounge.webp",
            capacity: "Up to 30 guests",
          },
          {
            id: "4",
            name: "Wedding Hall",
            description:
              "Our ceremony space is a beautiful blend of urban oasis and wedding memories. It's a stunning environment for a luxurious, magical, and romantic event.",
            image: "/images/wedding-hall.webp",
            capacity: "Up to 100 guests",
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
    const { hero, contentSections, eventSpaces } = body

    if (!hero || !contentSections || !eventSpaces) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
    }

    let eventsPageContent = await EventsPageContent.findOne()

    if (eventsPageContent) {
      eventsPageContent.hero = hero
      eventsPageContent.contentSections = contentSections
      eventsPageContent.eventSpaces = eventSpaces
      await eventsPageContent.save()
    } else {
      eventsPageContent = await EventsPageContent.create({
        hero,
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
