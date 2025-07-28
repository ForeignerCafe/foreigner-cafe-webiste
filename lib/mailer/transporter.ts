// lib/mailer/transporter.ts
import nodemailer from "nodemailer";

type MailerType = "support" | "newsletter" | "noreply" | "contact";

export function getTransporter(type: MailerType) {
  const configs = {
    support: {
      user: process.env.SUPPORT_EMAIL_USER!,
      pass: process.env.SUPPORT_EMAIL_PASS!,
    },
    newsletter: {
      user: process.env.NEWSLETTER_EMAIL_USER!,
      pass: process.env.NEWSLETTER_EMAIL_PASS!,
    },
    noreply: {
      user: process.env.NOREPLY_EMAIL_USER!,
      pass: process.env.NOREPLY_EMAIL_PASS!,
    },
    contact: {
      user: process.env.NOREPLY_EMAIL_USER!,
      pass: process.env.NOREPLY_EMAIL_PASS!,
    },
  };

  const { user, pass } = configs[type];

  return {
    transporter: nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    }),
    from: `"Foreigner Cafe" <${user}>`,
  };
}
