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
        title: "FOREIGNER CAFE",
        subtitle: "A Space for Community & Craft",
        description:
          "More than a coffee shop — we're a gathering place for people, ideas, and craft. Rooted in hospitality and culture, our space is a warm invitation to slow down and connect.",
        videoUrl:
          "https://res.cloudinary.com/dxtclcoxh/video/upload/v1752141159/yt1z.net_-_BARISTA_Cafe_Promo_Video_Cinematic_Real_Estate_video_Epic_B-Roll_1080p60_httacw.mp4",
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
