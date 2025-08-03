import mongoose, { Schema, type Document } from "mongoose"

export interface IBlog extends Document {
  title: string
  slug: string
  content: string
  excerpt: string
  featuredImage: string
  category: mongoose.Types.ObjectId
  author: mongoose.Types.ObjectId
  tags: string[]
  isPublished: boolean
  publishedAt: Date
  readTime: number
  views: number
  createdAt: Date
  updatedAt: Date
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    featuredImage: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
    readTime: { type: Number, default: 5 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema)
export default Blog
