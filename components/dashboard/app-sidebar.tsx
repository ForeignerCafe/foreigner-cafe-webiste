import { FileText, Settings, SubscriptIcon, Mail, MessageSquare } from "react-feather"

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
          url: "/admin/cms/blogs",
        },
        {
          title: "Subscribers",
          url: "/admin/subscribers",
          icon: SubscriptIcon,
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
      icon: "settings",
      url: "/admin/settings",
    },
    // ** rest of code here **
  ]

  return <div>{/* Sidebar component implementation goes here */}</div>
}

export default AppSidebar
