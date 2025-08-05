import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import CMSContent from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let content = await CMSContent.findOne({ page: "events" })

    if (!content) {
      // Create default content if none exists
      content = await CMSContent.create({
        page: "events",
        data: {
          hero: {
            title: "Our Events",
            subtitle: "Discover amazing experiences at Foreigner Cafe",
            backgroundImage: "",
          },
          contentSections: [],
          eventSpaces: [],
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: content.data,
    })
  } catch (error) {
    console.error("Error fetching events page content:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch events page content" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const data = await request.json()

    const content = await CMSContent.findOneAndUpdate({ page: "events" }, { data }, { upsert: true, new: true })

    return NextResponse.json({
      success: true,
      data: content.data,
    })
  } catch (error) {
    console.error("Error updating events page content:", error)
    return NextResponse.json({ success: false, message: "Failed to update events page content" }, { status: 500 })
  }
}
