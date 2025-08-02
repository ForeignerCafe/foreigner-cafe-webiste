import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Coupon, { type ICoupon } from "@/models/Coupon"


export async function POST(req: Request) {
  await connectDB();
  try {
    

    const { code, type, value, expirationDate, isActive } = await req.json()

    if (!code || !type || value === undefined) {
      return NextResponse.json({ message: "Code, type, and value are required." }, { status: 400 })
    }

    if (!["percentage", "fixed"].includes(type)) {
      return NextResponse.json({ message: "Invalid coupon type. Must be 'percentage' or 'fixed'." }, { status: 400 })
    }

    if (typeof value !== "number" || value < 0) {
      return NextResponse.json({ message: "Value must be a non-negative number." }, { status: 400 })
    }

    const existingCoupon = await Coupon.findOne({ code })
    if (existingCoupon) {
      return NextResponse.json({ message: "Coupon with this code already exists." }, { status: 409 })
    }

    const newCouponData: Partial<ICoupon> = {
      code,
      type,
      value,
      isActive: isActive !== undefined ? isActive : true,
    }

    if (expirationDate) {
      newCouponData.expirationDate = new Date(expirationDate)
      if (isNaN(newCouponData.expirationDate.getTime())) {
        return NextResponse.json({ message: "Invalid expiration date." }, { status: 400 })
      }
    }

    const coupon = await Coupon.create(newCouponData)

    return NextResponse.json({ success: true, data: coupon }, { status: 201 })
  } catch (error: any) {
    console.error("Error creating coupon:", error)
    return NextResponse.json({ message: "Failed to create coupon", error: error.message }, { status: 500 })
  }
}

export async function GET(req: Request) {
  await connectDB();
  try {
    

    const coupons = await Coupon.find({})
    return NextResponse.json({ success: true, data: coupons }, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching coupons:", error)
    return NextResponse.json({ message: "Failed to fetch coupons", error: error.message }, { status: 500 })
  }
}
