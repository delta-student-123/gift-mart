import express from 'express';
import { Product } from '../models/Product.js';
import { initialProducts } from '../seed/initialData.js';

export const productRouter = express.Router();

// Memory cache fallback for when MongoDB is in mock/offline mode
let localProducts = [...initialProducts];

// GET /api/products (filter, search, sort)
productRouter.get('/', async (req, res) => {
  try {
    const { category, occasion, recipient, maxPrice, search, delivery } = req.query;

    let items = [];
    try {
      // Try Mongoose if connected
      const query = {};
      if (category && category !== 'all') query.category = category;
      if (occasion && occasion !== 'all') query.occasions = occasion;
      if (recipient && recipient !== 'all') query.recipients = recipient;
      if (delivery) query.deliverySpeed = delivery;
      if (maxPrice) query.price = { $lte: Number(maxPrice) };
      if (search) query.name = { $regex: search, $options: 'i' };

      items = await Product.find(query);
    } catch {
      items = [];
    }

    if (!items || items.length === 0) {
      // Use in-memory store
      items = localProducts.filter(p => {
        if (category && category !== 'all' && p.category !== category) return false;
        if (occasion && occasion !== 'all' && (!p.occasions || !p.occasions.includes(occasion))) return false;
        if (recipient && recipient !== 'all' && (!p.recipients || !p.recipients.includes(recipient))) return false;
        if (delivery && p.deliverySpeed !== delivery) return false;
        if (maxPrice && p.price > Number(maxPrice)) return false;
        if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      });
    }

    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/products/:id
productRouter.get('/:id', async (req, res) => {
  try {
    let product = null;
    try {
      product = await Product.findOne({ id: req.params.id });
    } catch (e) {
      // ignore
    }

    if (!product) {
      product = localProducts.find(p => p.id === req.params.id);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/products (Admin Create)
productRouter.post('/', async (req, res) => {
  try {
    const newProd = {
      id: req.body.id || 'prod-' + Date.now(),
      name: req.body.name,
      category: req.body.category,
      price: Number(req.body.price),
      originalPrice: Number(req.body.originalPrice || req.body.price * 1.3),
      rating: 5.0,
      reviewCount: 0,
      image: req.body.image,
      stock: Number(req.body.stock || 50),
      deliverySpeed: req.body.deliverySpeed || 'same-day',
      isPersonalizable: Boolean(req.body.isPersonalizable),
      description: req.body.description || ''
    };

    try {
      await Product.create(newProd);
    } catch {
      // ignore
    }

    localProducts.unshift(newProd);
    res.status(201).json({ success: true, data: newProd });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PUT /api/products/:id (Admin Update)
productRouter.put('/:id', async (req, res) => {
  try {
    let updated = null;
    try {
      updated = await Product.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    } catch {
      // ignore
    }

    const idx = localProducts.findIndex(p => p.id === req.params.id);
    if (idx !== -1) {
      localProducts[idx] = { ...localProducts[idx], ...req.body };
      updated = localProducts[idx];
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE /api/products/:id (Admin Delete)
productRouter.delete('/:id', async (req, res) => {
  try {
    try {
      await Product.findOneAndDelete({ id: req.params.id });
    } catch {
      // ignore
    }

    localProducts = localProducts.filter(p => p.id !== req.params.id);
    res.json({ success: true, message: 'Product removed' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
