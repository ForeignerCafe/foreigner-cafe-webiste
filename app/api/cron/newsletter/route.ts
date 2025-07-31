import { connectDB } from "@/lib/db";
import Subscriber from "@/models/Subscriber";
import NewsletterQueue from "@/models/NewsletterQueue";
import { sendBulkEmails } from "@/lib/mailer/resend";

const BATCH_SIZE = 50; // Send emails in batches of 50

export async function GET() {
  try {
    await connectDB();

    // Find pending newsletter jobs
    const pendingJobs = await NewsletterQueue.find({
      status: { $in: ["pending", "processing"] },
    }).limit(1);

    if (pendingJobs.length === 0) {
      return Response.json({ message: "No pending newsletter jobs" });
    }

    const job = pendingJobs[0];

    // Mark as processing
    job.status = "processing";
    job.startedAt = new Date();
    await job.save();

    try {
      // Get all subscribers
      const subscribers = await Subscriber.find({}, { email: 1 });

      // Process in batches
      const batches = [];
      for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
        batches.push(subscribers.slice(i, i + BATCH_SIZE));
      }

      let totalSent = 0;
      let totalFailed = 0;

      for (const batch of batches) {
        const emails = batch.map((subscriber) => ({
          to: subscriber.email,
          subject: job.subject,
          html: job.html,
          from: "Foreigner Cafe <newsletter@foreignerscafe.com>",
        }));

        const results = await sendBulkEmails(emails);

        const sent = results.filter((r) => r.success).length;
        const failed = results.filter((r) => !r.success).length;

        totalSent += sent;
        totalFailed += failed;

        // Update progress
        job.sentCount = totalSent;
        job.failedCount = totalFailed;
        await job.save();

        // Small delay between batches to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Mark as completed
      job.status = "completed";
      job.completedAt = new Date();
      await job.save();

      return Response.json({
        message: "Newsletter sent successfully",
        jobId: job._id,
        totalSent,
        totalFailed,
        totalSubscribers: subscribers.length,
      });
    } catch (error) {
      // Mark as failed
      job.status = "failed";
      job.error = error instanceof Error ? error.message : String(error);
      job.completedAt = new Date();
      await job.save();

      throw error;
    }
  } catch (error) {
    console.error("Newsletter cron job error:", error);
    return new Response("Newsletter cron job failed", { status: 500 });
  }
}
