import type React from "react";
import TawkToChat from "@/components/TawkToChat";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Preloader from "@/components/preloader";
import { CartProvider } from "@/contexts/cart-context";
import { CartIcon } from "@/components/cart/cart-icon";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <CartProvider>
      <Preloader />
      <Navigation /> 
      {children}
      <CartIcon />
      <Footer />
      <TawkToChat />
      </CartProvider>
    </>
  );
}
