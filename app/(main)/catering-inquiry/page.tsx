"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import toast, { Toaster } from "react-hot-toast" // Import Toaster
import axiosInstance from "@/lib/axios"

export default function Page() {
  const [formData, setFormData] = useState({
    name: "", // Added name field
    email: "", // Added email field
    phone: "", // Added phone field
    guests: "",
    eventType: "",
    eventDate: "",
    eventTime: "",
    budget: "",
    dietaryNeeds: "",
    amenities: "",
    ownItems: "",
    eventDuration: "",
    accessibility: "",
    finalizeDate: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setIsSubmitted(false) // Reset submission status on new attempt
    try {
      const response = await axiosInstance.post("/api/inquiry", formData)
      if (response.status === 200) {
        toast.success("Catering inquiry submitted successfully!")
        setIsSubmitted(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          guests: "",
          eventType: "",
          eventDate: "",
          eventTime: "",
          budget: "",
          dietaryNeeds: "",
          amenities: "",
          ownItems: "",
          eventDuration: "",
          accessibility: "",
          finalizeDate: "",
        })
        const formElement = document.getElementById("catering-form")
        if (formElement) {
          formElement.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      } else {
        toast.error("Failed to submit inquiry. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting catering inquiry:", error)
      toast.error("An error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Toaster position="top-center" /> {/* Add Toaster component */}
      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-center text-white overflow-hidden">
        <Image
          src="/images/expHero.webp"
          alt="People gathering under string lights"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
        <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight sm:mb-10 mt-14 uppercase">
            Catering Services
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-xl max-w-2xl mx-auto pb-6 sm:pb-10">
            For any catering inquiries, please email us directly at{" "}
            <a href="mailto:Service@foreignercafe.com" className="underline">
              Service@foreignercafe.com
            </a>
            , or fill out the form below for simple requests.
          </p>
          <Button
            onClick={() => scrollToSection("catering-form")}
            className="hover:scale-110 bg-[#EC4E20] hover:bg-[#f97316] hover:text-black text-white px-6 sm:px-8 py-3 text-base sm:text-lg"
          >
            Submit an Inquiry
          </Button>
        </div>
      </section>
      {/* Catering Inquiry Form Section */}
      <section id="catering-form" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-4 mt-6 sm:mt-10 tracking-wide">
            Catering Inquiry Form
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-8 sm:mb-14">
            Please provide us with details about your event, and we will get back to you as soon as possible.
          </p>
          <Card className="mx-auto max-w-3xl p-6 sm:p-8 shadow-xl rounded-lg text-left border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-bold text-center text-gray-800">Event Details</CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md text-center" role="alert">
                  Thank you for your inquiry! We have received your submission and will get back to you shortly.
                </div>
              )}
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                {/* Contact Information Section */}
                <div className="border-b pb-6 mb-6 border-gray-200">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">Your Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="e.g., John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="e.g., john.doe@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2 col-span-full md:col-span-1">
                      <Label htmlFor="phone">Your Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="e.g., +1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Event Details Section */}
                <div className="border-b pb-6 mb-6 border-gray-200">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">Event Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="guests">How many guests are you expecting at your event?</Label>
                      <Input
                        id="guests"
                        type="number"
                        placeholder="e.g., 50"
                        value={formData.guests}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventType">What type of event are you planning?</Label>
                      <Input
                        id="eventType"
                        type="text"
                        placeholder="e.g., Birthday, Meeting, Shower"
                        value={formData.eventType}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventDate">When would you like to hold your event (Date)?</Label>
                      <Input id="eventDate" type="date" value={formData.eventDate} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventTime">When would you like to hold your event (Time)?</Label>
                      <Input id="eventTime" type="time" value={formData.eventTime} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2 col-span-full">
                      <Label htmlFor="eventDuration">How long do you expect your event to last?</Label>
                      <Input
                        id="eventDuration"
                        type="text"
                        placeholder="e.g., 3 hours, Full day"
                        value={formData.eventDuration}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2 col-span-full">
                      <Label htmlFor="finalizeDate">When would you like to finalize your booking?</Label>
                      <Input id="finalizeDate" type="date" value={formData.finalizeDate} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                {/* Specific Requirements Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">Specific Requirements</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Do you have a budget for the event space and catering?</Label>
                      <Input
                        id="budget"
                        type="text"
                        placeholder="e.g., $1000 - $2000, Flexible"
                        value={formData.budget}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dietaryNeeds">
                        Are there specific menu items or dietary needs (e.g., gluten-free, vegetarian, Halal) for your
                        group?
                      </Label>
                      <Textarea
                        id="dietaryNeeds"
                        placeholder="Please list any specific requirements..."
                        value={formData.dietaryNeeds}
                        onChange={handleChange}
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amenities">
                        Will you need any special amenities, like Wi-Fi, audio-visual equipment, or decorations?
                      </Label>
                      <Textarea
                        id="amenities"
                        placeholder="Specify any amenities needed..."
                        value={formData.amenities}
                        onChange={handleChange}
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ownItems">Do you plan to bring your own decorations, music, or alcohol?</Label>
                      <Textarea
                        id="ownItems"
                        placeholder="Please specify what you plan to bring..."
                        value={formData.ownItems}
                        onChange={handleChange}
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accessibility">
                        Will any guests need accessibility accommodations (e.g., wheelchair access)?
                      </Label>
                      <Textarea
                        id="accessibility"
                        placeholder="Please describe any accessibility needs..."
                        value={formData.accessibility}
                        onChange={handleChange}
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full flex justify-center mt-6">
                  <Button
                    type="submit"
                    className="bg-[#EC4E20] hover:bg-[#f97316] hover:text-black text-white px-8 py-3 text-base sm:text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Inquiry"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
