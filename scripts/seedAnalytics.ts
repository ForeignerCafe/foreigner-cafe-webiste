import mongoose from "mongoose"
import { connectDB } from "../lib/db"
import Blog from "../models/Blog"
import BlogView from "../models/BlogView"
import Visitor from "../models/Visitor"

// Device types and their probabilities
const deviceTypes = [
  { type: "Mobile", weight: 0.65 },
  { type: "Desktop", weight: 0.3 },
  { type: "Tablet", weight: 0.05 },
] as const

const browsers = ["Chrome", "Safari", "Firefox", "Edge", "Opera"]
const operatingSystems = ["Windows", "macOS", "iOS", "Android", "Linux"]

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
  let baseViews = 50

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

// Generate realistic visitor count
function getDailyVisitorCount(date: Date): number {
  const viewCount = getDailyViewCount(date)
  // Visitors are typically 60-80% of views (some people view multiple pages)
  return Math.floor(viewCount * (0.6 + Math.random() * 0.2))
}

async function seedAnalytics() {
  try {
    await connectDB()
    console.log("🌱 Starting analytics seeding...")

    // Get all blogs
    const blogs = await Blog.find({})
    console.log(`📚 Found ${blogs.length} blogs`)

    // Clear existing analytics data (except July 2024)
    const julyStart = new Date("2024-07-01")
    const julyEnd = new Date("2024-08-01")

    await BlogView.deleteMany({
      viewedAt: {
        $not: {
          $gte: julyStart,
          $lt: julyEnd,
        },
      },
    })

    await Visitor.deleteMany({
      visitedAt: {
        $not: {
          $gte: julyStart,
          $lt: julyEnd,
        },
      },
    })

    console.log("🗑️  Cleared existing analytics data (preserving July 2024)")

    // Generate data for the last 6 months (excluding July 2024)
    const endDate = new Date()
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - 6)

    console.log(`📅 Generating data from ${startDate.toDateString()} to ${endDate.toDateString()}`)

    const blogViews: any[] = []
    const visitors: any[] = []

    // Generate data day by day
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      // Skip July 2024 (preserve real data)
      if (date >= julyStart && date < julyEnd) {
        continue
      }

      const currentDate = new Date(date)
      const dailyVisitorCount = getDailyVisitorCount(currentDate)
      const dailyViewCount = getDailyViewCount(currentDate)

      // Generate unique visitors for this day
      const dayVisitors = new Set<string>()
      const daySessionIds = new Set<string>()

      for (let i = 0; i < dailyVisitorCount; i++) {
        const ip = generateRandomIP()
        const sessionId = generateSessionId()
        const deviceType = getRandomDeviceType()
        const browser = browsers[Math.floor(Math.random() * browsers.length)]
        const os = operatingSystems[Math.floor(Math.random() * operatingSystems.length)]

        // Ensure unique visitors per day
        const visitorKey = `${ip}-${currentDate.toDateString()}`
        if (!dayVisitors.has(visitorKey)) {
          dayVisitors.add(visitorKey)
          daySessionIds.add(sessionId)

          // Random time during the day
          const randomHour = Math.floor(Math.random() * 24)
          const randomMinute = Math.floor(Math.random() * 60)
          const visitTime = new Date(currentDate)
          visitTime.setHours(randomHour, randomMinute, 0, 0)

          visitors.push({
            ipAddress: ip,
            sessionId,
            userAgent: `Mozilla/5.0 (${os}) ${browser}`,
            deviceType,
            browser,
            os,
            visitedAt: visitTime,
            createdAt: visitTime,
          })
        }
      }

      // Generate blog views for this day
      const sessionIdsArray = Array.from(daySessionIds)
      const ipsArray = Array.from(dayVisitors).map((v) => v.split("-")[0])

      for (let i = 0; i < dailyViewCount; i++) {
        // Pick a random blog
        const randomBlog = blogs[Math.floor(Math.random() * blogs.length)]

        // Pick a random visitor from today's visitors
        const randomVisitorIndex = Math.floor(Math.random() * sessionIdsArray.length)
        const sessionId = sessionIdsArray[randomVisitorIndex]
        const ip = ipsArray[randomVisitorIndex]

        const deviceType = getRandomDeviceType()
        const browser = browsers[Math.floor(Math.random() * browsers.length)]
        const os = operatingSystems[Math.floor(Math.random() * operatingSystems.length)]

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
    }

    // Insert data in batches
    console.log(`📊 Inserting ${visitors.length} visitor records...`)
    if (visitors.length > 0) {
      await Visitor.insertMany(visitors, { ordered: false })
    }

    console.log(`👁️  Inserting ${blogViews.length} blog view records...`)
    if (blogViews.length > 0) {
      await BlogView.insertMany(blogViews, { ordered: false })
    }

    // Generate some summary stats
    const totalVisitors = await Visitor.countDocuments()
    const totalBlogViews = await BlogView.countDocuments()
    const deviceStats = await Visitor.aggregate([
      {
        $group: {
          _id: "$deviceType",
          count: { $sum: 1 },
        },
      },
    ])

    console.log("🎉 Analytics seeding completed successfully!")
    console.log(`📈 Total visitors: ${totalVisitors}`)
    console.log(`👁️  Total blog views: ${totalBlogViews}`)
    console.log("📱 Device breakdown:")
    deviceStats.forEach((stat) => {
      console.log(`  - ${stat._id}: ${stat.count}`)
    })
  } catch (error) {
    console.error("❌ Error seeding analytics:", error)
  } finally {
    await mongoose.connection.close()
    console.log("🔌 Database connection closed")
  }
}

seedAnalytics()
