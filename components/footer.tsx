"use client"
import { useState, useEffect } from "react"
import { ReservationModal } from "./reserveModal"
import { useRouter } from "next/navigation"
import { Facebook, Instagram, Globe } from "lucide-react"
import toast from "react-hot-toast"
import axiosInstance from "@/lib/axios"

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

export default function Footer() {
  const [email, setEmail] = useState("")
  const router = useRouter()
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"reservation" | "contact">("reservation")
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
      title: "STAY CONNECTED",
      description: "Receive The Foreigner Cafe news directly to you.",
    },
    copyright: "",
  })
  const [loading, setLoading] = useState(true)

  // Fetch footer content
  useEffect(() => {
    fetchFooterContent()
  }, [])

  const fetchFooterContent = async () => {
    try {
      const response = await axiosInstance.get("/api/cms/footer")
      if (response.data.success) {
        setFooterContent(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch footer content:", error)
    } finally {
      setLoading(false)
    }
  }

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

  const handleLinkClick = (link: FooterLink) => {
    switch (link.action) {
      case "scroll":
        if (link.sectionId) {
          scrollToSection(link.sectionId)
        }
        break
      case "navigate":
        if (link.href) {
          router.push(link.href)
        }
        break
      case "external":
        if (link.href) {
          window.open(link.href, "_blank", "noopener,noreferrer")
        }
        break
      case "modal":
        openContactModal()
        break
      default:
        if (link.href) {
          window.open(link.href, "_blank", "noopener,noreferrer")
        }
        break
    }
  }

  const handleSubscribe = async () => {
    const toastId = toast.loading("Subscribing...")
    if (!email) {
      toast.error("Please enter a valid email", { id: toastId })
      return
    }
    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setEmail("")
        toast.success("Subscribed successfully!", { id: toastId })
      } else if (res.status === 409) {
        toast.error("Already subscribed!", { id: toastId })
      } else {
        toast.error("Subscription failed!", { id: toastId })
      }
    } catch (error) {
      console.error("Subscription error:", error)
      toast.error("Something went wrong.", { id: toastId })
    }
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Facebook":
        return Facebook
      case "Instagram":
        return Instagram
      case "Globe":
        return Globe
      default:
        return Globe
    }
  }

  if (loading) {
    return (
      <footer className="bg-black text-white section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-700 rounded w-24 mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-3 bg-gray-700 rounded w-20"></div>
                    <div className="h-3 bg-gray-700 rounded w-16"></div>
                    <div className="h-3 bg-gray-700 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer id="contact" className="bg-black text-white section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Dynamic Footer Sections */}
          {footerContent.sections.map((section, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <h4 className="text-sm font-display font-bold mb-6 tracking-wide text-white">{section.title}</h4>
              {section.title === "LOCATION & HOURS" ? (
                // Special handling for Location & Hours section
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
                // Regular links
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={() => handleLinkClick(link)}
                        className="text-sm text-gray-300 hover:text-orange transition-colors duration-200 text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Newsletter Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h4 className="text-sm font-display font-bold mb-6 tracking-wide text-white">
              {footerContent.newsletterSection.title}
            </h4>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">{footerContent.newsletterSection.description}</p>
            <div className="flex mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 px-4 py-3 bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-orange"
              />
              <button
                onClick={handleSubscribe}
                className="bg-orange text-white px-6 py-3 text-sm hover:bg-white hover:text-black transition-colors duration-200 font-medium"
              >
                →
              </button>
            </div>
            {/* Social Media */}
            <div className="flex space-x-4">
              {footerContent.socialMedia.map((social, index) => {
                const IconComponent = getIconComponent(social.icon)
                return (
                  <button
                    key={index}
                    onClick={() => window.open(social.url, "_blank", "noopener,noreferrer")}
                    aria-label={`Visit Foreigner Cafe ${social.platform}`}
                    className="w-10 h-10 bg-gray-800 hover:bg-orange text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  >
                    <IconComponent className="w-5 h-5" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <button
                onClick={() => scrollToSection("home")}
                className="text-2xl font-display font-bold text-white hover:text-orange transition-colors duration-200"
              >
                FOREIGNER CAFE
              </button>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-8 text-xs text-gray-400 mb-6 md:mb-0">
              <button
                onClick={() => openReservationModal()}
                className="hover:text-orange transition-colors duration-200 tracking-wide"
              >
                RESERVE
              </button>
              <button
                onClick={() => router.push("/privacy")}
                className="hover:text-orange transition-colors duration-200 tracking-wide"
              >
                PRIVACY
              </button>
              <button
                onClick={() => router.push("/privacy")}
                className="hover:text-orange transition-colors duration-200 tracking-wide"
              >
                TERMS
              </button>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500 tracking-wide">{footerContent.copyright}</p>
          </div>
        </div>
      </div>

      <ReservationModal
        open={isReservationModalOpen}
        onOpenChange={setIsReservationModalOpen}
        isContactForm={modalType === "contact"}
      />
    </footer>
  )
}
