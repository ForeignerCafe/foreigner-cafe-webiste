"use client";
import { useEffect } from "react";

export default function TawkToChat() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/686fa918affcbd1910f860f5/1ivq2p2jg";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return null;
}
