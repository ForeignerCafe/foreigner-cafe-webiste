//@ts-nocheck
"use client"
import { useState, useEffect } from "react"
import { Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ReservationModal } from "./reserveModal"
import axiosInstance from "@/lib/axios"
import { usePathname } from "next/navigation";
import Image from "next/image"
import Link from "next/link"

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

export default function Navigation() {
  const pathname = usePathname();
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isTopHeaderHidden, setIsTopHeaderHidden] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [topNavActiveItem, setTopNavActiveItem] = useState<string>("DINE")
  const [modalType, setModalType] = useState<"reservation" | "contact">("reservation")
  const [headerContent, setHeaderContent] = useState<HeaderContent>({
    logo: "FOREIGNER CAFE",
    topNavItems: [],
    mainNavItems: [],
    reserveButtonText: "RESERVE",
  })
  const [isLoading, setIsLoading] = useState(true)

  const topHeaderHeight = 65
  const mainNavHeight = 64
  const progressBarHeight = 1
  const router = useRouter()

  useEffect(() => {
    fetchHeaderContent()
  }, [])

  useEffect(() => {
  if (pathname === "/") {
    setActiveTab("HOME");
  } else {
    const currentItem = headerContent.mainNavItems.find(item => item.href === pathname);
    if (currentItem) setActiveTab(currentItem.label);
  }
}, [pathname, headerContent.mainNavItems]);

  const fetchHeaderContent = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get("/api/cms/header")
      if (response.data.success) {
        setHeaderContent(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch header content:", error)
    } finally {
      setIsLoading(false)
    }
  }

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

  const scrollToSection = (sectionId: string, offset = 80) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const topPosition = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({
        top: topPosition,
        behavior: "smooth",
      })
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

  const handleNavItemAction = (item: HeaderNavItem) => {
    if (item.action === "scroll" && item.sectionId) {
      scrollToSection(item.sectionId)
    } else if (item.action === "navigate" && item.href) {
      router.push(item.href)
    } else if (item.action === "external" && item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer")
    } else if (item.href) {
      if (item.isExternal) {
        window.open(item.href, "_blank", "noopener,noreferrer")
      } else {
        router.push(item.href)
      }
    }
  }

  // Create combined mobile nav items
  const mobileNavItems = [
    ...headerContent.topNavItems.map((item) => ({ ...item, isTopNavItem: true })),
    { label: "---", action: "divider", isDivider: true },
    ...headerContent.mainNavItems,
    {
      label: "CONTACT US",
      action: "contact",
    },
  ]

  const handleTabClick = (id: string, action: () => void) => {
    setActiveTab(id)
    action()
  }

  const handleTopNavClick = (item: string) => {
    setTopNavActiveItem(item)
  }

  if (isLoading) {
    return (
      <nav className="fixed left-0 right-0 z-40 top-1 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex justify-between items-center h-16">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="hidden lg:flex items-center space-x-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              ))}
            </div>
            <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        </div>
      </nav>
    )
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
          {/* Left section: First top nav item */}
          {headerContent.topNavItems.length > 0 && (
            <div
              className={`flex items-center px-6 font-medium text-sm tracking-wide uppercase h-full ${
                topNavActiveItem === headerContent.topNavItems[0].label
                  ? "bg-[#EC4E20] text-white"
                  : "bg-[#F8F8F8] text-[#A0A0A0] hover:text-gray-700"
              }`}
            >
              <button
                className="hover:opacity-80 transition-opacity"
                onClick={() => {
                  handleNavItemAction(headerContent.topNavItems[0])
                  handleTopNavClick(headerContent.topNavItems[0].label)
                }}
              >
                {headerContent.topNavItems[0].label}
              </button>
            </div>
          )}
          {/* Right section: Navigation links and Action buttons */}
          <div className="flex-1 bg-[#F8F8F8] flex items-center justify-between px-6 h-full">
            {/* Navigation links */}
            <nav className="flex space-x-0 text-[#A0A0A0] font-medium text-sm tracking-wide uppercase">
              {headerContent.topNavItems.slice(1).map((item, index) => (
                <div
                  key={index}
                  className={`px-6 h-10 flex items-center ${
                    topNavActiveItem === item.label ? "bg-[#EC4E20] text-white" : "hover:text-gray-700"
                  }`}
                >
                  <button
                    className="transition-colors"
                    onClick={() => {
                      handleNavItemAction(item)
                      handleTopNavClick(item.label)
                    }}
                  >
                    {item.label}
                  </button>
                </div>
              ))}
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
      <Link href="/" className="focus:outline-none transition-all duration-300 hover:scale-110 block"  onClick={() => setActiveTab("HOME")}>
        <Image
          src="https://i.ibb.co/Kxd5rKCy/foreigner-animater.gif"
          alt="Logo"
          width={160}
          height={80}
          priority
          className={`${isScrolled ? " pt-2.5" : " pt-2.5"}`}
        />
      </Link>
    </div>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {headerContent.mainNavItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(item.label, () => handleNavItemAction(item))}
                  className={`text-sm font-medium tracking-wide transition-all duration-200 hover:scale-110 relative group focus:outline-none ${
                    isScrolled ? "text-black/80 hover:text-orange" : "text-white/80 hover:text-orange"
                  } ${activeTab === item.label ? "text-orange" : ""}`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-orange transition-all duration-300 ${
                      activeTab === item.label ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              ))}
            </div>
            {/* Reserve Button (Desktop) */}
            <div className="hidden lg:block">
              <a
  href="https://ohbz.com/l/88300cb6-e73f-4e18-891b-a58140f9e8e2"
  className={`text-sm font-bold tracking-wide transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none ${
    isScrolled
      ? "bg-[#EC4E20] text-white hover:bg-[#f97316] hover:text-black "
      : "bg-[#EC4E20] text-white hover:bg-[#f97316] hover:text-black "
  }`}
