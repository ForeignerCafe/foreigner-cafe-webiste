"use client";
import { useEffect } from "react";
import Alpine from "alpinejs";

export default function AlpineInit() {
  useEffect(() => {
    if (!window.Alpine) {
      window.Alpine = Alpine;
      Alpine.start();
    }
  }, []);

  return null; // nothing to render
}
