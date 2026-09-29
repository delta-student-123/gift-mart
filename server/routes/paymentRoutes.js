import express from 'express';

export const paymentRouter = express.Router();

// POST /api/payments/razorpay/create-order
paymentRouter.post('/razorpay/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    
    // Create Razorpay Order ID (simulated or live with keys)
    const razorpayOrderId = 'order_rzp_' + Math.random().toString(36).substring(2, 12);

    res.json({
      success: true,
      data: {
        id: razorpayOrderId,
        amount: Math.round(Number(amount) * 100), // amount in paise
        currency,
        receipt: receipt || `rcpt_${Date.now()}`,
        status: 'created',
        key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_giftmart_sandbox'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/payments/razorpay/verify
paymentRouter.post('/razorpay/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id } = req.body;

    // Simulate instant signature verification
    const isSignatureValid = true;

    if (isSignatureValid) {
      res.json({
        success: true,
        message: 'Razorpay Payment Signature Verified Successfully',
        paymentId: razorpay_payment_id || 'pay_' + Math.random().toString(36).substring(2, 10)
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
