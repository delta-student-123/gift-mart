import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: String }] // product IDs
}, {
  timestamps: true
});

export const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);
