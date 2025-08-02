import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db";
import Coupon from "@/models/Coupon"

export async function POST(req: Request) {
  await connectDB();
  try {
    const { couponCode, totalAmount } = await req.json()

    if (!couponCode || totalAmount === undefined || typeof totalAmount !== "number" || totalAmount < 0) {
      return NextResponse.json({ message: "Coupon code and a valid total amount are required." }, { status: 400 })
    }

    const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() })

    if (!coupon) {
      return NextResponse.json({ message: "Invalid coupon code." }, { status: 404 })
    }

    if (!coupon.isActive) {
      return NextResponse.json({ message: "Coupon is inactive." }, { status: 400 })
    }

    if (coupon.expirationDate && new Date() > coupon.expirationDate) {
      return NextResponse.json({ message: "Coupon has expired." }, { status: 400 })
    }

    let discountedAmount = totalAmount
    let discountApplied = 0

    if (coupon.type === "percentage") {
      discountApplied = (totalAmount * coupon.value) / 100
      discountedAmount = totalAmount - discountApplied
    } else if (coupon.type === "fixed") {
      discountApplied = coupon.value
      discountedAmount = totalAmount - discountApplied
    }

    // Ensure discounted amount doesn't go below zero
    discountedAmount = Math.max(0, discountedAmount)

    return NextResponse.json(
      {
        success: true,
        discountedAmount: Number.parseFloat(discountedAmount.toFixed(2)),
        discountApplied: Number.parseFloat(discountApplied.toFixed(2)),
        couponType: coupon.type,
        couponValue: coupon.value,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Error applying coupon:", error)
    return NextResponse.json({ message: "Failed to apply coupon", error: error.message }, { status: 500 })
  }
}
