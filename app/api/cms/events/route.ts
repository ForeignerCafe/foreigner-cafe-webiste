import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import CMSContent from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    const eventsPage = await CMSContent.findOne({
      section: "events-page",
    })

    if (!eventsPage) {
      // Return default data if not found
      const defaultData = {
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
              "Foreigner Café offers intimate spaces for storytelling nights, themed brunches, poetry readings, and more.",
            image: "/images/pink.webp",
            imagePosition: "right",
          },
        ],
        eventSpaces: [
          {
            id: "1",
            name: "Main Hall",
            description: "Our Main Hall offers energy, elegance, and moments, woven into thoughtful clusters.",
            image: "/images/main-hall.webp",
            capacity: "Up to 80 guests",
          },
        ],
      }

      return NextResponse.json({
        success: true,
        data: defaultData,
      })
    }

    return NextResponse.json({
      success: true,
      data: eventsPage.content,
    })
  } catch (error) {
    console.error("Error fetching events page:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch events page" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    const eventsPage = await CMSContent.findOneAndUpdate(
      { section: "events-page" },
      {
        section: "events-page",
        content: body,
        updatedAt: new Date(),
      },
      { upsert: true, new: true },
    )

    return NextResponse.json({
      success: true,
      data: eventsPage.content,
      message: "Events page updated successfully",
    })
  } catch (error) {
    console.error("Error updating events page:", error)
    return NextResponse.json({ success: false, message: "Failed to update events page" }, { status: 500 })
  }
}
