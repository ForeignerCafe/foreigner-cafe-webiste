import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { ExperiencesSection } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let experiencesSection = await ExperiencesSection.findOne()

    if (!experiencesSection) {
      experiencesSection = await ExperiencesSection.create({
        title: "Our Experiences",
        description: "Discover unique experiences that bring people together through food, culture, and community.",
        experiences: [
          {
            title: "Coffee Tasting",
            description: "Explore the world of specialty coffee with our expert-led tasting sessions.",
            image: "/placeholder.svg?height=300&width=400",
            features: ["Expert guidance", "Premium beans", "Tasting notes"],
            link: "/experiences/coffee-tasting",
          },
          {
            title: "Cultural Events",
            description: "Join us for cultural celebrations and community gatherings.",
            image: "/placeholder.svg?height=300&width=400",
            features: ["Live music", "Traditional food", "Community spirit"],
            link: "/experiences/cultural-events",
          },
          {
            title: "Cooking Classes",
            description: "Learn to prepare authentic dishes from around the world.",
            image: "/placeholder.svg?height=300&width=400",
            features: ["Hands-on learning", "Professional chefs", "Take-home recipes"],
            link: "/experiences/cooking-classes",
          },
        ],
      })
    }

    return NextResponse.json({ success: true, data: experiencesSection })
  } catch (error) {
    console.error("Error fetching experiences content:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch experiences content" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const { title, description, experiences } = body

    let experiencesSection = await ExperiencesSection.findOne()

    if (experiencesSection) {
      experiencesSection.title = title
      experiencesSection.description = description
      experiencesSection.experiences = experiences
      await experiencesSection.save()
    } else {
      experiencesSection = await ExperiencesSection.create({
        title,
        description,
        experiences,
      })
    }

    return NextResponse.json({ success: true, data: experiencesSection })
  } catch (error) {
    console.error("Error updating experiences content:", error)
    return NextResponse.json({ success: false, message: "Failed to update experiences content" }, { status: 500 })
  }
}
