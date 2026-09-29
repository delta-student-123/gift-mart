import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  userName: { type: String, required: true },
  userCity: { type: String, default: 'India' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  verifiedPurchase: { type: Boolean, default: true },
  avatar: { type: String }
}, {
  timestamps: true
});

export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
