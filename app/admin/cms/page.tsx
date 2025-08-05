"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Save, Loader2, Video, ImageIcon } from "lucide-react"
import toast from "react-hot-toast"
import axiosInstance from "@/lib/axios"
import { LivePreviewPanel, LivePreviewToggle } from "@/components/cms-live-preview"
import { FormSkeleton } from "@/components/ui/skeleton-components"

interface HeroContent {
  title: string
  subtitle: string
  description: string
  videoUrl: string
}

interface HeroParallaxProduct {
  id: number
  title: string
  link: string
  thumbnail: string
}

interface HeroParallaxData {
  products: HeroParallaxProduct[]
  rowConfiguration: {
    firstRowCount: number
    secondRowCount: number
    thirdRowCount: number
  }
}

interface WhatsOnEvent {
  title: string
  description: string
  image: string
  linkText: string
  linkHref: string
}

interface WhatsOnSection {
  title: string
  events: WhatsOnEvent[]
}

interface EventImage {
  src: string
  alt: string
}

interface EventsSection {
  title: string
  description: string
  buttonText: string
  buttonLink: string
  eventImages: EventImage[]
}

interface StoryElement {
  id: number
  layout: "left" | "right"
  title: string
  text: string
  media: {
    type: "image" | "video"
    src: string
    alt?: string
    linkHref?: string
  }
}

interface BrandSection {
  storyElements: StoryElement[]
}

interface Experience {
  id: number
  title: string
  description: string
  imageSrc: string
  alt?: string
  linkText: string
  linkHref: string
}

interface Testimonial {
  quote: string
  name: string
  avatar: string
}

interface ExperiencesSection {
  experiences: Experience[]
  testimonials: Testimonial[]
}

interface Venue {
  name: string
  location: string
  description: string
  image: string
}

interface DineDrinkContent {
  venues: Venue[]
}

interface FAQ {
  question: string
  answer: string
}

interface FAQsSection {
  title: string
  subtitle: string
  faqs: FAQ[]
}

interface GalleryImage {
  id: number
  src: string
  alt: string
  caption?: string
}

interface GallerySection {
  id: number
  name: string
  description?: string
  images: GalleryImage[]
}

interface Gallery {
  sections: GallerySection[]
}

interface HeaderNavItem {
  label: string
  href?: string
  action?: string
  sectionId?: string
  isExternal?: boolean
}

interface HeaderContent {
  logo: string
  topNavItems: HeaderNavItem[]
  mainNavItems: HeaderNavItem[]
  reserveButtonText: string
}

