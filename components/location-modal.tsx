"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react"

interface LocationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const locationInfo = {
    address: "123 Coffee Street, Brew City, BC 12345",
    phone: "+1 (555) 123-4567",
    hours: {
      weekdays: "Monday - Friday: 7:00 AM - 9:00 PM",
      weekends: "Saturday - Sunday: 8:00 AM - 10:00 PM",
    },
    mapUrl: "https://maps.google.com/?q=123+Coffee+Street+Brew+City",
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-500" />
            Our Location
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-600">{locationInfo.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Phone</p>
                <a
                  href={`tel:${locationInfo.phone}`}
                  className="text-orange-500 hover:text-orange-600 transition-colors"
                >
                  {locationInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Hours</p>
                <p className="text-gray-600">{locationInfo.hours.weekdays}</p>
                <p className="text-gray-600">{locationInfo.hours.weekends}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => window.open(locationInfo.mapUrl, "_blank")} className="flex-1">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Map
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
