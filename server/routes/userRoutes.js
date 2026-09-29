import express from 'express';
import { initialCustomers } from '../seed/initialData.js';

export const userRouter = express.Router();

let localUsers = [...initialCustomers];

// POST /api/users/login
userRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = localUsers.find(u => u.email === email) || {
    id: 'usr-' + Date.now(),
    name: 'Valued Customer',
    email,
    role: 'customer'
  };

  res.json({
    success: true,
    token: 'jwt_mock_token_' + Math.random().toString(36).substring(2),
    user
  });
});

// GET /api/users/customers (Admin Roster)
userRouter.get('/customers', (req, res) => {
  res.json({ success: true, count: localUsers.length, data: localUsers });
});
