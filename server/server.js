import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB, getDbStatus } from './config/db.js';

// Route Imports
import { productRouter } from './routes/productRoutes.js';
import { orderRouter } from './routes/orderRoutes.js';
import { userRouter } from './routes/userRoutes.js';
import { paymentRouter } from './routes/paymentRoutes.js';
import { shippingRouter } from './routes/shippingRoutes.js';
import { couponRouter } from './routes/couponRoutes.js';
import { inventoryRouter } from './routes/inventoryRoutes.js';
import { cartRouter, wishlistRouter, reviewRouter } from './routes/utilityRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health & Architecture Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Gift Mart E-Commerce Backend API',
    database: getDbStatus(),
    endpoints: {
      products: '/api/products',
      orders: '/api/orders',
      users: '/api/users',
      cart: '/api/cart',
      wishlist: '/api/wishlist',
      inventory: '/api/inventory',
      reviews: '/api/reviews',
      coupons: '/api/coupons',
      payments: '/api/payments/razorpay',
      shipping: '/api/shipping'
    },
    paymentGateway: 'Razorpay Integrated (UPI / Cards / NetBanking)',
    courierPartner: 'Delhivery / Shiprocket Integrated'
  });
});

// API Routes Mounting
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/users', userRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/shipping', shippingRouter);
app.use('/api/coupons', couponRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/cart', cartRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/reviews', reviewRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[API Error]', err);
  res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
});

// Start Server & Connect Database
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`\n=================================================`);
    console.log(`🚀 Gift Mart API Server running at http://localhost:${PORT}`);
    console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`💳 Razorpay Integration: Active`);
    console.log(`🚚 Courier Shipping API: Active`);
    console.log(`=================================================\n`);
  });
};

startServer();
