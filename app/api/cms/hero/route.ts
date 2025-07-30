import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { HeroContent } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let heroContent = await HeroContent.findOne()

    // Create default content if none exists
    if (!heroContent) {
      heroContent = await HeroContent.create({
        title: "Welcome to Foreigners Cafe",
        subtitle: "Where Stories Begin",
        description: "Experience exceptional coffee, delicious food, and warm hospitality in our cozy atmosphere.",
        videoUrl: "/videos/hero-video.mp4",
      })
    }

    return NextResponse.json({ success: true, data: heroContent })
  } catch (error) {
    console.error("Error fetching hero content:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch hero content" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { title, subtitle, description, videoUrl } = body

    if (!title || !subtitle || !description || !videoUrl) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
    }

    let heroContent = await HeroContent.findOne()

    if (heroContent) {
      heroContent.title = title
      heroContent.subtitle = subtitle
      heroContent.description = description
      heroContent.videoUrl = videoUrl
      await heroContent.save()
    } else {
      heroContent = await HeroContent.create({
        title,
        subtitle,
        description,
        videoUrl,
      })
    }

    return NextResponse.json({ success: true, data: heroContent })
  } catch (error) {
    console.error("Error updating hero content:", error)
    return NextResponse.json({ success: false, message: "Failed to update hero content" }, { status: 500 })
  }
}
