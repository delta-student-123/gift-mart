import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['flowers', 'cakes', 'personalized', 'hampers', 'chocolates', 'plants', 'perfumes', 'combos'] 
  },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  rating: { type: Number, default: 4.8 },
  reviewCount: { type: Number, default: 0 },
  image: { type: String, required: true },
  occasions: [{ type: String }],
  recipients: [{ type: String }],
  deliverySpeed: { type: String, enum: ['same-day', 'next-day', 'standard'], default: 'same-day' },
  isBestseller: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isPersonalizable: { type: Boolean, default: false },
  stock: { type: Number, default: 50 },
  description: { type: String, default: '' }
}, {
  timestamps: true
});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
