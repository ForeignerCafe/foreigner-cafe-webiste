import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { CateringPageContent } from "@/models/CMSContent"

export async function GET() {
  try {
    await connectDB()

    let cateringPageContent = await CateringPageContent.findOne()

    if (!cateringPageContent) {
      // Create default content if none exists
      cateringPageContent = await CateringPageContent.create({
        hero: {
          cakeMenu: {
            image: "/images/cakeMenu.webp",
            title: "CAKE MENU",
            buttonText: "ORDER NOW",
            buttonLink: "https://order.toasttab.com/online/foreigner-60-east-3rd-avenue",
          },
          fullMenu: {
            image: "/images/fullMenu.webp",
            title: "FULL MENU",
            buttonText: "ORDER NOW",
            buttonLink: "https://order.toasttab.com/online/foreigner-60-east-3rd-avenue",
          },
        },
        cateringIntro: {
          image: "/images/catering.webp",
          title: "FOREIGNER CAFE CATERING",
          description:
            "At Foreigner Cafe, we've always believed that food is more than just a meal it's a way to connect. Now, we're bringing our signature warmth and flavor to you, and celebration-ready packages designed to elevate any occasion.",
          menuLink: "https://mhm-timber.s3.amazonaws.com/public/member/r9bJd/lurgtAi7r1j5/morningbreakfastmenuexamplecompressed.pdf",
        },
        lunchPacks: {
          title: "BOXES & LUNCH PACKS",
          description: "Our event spaces are crafted for connection inviting you to gather, celebrate, and feel at home.",
          items: [
            {
              id: 1,
              title: "Seasonal fruit salad cup",
              description: "Roast chicken & herb mayo sandwich Pickled vegetable bowl",
              price: "$18.99",
              image: "/images/salad.webp",
            },
            {
              id: 2,
              title: "Veggie Artisan Box",
              description: "CHummus & veggie wrap Chopped lentil salad",
              price: "$15.50",
              image: "/images/veggie.webp",
            },
            {
              id: 3,
              title: "Comfort Lunch Crates",
              description: " Roasted veggie wraps, salad, spiced lentil bowls",
              price: "$12.00",
              image: "/images/comfort.webp",
            },
            {
              id: 4,
              title: "Vegan Power Bowl",
              description: "Nutrient-rich bowl with quinoa, roasted veggies, and tahini dressing.",
              price: "$16.75",
              image: "/images/salad.webp",
            },
            {
              id: 5,
              title: "Mediterranean Mezze",
              description: "Hummus, falafel, pita, and fresh vegetable sticks.",
              price: "$19.25",
              image: "/images/veggie.webp",
            },
            {
              id: 6,
              title: "Kids Fun Pack",
              description: "Kid-friendly sandwiches, fruit, and a sweet treat.",
              price: "$10.00",
              image: "/images/salad.webp",
            },
          ],
        },
        cakeRange: {
          title: "ALL CAKE RANGE",
          description: "Indulge in our exquisite selection of freshly baked cakes.",
          items: [
            {
              id: 1,
              title: "Cardamom Rose Dream",
              description: "Decadent layers of rich chocolate and creamy fudge.",
              price: "$45.00",
              image: "/images/rose.webp",
            },
            {
              id: 2,
              title: "Classic Carrot",
              description: "Light and fluffy vanilla cake with a delicate bean flavor.",
              price: "$40.00",
              image: "/images/carrot.webp",
            },
            {
              id: 3,
              title: "Lemon Olive Oil Cake",
              description: "Tangy lemon filling topped with sweet, fluffy meringue.",
              price: "$35.00",
              image: "/images/lemon.webp",
            },
            {
              id: 4,
              title: "Red Velvet Delight",
              description: "Classic red velvet with cream cheese frosting.",
              price: "$42.00",
              image: "/images/rose.webp",
            },
            {
              id: 5,
              title: "Carrot Cake Supreme",
              description: "Moist carrot cake with walnuts and spiced cream cheese.",
              price: "$38.00",
              image: "/images/carrot.webp",
            },
            {
              id: 6,
              title: "Strawberry Shortcake",
              description: "Fresh strawberries and whipped cream on a light sponge.",
              price: "$39.50",
              image: "/images/lemon.webp",
            },
          ],
        },
        cateringYourWay: {
          title: "CATERING, YOUR WAY",
          description: "Our curated offerings bring the soul of Foreigner Cafe to your table. Choose the catering style and let us take care of the rest.",
          items: [
            {
              id: 1,
              src: "/images/corporateCat.webp",
              alt: "Office Catering",
              title: "CORPORATE CATERING",
              description:
                "From team lunches to client meetings, our corporate catering brings meals to your workplace. We make it easy to impress no stress, just good food and good energy.",
            },
            {
              id: 2,
              src: "/images/hosting.webp",
              alt: "At Home Hosting",
              title: "AT HOME HOSTING",
              description:
                "Invite Foreigner Café to your table. With our curated drop-off catering, you can host at home without the fuss everything from breakfast spreads to dinner platters.",
            },
            {
              id: 3,
              src: "/images/cele.webp",
              alt: "Corporate Catering",
              title: "CELEBRATION CATERING",
              description:
                "Planning an intimate dinner, a baby shower, or an anniversary brunch? Our catering turns any moment into a memory with sweet details, and extra  charm your guests will remember.",
            },
            {
              id: 4,
              src: "/images/weds.webp",
              alt: "Private Catering",
              title: "WEDDING CATERING",
              description:
                "From styled grazing tables to custom cakes our wedding catering is designed to reflect your story. We work closely with you to create an experience that feels personal and full of flavor.",
            },
          ],
        },
      })
    }

    return NextResponse.json({ success: true, data: cateringPageContent })
  } catch (error) {
    console.error("Error fetching catering page content:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch catering page content" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    let cateringPageContent = await CateringPageContent.findOne()

    if (cateringPageContent) {
      Object.assign(cateringPageContent, body)
      await cateringPageContent.save()
    } else {
      cateringPageContent = await CateringPageContent.create(body)
    }

    return NextResponse.json({ success: true, data: cateringPageContent })
  } catch (error) {
    console.error("Error updating catering page content:", error)
    return NextResponse.json({ success: false, message: "Failed to update catering page content" }, { status: 500 })
  }
}
