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

// Hero Parallax Products Schema
const HeroParallaxProductsSchema = new mongoose.Schema(
  {
    products: [
      {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        link: { type: String, required: true },
        thumbnail: { type: String, required: true },
      },
    ],
    rowConfiguration: {
      firstRowCount: { type: Number, default: 8 },
      secondRowCount: { type: Number, default: 8 },
      thirdRowCount: { type: Number, default: 9 },
    },
  },
  { timestamps: true },
)

// What's On Section Schema (events-section.tsx)
const WhatsOnSectionSchema = new mongoose.Schema(
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

// Events Section Schema (eventsSection.tsx) - This is for a section on the homepage
const EventsSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, default: "Where Stories Come to Life" },
    description: { type: String, required: true },
    buttonText: { type: String, required: true, default: "Explore All Events" },
    buttonLink: { type: String, required: true, default: "/events" },
    eventImages: [
      {
        src: { type: String, required: true },
        alt: { type: String, required: true },
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

// Updated Experiences Section Schema with rich content and slug
const ExperiencesSectionSchema = new mongoose.Schema(
  {
    experiences: [
      {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        content: { type: String, required: true }, // Rich HTML content
        imageSrc: { type: String, required: true },
        alt: { type: String },
        buttonText: { type: String, required: true },
        isPublished: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
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

// FAQs Schema
const FAQsSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, default: "FREQUENTLY ASKED QUESTIONS" },
    subtitle: { type: String, required: true, default: "Everything you need to know about visiting Foreigner Cafe" },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
)

// Gallery Schema
const GallerySchema = new mongoose.Schema(
  {
    sections: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        description: { type: String },
        images: [
          {
            id: { type: Number, required: true },
            src: { type: String, required: true },
            alt: { type: String, required: true },
            caption: { type: String },
          },
        ],
      },
    ],
  },
  { timestamps: true },
)

// Header/Navigation Schema
const HeaderContentSchema = new mongoose.Schema(
  {
    logo: { type: String, required: true, default: "FOREIGNER CAFE" },
    topNavItems: [
      {
        label: { type: String, required: true },
        href: { type: String, required: true },
        isExternal: { type: Boolean, default: false },
      },
    ],
    mainNavItems: [
      {
        label: { type: String, required: true },
        href: { type: String },
        action: { type: String }, // 'scroll', 'navigate', 'external'
        sectionId: { type: String },
      },
    ],
    reserveButtonText: { type: String, default: "RESERVE" },
  },
  { timestamps: true },
)

// Footer Schema
const FooterContentSchema = new mongoose.Schema(
  {
    sections: [
      {
        title: { type: String, required: true },
        links: [
          {
            label: { type: String, required: true },
            href: { type: String },
            action: { type: String }, // 'scroll', 'navigate', 'external', 'modal'
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
        icon: { type: String, required: true }, // icon name
      },
    ],
    newsletterSection: {
      title: { type: String, default: "STAY CONNECTED" },
      description: { type: String, default: "Receive The Foreigner Cafe news directly to you." },
    },
    copyright: { type: String, required: true },
  },
  { timestamps: true },
)

// New: Catering Page Content Schema
const CateringPageContentSchema = new mongoose.Schema(
  {
    hero: {
      cakeMenu: {
        image: { type: String, required: true },
        title: { type: String, required: true },
        buttonText: { type: String, required: true },
        buttonLink: { type: String, required: true },
      },
      fullMenu: {
        image: { type: String, required: true },
        title: { type: String, required: true },
        buttonText: { type: String, required: true },
        buttonLink: { type: String, required: true },
      },
    },
    cateringIntro: {
      image: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      menuLink: { type: String, required: true },
    },
    lunchPacks: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      items: [
        {
          id: { type: Number, required: true },
          title: { type: String, required: true },
          description: { type: String, required: true },
          price: { type: String, required: true },
          image: { type: String, required: true },
        },
      ],
    },
    cakeRange: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      items: [
        {
          id: { type: Number, required: true },
          title: { type: String, required: true },
          description: { type: String, required: true },
          price: { type: String, required: true },
          image: { type: String, required: true },
        },
      ],
    },
    cateringYourWay: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      items: [
        {
          id: { type: Number, required: true },
          src: { type: String, required: true },
          alt: { type: String, required: true },
          title: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
    },
  },
  { timestamps: true },
)

// New: Events Page Content Schema (for the main /events page)
const EventsPageContentSchema = new mongoose.Schema(
  {
    hero: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      backgroundImage: { type: String, required: true },
    },
    contentSections: [
      {
        id: { type: String, required: true }, // Using string for ID as in frontend state
        category: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        imagePosition: { type: String, enum: ["left", "right"], required: true },
      },
    ],
    eventSpaces: [
      {
        id: { type: String, required: true }, // Using string for ID as in frontend state
        name: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        capacity: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
)

// New: Event Carousel Content Schema
const EventCarouselContentSchema = new mongoose.Schema(
  {
    slides: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        leftImage: {
          src: { type: String, required: true },
          alt: { type: String, required: true },
        },
        rightImages: [
          {
            src: { type: String, required: true },
            alt: { type: String, required: true },
            text: { type: String },
          },
        ],
        topRightLinkText: { type: String, required: true },
      },
    ],
    bottomSection: {
      heading: { type: String, required: true },
      text: { type: String, required: true },
      buttonText: { type: String, required: true },
    },
  },
  { timestamps: true },
)

// Export models
export const HeroContent = mongoose.models.HeroContent || mongoose.model("HeroContent", HeroContentSchema)
export const HeroParallaxProducts =
  mongoose.models.HeroParallaxProducts || mongoose.model("HeroParallaxProducts", HeroParallaxProductsSchema)
export const WhatsOnSection = mongoose.models.WhatsOnSection || mongoose.model("WhatsOnSection", WhatsOnSectionSchema)
export const EventsSection = mongoose.models.EventsSection || mongoose.model("EventsSection", EventsSectionSchema)
export const BrandSection = mongoose.models.BrandSection || mongoose.model("BrandSection", BrandSectionSchema)
export const ExperiencesSection =
  mongoose.models.ExperiencesSection || mongoose.model("ExperiencesSection", ExperiencesSectionSchema)
export const DineDrinkContent =
  mongoose.models.DineDrinkContent || mongoose.model("DineDrinkContent", DineDrinkContentSchema)
export const FAQsSection = mongoose.models.FAQsSection || mongoose.model("FAQsSection", FAQsSectionSchema)
export const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema)
export const HeaderContent = mongoose.models.HeaderContent || mongoose.model("HeaderContent", HeaderContentSchema)
export const FooterContent = mongoose.models.FooterContent || mongoose.model("FooterContent", FooterContentSchema)

// New Exports
export const CateringPageContent =
  mongoose.models.CateringPageContent || mongoose.model("CateringPageContent", CateringPageContentSchema)
export const EventsPageContent =
  mongoose.models.EventsPageContent || mongoose.model("EventsPageContent", EventsPageContentSchema)
export const EventCarouselContent =
  mongoose.models.EventCarouselContent || mongoose.model("EventCarouselContent", EventCarouselContentSchema)
