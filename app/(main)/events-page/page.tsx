import axiosInstance from "@/lib/axios"
import EventsPageClient from "@/components/EventsPageClient"
import { Suspense } from "react"
import EventsPageSkeleton from "@/components/EventsPageSkeleton"

// Define the data types to match the backend
interface EventSpace {
  id: string
  name: string
  description: string
  image: string
  capacity: string
}

interface ContentSection {
  id: string
  category: string
  title: string
  description: string
  image: string
  imagePosition: "left" | "right"
}

interface EventsPageData {
  hero: {
    title: string
    subtitle: string
    backgroundImage: string
  }
  contentSections: ContentSection[]
  eventSpaces: EventSpace[]
}

interface EventSlide {
  id: string
  title: string
  description: string
  leftImage: {
    src: string
    alt: string
  }
  rightImages: {
    src: string
    alt: string
    text?: string
  }[]
  topRightLinkText: string
}

interface EventCarouselData {
  slides: EventSlide[]
  bottomSection: {
    heading: string
    text: string
    buttonText: string
  }
}

async function getEventsPageData(): Promise<EventsPageData | null> {
  try {
    const response = await axiosInstance.get("/api/cms/events-page")
    return response.data.data
  } catch (error) {
    console.error("Error fetching events page data:", error)
    return null
  }
}

async function getEventCarouselData(): Promise<EventCarouselData | null> {
  try {
    const response = await axiosInstance.get("/api/cms/event-carousel")
    return response.data.data
  } catch (error) {
    console.error("Error fetching event carousel data:", error)
    return null
  }
}

export default async function EventsPage() {
  const eventsPageData = await getEventsPageData()
  const eventCarouselData = await getEventCarouselData()

  // Provide default data if fetching fails or data is null
  const defaultEventsPageData: EventsPageData = {
    hero: {
      title: "Events at Foreigner Cafe",
      subtitle: "Host your next event with us and create memories that last a lifetime.",
      backgroundImage: "/images/events.webp",
    },
    contentSections: [
      {
        id: "1",
        category: "A Space To Unwind",
        title: "Thoughtful Settings for Meaningful Occasions",
        description:
          "Foreigner Café offers intimate spaces for storytelling nights, themed brunches, poetry readings, and more. Designed with intention and comfort, our venues are the perfect backdrop for experiences that feel personal, honest, and memorable.",
        image: "/images/pink.webp",
        imagePosition: "right",
      },
      {
        id: "2",
        category: "Your Next Masterpiece",
        title: "Flexible Settings with Heart and Style",
        description:
          "We understand that no two stories are the same. That's why our team works with you to shape your event around your voice, your rhythm, and your meaning. From layout to lighting, menu to music, Foreigner Café is here to make it feel right, never rushed, never distant.",
        image: "/images/sitting.webp",
        imagePosition: "left",
      },
      {
        id: "3",
        category: "Curated Spaces",
        title: "A Backdrop That Feels Like a Story",
        description:
          "Each of our event spaces is shaped with warmth and detail from the textures to the lighting to the intentional stillness between sounds. Whether under soft evening lights or in the hum of a morning gathering, Foreigner Cafe is where spaces don't just host your event they become part of its story.",
        image: "/images/dining.webp",
        imagePosition: "right",
      },
    ],
    eventSpaces: [
      {
        id: "1",
        name: "Main Hall",
        description:
          "Our Main Hall offers energy, elegance, and moments, woven into thoughtful clusters, warm lighting, and flexible layouts. It's designed for everything.",
        image: "/images/main-hall.webp",
        capacity: "Up to 80 guests",
      },
      {
        id: "2",
        name: "Dining Spaces",
        description:
          "Our dining spaces are designed for intimate togetherness, whether you're planning a storytelling event, a celebration, or a celebratory feast.",
        image: "/images/dining.webp",
        capacity: "Up to 40 guests",
      },
      {
        id: "3",
        name: "Bar & Lounge",
        description:
          "Be it for your gathering or a casual bar & lounge, our event space offers an intimate, luxurious, and flexible layout, all about forming connections.",
        image: "/images/bar-lounge.webp",
        capacity: "Up to 30 guests",
      },
      {
        id: "4",
        name: "Wedding Hall",
        description:
          "Our ceremony space is a beautiful blend of urban oasis and wedding memories. It's a stunning environment for a luxurious, magical, and romantic event.",
        image: "/images/wedding-hall.webp",
        capacity: "Up to 100 guests",
      },
    ],
  }

  const defaultEventCarouselData: EventCarouselData = {
    slides: [
      {
        id: "weddings",
        title: "WEDDINGS",
        description:
          "Our wedding spaces are thoughtfully designed to transform into the perfect backdrop for your special day, offering intimate charm and a touch of refined elegance.",
        leftImage: {
          src: "/images/wedDown.webp",
          alt: "Elegant wedding reception hall with chandeliers",
        },
        rightImages: [
          {
            src: "/images/wedUp.webp",
            alt: "Bride and groom walking down the aisle",
            text: "Two souls, one journey. We make sure your special day is nothing short of perfect.",
          },
        ],
        topRightLinkText: "VIEW MORE",
      },
      {
        id: "gathering",
        title: "GATHERING",
        description:
          "Our versatile spaces are thoughtfully designed to host memorable gatherings, from lively celebrations to intimate get-togethers, ensuring every event is unique.",
        leftImage: {
          src: "/images/gatDown.webp",
          alt: "Lively gathering event with many people",
        },
        rightImages: [
          {
            src: "/images/gatUp.webp",
            alt: "People at a gathering",
            text: "Celebrate life's moments with us. Our spaces are perfect for any gathering, big or small.",
          },
        ],
        topRightLinkText: "VIEW MORE",
      },
      {
        id: "corporate",
        title: "CORPORATE",
        description:
          "Our professional setting is ideal for corporate events, offering a sophisticated atmosphere for meetings, conferences, and business gatherings of all sizes.",
        leftImage: {
          src: "/images/corDownb.webp",
          alt: "Corporate event with people networking",
        },
        rightImages: [
          {
            src: "/images/corUp.webp",
            alt: "People in a corporate meeting room",
            text: "Host your next corporate event with us. Our professional setting ensures a productive and memorable experience.",
          },
        ],
        topRightLinkText: "VIEW MORE",
      },
    ],
    bottomSection: {
      heading: "READY TO HOST AT FOREIGNER CAFE?",
      text: "Whether it's a wedding, a lively gathering, or a corporate event, our venue is the perfect place to create unforgettable moments. Book your event with us today!",
      buttonText: "BOOK YOUR EVENT",
    },
  }

  const dataToRender = eventsPageData || defaultEventsPageData
  const carouselDataToRender = eventCarouselData || defaultEventCarouselData

  return (
    <Suspense fallback={<EventsPageSkeleton />}>
      <EventsPageClient data={dataToRender} carouselData={carouselDataToRender} />
    </Suspense>
  )
}
