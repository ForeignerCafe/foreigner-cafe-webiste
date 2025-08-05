import { FileText } from "react-feather"
import Sidebar from "./Sidebar"

const AppSidebar = () => {
  const navigationItems = [
    {
      title: "Dashboard",
      icon: "home",
      url: "/admin/dashboard",
    },
    {
      title: "Users",
      icon: "users",
      url: "/admin/users",
    },
    {
      title: "Content Management",
      icon: FileText,
      items: [
        {
          title: "Homepage",
          url: "/admin/cms",
        },
        {
          title: "Events Page",
          url: "/admin/cms/events",
        },
        {
          title: "Gallery Page",
          url: "/admin/cms/gallery",
        },
        {
          title: "Experiences Page",
          url: "/admin/cms/experiences",
        },
        {
          title: "FAQs Page",
          url: "/admin/cms/faqs",
        },
        {
          title: "Blog Management",
          url: "/admin/cms/blogs",
        },
      ],
    },
    {
      title: "Settings",
      icon: "settings",
      url: "/admin/settings",
    },
    // ** rest of code here **
  ]

  return <Sidebar items={navigationItems} />
}

export default AppSidebar
