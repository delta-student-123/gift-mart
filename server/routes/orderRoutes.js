import express from 'express';
import { Order } from '../models/Order.js';

export const orderRouter = express.Router();

let localOrders = [
  {
    orderNumber: 'ORD-98231',
    items: [
      {
        productId: 'prod-1',
        name: 'Midnight Crimson - 24 Premium Red Roses Bouquet',
        price: 1299,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=700&q=80'
      }
    ],
    subtotal: 1299,
    discount: 0,
    deliveryFee: 0,
    total: 1299,
    status: 'Delivered',
    deliveryDate: '24 Sep',
    deliverySlot: 'Midnight Delivery (11:00 PM - 12:00 AM)',
    recipientName: 'Meera Patel',
    shippingAddress: 'Flat 402, Lotus Orchid, New Delhi - 110001',
    paymentInfo: { method: 'Razorpay UPI', status: 'PAID' },
    shippingInfo: { courier: 'Delhivery Express', trackingId: 'DLV-8492049182' }
  }
];

// GET /api/orders
orderRouter.get('/', async (req, res) => {
  try {
    let list = [];
    try {
      list = await Order.find().sort({ createdAt: -1 });
    } catch {
      list = [];
    }

    if (!list || list.length === 0) {
      list = localOrders;
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/orders (Create Order)
orderRouter.post('/', async (req, res) => {
  try {
    const orderNumber = req.body.orderNumber || 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const trackingId = 'DLV-' + Math.floor(1000000000 + Math.random() * 9000000000);

    const newOrder = {
      orderNumber,
      items: req.body.items || [],
      subtotal: req.body.subtotal || 0,
      discount: req.body.discount || 0,
      deliveryFee: req.body.deliveryFee || 0,
      total: req.body.total || 0,
      status: req.body.status || 'Processing',
      deliveryDate: req.body.deliveryDate || 'Tomorrow',
      deliverySlot: req.body.deliverySlot || 'Standard Delivery (9:00 AM - 9:00 PM)',
      recipientName: req.body.recipientName || 'Gift Recipient',
      shippingAddress: req.body.shippingAddress || 'Delhi NCR',
      giftMessage: req.body.giftMessage || '',
      paymentInfo: {
        method: req.body.paymentMethod || 'Razorpay Online',
        status: 'PAID'
      },
      shippingInfo: {
        courier: 'Delhivery Express',
        trackingId
      }
    };

    try {
      await Order.create(newOrder);
    } catch {
      // ignore
    }

    localOrders.unshift(newOrder);
    res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PUT /api/orders/:orderNumber/status
orderRouter.put('/:orderNumber/status', async (req, res) => {
  try {
    const { status } = req.body;
    try {
      await Order.findOneAndUpdate({ orderNumber: req.params.orderNumber }, { status });
    } catch {
      // ignore
    }

    const o = localOrders.find(ord => ord.orderNumber === req.params.orderNumber);
    if (o) o.status = status;

    res.json({ success: true, message: `Status updated to ${status}` });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});
