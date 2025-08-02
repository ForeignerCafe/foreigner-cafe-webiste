import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { BrandSection } from "@/models/CMSContent";

export async function GET() {
  try {
    await connectDB();

    let brandSection = await BrandSection.findOne();

    // Create default content if none exists
    if (!brandSection) {
      brandSection = await BrandSection.create({
        storyElements: [
          {
            id: 1,
            layout: "right",
            title: "Our Story",
            text: "Founded with a passion for exceptional coffee and community connection, Foreigner Cafe has been serving our neighborhood with love and dedication.",
            media: {
              type: "image",
              src: "/placeholder.svg?height=400&width=600",
              alt: "Cafe interior",
              linkHref: "/about",
            },
          },
          {
            id: 2,
            layout: "left",
            title: "Our Mission",
            text: "We believe in creating spaces where stories are shared, friendships are formed, and every cup tells a tale of quality and care.",
            media: {
              type: "image",
              src: "/placeholder.svg?height=400&width=600",
              alt: "Coffee preparation",
              linkHref: "/mission",
            },
          },
        ],
      });
    }

    return NextResponse.json({ success: true, data: brandSection });
  } catch (error) {
    console.error("Error fetching brand section:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch brand section" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { storyElements } = body;

    if (!storyElements || !Array.isArray(storyElements)) {
      return NextResponse.json(
        { success: false, message: "Story elements array is required" },
        { status: 400 }
      );
    }

    let brandSection = await BrandSection.findOne();

    if (brandSection) {
      brandSection.storyElements = storyElements;
      await brandSection.save();
    } else {
      brandSection = await BrandSection.create({
        storyElements,
      });
    }

    return NextResponse.json({ success: true, data: brandSection });
  } catch (error) {
    console.error("Error updating brand section:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update brand section" },
      { status: 500 }
    );
  }
}
