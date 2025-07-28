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

  return await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });
}
