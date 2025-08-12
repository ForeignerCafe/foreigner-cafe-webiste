import { type NextRequest, NextResponse } from "next/server"
import { ExperiencesSection } from "@/models/CMSContent"
import { connectDB } from "@/lib/db"

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
async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  await connectDB()

  let slug = baseSlug
  let counter = 1

  while (true) {
    const existingExperience = await ExperiencesSection.findOne({
      "experiences.slug": slug,
      ...(excludeId && { "experiences.id": { $ne: excludeId } }),
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

    let experiencesData = await ExperiencesSection.findOne()

    if (!experiencesData) {
      // Create default data if none exists
      experiencesData = new ExperiencesSection({
        experiences: [],
        testimonials: [],
      })
      await experiencesData.save()
    }

    return NextResponse.json({
      success: true,
      data: experiencesData,
    })
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch experiences" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const data = await request.json()

    // Process experiences to generate slugs
    if (data.experiences) {
      for (const experience of data.experiences) {
        if (experience.title && !experience.slug) {
          const baseSlug = generateSlug(experience.title)
          experience.slug = await ensureUniqueSlug(baseSlug, experience.id)
        } else if (experience.title && experience.slug) {
          // Check if title changed and update slug if needed
          const expectedSlug = generateSlug(experience.title)
          if (!experience.slug.startsWith(expectedSlug)) {
            experience.slug = await ensureUniqueSlug(expectedSlug, experience.id)
          }
        }

        // Set default content if not provided
        if (!experience.content) {
          experience.content = "<p>Write your experience content here...</p>"
        }

        // Set timestamps
        if (!experience.createdAt) {
          experience.createdAt = new Date()
        }
        experience.updatedAt = new Date()
      }
    }

    let experiencesData = await ExperiencesSection.findOne()

    if (experiencesData) {
      experiencesData.experiences = data.experiences || []
      experiencesData.testimonials = data.testimonials || []
    } else {
      experiencesData = new ExperiencesSection(data)
    }

    await experiencesData.save()

    return NextResponse.json({
      success: true,
      data: experiencesData,
      message: "Experiences updated successfully",
    })
  } catch (error) {
    console.error("Error updating experiences:", error)
    return NextResponse.json({ success: false, message: "Failed to update experiences" }, { status: 500 })
  }
}
