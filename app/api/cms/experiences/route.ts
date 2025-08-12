import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { ExperiencesSection } from "@/models/CMSContent"

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim()
}

// Helper function to ensure unique slug
async function ensureUniqueSlug(baseSlug: string, experienceId?: number): Promise<string> {
  let slug = baseSlug
  let counter = 1

  while (true) {
    const existingExperience = await ExperiencesSection.findOne({
      "experiences.slug": slug,
      ...(experienceId && { "experiences.id": { $ne: experienceId } }),
    })

    if (!existingExperience) {
      break
    }

    slug = `${baseSlug}-${counter}`
    counter++
  }

  return slug
}

export async function GET() {
  try {
    await connectDB()

    let experiencesSection = await ExperiencesSection.findOne()

    // Create default content if none exists
    if (!experiencesSection) {
      const defaultExperiences = [
        {
          id: 1,
          title: "Coffee Tasting Experience",
          slug: "coffee-tasting-experience",
          description: "Discover the nuances of our specialty coffee blends with our expert baristas.",
          content:
            "<p>Join us for an immersive coffee tasting experience where you'll discover the rich flavors and aromas of our carefully selected coffee beans.</p><h2>What to Expect</h2><ul><li>Guided tasting of 5 different coffee varieties</li><li>Learn about coffee origins and processing methods</li><li>Professional cupping techniques</li><li>Take home your favorite blend</li></ul>",
          imageSrc: "/placeholder.svg?height=300&width=400",
          alt: "Coffee tasting session",
          buttonText: "Book Now",
          isPublished: true,
        },
        {
          id: 2,
          title: "Private Events",
          slug: "private-events",
          description: "Host your special occasions in our intimate and welcoming space.",
          content:
            "<p>Transform our cafe into your private venue for unforgettable celebrations and gatherings.</p><h2>Perfect For</h2><ul><li>Birthday parties</li><li>Corporate meetings</li><li>Book clubs</li><li>Anniversary celebrations</li></ul><h2>What's Included</h2><p>Our private event package includes exclusive use of our space, personalized menu options, and dedicated staff to ensure your event runs smoothly.</p>",
          imageSrc: "/placeholder.svg?height=300&width=400",
          alt: "Private event setup",
          buttonText: "Learn More",
          isPublished: true,
        },
      ]

      experiencesSection = await ExperiencesSection.create({
        experiences: defaultExperiences,
        testimonials: [
          {
            quote: "The coffee here is absolutely exceptional. Every visit feels like a warm hug.",
            name: "Sarah Johnson",
            avatar: "/placeholder.svg?height=60&width=60",
          },
          {
            quote: "Perfect atmosphere for meetings and catching up with friends. Highly recommended!",
            name: "Michael Chen",
            avatar: "/placeholder.svg?height=60&width=60",
          },
        ],
      })
    }

    return NextResponse.json({ success: true, data: experiencesSection })
  } catch (error) {
    console.error("Error fetching experiences section:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch experiences section" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { experiences, testimonials } = body

    if (!experiences || !testimonials || !Array.isArray(experiences) || !Array.isArray(testimonials)) {
      return NextResponse.json(
        { success: false, message: "Experiences and testimonials arrays are required" },
        { status: 400 },
      )
    }

    // Process experiences to generate/update slugs
    const processedExperiences = await Promise.all(
      experiences.map(async (experience: any) => {
        let slug = experience.slug

        // Generate slug if not provided or if title changed
        if (!slug || slug === "") {
          const baseSlug = generateSlug(experience.title)
          slug = await ensureUniqueSlug(baseSlug, experience.id)
        }

        return {
          ...experience,
          slug,
          updatedAt: new Date(),
          createdAt: experience.createdAt || new Date(),
        }
      }),
    )

    let experiencesSection = await ExperiencesSection.findOne()

    if (experiencesSection) {
      experiencesSection.experiences = processedExperiences
      experiencesSection.testimonials = testimonials
      await experiencesSection.save()
    } else {
      experiencesSection = await ExperiencesSection.create({
        experiences: processedExperiences,
        testimonials,
      })
    }

    return NextResponse.json({ success: true, data: experiencesSection })
  } catch (error) {
    console.error("Error updating experiences section:", error)
    return NextResponse.json({ success: false, message: "Failed to update experiences section" }, { status: 500 })
  }
}
