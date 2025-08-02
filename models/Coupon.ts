import mongoose, { Schema, type Document } from "mongoose"

export interface ICoupon extends Document {
  code: string
  type: "percentage" | "fixed"
  value: number
  expirationDate?: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const CouponSchema: Schema = new Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    type: { type: String, required: true, enum: ["percentage", "fixed"] },
    value: { type: Number, required: true, min: 0 },
    expirationDate: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

const Coupon = mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", CouponSchema)

export default Coupon
