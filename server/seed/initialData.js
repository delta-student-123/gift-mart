export const initialProducts = [
  {
    id: 'prod-1',
    name: 'Midnight Crimson - 24 Premium Red Roses Bouquet',
    category: 'flowers',
    price: 1299,
    originalPrice: 1799,
    rating: 4.9,
    reviewCount: 382,
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=700&q=80',
    occasions: ['birthday', 'anniversary', 'romance'],
    recipients: ['Wife', 'Girlfriend', 'Husband', 'Mom'],
    deliverySpeed: 'same-day',
    isBestseller: true,
    isPersonalizable: false,
    stock: 45,
    description: 'Freshly harvested Dutch velvet red roses wrapped elegantly in matte black gold-embossed paper.'
  },
  {
    id: 'prod-2',
    name: 'Custom 3D Illusion Night Lamp with Couple Portrait',
    category: 'personalized',
    price: 1499,
    originalPrice: 2299,
    rating: 4.8,
    reviewCount: 419,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80',
    occasions: ['anniversary', 'birthday', 'romance'],
    recipients: ['Husband', 'Wife', 'Girlfriend', 'Boyfriend'],
    deliverySpeed: 'standard',
    isBestseller: true,
    isPersonalizable: true,
    stock: 28,
    description: 'Laser-engraved optical acrylic lamp on a polished solid oak wood LED base.'
  },
  {
    id: 'prod-3',
    name: 'Belgian Truffle Decadence Cake (Eggless, 1 Kg)',
    category: 'cakes',
    price: 999,
    originalPrice: 1399,
    rating: 4.9,
    reviewCount: 520,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80',
    occasions: ['birthday', 'anniversary', 'congratulations'],
    recipients: ['Mom', 'Dad', 'Best Friend', 'Sister', 'Brother'],
    deliverySpeed: 'same-day',
    isBestseller: true,
    isPersonalizable: true,
    stock: 35,
    description: 'Rich dark Belgian cocoa sponge layered with 70% dark chocolate ganache. 100% eggless.'
  },
  {
    id: 'prod-4',
    name: 'The Royal Treasure Velvet Hamper Trunk',
    category: 'hampers',
    price: 2899,
    originalPrice: 3999,
    rating: 5.0,
    reviewCount: 164,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=700&q=80',
    occasions: ['festivals', 'congratulations', 'anniversary', 'housewarming'],
    recipients: ['Mom', 'Dad', 'Boss / Colleague', 'Husband', 'Wife'],
    deliverySpeed: 'next-day',
    isBestseller: true,
    isPersonalizable: false,
    stock: 19,
    description: 'Handcrafted emerald velvet trunk containing roasted nuts, artisan dragees, and organic scented candle.'
  }
];

export const initialCoupons = [
  {
    code: 'WELCOME150',
    description: 'Flat ₹150 off on your first order',
    discountPercent: 0,
    flatDiscount: 150,
    minOrderValue: 799,
    isActive: true
  },
  {
    code: 'GIFTJOY20',
    description: '20% off on all luxury hampers & combos',
    discountPercent: 20,
    flatDiscount: 0,
    minOrderValue: 1499,
    isActive: true
  },
  {
    code: 'FESTIVE10',
    description: 'Extra 10% off site-wide celebration discount',
    discountPercent: 10,
    flatDiscount: 0,
    minOrderValue: 500,
    isActive: true
  }
];

export const initialCustomers = [
  { id: 'usr-1', name: 'Aarav Patel', email: 'aarav.patel@giftmart.in', phone: '+91 98765 43210', role: 'customer' },
  { id: 'usr-2', name: 'Priyanka Sharma', email: 'priyanka.s@gmail.com', phone: '+91 98111 22334', role: 'customer' },
  { id: 'usr-3', name: 'Admin Master', email: 'admin@giftmart.in', phone: '+91 98000 11223', role: 'admin' }
];
