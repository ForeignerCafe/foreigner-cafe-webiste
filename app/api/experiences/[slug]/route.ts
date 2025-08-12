import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { ExperiencesSection } from "@/models/CMSContent"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await connectDB()

    const { slug } = params

    const experiencesSection = await ExperiencesSection.findOne()

    if (!experiencesSection) {
      return NextResponse.json({ success: false, message: "No experiences found" }, { status: 404 })
    }

    const experience = experiencesSection.experiences.find((exp: any) => exp.slug === slug && exp.isPublished)

    if (!experience) {
      return NextResponse.json({ success: false, message: "Experience not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: experience })
  } catch (error) {
    console.error("Error fetching experience:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch experience" }, { status: 500 })
  }
}
