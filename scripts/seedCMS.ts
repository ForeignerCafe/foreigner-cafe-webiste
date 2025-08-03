import { connectDB } from "@/lib/db"
import {
  HeroContent,
  HeroParallaxProducts,
  WhatsOnSection,
  EventsSection,
  BrandSection,
  ExperiencesSection,
  DineDrinkContent,
  FAQsSection,
  Gallery,
  HeaderContent,
  FooterContent,
} from "@/models/CMSContent"

async function seedCMS() {
  try {
    await connectDB()
    console.log("🌱 Starting CMS seeding...")

    // Clear existing data
    await Promise.all([
      HeroContent.deleteMany({}),
      HeroParallaxProducts.deleteMany({}),
      WhatsOnSection.deleteMany({}),
      EventsSection.deleteMany({}),
      BrandSection.deleteMany({}),
      ExperiencesSection.deleteMany({}),
      DineDrinkContent.deleteMany({}),
      FAQsSection.deleteMany({}),
      Gallery.deleteMany({}),
      HeaderContent.deleteMany({}),
      FooterContent.deleteMany({}),
    ])

    // 1. Hero Content
    const heroContent = await HeroContent.create({
      title: "Where Stories Come to Life",
      subtitle: "FOREIGNER CAFE",
      description:
        "A place where every cup tells a story, every conversation matters, and every moment becomes a memory.",
      videoUrl: "/videos/hero-bg.mp4",
    })
    console.log("✅ Hero content created")

    // 2. Hero Parallax Products
    const heroParallaxProducts = await HeroParallaxProducts.create({
      products: [
        {
          id: 1,
          title: "Artisan Coffee",
          link: "/shop",
          thumbnail: "/placeholder.svg?height=400&width=300&text=Coffee",
        },
        {
          id: 2,
          title: "Fresh Pastries",
          link: "/shop",
          thumbnail: "/placeholder.svg?height=400&width=300&text=Pastries",
        },
        {
          id: 3,
          title: "Cozy Atmosphere",
          link: "/gallery",
          thumbnail: "/placeholder.svg?height=400&width=300&text=Interior",
        },
        {
          id: 4,
          title: "Community Events",
          link: "/events",
          thumbnail: "/placeholder.svg?height=400&width=300&text=Events",
        },
        {
          id: 5,
          title: "Private Dining",
          link: "/catering",
          thumbnail: "/placeholder.svg?height=400&width=300&text=Dining",
        },
        { id: 6, title: "Gift Cards", link: "/shop", thumbnail: "/placeholder.svg?height=400&width=300&text=Gifts" },
        {
          id: 7,
          title: "Specialty Drinks",
          link: "/shop",
          thumbnail: "/placeholder.svg?height=400&width=300&text=Drinks",
        },
        { id: 8, title: "Local Art", link: "/gallery", thumbnail: "/placeholder.svg?height=400&width=300&text=Art" },
        {
          id: 9,
          title: "Morning Brew",
          link: "/shop",
          thumbnail: "/placeholder.svg?height=400&width=300&text=Morning",
        },
        { id: 10, title: "Afternoon Tea", link: "/shop", thumbnail: "/placeholder.svg?height=400&width=300&text=Tea" },
        {
          id: 11,
          title: "Evening Vibes",
          link: "/events",
          thumbnail: "/placeholder.svg?height=400&width=300&text=Evening",
        },
        {
          id: 12,
          title: "Weekend Brunch",
          link: "/catering",
          thumbnail: "/placeholder.svg?height=400&width=300&text=Brunch",
        },
        { id: 13, title: "Book Club", link: "/events", thumbnail: "/placeholder.svg?height=400&width=300&text=Books" },
        { id: 14, title: "Live Music", link: "/events", thumbnail: "/placeholder.svg?height=400&width=300&text=Music" },
        { id: 15, title: "Workspace", link: "/gallery", thumbnail: "/placeholder.svg?height=400&width=300&text=Work" },
        {
          id: 16,
          title: "Seasonal Menu",
          link: "/shop",
          thumbnail: "/placeholder.svg?height=400&width=300&text=Seasonal",
        },
        { id: 17, title: "Coffee Beans", link: "/shop", thumbnail: "/placeholder.svg?height=400&width=300&text=Beans" },
        {
          id: 18,
          title: "Barista Training",
          link: "/experiences",
          thumbnail: "/placeholder.svg?height=400&width=300&text=Training",
        },
        {
          id: 19,
          title: "Corporate Events",
          link: "/catering",
          thumbnail: "/placeholder.svg?height=400&width=300&text=Corporate",
        },
        {
          id: 20,
          title: "Birthday Parties",
          link: "/events",
          thumbnail: "/placeholder.svg?height=400&width=300&text=Birthday",
        },
        {
          id: 21,
          title: "Coffee Tasting",
          link: "/experiences",
          thumbnail: "/placeholder.svg?height=400&width=300&text=Tasting",
        },
        {
          id: 22,
          title: "Outdoor Seating",
          link: "/gallery",
          thumbnail: "/placeholder.svg?height=400&width=300&text=Outdoor",
        },
        {
          id: 23,
          title: "Loyalty Program",
          link: "/shop",
          thumbnail: "/placeholder.svg?height=400&width=300&text=Loyalty",
        },
        {
          id: 24,
          title: "Catering Menu",
          link: "/catering",
          thumbnail: "/placeholder.svg?height=400&width=300&text=Catering",
        },
        {
          id: 25,
          title: "Community Board",
          link: "/gallery",
          thumbnail: "/placeholder.svg?height=400&width=300&text=Community",
        },
      ],
      rowConfiguration: {
        firstRowCount: 8,
        secondRowCount: 8,
        thirdRowCount: 9,
      },
    })
    console.log("✅ Hero Parallax products created")

    // 3. What's On Section
    const whatsOnSection = await WhatsOnSection.create({
      title: "WHAT'S ON",
      events: [
        {
          title: "Coffee Cupping Sessions",
          description:
            "Join our weekly coffee cupping sessions every Saturday morning. Learn about different coffee origins, processing methods, and flavor profiles.",
          image: "/placeholder.svg?height=300&width=400&text=Coffee+Cupping",
          linkText: "Book Your Spot",
          linkHref: "/experiences",
        },
        {
          title: "Live Acoustic Nights",
          description:
            "Enjoy intimate acoustic performances by local artists every Friday evening. Great music, great coffee, great atmosphere.",
          image: "/placeholder.svg?height=300&width=400&text=Live+Music",
          linkText: "See Schedule",
          linkHref: "/events",
        },
        {
          title: "Art Gallery Exhibitions",
          description:
            "Monthly rotating exhibitions featuring works by local artists. Support the community while enjoying your favorite brew.",
          image: "/placeholder.svg?height=300&width=400&text=Art+Gallery",
          linkText: "Current Exhibition",
          linkHref: "/gallery",
        },
      ],
    })
    console.log("✅ What's On section created")

    // 4. Events Section
    const eventsSection = await EventsSection.create({
      title: "Where Stories Come to Life",
      description:
        "From intimate gatherings to community celebrations, our space transforms to host memorable experiences that bring people together.",
      buttonText: "Explore All Events",
      buttonLink: "/events",
      eventImages: [
        { src: "/placeholder.svg?height=400&width=600&text=Wedding+Reception", alt: "Wedding reception setup" },
        { src: "/placeholder.svg?height=400&width=600&text=Corporate+Meeting", alt: "Corporate meeting space" },
        { src: "/placeholder.svg?height=400&width=600&text=Birthday+Party", alt: "Birthday party celebration" },
        { src: "/placeholder.svg?height=400&width=600&text=Book+Launch", alt: "Book launch event" },
        { src: "/placeholder.svg?height=400&width=600&text=Art+Opening", alt: "Art gallery opening" },
        { src: "/placeholder.svg?height=400&width=600&text=Community+Gathering", alt: "Community gathering" },
      ],
    })
    console.log("✅ Events section created")

    // 5. Brand Section
    const brandSection = await BrandSection.create({
      storyElements: [
        {
          id: 1,
          layout: "right",
          title: "Our Beginning",
          text: "Founded in 2018, Foreigner Cafe began as a dream to create a space where cultures meet over coffee. Our founders, immigrants themselves, wanted to build a community hub that celebrates diversity and brings people together through the universal language of great coffee and warm hospitality.",
          media: {
            type: "image",
            src: "/placeholder.svg?height=400&width=600&text=Cafe+Origins",
            alt: "The founding story of Foreigner Cafe",
          },
        },
        {
          id: 2,
          layout: "left",
          title: "Community First",
          text: "We believe that a cafe is more than just a place to grab coffee—it's a cornerstone of community life. From hosting local art exhibitions to providing a space for book clubs and business meetings, we're committed to fostering connections and supporting our neighbors.",
          media: {
            type: "image",
            src: "/placeholder.svg?height=400&width=600&text=Community+Events",
            alt: "Community events at Foreigner Cafe",
          },
        },
        {
          id: 3,
          layout: "right",
          title: "Sustainable Practices",
          text: "Our commitment to sustainability runs deep. We source our coffee beans directly from farmers, ensuring fair trade practices. Our packaging is eco-friendly, and we actively work to minimize waste through composting and recycling programs.",
          media: {
            type: "image",
            src: "/placeholder.svg?height=400&width=600&text=Sustainable+Coffee",
            alt: "Sustainable coffee practices",
          },
        },
      ],
    })
    console.log("✅ Brand section created")

    // 6. Experiences Section
    const experiencesSection = await ExperiencesSection.create({
      experiences: [
        {
          id: 1,
          title: "Coffee Cupping Experience",
          description:
            "Discover the art of coffee tasting with our expert baristas. Learn to identify flavor notes, understand coffee origins, and develop your palate in this interactive session.",
          imageSrc: "/placeholder.svg?height=300&width=400&text=Coffee+Cupping",
          alt: "Coffee cupping session",
          linkText: "Book Experience",
          linkHref: "/experiences/coffee-cupping",
        },
        {
          id: 2,
          title: "Barista Workshop",
          description:
            "Master the craft of coffee making in our hands-on barista workshop. Learn espresso extraction, milk steaming techniques, and latte art from our experienced team.",
          imageSrc: "/placeholder.svg?height=300&width=400&text=Barista+Workshop",
          alt: "Barista training workshop",
          linkText: "Join Workshop",
          linkHref: "/experiences/barista-workshop",
        },
        {
          id: 3,
          title: "Private Events",
          description:
            "Transform our space for your special occasion. From intimate birthday parties to corporate meetings, we provide the perfect setting for memorable gatherings.",
          imageSrc: "/placeholder.svg?height=300&width=400&text=Private+Events",
          alt: "Private event setup",
          linkText: "Plan Event",
          linkHref: "/events/private",
        },
      ],
      testimonials: [
        {
          quote:
            "Foreigner Cafe has become my second home. The coffee is exceptional, but it's the sense of community that keeps me coming back every day.",
          name: "Sarah Chen",
          avatar: "/placeholder.svg?height=60&width=60&text=SC",
        },
        {
          quote:
            "The barista workshop was incredible! I learned so much about coffee and now I can make cafe-quality drinks at home. Highly recommend!",
          name: "Michael Rodriguez",
          avatar: "/placeholder.svg?height=60&width=60&text=MR",
        },
        {
          quote:
            "We hosted our book club's anniversary here and it was perfect. The staff was accommodating and the atmosphere was exactly what we needed.",
          name: "Emily Johnson",
          avatar: "/placeholder.svg?height=60&width=60&text=EJ",
        },
        {
          quote:
            "The coffee cupping experience opened my eyes to the complexity of coffee. It's like wine tasting but for coffee lovers!",
          name: "David Kim",
          avatar: "/placeholder.svg?height=60&width=60&text=DK",
        },
        {
          quote:
            "As a remote worker, I appreciate having a space that's both productive and welcoming. The WiFi is great and the coffee keeps me going.",
          name: "Lisa Thompson",
          avatar: "/placeholder.svg?height=60&width=60&text=LT",
        },
        {
          quote:
            "The seasonal menu always surprises me. The creativity in their drinks and food pairings is outstanding.",
          name: "James Wilson",
          avatar: "/placeholder.svg?height=60&width=60&text=JW",
        },
        {
          quote:
            "Foreigner Cafe caters our monthly team meetings and they never disappoint. Professional service and delicious food every time.",
          name: "Amanda Foster",
          avatar: "/placeholder.svg?height=60&width=60&text=AF",
        },
        {
          quote:
            "The art exhibitions here are fantastic. It's wonderful to see local artists get a platform while I enjoy my morning coffee.",
          name: "Robert Martinez",
          avatar: "/placeholder.svg?height=60&width=60&text=RM",
        },
      ],
    })
    console.log("✅ Experiences section created")

    // 7. Dine & Drink Content
    const dineDrinkContent = await DineDrinkContent.create({
      venues: [
        {
          name: "Main Cafe",
          location: "Ground Floor",
          description:
            "Our main dining area features comfortable seating, natural light, and a vibrant atmosphere perfect for casual meetings, studying, or catching up with friends.",
          image: "/placeholder.svg?height=300&width=400&text=Main+Cafe",
        },
        {
          name: "Private Dining Room",
          location: "Second Floor",
          description:
            "An intimate space for private events, business meetings, or special celebrations. Accommodates up to 20 guests with dedicated service.",
          image: "/placeholder.svg?height=300&width=400&text=Private+Dining",
        },
        {
          name: "Outdoor Terrace",
          location: "Rooftop",
          description:
            "Enjoy your coffee al fresco on our beautiful rooftop terrace. Perfect for sunny days and evening gatherings under the stars.",
          image: "/placeholder.svg?height=300&width=400&text=Outdoor+Terrace",
        },
      ],
    })
    console.log("✅ Dine & Drink content created")

    // 8. FAQs Section
    const faqsSection = await FAQsSection.create({
      title: "FREQUENTLY ASKED QUESTIONS",
      subtitle: "Everything you need to know about visiting Foreigner Cafe",
      faqs: [
        {
          question: "What are your opening hours?",
          answer:
            "We're open Monday through Friday from 7:00 AM to 9:00 PM, and weekends from 8:00 AM to 10:00 PM. Holiday hours may vary, so please check our website or call ahead.",
        },
        {
          question: "Do you take reservations?",
          answer:
            "Yes, we accept reservations for parties of 6 or more. For smaller groups, we operate on a first-come, first-served basis. You can make reservations through our website or by calling us directly.",
        },
        {
          question: "Do you offer catering services?",
          answer:
            "We provide catering for corporate events, private parties, and special occasions. Our catering menu includes coffee service, pastries, sandwiches, and more. Contact us at least 48 hours in advance.",
        },
        {
          question: "Is there WiFi available?",
          answer:
            "Yes, we offer complimentary high-speed WiFi for all customers. The network name is 'ForeignerCafe_Guest' and the password is available at the counter.",
        },
        {
          question: "Do you accommodate dietary restrictions?",
          answer:
            "We offer various options for different dietary needs, including vegan, gluten-free, and dairy-free alternatives. Please inform our staff of any allergies or dietary restrictions when ordering.",
        },
        {
          question: "Can I host private events at your cafe?",
          answer:
            "Yes, we have a private dining room that can accommodate up to 20 guests. We also offer after-hours venue rental for larger events. Contact us to discuss your event needs and pricing.",
        },
        {
          question: "Do you sell coffee beans to take home?",
          answer:
            "Yes, we sell our signature coffee blends in whole bean and ground form. We also carry a selection of brewing equipment and accessories for the home coffee enthusiast.",
        },
        {
          question: "Is parking available?",
          answer:
            "We have a small parking lot behind the building with 15 spaces. Street parking is also available, and there's a public parking garage two blocks away on Main Street.",
        },
      ],
    })
    console.log("✅ FAQs section created")

    // 9. Gallery
    const gallery = await Gallery.create({
      sections: [
        {
          id: 1,
          name: "Recent Events",
          description: "Highlights from our latest community events, workshops, and celebrations",
          images: [
            {
              id: 1,
              src: "/placeholder.svg?height=400&width=600&text=Coffee+Workshop",
              alt: "Coffee workshop in progress",
              caption: "Monthly barista workshop with local coffee enthusiasts",
            },
            {
              id: 2,
              src: "/placeholder.svg?height=300&width=400&text=Art+Opening",
              alt: "Art gallery opening night",
              caption: "Local artist showcase opening night",
            },
            {
              id: 3,
              src: "/placeholder.svg?height=500&width=400&text=Live+Music",
              alt: "Live acoustic performance",
              caption: "Friday night acoustic session with Sarah Martinez",
            },
            {
              id: 4,
              src: "/placeholder.svg?height=400&width=500&text=Book+Club",
              alt: "Book club meeting",
              caption: "Monthly book club discussing contemporary literature",
            },
            {
              id: 5,
              src: "/placeholder.svg?height=300&width=300&text=Community+Board",
              alt: "Community bulletin board",
              caption: "Our community board featuring local events and announcements",
            },
            {
              id: 6,
              src: "/placeholder.svg?height=400&width=400&text=Birthday+Party",
              alt: "Birthday celebration",
              caption: "Private birthday celebration in our dining room",
            },
          ],
        },
        {
          id: 2,
          name: "Cafe Atmosphere",
          description: "The cozy and welcoming spaces that make our cafe special",
          images: [
            {
              id: 1,
              src: "/placeholder.svg?height=500&width=600&text=Main+Seating",
              alt: "Main seating area",
              caption: "Our main seating area with comfortable chairs and natural light",
            },
            {
              id: 2,
              src: "/placeholder.svg?height=400&width=400&text=Coffee+Bar",
              alt: "Coffee bar and barista station",
              caption: "Our espresso bar where the magic happens",
            },
            {
              id: 3,
              src: "/placeholder.svg?height=300&width=500&text=Reading+Corner",
              alt: "Cozy reading corner",
              caption: "Quiet reading corner perfect for book lovers",
            },
            {
              id: 4,
              src: "/placeholder.svg?height=400&width=300&text=Window+Seats",
              alt: "Window seating area",
              caption: "Window seats offering street views and natural light",
            },
            {
              id: 5,
              src: "/placeholder.svg?height=600&width=400&text=Outdoor+Patio",
              alt: "Outdoor patio seating",
              caption: "Our outdoor patio perfect for sunny days",
            },
          ],
        },
        {
          id: 3,
          name: "Coffee & Food",
          description: "Our carefully crafted beverages and delicious food offerings",
          images: [
            {
              id: 1,
              src: "/placeholder.svg?height=400&width=400&text=Latte+Art",
              alt: "Beautiful latte art",
              caption: "Handcrafted latte art by our skilled baristas",
            },
            {
              id: 2,
              src: "/placeholder.svg?height=300&width=400&text=Pastries",
              alt: "Fresh pastries display",
              caption: "Daily selection of fresh pastries and baked goods",
            },
            {
              id: 3,
              src: "/placeholder.svg?height=500&width=300&text=Coffee+Beans",
              alt: "Coffee beans display",
              caption: "Premium coffee beans from around the world",
            },
            {
              id: 4,
              src: "/placeholder.svg?height=400&width=500&text=Sandwich+Board",
              alt: "Gourmet sandwiches",
              caption: "Our signature sandwiches made with local ingredients",
            },
            {
              id: 5,
              src: "/placeholder.svg?height=300&width=300&text=Cold+Brew",
              alt: "Cold brew coffee setup",
              caption: "House-made cold brew coffee on tap",
            },
            {
              id: 6,
              src: "/placeholder.svg?height=400&width=400&text=Seasonal+Menu",
              alt: "Seasonal menu items",
              caption: "Seasonal specialties featuring local ingredients",
            },
          ],
        },
      ],
    })
    console.log("✅ Gallery created")

    // 10. Header Content
    const headerContent = await HeaderContent.create({
      logo: "FOREIGNER CAFE",
      topNavItems: [
        { label: "DINE", href: "/", isExternal: false },
        { label: "EVENTS", href: "/events", isExternal: false },
        { label: "SHOP", href: "https://order.toasttab.com/online/foreigner-60-east-3rd-avenue", isExternal: true },
        { label: "CATERING", href: "/catering", isExternal: false },
        {
          label: "GIFT VOUCHERS",
          href: "https://www.toasttab.com/foreigner-60-east-3rd-avenue/giftcards",
          isExternal: true,
        },
      ],
      mainNavItems: [
        { label: "HOME", action: "scroll", sectionId: "home" },
        {
          label: "MENU",
          action: "external",
          href: "https://mhm-timber.s3.amazonaws.com/public/member/r9bJd/lurgtAi7r1j5/morningbreakfastmenuexamplecompressed.pdf",
        },
        { label: "ABOUT US", action: "scroll", sectionId: "story" },
        { label: "EXPERIENCES", action: "navigate", href: "/experiences" },
        { label: "FAQS", action: "navigate", href: "/faqs" },
        { label: "GALLERY", action: "navigate", href: "/gallery" },
      ],
      reserveButtonText: "RESERVE",
    })
    console.log("✅ Header content created")

    // 11. Footer Content
    const footerContent = await FooterContent.create({
      sections: [
        {
          title: "ABOUT US",
          links: [
            { label: "Our Story", action: "scroll", sectionId: "story" },
            {
              label: "Location",
              action: "external",
              href: "https://www.google.com/maps/place/foreigner+cafe+san+mateo/data=!4m2!3m1!1s0x808f9ffb12544205:0x5e89d06013ecbdc?sa=X&ved=1t:242&ictx=111",
            },
            { label: "Contact Us", action: "modal" },
            { label: "Gallery", action: "navigate", href: "/gallery" },
          ],
        },
        {
          title: "LOCATION & HOURS",
          links: [], // This section uses contactInfo instead
        },
        {
          title: "SERVICES",
          links: [
            {
              label: "Takeaway",
              action: "external",
              href: "https://order.toasttab.com/online/foreigner-60-east-3rd-avenue",
            },
            {
              label: "Delivery",
              action: "external",
              href: "https://order.toasttab.com/online/foreigner-60-east-3rd-avenue",
            },
            {
              label: "Gift Cards",
              action: "external",
              href: "https://www.toasttab.com/foreigner-60-east-3rd-avenue/giftcards",
            },
            { label: "Events", action: "navigate", href: "/events" },
            { label: "Catering", action: "navigate", href: "/catering" },
          ],
        },
      ],
      contactInfo: {
        address: "Foreigner Cafe, 60 E 3rd Ave Ste 108, San Mateo, CA 94401, United States",
        phone: "+1 (650) 620 1888",
        email: "service@foreignercafe.com",
        hours: {
          weekdays: "Mon-Fri: 8:00am - 4:00pm",
          weekends: "Sat-Sun: 8:30am - 4:00pm",
        },
      },
      socialMedia: [
        {
          platform: "Facebook",
          url: "https://www.facebook.com/foreignercafe/",
          icon: "Facebook",
        },
        {
          platform: "Instagram",
          url: "https://www.instagram.com/foreignercafe/?hl=en",
          icon: "Instagram",
        },
        {
          platform: "Google",
          url: "https://www.google.com/maps/place/Foreigner+Cafe/@37.5637466,-122.3247235,17z/data=!3m1!4b1!4m6!3m5!1s0x808f9ffb12544205:0x5e89d06013ecbdc!8m2!3d37.5637466!4d-122.3247235!16s%2Fg%2F11h0m6rnjj?entry=ttu&g_ep=EgoyMDI1MDcyMi4wIKXMDSoASAFQAw%3D%3D",
          icon: "Globe",
        },
      ],
      newsletterSection: {
        title: "STAY CONNECTED",
        description: "Receive The Foreigner Cafe news directly to you.",
      },
      copyright: `© ${new Date().getFullYear()} The Foreigner Cafe. Website by Cybitronix`,
    })
    console.log("✅ Footer content created")

    console.log("🎉 CMS seeding completed successfully!")
    console.log("\n📊 Summary:")
    console.log(`- Hero Content: 1 record`)
    console.log(`- Hero Parallax Products: 25 products`)
    console.log(`- What's On Events: 3 events`)
    console.log(`- Events Section: 6 images`)
    console.log(`- Brand Story Elements: 3 elements`)
    console.log(`- Experiences: 3 experiences, 8 testimonials`)
    console.log(`- Dine & Drink Venues: 3 venues`)
    console.log(`- FAQs: 8 questions`)
    console.log(`- Gallery: 3 sections, 17 total images`)
    console.log(`- Header: Complete navigation structure`)
    console.log(`- Footer: Complete footer structure`)

    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding CMS:", error)
    process.exit(1)
  }
}

seedCMS()
