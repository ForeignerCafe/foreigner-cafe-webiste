import type React from "react";
import TawkToChat from "@/components/TawkToChat";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Preloader from "@/components/preloader";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Preloader />
      <Navigation /> 
      {children}
      <Footer />
      <TawkToChat />
    </>
  );
}
