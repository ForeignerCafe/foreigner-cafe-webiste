// models/NewsletterLog.ts
import mongoose, { Schema, Document } from "mongoose";

export interface INewsletterLog extends Document {
  templateName: string;
  subject: string;
  sentAt: Date;
  subscribersCount: number;
}

const NewsletterLogSchema: Schema<INewsletterLog> = new mongoose.Schema(
  {
    templateName: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
    subscribersCount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.NewsletterLog ||
  mongoose.model<INewsletterLog>("NewsletterLog", NewsletterLogSchema);
