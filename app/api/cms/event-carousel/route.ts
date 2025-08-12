import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { EventCarouselContent } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let eventCarouselContent = await EventCarouselContent.findOne()

    if (!eventCarouselContent) {
      // Create default content if none exists
      eventCarouselContent = await EventCarouselContent.create({
        slides: [
          {
            id: "weddings",
            title: "WEDDINGS",
            description:
              "Our wedding spaces are thoughtfully designed to transform into the perfect backdrop for your special day, offering intimate charm and a touch of refined elegance.",
            leftImage: {
              src: "/images/WedDown.webp",
              alt: "Elegant wedding reception hall with chandeliers",
            },
            rightImages: [
              {
                src: "/images/WedUp.webp",
                alt: "Bride and groom walking down the aisle",
                text: "Two souls, one journey. We make sure your special day is nothing short of perfect.",
              },
            ],
            topRightLinkText: "VIEW MORE",
          },
          {
            id: "gathering",
            title: "GATHERING",
            description:
              "Our versatile spaces are thoughtfully designed to host memorable gatherings, from lively celebrations to intimate get-togethers, ensuring every event is unique.",
            leftImage: {
              src: "/images/gatDown.webp",
              alt: "Lively gathering event with many people",
            },
            rightImages: [
              {
                src: "/images/gatUp.webp",
                alt: "People at a gathering",
                text: "Celebrate life's moments with us. Our spaces are perfect for any gathering, big or small.",
              },
            ],
            topRightLinkText: "VIEW MORE",
          },
          {
            id: "corporate",
            title: "CORPORATE",
            description:
              "Our professional setting is ideal for corporate events, offering a sophisticated atmosphere for meetings, conferences, and business gatherings of all sizes.",
            leftImage: {
              src: "/images/corDownb.webp",
              alt: "Corporate event with people networking",
            },
            rightImages: [
              {
                src: "/images/corUp.webp",
                alt: "People in a corporate meeting room",
                text: "Host your next corporate event with us. Our professional setting ensures a productive and memorable experience.",
              },
            ],
            topRightLinkText: "VIEW MORE",
          },
        ],
        bottomSection: {
          heading: "READY TO HOST AT FOREIGNER CAFE?",
          text: "Whether it's a wedding, a lively gathering, or a corporate event, our venue is the perfect place to create unforgettable moments. Book your event with us today!",
          buttonText: "BOOK YOUR EVENT",
        },
      })
    }

    return NextResponse.json({ success: true, data: eventCarouselContent })
  } catch (error) {
    console.error("Error fetching event carousel content:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch event carousel content" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { slides, bottomSection } = body

    if (!slides || !bottomSection) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
    }

    let eventCarouselContent = await EventCarouselContent.findOne()

    if (eventCarouselContent) {
      eventCarouselContent.slides = slides
      eventCarouselContent.bottomSection = bottomSection
      await eventCarouselContent.save()
    } else {
      eventCarouselContent = await EventCarouselContent.create({
        slides,
        bottomSection,
      })
    }

    return NextResponse.json({ success: true, data: eventCarouselContent })
  } catch (error) {
    console.error("Error updating event carousel content:", error)
    return NextResponse.json({ success: false, message: "Failed to update event carousel content" }, { status: 500 })
  }
}
