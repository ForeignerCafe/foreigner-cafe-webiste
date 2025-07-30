import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { DineDrinkContent } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let dineDrinkContent = await DineDrinkContent.findOne()

    // Create default content if none exists
    if (!dineDrinkContent) {
      dineDrinkContent = await DineDrinkContent.create({
        venues: [
          {
            name: "Main Cafe",
            location: "Ground Floor",
            description: "Our main dining area with comfortable seating and a warm atmosphere.",
            image: "/placeholder.svg?height=300&width=400",
          },
          {
            name: "Garden Terrace",
            location: "Outdoor",
            description: "Enjoy your coffee in our beautiful garden setting with fresh air and natural light.",
            image: "/placeholder.svg?height=300&width=400",
          },
        ],
      })
    }

    return NextResponse.json({ success: true, data: dineDrinkContent })
  } catch (error) {
    console.error("Error fetching dine drink content:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch dine drink content" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { venues } = body

    if (!venues || !Array.isArray(venues)) {
      return NextResponse.json({ success: false, message: "Venues array is required" }, { status: 400 })
    }

    let dineDrinkContent = await DineDrinkContent.findOne()

    if (dineDrinkContent) {
      dineDrinkContent.venues = venues
      await dineDrinkContent.save()
    } else {
      dineDrinkContent = await DineDrinkContent.create({
        venues,
      })
    }

    return NextResponse.json({ success: true, data: dineDrinkContent })
  } catch (error) {
    console.error("Error updating dine drink content:", error)
    return NextResponse.json({ success: false, message: "Failed to update dine drink content" }, { status: 500 })
  }
}
