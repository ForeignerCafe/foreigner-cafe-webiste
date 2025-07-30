import mongoose from "mongoose";
import "dotenv/config";

// Import all models to ensure they're registered
import "@/models/Blog";
import "@/models/Category";
import "@/models/CMSContent";
import "@/models/ContactRequest";
import "@/models/Highlight";
import "@/models/NewsletterLog";
import "@/models/Order";
import "@/models/Product";
import "@/models/Subscriber";
import "@/models/User";

const MONGODB_URI = process.env.MONGODB_URI!;

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
