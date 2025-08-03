import { connectDB } from "@/lib/db"
import CMSContent from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let faqsContent = await CMSContent.findOne({ section: "faqs" })

    if (!faqsContent) {
      // Create default FAQs content if it doesn't exist
      faqsContent = await CMSContent.create({
        section: "faqs",
        content: {
          title: "Frequently Asked Questions",
          subtitle: "Find answers to common questions about our cafe, services, and policies.",
          faqs: [
            {
              question: "What are your opening hours?",
              answer:
                "We're open Monday to Friday from 7:00 AM to 10:00 PM, and weekends from 8:00 AM to 11:00 PM. Holiday hours may vary.",
            },
            {
              question: "Do you offer vegan and gluten-free options?",
              answer:
                "Yes! We have a variety of vegan and gluten-free options including plant-based milk alternatives, vegan pastries, and gluten-free bread for sandwiches.",
            },
            {
              question: "Can I make a reservation?",
              answer:
                "Yes, we accept reservations for groups of 4 or more. You can book online through our website or call us directly. Walk-ins are always welcome too!",
            },
            {
              question: "Do you provide catering services?",
              answer:
                "We offer catering for corporate events, private parties, and special occasions. Contact us at least 48 hours in advance to discuss your needs.",
            },
            {
              question: "Is there WiFi available?",
              answer:
                "Yes, we provide free high-speed WiFi for all our customers. Perfect for remote work, studying, or casual browsing.",
            },
            {
              question: "Do you have parking available?",
              answer:
                "We have a small parking lot behind the cafe with 15 spaces. Street parking is also available, and we're accessible by public transport.",
            },
            {
              question: "Can I host private events at your cafe?",
              answer:
                "Yes! We offer private event hosting for birthdays, business meetings, book clubs, and more. Contact us to discuss availability and packages.",
            },
            {
              question: "Do you sell gift cards?",
              answer:
                "Yes, we offer both physical and digital gift cards in various denominations. They make perfect gifts for coffee lovers and can be purchased in-store or online.",
            },
          ],
        },
      })
    }

    return Response.json({ content: faqsContent.content })
  } catch (error) {
    console.error("GET /api/cms/faqs error:", error)
    return new Response("Failed to load FAQs content", { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB()
    const { content } = await request.json()

    const faqsContent = await CMSContent.findOneAndUpdate({ section: "faqs" }, { content }, { new: true, upsert: true })

    return Response.json({ content: faqsContent.content })
  } catch (error) {
    console.error("PUT /api/cms/faqs error:", error)
    return new Response("Failed to update FAQs content", { status: 500 })
  }
}
