import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import { CustomToaster } from "@/components/custom-toaster";
import { CartProvider } from "@/contexts/cart-context";
import { CartIcon } from "@/components/cart/cart-icon";
import LenisProvider from "@/components/LenisProvider";
import Preloader from "@/components/preloader";
import TawkToChat from "@/components/TawkToChat";
import AnalyticsTracker from "@/components/analytics-tracker";
import { Toaster } from "@/components/custom-toaster";

const tradeGothic = localFont({
  src: "../public/fonts/TradeGothic.otf",
  variable: "--font-trade-gothic",
});

export const metadata: Metadata = {
  title: "Foreigner Cafe - Where Community Meets Craft",
  description:
    "More than a coffee shop — we're a space where stories are shared over craft coffee, and culture meets community.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          html {
            font-family: ${tradeGothic.style.fontFamily};
            --font-trade-gothic: ${tradeGothic.variable};
          }
        `}</style>
      </head>
      <body className={`${tradeGothic.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            {/* <LenisProvider> */}
            <AnalyticsTracker />
            <Preloader />
            {children}
            <CartIcon />
            <TawkToChat />
            {/* </LenisProvider> */}
          </CartProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
