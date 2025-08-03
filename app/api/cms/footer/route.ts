import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { FooterContent } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let footerContent = await FooterContent.findOne()

    // Create default content if none exists
    if (!footerContent) {
      footerContent = await FooterContent.create({
        sections: [
          {
            title: "Quick Links",
            links: [
              {
                label: "Home",
                action: "navigate",
                href: "/",
              },
              {
                label: "About Us",
                action: "scroll",
                sectionId: "about",
              },
              {
                label: "Menu",
                action: "scroll",
                sectionId: "menu",
              },
              {
                label: "Events",
                action: "navigate",
                href: "/events",
              },
            ],
          },
          {
            title: "Services",
            links: [
              {
                label: "Catering",
                action: "navigate",
                href: "/catering",
              },
              {
                label: "Private Events",
                action: "navigate",
                href: "/events",
              },
              {
                label: "Coffee Workshops",
                action: "navigate",
                href: "/experiences",
              },
              {
                label: "Gift Cards",
                action: "navigate",
                href: "/gift-cards",
              },
            ],
          },
          {
            title: "Support",
            links: [
              {
                label: "Contact Us",
                action: "modal",
                sectionId: "contact",
              },
              {
                label: "FAQs",
                action: "navigate",
                href: "/faqs",
              },
              {
                label: "Privacy Policy",
                action: "navigate",
                href: "/privacy",
              },
              {
                label: "Terms of Service",
                action: "navigate",
                href: "/terms",
              },
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
          {
            platform: "Facebook",
            url: "https://facebook.com/foreignercafe",
            icon: "Facebook",
          },
          {
            platform: "Instagram",
            url: "https://instagram.com/foreignercafe",
            icon: "Instagram",
          },
          {
            platform: "Twitter",
            url: "https://twitter.com/foreignercafe",
            icon: "Twitter",
          },
          {
            platform: "LinkedIn",
            url: "https://linkedin.com/company/foreignercafe",
            icon: "Linkedin",
          },
        ],
        newsletterSection: {
          title: "STAY CONNECTED",
          description: "Receive The Foreigner Cafe news directly to you.",
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

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { sections, contactInfo, socialMedia, newsletterSection, copyright } = body

    if (!sections || !contactInfo || !socialMedia || !newsletterSection || !copyright) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

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
