import mongoose from "mongoose"
import { connectDB } from "../lib/db"
import Blog from "../models/Blog"
import BlogView from "../models/BlogView"
import Visitor from "../models/Visitor"
import ContactRequest from "../models/ContactRequest"

// Device types and their probabilities
const deviceTypes = [
  { type: "Mobile", weight: 0.65 },
  { type: "Desktop", weight: 0.3 },
  { type: "Tablet", weight: 0.05 },
] as const

const browsers = ["Chrome", "Safari", "Firefox", "Edge", "Opera"]
const operatingSystems = ["Windows", "macOS", "iOS", "Android", "Linux"]

// Contact request types
const contactTypes = ["general", "reservation", "event", "feedback", "other"]
const contactStatuses = ["pending", "read", "archived"]

// Generate random IP address
function generateRandomIP(): string {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
}

// Generate random session ID
function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Get weighted random device type
function getRandomDeviceType(): string {
  const random = Math.random()
  let cumulativeWeight = 0

  for (const device of deviceTypes) {
    cumulativeWeight += device.weight
    if (random <= cumulativeWeight) {
      return device.type
    }
  }

  return "Desktop" // fallback
}

// Generate realistic daily view count based on day of week and month
function getDailyViewCount(date: Date): number {
  const dayOfWeek = date.getDay() // 0 = Sunday, 6 = Saturday
  const month = date.getMonth() // 0 = January, 11 = December

  // Base views per day
  let baseViews = 80

  // Weekend multiplier (less traffic)
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    baseViews *= 0.7
  }

  // Weekday peak (Tuesday-Thursday)
  if (dayOfWeek >= 2 && dayOfWeek <= 4) {
    baseViews *= 1.3
  }

  // Seasonal variations
  if (month >= 5 && month <= 7) {
    // Summer months
    baseViews *= 1.2
  } else if (month >= 11 || month <= 1) {
    // Winter months
    baseViews *= 0.9
  }

  // Add some randomness
  const randomFactor = 0.7 + Math.random() * 0.6 // 0.7 to 1.3

  return Math.floor(baseViews * randomFactor)
}

// Generate realistic contact request count per day
function getDailyContactRequestCount(date: Date): number {
  const dayOfWeek = date.getDay()
  let baseRequests = 3

  // More requests on weekdays
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    baseRequests *= 1.5
  }

  // Add randomness
  const randomFactor = 0.5 + Math.random() * 1.0 // 0.5 to 1.5

  return Math.floor(baseRequests * randomFactor)
}

// Generate sample blog titles and content
const sampleBlogs = [
  {
    title: "The Art of Coffee Brewing: A Complete Guide",
    shortCaption: "Master the perfect cup with our comprehensive brewing guide",
    body: "Coffee brewing is both an art and a science. In this comprehensive guide, we'll explore various brewing methods...",
  },
  {
    title: "Seasonal Menu Highlights: Winter Warmers",
    shortCaption: "Discover our cozy winter menu featuring hearty soups and warm beverages",
    body: "As winter settles in, our kitchen team has crafted a special menu to warm your heart and soul...",
  },
  {
    title: "Behind the Scenes: Meet Our Baristas",
    shortCaption: "Get to know the talented team behind your favorite coffee creations",
    body: "Our baristas are the heart of our cafe. Today, we're taking you behind the scenes to meet the talented individuals...",
  },
  {
    title: "Sustainable Coffee: Our Journey to Fair Trade",
    shortCaption: "Learn about our commitment to ethical sourcing and sustainability",
    body: "Sustainability isn't just a buzzword for us - it's a core value that guides every decision we make...",
  },
  {
    title: "Local Community Events: What's Coming Up",
    shortCaption: "Stay updated on upcoming community events and gatherings at our cafe",
    body: "We believe in being more than just a cafe - we're a community hub where people come together...",
  },
]

