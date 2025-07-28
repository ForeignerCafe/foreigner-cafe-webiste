// app/api/subscribers/route.ts
import { connectDB } from "@/lib/db";
import Subscriber from "@/models/Subscriber";


// POST: Add a new subscriber
export async function POST(request: Request) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email) {
      return new Response("Email is required", { status: 400 });
    }

    const existing = await Subscriber.findOne({ email });

    if (existing) {
      return new Response("Already subscribed", { status: 409 });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    return Response.json({ success: true, email });
  } catch (error) {
    console.error(
      "POST /api/subscribers error:",
      error instanceof Error ? error.message : String(error)
    );
    return new Response("Failed to subscribe", { status: 500 });
  }
}

// GET: Return all subscribers
export async function GET() {
  try {
    await connectDB();
    const subscribers = await Subscriber.find(
      {},
      { _id: 0, email: 1, subscribedAt: 1 }
    );

    return Response.json({ subscribers });
  } catch (error) {
    console.error(
      "GET /api/subscribers error:",
      error instanceof Error ? error.message : String(error)
    );
    return new Response("Failed to fetch subscribers", { status: 500 });
  }
}

// DELETE: Remove subscriber by email
export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email) {
      return new Response("Missing email", { status: 400 });
    }

    const deleted = await Subscriber.findOneAndDelete({ email });

    if (!deleted) {
      return new Response("Subscriber not found", { status: 404 });
    }

    return Response.json({ success: true, deleted: deleted.email });
  } catch (error) {
    console.error(
      "DELETE /api/subscribers error:",
      error instanceof Error ? error.message : String(error)
    );
    return new Response("Failed to delete subscriber", { status: 500 });
  }
}
