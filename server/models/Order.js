import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  image: String,
  customization: {
    text: String,
    date: String,
    font: String,
    photoUrl: String
  }
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  deliveryFee: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Placed', 'Processing', 'Dispatched', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Placed'
  },
  deliveryDate: { type: String, default: 'Tomorrow' },
  deliverySlot: { type: String, default: 'Standard Delivery (9:00 AM - 9:00 PM)' },
  recipientName: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  giftMessage: { type: String, default: '' },
  paymentInfo: {
    method: { type: String, default: 'Razorpay UPI' },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    status: { type: String, default: 'PAID' }
  },
  shippingInfo: {
    courier: { type: String, default: 'Delhivery Express' },
    trackingId: { type: String, default: 'DLV-PENDING' },
    shippedAt: Date,
    deliveredAt: Date
  }
}, {
  timestamps: true
});

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
