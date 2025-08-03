import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { HeaderContent } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let headerContent = await HeaderContent.findOne()

    if (!headerContent) {
      headerContent = await HeaderContent.create({
        logo: "FOREIGNER CAFE",
        topNavItems: [
          {
            label: "Order Online",
            href: "https://order.toasttab.com/online/foreigner-60-east-3rd-avenue",
            isExternal: true,
          },
          { label: "Careers", href: "/careers" },
          { label: "Gift Cards", href: "/gift-cards" },
        ],
        mainNavItems: [
          { label: "Home", href: "/", action: "navigate" },
          { label: "About", href: "/about", action: "navigate" },
          { label: "Menu", href: "/menu", action: "navigate" },
          { label: "Events", href: "/events", action: "navigate" },
          { label: "Catering", href: "/catering", action: "navigate" },
          { label: "Contact", action: "modal", sectionId: "contact" },
        ],
        reserveButtonText: "RESERVE TABLE",
      })
    }

    return NextResponse.json({ success: true, data: headerContent })
  } catch (error) {
    console.error("Error fetching header content:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch header content" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const { logo, topNavItems, mainNavItems, reserveButtonText } = body

    let headerContent = await HeaderContent.findOne()

    if (headerContent) {
      headerContent.logo = logo
      headerContent.topNavItems = topNavItems
      headerContent.mainNavItems = mainNavItems
      headerContent.reserveButtonText = reserveButtonText
      await headerContent.save()
    } else {
      headerContent = await HeaderContent.create({
        logo,
        topNavItems,
        mainNavItems,
        reserveButtonText,
      })
    }

    return NextResponse.json({ success: true, data: headerContent })
  } catch (error) {
    console.error("Error updating header content:", error)
    return NextResponse.json({ success: false, message: "Failed to update header content" }, { status: 500 })
  }
}
