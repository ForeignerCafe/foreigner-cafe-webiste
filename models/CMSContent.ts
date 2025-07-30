import mongoose from "mongoose"

// Hero Content Schema
const HeroContentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
  },
  { timestamps: true },
)

// Events Section Schema (What's On section)
const EventsSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, default: "WHAT'S ON" },
    events: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        linkText: { type: String, required: true },
        linkHref: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
)

// Brand Section Schema (Cafe Story with story elements)
const BrandSectionSchema = new mongoose.Schema(
  {
    storyElements: [
      {
        id: { type: Number, required: true },
        layout: { type: String, enum: ["left", "right"], required: true },
        title: { type: String, required: true },
        text: { type: String, required: true },
        media: {
          type: { type: String, enum: ["image", "video"], required: true },
          src: { type: String, required: true },
          alt: { type: String },
          linkHref: { type: String },
        },
      },
    ],
  },
  { timestamps: true },
)

// Experiences Section Schema
const ExperiencesSectionSchema = new mongoose.Schema(
  {
    experiences: [
      {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        imageSrc: { type: String, required: true },
        alt: { type: String },
        linkText: { type: String, required: true },
        linkHref: { type: String, required: true },
      },
    ],
    testimonials: [
      {
        quote: { type: String, required: true },
        name: { type: String, required: true },
        avatar: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
)

// Dine & Drink Content Schema
const DineDrinkContentSchema = new mongoose.Schema(
  {
    venues: [
      {
        name: { type: String, required: true },
        location: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
)

// Export models
export const HeroContent = mongoose.models.HeroContent || mongoose.model("HeroContent", HeroContentSchema)
export const EventsSection = mongoose.models.EventsSection || mongoose.model("EventsSection", EventsSectionSchema)
export const BrandSection = mongoose.models.BrandSection || mongoose.model("BrandSection", BrandSectionSchema)
export const ExperiencesSection =
  mongoose.models.ExperiencesSection || mongoose.model("ExperiencesSection", ExperiencesSectionSchema)
export const DineDrinkContent =
  mongoose.models.DineDrinkContent || mongoose.model("DineDrinkContent", DineDrinkContentSchema)
