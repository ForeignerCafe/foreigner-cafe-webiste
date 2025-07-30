import type React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { cookies } from "next/headers";
import { Onest } from "next/font/google";
import Header from "@/components/dashboard/dashboard-header";
import { ThemeProvider } from "@/components/theme-provider";

// Apply the Onest font using the font variable
const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <div className={`${onest.className} ${onest.variable}`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <SidebarInset>
            <div className="p-2">
              <Header />
            </div>
            <div className="min-h-screen bg-gray-50 dark:bg-black overflow-y-auto">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
