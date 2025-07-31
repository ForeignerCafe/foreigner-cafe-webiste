import { connectDB } from "@/lib/db";
import Subscriber from "@/models/Subscriber";
import { sendBulkNewsletter } from "@/lib/mailer/resend";
import { eidTemplate } from "@/lib/mailer/templates/eid";
import { chrotdtmanTemplate } from "@/lib/mailer/templates/christmas";
import { diwaliTemplate } from "@/lib/mailer/templates/diwali";
import { easterTemplate } from "@/lib/mailer/templates/easter";
import NewsletterLog from "@/models/NewsletterLog";
import { generalTemplate } from "@/lib/mailer/templates/general";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { templateName, subject, html: customHtml, couponCode } = body;

    if (!templateName || !subject) {
      return new Response("Missing templateName or subject", { status: 400 });
    }

    const subscribers = await Subscriber.find({}, { email: 1 });
    const subscriberEmails = subscribers.map((sub) => sub.email);

    let html = "";

    const templateMap: Record<string, (data: any) => string> = {
      eid: eidTemplate,
      chrotdtman: chrotdtmanTemplate,
      diwali: diwaliTemplate,
      easter: easterTemplate,
    };

    if (templateName === "custom") {
      if (!customHtml) {
        return new Response("Custom HTML is required", { status: 400 });
      }
      if (couponCode) {
        html = generalTemplate({ html: customHtml, coupon: couponCode });
      } else {
        html = generalTemplate({ html: customHtml });
      }
    } else {
      const templateFn = templateMap[templateName];
      if (!templateFn) {
        return new Response("Invalid template name", { status: 400 });
      }

      const templateParams: { subject: string; coupon?: string | null } = {
        subject,
      };
      if (couponCode) {
        templateParams.coupon = couponCode;
      }

      html = templateFn(templateParams);
    }

    // Create newsletter log entry
    const newsletterLog = new NewsletterLog({
      templateName,
      subject,
      subscribersCount: subscribers.length,
    });
    await newsletterLog.save();

    // Send newsletter using Resend bulk sending
    try {
      const sendResult = await sendBulkNewsletter({
        subscribers: subscriberEmails,
        subject,
        html,
      });

      return Response.json({
        status: "Newsletter sent successfully",
        recipients: subscribers.length,
        sent: sendResult.totalSent,
        failed: sendResult.totalFailed,
        logId: newsletterLog._id,
      });
    } catch (sendError) {
      console.error("Failed to send newsletter:", sendError);
      return new Response("Failed to send newsletter", { status: 500 });
    }
  } catch (error) {
    console.error(
      "POST /api/newsletter error:",
      error instanceof Error ? error.message : String(error)
    );
    return new Response("Failed to send newsletter", { status: 500 });
  }
}

// GET handler to fetch newsletter logs
export async function GET() {
  try {
    await connectDB();

    const logs = await NewsletterLog.find({})
      .sort({ createdAt: -1 })
      .select("templateName subject subscribersCount createdAt");

    return Response.json(logs);
  } catch (error) {
    console.error(
      "GET /api/newsletter error:",
      error instanceof Error ? error.message : String(error)
    );
    return new Response("Failed to fetch newsletter logs", { status: 500 });
  }
}
