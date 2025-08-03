import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { HeroParallaxProducts } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let heroParallaxData = await HeroParallaxProducts.findOne()

    // Create default content if none exists
    if (!heroParallaxData) {
      heroParallaxData = await HeroParallaxProducts.create({
        products: [
          { id: 1, title: "Artisan Coffee", link: "/shop", thumbnail: "/placeholder.svg?height=400&width=300" },
          { id: 2, title: "Fresh Pastries", link: "/shop", thumbnail: "/placeholder.svg?height=400&width=300" },
          { id: 3, title: "Cozy Atmosphere", link: "/gallery", thumbnail: "/placeholder.svg?height=400&width=300" },
          { id: 4, title: "Community Events", link: "/events", thumbnail: "/placeholder.svg?height=400&width=300" },
          { id: 5, title: "Private Dining", link: "/catering", thumbnail: "/placeholder.svg?height=400&width=300" },
          { id: 6, title: "Gift Cards", link: "/shop", thumbnail: "/placeholder.svg?height=400&width=300" },
          { id: 7, title: "Specialty Drinks", link: "/shop", thumbnail: "/placeholder.svg?height=400&width=300" },
          { id: 8, title: "Local Art", link: "/gallery", thumbnail: "/placeholder.svg?height=400&width=300" },
        ],
        rowConfiguration: {
          firstRowCount: 8,
          secondRowCount: 8,
          thirdRowCount: 9,
        },
      })
    }

    return NextResponse.json({ success: true, data: heroParallaxData })
  } catch (error) {
    console.error("Error fetching hero parallax data:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch hero parallax data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { products, rowConfiguration } = body

    if (!products || !rowConfiguration || !Array.isArray(products)) {
      return NextResponse.json(
        { success: false, message: "Products array and rowConfiguration are required" },
        { status: 400 },
      )
    }

    let heroParallaxData = await HeroParallaxProducts.findOne()

    if (heroParallaxData) {
      heroParallaxData.products = products
      heroParallaxData.rowConfiguration = rowConfiguration
      await heroParallaxData.save()
    } else {
      heroParallaxData = await HeroParallaxProducts.create({
        products,
        rowConfiguration,
      })
    }

    return NextResponse.json({ success: true, data: heroParallaxData })
  } catch (error) {
    console.error("Error updating hero parallax data:", error)
    return NextResponse.json({ success: false, message: "Failed to update hero parallax data" }, { status: 500 })
  }
}
