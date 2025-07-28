"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ReservationModal } from "./reserveModal"

export default function InfoSection() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"reservation" | "contact">("reservation")

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

  return (
    <section id="info" className="bg-gray-50 section-padding texture-wood">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-12 font-medium">
          <button onClick={() => scrollToSection("home")} className="hover:text-orange transition-colors">
            Home
          </button>
          <span className="mx-2 text-gray-400">›</span>
          <span className="text-gray-700">The Foreigner Cafe</span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Open Hours */}
          <div className="animate-fade-in-up">
            <h3 className="text-lg font-display font-bold mb-6 tracking-wide text-black">OPEN HOURS</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-black mb-2">Mon - Fri</div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  Dine In: 7:30am 'til 4:00pm
                  <br />
                  Takeaway: 7:00am 'til 4:00pm
                </div>
              </div>
              <div className="pt-2">
                <div className="text-sm font-medium text-black mb-2">Sat & Sun</div>
                <div className="text-sm text-gray-600 leading-relaxed">Dine In & Takeaway: 7:30am 'til 4:00pm</div>
              </div>
              <div className="text-xs text-gray-500 pt-4 leading-relaxed">
                Last orders are taken 1 hour prior to closing time.
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-lg font-display font-bold mb-6 tracking-wide text-black">LOCATION</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>"Foreigner Cafe, 60 E 3rd Ave Ste 108, San Mateo, CA 94401, United States"</p>

              <p className="pt-4">
                <button
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/place/foreigner+cafe+san+mateo/data=!4m2!3m1!1s0x808f9ffb12544205:0x5e89d06013ecbdc?sa=X&ved=1t:242&ictx=111",
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                  className="text-orange hover:text-black transition-colors duration-200 font-medium hover:underline"
                >
                  View & Directions
                </button>
              </p>
            </div>
          </div>

          {/* Reservations */}
          <div id="reservations" className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg font-display font-bold mb-6 tracking-wide text-black">RESERVATIONS</h3>
            <div className="text-sm text-gray-600 space-y-6">
              <p className="leading-relaxed">
                Bookings of up to 12 people can book online and walk-ins are always welcome.
              </p>
              <div>
                <Button
                  onClick={() => openReservationModal()}
                  className="btn-primary text-sm font-bold tracking-wide hover-lift"
                >
                  RESERVE
                </Button>
              </div>
              <p></p>
            </div>
          </div>

          {/* Group Bookings */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-lg font-display font-bold mb-6 tracking-wide text-black">GROUP BOOKINGS</h3>
            <div className="text-sm text-gray-600 leading-relaxed">
              <p>Contact us to make a reservation for groups of 13 people or more.</p>
              <p className="pt-6">
                <button
                  onClick={() => {
                    openContactModal()
                  }}
                  className="text-orange hover:text-black transition-colors duration-200 font-medium hover:underline"
                >
                  Contact Us
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <ReservationModal
        open={isReservationModalOpen}
        onOpenChange={setIsReservationModalOpen}
        isContactForm={modalType === "contact"}
      />
    </section>
  )
}