interface FooterLink {
  label: string
  href?: string
  action?: string
  sectionId?: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface SocialMedia {
  platform: string
  url: string
  icon: string
}

interface FooterContent {
  sections: FooterSection[]
  contactInfo: {
    address: string
    phone: string
    email: string
    hours: {
      weekdays: string
      weekends: string
    }
  }
  socialMedia: SocialMedia[]
  newsletterSection: {
    title: string
    description: string
  }
  copyright: string
}

export default function CMSPage() {
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [livePreviewEnabled, setLivePreviewEnabled] = useState(false)
  const [activePreviewSection, setActivePreviewSection] = useState<string>("")
  const [previewData, setPreviewData] = useState<any>(null)

  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: "",
    subtitle: "",
    description: "",
    videoUrl: "",
  })
  const [heroParallaxData, setHeroParallaxData] = useState<HeroParallaxData>({
    products: [],
    rowConfiguration: {
      firstRowCount: 8,
      secondRowCount: 8,
      thirdRowCount: 9,
    },
  })
  const [whatsOnSection, setWhatsOnSection] = useState<WhatsOnSection>({
    title: "",
    events: [],
  })
  const [eventsSection, setEventsSection] = useState<EventsSection>({
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    eventImages: [],
  })
  const [brandSection, setBrandSection] = useState<BrandSection>({
    storyElements: [],
  })
  const [experiencesSection, setExperiencesSection] = useState<ExperiencesSection>({
    experiences: [],
    testimonials: [],
  })
  const [dineDrinkContent, setDineDrinkContent] = useState<DineDrinkContent>({
    venues: [],
  })
  const [faqsSection, setFaqsSection] = useState<FAQsSection>({
    title: "",
    subtitle: "",
    faqs: [],
  })
  const [gallery, setGallery] = useState<Gallery>({
    sections: [],
  })
  const [headerContent, setHeaderContent] = useState<HeaderContent>({
    logo: "",
    topNavItems: [],
    mainNavItems: [],
    reserveButtonText: "",
  })
  const [footerContent, setFooterContent] = useState<FooterContent>({
    sections: [],
    contactInfo: {
      address: "",
      phone: "",
      email: "",
      hours: {
        weekdays: "",
        weekends: "",
      },
    },
    socialMedia: [],
    newsletterSection: {
      title: "",
      description: "",
    },
    copyright: "",
  })

  // Fetch all content on component mount
  useEffect(() => {
    fetchAllContent()
  }, [])

  const fetchAllContent = async () => {
    try {
      setInitialLoading(true)
      const [
        heroRes,
        heroParallaxRes,
        whatsOnRes,
        eventsRes,
        brandRes,
        experiencesRes,
        dineDrinkRes,
        faqsRes,
        galleryRes,
        headerRes,
        footerRes,
      ] = await Promise.all([
        axiosInstance.get("/api/cms/hero"),
        axiosInstance.get("/api/cms/hero-parallax"),
        axiosInstance.get("/api/cms/whats-on"),
        axiosInstance.get("/api/cms/events"),
        axiosInstance.get("/api/cms/brand-section"),
        axiosInstance.get("/api/cms/experiences"),
        axiosInstance.get("/api/cms/dine-drink"),
        axiosInstance.get("/api/cms/faqs"),
        axiosInstance.get("/api/cms/gallery"),
        axiosInstance.get("/api/cms/header"),
        axiosInstance.get("/api/cms/footer"),
      ])

      if (heroRes.data.success) setHeroContent(heroRes.data.data)
      if (heroParallaxRes.data.success) setHeroParallaxData(heroParallaxRes.data.data)
      if (whatsOnRes.data.success) setWhatsOnSection(whatsOnRes.data.data)
      if (eventsRes.data.success) setEventsSection(eventsRes.data.data)
      if (brandRes.data.success) setBrandSection(brandRes.data.data)
      if (experiencesRes.data.success) setExperiencesSection(experiencesRes.data.data)
      if (dineDrinkRes.data.success) setDineDrinkContent(dineDrinkRes.data.data)
      if (faqsRes.data.success) setFaqsSection(faqsRes.data.data)
      if (galleryRes.data.success) setGallery(galleryRes.data.data)
      if (headerRes.data.success) setHeaderContent(headerRes.data.data)
      if (footerRes.data.success) setFooterContent(footerRes.data.data)
    } catch (error) {
      toast.error("Failed to fetch content")
    } finally {
      setInitialLoading(false)
    }
  }

  // Update preview data when content changes
  const updatePreviewData = (sectionType: string, data: any) => {
    if (livePreviewEnabled) {
      setActivePreviewSection(sectionType)
      setPreviewData(data)
    }
  }

  // Hero Section Handlers
  const handleHeroSave = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.put("/api/cms/hero", heroContent)
      if (response.data.success) {
        toast.success("Hero content updated successfully!")
        updatePreviewData("hero", heroContent)
      } else {
        toast.error("Failed to update hero content")
      }
    } catch (error) {
      toast.error("Failed to update hero content")
    } finally {
      setLoading(false)
    }
  }

  // Hero Parallax Handlers
  const handleHeroParallaxAddProduct = () => {
    const newId = Math.max(...heroParallaxData.products.map((p) => p.id), 0) + 1
    setHeroParallaxData((prev) => ({
      ...prev,
      products: [...prev.products, { id: newId, title: "", link: "", thumbnail: "" }],
    }))
  }

  const handleHeroParallaxRemoveProduct = (id: number) => {
    setHeroParallaxData((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }))
  }

  const handleHeroParallaxUpdateProduct = (id: number, field: keyof HeroParallaxProduct, value: string | number) => {
    setHeroParallaxData((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }))
  }

  const handleHeroParallaxSave = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.put("/api/cms/hero-parallax", heroParallaxData)
      if (response.data.success) {
        toast.success("Hero Parallax updated successfully!")
      } else {
        toast.error("Failed to update Hero Parallax")
      }
    } catch (error) {
      toast.error("Failed to update Hero Parallax")
    } finally {
      setLoading(false)
    }
  }

  // What's On Section Handlers
  const handleWhatsOnAddEvent = () => {
    setWhatsOnSection((prev) => ({
      ...prev,
      events: [...prev.events, { title: "", description: "", image: "", linkText: "", linkHref: "" }],
    }))
  }
  const handleWhatsOnRemoveEvent = (index: number) => {
    setWhatsOnSection((prev) => ({
      ...prev,
      events: prev.events.filter((_, i) => i !== index),
    }))
  }
  const handleWhatsOnUpdateEvent = (index: number, field: keyof WhatsOnEvent, value: string) => {
    const updatedSection = {
      ...whatsOnSection,
      events: whatsOnSection.events.map((event, i) => (i === index ? { ...event, [field]: value } : event)),
    }
    setWhatsOnSection(updatedSection)
    updatePreviewData("whats-on", updatedSection)
  }
  const handleWhatsOnSave = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.put("/api/cms/whats-on", whatsOnSection)
      if (response.data.success) {
        toast.success("What's On section updated successfully!")
      } else {
        toast.error("Failed to update What's On section")
      }
    } catch (error) {
      toast.error("Failed to update What's On section")
    } finally {
      setLoading(false)
    }
  }

  // Events Section Handlers
  const handleEventsAddImage = () => {
    setEventsSection((prev) => ({
      ...prev,
      eventImages: [...prev.eventImages, { src: "", alt: "" }],
    }))
  }
  const handleEventsRemoveImage = (index: number) => {
    setEventsSection((prev) => ({
      ...prev,
      eventImages: prev.eventImages.filter((_, i) => i !== index),
    }))
  }
  const handleEventsUpdateImage = (index: number, field: keyof EventImage, value: string) => {
    setEventsSection((prev) => ({
      ...prev,
      eventImages: prev.eventImages.map((image, i) => (i === index ? { ...image, [field]: value } : image)),
    }))
  }
  const handleEventsSave = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.put("/api/cms/events", eventsSection)
      if (response.data.success) {
        toast.success("Events section updated successfully!")
      } else {
        toast.error("Failed to update events section")
      }
    } catch (error) {
      toast.error("Failed to update events section")
    } finally {
      setLoading(false)
    }
  }

  // Brand Section Handlers
  const handleBrandAddStoryElement = () => {
    const newId = Math.max(...brandSection.storyElements.map((el) => el.id), 0) + 1
    setBrandSection((prev) => ({
      storyElements: [
        ...prev.storyElements,
        {
          id: newId,
          layout: "right",
          title: "",
          text: "",
          media: {
            type: "image",
            src: "",
            alt: "",
            linkHref: "",
          },
        },
      ],
    }))
  }
  const handleBrandRemoveStoryElement = (id: number) => {
    setBrandSection((prev) => ({
      storyElements: prev.storyElements.filter((el) => el.id !== id),
    }))
  }
  const handleBrandUpdateStoryElement = (id: number, field: string, value: any) => {
    const updatedSection = {
      storyElements: brandSection.storyElements.map((el) =>
        el.id === id
          ? field.includes("media.")
            ? { ...el, media: { ...el.media, [field.split(".")[1]]: value } }
            : { ...el, [field]: value }
          : el,
      ),
    }
    setBrandSection(updatedSection)
    updatePreviewData("brand", updatedSection)
  }
  const handleBrandSave = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.put("/api/cms/brand-section", brandSection)
      if (response.data.success) {
        toast.success("Brand section updated successfully!")
      } else {
        toast.error("Failed to update brand section")
      }
    } catch (error) {
      toast.error("Failed to update brand section")
    } finally {
      setLoading(false)
    }
  }

  // Experiences Section Handlers
  const handleExperiencesAddExperience = () => {
    const newId = Math.max(...experiencesSection.experiences.map((exp) => exp.id), 0) + 1
    setExperiencesSection((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: newId,
          title: "",
          description: "",
          imageSrc: "",
          alt: "",
          linkText: "",
          linkHref: "",
        },
      ],
    }))
  }
  const handleExperiencesRemoveExperience = (id: number) => {
    setExperiencesSection((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }))
  }
  const handleExperiencesUpdateExperience = (id: number, field: keyof Experience, value: string | number) => {
    const updatedSection = {
      ...experiencesSection,
      experiences: experiencesSection.experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }
    setExperiencesSection(updatedSection)
    updatePreviewData("experiences", updatedSection)
  }
  const handleExperiencesAddTestimonial = () => {
    setExperiencesSection((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, { quote: "", name: "", avatar: "" }],
    }))
  }
  const handleExperiencesRemoveTestimonial = (index: number) => {
    setExperiencesSection((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index),
    }))
  }
  const handleExperiencesUpdateTestimonial = (index: number, field: keyof Testimonial, value: string) => {
    const updatedSection = {
      ...experiencesSection,
      testimonials: experiencesSection.testimonials.map((testimonial, i) =>
        i === index ? { ...testimonial, [field]: value } : testimonial,
      ),
    }
    setExperiencesSection(updatedSection)
    updatePreviewData("experiences", updatedSection)
  }
  const handleExperiencesSave = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.put("/api/cms/experiences", experiencesSection)
      if (response.data.success) {
        toast.success("Experiences section updated successfully!")
      } else {
        toast.error("Failed to update experiences section")
      }
    } catch (error) {
      toast.error("Failed to update experiences section")
    } finally {
      setLoading(false)
    }
  }

  // Dine & Drink Section Handlers
  const handleDineDrinkAddVenue = () => {
    setDineDrinkContent((prev) => ({
      venues: [...prev.venues, { name: "", location: "", description: "", image: "" }],
    }))
  }
  const handleDineDrinkRemoveVenue = (index: number) => {
    setDineDrinkContent((prev) => ({
      venues: prev.venues.filter((_, i) => i !== index),
    }))
  }
  const handleDineDrinkUpdateVenue = (index: number, field: keyof Venue, value: string) => {
    const updatedContent = {
      venues: dineDrinkContent.venues.map((venue, i) => (i === index ? { ...venue, [field]: value } : venue)),
    }
    setDineDrinkContent(updatedContent)
    updatePreviewData("dine-drink", updatedContent)
  }
  const handleDineDrinkSave = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.put("/api/cms/dine-drink", dineDrinkContent)
      if (response.data.success) {
        toast.success("Dine & Drink content updated successfully!")
      } else {
        toast.error("Failed to update dine & drink content")
      }
    } catch (error) {
      toast.error("Failed to update dine & drink content")
    } finally {
      setLoading(false)
    }
  }

  // FAQs Section Handlers
  const handleFAQsAddFAQ = () => {
    setFaqsSection((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }))
  }
  const handleFAQsRemoveFAQ = (index: number) => {
    setFaqsSection((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }))
  }
  const handleFAQsUpdateFAQ = (index: number, field: keyof FAQ, value: string) => {
    const updatedSection = {
      ...faqsSection,
      faqs: faqsSection.faqs.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq)),
    }
    setFaqsSection(updatedSection)
    updatePreviewData("faqs", updatedSection)
  }
  const handleFAQsSave = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.put("/api/cms/faqs", faqsSection)
      if (response.data.success) {
        toast.success("FAQs section updated successfully!")
      } else {
        toast.error("Failed to update FAQs section")
      }
    } catch (error) {
      toast.error("Failed to update FAQs section")
    } finally {
      setLoading(false)
    }
  }

  // Gallery Handlers
  const handleGalleryAddSection = () => {
    const newId = Math.max(...gallery.sections.map((s) => s.id), 0) + 1
    setGallery((prev) => ({
      sections: [...prev.sections, { id: newId, name: "", description: "", images: [] }],
    }))
  }
  const handleGalleryRemoveSection = (id: number) => {
    setGallery((prev) => ({
      sections: prev.sections.filter((s) => s.id !== id),
    }))
  }
  const handleGalleryUpdateSection = (id: number, field: string, value: string) => {
    setGallery((prev) => ({
      sections: prev.sections.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }))
  }
  const handleGalleryAddImage = (sectionId: number) => {
    setGallery((prev) => ({
      sections: prev.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              images: [
                ...s.images,
                { id: Math.max(...s.images.map((img) => img.id), 0) + 1, src: "", alt: "", caption: "" },
              ],
            }
          : s,
      ),
    }))
  }
  const handleGalleryRemoveImage = (sectionId: number, imageId: number) => {
    setGallery((prev) => ({
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, images: s.images.filter((img) => img.id !== imageId) } : s,
      ),
    }))
  }
  const handleGalleryUpdateImage = (
    sectionId: number,
    imageId: number,
    field: keyof GalleryImage,
    value: string | number,
  ) => {
    setGallery((prev) => ({
      sections: prev.sections.map((s) =>
        s.id === sectionId
          ? { ...s, images: s.images.map((img) => (img.id === imageId ? { ...img, [field]: value } : img)) }
          : s,
      ),
    }))
  }
  const handleGallerySave = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.put("/api/cms/gallery", gallery)
      if (response.data.success) {
        toast.success("Gallery updated successfully!")
      } else {
        toast.error("Failed to update gallery")
      }
    } catch (error) {
      toast.error("Failed to update gallery")
    } finally {
      setLoading(false)
    }
  }

  // Header Handlers
  const handleHeaderAddTopNavItem = () => {
    setHeaderContent((prev) => ({
      ...prev,
      topNavItems: [...prev.topNavItems, { label: "", href: "", isExternal: false }],
    }))
  }
  const handleHeaderRemoveTopNavItem = (index: number) => {
    setHeaderContent((prev) => ({
      ...prev,
      topNavItems: prev.topNavItems.filter((_, i) => i !== index),
    }))
  }
  const handleHeaderUpdateTopNavItem = (index: number, field: keyof HeaderNavItem, value: string | boolean) => {
    setHeaderContent((prev) => ({
      ...prev,
      topNavItems: prev.topNavItems.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }
  const handleHeaderAddMainNavItem = () => {
    setHeaderContent((prev) => ({
      ...prev,
      mainNavItems: [...prev.mainNavItems, { label: "", action: "navigate", href: "" }],
    }))
  }
  const handleHeaderRemoveMainNavItem = (index: number) => {
    setHeaderContent((prev) => ({
      ...prev,
      mainNavItems: prev.mainNavItems.filter((_, i) => i !== index),
    }))
  }
  const handleHeaderUpdateMainNavItem = (index: number, field: keyof HeaderNavItem, value: string) => {
    setHeaderContent((prev) => ({
      ...prev,
      mainNavItems: prev.mainNavItems.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }
  const handleHeaderSave = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.put("/api/cms/header", headerContent)
      if (response.data.success) {
        toast.success("Header content updated successfully!")
      } else {
        toast.error("Failed to update header content")
      }
    } catch (error) {
      toast.error("Failed to update header content")
    } finally {
      setLoading(false)
    }
  }

  // Footer Handlers
  const handleFooterAddSection = () => {
    setFooterContent((prev) => ({
      ...prev,
      sections: [...prev.sections, { title: "", links: [] }],
    }))
  }
  const handleFooterRemoveSection = (index: number) => {
    setFooterContent((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }))
  }
  const handleFooterUpdateSection = (index: number, field: string, value: string) => {
    setFooterContent((prev) => ({
      ...prev,
      sections: prev.sections.map((section, i) => (i === index ? { ...section, [field]: value } : section)),
    }))
  }
  const handleFooterAddLink = (sectionIndex: number) => {
    setFooterContent((prev) => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex
          ? { ...section, links: [...section.links, { label: "", action: "navigate", href: "" }] }
          : section,
      ),
    }))
  }
  const handleFooterRemoveLink = (sectionIndex: number, linkIndex: number) => {
    setFooterContent((prev) => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? { ...section, links: section.links.filter((_, li) => li !== linkIndex) } : section,
      ),
    }))
  }
  const handleFooterUpdateLink = (sectionIndex: number, linkIndex: number, field: keyof FooterLink, value: string) => {
    setFooterContent((prev) => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex
          ? {
              ...section,
              links: section.links.map((link, li) => (li === linkIndex ? { ...link, [field]: value } : link)),
            }
          : section,
      ),
    }))
  }
  const handleFooterAddSocialMedia = () => {
    setFooterContent((prev) => ({
      ...prev,
      socialMedia: [...prev.socialMedia, { platform: "", url: "", icon: "" }],
    }))
  }
  const handleFooterRemoveSocialMedia = (index: number) => {
    setFooterContent((prev) => ({
      ...prev,
      socialMedia: prev.socialMedia.filter((_, i) => i !== index),
    }))
  }
  const handleFooterUpdateSocialMedia = (index: number, field: keyof SocialMedia, value: string) => {
    setFooterContent((prev) => ({
      ...prev,
      socialMedia: prev.socialMedia.map((social, i) => (i === index ? { ...social, [field]: value } : social)),
    }))
  }
  const handleFooterSave = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.put("/api/cms/footer", footerContent)
      if (response.data.success) {
        toast.success("Footer content updated successfully!")
      } else {
        toast.error("Failed to update footer content")
      }
    } catch (error) {
      toast.error("Failed to update footer content")
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="h-8 bg-gray-200 rounded w-96 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
        </div>
        <div className="space-y-6">
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          <FormSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <LivePreviewToggle isEnabled={livePreviewEnabled} onToggle={setLivePreviewEnabled} />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Content Management System</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Manage your website content sections</p>
      </div>
      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 xs:grid-cols-4 md:grid-cols-5 lg:grid-cols-11 gap-2 p-2 !rounded-lg bg-muted h-auto text-center items-center justify-between">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="hero-parallax">Parallax</TabsTrigger>
          <TabsTrigger value="whats-on">What's On</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="brand">Cafe Story</TabsTrigger>
          <TabsTrigger value="experiences">Experiences</TabsTrigger>
          <TabsTrigger value="dine-drink">Dine & Drink</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>
                Manage the main hero section of your homepage including the background video
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="hero-title">Title</Label>
                <Input
                  id="hero-title"
                  value={heroContent.title}
                  onChange={(e) => {
                    const updatedContent = { ...heroContent, title: e.target.value }
                    setHeroContent(updatedContent)
                    updatePreviewData("hero", updatedContent)
                  }}
                  placeholder="Enter hero title"
                />
              </div>
              <div>
                <Label htmlFor="hero-subtitle">Subtitle</Label>
                <Input
                  id="hero-subtitle"
                  value={heroContent.subtitle}
                  onChange={(e) => {
                    const updatedContent = { ...heroContent, subtitle: e.target.value }
                    setHeroContent(updatedContent)
                    updatePreviewData("hero", updatedContent)
                  }}
                  placeholder="Enter hero subtitle"
                />
              </div>
              <div>
                <Label htmlFor="hero-description">Description</Label>
                <Textarea
                  id="hero-description"
                  value={heroContent.description}
                  onChange={(e) => {
                    const updatedContent = { ...heroContent, description: e.target.value }
                    setHeroContent(updatedContent)
                    updatePreviewData("hero", updatedContent)
                  }}
                  placeholder="Enter hero description"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="hero-video" className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Background Video URL
                </Label>
                <Input
                  id="hero-video"
                  value={heroContent.videoUrl}
                  onChange={(e) => setHeroContent((prev) => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="Enter video URL (e.g., /videos/hero.mp4 or https://example.com/video.mp4)"
                />
                <p className="text-sm text-gray-500 mt-1">Use local paths like /videos/hero.mp4 or external URLs</p>
              </div>
              <Button onClick={handleHeroSave} disabled={loading} className="w-full md:w-auto">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Hero Content
              </Button>
              <LivePreviewPanel isEnabled={livePreviewEnabled} sectionId="hero" previewData={heroContent} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hero Parallax Section */}
        <TabsContent value="hero-parallax">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Hero Parallax Products</CardTitle>
              <CardDescription>Manage the parallax scrolling products section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Row Configuration */}
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-[#28282B]">
                <h3 className="text-lg font-semibold mb-4">Row Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>First Row Count</Label>
                    <Input
                      type="number"
                      value={heroParallaxData.rowConfiguration.firstRowCount}
                      onChange={(e) =>
                        setHeroParallaxData((prev) => ({
                          ...prev,
                          rowConfiguration: {
                            ...prev.rowConfiguration,
                            firstRowCount: Number.parseInt(e.target.value) || 0,
                          },
                        }))
                      }
                      min="0"
                    />
                  </div>
                  <div>
                    <Label>Second Row Count</Label>
                    <Input
                      type="number"
                      value={heroParallaxData.rowConfiguration.secondRowCount}
                      onChange={(e) =>
                        setHeroParallaxData((prev) => ({
                          ...prev,
                          rowConfiguration: {
                            ...prev.rowConfiguration,
                            secondRowCount: Number.parseInt(e.target.value) || 0,
                          },
                        }))
                      }
                      min="0"
                    />
                  </div>
                  <div>
                    <Label>Third Row Count</Label>
                    <Input
                      type="number"
                      value={heroParallaxData.rowConfiguration.thirdRowCount}
                      onChange={(e) =>
                        setHeroParallaxData((prev) => ({
                          ...prev,
                          rowConfiguration: {
                            ...prev.rowConfiguration,
                            thirdRowCount: Number.parseInt(e.target.value) || 0,
                          },
                        }))
                      }
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Products</h3>
                  <Button onClick={handleHeroParallaxAddProduct} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </div>
                {heroParallaxData.products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4 shadow-sm bg-background">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Product {product.id}</h4>
                      <Button
                        onClick={() => handleHeroParallaxRemoveProduct(product.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={product.title}
                          onChange={(e) => handleHeroParallaxUpdateProduct(product.id, "title", e.target.value)}
                          placeholder="Enter product title"
                        />
                      </div>
                      <div>
                        <Label>Link</Label>
                        <Input
                          value={product.link}
                          onChange={(e) => handleHeroParallaxUpdateProduct(product.id, "link", e.target.value)}
                          placeholder="Enter product link"
                        />
                      </div>
                      <div>
                        <Label>Thumbnail URL</Label>
                        <Input
                          value={product.thumbnail}
                          onChange={(e) => handleHeroParallaxUpdateProduct(product.id, "thumbnail", e.target.value)}
                          placeholder="Enter thumbnail URL"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={handleHeroParallaxSave} disabled={loading} className="w-full md:w-auto">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Hero Parallax
              </Button>
              <LivePreviewPanel
                isEnabled={livePreviewEnabled}
                sectionId="hero-parallax" // or respective section id
                previewData={null}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* What's On Section */}
        <TabsContent value="whats-on">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>What's On Section</CardTitle>
              <CardDescription>Manage the "What's On" showcase section (events-section.tsx)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="whats-on-title">Section Title</Label>
                <Input
                  id="whats-on-title"
                  value={whatsOnSection.title}
                  onChange={(e) => {
                    const updatedSection = { ...whatsOnSection, title: e.target.value }
                    setWhatsOnSection(updatedSection)
                    updatePreviewData("whats-on", updatedSection)
                  }}
                  placeholder="Enter section title (e.g., WHAT'S ON)"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Events</h3>
                  <Button onClick={handleWhatsOnAddEvent} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                  </Button>
                </div>
                {whatsOnSection.events.map((event, index) => (
                  <div key={index} className="border rounded-lg p-4 shadow-sm bg-background">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Event {index + 1}</h4>
                      <Button onClick={() => handleWhatsOnRemoveEvent(index)} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label>Event Title</Label>
                        <Input
                          value={event.title}
                          onChange={(e) => handleWhatsOnUpdateEvent(index, "title", e.target.value)}
                          placeholder="Enter event title"
                        />
                      </div>
                      <div>
                        <Label>Event Image URL</Label>
                        <Input
                          value={event.image}
                          onChange={(e) => handleWhatsOnUpdateEvent(index, "image", e.target.value)}
                          placeholder="Enter image URL"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <Label>Description</Label>
                      <Textarea
                        value={event.description}
                        onChange={(e) => handleWhatsOnUpdateEvent(index, "description", e.target.value)}
                        placeholder="Enter event description"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Link Text</Label>
                        <Input
                          value={event.linkText}
                          onChange={(e) => handleWhatsOnUpdateEvent(index, "linkText", e.target.value)}
                          placeholder="Enter link text"
                        />
                      </div>
                      <div>
                        <Label>Link URL</Label>
                        <Input
                          value={event.linkHref}
                          onChange={(e) => handleWhatsOnUpdateEvent(index, "linkHref", e.target.value)}
                          placeholder="Enter link URL"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={handleWhatsOnSave} disabled={loading} className="w-full md:w-auto">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save What's On Section
              </Button>
              <LivePreviewPanel isEnabled={livePreviewEnabled} sectionId="whats-on" previewData={whatsOnSection} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Section */}
        <TabsContent value="events">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Events Section</CardTitle>
              <CardDescription>Manage the main events section with carousel (eventsSection.tsx)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="events-title">Section Title</Label>
                  <Input
                    id="events-title"
                    value={eventsSection.title}
                    onChange={(e) => setEventsSection((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter section title"
                  />
                </div>
                <div>
                  <Label htmlFor="events-button-text">Button Text</Label>
                  <Input
                    id="events-button-text"
                    value={eventsSection.buttonText}
                    onChange={(e) => setEventsSection((prev) => ({ ...prev, buttonText: e.target.value }))}
                    placeholder="Enter button text"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="events-description">Description</Label>
                <Textarea
                  id="events-description"
                  value={eventsSection.description}
                  onChange={(e) => setEventsSection((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter section description"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="events-button-link">Button Link</Label>
                <Input
                  id="events-button-link"
                  value={eventsSection.buttonLink}
                  onChange={(e) => setEventsSection((prev) => ({ ...prev, buttonLink: e.target.value }))}
                  placeholder="Enter button link URL"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Event Images</h3>
                  <Button onClick={handleEventsAddImage} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                </div>
                {eventsSection.eventImages.map((image, index) => (
                  <div key={index} className="border rounded-lg p-4 shadow-sm bg-background">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Image {index + 1}</h4>
                      <Button onClick={() => handleEventsRemoveImage(index)} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Image URL</Label>
                        <Input
                          value={image.src}
                          onChange={(e) => handleEventsUpdateImage(index, "src", e.target.value)}
                          placeholder="Enter image URL"
                        />
                      </div>
                      <div>
                        <Label>Alt Text</Label>
                        <Input
                          value={image.alt}
                          onChange={(e) => handleEventsUpdateImage(index, "alt", e.target.value)}
                          placeholder="Enter alt text"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={handleEventsSave} disabled={loading} className="w-full md:w-auto">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Events Section
              </Button>
              <LivePreviewPanel
                isEnabled={livePreviewEnabled}
                sectionId="events" // or respective section id
                previewData={null}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Brand Section (Cafe Story) */}
        <TabsContent value="brand">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Cafe Story Section</CardTitle>
              <CardDescription>Manage your cafe's story elements with images and videos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Story Elements</h3>
                <Button onClick={handleBrandAddStoryElement} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Story Element
                </Button>
              </div>
              {brandSection.storyElements.map((element) => (
                <div key={element.id} className="border rounded-lg p-4 shadow-sm bg-background">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Story Element {element.id}</h4>
                    <Button onClick={() => handleBrandRemoveStoryElement(element.id)} variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={element.title}
                        onChange={(e) => handleBrandUpdateStoryElement(element.id, "title", e.target.value)}
                        placeholder="Enter story title"
                      />
                    </div>
                    <div>
                      <Label>Layout</Label>
                      <Select
                        value={element.layout}
                        onValueChange={(value) => handleBrandUpdateStoryElement(element.id, "layout", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select layout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Media Left, Text Right</SelectItem>
                          <SelectItem value="right">Media Right, Text Left</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <Label>Story Text</Label>
                    <Textarea
                      value={element.text}
                      onChange={(e) => handleBrandUpdateStoryElement(element.id, "text", e.target.value)}
                      placeholder="Enter story text"
                      rows={4}
                    />
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <h5 className="font-medium mb-3 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                      {element.media.type === "image" ? (
                        <ImageIcon className="w-4 h-4" />
                      ) : (
                        <Video className="w-4 h-4" />
                      )}
                      Media Settings
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label>Media Type</Label>
                        <Select
                          value={element.media.type}
                          onValueChange={(value) => handleBrandUpdateStoryElement(element.id, "media.type", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select media type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="image">Image</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Media URL</Label>
                        <Input
                          value={element.media.src}
                          onChange={(e) => handleBrandUpdateStoryElement(element.id, "media.src", e.target.value)}
                          placeholder="Enter media URL"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Alt Text</Label>
                        <Input
                          value={element.media.alt || ""}
                          onChange={(e) => handleBrandUpdateStoryElement(element.id, "media.alt", e.target.value)}
                          placeholder="Enter alt text"
                        />
                      </div>
                      <div>
                        <Label>Link URL (optional)</Label>
                        <Input
                          value={element.media.linkHref || ""}
                          onChange={(e) => handleBrandUpdateStoryElement(element.id, "media.linkHref", e.target.value)}
                          placeholder="Enter link URL"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={handleBrandSave} disabled={loading} className="w-full md:w-auto">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Cafe Story Section
              </Button>
              <LivePreviewPanel isEnabled={livePreviewEnabled} sectionId="brand" previewData={brandSection} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Experiences Section */}
        <TabsContent value="experiences">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Experiences Section</CardTitle>
              <CardDescription>Manage experiences and testimonials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Experiences */}
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Experiences</h3>
                  <Button onClick={handleExperiencesAddExperience} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
                {experiencesSection.experiences.map((experience) => (
                  <div key={experience.id} className="border rounded-lg p-4 shadow-sm bg-background">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Experience {experience.id}</h4>
                      <Button
                        onClick={() => handleExperiencesRemoveExperience(experience.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label>Experience Title</Label>
                        <Input
                          value={experience.title}
                          onChange={(e) => handleExperiencesUpdateExperience(experience.id, "title", e.target.value)}
                          placeholder="Enter experience title"
                        />
                      </div>
                      <div>
                        <Label>Image URL</Label>
                        <Input
                          value={experience.imageSrc}
                          onChange={(e) => handleExperiencesUpdateExperience(experience.id, "imageSrc", e.target.value)}
                          placeholder="Enter image URL"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <Label>Description</Label>
                      <Textarea
                        value={experience.description}
                        onChange={(e) =>
                          handleExperiencesUpdateExperience(experience.id, "description", e.target.value)
                        }
                        placeholder="Enter experience description"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Alt Text</Label>
                        <Input
                          value={experience.alt || ""}
                          onChange={(e) => handleExperiencesUpdateExperience(experience.id, "alt", e.target.value)}
                          placeholder="Enter alt text"
                        />
                      </div>
                      <div>
                        <Label>Link Text</Label>
                        <Input
                          value={experience.linkText}
                          onChange={(e) => handleExperiencesUpdateExperience(experience.id, "linkText", e.target.value)}
                          placeholder="Enter link text"
                        />
                      </div>
                      <div>
                        <Label>Link URL</Label>
                        <Input
                          value={experience.linkHref}
                          onChange={(e) => handleExperiencesUpdateExperience(experience.id, "linkHref", e.target.value)}
                          placeholder="Enter link URL"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonials */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Testimonials</h3>
                  <Button onClick={handleExperiencesAddTestimonial} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Testimonial
                  </Button>
                </div>
                {experiencesSection.testimonials.map((testimonial, index) => (
                  <div key={index} className="border rounded-lg p-4 shadow-sm bg-background">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Testimonial {index + 1}</h4>
                      <Button onClick={() => handleExperiencesRemoveTestimonial(index)} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="mb-4">
                      <Label>Quote</Label>
                      <Textarea
                        value={testimonial.quote}
                        onChange={(e) => handleExperiencesUpdateTestimonial(index, "quote", e.target.value)}
                        placeholder="Enter testimonial quote"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Customer Name</Label>
                        <Input
                          value={testimonial.name}
                          onChange={(e) => handleExperiencesUpdateTestimonial(index, "name", e.target.value)}
                          placeholder="Enter customer name"
                        />
                      </div>
                      <div>
                        <Label>Avatar URL</Label>
                        <Input
                          value={testimonial.avatar}
                          onChange={(e) => handleExperiencesUpdateTestimonial(index, "avatar", e.target.value)}
                          placeholder="Enter avatar URL"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={handleExperiencesSave} disabled={loading} className="w-full md:w-auto">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Experiences Section
              </Button>
              <LivePreviewPanel
                isEnabled={livePreviewEnabled}
                sectionId="experiences"
                previewData={experiencesSection}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dine & Drink Section */}
        <TabsContent value="dine-drink">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Dine & Drink Section</CardTitle>
              <CardDescription>Manage your dining venues and bars</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Venues</h3>
                <Button onClick={handleDineDrinkAddVenue} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Venue
                </Button>
              </div>
              {dineDrinkContent.venues.map((venue, index) => (
                <div key={index} className="border rounded-lg p-4 shadow-sm bg-background">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Venue {index + 1}</h4>
                    <Button onClick={() => handleDineDrinkRemoveVenue(index)} variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label>Venue Name</Label>
                      <Input
                        value={venue.name}
                        onChange={(e) => handleDineDrinkUpdateVenue(index, "name", e.target.value)}
                        placeholder="Enter venue name"
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={venue.location}
                        onChange={(e) => handleDineDrinkUpdateVenue(index, "location", e.target.value)}
                        placeholder="Enter location"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={venue.description}
                        onChange={(e) => handleDineDrinkUpdateVenue(index, "description", e.target.value)}
                        placeholder="Enter venue description"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={venue.image}
                        onChange={(e) => handleDineDrinkUpdateVenue(index, "image", e.target.value)}
                        placeholder="Enter image URL"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={handleDineDrinkSave} disabled={loading} className="w-full md:w-auto">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Dine & Drink Content
              </Button>
              <LivePreviewPanel isEnabled={livePreviewEnabled} sectionId="dine-drink" previewData={dineDrinkContent} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQs Section */}
        <TabsContent value="faqs">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>FAQs Section</CardTitle>
              <CardDescription>Manage frequently asked questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="faqs-title">Section Title</Label>
                  <Input
                    id="faqs-title"
                    value={faqsSection.title}
                    onChange={(e) => {
                      const updatedSection = { ...faqsSection, title: e.target.value }
                      setFaqsSection(updatedSection)
                      updatePreviewData("faqs", updatedSection)
                    }}
                    placeholder="Enter section title"
                  />
                </div>
                <div>
                  <Label htmlFor="faqs-subtitle">Section Subtitle</Label>
                  <Input
                    id="faqs-subtitle"
                    value={faqsSection.subtitle}
                    onChange={(e) => {
                      const updatedSection = { ...faqsSection, subtitle: e.target.value }
                      setFaqsSection(updatedSection)
                      updatePreviewData("faqs", updatedSection)
                    }}
                    placeholder="Enter section subtitle"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">FAQs</h3>
                  <Button onClick={handleFAQsAddFAQ} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add FAQ
                  </Button>
                </div>
                {faqsSection.faqs.map((faq, index) => (
                  <div key={index} className="border rounded-lg p-4 shadow-sm bg-background">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">FAQ {index + 1}</h4>
                      <Button onClick={() => handleFAQsRemoveFAQ(index)} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label>Question</Label>
                        <Input
                          value={faq.question}
                          onChange={(e) => handleFAQsUpdateFAQ(index, "question", e.target.value)}
                          placeholder="Enter question"
                        />
                      </div>
                      <div>
                        <Label>Answer</Label>
                        <Textarea
                          value={faq.answer}
                          onChange={(e) => handleFAQsUpdateFAQ(index, "answer", e.target.value)}
                          placeholder="Enter answer"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={handleFAQsSave} disabled={loading} className="w-full md:w-auto">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save FAQs Section
              </Button>
              <LivePreviewPanel isEnabled={livePreviewEnabled} sectionId="faqs" previewData={faqsSection} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gallery Section */}
        <TabsContent value="gallery">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
              <CardDescription>Manage gallery sections and images</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Gallery Sections</h3>
                <Button onClick={handleGalleryAddSection} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Section
                </Button>
              </div>
              {gallery.sections.map((section) => (
                <div key={section.id} className="border rounded-lg p-4 shadow-sm bg-background">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">
                      Section: {section.name || `Section ${section.id}`}
                    </h4>
                    <Button onClick={() => handleGalleryRemoveSection(section.id)} variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label>Section Name</Label>
                      <Input
                        value={section.name}
                        onChange={(e) => handleGalleryUpdateSection(section.id, "name", e.target.value)}
                        placeholder="Enter section name"
                      />
                    </div>
                    <div>
                      <Label>Description (optional)</Label>
                      <Input
                        value={section.description || ""}
                        onChange={(e) => handleGalleryUpdateSection(section.id, "description", e.target.value)}
                        placeholder="Enter section description"
                      />
                    </div>
                  </div>

                  {/* Images for this section */}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="font-medium text-gray-700">Images</h5>
                      <Button onClick={() => handleGalleryAddImage(section.id)} size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Image
                      </Button>
                    </div>
                    {section.images.map((image) => (
                      <div key={image.id} className="border rounded p-3 mb-3 bg-gray-50 dark:bg-transparent">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Image {image.id}</span>
                          <Button
                            onClick={() => handleGalleryRemoveImage(section.id, image.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <Label className="text-xs">Image URL</Label>
                            <Input
                              value={image.src}
                              onChange={(e) => handleGalleryUpdateImage(section.id, image.id, "src", e.target.value)}
                              placeholder="Enter image URL"
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Alt Text</Label>
                            <Input
                              value={image.alt}
                              onChange={(e) => handleGalleryUpdateImage(section.id, image.id, "alt", e.target.value)}
                              placeholder="Enter alt text"
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Caption (optional)</Label>
                            <Input
                              value={image.caption || ""}
                              onChange={(e) =>
                                handleGalleryUpdateImage(section.id, image.id, "caption", e.target.value)
                              }
                              placeholder="Enter caption"
                              className="text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <Button onClick={handleGallerySave} disabled={loading} className="w-full md:w-auto">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Gallery
              </Button>
              <LivePreviewPanel
                isEnabled={livePreviewEnabled}
                sectionId="gallery" // or respective section id
                previewData={null}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Header Section */}
        <TabsContent value="header">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Header/Navigation</CardTitle>
              <CardDescription>Manage header content and navigation items</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="header-logo">Logo Text</Label>
                <Input
                  id="header-logo"
                  value={headerContent.logo}
                  onChange={(e) => setHeaderContent((prev) => ({ ...prev, logo: e.target.value }))}
                  placeholder="Enter logo text"
                />
              </div>
              <div>
                <Label htmlFor="header-reserve-button">Reserve Button Text</Label>
                <Input
                  id="header-reserve-button"
                  value={headerContent.reserveButtonText}
                  onChange={(e) => setHeaderContent((prev) => ({ ...prev, reserveButtonText: e.target.value }))}
                  placeholder="Enter reserve button text"
                />
              </div>

              {/* Top Navigation Items */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Top Navigation Items</h3>
                  <Button onClick={handleHeaderAddTopNavItem} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Top Nav Item
                  </Button>
                </div>
                {headerContent.topNavItems.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 shadow-sm bg-background">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Top Nav Item {index + 1}</h4>
                      <Button onClick={() => handleHeaderRemoveTopNavItem(index)} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Label</Label>
                        <Input
                          value={item.label}
                          onChange={(e) => handleHeaderUpdateTopNavItem(index, "label", e.target.value)}
                          placeholder="Enter label"
                        />
                      </div>
                      <div>
                        <Label>URL/Href</Label>
                        <Input
                          value={item.href || ""}
                          onChange={(e) => handleHeaderUpdateTopNavItem(index, "href", e.target.value)}
                          placeholder="Enter URL"
                        />
                      </div>
                      <div>
                        <Label>Is External Link</Label>
                        <Select
                          value={item.isExternal ? "true" : "false"}
                          onValueChange={(value) => handleHeaderUpdateTopNavItem(index, "isExternal", value === "true")}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="false">Internal Link</SelectItem>
                            <SelectItem value="true">External Link</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Navigation Items */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Main Navigation Items</h3>
                  <Button onClick={handleHeaderAddMainNavItem} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Main Nav Item
                  </Button>
                </div>
                {headerContent.mainNavItems.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 shadow-sm bg-background">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Main Nav Item {index + 1}</h4>
                      <Button onClick={() => handleHeaderRemoveMainNavItem(index)} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label>Label</Label>
                        <Input
                          value={item.label}
                          onChange={(e) => handleHeaderUpdateMainNavItem(index, "label", e.target.value)}
                          placeholder="Enter label"
                        />
                      </div>
                      <div>
                        <Label>Action Type</Label>
                        <Select
                          value={item.action || "navigate"}
                          onValueChange={(value) => handleHeaderUpdateMainNavItem(index, "action", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="scroll">Scroll to Section</SelectItem>
                            <SelectItem value="navigate">Navigate to Page</SelectItem>
                            <SelectItem value="external">External Link</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>URL/Href (for navigate/external)</Label>
                        <Input
                          value={item.href || ""}
                          onChange={(e) => handleHeaderUpdateMainNavItem(index, "href", e.target.value)}
                          placeholder="Enter URL"
                        />
                      </div>
                      <div>
                        <Label>Section ID (for scroll)</Label>
                        <Input
                          value={item.sectionId || ""}
                          onChange={(e) => handleHeaderUpdateMainNavItem(index, "sectionId", e.target.value)}
                          placeholder="Enter section ID"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={handleHeaderSave} disabled={loading} className="w-full md:w-auto">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Header Content
              </Button>
              <LivePreviewPanel
                isEnabled={livePreviewEnabled}
                sectionId="header" // or respective section id
                previewData={null}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Footer Section */}
        <TabsContent value="footer">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Footer Content</CardTitle>
              <CardDescription>Manage footer sections, contact info, and social media</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact Information */}
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-transparent">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Address</Label>
                    <Textarea
                      value={footerContent.contactInfo.address}
                      onChange={(e) =>
                        setFooterContent((prev) => ({
                          ...prev,
                          contactInfo: { ...prev.contactInfo, address: e.target.value },
                        }))
                      }
                      placeholder="Enter address"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={footerContent.contactInfo.phone}
                        onChange={(e) =>
                          setFooterContent((prev) => ({
                            ...prev,
                            contactInfo: { ...prev.contactInfo, phone: e.target.value },
                          }))
                        }
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        value={footerContent.contactInfo.email}
                        onChange={(e) =>
                          setFooterContent((prev) => ({
                            ...prev,
                            contactInfo: { ...prev.contactInfo, email: e.target.value },
                          }))
                        }
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Weekday Hours</Label>
                    <Input
                      value={footerContent.contactInfo.hours.weekdays}
                      onChange={(e) =>
                        setFooterContent((prev) => ({
                          ...prev,
                          contactInfo: {
                            ...prev.contactInfo,
                            hours: { ...prev.contactInfo.hours, weekdays: e.target.value },
                          },
                        }))
                      }
                      placeholder="Enter weekday hours"
                    />
                  </div>
                  <div>
                    <Label>Weekend Hours</Label>
                    <Input
                      value={footerContent.contactInfo.hours.weekends}
                      onChange={(e) =>
                        setFooterContent((prev) => ({
                          ...prev,
                          contactInfo: {
                            ...prev.contactInfo,
                            hours: { ...prev.contactInfo.hours, weekends: e.target.value },
                          },
                        }))
                      }
                      placeholder="Enter weekend hours"
                    />
                  </div>
                </div>
              </div>

              {/* Footer Sections */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Footer Sections</h3>
                  <Button onClick={handleFooterAddSection} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Section
                  </Button>
                </div>
                {footerContent.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border rounded-lg p-4 shadow-sm bg-background">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">
                        Section: {section.title || `Section ${sectionIndex + 1}`}
                      </h4>
                      <Button onClick={() => handleFooterRemoveSection(sectionIndex)} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="mb-4">
                      <Label>Section Title</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => handleFooterUpdateSection(sectionIndex, "title", e.target.value)}
                        placeholder="Enter section title"
                      />
                    </div>

                    {/* Links for this section */}
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-medium text-gray-700">Links</h5>
                        <Button onClick={() => handleFooterAddLink(sectionIndex)} size="sm" variant="outline">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Link
                        </Button>
                      </div>
                      {section.links.map((link, linkIndex) => (
                        <div key={linkIndex} className="border rounded p-3 mb-3 bg-gray-50 dark:bg-transparent">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Link {linkIndex + 1}</span>
                            <Button
                              onClick={() => handleFooterRemoveLink(sectionIndex, linkIndex)}
                              variant="destructive"
                              size="sm"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <div>
                              <Label className="text-xs">Label</Label>
                              <Input
                                value={link.label}
                                onChange={(e) =>
                                  handleFooterUpdateLink(sectionIndex, linkIndex, "label", e.target.value)
                                }
                                placeholder="Enter link label"
                                className="text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Action Type</Label>
                              <Select
                                value={link.action || "navigate"}
                                onValueChange={(value) =>
                                  handleFooterUpdateLink(sectionIndex, linkIndex, "action", value)
                                }
                              >
                                <SelectTrigger className="text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="scroll">Scroll to Section</SelectItem>
                                  <SelectItem value="navigate">Navigate to Page</SelectItem>
                                  <SelectItem value="external">External Link</SelectItem>
                                  <SelectItem value="modal">Open Modal</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs">URL/Href (for navigate/external)</Label>
                              <Input
                                value={link.href || ""}
                                onChange={(e) =>
                                  handleFooterUpdateLink(sectionIndex, linkIndex, "href", e.target.value)
                                }
                                placeholder="Enter URL"
                                className="text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Section ID (for scroll)</Label>
                              <Input
                                value={link.sectionId || ""}
                                onChange={(e) =>
                                  handleFooterUpdateLink(sectionIndex, linkIndex, "sectionId", e.target.value)
                                }
                                placeholder="Enter section ID"
                                className="text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Social Media</h3>
                  <Button onClick={handleFooterAddSocialMedia} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Social Media
                  </Button>
                </div>
                {footerContent.socialMedia.map((social, index) => (
                  <div key={index} className="border rounded-lg p-4 shadow-sm bg-background">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Social Media {index + 1}</h4>
                      <Button onClick={() => handleFooterRemoveSocialMedia(index)} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Platform</Label>
                        <Input
                          value={social.platform}
                          onChange={(e) => handleFooterUpdateSocialMedia(index, "platform", e.target.value)}
                          placeholder="Enter platform name"
                        />
                      </div>
                      <div>
                        <Label>URL</Label>
                        <Input
                          value={social.url}
                          onChange={(e) => handleFooterUpdateSocialMedia(index, "url", e.target.value)}
                          placeholder="Enter social media URL"
                        />
                      </div>
                      <div>
                        <Label>Icon Name</Label>
                        <Input
                          value={social.icon}
                          onChange={(e) => handleFooterUpdateSocialMedia(index, "icon", e.target.value)}
                          placeholder="Enter icon name (e.g., Facebook, Instagram)"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Newsletter Section */}
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-transparent">
                <h3 className="text-lg font-semibold mb-4">Newsletter Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Newsletter Title</Label>
                    <Input
                      value={footerContent.newsletterSection.title}
                      onChange={(e) =>
                        setFooterContent((prev) => ({
                          ...prev,
                          newsletterSection: { ...prev.newsletterSection, title: e.target.value },
                        }))
                      }
                      placeholder="Enter newsletter title"
                    />
                  </div>
                  <div>
                    <Label>Newsletter Description</Label>
                    <Input
                      value={footerContent.newsletterSection.description}
                      onChange={(e) =>
                        setFooterContent((prev) => ({
                          ...prev,
                          newsletterSection: { ...prev.newsletterSection, description: e.target.value },
                        }))
                      }
                      placeholder="Enter newsletter description"
                    />
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div>
                <Label htmlFor="footer-copyright">Copyright Text</Label>
                <Input
                  id="footer-copyright"
                  value={footerContent.copyright}
                  onChange={(e) => setFooterContent((prev) => ({ ...prev, copyright: e.target.value }))}
                  placeholder="Enter copyright text"
                />
              </div>

              <Button onClick={handleFooterSave} disabled={loading} className="w-full md:w-auto">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Footer Content
              </Button>
              <LivePreviewPanel
                isEnabled={livePreviewEnabled}
                sectionId="footer" // or respective section id
                previewData={null}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
