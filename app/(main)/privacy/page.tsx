"use client"

import { ArrowLeft, Shield, FileText, Mail, Phone, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyTermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
     

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 lg:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <div className="sticky top-28">
              <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="h-2 w-2 bg-orange-500 rounded-full mr-3"></div>
                  Quick Links
                </h2>
                <nav className="space-y-2">
                  <a
                    href="#privacy"
                    className="group flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 transition-all duration-300 transform hover:translate-x-1"
                  >
                    <Shield className="w-4 h-4 mr-3 group-hover:text-orange-600" />
                    Privacy Policy
                  </a>
                  <a
                    href="#terms"
                    className="group flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 transition-all duration-300 transform hover:translate-x-1"
                  >
                    <FileText className="w-4 h-4 mr-3 group-hover:text-orange-600" />
                    Terms of Service
                  </a>
                 
                </nav>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-9">
            {/* Privacy Policy Section */}
            <section id="privacy" className="mb-16 scroll-mt-28">
              <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
                  <div className="flex items-center text-white">
                    <Shield className="w-8 h-8 mr-4" />
                    <h2 className="text-2xl lg:text-3xl font-bold">Privacy Policy</h2>
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <p className="text-orange-600 font-medium mb-8 bg-orange-50 px-4 py-2 rounded-lg inline-block">
                    Last Updated: January 2024
                  </p>
                  <div className="space-y-8">
                    <div className="group">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                          1
                        </span>
                        Information We Collect
                      </h3>
                      <div className="pl-11">
                        <p className="text-gray-700 leading-relaxed">
                          When you visit Foreigner Cafe, make reservations, or interact with our services, we may
                          collect personal information including your name, email address, phone number, and payment
                          details (processed securely through our payment partners). We also collect usage data through
                          cookies and similar technologies to improve your experience.
                        </p>
                      </div>
                    </div>

                    <div className="group">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                          2
                        </span>
                        How We Use Your Information
                      </h3>
                      <div className="pl-11">
                        <p className="text-gray-700 mb-4 leading-relaxed">Your information helps us:</p>
                        <ul className="space-y-3 text-gray-700">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            Process reservations and orders
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            Improve our services and customer experience
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            Communicate with you about your bookings and our offers (with your consent)
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            Ensure the security of our services
                          </li>
                        </ul>
                        <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                          <p className="text-green-800 font-medium">
                            We never sell your personal data to third parties.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                          3
                        </span>
                        Data Security
                      </h3>
                      <div className="pl-11">
                        <p className="text-gray-700 leading-relaxed">
                          We implement industry-standard security measures including encryption, secure servers, and
                          regular audits to protect your personal information. Our staff receives regular training on
                          data protection best practices.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Terms of Service Section */}
            <section id="terms" className="mb-16 scroll-mt-28">
              <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
                  <div className="flex items-center text-white">
                    <FileText className="w-8 h-8 mr-4" />
                    <h2 className="text-2xl lg:text-3xl font-bold">Terms of Service</h2>
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="space-y-8">
                    <div className="group">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                          1
                        </span>
                        Reservations
                      </h3>
                      <div className="pl-11">
                        <p className="text-gray-700 leading-relaxed">
                          Reservations at Foreigner Cafe are subject to availability. We hold tables for 15 minutes past
                          the booked time before releasing to other guests. For parties of 6 or more, a credit card may
                          be required to secure your reservation.
                        </p>
                      </div>
                    </div>

                    <div className="group">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                          2
                        </span>
                        Cancellations
                      </h3>
                      <div className="pl-11">
                        <p className="text-gray-700 leading-relaxed">
                          Please cancel at least 24 hours in advance for groups of 6+ or special events. Late
                          cancellations or no-shows may incur a fee of $25 per person. For regular reservations, we
                          appreciate at least 2 hours notice for cancellations.
                        </p>
                      </div>
                    </div>

                    <div className="group">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                          3
                        </span>
                        Conduct & Policies
                      </h3>
                      <div className="pl-11">
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          To ensure all guests enjoy their experience:
                        </p>
                        <ul className="space-y-3 text-gray-700">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            We reserve the right to refuse service to anyone behaving inappropriately
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            Outside food and drink is not permitted
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            Children must be supervised at all times
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            Food allergies must be reported to staff before ordering
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="group">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                          4
                        </span>
                        Liability
                      </h3>
                      <div className="pl-11">
                        <p className="text-gray-700 leading-relaxed">
                          Foreigner Cafe is not responsible for lost or stolen items. While we take every precaution
                          with food allergies, guests with severe allergies dine at their own risk. By dining with us,
                          you consent to any photography that may be used for promotional purposes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
            </div>
            <p className="text-gray-300 text-sm">© {new Date().getFullYear()} Foreigner Cafe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
