import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { CustomToaster } from "@/components/custom-toaster"
import { CartProvider } from "@/contexts/cart-context"
import LenisProvider from "@/components/LenisProvider"
import TawkToChat from "@/components/TawkToChat"
import AnalyticsTracker from "@/components/analytics-tracker"

export const metadata: Metadata = {
  title: "Foreigners Cafe",
  description: "Experience the best cafe culture",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            <LenisProvider>
              <AnalyticsTracker />
              {children}
              <TawkToChat />
            </LenisProvider>
          </CartProvider>
          <Toaster />
          <CustomToaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
