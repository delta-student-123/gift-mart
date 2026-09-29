import express from 'express';

export const cartRouter = express.Router();
export const wishlistRouter = express.Router();
export const reviewRouter = express.Router();

// Cart routes
let sessionCart = [];
cartRouter.get('/', (req, res) => res.json({ success: true, data: sessionCart }));
cartRouter.post('/add', (req, res) => {
  sessionCart.push(req.body);
  res.json({ success: true, data: sessionCart });
});
cartRouter.delete('/clear', (req, res) => {
  sessionCart = [];
  res.json({ success: true, message: 'Cart cleared' });
});

// Wishlist routes
let sessionWishlist = ['prod-1', 'prod-4'];
wishlistRouter.get('/', (req, res) => res.json({ success: true, data: sessionWishlist }));
wishlistRouter.post('/toggle', (req, res) => {
  const { productId } = req.body;
  if (sessionWishlist.includes(productId)) {
    sessionWishlist = sessionWishlist.filter(id => id !== productId);
  } else {
    sessionWishlist.push(productId);
  }
  res.json({ success: true, data: sessionWishlist });
});

// Review routes
let reviews = [
  { productId: 'prod-1', userName: 'Priyanka Sharma', rating: 5, comment: 'Arrived right on time for midnight celebration! Beautiful fresh blooms.' },
  { productId: 'prod-2', userName: 'Rohit Kulkarni', rating: 5, comment: 'Custom acrylic laser etching was breathtaking. 10/10' }
];

reviewRouter.get('/:productId', (req, res) => {
  const list = reviews.filter(r => r.productId === req.params.productId);
  res.json({ success: true, data: list });
});

reviewRouter.post('/', (req, res) => {
  reviews.push(req.body);
  res.json({ success: true, data: req.body });
});
