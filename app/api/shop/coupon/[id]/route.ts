import { NextResponse } from "next/server"
import {connectDB} from "@/lib/db"
import Coupon from "@/models/Coupon"


export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
   

    const { id } = params
    const coupon = await Coupon.findById(id)

    if (!coupon) {
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: coupon }, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching coupon:", error)
    return NextResponse.json({ message: "Failed to fetch coupon", error: error.message }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB()
  try {
    

    const { id } = params
    const { code, type, value, expirationDate, isActive } = await req.json()

    const updateData: any = {}
    if (code !== undefined) updateData.code = code
    if (type !== undefined) {
      if (!["percentage", "fixed"].includes(type)) {
        return NextResponse.json({ message: "Invalid coupon type. Must be 'percentage' or 'fixed'." }, { status: 400 })
      }
      updateData.type = type
    }
    if (value !== undefined) {
      if (typeof value !== "number" || value < 0) {
        return NextResponse.json({ message: "Value must be a non-negative number." }, { status: 400 })
      }
      updateData.value = value
    }
    if (expirationDate !== undefined) {
      if (expirationDate === null) {
        updateData.expirationDate = null
      } else {
        const date = new Date(expirationDate)
        if (isNaN(date.getTime())) {
          return NextResponse.json({ message: "Invalid expiration date." }, { status: 400 })
        }
        updateData.expirationDate = date
      }
    }
    if (isActive !== undefined) updateData.isActive = isActive

    // Check for duplicate code if code is being updated
    if (code) {
      const existingCoupon = await Coupon.findOne({ code, _id: { $ne: id } })
      if (existingCoupon) {
        return NextResponse.json({ message: "Coupon with this code already exists." }, { status: 409 })
      }
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!updatedCoupon) {
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: updatedCoupon }, { status: 200 })
  } catch (error: any) {
    console.error("Error updating coupon:", error)
    return NextResponse.json({ message: "Failed to update coupon", error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
  
    const { id } = params
    const deletedCoupon = await Coupon.findByIdAndDelete(id)

    if (!deletedCoupon) {
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Coupon deleted successfully" }, { status: 200 })
  } catch (error: any) {
    console.error("Error deleting coupon:", error)
    return NextResponse.json({ message: "Failed to delete coupon", error: error.message }, { status: 500 })
  }
}
