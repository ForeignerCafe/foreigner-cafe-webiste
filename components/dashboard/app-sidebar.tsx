import { Settings, SubscriptIcon, Mail, MessageSquare } from "react-feather"

const AppSidebar = () => {
  const cmsItems = [
    { title: "Content Management", url: "/admin/cms", icon: Settings },
    { title: "Events Page", url: "/admin/cms/events", icon: Settings },
    { title: "Gallery Page", url: "/admin/cms/gallery", icon: Settings },
    { title: "Experiences Page", url: "/admin/cms/experiences", icon: Settings },
    { title: "FAQs Page", url: "/admin/cms/faqs", icon: Settings },
    { title: "Subscribers", url: "/admin/subscribers", icon: SubscriptIcon },
    { title: "Newsletter Management", url: "/admin/news-letter", icon: Mail },
    { title: "Contact Requests", url: "/admin/contact-request", icon: MessageSquare },
  ]

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
      title: "CMS",
      icon: Settings,
      items: cmsItems,
    },
    {
      title: "Settings",
      icon: "settings",
      url: "/admin/settings",
    },
  ]

  return <div>{/* Sidebar component implementation goes here */}</div>
}

export default AppSidebar
