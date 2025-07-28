// scripts/seedAdmin.ts
import "dotenv/config";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

async function seedAdmin() {
  await connectDB();

  const existingAdmin = await User.findOne({ username: "admin" });
  if (existingAdmin) {
    console.log("Admin user already exists");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash("Foreigner@2025#Cafe", 12);

  const admin = new User({
    username: "admin",
    password: hashedPassword,
    email: "admin@foreignercafe.com",
    fullName: "Super Admin",
    role: "admin",
  });

  await admin.save();
  console.log("Admin user created successfully");
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error("Failed to seed admin:", err);
  process.exit(1);
});
