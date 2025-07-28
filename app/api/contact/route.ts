import { connectDB } from "@/lib/db";

import { sendMail } from "@/lib/mailer";
import { contactRequestTemplate } from "@/lib/mailer/templates/contactRequest";
import ContactRequest from "@/models/ContactRequest";

// GET: All requests or single request by ID
export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    // GET by ID
    if (id) {
      const requestById = await ContactRequest.findById(id);
      if (!requestById) {
        return new Response("Contact request not found", { status: 404 });
      }
      return Response.json(requestById);
    }

    // GET all with optional filters
    const filter: any = {};
    if (type) filter.type = type;
    if (status) filter.status = status;

    const requests = await ContactRequest.find(filter).sort({ createdAt: -1 });
    return Response.json({ requests });
  } catch (error) {
    console.error("GET /api/contact error:", error);
    return new Response("Failed to load contact requests", { status: 500 });
  }
}

// POST: Create new request
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const {
      name,
      email,
      phone,
      message,
      type = "general",
      date,
      time,
      people,
    } = body;

    // Basic validation
    if (!name || !email || !message) {
      return new Response("Missing required fields", { status: 400 });
    }

    const newRequest = new ContactRequest({
      name,
      email,
      phone,
      message,
      type,
      date,
      time,
      people,
    });

    const saved = await newRequest.save();
    // const { subject, html } = contactRequestTemplate(name, email, message);

    // await sendMail({
    //   to: email,
    //   subject,
    //   html,
    //   type: "contact",
    // });

    return Response.json(saved);
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return new Response("Failed to submit contact", { status: 500 });
  }
}
export async function DELETE(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("Missing ID", { status: 400 });
    }

    const deletedRequest = await ContactRequest.findByIdAndDelete(id);

    if (!deletedRequest) {
      return new Response("Contact request not found", { status: 404 });
    }

    return new Response("Contact request deleted successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("DELETE /api/contact error:", error);
    return new Response("Failed to delete contact request", { status: 500 });
  }
}

// PATCH: Update contact request status
export async function PATCH(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("Missing ID", { status: 400 });
    }

    const body = await request.json();
    const { status } = body;

    if (!["pending", "read", "archived"].includes(status)) {
      return new Response("Invalid status value", { status: 400 });
    }

    const updatedRequest = await ContactRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return new Response("Contact request not found", { status: 404 });
    }

    return Response.json(updatedRequest);
  } catch (error) {
    console.error("PATCH /api/contact error:", error);
    return new Response("Failed to update contact request", { status: 500 });
  }
}
