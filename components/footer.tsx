"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface FooterLink {
  label: string
  href: string
  type?: "address" | "phone" | "email"
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
  logo: {
    text: string
    image: string
  }
  description: string
  sections: FooterSection[]
  socialMedia: SocialMedia[]
  newsletter: {
    title: string
    description: string
    placeholder: string
  }
  copyright: string
  policies: FooterLink[]
}

export default function Footer() {
  const [footerContent, setFooterContent] = useState<FooterContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [subscribing, setSubscribing] = useState(false)

  useEffect(() => {
    const fetchFooterContent = async () => {
      try {
        const response = await fetch("/api/cms/footer")
        if (response.ok) {
          const data = await response.json()
          setFooterContent(data.content)
        }
      } catch (error) {
        console.error("Error fetching footer content:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFooterContent()
  }, [])

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setSubscribing(true)
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        toast.success("Successfully subscribed to newsletter!")
        setEmail("")
      } else {
        const data = await response.json()
        toast.error(data.message || "Failed to subscribe")
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.")
    } finally {
      setSubscribing(false)
    }
  }

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "facebook":
        return <Facebook size={20} />
      case "instagram":
        return <Instagram size={20} />
      case "twitter":
        return <Twitter size={20} />
      case "linkedin":
        return <Linkedin size={20} />
      default:
        return null
    }
  }

  const getLinkIcon = (type?: string) => {
    switch (type) {
      case "phone":
        return <Phone size={16} />
      case "email":
        return <Mail size={16} />
      case "address":
        return <MapPin size={16} />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="w-32 h-6 bg-gray-700 animate-pulse rounded" />
                <div className="space-y-2">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="w-24 h-4 bg-gray-700 animate-pulse rounded" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              {footerContent?.logo.image && (
                <Image
                  src={footerContent.logo.image || "/placeholder.svg"}
                  alt={footerContent.logo.text}
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
              )}
              <span className="text-xl font-bold">{footerContent?.logo.text || "Foreigner Cafe"}</span>
            </div>
            <p className="text-gray-300 mb-6">{footerContent?.description}</p>

            {/* Social Media */}
            <div className="flex space-x-4">
              {footerContent?.socialMedia.map((social) => (
                <Link
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {getSocialIcon(social.icon)}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerContent?.sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      {getLinkIcon(link.type)}
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{footerContent?.newsletter.title}</h3>
            <p className="text-gray-300 mb-4">{footerContent?.newsletter.description}</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder={footerContent?.newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                required
              />
              <Button type="submit" disabled={subscribing} className="w-full bg-orange-600 hover:bg-orange-700">
                {subscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">{footerContent?.copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {footerContent?.policies.map((policy) => (
              <Link
                key={policy.label}
                href={policy.href}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {policy.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
