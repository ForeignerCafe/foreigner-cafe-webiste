import mongoose, { Schema, type Document } from "mongoose"

// Hero Section
export interface IHeroContent extends Document {
  title: string
  subtitle: string
  backgroundImage: string
  ctaButton: {
    text: string
    link: string
  }
  createdAt: Date
  updatedAt: Date
}

const HeroContentSchema = new Schema<IHeroContent>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    backgroundImage: { type: String, required: true },
    ctaButton: {
      text: { type: String, required: true },
      link: { type: String, required: true },
    },
  },
  { timestamps: true },
)

export const HeroContent = mongoose.models.HeroContent || mongoose.model<IHeroContent>("HeroContent", HeroContentSchema)

// What's On Section
export interface IWhatsOnSection extends Document {
  title: string
  items: Array<{
    title: string
    description: string
    image: string
    link: string
  }>
  createdAt: Date
  updatedAt: Date
}

const WhatsOnSectionSchema = new Schema<IWhatsOnSection>(
  {
    title: { type: String, required: true },
    items: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
)

export const WhatsOnSection =
  mongoose.models.WhatsOnSection || mongoose.model<IWhatsOnSection>("WhatsOnSection", WhatsOnSectionSchema)

// Events Section
export interface IEventsSection extends Document {
  title: string
  description: string
  events: Array<{
    title: string
    description: string
    image: string
    date: string
    link: string
  }>
  createdAt: Date
  updatedAt: Date
}

const EventsSectionSchema = new Schema<IEventsSection>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    events: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        date: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
)

export const EventsSection =
  mongoose.models.EventsSection || mongoose.model<IEventsSection>("EventsSection", EventsSectionSchema)

// Brand Section
export interface IBrandSection extends Document {
  title: string
  description: string
  logos: Array<{
    name: string
    image: string
    link?: string
  }>
  createdAt: Date
  updatedAt: Date
}

const BrandSectionSchema = new Schema<IBrandSection>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    logos: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        link: { type: String },
      },
    ],
  },
  { timestamps: true },
)

export const BrandSection =
  mongoose.models.BrandSection || mongoose.model<IBrandSection>("BrandSection", BrandSectionSchema)

// Experiences Section
export interface IExperiencesSection extends Document {
  title: string
  description: string
  experiences: Array<{
    title: string
    description: string
    image: string
    features: string[]
    link: string
  }>
  createdAt: Date
  updatedAt: Date
}

const ExperiencesSectionSchema = new Schema<IExperiencesSection>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    experiences: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        features: [{ type: String }],
        link: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
)

export const ExperiencesSection =
  mongoose.models.ExperiencesSection ||
  mongoose.model<IExperiencesSection>("ExperiencesSection", ExperiencesSectionSchema)

// Dine & Drink Section
export interface IDineDrinkSection extends Document {
  title: string
  description: string
  items: Array<{
    title: string
    description: string
    image: string
    price?: string
    category: string
  }>
  createdAt: Date
  updatedAt: Date
}

const DineDrinkSectionSchema = new Schema<IDineDrinkSection>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    items: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: String },
        category: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
)

export const DineDrinkSection =
  mongoose.models.DineDrinkSection || mongoose.model<IDineDrinkSection>("DineDrinkSection", DineDrinkSectionSchema)

// Cafe Story Content
export interface ICafeStoryContent extends Document {
  sections: Array<{
    title: string
    content: string
    mainImage: string
    smallImage: string
  }>
  createdAt: Date
  updatedAt: Date
}

