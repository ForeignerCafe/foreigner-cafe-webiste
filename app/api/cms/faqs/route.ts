import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { FAQsSection } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let faqsSection = await FAQsSection.findOne()

    // Create default content if none exists
    if (!faqsSection) {
      faqsSection = await FAQsSection.create({
        title: "FREQUENTLY ASKED QUESTIONS",
        subtitle: "Everything you need to know about visiting Foreigner Cafe",
        faqs: [
          {
            question: "Do you take reservations?",
            answer:
              "Yes, we accept reservations for parties up to 12 people. Larger groups should contact us directly for special arrangements.",
          },
          {
            question: "What are your opening hours?",
            answer:
              "We're open Monday-Friday 7:30am-4:00pm for dine-in and 7:00am-4:00pm for takeaway. Weekend hours are 7:30am-4:00pm for both dine-in and takeaway.",
          },
          {
            question: "Do you offer catering services?",
            answer:
              "Yes, we provide catering for corporate events, private parties, and special occasions. Contact us for custom menu options and pricing.",
          },
          {
            question: "Is there parking available?",
            answer:
              "Street parking is available around our location. We also have partnerships with nearby parking facilities for extended stays.",
          },
          {
            question: "Do you accommodate dietary restrictions?",
            answer:
              "We offer vegan, gluten-free, and dairy-free options. Please inform our staff of any allergies or dietary requirements.",
          },
        ],
      })
    }

    return NextResponse.json({ success: true, data: faqsSection })
  } catch (error) {
    console.error("Error fetching FAQs section:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch FAQs section" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { title, subtitle, faqs } = body

    if (!title || !subtitle || !faqs || !Array.isArray(faqs)) {
      return NextResponse.json(
        { success: false, message: "Title, subtitle, and FAQs array are required" },
        { status: 400 },
      )
    }

    let faqsSection = await FAQsSection.findOne()

    if (faqsSection) {
      faqsSection.title = title
      faqsSection.subtitle = subtitle
      faqsSection.faqs = faqs
      await faqsSection.save()
    } else {
      faqsSection = await FAQsSection.create({
        title,
        subtitle,
        faqs,
      })
    }

    return NextResponse.json({ success: true, data: faqsSection })
  } catch (error) {
    console.error("Error updating FAQs section:", error)
    return NextResponse.json({ success: false, message: "Failed to update FAQs section" }, { status: 500 })
  }
}
