import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { BrandSection } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let brandSection = await BrandSection.findOne()

    // Create default content if none exists
    if (!brandSection) {
      brandSection = await BrandSection.create({
        storyElements: [
          {
            id: 1,
            layout: "right",
            title: "Our Story",
            text: "Founded in the heart of the city, Foreigners Cafe began as a dream to create a space where cultures meet over exceptional coffee. Our journey started with a simple belief: that great coffee brings people together, transcending boundaries and creating connections that last a lifetime.",
            media: {
              type: "image",
              src: "/placeholder.svg?height=600&width=800",
              alt: "Cafe interior showing our story",
            },
          },
          {
            id: 2,
            layout: "left",
            title: "Crafted with Care",
            text: "Every cup we serve is a testament to our commitment to quality. From sourcing the finest beans from around the world to perfecting our roasting techniques, we ensure that each sip delivers an experience that speaks to the soul of coffee lovers everywhere.",
            media: {
              type: "image",
              src: "/placeholder.svg?height=600&width=800",
              alt: "Coffee roasting process",
            },
          },
        ],
      })
    }

    return NextResponse.json({ success: true, data: brandSection })
  } catch (error) {
    console.error("Error fetching brand section:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch brand section" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { storyElements } = body

    if (!storyElements || !Array.isArray(storyElements)) {
      return NextResponse.json({ success: false, message: "Story elements array is required" }, { status: 400 })
    }

    let brandSection = await BrandSection.findOne()

    if (brandSection) {
      brandSection.storyElements = storyElements
      await brandSection.save()
    } else {
      brandSection = await BrandSection.create({
        storyElements,
      })
    }

    return NextResponse.json({ success: true, data: brandSection })
  } catch (error) {
    console.error("Error updating brand section:", error)
    return NextResponse.json({ success: false, message: "Failed to update brand section" }, { status: 500 })
  }
}
