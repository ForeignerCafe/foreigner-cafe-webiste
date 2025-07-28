"use client";

import type React from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { BackButton } from "@/components/back-button";
import { Onest } from "next/font/google";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isForgotPassword = pathname?.includes('forgot-password');

  return (
     <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
    <div className={`min-h-screen relative flex items-center justify-center p-3 sm:p-4 lg:p-6 overflow-hidden ${onest.className}`}>
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/auth.webp')",
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 dark:bg-black/90" />
      </div>

      {/* Header Controls */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex justify-between items-center z-10">
        <BackButton/>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-center relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Left Side - Welcome Content */}
        <div className="hidden lg:block space-y-6 xl:space-y-8 px-4 xl:px-8">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8 xl:mb-12">
            <div className="w-10 h-10 xl:w-12 xl:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2lg xl:text-xl">FC</span>
            </div>
            <span className="text-white text-3xl xl:text-4xl font-bold">Foreigners Cafe</span>
          </div>

          <div className="space-y-4 xl:space-y-6">
            <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white leading-tight">
              {isForgotPassword ? 'Password Recovery' : 'Admin Portal'}
            </h1>
            <p className="text-gray-200 text-lg xl:text-xl leading-relaxed max-w-lg">
              {isForgotPassword 
                ? "Don't worry, it happens to the best of us. Enter your admin email address and we'll send you a secure link to reset your password and regain access to your dashboard."
                : "Welcome to the Foreigner Cafe management dashboard. Access your admin panel to manage orders, menu items, staff, and business analytics. Your restaurant management hub awaits."}
            </p>
          </div>
        </div>

        {/* Right Side - Form Content */}
        {children}
      </div>
    
    </div>
     </ThemeProvider>
  );
}
