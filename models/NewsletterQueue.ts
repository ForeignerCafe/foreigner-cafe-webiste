import mongoose, { type Schema, type Document } from "mongoose";

export interface INewsletterQueue extends Document {
  templateName: string;
  subject: string;
  html: string;
  couponCode?: string;
  status: "pending" | "processing" | "completed" | "failed";
  totalSubscribers: number;
  sentCount: number;
  failedCount: number;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  error?: string;
}

const NewsletterQueueSchema: Schema<INewsletterQueue> = new mongoose.Schema(
  {
    templateName: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      required: true,
    },
    couponCode: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    totalSubscribers: {
      type: Number,
      required: true,
    },
    sentCount: {
      type: Number,
      default: 0,
    },
    failedCount: {
      type: Number,
      default: 0,
    },
    startedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    error: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.NewsletterQueue ||
  mongoose.model<INewsletterQueue>("NewsletterQueue", NewsletterQueueSchema);
