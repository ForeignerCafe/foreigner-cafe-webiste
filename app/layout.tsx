import { Toaster } from "@/components/custom-toaster";
import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";
import { CartIcon } from "@/components/cart/cart-icon";

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
         
            {/* <LenisProvider /> */}
            <Preloader />
            <TawkToChat />
            {children}
            {/* <CartIcon /> */}
            <Toaster />
         
        </CartProvider>
      </body>
    </html>
  );
}
