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
            title: "Coffee Tasting Experience",
            description: "Discover the nuances of our specialty coffee blends with our expert baristas.",
            imageSrc: "/placeholder.svg?height=300&width=400",
            alt: "Coffee tasting session",
            linkText: "Book Now",
            linkHref: "/experiences/coffee-tasting",
          },
          {
            id: 2,
            title: "Private Events",
            description: "Host your special occasions in our intimate and welcoming space.",
            imageSrc: "/placeholder.svg?height=300&width=400",
            alt: "Private event setup",
            linkText: "Learn More",
            linkHref: "/experiences/private-events",
          },
        ],
        testimonials: [
          {
            quote: "The coffee here is absolutely exceptional. Every visit feels like a warm hug.",
            name: "Sarah Johnson",
            avatar: "/placeholder.svg?height=60&width=60",
          },
          {
            quote: "Perfect atmosphere for meetings and catching up with friends. Highly recommended!",
            name: "Michael Chen",
            avatar: "/placeholder.svg?height=60&width=60",
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
