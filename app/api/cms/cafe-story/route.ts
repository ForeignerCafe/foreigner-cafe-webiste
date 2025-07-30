import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { CafeStoryContent } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let cafeStoryContent = await CafeStoryContent.findOne()

    // Create default content if none exists
    if (!cafeStoryContent) {
      cafeStoryContent = await CafeStoryContent.create({
        sections: [
          {
            title: "Our Beginning",
            content:
              "Founded with a passion for bringing people together through exceptional food and warm hospitality.",
            mainImage: "/images/story1.jpg",
            smallImage: "/images/story1-small.jpg",
          },
          {
            title: "Our Mission",
            content:
              "To create memorable experiences that celebrate the diversity of flavors and cultures in our community.",
            mainImage: "/images/story2.jpg",
            smallImage: "/images/story2-small.jpg",
          },
        ],
      })
    }

    return NextResponse.json({ success: true, data: cafeStoryContent })
  } catch (error) {
    console.error("Error fetching cafe story content:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch cafe story content" }, { status: 500 })
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

    let cafeStoryContent = await CafeStoryContent.findOne()

    if (cafeStoryContent) {
      cafeStoryContent.sections = sections
      await cafeStoryContent.save()
    } else {
      cafeStoryContent = await CafeStoryContent.create({ sections })
    }

    return NextResponse.json({ success: true, data: cafeStoryContent })
  } catch (error) {
    console.error("Error updating cafe story content:", error)
    return NextResponse.json({ success: false, message: "Failed to update cafe story content" }, { status: 500 })
  }
}
