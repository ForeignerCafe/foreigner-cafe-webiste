import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
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
  from = "Foreigner Cafe <noreply@foreignerscafe.com>",
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

export async function sendBulkEmails(emails: SendEmailOptions[]) {
  const results = [];

  for (const email of emails) {
    try {
      const result = await sendEmail(email);
      results.push({ success: true, result, email: email.to });
    } catch (error) {
      console.error(`Failed to send to ${email.to}:`, error);
      results.push({ success: false, error, email: email.to });
    }
  }

  return results;
}
