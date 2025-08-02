"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface LocationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function LocationModal({ open, onOpenChange }: LocationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className=" sm:max-w-[600px] w-[80%] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-center text-[#EC4E20] uppercase">
            Visit Foreigner Cafe
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground text-sm sm:text-base">
            Find us at our cozy spot and enjoy our craft.
          </DialogDescription>
        </DialogHeader>
        <div className=" grid gap-3 sm:gap-4 py-3 sm:py-4">
          <div className="text-center">
            <h3 className="font-semibold text-sm sm:text-md">Our Location:</h3>
            <p className="text-gray-600 text-sm sm:text-md">60 E 3rd Ave Ste 108, San Mateo, CA 94401</p>
            <p className="text-gray-600 text-xs sm:text-sm">Open Daily: 7:00 AM - 8:00 PM</p>
          </div>
          {/* Responsive Google Map Embed */}
          <div className="relative w-full aspect-video rounded-[0.5rem] overflow-hidden shadow-lg border border-gray-200">
            <iframe
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.8234567890123!2d-122.32500000000001!3d37.5630000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f9ffb12544205%3A0x5e89d06013ecbdc!2sForeigner%20Cafe!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Google Map of Foreigner Cafe location"
              className="rounded-lg"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
