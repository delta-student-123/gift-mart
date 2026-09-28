# 🎁 Gift Mart - Full-Stack E-Commerce Platform

A production-grade, luxury gifting e-commerce platform built with React, Node.js, Express, MongoDB, Razorpay payment gateway, and Courier Shipping delivery tracking.

---

## 🏛️ System Architecture

```text
CUSTOMER WEBSITE
React 19 + HTML5 + CSS3 + Lucide Icons
        ↓
Backend REST API
Node.js + Express.js (Port 5000)
        ↓
Database
MongoDB (Mongoose ODM + Resilient In-Memory Fallback)
        ↓
 ┌──────────────┬──────────────┬──────────────┐
 Products       Users          Orders
 Cart           Wishlist       Inventory
 Reviews        Coupons        Addresses
        ↓
Payment Gateway
Razorpay (UPI, Credit/Debit Cards, NetBanking)
        ↓
Shipping / Delivery
Courier API (Delhivery / Shiprocket Live AWB Tracking)
        ↓
Admin Panel
Products • Orders • Customers • Inventory • Coupons
```

---

## 🚀 Features

### 🛒 Customer Storefront
- **Celebration Hero & Discovery**: Live Gift Finder wizard (filter by recipient, occasion, budget).
- **Interactive Product Catalog**: Real-time filtering by category (Cakes, Flowers, Personalized, Hampers), occasions, recipients, and budget slider.
- **Pincode Delivery Check**: Instant validation of 12+ metro pincodes for same-day cut-off times and express slots.
- **3D Laser Engraving & Photo Personalizer**: Live text and font preview for customizable gifts.
- **Slide-Out Cart Drawer**: Free delivery progress bar, item quantity steppers, and promo coupon engine.
- **Multi-Step Checkout**:
  - Step 1: Saved delivery address selection or new address entry + delivery slot selection (Morning, Standard, Midnight).
  - Step 2: Complimentary personalized greeting card message & sender name.
  - Step 3: Razorpay test sandbox checkout simulation (instant UPI, cards, net banking).
- **Celebration Confetti & Order Success**: Animated celebration confirmation with Courier AWB tracking timeline.

### 🛡️ Admin Operations Panel
- **Products**: Full inventory table, quick stock & price updates, "Add New Product" modal, delete action.
- **Orders & Dispatch**: Live pipeline with status management (`Placed` → `Processing` → `Dispatched` → `In Transit` → `Delivered`), customer details, and Delhivery AWB tracking.
- **Customer Roster**: Registered users directory with lifetime spend, orders count, and city.
- **Inventory Health**: Stock level monitor with automated low-stock warnings (<25 units) and 1-click restock adjustments.
- **Coupons**: Active promotional codes management (`WELCOME150`, `GIFTJOY20`, `FESTIVE10`).

---

## 🔌 Backend REST API Endpoints

| Category | Method | Endpoint | Description |
|---|---|---|---|
| **Health** | `GET` | `/api/health` | Health check, DB status, and active integrations |
| **Products** | `GET` | `/api/products` | Filter by category, occasion, recipient, price, search |
| **Products** | `POST` | `/api/products` | Create new product (Admin) |
| **Products** | `DELETE` | `/api/products/:id` | Remove product from catalog |
| **Orders** | `GET` | `/api/orders` | Retrieve orders list |
| **Orders** | `POST` | `/api/orders` | Create new booking |
| **Orders** | `PUT` | `/api/orders/:orderNumber/status` | Update fulfillment status |
| **Payments** | `POST` | `/api/payments/razorpay/create-order` | Generate Razorpay order ID |
| **Payments** | `POST` | `/api/payments/razorpay/verify` | Verify Razorpay payment signature |
| **Shipping** | `POST` | `/api/shipping/calculate-rate` | Calculate shipping fee & delivery estimate |
| **Shipping** | `POST` | `/api/shipping/create-shipment` | Generate Delhivery AWB tracking number |
| **Shipping** | `GET` | `/api/shipping/track/:awb` | Live parcel tracking milestones |
| **Coupons** | `POST` | `/api/coupons/validate` | Verify coupon & calculate discount |
| **Inventory** | `GET` | `/api/inventory` | Check warehouse stock levels & low stock alerts |
| **Customers** | `GET` | `/api/users/customers` | Retrieve customer directory |

---

## 🏃 Quick Start Guide

### 1. Run Frontend (Storefront & Admin)
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Run Backend API Server
```bash
npm run server
```
The Express server boots on [http://localhost:5000](http://localhost:5000).

*(Note: The backend features an auto-reconnect engine. If MongoDB is active, it connects via Mongoose; if local MongoDB is offline, it activates the resilient in-memory store so you can test all API endpoints without any setup.)*

### 3. (Optional) Seed MongoDB Database
```bash
npm run seed
```
Seeds initial products, coupons, customers, and inventory into MongoDB.
