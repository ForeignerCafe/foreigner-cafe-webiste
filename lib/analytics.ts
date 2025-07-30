import type { NextRequest } from "next/server"
import { UAParser } from "ua-parser-js"

export interface DeviceInfo {
  deviceType: "Mobile" | "Tablet" | "Desktop"
  browser: string
  os: string
  userAgent: string
}

export function parseUserAgent(userAgent: string): DeviceInfo {
  const parser = new UAParser(userAgent)
  const result = parser.getResult()

  let deviceType: "Mobile" | "Tablet" | "Desktop" = "Desktop"

  if (result.device.type === "mobile") {
    deviceType = "Mobile"
  } else if (result.device.type === "tablet") {
    deviceType = "Tablet"
  }

  return {
    deviceType,
    browser: result.browser.name || "Unknown",
    os: result.os.name || "Unknown",
    userAgent,
  }
}

export function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")
  const realIP = req.headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  if (realIP) {
    return realIP
  }

  return req.ip || "127.0.0.1"
}

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function isUniqueVisitorToday(ipAddress: string, sessionId: string, visitedAt: Date): boolean {
  // This will be checked against database in the actual tracking function
  return true
}

export function isUniqueBlogView(ipAddress: string, sessionId: string, blogId: string, viewedAt: Date): boolean {
  // This will be checked against database in the actual tracking function
  return true
}
