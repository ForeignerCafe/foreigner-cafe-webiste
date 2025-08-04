import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Gallery } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let gallery = await Gallery.findOne()

    // Create default content if none exists
    if (!gallery) {
      gallery = await Gallery.create({
        sections: [
          {
            id: 1,
            name: "Recent Events",
            description: "Highlights from our latest events and gatherings",
            images: [
              {
                id: 1,
                src: "/placeholder.svg?height=400&width=400",
                alt: "Event photo 1",
                caption: "Community gathering",
              },
              {
                id: 2,
                src: "/placeholder.svg?height=400&width=400",
                alt: "Event photo 2",
                caption: "Coffee tasting session",
              },
            ],
          },
          {
            id: 2,
            name: "Cafe Atmosphere",
            description: "The cozy ambiance of our cafe",
            images: [
              {
                id: 1,
                src: "/placeholder.svg?height=400&width=400",
                alt: "Cafe interior 1",
                caption: "Main seating area",
              },
              {
                id: 2,
                src: "/placeholder.svg?height=400&width=400",
                alt: "Cafe interior 2",
                caption: "Coffee bar",
              },
            ],
          },
        ],
      })
    }

    return NextResponse.json({ success: true, data: gallery })
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch gallery" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { sections } = body

    if (!sections || !Array.isArray(sections)) {
      return NextResponse.json({ success: false, message: "Sections array is required" }, { status: 400 })
    }

    let gallery = await Gallery.findOne()

    if (gallery) {
      gallery.sections = sections
      await gallery.save()
    } else {
      gallery = await Gallery.create({ sections })
    }

    return NextResponse.json({ success: true, data: gallery })
  } catch (error) {
    console.error("Error updating gallery:", error)
    return NextResponse.json({ success: false, message: "Failed to update gallery" }, { status: 500 })
  }
}
