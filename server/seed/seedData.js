import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';
import { Coupon } from '../models/Coupon.js';
import { Inventory } from '../models/Inventory.js';
import { initialProducts, initialCoupons, initialCustomers } from './initialData.js';

dotenv.config();

const seedDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/giftmart';

  try {
    await mongoose.connect(uri);
    console.log('[Seeder] Connected to MongoDB');

    // Clear existing
    await Product.deleteMany({});
    await User.deleteMany({});
    await Coupon.deleteMany({});
    await Inventory.deleteMany({});

    // Seed products
    await Product.insertMany(initialProducts);
    console.log(`[Seeder] Seeded ${initialProducts.length} products`);

    // Seed users
    await User.insertMany(initialCustomers);
    console.log(`[Seeder] Seeded ${initialCustomers.length} users`);

    // Seed coupons
    await Coupon.insertMany(initialCoupons);
    console.log(`[Seeder] Seeded ${initialCoupons.length} coupons`);

    // Seed inventory
    const inventoryItems = initialProducts.map(p => ({
      productId: p.id,
      sku: 'SKU-' + p.id.toUpperCase(),
      productName: p.name,
      quantity: p.stock,
      reserved: 1,
      lowStockThreshold: 20
    }));
    await Inventory.insertMany(inventoryItems);
    console.log(`[Seeder] Seeded ${inventoryItems.length} inventory records`);

    console.log('[Seeder] Database Seeding Completed Successfully! 🌱');
    process.exit(0);
  } catch (err) {
    console.error('[Seeder Error]', err.message);
    process.exit(1);
  }
};

seedDB();
