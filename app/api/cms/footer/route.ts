import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { FooterContent } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let footerContent = await FooterContent.findOne()

    if (!footerContent) {
      footerContent = await FooterContent.create({
        sections: [
          {
            title: "Quick Links",
            links: [
              { label: "Home", href: "/", action: "navigate" },
              { label: "About Us", href: "/about", action: "navigate" },
              { label: "Menu", href: "/menu", action: "navigate" },
              { label: "Events", href: "/events", action: "navigate" },
              { label: "Catering", href: "/catering", action: "navigate" },
            ],
          },
          {
            title: "Services",
            links: [
              { label: "Dine In", href: "/dine-in", action: "navigate" },
              { label: "Takeaway", href: "/takeaway", action: "navigate" },
              { label: "Delivery", href: "/delivery", action: "navigate" },
              { label: "Private Events", href: "/private-events", action: "navigate" },
              { label: "Corporate Catering", href: "/corporate-catering", action: "navigate" },
            ],
          },
          {
            title: "Support",
            links: [
              { label: "Contact Us", action: "modal", sectionId: "contact" },
              { label: "FAQs", href: "/faqs", action: "navigate" },
              { label: "Privacy Policy", href: "/privacy", action: "navigate" },
              { label: "Terms of Service", href: "/terms", action: "navigate" },
              { label: "Accessibility", href: "/accessibility", action: "navigate" },
            ],
          },
        ],
        contactInfo: {
          address: "123 Coffee Street, Brew City, BC 12345",
          phone: "+1 (555) 123-4567",
          email: "hello@foreignercafe.com",
          hours: {
            weekdays: "Monday - Friday: 7:00 AM - 9:00 PM",
            weekends: "Saturday - Sunday: 8:00 AM - 10:00 PM",
          },
        },
        socialMedia: [
          { platform: "Facebook", url: "https://facebook.com/foreignercafe", icon: "facebook" },
          { platform: "Instagram", url: "https://instagram.com/foreignercafe", icon: "instagram" },
          { platform: "Twitter", url: "https://twitter.com/foreignercafe", icon: "twitter" },
          { platform: "LinkedIn", url: "https://linkedin.com/company/foreignercafe", icon: "linkedin" },
        ],
        newsletterSection: {
          title: "Stay Connected",
          description: "Subscribe to our newsletter for the latest updates, special offers, and community events.",
        },
        copyright: "© 2024 Foreigner Cafe. All rights reserved.",
      })
    }

    return NextResponse.json({ success: true, data: footerContent })
  } catch (error) {
    console.error("Error fetching footer content:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch footer content" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const { sections, contactInfo, socialMedia, newsletterSection, copyright } = body

    let footerContent = await FooterContent.findOne()

    if (footerContent) {
      footerContent.sections = sections
      footerContent.contactInfo = contactInfo
      footerContent.socialMedia = socialMedia
      footerContent.newsletterSection = newsletterSection
      footerContent.copyright = copyright
      await footerContent.save()
    } else {
      footerContent = await FooterContent.create({
        sections,
        contactInfo,
        socialMedia,
        newsletterSection,
        copyright,
      })
    }

    return NextResponse.json({ success: true, data: footerContent })
  } catch (error) {
    console.error("Error updating footer content:", error)
    return NextResponse.json({ success: false, message: "Failed to update footer content" }, { status: 500 })
  }
}
