"use client";
import { useEffect } from "react";

export default function TawkToChat() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/6897065e5d90a019271e94a0/1j26v1p2b";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return null;
}
