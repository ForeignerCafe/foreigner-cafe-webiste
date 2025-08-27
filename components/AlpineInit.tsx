"use client";

import { useEffect } from "react";

export default function AlpineProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    import("alpinejs").then((Alpine) => {
      window.Alpine = Alpine.default;
      Alpine.default.start();
    });
  }, []);

  return <>{children}</>;
}
