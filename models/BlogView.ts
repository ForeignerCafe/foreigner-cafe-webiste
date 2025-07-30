import mongoose from "mongoose"

export interface BlogView {
  _id: string
  blogId: mongoose.Types.ObjectId
  blogSlug: string
  ipAddress: string
  sessionId: string
  userAgent: string
  deviceType: "Mobile" | "Tablet" | "Desktop"
  browser: string
  os: string
  country?: string
  city?: string
  viewedAt: Date
  createdAt: Date
}

const BlogViewSchema = new mongoose.Schema(
  {
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true, index: true },
    blogSlug: { type: String, required: true, index: true },
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
    viewedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true },
)

// Compound indexes for efficient queries
BlogViewSchema.index({ blogId: 1, viewedAt: -1 })
BlogViewSchema.index({ blogSlug: 1, viewedAt: -1 })
BlogViewSchema.index({ ipAddress: 1, sessionId: 1, blogId: 1, viewedAt: 1 })

export default mongoose.models.BlogView || mongoose.model("BlogView", BlogViewSchema)
