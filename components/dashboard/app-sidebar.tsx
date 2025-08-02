"use client"

import {
  LayoutDashboard,
  FileText,
  Plus,
  Mail,
  MessageSquare,
  LogOut,
  ChevronRight,
  SubscriptIcon,
  FolderOpen,
  Package,
  ShoppingCart,
  Settings,
  Percent,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import axiosInstance from "@/lib/axios"
import toast from "react-hot-toast"

const navItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Blogs", url: "/admin/blogs", icon: FileText },
  { title: "Add Blog", url: "/admin/add-blog", icon: Plus },
]

const shopItems = [
  { title: "Categories", url: "/admin/categories", icon: FolderOpen },
  { title: "Products", url: "/admin/products", icon: Package },
  { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
  {
      url: "/admin/coupons",
      icon: Percent,
      title: "Coupons",
   
    },
]

const cmsItems = [
  { title: "Content Management", url: "/admin/cms", icon: Settings },
  { title: "Subscribers", url: "/admin/subscribers", icon: SubscriptIcon },
  { title: "Newsletter Management", url: "/admin/news-letter", icon: Mail },
  { title: "Contact Requests", url: "/admin/contact-request", icon: MessageSquare },
]

const supportItems = [{ title: "Log out", url: "/admin/logout", icon: LogOut }]

export function AppSidebar() {
  const pathname = usePathname()
  const [cmsOpen, setCmsOpen] = useState(false)

  const isActive = (url: string) => (url === "/admin/dashboard" ? pathname === url : pathname.startsWith(url))

  const handleLogout = async () => {
    const toastId = toast.loading("Signing out...")
    try {
      const res = await axiosInstance.post("/api/auth/logout")
      if (res.data.success) {
        toast.success("Logout successful!", { id: toastId })
        window.location.href = "/login"
      } else {
        toast.error(res.data.message || "Logout failed", { id: toastId })
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId })
    }
  }

  return (
    <>
      <style jsx global>{`
        .sidebar-menu-button:focus,
        .sidebar-menu-button:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
        .sidebar-menu-link:focus,
        .sidebar-menu-link:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
        .sidebar-content-no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .sidebar-content-no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
      <Sidebar className="border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-sm">
        <SidebarHeader className="border-b border-gray-200 dark:border-gray-800 p-5">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-lg">FC</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Foreigners Cafe</h2>
          </div>
        </SidebarHeader>

        <SidebarContent className="p-1 overflow-y-auto sidebar-content-no-scrollbar">
          {/* General */}
          <SidebarGroup>
            <p className="text-sm text-gray-500 uppercase px-2 mb-1">General</p>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`sidebar-menu-button w-full justify-start px-3 py-2 rounded-md flex items-center space-x-3 transition-colors
                        hover:bg-gray-100 dark:hover:bg-gray-800
                        ${
                          isActive(item.url)
                            ? "bg-gray-100 dark:bg-[#28282B] text-orange-500 border-orange-500 dark:border-orange-400 border-l-2"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                    >
                      <Link href={item.url} className="sidebar-menu-link">
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Shop */}
          <SidebarGroup className="-mt-2">
            <p className="text-xs text-gray-500 uppercase px-2 mb-0.5">Shop</p>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {shopItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`sidebar-menu-button w-full justify-start px-3 py-2 rounded-md flex items-center space-x-3 transition-colors
              hover:bg-gray-100 dark:hover:bg-gray-800
              ${
                isActive(item.url)
                  ? "bg-gray-100 dark:bg-[#28282B] text-orange-500 border-orange-500 dark:border-orange-400 border-l-2"
                  : "text-gray-600 dark:text-gray-400"
              }`}
                    >
                      <Link href={item.url} className="sidebar-menu-link">
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* CMS */}
          <SidebarGroup className="-mt-2">
            <p className="text-xs text-gray-500 uppercase px-2 mb-0.5">CMS</p>
            <Collapsible open={cmsOpen} onOpenChange={setCmsOpen}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full justify-between px-2 py-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none">
                  <span className="flex items-center space-x-1">
                    <ChevronRight
                      className="w-4 h-4 transition-transform"
                      style={{ transform: cmsOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                    />
                    <span>Manage CMS</span>
                  </span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-1 ml-6">
                <SidebarMenu className="space-y-1">
                  {cmsItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`sidebar-menu-button w-full justify-start px-2 py-2 rounded-md flex items-center space-x-3 transition-colors
                          hover:bg-gray-100 dark:hover:bg-gray-800
                          ${
                            isActive(item.url)
                              ? "bg-gray-100 dark:bg-[#28282B] text-orange-500 border-orange-500 dark:border-orange-400 border-l-2"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                      >
                        <Link href={item.url} className="sidebar-menu-link">
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        </SidebarContent>

        {/* Support */}
        <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 p-1">
          <SidebarGroup>
            <p className="text-sm text-gray-500 uppercase px-2 mb-2">Support</p>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {supportItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.title === "Log out" ? (
                      <SidebarMenuButton
                        onClick={handleLogout}
                        className={`sidebar-menu-button w-full justify-start px-2 py-2 rounded-md flex items-center space-x-3 transition-colors
                          hover:bg-gray-100 dark:hover:bg-gray-800
                          text-gray-600 dark:text-gray-400`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        className={`sidebar-menu-button w-full justify-start px-2 py-2 rounded-md flex items-center space-x-3 transition-colors
                          hover:bg-gray-100 dark:hover:bg-gray-800
                          ${
                            isActive(item.url)
                              ? "bg-gray-100 dark:bg-[#28282B] text-orange-500 border-orange-500 dark:border-orange-400 border-l-2"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                      >
                        <Link href={item.url} className="sidebar-menu-link">
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
