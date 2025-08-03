import { connectDB } from "@/lib/db"
import CMSContent from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let footerContent = await CMSContent.findOne({ section: "footer" })

    if (!footerContent) {
      // Create default footer content if it doesn't exist
      footerContent = await CMSContent.create({
        section: "footer",
        content: {
          logo: {
            text: "Foreigner Cafe",
            image: "/images/logo.png",
          },
          description:
            "Experience the perfect blend of international flavors and local hospitality at Foreigner Cafe. Where every cup tells a story.",
          sections: [
            {
              title: "Quick Links",
              links: [
                { label: "About Us", href: "/about" },
                { label: "Menu", href: "/menu" },
                { label: "Events", href: "/events" },
                { label: "Gallery", href: "/gallery" },
                { label: "Blog", href: "/blogs" },
              ],
            },
            {
              title: "Services",
              links: [
                { label: "Catering", href: "/catering" },
                { label: "Private Events", href: "/events" },
                { label: "Coffee Workshops", href: "/experiences" },
                { label: "Gift Cards", href: "/shop" },
              ],
            },
            {
              title: "Contact",
              links: [
                { label: "123 Cafe Street, City", href: "#", type: "address" },
                { label: "+1 (555) 123-4567", href: "tel:+15551234567", type: "phone" },
                { label: "hello@foreignercafe.com", href: "mailto:hello@foreignercafe.com", type: "email" },
              ],
            },
          ],
          socialMedia: [
            { platform: "facebook", url: "https://facebook.com/foreignercafe", icon: "facebook" },
            { platform: "instagram", url: "https://instagram.com/foreignercafe", icon: "instagram" },
            { platform: "twitter", url: "https://twitter.com/foreignercafe", icon: "twitter" },
            { platform: "linkedin", url: "https://linkedin.com/company/foreignercafe", icon: "linkedin" },
          ],
          newsletter: {
            title: "Stay Updated",
            description: "Subscribe to our newsletter for the latest updates, events, and special offers.",
            placeholder: "Enter your email address",
          },
          copyright: "© 2024 Foreigner Cafe. All rights reserved.",
          policies: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Cookie Policy", href: "/cookies" },
          ],
        },
      })
    }

    return Response.json({ content: footerContent.content })
  } catch (error) {
    console.error("GET /api/cms/footer error:", error)
    return new Response("Failed to load footer content", { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB()
    const { content } = await request.json()

    const footerContent = await CMSContent.findOneAndUpdate(
      { section: "footer" },
      { content },
      { new: true, upsert: true },
    )

    return Response.json({ content: footerContent.content })
  } catch (error) {
    console.error("PUT /api/cms/footer error:", error)
    return new Response("Failed to update footer content", { status: 500 })
  }
}
