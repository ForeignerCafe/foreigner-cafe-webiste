import { getTransporter } from "./transporter";

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  type?: "support" | "newsletter" | "noreply" | "contact";
}

export async function sendMail({
  to,
  subject,
  html,
  type = "noreply",
}: SendMailOptions) {
  const { transporter, from } = getTransporter(type);

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    console.log(`Email sent successfully to ${to}`);
    console.log(`Message ID: ${info.messageId}`);

    return info;
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    throw error;
  }
}
