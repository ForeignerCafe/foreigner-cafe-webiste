"use client";

import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import { useRouter } from "next/navigation";
import UserProfileDropdown from "./userProfileDropdown";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const getTitle = () => {
    switch (pathname) {
      case "/admin/dashboard":
        return "Dashboard";
      case "/admin/blogs":
        return "Blogs Detail";
      case "/admin/add-blog":
        return "Add Blog";
      case "/admin/news-letter":
        return "News Letters";
      case "/admin/contact-request":
        return "Contact Requests";
      case "/admin/subscribers":
        return "Subscribers";
      case "/admin/categories":
        return "Categories";
      case "/admin/orders":
        return "Orders Detail";
      case "/admin/products":
        return "Products Detail";
      case "/admin/cms":
        return "Content Management";
      case "/admin/coupons":
        return "Coupons Detail";
       case "/admin/events":
        return "Manage Events";
         case "/admin/manage-catering":
        return "Manage Catering";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="w-full">
      <header className="flex flex-wrap md:flex-nowrap items-center gap-2 justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        {/* Left section */}
        <div className="flex items-center gap-2">
          <SidebarTrigger className="focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none" />
          <Separator orientation="vertical" className="h-4 hidden sm:block" />
          <h1 className="text-base sm:text-lg font-semibold">{getTitle()}</h1>
        </div>

        {/* Right section */}
        <div className="flex items-center flex-wrap gap-2 mt-2 md:mt-0">
          <Button
            size="sm"
            onClick={() => router.push("/admin/add-blog")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-2 rounded-md hidden sm:flex focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none "
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Blog
          </Button>

          {/* Icon-only button for mobile */}
          <Button
            size="icon"
            className="bg-orange-500 hover:bg-orange-600 text-white flex sm:hidden"
          >
            <Plus className="w-4 h-4" />
          </Button>

          <ThemeToggle />
          <UserProfileDropdown />
        </div>
      </header>
    </div>
  );
}
