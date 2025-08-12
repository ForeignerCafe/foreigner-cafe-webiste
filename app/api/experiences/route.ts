import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { ExperiencesSection } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    const experiencesSection = await ExperiencesSection.findOne()

    if (!experiencesSection) {
      return NextResponse.json({ success: false, message: "No experiences found" }, { status: 404 })
    }

    // Filter only published experiences
    const publishedExperiences = experiencesSection.experiences.filter((exp: any) => exp.isPublished)

    return NextResponse.json({
      success: true,
      data: {
        experiences: publishedExperiences,
        testimonials: experiencesSection.testimonials,
      },
    })
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch experiences" }, { status: 500 })
  }
}
