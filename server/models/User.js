import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: 'hashed_password' },
  phone: { type: String, default: '+91 98765 43210' },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  defaultAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String
  }
}, {
  timestamps: true
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