const CafeStoryContentSchema = new Schema<ICafeStoryContent>(
  {
    sections: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
        mainImage: { type: String, required: true },
        smallImage: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
)

export const CafeStoryContent =
  mongoose.models.CafeStoryContent || mongoose.model<ICafeStoryContent>("CafeStoryContent", CafeStoryContentSchema)

// Header Content
export interface IHeaderContent extends Document {
  logo: string
  topNavItems: Array<{
    label: string
    href?: string
    action?: string
    sectionId?: string
    isExternal?: boolean
  }>
  mainNavItems: Array<{
    label: string
    href?: string
    action?: string
    sectionId?: string
    isExternal?: boolean
  }>
  reserveButtonText: string
  createdAt: Date
  updatedAt: Date
}

const HeaderContentSchema = new Schema<IHeaderContent>(
  {
    logo: { type: String, required: true },
    topNavItems: [
      {
        label: { type: String, required: true },
        href: { type: String },
        action: { type: String },
        sectionId: { type: String },
        isExternal: { type: Boolean, default: false },
      },
    ],
    mainNavItems: [
      {
        label: { type: String, required: true },
        href: { type: String },
        action: { type: String },
        sectionId: { type: String },
        isExternal: { type: Boolean, default: false },
      },
    ],
    reserveButtonText: { type: String, required: true },
  },
  { timestamps: true },
)

export const HeaderContent =
  mongoose.models.HeaderContent || mongoose.model<IHeaderContent>("HeaderContent", HeaderContentSchema)

// Footer Content
export interface IFooterContent extends Document {
  sections: Array<{
    title: string
    links: Array<{
      label: string
      href?: string
      action?: string
      sectionId?: string
    }>
  }>
  contactInfo: {
    address: string
    phone: string
    email: string
    hours: {
      weekdays: string
      weekends: string
    }
  }
  socialMedia: Array<{
    platform: string
    url: string
    icon: string
  }>
  newsletterSection: {
    title: string
    description: string
  }
  copyright: string
  createdAt: Date
  updatedAt: Date
}

const FooterContentSchema = new Schema<IFooterContent>(
  {
    sections: [
      {
        title: { type: String, required: true },
        links: [
          {
            label: { type: String, required: true },
            href: { type: String },
            action: { type: String },
            sectionId: { type: String },
          },
        ],
      },
    ],
    contactInfo: {
      address: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      hours: {
        weekdays: { type: String, required: true },
        weekends: { type: String, required: true },
      },
    },
    socialMedia: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
        icon: { type: String, required: true },
      },
    ],
    newsletterSection: {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
    copyright: { type: String, required: true },
  },
  { timestamps: true },
)

export const FooterContent =
  mongoose.models.FooterContent || mongoose.model<IFooterContent>("FooterContent", FooterContentSchema)

// FAQ Content
export interface IFAQContent extends Document {
  title: string
  description: string
  categories: Array<{
    name: string
    faqs: Array<{
      question: string
      answer: string
    }>
  }>
  createdAt: Date
  updatedAt: Date
}

const FAQContentSchema = new Schema<IFAQContent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    categories: [
      {
        name: { type: String, required: true },
        faqs: [
          {
            question: { type: String, required: true },
            answer: { type: String, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true },
)

export const FAQContent = mongoose.models.FAQContent || mongoose.model<IFAQContent>("FAQContent", FAQContentSchema)

// Gallery Content
export interface IGalleryContent extends Document {
  title: string
  description: string
  categories: Array<{
    name: string
    images: Array<{
      url: string
      alt: string
      caption?: string
    }>
  }>
  createdAt: Date
  updatedAt: Date
}

const GalleryContentSchema = new Schema<IGalleryContent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    categories: [
      {
        name: { type: String, required: true },
        images: [
          {
            url: { type: String, required: true },
            alt: { type: String, required: true },
            caption: { type: String },
          },
        ],
      },
    ],
  },
  { timestamps: true },
)

export const GalleryContent =
  mongoose.models.GalleryContent || mongoose.model<IGalleryContent>("GalleryContent", GalleryContentSchema)

// Hero Parallax Content
export interface IHeroParallaxContent extends Document {
  products: Array<{
    id: number
    title: string
    link: string
    thumbnail: string
  }>
  createdAt: Date
  updatedAt: Date
}

const HeroParallaxContentSchema = new Schema<IHeroParallaxContent>(
  {
    products: [
      {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        link: { type: String, required: true },
        thumbnail: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
)

export const HeroParallaxContent =
  mongoose.models.HeroParallaxContent ||
  mongoose.model<IHeroParallaxContent>("HeroParallaxContent", HeroParallaxContentSchema)
