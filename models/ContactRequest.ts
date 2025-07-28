import mongoose from "mongoose";

const ContactRequestSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["general", "reservation", "event", "feedback", "other"],
      default: "general",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date, // For reservation or event date
    },
    time: {
      type: String, // For reservation or event time
    },
    people: {
      type: Number, // For reservation or event guests
    },
    status: {
      type: String,
      enum: ["pending", "read", "archived"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.ContactRequest ||
  mongoose.model("ContactRequest", ContactRequestSchema);
