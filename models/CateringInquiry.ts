import mongoose, { Schema, type Document } from "mongoose"

export interface ICateringInquiry extends Document {
  name: string
  email: string
  phone?: string
  guests: number
  eventType: string
  eventDate: string
  eventTime: string
  budget?: string
  dietaryNeeds?: string
  amenities?: string
  ownItems?: string
  eventDuration?: string
  accessibility?: string
  finalizeDate?: string
  status: "pending" | "read" | "archived"
  createdAt: Date
  updatedAt: Date
}

const CateringInquirySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    guests: { type: Number, required: true },
    eventType: { type: String, required: true },
    eventDate: { type: String, required: true }, // Storing as string for simplicity with HTML date input
    eventTime: { type: String, required: true }, // Storing as string for simplicity with HTML time input
    budget: { type: String, required: false },
    dietaryNeeds: { type: String, required: false },
    amenities: { type: String, required: false },
    ownItems: { type: String, required: false },
    eventDuration: { type: String, required: false },
    accessibility: { type: String, required: false },
    finalizeDate: { type: String, required: false }, // Storing as string for simplicity with HTML date input
    status: {
      type: String,
      enum: ["pending", "read", "archived"],
      default: "pending",
    },
  },
  { timestamps: true },
)

const CateringInquiry =
  mongoose.models.CateringInquiry || mongoose.model<ICateringInquiry>("CateringInquiry", CateringInquirySchema)

export default CateringInquiry
