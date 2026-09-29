import express from 'express';
import { initialCoupons } from '../seed/initialData.js';

export const couponRouter = express.Router();

let localCoupons = [...initialCoupons];

// GET /api/coupons
couponRouter.get('/', (req, res) => {
  res.json({ success: true, data: localCoupons });
});

// POST /api/coupons/validate
couponRouter.post('/validate', (req, res) => {
  const { code, cartSubtotal = 0 } = req.body;
  if (!code) return res.status(400).json({ success: false, message: 'Coupon code required' });

  const found = localCoupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
  if (!found || !found.isActive) {
    return res.status(404).json({ success: false, message: 'Invalid or expired coupon code' });
  }

  if (cartSubtotal < found.minOrderValue) {
    return res.status(400).json({
      success: false,
      message: `Coupon requires minimum order of ₹${found.minOrderValue}`
    });
  }

  let discount = 0;
  if (found.flatDiscount) {
    discount = Math.min(found.flatDiscount, cartSubtotal);
  } else if (found.discountPercent) {
    discount = Math.round((cartSubtotal * found.discountPercent) / 100);
  }

  res.json({
    success: true,
    data: {
      code: found.code,
      discount,
      description: found.description
    }
  });
});
