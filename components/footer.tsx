"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ContactModal } from "@/components/ContactModal"
import { LocationModal } from "@/components/location-modal"
import toast from "react-hot-toast"

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

export function Footer() {
  const [footerContent, setFooterContent] = useState<FooterContent | null>(null)
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

  useEffect(() => {
    fetchFooterContent()
  }, [])

  const fetchFooterContent = async () => {
    try {
      const response = await fetch("/api/cms/footer")
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setFooterContent(data.data)
        }
      }
    } catch (error) {
      console.error("Failed to fetch footer content:", error)
    }
  }

  const handleLinkClick = (link: FooterLink) => {
    if (link.action === "scroll" && link.sectionId) {
      const element = document.getElementById(link.sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else if (link.action === "modal") {
      if (link.sectionId === "contact") {
        setIsContactModalOpen(true)
      } else if (link.sectionId === "location") {
        setIsLocationModalOpen(true)
      }
    }
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    setIsSubscribing(true)
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        toast.success("Thank you for subscribing to our newsletter!")
        setEmail("")
      } else {
        const data = await response.json()
        toast.error(data.message || "Failed to subscribe. Please try again.")
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.")
    } finally {
      setIsSubscribing(false)
    }
  }

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "facebook":
        return <Facebook className="w-5 h-5" />
      case "instagram":
        return <Instagram className="w-5 h-5" />
      case "twitter":
        return <Twitter className="w-5 h-5" />
      case "linkedin":
        return <Linkedin className="w-5 h-5" />
      default:
        return <Mail className="w-5 h-5" />
    }
  }

  if (!footerContent) {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>Loading footer content...</p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <>
      <footer className="bg-gray-900 text-white">
        {/* Newsletter Section */}
        <div className="bg-orange-500 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {footerContent.newsletterSection.title}
              </h3>
              <p className="text-lg text-white/90 mb-8">{footerContent.newsletterSection.description}</p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white text-gray-900 border-0 focus:ring-2 focus:ring-white"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-2 whitespace-nowrap"
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <h3 className="text-xl font-bold mb-6">Contact Info</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">{footerContent.contactInfo.address}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <a
                      href={`tel:${footerContent.contactInfo.phone}`}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {footerContent.contactInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <a
                      href={`mailto:${footerContent.contactInfo.email}`}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {footerContent.contactInfo.email}
                    </a>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div className="text-gray-300">
                      <p>{footerContent.contactInfo.hours.weekdays}</p>
                      <p>{footerContent.contactInfo.hours.weekends}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Sections */}
              {footerContent.sections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-xl font-bold mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        {link.action === "navigate" || link.action === "external" ? (
                          <Link
                            href={link.href || "#"}
                            className="text-gray-300 hover:text-white transition-colors"
                            {...(link.action === "external" && { target: "_blank", rel: "noopener noreferrer" })}
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleLinkClick(link)}
                            className="text-gray-300 hover:text-white transition-colors text-left"
                          >
                            {link.label}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-gray-400 text-center md:text-left">{footerContent.copyright}</p>
              <div className="flex items-center space-x-4">
                {footerContent.socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={`Follow us on ${social.platform}`}
                  >
                    {getSocialIcon(social.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />
    </>
  )
}
