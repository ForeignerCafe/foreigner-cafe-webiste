"use client";
import { useState } from "react";
import { ReservationModal } from "./reserveModal";
import { useRouter } from "next/navigation";
import { Facebook, Instagram, Globe } from "lucide-react";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"reservation" | "contact">(
    "reservation"
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openReservationModal = () => {
    setModalType("reservation");
    setIsReservationModalOpen(true);
  };

  const openContactModal = () => {
    setModalType("contact");
    setIsReservationModalOpen(true);
  };

  const handleSubscribe = async () => {
    const toastId = toast.loading("Subscribing...");
    if (!email) {
      toast.error("Please enter a valid email", { id: toastId });
      return;
    }
    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setEmail("");
        toast.success("Subscribed successfully!", { id: toastId });
      } else if (res.status === 409) {
        toast.error("Already subscribed!", { id: toastId });
      } else {
        toast.error("Subscription failed!", { id: toastId });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Something went wrong.", { id: toastId });
    }
  };

  return (
    <footer id="contact" className="bg-black text-white section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* About Us */}
          <div className="animate-fade-in-up">
            <h4 className="text-sm font-display font-bold mb-6 tracking-wide text-white">
              ABOUT US
            </h4>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => scrollToSection("story")}
                  className="text-sm text-gray-300 hover:text-orange transition-colors duration-200 text-left"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/place/foreigner+cafe+san+mateo/data=!4m2!3m1!1s0x808f9ffb12544205:0x5e89d06013ecbdc?sa=X&ved=1t:242&ictx=111",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="text-sm text-gray-300 hover:text-orange transition-colors duration-200 text-left"
                >
                  Location
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    openContactModal();
                  }}
                  className="text-sm text-gray-300 hover:text-orange transition-colors duration-200 text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <h4 className="text-sm font-display font-bold mb-6 tracking-wide text-white">
              LOCATION & HOURS
            </h4>
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <p>
                  Foreigner Cafe, 60 E 3rd Ave Ste 108, San Mateo, CA 94401,
                  United States
                </p>
              </div>
              <div>
                <p className="font-medium text-white">
                  Mon-Fri: 8:00am - 4:00pm
                </p>
                <p className="font-medium text-white">
                  Sat-Sun: 8:30am - 4:00pm
                </p>
              </div>
              <div>
                <p>+1 (650) 620 1888</p>
                <p>service@foreignercafe.com</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h4 className="text-sm font-display font-bold mb-6 tracking-wide text-white">
              SERVICES
            </h4>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() =>
                    window.open(
                      "https://order.toasttab.com/online/foreigner-60-east-3rd-avenue",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="text-sm text-gray-300 hover:text-orange transition-colors duration-200 text-left"
                >
                  Takeaway
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    window.open(
                      "https://order.toasttab.com/online/foreigner-60-east-3rd-avenue",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="text-sm text-gray-300 hover:text-orange transition-colors duration-200 text-left"
                >
                  Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    window.open(
                      "https://www.toasttab.com/foreigner-60-east-3rd-avenue/giftcards",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="text-sm text-gray-300 hover:text-orange transition-colors duration-200 text-left"
                >
                  Gift Cards
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/events")}
                  className="text-sm text-gray-300 hover:text-orange transition-colors duration-200 text-left"
                >
                  Events
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <h4 className="text-sm font-display font-bold mb-6 tracking-wide text-white">
              STAY CONNECTED
            </h4>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Receive The Foreigner Cafe news directly to you.
            </p>
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
              {/* Facebook */}
              <button
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/foreignercafe/",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                aria-label="Visit Foreigner Cafe Facebook"
                className="w-10 h-10 bg-gray-800 hover:bg-orange text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </button>
              {/* Instagram */}
              <button
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/foreignercafe/?hl=en",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                aria-label="Visit Foreigner Cafe Instagram"
                className="w-10 h-10 bg-gray-800 hover:bg-orange text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </button>
              {/* Google */}
              <button
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/place/Foreigner+Cafe/@37.5637466,-122.3247235,17z/data=!3m1!4b1!4m6!3m5!1s0x808f9ffb12544205:0x5e89d06013ecbdc!8m2!3d37.5637466!4d-122.3247235!16s%2Fg%2F11h0m6rnjj?entry=ttu&g_ep=EgoyMDI1MDcyMi4wIKXMDSoASAFQAw%3D%3D",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                aria-label="View Foreigner Cafe on Google Maps"
                className="w-10 h-10 bg-gray-800 hover:bg-orange text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <Globe className="w-5 h-5" />
              </button>
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
            <p className="text-xs text-gray-500 tracking-wide">
              © {new Date().getFullYear()} The Foreigner Cafe. Website by{" "}
              <a
                href="https://cybitronix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-700"
              >
                Cybitronix
              </a>
            </p>
          </div>
        </div>
      </div>

      <ReservationModal
        open={isReservationModalOpen}
        onOpenChange={setIsReservationModalOpen}
        isContactForm={modalType === "contact"}
      />
    </footer>
  );
}
