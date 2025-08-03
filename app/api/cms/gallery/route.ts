import { connectDB } from "@/lib/db"
import CMSContent from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let galleryContent = await CMSContent.findOne({ section: "gallery" })

    if (!galleryContent) {
      // Create default gallery content if it doesn't exist
      galleryContent = await CMSContent.create({
        section: "gallery",
        content: {
          title: "Our Gallery",
          subtitle: "Explore the ambiance, delicious food, and memorable moments at Foreigner Cafe",
          sections: [
            {
              title: "Cafe Ambiance",
              description: "Step into our cozy and welcoming space",
              images: [
                {
                  url: "/placeholder.svg?height=400&width=600",
                  alt: "Cozy cafe interior with warm lighting",
                  caption: "Our main dining area with comfortable seating",
                },
                {
                  url: "/placeholder.svg?height=600&width=400",
                  alt: "Coffee counter with barista at work",
                  caption: "Fresh coffee being prepared by our skilled baristas",
                },
                {
                  url: "/placeholder.svg?height=500&width=700",
                  alt: "Outdoor seating area with plants",
                  caption: "Enjoy your coffee in our beautiful outdoor space",
                },
                {
                  url: "/placeholder.svg?height=450&width=550",
                  alt: "Reading corner with books and comfortable chairs",
                  caption: "Perfect spot for reading and relaxation",
                },
                {
                  url: "/placeholder.svg?height=350&width=500",
                  alt: "Window seating with natural light",
                  caption: "Natural light streaming through our large windows",
                },
              ],
            },
            {
              title: "Delicious Food & Drinks",
              description: "A visual feast of our culinary creations",
              images: [
                {
                  url: "/placeholder.svg?height=500&width=500",
                  alt: "Beautiful latte art in coffee cup",
                  caption: "Artisanal coffee with perfect latte art",
                },
                {
                  url: "/placeholder.svg?height=400&width=600",
                  alt: "Display case with fresh pastries",
                  caption: "Fresh pastries baked daily in-house",
                },
                {
                  url: "/placeholder.svg?height=600&width=400",
                  alt: "Gourmet sandwich with fresh ingredients",
                  caption: "Our signature gourmet sandwiches",
                },
                {
                  url: "/placeholder.svg?height=450&width=650",
                  alt: "Delicious breakfast plate",
                  caption: "Start your day with our hearty breakfast options",
                },
                {
                  url: "/placeholder.svg?height=350&width=450",
                  alt: "Slice of homemade cake",
                  caption: "Indulge in our homemade desserts",
                },
                {
                  url: "/placeholder.svg?height=550&width=400",
                  alt: "Colorful specialty drinks",
                  caption: "Try our unique specialty beverages",
                },
              ],
            },
            {
              title: "Events & Community",
              description: "Capturing special moments and community gatherings",
              images: [
                {
                  url: "/placeholder.svg?height=500&width=700",
                  alt: "Live music performance in cafe",
                  caption: "Enjoy live music performances every Friday",
                },
                {
                  url: "/placeholder.svg?height=400&width=600",
                  alt: "Coffee brewing workshop in progress",
                  caption: "Learn the art of coffee brewing in our workshops",
                },
                {
                  url: "/placeholder.svg?height=450&width=550",
                  alt: "Book club meeting with customers",
                  caption: "Join our monthly book club discussions",
                },
                {
                  url: "/placeholder.svg?height=600&width=400",
                  alt: "Local art exhibition on cafe walls",
                  caption: "Featuring local artists in our monthly exhibitions",
                },
                {
                  url: "/placeholder.svg?height=350&width=500",
                  alt: "Community members enjoying coffee together",
                  caption: "Building connections over great coffee",
                },
                {
                  url: "/placeholder.svg?height=500&width=600",
                  alt: "Birthday celebration at the cafe",
                  caption: "Celebrate special moments with us",
                },
              ],
            },
          ],
        },
      })
    }

    return Response.json({ content: galleryContent.content })
  } catch (error) {
    console.error("GET /api/cms/gallery error:", error)
    return new Response("Failed to load gallery content", { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB()
    const { content } = await request.json()

    const galleryContent = await CMSContent.findOneAndUpdate(
      { section: "gallery" },
      { content },
      { new: true, upsert: true },
    )

    return Response.json({ content: galleryContent.content })
  } catch (error) {
    console.error("PUT /api/cms/gallery error:", error)
    return new Response("Failed to update gallery content", { status: 500 })
  }
}
