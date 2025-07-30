import mongoose from "mongoose"

export interface Visitor {
  _id: string
  ipAddress: string
  sessionId: string
  userAgent: string
  deviceType: "Mobile" | "Tablet" | "Desktop"
  browser: string
  os: string
  country?: string
  city?: string
  visitedAt: Date
  createdAt: Date
}

const VisitorSchema = new mongoose.Schema(
  {
    ipAddress: { type: String, required: true, index: true },
    sessionId: { type: String, required: true, index: true },
    userAgent: { type: String, required: true },
    deviceType: {
      type: String,
      enum: ["Mobile", "Tablet", "Desktop"],
      required: true,
      index: true,
    },
    browser: { type: String, required: true },
    os: { type: String, required: true },
    country: String,
    city: String,
    visitedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true },
)

// Compound index for unique visitor tracking per day
VisitorSchema.index({ ipAddress: 1, visitedAt: 1 })
VisitorSchema.index({ sessionId: 1, visitedAt: 1 })

export default mongoose.models.Visitor || mongoose.model("Visitor", VisitorSchema)
