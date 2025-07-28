"use client"
import { useState, useEffect } from "react"
import { Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ReservationModal } from "./reserveModal"

export default function Navigation() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isTopHeaderHidden, setIsTopHeaderHidden] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [topNavActiveItem, setTopNavActiveItem] = useState<string>("DINE")
  const [modalType, setModalType] = useState<"reservation" | "contact">("reservation")

  const topHeaderHeight = 65
  const mainNavHeight = 64
  const progressBarHeight = 1

  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0
      setIsScrolled(scrollTop > 50)
      setIsTopHeaderHidden(scrollTop > topHeaderHeight)
      setScrollProgress(scrollPercent)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [topHeaderHeight])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const openReservationModal = () => {
    setModalType("reservation")
    setIsReservationModalOpen(true)
  }

  const openContactModal = () => {
    setModalType("contact")
    setIsReservationModalOpen(true)
  }

  // Navigation items for desktop (original navItems)
  const navItems = [
    {
      label: "Home",
      id: "hero",
      action: () => {
        scrollToSection("home")
      },
    },
    {
      label: "MENU",
      id: "menu",
      action: () =>
        window.open(
          "https://mhm-timber.s3.amazonaws.com/public/member/r9bJd/lurgtAi7r1j5/morningbreakfastmenuexamplecompressed.pdf",
          "_blank",
          "noopener,noreferrer",
        ),
    },
    {
      label: "ABOUT US",
      id: "aboutUs",
      action: () => {
        scrollToSection("story")
      },
    },
    {
      label: "EXPERIENCES",
      id: "contact",
      action: () => router.push("/experiences"),
    },
    { label: "FAQS", id: "faqs", action: () => router.push("/faqs") },
  ]

  // Combined navigation items for mobile sheet
  const mobileNavItems = [
    { label: "DINE", action: () => (window.location.href = "/") },
    { label: "EVENTS", action: () => router.push("/events") },
    {
      label: "SHOP",
      action: () =>
        window.open("https://order.toasttab.com/online/foreigner-60-east-3rd-avenue", "_blank", "noopener,noreferrer"),
    },
    { label: "CATERING", action: () => router.push("/catering") },
    {
      label: "GIFT VOUCHERS",
      action: () =>
        window.open("https://www.toasttab.com/foreigner-60-east-3rd-avenue/giftcards", "_blank", "noopener,noreferrer"),
    },
    {
      label: "Home",
      action: () => {
        scrollToSection("home")
      },
    },
    {
      label: "MENU",
      action: () =>
        window.open(
          "https://mhm-timber.s3.amazonaws.com/public/member/r9bJd/lurgtAi7r1j5/morningbreakfastmenuexamplecompressed.pdf",
          "_blank",
          "noopener,noreferrer",
        ),
    },
    { label: "ABOUT US", action: () => scrollToSection("story") },
    { label: "EXPERIENCES", action: () => router.push("/experiences") },
    { label: "FAQS", action: () => router.push("/faqs") },
    {
      label: "CONTACT US",
      action: () => {
        openContactModal()
      },
    },
  ]

  const handleTabClick = (id: string, action: () => void) => {
    setActiveTab(id)
    action()
  }

  const handleTopNavClick = (item: string) => {
    setTopNavActiveItem(item)
  }

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/10">
        <div
          className="h-full bg-orange transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Top Header - Hidden on small/medium screens, visible on large screens */}
      <header
        className={`fixed top-1 left-0 right-0 z-40 w-full transition-all duration-500 hidden lg:block ${
          isTopHeaderHidden ? "opacity-0 h-0 pointer-events-none" : "opacity-100 h-auto"
        }`}
      >
        {/* Top thin border */}
        <div className="h-[1px] bg-gray-700" />
        {/* Main header content - Top navigation bar */}
        <div className="flex h-10">
          {/* Left section: DINE */}
          <div
            className={`flex items-center px-6 font-medium text-sm tracking-wide uppercase h-full ${
              topNavActiveItem === "DINE"
                ? "bg-[#EC4E20] text-white"
                : "bg-[#F8F8F8] text-[#A0A0A0] hover:text-gray-700"
            }`}
          >
            <Link href="/" className="hover:opacity-80 transition-opacity" onClick={() => handleTopNavClick("DINE")}>
              DINE
            </Link>
          </div>
          {/* Right section: Navigation links and Action buttons */}
          <div className="flex-1  bg-[#F8F8F8] flex items-center justify-between px-6 h-full">
            {/* Navigation links */}
            <nav className="flex space-x-0 text-[#A0A0A0] font-medium text-sm tracking-wide uppercase">
              <div
                className={`px-6 h-10 flex items-center ${
                  topNavActiveItem === "EVENTS" ? "bg-[#EC4E20] text-white" : "hover:text-gray-700"
                }`}
              >
                <Link href="/events" className="transition-colors" onClick={() => handleTopNavClick("EVENTS")}>
                  EVENTS
                </Link>
              </div>
              <div
                className={`px-6 h-10 flex items-center ${
                  topNavActiveItem === "SHOP" ? "bg-[#EC4E20] text-white" : "hover:text-gray-700"
                }`}
              >
                <a
                  href="https://order.toasttab.com/online/foreigner-60-east-3rd-avenue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  onClick={() => handleTopNavClick("SHOP")}
                >
                  SHOP
                </a>
              </div>
              <div
                className={`px-6 h-10 flex items-center ${
                  topNavActiveItem === "CATERING" ? "bg-[#EC4E20] text-white" : "hover:text-gray-700"
                }`}
              >
                <Link href="/catering" className="transition-colors" onClick={() => handleTopNavClick("CATERING")}>
                  CATERING
                </Link>
              </div>
              <div
                className={`px-6 h-10 flex items-center ${
                  topNavActiveItem === "GIFT VOUCHERS"
                    ? "bg-[#EC4E20] text-white"
                    : "hover:text-gray-700 focus:outline-none"
                }`}
              >
                <a
                  href="https://www.toasttab.com/foreigner-60-east-3rd-avenue/giftcards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  onClick={() => handleTopNavClick("GIFT VOUCHERS")}
                >
                  GIFT VOUCHERS
                </a>
              </div>
            </nav>
            {/* Action buttons */}
            <div className="flex items-center space-x-6 text-[#A0A0A0] font-medium text-sm tracking-wide uppercase">
              <button
                className={`px-6 h-10 flex items-center space-x-2 hover:text-gray-700 transition-colors focus:outline-none ${
                  topNavActiveItem === "CONTACT US" ? "bg-[#EC4E20] text-white" : ""
                }`}
                onClick={() => {
                  openContactModal()
                  handleTopNavClick("CONTACT US")
                }}
              >
                <User className="w-3 h-3" />
                <span>CONTACT US</span>
              </button>
            </div>
          </div>
        </div>
        {/* Bottom message bar */}
        <div className="bg-[#EC4E20] text-white text-center py-3 text-xs font-medium tracking-wide uppercase"></div>
      </header>

      {/* Main navigation */}
      <nav
        className={`fixed left-0 right-0 z-40 transition-all duration-500 top-1 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50" : "bg-transparent"
        } ${isTopHeaderHidden ? "lg:top-1" : "lg:top-[66px]"}`}
      >
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => scrollToSection("home")}
                className={`text-2xl font-display font-bold transition-all duration-300 hover:scale-110 focus:outline-none ${
                  isScrolled ? "text-black hover:text-orange" : "text-white hover:text-orange"
                }`}
              >
                FOREIGNER CAFE
              </button>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id, item.action)}
                  className={`text-sm font-medium tracking-wide transition-all duration-200 hover:scale-110 relative group focus:outline-none ${
                    isScrolled ? "text-black/80 hover:text-orange" : "text-white/80 hover:text-orange"
                  } ${activeTab === item.id ? "text-orange" : ""}`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-orange transition-all duration-300 ${
                      activeTab === item.id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              ))}
            </div>
            {/* Reserve Button (Desktop) */}
            <div className="hidden lg:block">
              <Button
                onClick={openReservationModal}
                className={`text-sm font-bold tracking-wide transition-all duration-300   hover:scale-110 hover:shadow-lg focus:outline-none ${
                  isScrolled
                    ? "bg-[#EC4E20] text-white hover:bg-[#f97316] hover:text-black "
                    : "bg-[#EC4E20] text-white hover:bg-[#f97316] hover:text-black "
                }`}
              >
                RESERVE
              </Button>
            </div>
            {/* Mobile menu button (Sheet Trigger) */}
            <div className="lg:hidden ">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`p-2 transition-all duration-300 hover:scale-110 focus:outline-none ${
                      isScrolled ? "text-black hover:text-orange" : "text-white hover:text-orange"
                    }`}
                  >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[20rem] h-[30rem] bg-white p-8 overflow-y-auto">
                  <div className="flex flex-col space-y-8 pt-12">
                    {mobileNavItems.map((item, index) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          item.action()
                          setIsOpen(false) // Close sheet after action
                        }}
                        className="block text-left text-sm font-semibold tracking-wide text-gray-800 hover:text-orange transition-colors hover:translate-x-2"
                      >
                        {item.label}
                      </button>
                    ))}
                    <Button
                      onClick={() => {
                        openReservationModal()
                        setIsOpen(false) // Close mobile menu
                      }}
                      className="bg-orange text-white text-sm rounded-xl tracking-wide mt-2 hover:bg-black transition-all duration-300 w-[130px]"
                    >
                      RESERVE
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <ReservationModal
        open={isReservationModalOpen}
        onOpenChange={setIsReservationModalOpen}
        isContactForm={modalType === "contact"}
      />
    </>
  )
}
