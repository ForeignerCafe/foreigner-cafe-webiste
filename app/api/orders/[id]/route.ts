import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Order from "@/models/Order"
import Product from "@/models/Product"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const order = await Order.findById(params.id).populate({
      path: "items.product",
      select: "title images price",
    })

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const body = await request.json()
    const { status, notes } = body

    const order = await Order.findById(params.id)
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 })
    }

    // If order is being cancelled, restore stock
    if (status === "cancelled" && order.status !== "cancelled") {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } })
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(params.id, { status, notes }, { new: true }).populate({
      path: "items.product",
      select: "title images price",
    })

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ success: false, message: "Failed to update order" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const order = await Order.findById(params.id)
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 })
    }

    // Restore stock for all items in the order
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } })
    }

    await Order.findByIdAndDelete(params.id)

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting order:", error)
    return NextResponse.json({ success: false, message: "Failed to delete order" }, { status: 500 })
  }
}
