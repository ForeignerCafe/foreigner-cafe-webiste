import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Visitor from "@/models/Visitor"
import { parseUserAgent, getClientIP } from "@/lib/analytics"

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const { sessionId } = await req.json()
    const ipAddress = getClientIP(req)
    const userAgent = req.headers.get("user-agent") || ""
    const deviceInfo = parseUserAgent(userAgent)

    // Check if this visitor has already been tracked today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const existingVisitor = await Visitor.findOne({
      $or: [
        { ipAddress, visitedAt: { $gte: today, $lt: tomorrow } },
        { sessionId, visitedAt: { $gte: today, $lt: tomorrow } },
      ],
    })

    if (existingVisitor) {
      return NextResponse.json({ tracked: false, reason: "Already tracked today" })
    }

    // Create new visitor record
    const visitor = new Visitor({
      ipAddress,
      sessionId,
      userAgent,
      ...deviceInfo,
      visitedAt: new Date(),
    })

    await visitor.save()

    return NextResponse.json({ tracked: true, visitor: visitor._id })
  } catch (error) {
    console.error("Error tracking visitor:", error)
    return NextResponse.json({ error: "Failed to track visitor" }, { status: 500 })
  }
}
