import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { ExperiencesSection } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let experiencesSection = await ExperiencesSection.findOne()

    // Create default content if none exists
    if (!experiencesSection) {
      experiencesSection = await ExperiencesSection.create({
        experiences: [
          {
            id: 1,
            title: "Coffee Workshops",
            description: "Learn the art of brewing the perfect cup with our expert baristas.",
            imageSrc: "/placeholder.svg?height=400&width=600",
            alt: "Coffee brewing workshop",
            linkText: "Book Workshop",
            linkHref: "/experiences",
          },
          {
            id: 2,
            title: "Private Events",
            description: "Host your special occasions in our intimate and welcoming space.",
            imageSrc: "/placeholder.svg?height=400&width=600",
            alt: "Private event space",
            linkText: "Plan Event",
            linkHref: "/events",
          },
        ],
        testimonials: [
          {
            quote: "The best coffee experience in the city. The atmosphere is perfect for both work and relaxation.",
            name: "Sarah Johnson",
            avatar: "/placeholder.svg?height=80&width=80",
          },
          {
            quote: "Foreigners Cafe has become my second home. The community here is incredible.",
            name: "Michael Chen",
            avatar: "/placeholder.svg?height=80&width=80",
          },
        ],
      })
    }

    return NextResponse.json({ success: true, data: experiencesSection })
  } catch (error) {
    console.error("Error fetching experiences section:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch experiences section" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { experiences, testimonials } = body

    if (!experiences || !testimonials || !Array.isArray(experiences) || !Array.isArray(testimonials)) {
      return NextResponse.json(
        { success: false, message: "Experiences and testimonials arrays are required" },
        { status: 400 },
      )
    }

    let experiencesSection = await ExperiencesSection.findOne()

    if (experiencesSection) {
      experiencesSection.experiences = experiences
      experiencesSection.testimonials = testimonials
      await experiencesSection.save()
    } else {
      experiencesSection = await ExperiencesSection.create({
        experiences,
        testimonials,
      })
    }

    return NextResponse.json({ success: true, data: experiencesSection })
  } catch (error) {
    console.error("Error updating experiences section:", error)
    return NextResponse.json({ success: false, message: "Failed to update experiences section" }, { status: 500 })
  }
}
