import { type NextRequest, NextResponse } from "next/server"
import { ExperiencesSection } from "@/models/CMSContent"
import { connectDB } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await connectDB()

    const experiencesData = await ExperiencesSection.findOne()

    if (!experiencesData) {
      return NextResponse.json({ success: false, message: "Experience not found" }, { status: 404 })
    }

    const experience = experiencesData.experiences.find(
      (exp: any) => exp.slug === params.slug && exp.isPublished !== false,
    )

    if (!experience) {
      return NextResponse.json({ success: false, message: "Experience not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: experience,
    })
  } catch (error) {
    console.error("Error fetching experience:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch experience" }, { status: 500 })
  }
}