>
  {headerContent.reserveButtonText}
</a>

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
                  <SheetHeader className="sr-only">
                    <SheetTitle>Mobile Navigation Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-6 pt-12">
                    {mobileNavItems.map((item, index) => {
                      // Handle divider
                      if (item.isDivider) {
                        return <div key={index} className="border-t border-gray-200 my-2" />
                      }

                      // Handle contact action
                      if (item.action === "contact") {
                        return (
                          <button
                            key={item.label}
                            onClick={() => {
                              openContactModal()
                              setIsOpen(false)
                            }}
                            className="block text-left text-sm font-semibold tracking-wide text-gray-600 hover:text-orange transition-colors hover:translate-x-2"
                          >
                            {item.label}
                          </button>
                        )
                      }

                      // Handle top nav items with special styling
                      if (item.isTopNavItem) {
                        return (
                          <button
                            key={item.label}
                            onClick={() => {
                              handleNavItemAction(item)
                              setIsOpen(false)
                            }}
                            className={`block text-left text-sm font-bold tracking-wide transition-colors hover:translate-x-2 ${
                              topNavActiveItem === item.label ? "text-orange" : "text-gray-800 hover:text-orange"
                            }`}
                          >
                            {item.label}
                          </button>
                        )
                      }

                      // Handle regular nav items
                      return (
                        <button
                          key={item.label}
                          onClick={() => {
                            handleNavItemAction(item)
                            setIsOpen(false)
                          }}
                          className="block text-left text-sm font-semibold tracking-wide text-gray-600 hover:text-orange transition-colors hover:translate-x-2"
                        >
                          {item.label}
                        </button>
                      )
                    })}

                    <a
  href="https://ohbz.com/l/88300cb6-e73f-4e18-891b-a58140f9e8e2"
  className="bg-orange text-white text-sm rounded-xl tracking-wide mt-6 hover:bg-black transition-all duration-300 w-[130px] flex items-center justify-center"
>
  {headerContent.reserveButtonText}
</a>

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
