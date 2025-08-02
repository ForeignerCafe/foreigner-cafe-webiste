import { connectDB } from "@/lib/db";
import NewsletterQueue from "@/models/NewsletterQueue";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const queueId = searchParams.get("id");

    if (!queueId) {
      return new Response("Queue ID is required", { status: 400 });
    }

    const job = await NewsletterQueue.findById(queueId);

    if (!job) {
      return new Response("Newsletter job not found", { status: 404 });
    }

    return Response.json({
      id: job._id,
      status: job.status,
      totalSubscribers: job.totalSubscribers,
      sentCount: job.sentCount,
      failedCount: job.failedCount,
      createdAt: job.createdAt,
      startedAt: job.startedAt,
      completedAt: job.completedAt,
      error: job.error,
    });
  } catch (error) {
    console.error("Newsletter status error:", error);
    return new Response("Failed to get newsletter status", { status: 500 });
  }
}
