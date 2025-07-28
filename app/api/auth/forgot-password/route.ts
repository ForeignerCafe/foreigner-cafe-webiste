import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { sendMail } from "@/lib/mailer";
import { resetPasswordTemplate } from "@/lib/mailer/templates/resetPassword";

function generateRandomPassword(length = 12) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

export async function POST(req: NextRequest) {
  await connectDB();

  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const user = await User.findOne({ username: "admin" });
  if (!user) {
    return NextResponse.json(
      { error: "Admin user not found" },
      { status: 404 }
    );
  }

  if (user.email !== email) {
    return NextResponse.json(
      { error: "Email does not match admin account" },
      { status: 403 }
    );
  }

  const newPassword = generateRandomPassword();
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  user.password = hashedPassword;
  await user.save();

  const { subject, html } = resetPasswordTemplate(newPassword);

  try {
    await sendMail({
      to: user.email,
      subject,
      html,
      type: "support",
    });
    return NextResponse.json({
      success: true,
      message: "Password reset and email sent",
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json(
      { error: "Password updated but failed to send email" },
      { status: 500 }
    );
  }
}