async function seedAnalytics() {
  try {
    await connectDB()
    console.log("🌱 Starting analytics seeding...")

    // Clear existing data
    await BlogView.deleteMany({})
    await Visitor.deleteMany({}) // Set unique visitors to zero as requested
    await ContactRequest.deleteMany({})
    await Blog.deleteMany({})

    console.log("🗑️  Cleared existing analytics data")

    // Generate blogs distributed across the last 7 months
    const blogs: any[] = []
    const endDate = new Date()
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - 6)

    // Create blogs distributed across months
    for (let i = 0; i < 25; i++) {
      const randomDaysAgo = Math.floor(Math.random() * 180) // Random day in last 6 months
      const blogDate = new Date()
      blogDate.setDate(blogDate.getDate() - randomDaysAgo)

      const randomBlog = sampleBlogs[Math.floor(Math.random() * sampleBlogs.length)]

      blogs.push({
        title: `${randomBlog.title} ${i + 1}`,
        shortCaption: randomBlog.shortCaption,
        body: randomBlog.body,
        status: Math.random() > 0.2 ? "published" : "draft", // 80% published
        tags: ["coffee", "cafe", "community"].slice(0, Math.floor(Math.random() * 3) + 1),
        publishedAt: Math.random() > 0.2 ? blogDate : undefined,
        createdAt: blogDate,
        updatedAt: blogDate,
      })
    }

    const createdBlogs = await Blog.insertMany(blogs)
    console.log(`📚 Created ${createdBlogs.length} blogs`)

    // Generate blog views and contact requests day by day
    const blogViews: any[] = []
    const contactRequests: any[] = []

    console.log(`📅 Generating data from ${startDate.toDateString()} to ${endDate.toDateString()}`)

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const currentDate = new Date(date)
      const dailyViewCount = getDailyViewCount(currentDate)
      const dailyContactRequestCount = getDailyContactRequestCount(currentDate)

      // Generate blog views for this day
      for (let i = 0; i < dailyViewCount; i++) {
        // Pick a random blog
        const randomBlog = createdBlogs[Math.floor(Math.random() * createdBlogs.length)]

        const deviceType = getRandomDeviceType()
        const browser = browsers[Math.floor(Math.random() * browsers.length)]
        const os = operatingSystems[Math.floor(Math.random() * operatingSystems.length)]
        const ip = generateRandomIP()
        const sessionId = generateSessionId()

        // Random time during the day
        const randomHour = Math.floor(Math.random() * 24)
        const randomMinute = Math.floor(Math.random() * 60)
        const viewTime = new Date(currentDate)
        viewTime.setHours(randomHour, randomMinute, 0, 0)

        blogViews.push({
          blogId: randomBlog._id,
          blogSlug: randomBlog.slug,
          ipAddress: ip,
          sessionId,
          userAgent: `Mozilla/5.0 (${os}) ${browser}`,
          deviceType,
          browser,
          os,
          viewedAt: viewTime,
          createdAt: viewTime,
        })
      }

      // Generate contact requests for this day
      for (let i = 0; i < dailyContactRequestCount; i++) {
        const randomHour = Math.floor(Math.random() * 24)
        const randomMinute = Math.floor(Math.random() * 60)
        const requestTime = new Date(currentDate)
        requestTime.setHours(randomHour, randomMinute, 0, 0)

        const type = contactTypes[Math.floor(Math.random() * contactTypes.length)]
        const status = contactStatuses[Math.floor(Math.random() * contactStatuses.length)]

        contactRequests.push({
          type,
          name: `Customer ${Math.floor(Math.random() * 1000)}`,
          email: `customer${Math.floor(Math.random() * 1000)}@example.com`,
          phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          message: `This is a sample ${type} request generated for testing purposes.`,
          status,
          createdAt: requestTime,
          updatedAt: requestTime,
        })
      }
    }

    // Insert data in batches
    console.log(`👁️  Inserting ${blogViews.length} blog view records...`)
    if (blogViews.length > 0) {
      await BlogView.insertMany(blogViews, { ordered: false })
    }

    console.log(`📧 Inserting ${contactRequests.length} contact request records...`)
    if (contactRequests.length > 0) {
      await ContactRequest.insertMany(contactRequests, { ordered: false })
    }

    // Generate some summary stats
    const totalBlogs = await Blog.countDocuments()
    const totalBlogViews = await BlogView.countDocuments()
    const totalContactRequests = await ContactRequest.countDocuments()
    const totalVisitors = await Visitor.countDocuments() // Should be 0

    console.log("🎉 Analytics seeding completed successfully!")
    console.log(`📚 Total blogs: ${totalBlogs}`)
    console.log(`👁️  Total blog views: ${totalBlogViews}`)
    console.log(`📧 Total contact requests: ${totalContactRequests}`)
    console.log(`👥 Total visitors: ${totalVisitors} (reset to zero as requested)`)

    // Show monthly distribution
    const monthlyStats = await Blog.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ])

    console.log("📊 Monthly blog distribution:")
    monthlyStats.forEach((stat) => {
      const monthName = new Date(stat._id.year, stat._id.month - 1).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
      console.log(`  - ${monthName}: ${stat.count} blogs`)
    })
  } catch (error) {
    console.error("❌ Error seeding analytics:", error)
  } finally {
    await mongoose.connection.close()
    console.log("🔌 Database connection closed")
  }
}

seedAnalytics()
