import { connectDB } from "@/lib/db"
import CMSContent from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let headerContent = await CMSContent.findOne({ section: "header" })

    if (!headerContent) {
      // Create default header content if it doesn't exist
      headerContent = await CMSContent.create({
        section: "header",
        content: {
          logo: {
            text: "Foreigner Cafe",
            image: "/images/logo.png",
          },
          navigation: [
            { label: "Home", href: "/", type: "link" },
            { label: "About", href: "/about", type: "link" },
            { label: "Menu", href: "/menu", type: "link" },
            { label: "Events", href: "/events", type: "link" },
            { label: "Gallery", href: "/gallery", type: "link" },
            { label: "Blog", href: "/blogs", type: "link" },
            { label: "Shop", href: "/shop", type: "link" },
            { label: "Contact", href: "/contact", type: "modal" },
          ],
          ctaButton: {
            text: "Book Table",
            action: "reserve",
            variant: "primary",
          },
        },
      })
    }

    return Response.json({ content: headerContent.content })
  } catch (error) {
    console.error("GET /api/cms/header error:", error)
    return new Response("Failed to load header content", { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB()
    const { content } = await request.json()

    const headerContent = await CMSContent.findOneAndUpdate(
      { section: "header" },
      { content },
      { new: true, upsert: true },
    )

    return Response.json({ content: headerContent.content })
  } catch (error) {
    console.error("PUT /api/cms/header error:", error)
    return new Response("Failed to update header content", { status: 500 })
  }
}
