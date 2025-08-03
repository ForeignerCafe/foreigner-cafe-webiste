"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactModal } from "@/components/ContactModal"
import { ReserveModal } from "@/components/reserveModal"

interface NavigationItem {
  label: string
  href: string
  type: "link" | "modal"
}

interface HeaderContent {
  logo: {
    text: string
    image: string
  }
  navigation: NavigationItem[]
  ctaButton: {
    text: string
    action: "reserve" | "contact"
    variant: "primary" | "secondary"
  }
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false)
  const [headerContent, setHeaderContent] = useState<HeaderContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHeaderContent = async () => {
      try {
        const response = await fetch("/api/cms/header")
        if (response.ok) {
          const data = await response.json()
          setHeaderContent(data.content)
        }
      } catch (error) {
        console.error("Error fetching header content:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHeaderContent()
  }, [])

  const handleNavClick = (item: NavigationItem) => {
    if (item.type === "modal") {
      setIsContactModalOpen(true)
    }
    setIsOpen(false)
  }

  const handleCtaClick = () => {
    if (headerContent?.ctaButton.action === "reserve") {
      setIsReserveModalOpen(true)
    } else {
      setIsContactModalOpen(true)
    }
  }

  if (loading) {
    return (
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-32 h-8 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="hidden md:flex space-x-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
              ))}
            </div>
            <div className="w-24 h-8 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                {headerContent?.logo.image && (
                  <Image
                    src={headerContent.logo.image || "/placeholder.svg"}
                    alt={headerContent.logo.text}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                )}
                <span className="text-xl font-bold text-gray-900">{headerContent?.logo.text || "Foreigner Cafe"}</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {headerContent?.navigation.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.type === "link" ? <Link href={item.href}>{item.label}</Link> : item.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                onClick={handleCtaClick}
                className={`${
                  headerContent?.ctaButton.variant === "primary"
                    ? "bg-orange-600 hover:bg-orange-700 text-white"
                    : "bg-transparent border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
                }`}
              >
                {headerContent?.ctaButton.text || "Book Table"}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-orange-600 p-2">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {headerContent?.navigation.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                >
                  {item.type === "link" ? <Link href={item.href}>{item.label}</Link> : item.label}
                </button>
              ))}
              <div className="px-3 py-2">
                <Button onClick={handleCtaClick} className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  {headerContent?.ctaButton.text || "Book Table"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Contact Info Bar */}
      <div className="bg-gray-900 text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>123 Cafe Street, City</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>Mon-Fri: 7AM-10PM | Sat-Sun: 8AM-11PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <ReserveModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} />
    </>
  )
}
