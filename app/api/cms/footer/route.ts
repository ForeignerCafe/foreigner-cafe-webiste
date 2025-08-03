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
            title: "ABOUT US",
            links: [
              { label: "Our Story", action: "scroll", sectionId: "story" },
              {
                label: "Location",
                action: "external",
                href: "https://www.google.com/maps/place/foreigner+cafe+san+mateo",
              },
              { label: "Contact Us", action: "modal" },
            ],
          },
          {
            title: "LOCATION & HOURS",
            links: [], // This will be handled by contactInfo
          },
          {
            title: "SERVICES",
            links: [
              {
                label: "Takeaway",
                action: "external",
                href: "https://order.toasttab.com/online/foreigner-60-east-3rd-avenue",
              },
              {
                label: "Delivery",
                action: "external",
                href: "https://order.toasttab.com/online/foreigner-60-east-3rd-avenue",
              },
              {
                label: "Gift Cards",
                action: "external",
                href: "https://www.toasttab.com/foreigner-60-east-3rd-avenue/giftcards",
              },
              { label: "Events", action: "navigate", href: "/events" },
            ],
          },
        ],
        contactInfo: {
          address: "Foreigner Cafe, 60 E 3rd Ave Ste 108, San Mateo, CA 94401, United States",
          phone: "+1 (650) 620 1888",
          email: "service@foreignercafe.com",
          hours: {
            weekdays: "Mon-Fri: 8:00am - 4:00pm",
            weekends: "Sat-Sun: 8:30am - 4:00pm",
          },
        },
        socialMedia: [
          {
            platform: "Facebook",
            url: "https://www.facebook.com/foreignercafe/",
            icon: "Facebook",
          },
          {
            platform: "Instagram",
            url: "https://www.instagram.com/foreignercafe/?hl=en",
            icon: "Instagram",
          },
          {
            platform: "Google",
            url: "https://www.google.com/maps/place/Foreigner+Cafe/@37.5637466,-122.3247235,17z",
            icon: "Globe",
          },
        ],
        newsletterSection: {
          title: "STAY CONNECTED",
          description: "Receive The Foreigner Cafe news directly to you.",
        },
        copyright: `© ${new Date().getFullYear()} The Foreigner Cafe. Website by Cybitronix`,
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

    if (!sections || !contactInfo || !socialMedia) {
      return NextResponse.json(
        { success: false, message: "Sections, contactInfo, and socialMedia are required" },
        { status: 400 },
      )
    }

    let footerContent = await FooterContent.findOne()

    if (footerContent) {
      footerContent.sections = sections
      footerContent.contactInfo = contactInfo
      footerContent.socialMedia = socialMedia
      footerContent.newsletterSection = newsletterSection || footerContent.newsletterSection
      footerContent.copyright = copyright || footerContent.copyright
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
