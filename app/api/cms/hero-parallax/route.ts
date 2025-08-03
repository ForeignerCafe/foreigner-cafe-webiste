import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { HeroParallaxProducts } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let heroParallaxProducts = await HeroParallaxProducts.findOne()

    // Create default content if none exists
    if (!heroParallaxProducts) {
      const defaultProducts = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        title: `Product ${i + 1}`,
        link: "https://example.com",
        thumbnail: "/placeholder.svg?height=400&width=400",
      }))

      heroParallaxProducts = await HeroParallaxProducts.create({
        products: defaultProducts,
        rowConfiguration: {
          firstRowCount: 8,
          secondRowCount: 8,
          thirdRowCount: 9,
        },
      })
    }

    return NextResponse.json({ success: true, data: heroParallaxProducts })
  } catch (error) {
    console.error("Error fetching hero parallax products:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch hero parallax products" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { products, rowConfiguration } = body

    if (!products || !Array.isArray(products)) {
      return NextResponse.json({ success: false, message: "Products array is required" }, { status: 400 })
    }

    let heroParallaxProducts = await HeroParallaxProducts.findOne()

    if (heroParallaxProducts) {
      heroParallaxProducts.products = products
      heroParallaxProducts.rowConfiguration = rowConfiguration || heroParallaxProducts.rowConfiguration
      await heroParallaxProducts.save()
    } else {
      heroParallaxProducts = await HeroParallaxProducts.create({
        products,
        rowConfiguration: rowConfiguration || {
          firstRowCount: 8,
          secondRowCount: 8,
          thirdRowCount: 9,
        },
      })
    }

    return NextResponse.json({ success: true, data: heroParallaxProducts })
  } catch (error) {
    console.error("Error updating hero parallax products:", error)
    return NextResponse.json({ success: false, message: "Failed to update hero parallax products" }, { status: 500 })
  }
}
