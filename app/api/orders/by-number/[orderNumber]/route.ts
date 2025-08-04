import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Order from "@/models/Order"

export async function GET(request: NextRequest, { params }: { params: { orderNumber: string } }) {
  try {
    await connectDB()
    const order = await Order.findOne({ orderNumber: params.orderNumber }).populate({
      path: "items.product",
      select: "title images price", // Select specific fields to populate
    })

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error("Error fetching order by number:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch order" }, { status: 500 })
  }
}
