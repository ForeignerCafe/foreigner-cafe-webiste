import mongoose from "mongoose";

const HighlightSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  imageUrl: String,
  category: {
    type: String,
    enum: ["menu", "event", "offer", "news", "other"],
    default: "other",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Highlight ||
  mongoose.model("Highlight", HighlightSchema);
