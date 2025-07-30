import { connectDB } from "@/lib/db";
import Subscriber from "@/models/Subscriber";
import { sendMail } from "@/lib/mailer";
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

    const newsletterLog = new NewsletterLog({
      templateName,
      subject,
      subscribersCount: subscribers.length,
    });
    await newsletterLog.save();

    (async () => {
      for (const sub of subscribers) {
        try {
          await sendMail({
            to: sub.email,
            subject,
            html,
            type: "newsletter",
          });
        } catch (err) {
          console.error(
            `❌ Failed to send to ${sub.email}:`,
            err instanceof Error ? err.message : String(err)
          );
        }
      }
    })();

    return Response.json({
      status: "Newsletter queued for sending",
      recipients: subscribers.length,
    });
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
