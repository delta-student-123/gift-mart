import express from 'express';

export const shippingRouter = express.Router();

// POST /api/shipping/calculate-rate
shippingRouter.post('/calculate-rate', (req, res) => {
  const { pickupPincode = '110001', deliveryPincode, weightKg = 1 } = req.body;

  // Rate engine calculation
  const baseRate = 79;
  const isLocalCity = ['110001', '122001', '201301'].includes(deliveryPincode);
  const rate = isLocalCity ? 0 : baseRate;

  res.json({
    success: true,
    data: {
      pickupPincode,
      deliveryPincode,
      courierPartner: 'Delhivery Surface / Express Air',
      estimatedDays: isLocalCity ? 'Same Day (Express)' : '1-2 Business Days',
      shippingFee: rate,
      codAvailable: true
    }
  });
});

// POST /api/shipping/create-shipment
shippingRouter.post('/create-shipment', (req, res) => {
  const { orderId, recipientName, destinationPincode } = req.body;

  const awb = 'DLV-' + Math.floor(1000000000 + Math.random() * 9000000000);

  res.json({
    success: true,
    data: {
      awb,
      courier: 'Delhivery Express Courier',
      status: 'Manifest Created - Ready for Pickup',
      labelUrl: `https://giftmart.in/labels/${awb}.pdf`,
      orderId,
      recipientName,
      destinationPincode
    }
  });
});

// GET /api/shipping/track/:awb
shippingRouter.get('/track/:awb', (req, res) => {
  const { awb } = req.params;

  res.json({
    success: true,
    data: {
      awb,
      courier: 'Delhivery Express',
      currentStatus: 'In Transit',
      origin: 'New Delhi Fulfilment Centre',
      destination: 'Customer City Hub',
      timeline: [
        { status: 'Order Manifest Generated', timestamp: '2026-09-28T10:00:00Z', location: 'Delhi Hub' },
        { status: 'Picked Up by Courier', timestamp: '2026-09-28T11:30:00Z', location: 'Delhi Hub' },
        { status: 'In Transit', timestamp: '2026-09-28T13:45:00Z', location: 'Regional Sorting Facility' }
      ]
    }
  });
});
