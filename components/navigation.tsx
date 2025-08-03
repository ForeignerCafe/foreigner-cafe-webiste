"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ContactModal } from "@/components/ContactModal"
import { LocationModal } from "@/components/location-modal"
import { ReserveModal } from "@/components/reserveModal"

interface NavItem {
  label: string
  href?: string
  action?: string
  sectionId?: string
  isExternal?: boolean
}

interface HeaderContent {
  logo: string
  topNavItems: NavItem[]
  mainNavItems: NavItem[]
  reserveButtonText: string
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [headerContent, setHeaderContent] = useState<HeaderContent | null>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    fetchHeaderContent()
  }, [])

  const fetchHeaderContent = async () => {
    try {
      const response = await fetch("/api/cms/header")
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setHeaderContent(data.data)
        }
      }
    } catch (error) {
      console.error("Failed to fetch header content:", error)
    }
  }

  const handleNavClick = (item: NavItem) => {
    if (item.action === "scroll" && item.sectionId) {
      const element = document.getElementById(item.sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else if (item.action === "modal") {
      if (item.sectionId === "contact") {
        setIsContactModalOpen(true)
      } else if (item.sectionId === "location") {
        setIsLocationModalOpen(true)
      }
    }
    setIsOpen(false)
  }

  const handleReserveClick = () => {
    setIsReserveModalOpen(true)
    setIsOpen(false)
  }

  if (!headerContent) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold">FOREIGNER CAFE</div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-orange-500 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-orange-500 transition-colors">
                About
              </Link>
              <Link href="/menu" className="text-gray-700 hover:text-orange-500 transition-colors">
                Menu
              </Link>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">RESERVE</Button>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg py-2" : "bg-white/95 backdrop-blur-sm py-4"
        }`}
      >
        {/* Top Bar */}
        <div className="border-b border-gray-200 py-2">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between text-sm">
              <div className="hidden md:flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>123 Coffee Street, Brew City</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Mon-Fri: 7AM-9PM</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {headerContent.topNavItems.map((item, index) => (
                  <div key={index}>
                    {item.isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-orange-500 transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href || "#"} className="text-gray-600 hover:text-orange-500 transition-colors">
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-orange-500 transition-colors">
              {headerContent.logo}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {headerContent.mainNavItems.map((item, index) => (
                <div key={index}>
                  {item.action === "navigate" ? (
                    <Link
                      href={item.href || "#"}
                      className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item)}
                      className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Reserve Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleReserveClick}
                className="hidden md:inline-flex bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
              >
                {headerContent.reserveButtonText}
              </Button>

              {/* Mobile Menu Button */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-6 mt-6">
                    <div className="text-2xl font-bold text-gray-900">{headerContent.logo}</div>

                    {/* Mobile Navigation Items */}
                    <div className="flex flex-col space-y-4">
                      {headerContent.mainNavItems.map((item, index) => (
                        <div key={index}>
                          {item.action === "navigate" ? (
                            <Link
                              href={item.href || "#"}
                              onClick={() => setIsOpen(false)}
                              className="text-lg text-gray-700 hover:text-orange-500 transition-colors font-medium block py-2"
                            >
                              {item.label}
                            </Link>
                          ) : (
                            <button
                              onClick={() => handleNavClick(item)}
                              className="text-lg text-gray-700 hover:text-orange-500 transition-colors font-medium block py-2 text-left w-full"
                            >
                              {item.label}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Mobile Reserve Button */}
                    <Button
                      onClick={handleReserveClick}
                      className="bg-orange-500 hover:bg-orange-600 text-white w-full py-3 rounded-full font-medium"
                    >
                      {headerContent.reserveButtonText}
                    </Button>

                    {/* Mobile Top Nav Items */}
                    <div className="border-t pt-6 space-y-3">
                      {headerContent.topNavItems.map((item, index) => (
                        <div key={index}>
                          {item.isExternal ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setIsOpen(false)}
                              className="text-gray-600 hover:text-orange-500 transition-colors block py-1"
                            >
                              {item.label}
                            </a>
                          ) : (
                            <Link
                              href={item.href || "#"}
                              onClick={() => setIsOpen(false)}
                              className="text-gray-600 hover:text-orange-500 transition-colors block py-1"
                            >
                              {item.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />
      <ReserveModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} />
    </>
  )
}
