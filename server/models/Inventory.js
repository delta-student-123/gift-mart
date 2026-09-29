import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  sku: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true, default: 50 },
  reserved: { type: Number, default: 0 },
  lowStockThreshold: { type: Number, default: 20 },
  warehouseLocation: { type: String, default: 'Delhi NCR Hub - Bay 4' },
  status: { type: String, enum: ['In Stock', 'Low Stock', 'Out of Stock'], default: 'In Stock' }
}, {
  timestamps: true
});

export const Inventory = mongoose.models.Inventory || mongoose.model('Inventory', inventorySchema);
