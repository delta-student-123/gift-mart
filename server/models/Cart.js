import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, default: 1, min: 1 },
  customization: {
    text: String,
    date: String,
    font: String,
    photoUrl: String
  }
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sessionId: { type: String },
  items: [cartItemSchema],
  appliedCoupon: { type: String }
}, {
  timestamps: true
});

export const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
