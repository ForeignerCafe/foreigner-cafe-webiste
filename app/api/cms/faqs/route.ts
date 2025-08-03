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
            question: "What are your opening hours?",
            answer:
              "We're open Monday to Friday from 7:00 AM to 9:00 PM, and weekends from 8:00 AM to 10:00 PM. We're here to serve you fresh coffee and delicious food throughout the day!",
          },
          {
            question: "Do you offer WiFi for customers?",
            answer:
              "Yes! We provide free high-speed WiFi for all our customers. Whether you're working, studying, or just browsing, you can stay connected while enjoying our coffee and atmosphere.",
          },
          {
            question: "Can I make reservations for large groups?",
            answer:
              "We welcome groups of all sizes. For parties of 6 or more, we recommend making a reservation in advance to ensure we can accommodate your group comfortably.",
          },
          {
            question: "Do you have vegan and gluten-free options?",
            answer:
              "Yes, we offer a variety of vegan and gluten-free options including plant-based milk alternatives, vegan pastries, and gluten-free bread. Our staff can help you identify suitable options from our menu.",
          },
          {
            question: "Do you offer catering services?",
            answer:
              "Yes! We provide catering services for corporate events, private parties, and special occasions. Contact us at least 48 hours in advance to discuss your catering needs and menu options.",
          },
          {
            question: "Can I host private events at your cafe?",
            answer:
              "We'd love to host your private event! We offer our space for birthday parties, business meetings, book clubs, and other gatherings. Please contact us to discuss availability and arrangements.",
          },
          {
            question: "Do you sell gift cards?",
            answer:
              "Yes, we offer gift cards in various denominations. They make perfect gifts for coffee lovers and can be purchased in-store or online. Gift cards never expire and can be used for any items in our cafe.",
          },
          {
            question: "Do you have parking available?",
            answer:
              "We have limited street parking available in front of our cafe. There's also a public parking lot two blocks away on Main Street. We also encourage customers to bike - we have bike racks available!",
          },
        ],
      })
    }

    return NextResponse.json({ success: true, data: faqsSection })
  } catch (error) {
    console.error("Error fetching FAQs:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch FAQs" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { title, subtitle, faqs } = body

    if (!title || !subtitle || !Array.isArray(faqs)) {
      return NextResponse.json(
        { success: false, message: "Title, subtitle, and faqs array are required" },
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
      faqsSection = await FAQsSection.create({ title, subtitle, faqs })
    }

    return NextResponse.json({ success: true, data: faqsSection })
  } catch (error) {
    console.error("Error updating FAQs:", error)
    return NextResponse.json({ success: false, message: "Failed to update FAQs" }, { status: 500 })
  }
}
