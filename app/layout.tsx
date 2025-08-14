import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import { CustomToaster } from "@/components/custom-toaster";

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
  icons: {
    icon: [
      {
        url: "/favicon.ico/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      { url: "/favicon.ico/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico/favicon.ico", rel: "shortcut icon" },
    ],
    apple: [
      {
        url: "/favicon.ico/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [{ rel: "manifest", url: "/favicon.ico/site.webmanifest" }],
  },
  appleWebApp: {
    title: "Foreigner Cafe",
  },
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
        {/* <LenisProvider> */}
        <AnalyticsTracker />
        <Preloader />
        {children}

        <TawkToChat />
        {/* </LenisProvider> */}

        <Toaster />
      </body>
    </html>
  );
}
