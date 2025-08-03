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
          { label: "DINE", href: "/", isExternal: false },
          { label: "EVENTS", href: "/events", isExternal: false },
          { label: "SHOP", href: "https://order.toasttab.com/online/foreigner-60-east-3rd-avenue", isExternal: true },
          { label: "CATERING", href: "/catering", isExternal: false },
          {
            label: "GIFT VOUCHERS",
            href: "https://www.toasttab.com/foreigner-60-east-3rd-avenue/giftcards",
            isExternal: true,
          },
        ],
        mainNavItems: [
          { label: "HOME", action: "scroll", sectionId: "home" },
          {
            label: "MENU",
            action: "external",
            href: "https://mhm-timber.s3.amazonaws.com/public/member/r9bJd/lurgtAi7r1j5/morningbreakfastmenuexamplecompressed.pdf",
          },
          { label: "ABOUT US", action: "scroll", sectionId: "story" },
          { label: "EXPERIENCES", action: "navigate", href: "/experiences" },
          { label: "FAQS", action: "navigate", href: "/faqs" },
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

    if (!logo || !topNavItems || !mainNavItems) {
      return NextResponse.json(
        { success: false, message: "Logo, topNavItems, and mainNavItems are required" },
        { status: 400 },
      )
    }

    let headerContent = await HeaderContent.findOne()

    if (headerContent) {
      headerContent.logo = logo
      headerContent.topNavItems = topNavItems
      headerContent.mainNavItems = mainNavItems
      headerContent.reserveButtonText = reserveButtonText || "RESERVE"
      await headerContent.save()
    } else {
      headerContent = await HeaderContent.create({
        logo,
        topNavItems,
        mainNavItems,
        reserveButtonText: reserveButtonText || "RESERVE",
      })
    }

    return NextResponse.json({ success: true, data: headerContent })
  } catch (error) {
    console.error("Error updating header content:", error)
    return NextResponse.json({ success: false, message: "Failed to update header content" }, { status: 500 })
  }
}
