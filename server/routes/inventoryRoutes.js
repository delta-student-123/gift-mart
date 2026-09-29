import express from 'express';
import { initialProducts } from '../seed/initialData.js';

export const inventoryRouter = express.Router();

let localInventory = initialProducts.map(p => ({
  productId: p.id,
  productName: p.name,
  sku: 'SKU-' + p.id.toUpperCase(),
  quantity: p.stock,
  reserved: 2,
  lowStockThreshold: 20,
  warehouseLocation: 'NCR Central Hub - Rack 4',
  status: p.stock < 20 ? 'Low Stock' : 'In Stock'
}));

// GET /api/inventory
inventoryRouter.get('/', (req, res) => {
  res.json({ success: true, count: localInventory.length, data: localInventory });
});

// PUT /api/inventory/:productId
inventoryRouter.put('/:productId', (req, res) => {
  const { quantity } = req.body;
  const item = localInventory.find(i => i.productId === req.params.productId);
  if (!item) return res.status(404).json({ success: false, message: 'Inventory item not found' });

  item.quantity = Number(quantity);
  item.status = item.quantity < item.lowStockThreshold ? 'Low Stock' : 'In Stock';

  res.json({ success: true, data: item });
});
