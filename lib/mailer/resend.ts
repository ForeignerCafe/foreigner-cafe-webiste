import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  from = "Foreigner Cafe <noreply@foreignercafe.com>",
}: SendEmailOptions) {
  try {
    const result = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    console.log(
      `Email sent successfully to ${Array.isArray(to) ? to.join(", ") : to}`
    );
    return result;
  } catch (error) {
    console.error(`Error sending email:`, error);
    throw error;
  }
}

export async function sendBulkNewsletter({
  subscribers,
  subject,
  html,
}: {
  subscribers: string[];
  subject: string;
  html: string;
}) {
  try {
    // Resend allows up to 100 recipients per email for bulk sending
    const BATCH_SIZE = 100;
    const results = [];

    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const batch = subscribers.slice(i, i + BATCH_SIZE);

      try {
        const result = await resend.emails.send({
          from: "Foreigner Cafe <newsletter@foreignercafe.com>",
          to: batch,
          subject,
          html,
        });
        results.push({ success: true, count: batch.length, result });
        console.log(`Newsletter batch sent to ${batch.length} subscribers`);
      } catch (error) {
        console.error(`Failed to send newsletter batch:`, error);
        results.push({ success: false, count: batch.length, error });
      }
    }

    const totalSent = results
      .filter((r) => r.success)
      .reduce((sum, r) => sum + r.count, 0);

    const totalFailed = results
      .filter((r) => !r.success)
      .reduce((sum, r) => sum + r.count, 0);

    return {
      totalSent,
      totalFailed,
      totalSubscribers: subscribers.length,
      results,
    };
  } catch (error) {
    console.error(`Bulk newsletter sending error:`, error);
    throw error;
  }
}
