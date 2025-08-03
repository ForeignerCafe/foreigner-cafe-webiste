import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { HeaderContent } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let headerContent = await HeaderContent.findOne()

    // Create default content if none exists
    if (!headerContent) {
      headerContent = await HeaderContent.create({
        logo: "FOREIGNER CAFE",
        topNavItems: [
          {
            label: "Book a Table",
            href: "/book",
            isExternal: false,
          },
          {
            label: "Order Online",
            href: "/shop",
            isExternal: false,
          },
          {
            label: "Gift Cards",
            href: "/gift-cards",
            isExternal: false,
          },
        ],
        mainNavItems: [
          {
            label: "Home",
            action: "navigate",
            href: "/",
          },
          {
            label: "About",
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
          {
            label: "Gallery",
            action: "navigate",
            href: "/gallery",
          },
          {
            label: "Blog",
            action: "navigate",
            href: "/blogs",
          },
          {
            label: "Contact",
            action: "scroll",
            sectionId: "contact",
          },
        ],
        reserveButtonText: "RESERVE",
      })
    }

    return NextResponse.json({ success: true, data: headerContent })
  } catch (error) {
    console.error("Error fetching header content:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch header content" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { logo, topNavItems, mainNavItems, reserveButtonText } = body

    if (!logo || !Array.isArray(topNavItems) || !Array.isArray(mainNavItems) || !reserveButtonText) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

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
