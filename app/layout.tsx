import { Toaster } from "@/components/ui/sonner";
import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";
import { CartIcon } from "@/components/cart/cart-icon";
import { ThemeProvider } from "@/components/theme-provider";
import LenisProvider from "@/components/LenisProvider";
import Preloader from "@/components/preloader";
import TawkToChat from "@/components/TawkToChat";

const tradeGothic = localFont({
  src: "../public/fonts/TradeGothic.otf",
  variable: "--font-trade-gothic",
});

export const metadata: Metadata = {
  title: "Foreigner Cafe - Where Community Meets Craft",
  description:
    "More than a coffee shop — we're a space where stories are shared over craft coffee, and culture meets community.",
    generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={`${tradeGothic.className}`}>
        <CartProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <LenisProvider />
            <Preloader />
            <TawkToChat />
            {children}
            <CartIcon />
            <Toaster />
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}
