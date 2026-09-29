import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  description: { type: String, required: true },
  discountPercent: { type: Number, default: 0 },
  flatDiscount: { type: Number, default: 0 },
  minOrderValue: { type: Number, default: 0 },
  maxDiscount: { type: Number, default: 1000 },
  validUntil: { type: Date },
  isActive: { type: Boolean, default: true },
  usageLimit: { type: Number, default: 1000 },
  timesUsed: { type: Number, default: 0 }
}, {
  timestamps: true
});

export const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);
