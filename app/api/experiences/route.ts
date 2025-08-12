import { NextResponse } from "next/server"
import { ExperiencesSection } from "@/models/CMSContent"
import { connectDB } from "@/lib/db"

export async function GET() {
  try {
    await connectDB()

    const experiencesData = await ExperiencesSection.findOne()

    if (!experiencesData) {
      return NextResponse.json({
        success: true,
        data: [],
      })
    }

    // Return only published experiences
    const publishedExperiences = experiencesData.experiences.filter((exp: any) => exp.isPublished !== false)

    return NextResponse.json({
      success: true,
      data: publishedExperiences,
    })
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch experiences" }, { status: 500 })
  }
}
