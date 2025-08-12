import { connectDB } from "@/lib/db"
import CateringInquiry from "@/models/CateringInquiry"

// GET: All inquiries or single inquiry by ID
export async function GET(request: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const status = searchParams.get("status")

    // GET by ID
    if (id) {
      const inquiryById = await CateringInquiry.findById(id)
      if (!inquiryById) {
        return new Response("Catering inquiry not found", { status: 404 })
      }
      return Response.json({ inquiry: inquiryById })
    }

    // GET all with optional filters
    const filter: any = {}
    if (status) filter.status = status

    const inquiries = await CateringInquiry.find(filter).sort({ createdAt: -1 })
    return Response.json({ inquiries })
  } catch (error) {
    console.error("GET /api/inquiry error:", error)
    return new Response("Failed to load catering inquiries", { status: 500 })
  }
}

// POST: Create new inquiry
export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    const {
      name,
      email,
      phone,
      guests,
      eventType,
      eventDate,
      eventTime,
      budget,
      dietaryNeeds,
      amenities,
      ownItems,
      eventDuration,
      accessibility,
      finalizeDate,
    } = body

    // Basic validation
    if (!name || !email || !guests || !eventType || !eventDate || !eventTime) {
      return new Response("Missing required fields", { status: 400 })
    }

    const newInquiry = new CateringInquiry({
      name,
      email,
      phone,
      guests,
      eventType,
      eventDate,
      eventTime,
      budget,
      dietaryNeeds,
      amenities,
      ownItems,
      eventDuration,
      accessibility,
      finalizeDate,
    })

    const saved = await newInquiry.save()

    // TODO: Implement email notification for new inquiry if needed
    // const { subject, html } = cateringInquiryTemplate(name, email, message);
    // await sendMail({ to: email, subject, html, type: "catering-inquiry" });

    return Response.json(saved, { status: 200 })
  } catch (error) {
    console.error("POST /api/inquiry error:", error)
    return new Response("Failed to submit catering inquiry", { status: 500 })
  }
}

// DELETE: Delete inquiry by ID
export async function DELETE(request: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return new Response("Missing ID", { status: 400 })
    }

    const deletedInquiry = await CateringInquiry.findByIdAndDelete(id)

    if (!deletedInquiry) {
      return new Response("Catering inquiry not found", { status: 404 })
    }

    return new Response("Catering inquiry deleted successfully", {
      status: 200,
    })
  } catch (error) {
    console.error("DELETE /api/inquiry error:", error)
    return new Response("Failed to delete catering inquiry", { status: 500 })
  }
}

// PATCH: Update catering inquiry status
export async function PATCH(request: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return new Response("Missing ID", { status: 400 })
    }

    const body = await request.json()
    const { status } = body

    if (!["pending", "read", "archived"].includes(status)) {
      return new Response("Invalid status value", { status: 400 })
    }

    const updatedInquiry = await CateringInquiry.findByIdAndUpdate(id, { status }, { new: true })

    if (!updatedInquiry) {
      return new Response("Catering inquiry not found", { status: 404 })
    }

    return Response.json(updatedInquiry, { status: 200 })
  } catch (error) {
    console.error("PATCH /api/inquiry error:", error)
    return new Response("Failed to update catering inquiry", { status: 500 })
  }
}
