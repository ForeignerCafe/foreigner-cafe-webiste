"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { X, Eye, EyeOff, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, User } from "lucide-react"
import { Facebook, Instagram, Globe } from "lucide-react"

interface LivePreviewProps {
  isEnabled: boolean
  sectionId: string
  previewData: any
  position?: { x: number; y: number }
}

// Gallery Page Preview Component
const GalleryPagePreview = () => {
  const mockGalleryData = {
    sections: [
      {
        id: 1,
        name: "Interior",
        description: "Beautiful interior spaces of our cafe",
        images: [
          { id: 1, src: "/images/dining.webp", alt: "Dining area", caption: "Main dining area" },
          { id: 2, src: "/images/sitting.webp", alt: "Seating area", caption: "Cozy seating" },
          { id: 3, src: "/images/bar-lounge.webp", alt: "Bar area", caption: "Bar lounge" },
          { id: 4, src: "/images/main-hall.webp", alt: "Main hall", caption: "Main hall" },
          { id: 5, src: "/images/wedding-hall.webp", alt: "Wedding hall", caption: "Wedding venue" },
          { id: 6, src: "/images/pink.webp", alt: "Pink decor", caption: "Pink themed area" },
        ],
      },
      {
        id: 2,
        name: "Food",
        description: "Delicious dishes from our kitchen",
        images: [
          { id: 7, src: "/placeholder.svg?height=300&width=400", alt: "Food 1", caption: "Signature dish" },
          { id: 8, src: "/placeholder.svg?height=300&width=400", alt: "Food 2", caption: "Coffee & pastry" },
          { id: 9, src: "/placeholder.svg?height=300&width=400", alt: "Food 3", caption: "Breakfast special" },
        ],
      },
    ],
  }

  const [selectedSection, setSelectedSection] = useState(1)
  const selectedSectionData = mockGalleryData.sections.find((section) => section.id === selectedSection)

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <section className="relative h-[300px] flex items-center justify-center text-center text-white overflow-hidden mb-10">
        <Image src="/images/blues.webp" alt="Gallery header" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
        <div className="relative z-10 px-4 max-w-4xl mx-auto space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mt-10 uppercase">
            Explore Our Cafe Gallery
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto pb-6">
            Savor the warmth and joy of every shared moment at our cafe.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Section Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {mockGalleryData.sections.map((section) => (
            <Badge
              key={section.id}
              variant={selectedSection === section.id ? "default" : "outline"}
              className={`cursor-pointer px-6 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                selectedSection === section.id
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "text-gray-600 hover:text-orange-500 hover:border-orange-500"
              }`}
              onClick={() => setSelectedSection(section.id)}
            >
              {section.name}
            </Badge>
          ))}
        </div>

        {/* Selected Section Description */}
        {selectedSectionData?.description && (
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{selectedSectionData.description}</p>
          </div>
        )}

        {/* Bento Grid Gallery */}
        {selectedSectionData && selectedSectionData.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {selectedSectionData.images.map((image, index) => {
              let gridClass = "h-48"
              if (index % 7 === 0) {
                gridClass = "md:col-span-2 md:row-span-2 h-96"
              } else if (index % 5 === 0) {
                gridClass = "lg:col-span-2 h-48"
              } else if (index % 3 === 0) {
                gridClass = "md:row-span-2 h-80"
              }

              return (
                <Card
                  key={image.id}
                  className={`group overflow-hidden hover:shadow-xl transition-all duration-300 ${gridClass}`}
                >
                  <div className="relative overflow-hidden h-full">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {image.caption}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// Events Page Preview Component
const EventsPagePreview = () => {
  const contentData = [
    {
      category: "A Space To Unwind",
      title: "Thoughtful Settings for Meaningful Occasions",
      description:
        "Foreigner Café offers intimate spaces for storytelling nights, themed brunches, poetry readings, and more. Designed with intention and comfort, our venues are the perfect backdrop for experiences that feel personal, honest, and memorable.",
      imageSrc: "/images/pink.webp",
      imageAlt: "Elegant restaurant interior",
      imagePosition: "right",
    },
    {
      category: "Your Next Masterpiece",
      title: "Flexible Settings with Heart and Style",
      description:
        "We understand that no two stories are the same. That's why our team works with you to shape your event around your voice, your rhythm, and your meaning. From layout to lighting, menu to music, Foreigner Café is here to make it feel right, never rushed, never distant.",
      imageSrc: "/images/sitting.webp",
      imageAlt: "Restaurant dining area",
      imagePosition: "left",
    },
  ]

  const eventSpacesData = [
    {
      imageSrc: "/images/main-hall.webp",
      imageAlt: "Main Hall",
      title: "Main Hall",
      description:
        "Our Main Hall offers energy, elegance, and moments, woven into thoughtful clusters, warm lighting, and flexible layouts. It's designed for everything.",
    },
    {
      imageSrc: "/images/dining.webp",
      imageAlt: "Dining Spaces",
      title: "Dining Spaces",
      description:
        "Our dining spaces are designed for intimate togetherness, whether you're planning a storytelling event, a celebration, or a celebratory feast.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] overflow-hidden">
        <Image src="/images/events.webp" alt="Restaurant interior" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight max-w-4xl mt-20 uppercase">
            Events at Foreigner Cafe
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl">
            Host your next event with us and create memories that last a lifetime.
          </p>
          <Button className="mt-8 bg-[#EC4E20] hover:bg-[#f97316] text-white px-8 py-3 text-lg">Book Now</Button>
        </div>
      </section>

      {/* Content Sections */}
      <section className="bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-0 mt-0">
          <div className="grid grid-cols-1">
            {contentData.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 justify-items-start m-6">
                <div
                  className={
                    item.imagePosition === "right"
                      ? "order-2 md:order-1 p-4 sm:p-8 md:p-16"
                      : "order-2 md:order-2 p-4 sm:p-8 md:p-16"
                  }
                >
                  <p className="text-sm text-gray-500 mb-2 uppercase underline underline-offset-1 cursor-pointer tracking-wide">
                    {item.category}
                  </p>
                  <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-[0.9rem] mb-6 font-normal text-wrap">{item.description}</p>
                </div>
                <div
                  className={
                    item.imagePosition === "right"
                      ? "order-1 md:order-2 w-full h-[400px]"
                      : "order-1 md:order-1 w-full h-[400px]"
                  }
                >
                  <Image
                    src={item.imageSrc || "/placeholder.svg"}
                    alt={item.imageAlt}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover shadow-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Spaces Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14 mt-6">
            <h2 className="text-3xl md:text-4xl font-bold text-black">OUR EVENT SPACES</h2>
            <p className="mt-2 text-gray-600 text-lg">
              Our event spaces are crafted for connection inviting you to gather, celebrate, and feel at home.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 mx-4 sm:mx-8 md:mx-16 lg:mx-[8rem]">
            {eventSpacesData.map((space, index) => (
              <Card key={index} className="overflow-hidden shadow-lg">
                <div className="w-full h-[300px]">
                  <Image
                    src={space.imageSrc || "/placeholder.svg"}
                    alt={space.imageAlt}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-7">
                  <h3 className="text-xl text-center uppercase font-semibold text-gray-800 mb-2">{space.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{space.description}</p>
                  <div className="flex justify-center mt-5">
                    <Button variant="link" className="text-[#EC4E20] underline">
                      VIEW VENUE
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Header Preview Component
const HeaderPreview = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [topNavActiveItem, setTopNavActiveItem] = useState("DINE")

  const headerContent = {
    logo: "FOREIGNER CAFE",
    topNavItems: [
      { label: "DINE", href: "/", action: "navigate" },
      { label: "EVENTS", href: "/events", action: "navigate" },
      { label: "EXPERIENCES", href: "/experiences", action: "navigate" },
      { label: "GALLERY", href: "/gallery", action: "navigate" },
      { label: "BLOGS", href: "/blogs", action: "navigate" },
    ],
    mainNavItems: [
      { label: "HOME", href: "/", action: "navigate" },
      { label: "ABOUT", href: "/about", action: "scroll", sectionId: "about" },
      { label: "MENU", href: "/menu", action: "navigate" },
      { label: "EVENTS", href: "/events", action: "navigate" },
      { label: "GALLERY", href: "/gallery", action: "navigate" },
      { label: "CONTACT", href: "/contact", action: "scroll", sectionId: "contact" },
    ],
    reserveButtonText: "RESERVE",
  }

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="h-1 bg-black/10">
        <div className="h-full bg-orange-500 w-1/4 transition-all duration-150 ease-out" />
      </div>

      {/* Top Header */}
      <header className="w-full hidden lg:block">
        <div className="h-[1px] bg-gray-700" />
        <div className="flex h-10">
          <div className="flex items-center px-6 font-medium text-sm tracking-wide uppercase h-full bg-[#EC4E20] text-white">
            <button className="hover:opacity-80 transition-opacity">{headerContent.topNavItems[0].label}</button>
          </div>
          <div className="flex-1 bg-[#F8F8F8] flex items-center justify-between px-6 h-full">
            <nav className="flex space-x-0 text-[#A0A0A0] font-medium text-sm tracking-wide uppercase">
              {headerContent.topNavItems.slice(1).map((item, index) => (
                <div key={index} className="px-6 h-10 flex items-center hover:text-gray-700">
                  <button className="transition-colors">{item.label}</button>
                </div>
              ))}
            </nav>
            <div className="flex items-center space-x-6 text-[#A0A0A0] font-medium text-sm tracking-wide uppercase">
              <button className="px-6 h-10 flex items-center space-x-2 hover:text-gray-700 transition-colors">
                <User className="w-3 h-3" />
                <span>CONTACT US</span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[#EC4E20] text-white text-center py-3 text-xs font-medium tracking-wide uppercase"></div>
      </header>

      {/* Main navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <button className="text-2xl font-bold transition-all duration-300 hover:scale-110 text-black hover:text-orange-500">
                {headerContent.logo}
              </button>
            </div>
            <div className="hidden lg:flex items-center space-x-8">
              {headerContent.mainNavItems.map((item, index) => (
                <button
                  key={index}
                  className="text-sm font-medium tracking-wide transition-all duration-200 hover:scale-110 relative group text-black/80 hover:text-orange-500"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all duration-300 w-0 group-hover:w-full" />
                </button>
              ))}
            </div>
            <div className="hidden lg:block">
              <Button className="text-sm font-bold tracking-wide transition-all duration-300 hover:scale-110 hover:shadow-lg bg-[#EC4E20] text-white hover:bg-[#f97316] hover:text-black">
                {headerContent.reserveButtonText}
              </Button>
            </div>
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="p-2 transition-all duration-300 hover:scale-110 text-black hover:text-orange-500"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

// Footer Preview Component
const FooterPreview = () => {
  const [email, setEmail] = useState("")

  const footerContent = {
    sections: [
      {
        title: "QUICK LINKS",
        links: [
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Menu", href: "/menu" },
          { label: "Events", href: "/events" },
        ],
      },
      {
        title: "EXPERIENCES",
        links: [
          { label: "Private Dining", href: "/private-dining" },
          { label: "Corporate Events", href: "/corporate" },
          { label: "Weddings", href: "/weddings" },
          { label: "Celebrations", href: "/celebrations" },
        ],
      },
      {
        title: "LOCATION & HOURS",
        links: [],
      },
    ],
    contactInfo: {
      address: "123 Main Street, City, State 12345",
      phone: "+1 (555) 123-4567",
      email: "info@foreignercafe.com",
      hours: {
        weekdays: "Mon-Fri: 8:00 AM - 10:00 PM",
        weekends: "Sat-Sun: 9:00 AM - 11:00 PM",
      },
    },
    socialMedia: [
      { platform: "Facebook", url: "https://facebook.com", icon: "facebook" },
      { platform: "Instagram", url: "https://instagram.com", icon: "instagram" },
      { platform: "Website", url: "https://website.com", icon: "globe" },
    ],
    newsletterSection: {
      title: "STAY CONNECTED",
      description: "Receive The Foreigner Cafe news directly to you.",
    },
    copyright: "© 2024 Foreigner Cafe. All rights reserved. ",
  }

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "facebook":
        return <Facebook className="w-5 h-5" />
      case "instagram":
        return <Instagram className="w-5 h-5" />
      case "globe":
      case "google":
        return <Globe className="w-5 h-5" />
      default:
        return <Globe className="w-5 h-5" />
    }
  }

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {footerContent.sections.map((section, index) => (
            <div key={index}>
              <h4 className="text-sm font-bold mb-6 tracking-wide text-white">{section.title}</h4>
              {section.title === "LOCATION & HOURS" ? (
                <div className="space-y-4 text-sm text-gray-300">
                  <div>
                    <p>{footerContent.contactInfo.address}</p>
                  </div>
                  <div>
                    <p className="font-medium text-white">{footerContent.contactInfo.hours.weekdays}</p>
                    <p className="font-medium text-white">{footerContent.contactInfo.hours.weekends}</p>
                  </div>
                  <div>
                    <p>{footerContent.contactInfo.phone}</p>
                    <p>{footerContent.contactInfo.email}</p>
                  </div>
                </div>
              ) : (
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button className="text-sm text-gray-300 hover:text-orange-500 transition-colors duration-200 text-left">
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold mb-6 tracking-wide text-white">{footerContent.newsletterSection.title}</h4>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">{footerContent.newsletterSection.description}</p>
            <div className="flex mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 px-4 py-3 bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="bg-orange-500 text-white px-6 py-3 text-sm hover:bg-white hover:text-black transition-colors duration-200 font-medium">
                →
              </button>
            </div>
            <div className="flex space-x-4">
              {footerContent.socialMedia.map((social, index) => (
                <button
                  key={index}
                  className="w-10 h-10 bg-gray-800 hover:bg-orange-500 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  {getSocialIcon(social.icon)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <button className="text-2xl font-bold text-white hover:text-orange-500 transition-colors duration-200">
                FOREIGNER CAFE
              </button>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-8 text-xs text-gray-400 mb-6 md:mb-0">
              <button className="hover:text-orange-500 transition-colors duration-200 tracking-wide">RESERVE</button>
              <button className="hover:text-orange-500 transition-colors duration-200 tracking-wide">PRIVACY</button>
              <button className="hover:text-orange-500 transition-colors duration-200 tracking-wide">TERMS</button>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500 tracking-wide">
              {footerContent.copyright + "| Website By "}
              <a href="https://cybitronix.com" target="_blank" rel="noopener noreferrer" className="text-orange-500">
                Cybitronix
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Other preview components remain the same...
const HeroPreview = ({ data }: { data: any }) => (
  <div className="relative h-screen bg-black text-white flex items-center justify-center">
    <video
      className="absolute inset-0 w-full h-full object-cover opacity-50"
      src={data?.videoUrl || "/placeholder.svg?height=600&width=1200"}
      autoPlay
      muted
      loop
    />
    <div className="relative z-10 text-center max-w-4xl px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">{data?.title || "Hero Title"}</h1>
      <h2 className="text-xl md:text-2xl mb-6">{data?.subtitle || "Hero Subtitle"}</h2>
      <p className="text-lg mb-8">{data?.description || "Hero description goes here"}</p>
      <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors">
        Explore Menu
      </button>
    </div>
  </div>
)

const WhatsOnPreview = ({ data }: { data: any }) => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">{data?.title || "WHAT'S ON"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(
          data?.events || [
            {
              title: "Sample Event",
              description: "Sample description",
              image: "/placeholder.svg?height=300&width=400",
            },
          ]
        ).map((event: any, index: number) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={event.image || "/placeholder.svg?height=300&width=400"}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <a href={event.linkHref} className="text-orange-500 hover:text-orange-600 font-medium">
                {event.linkText || "Learn More"}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const BrandPreview = ({ data }: { data: any }) => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      {(
        data?.storyElements || [
          {
            title: "Our Story",
            text: "Sample story text",
            media: { src: "/placeholder.svg?height=400&width=600", type: "image" },
          },
        ]
      ).map((element: any, index: number) => (
        <div
          key={element.id || index}
          className={`flex flex-col ${element.layout === "left" ? "md:flex-row" : "md:flex-row-reverse"} items-center mb-16`}
        >
          <div className="md:w-1/2 mb-8 md:mb-0">
            {element.media.type === "video" ? (
              <video src={element.media.src} className="w-full h-auto rounded-lg" controls />
            ) : (
              <img
                src={element.media.src || "/placeholder.svg?height=400&width=600"}
                alt={element.media.alt}
                className="w-full h-auto rounded-lg"
              />
            )}
          </div>
          <div className="md:w-1/2 md:px-8">
            <h3 className="text-2xl font-bold mb-4">{element.title}</h3>
            <p className="text-gray-600 leading-relaxed">{element.text}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
)

const ExperiencesPreview = ({ data }: { data: any }) => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Experiences</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {(
          data?.experiences || [
            {
              title: "Sample Experience",
              description: "Sample description",
              imageSrc: "/placeholder.svg?height=300&width=400",
            },
          ]
        ).map((exp: any, index: number) => (
          <div key={exp.id || index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={exp.imageSrc || "/placeholder.svg?height=300&width=400"}
              alt={exp.alt}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
              <p className="text-gray-600 mb-4">{exp.description}</p>
              <a href={exp.linkHref} className="text-orange-500 hover:text-orange-600 font-medium">
                {exp.linkText || "Learn More"}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const DineDrinkPreview = ({ data }: { data: any }) => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Dine & Drink</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {(
          data?.venues || [
            {
              name: "Sample Venue",
              location: "Sample Location",
              description: "Sample description",
              image: "/placeholder.svg?height=300&width=400",
            },
          ]
        ).map((venue: any, index: number) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={venue.image || "/placeholder.svg?height=300&width=400"}
              alt={venue.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{venue.name}</h3>
              <p className="text-orange-500 font-medium mb-2">{venue.location}</p>
              <p className="text-gray-600">{venue.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const FAQsPreview = ({ data }: { data: any }) => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{data?.title || "Frequently Asked Questions"}</h2>
        <p className="text-gray-600">{data?.subtitle || "Find answers to common questions"}</p>
      </div>
      <div className="space-y-4">
        {(data?.faqs || [{ question: "Sample Question?", answer: "Sample answer goes here." }]).map(
          (faq: any, index: number) => (
            <div key={index} className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h3 className="text-lg font-medium">{faq.question}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  </section>
)

export function LivePreviewTooltip({ isEnabled, sectionId, previewData, position = { x: 0, y: 0 } }: LivePreviewProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isEnabled && sectionId && previewData) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isEnabled, sectionId, previewData])

  if (!isVisible) return null

  const renderPreviewComponent = () => {
    const PreviewWrapper = ({ children }: { children: React.ReactNode }) => (
      <div className="bg-white overflow-hidden">{children}</div>
    )

    try {
      switch (sectionId) {
        case "hero":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.25)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "400%",
                  height: isExpanded ? "125%" : "400%",
                }}
              >
                <HeroPreview data={previewData} />
              </div>
            </PreviewWrapper>
          )
        case "whats-on":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.3)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "333%",
                  height: isExpanded ? "125%" : "333%",
                }}
              >
                <WhatsOnPreview data={previewData} />
              </div>
            </PreviewWrapper>
          )
        case "brand":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.3)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "333%",
                  height: isExpanded ? "125%" : "333%",
                }}
              >
                <BrandPreview data={previewData} />
              </div>
            </PreviewWrapper>
          )
        case "experiences":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.3)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "333%",
                  height: isExpanded ? "125%" : "333%",
                }}
              >
                <ExperiencesPreview data={previewData} />
              </div>
            </PreviewWrapper>
          )
        case "dine-drink":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.3)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "333%",
                  height: isExpanded ? "125%" : "333%",
                }}
              >
                <DineDrinkPreview data={previewData} />
              </div>
            </PreviewWrapper>
          )
        case "faqs":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.3)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "333%",
                  height: isExpanded ? "125%" : "333%",
                }}
              >
                <FAQsPreview data={previewData} />
              </div>
            </PreviewWrapper>
          )
        case "events":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.3)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "333%",
                  height: isExpanded ? "125%" : "333%",
                }}
              >
                <EventsPagePreview />
              </div>
            </PreviewWrapper>
          )
        case "gallery":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.3)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "333%",
                  height: isExpanded ? "125%" : "333%",
                }}
              >
                <GalleryPagePreview />
              </div>
            </PreviewWrapper>
          )
        case "header":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.4)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "250%",
                  height: isExpanded ? "125%" : "250%",
                }}
              >
                <HeaderPreview />
              </div>
            </PreviewWrapper>
          )
        case "footer":
          return (
            <PreviewWrapper>
              <div
                style={{
                  transform: isExpanded ? "scale(0.8)" : "scale(0.3)",
                  transformOrigin: "top left",
                  width: isExpanded ? "125%" : "333%",
                  height: isExpanded ? "125%" : "333%",
                }}
              >
                <FooterPreview />
              </div>
            </PreviewWrapper>
          )
        default:
          return (
            <div className="p-4 text-center text-gray-500">
              <p>Preview not available for section: {sectionId}</p>
            </div>
          )
      }
    } catch (error) {
      console.error("Preview error for section:", sectionId, error)
      return (
        <div className="p-4 text-center text-red-500">
          <p>Error loading preview for {sectionId}</p>
          <p className="text-sm mt-2">Check console for details</p>
        </div>
      )
    }
  }

  return createPortal(
    <div
      ref={tooltipRef}
      className={`fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${
        isExpanded ? "inset-4 max-w-none max-h-none" : "w-[600px] h-[500px]"
      }`}
      style={isExpanded ? { left: "1rem", top: "1rem", right: "1rem", bottom: "1rem" } : { left: "20px", top: "20px" }}
    >
      <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          Live Preview - {sectionId.replace("-", " ").toUpperCase()}
        </span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="h-6 w-6 p-0">
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="overflow-hidden h-full">{renderPreviewComponent()}</div>
    </div>,
    document.body,
  )
}

export function LivePreviewToggle({
  isEnabled,
  onToggle,
}: {
  isEnabled: boolean
  onToggle: (enabled: boolean) => void
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onToggle(!isEnabled)}
      className={`fixed top-20 right-4 z-50 ${isEnabled ? "bg-green-50 border-green-200 text-green-700" : ""}`}
    >
      {isEnabled ? (
        <>
          <EyeOff className="h-4 w-4 mr-2" />
          Hide Preview
        </>
      ) : (
        <>
          <Eye className="h-4 w-4 mr-2" />
          Show Preview
        </>
      )}
    </Button>
  )
}
