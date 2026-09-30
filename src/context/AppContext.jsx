import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, VALID_PINCODES, AVAILABLE_COUPONS, BRAND } from '../data/products';
import confetti from 'canvas-confetti';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Navigation & Routing State
  const [currentView, setCurrentView] = useState(() => {
    const path = window.location.pathname.replace(/^\//, '');
    if (!path) return 'home';
    if (path.startsWith('product/')) return 'product-detail';
    return path;
  });
  const [viewParams, setViewParams] = useState(() => {
    try {
      const search = window.location.search;
      if (search) {
        const params = new URLSearchParams(search);
        const obj = {};
        for (const [k, v] of params.entries()) {
          obj[k] = v;
        }
        return obj;
      }
    } catch (e) {
      // ignore
    }
    return {};
  });

  // Pincode & Delivery State (Persisted across the shopping journey)
  const [pincode, setPincode] = useState(() => {
    try {
      return localStorage.getItem('stepin_pincode') || '110001';
    } catch {
      return '110001';
    }
  });

  const [pincodeInfo, setPincodeInfo] = useState(() => {
    return VALID_PINCODES[pincode] || VALID_PINCODES['110001'];
  });

  // Products State
  const [productsList, setProductsList] = useState(PRODUCTS);

  // Cart State (Persisted in localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('stepin_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (Persisted in localStorage)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('stepin_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-4'];
    } catch {
      return ['prod-1', 'prod-4'];
    }
  });

  // Gift Reminders ("Never Miss a Special Date")
  const [giftReminders, setGiftReminders] = useState(() => {
    try {
      const saved = localStorage.getItem('stepin_reminders');
      return saved ? JSON.parse(saved) : [
        { id: 'rem-1', name: 'Mom', relationship: 'Mother', occasion: 'Birthday', date: '14 Oct', daysLeft: 16 },
        { id: 'rem-2', name: 'Sneha', relationship: 'Wife', occasion: 'Anniversary', date: '28 Nov', daysLeft: 61 }
      ];
    } catch {
      return [];
    }
  });

  // Coupon State
  const [activeCoupon, setActiveCoupon] = useState(null);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [personalizerProduct, setPersonalizerProduct] = useState(null);
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState(null);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  // User Profile
  const [currentUser, setCurrentUser] = useState({
    name: 'Aarav Patel',
    email: 'aarav.patel@stepingiftmart.com',
    phone: '+91 98765 43210',
    role: 'customer'
  });

  // Saved Addresses
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      fullName: 'Aarav Patel',
      phone: '+91 98765 43210',
      street: 'Flat 402, Lotus Orchid, Outer Ring Road',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110001',
      type: 'Home',
      isDefault: true
    },
    {
      id: 'addr-2',
      fullName: 'Aarav Patel',
      phone: '+91 98765 43210',
      street: 'Tower B, Cyber City DLF Phase 2',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122001',
      type: 'Office',
      isDefault: false
    }
  ]);
  const [activeAddress, setActiveAddress] = useState(addresses[0]);

  // Orders History
  const [orders, setOrders] = useState([
    {
      id: 'ORD-98231',
      date: '2026-09-24',
      items: [
        {
          id: 'prod-1',
          name: 'Midnight Crimson - 24 Premium Dutch Red Roses Bouquet',
          price: 1299,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=300&q=80'
        }
      ],
      total: 1299,
      subtotal: 1299,
      discount: 0,
      deliveryFee: 0,
      status: 'Delivered',
      deliveryDate: '24 Sep, 11:45 PM',
      deliverySlot: 'Midnight Delivery (11:00 PM - 12:00 AM)',
      recipientName: 'Meera Patel',
      shippingAddress: 'Flat 402, Lotus Orchid, Outer Ring Road, New Delhi - 110001',
      courier: 'Delhivery Express',
      trackingId: 'DLV-8492049182',
      paymentMethod: 'Razorpay UPI'
    }
  ]);

  // Sync pincode to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('stepin_pincode', pincode);
    } catch (e) {
      console.error(e);
    }
  }, [pincode]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('stepin_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('stepin_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Sync reminders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('stepin_reminders', JSON.stringify(giftReminders));
    } catch (e) {
      console.error(e);
    }
  }, [giftReminders]);

  // Clean URL Routing synchronization
  const navigateTo = (view, params = {}) => {
    if (view === 'custom') view = 'custom-gifts';
    setCurrentView(view);
    setViewParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let urlPath = '/' + (view === 'home' ? '' : view);
    if (params.category) urlPath = `/shop?category=${params.category}`;
    if (params.occasion) urlPath = `/shop?occasion=${params.occasion}`;
    try {
      window.history.pushState({ view, params }, '', urlPath);
    } catch (e) {
      // ignore
    }
  };

  // Popstate listener for back/forward buttons
  useEffect(() => {
    const handlePop = (e) => {
      if (e.state && e.state.view) {
        setCurrentView(e.state.view);
        setViewParams(e.state.params || {});
      } else {
        const path = window.location.pathname.replace(/^\//, '') || 'home';
        setCurrentView(path);
      }
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  // Toast Functionality
  const showToast = (message, type = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Check Pincode (Saved throughout customer shopping journey)
  const checkPincode = (code) => {
    const trimmed = (code || '').trim();
    if (VALID_PINCODES[trimmed]) {
      const info = VALID_PINCODES[trimmed];
      setPincode(trimmed);
      setPincodeInfo(info);
      showToast(`Pincode ${trimmed} is serviceable! Express Same-Day delivery available for ${info.city}.`);
      return { success: true, info };
    } else {
      const fallback = { city: 'All India', state: 'Standard Courier', sameDayAvailable: false, cutoffTime: '5:00 PM', standardDays: '2-3 Days' };
      setPincode(trimmed);
      setPincodeInfo(fallback);
      showToast(`Standard courier delivery (2-3 days) available for PIN ${trimmed}.`);
      return { success: true, info: fallback };
    }
  };

  // Cart Management
  const addToCart = (product, quantity = 1, customization = null) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        JSON.stringify(item.customization) === JSON.stringify(customization)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, {
          id: 'cart-' + Date.now() + Math.floor(Math.random() * 1000),
          product,
          quantity,
          customization
        }];
      }
    });

    showToast(`Added "${product.name.slice(0, 28)}..." to cart!`);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity: newQty } : item));
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
  };

  // Wishlist Management
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed from your wishlist`, 'info');
        return prev.filter(id => id !== product.id);
      } else {
        showToast(`Saved to your wishlist ❤️`);
        return [...prev, product.id];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Cart Price Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  
  let couponDiscount = 0;
  if (activeCoupon) {
    if (activeCoupon.flatDiscount) {
      couponDiscount = Math.min(activeCoupon.flatDiscount, cartSubtotal);
    } else if (activeCoupon.discountPercent) {
      couponDiscount = Math.round((cartSubtotal * activeCoupon.discountPercent) / 100);
    }
  }

  const deliveryFee = cartSubtotal >= 999 || cart.length === 0 ? 0 : 79;
  const cartTotal = Math.max(0, cartSubtotal - couponDiscount + deliveryFee);

  const applyCoupon = (code) => {
    const found = AVAILABLE_COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      showToast('Invalid or expired promo code', 'error');
      return false;
    }
    if (cartSubtotal < found.minOrderValue) {
      showToast(`Coupon valid on minimum order of ₹${found.minOrderValue}`, 'error');
      return false;
    }
    setActiveCoupon(found);
    showToast(`Promo ${found.code} applied! Saved ₹${found.flatDiscount || ((cartSubtotal * found.discountPercent) / 100)}`);
    return true;
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    showToast('Coupon removed');
  };

  // Place Order & Razorpay Checkout Simulation
  const handlePlaceOrder = async (orderDetails) => {
    try {
      const orderNumber = 'SIGM-' + Math.floor(100000 + Math.random() * 900000);
      const newOrder = {
        id: orderNumber,
        date: new Date().toISOString().split('T')[0],
        items: cart.map(c => ({
          id: c.product.id,
          name: c.product.name,
          price: c.product.price,
          quantity: c.quantity,
          image: c.product.image,
          customization: c.customization
        })),
        total: cartTotal,
        subtotal: cartSubtotal,
        discount: couponDiscount,
        deliveryFee,
        status: 'Confirmed', // Order Confirmed -> Gift Being Prepared -> Packed -> Shipped -> Out for Delivery -> Delivered
        deliveryDate: orderDetails.deliveryDate || 'Tomorrow',
        deliverySlot: orderDetails.deliverySlot || 'Standard Delivery (9:00 AM - 9:00 PM)',
        recipientName: orderDetails.recipientName || currentUser.name,
        shippingAddress: orderDetails.shippingAddress || (activeAddress ? `${activeAddress.street}, ${activeAddress.city} - ${activeAddress.pincode}` : '110001, Delhi'),
        giftMessage: orderDetails.giftMessage || '',
        courier: 'Delhivery Express Air',
        trackingId: 'DLV-' + Math.floor(1000000000 + Math.random() * 9000000000),
        paymentMethod: orderDetails.paymentMethod || 'Razorpay Online'
      };

      setOrders(prev => [newOrder, ...prev]);
      clearCart();
      setIsCheckoutOpen(false);

      // Celebration Confetti
      try {
        confetti({
          particleCount: 110,
          spread: 85,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }

      showToast(`Order #${orderNumber} placed successfully!`);
      navigateTo('order-confirmation', { order: newOrder });
      return newOrder;
    } catch (err) {
      showToast('Payment processing failed. Please try again.', 'error');
      throw err;
    }
  };

  // Modals Control
  const openProductDetail = (product) => {
    setSelectedProduct(product);
  };
  const closeProductDetail = () => setSelectedProduct(null);

  const openPersonalizer = (product) => setPersonalizerProduct(product);
  const closePersonalizer = () => setPersonalizerProduct(null);

  // Address helper
  const addAddress = (addr) => {
    const newAddr = { ...addr, id: 'addr-' + Date.now() };
    setAddresses(prev => [...prev, newAddr]);
    setActiveAddress(newAddr);
    showToast('New address saved!');
  };

  // Gift Reminders helper
  const addGiftReminder = (reminder) => {
    const newRem = {
      ...reminder,
      id: 'rem-' + Date.now(),
      daysLeft: Math.floor(Math.random() * 45) + 5
    };
    setGiftReminders(prev => [...prev, newRem]);
    showToast(`Celebration reminder for ${reminder.name} saved!`);
  };

  const removeGiftReminder = (id) => {
    setGiftReminders(prev => prev.filter(r => r.id !== id));
    showToast('Reminder removed');
  };

  return (
    <AppContext.Provider
      value={{
        brand: BRAND,
        currentView,
        viewParams,
        navigateTo,
        pincode,
        pincodeInfo,
        checkPincode,
        showPincodeModal,
        setShowPincodeModal,
        productsList,
        setProductsList,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        couponDiscount,
        activeCoupon,
        applyCoupon,
        removeCoupon,
        deliveryFee,
        cartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        selectedProduct,
        openProductDetail,
        closeProductDetail,
        personalizerProduct,
        openPersonalizer,
        closePersonalizer,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orders,
        setOrders,
        handlePlaceOrder,
        trackingOrder,
        setTrackingOrder,
        currentUser,
        setCurrentUser,
        addresses,
        activeAddress,
        setActiveAddress,
        addAddress,
        giftReminders,
        addGiftReminder,
        removeGiftReminder,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
