import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Gallery } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let gallery = await Gallery.findOne()

    // Create default content if none exists
    if (!gallery) {
      gallery = await Gallery.create({
        sections: [
          {
            id: 1,
            name: "Cafe Ambiance",
            description: "Step into our cozy and welcoming space",
            images: [
              {
                id: 1,
                src: "/placeholder.svg?height=400&width=600",
                alt: "Cozy cafe interior with warm lighting",
                caption: "Our main dining area with comfortable seating",
              },
              {
                id: 2,
                src: "/placeholder.svg?height=600&width=400",
                alt: "Coffee counter with barista at work",
                caption: "Fresh coffee being prepared by our skilled baristas",
              },
              {
                id: 3,
                src: "/placeholder.svg?height=500&width=700",
                alt: "Outdoor seating area with plants",
                caption: "Enjoy your coffee in our beautiful outdoor space",
              },
              {
                id: 4,
                src: "/placeholder.svg?height=450&width=550",
                alt: "Reading corner with books and comfortable chairs",
                caption: "Perfect spot for reading and relaxation",
              },
              {
                id: 5,
                src: "/placeholder.svg?height=350&width=500",
                alt: "Window seating with natural light",
                caption: "Natural light streaming through our large windows",
              },
            ],
          },
          {
            id: 2,
            name: "Delicious Food & Drinks",
            description: "A visual feast of our culinary creations",
            images: [
              {
                id: 1,
                src: "/placeholder.svg?height=500&width=500",
                alt: "Beautiful latte art in coffee cup",
                caption: "Artisanal coffee with perfect latte art",
              },
              {
                id: 2,
                src: "/placeholder.svg?height=400&width=600",
                alt: "Display case with fresh pastries",
                caption: "Fresh pastries baked daily in-house",
              },
              {
                id: 3,
                src: "/placeholder.svg?height=600&width=400",
                alt: "Gourmet sandwich with fresh ingredients",
                caption: "Our signature gourmet sandwiches",
              },
              {
                id: 4,
                src: "/placeholder.svg?height=450&width=650",
                alt: "Delicious breakfast plate",
                caption: "Start your day with our hearty breakfast options",
              },
              {
                id: 5,
                src: "/placeholder.svg?height=350&width=450",
                alt: "Slice of homemade cake",
                caption: "Indulge in our homemade desserts",
              },
              {
                id: 6,
                src: "/placeholder.svg?height=550&width=400",
                alt: "Colorful specialty drinks",
                caption: "Try our unique specialty beverages",
              },
            ],
          },
          {
            id: 3,
            name: "Events & Community",
            description: "Capturing special moments and community gatherings",
            images: [
              {
                id: 1,
                src: "/placeholder.svg?height=500&width=700",
                alt: "Live music performance in cafe",
                caption: "Enjoy live music performances every Friday",
              },
              {
                id: 2,
                src: "/placeholder.svg?height=400&width=600",
                alt: "Coffee brewing workshop in progress",
                caption: "Learn the art of coffee brewing in our workshops",
              },
              {
                id: 3,
                src: "/placeholder.svg?height=450&width=550",
                alt: "Book club meeting with customers",
                caption: "Join our monthly book club discussions",
              },
              {
                id: 4,
                src: "/placeholder.svg?height=600&width=400",
                alt: "Local art exhibition on cafe walls",
                caption: "Featuring local artists in our monthly exhibitions",
              },
              {
                id: 5,
                src: "/placeholder.svg?height=350&width=500",
                alt: "Community members enjoying coffee together",
                caption: "Building connections over great coffee",
              },
              {
                id: 6,
                src: "/placeholder.svg?height=500&width=600",
                alt: "Birthday celebration at the cafe",
                caption: "Celebrate special moments with us",
              },
            ],
          },
        ],
      })
    }

    return NextResponse.json({ success: true, data: gallery })
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch gallery" }, { status: 500 })
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

    let gallery = await Gallery.findOne()

    if (gallery) {
      gallery.sections = sections
      await gallery.save()
    } else {
      gallery = await Gallery.create({ sections })
    }

    return NextResponse.json({ success: true, data: gallery })
  } catch (error) {
    console.error("Error updating gallery:", error)
    return NextResponse.json({ success: false, message: "Failed to update gallery" }, { status: 500 })
  }
}
