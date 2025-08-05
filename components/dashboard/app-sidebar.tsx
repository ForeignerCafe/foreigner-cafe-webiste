import { Settings, Users, Mail, MessageSquare, Home } from "lucide-react"

const AppSidebar = () => {
  const navigationItems = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/admin/dashboard",
    },
    {
      title: "Users",
      icon: Users,
      url: "/admin/users",
    },
    {
      title: "Content Management",
      icon: Settings,
      items: [
        {
          title: "Homepage CMS",
          url: "/admin/cms",
          icon: Settings,
        },
        {
          title: "Events Page",
          url: "/admin/cms/events",
          icon: Settings,
        },
        {
          title: "Gallery Page",
          url: "/admin/cms/gallery",
          icon: Settings,
        },
        {
          title: "Experiences Page",
          url: "/admin/cms/experiences",
          icon: Settings,
        },
        {
          title: "FAQs Page",
          url: "/admin/cms/faqs",
          icon: Settings,
        },
        {
          title: "Blog Management",
          url: "/admin/blogs",
          icon: Settings,
        },
        {
          title: "Subscribers",
          url: "/admin/subscribers",
          icon: Users,
        },
        {
          title: "Newsletter Management",
          url: "/admin/news-letter",
          icon: Mail,
        },
        {
          title: "Contact Requests",
          url: "/admin/contact-request",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "Settings",
      icon: Settings,
      url: "/admin/settings",
    },
  ]

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
      {/* Sidebar component implementation goes here */}
    </div>
  )
}

export default AppSidebar
