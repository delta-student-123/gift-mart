import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Zap, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  Heart, 
  Plus, 
  Minus, 
  ShoppingBag,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductDetailModal = () => {
  const { 
    selectedProduct, 
    closeProductDetail, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    pincode,
    pincodeInfo,
    checkPincode,
    openPersonalizer,
    setIsCheckoutOpen
  } = useApp();

  const [qty, setQty] = useState(1);
  const [pinInput, setPinInput] = useState(pincode || '');
  const [selectedAddons, setSelectedAddons] = useState([]);

  if (!selectedProduct) return null;

  const isFavorited = isInWishlist(selectedProduct.id);
  const discountPercent = selectedProduct.originalPrice 
    ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100) 
    : 0;

  const addonsList = [
    { id: 'addon-1', name: 'Artisan Greeting Card', price: 99, icon: '💌' },
    { id: 'addon-2', name: 'Mini Golden Diya / Candle', price: 149, icon: '🕯️' },
    { id: 'addon-3', name: 'Small Plush Huggy Bear', price: 299, icon: '🧸' }
  ];

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => 
      prev.some(a => a.id === addon.id) 
        ? prev.filter(a => a.id !== addon.id) 
        : [...prev, addon]
    );
  };

  const handleAddProduct = () => {
    if (selectedProduct.isPersonalizable) {
      closeProductDetail();
      openPersonalizer(selectedProduct);
    } else {
      addToCart(selectedProduct, qty);
      closeProductDetail();
    }
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, qty);
    closeProductDetail();
    setIsCheckoutOpen(true);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.65)',
      backdropFilter: 'blur(4px)',
      zIndex: 260,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem'
    }}>
      <div 
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: 880,
          maxHeight: '92vh',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-2xl)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeProductDetail}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.95)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <X size={20} color="var(--charcoal-dark)" />
        </button>

        {/* Modal Scrollable Container */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '2.5rem', alignItems: 'flex-start' }}>
            
            {/* Left Image Area */}
            <div>
              <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', position: 'relative', width: '100%', paddingTop: '100%', boxShadow: 'var(--shadow-md)' }}>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }} 
                />

                {discountPercent > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    background: '#dc2626',
                    color: '#ffffff',
                    padding: '3px 9px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    boxShadow: '0 2px 6px rgba(220, 38, 38, 0.25)'
                  }}>
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Trust highlights */}
              <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem', color: 'var(--charcoal-body)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ShieldCheck size={16} color="var(--accent-emerald)" />
                  <span>100% Freshness & Quality Assurance</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Clock size={16} color="var(--primary)" />
                  <span>On-time Delivery Guaranteed or 100% Refund</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Truck size={16} color="#2563eb" />
                  <span>Sanitized, Temperature-Controlled Van Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Product Information */}
            <div>
              {/* Category & Rating */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="section-tag" style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', marginBottom: 0 }}>
                  {selectedProduct.category.toUpperCase()}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: '#fef3c7', padding: '3px 8px', borderRadius: 'var(--radius-full)' }}>
                    <Star size={13} fill="#d97706" color="#d97706" />
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#92400e' }}>{selectedProduct.rating}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>({selectedProduct.reviewCount} customer reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--charcoal-dark)', lineHeight: 1.3, marginBottom: '0.75rem' }}>
                {selectedProduct.name}
              </h2>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--charcoal-dark)' }}>
                  ₹{selectedProduct.price.toLocaleString('en-IN')}
                </span>
                {selectedProduct.originalPrice && (
                  <span style={{ fontSize: '1.05rem', color: 'var(--charcoal-muted)', textDecoration: 'line-through' }}>
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span style={{ fontSize: '0.82rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                  Inclusive of all taxes
                </span>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.92rem', color: 'var(--charcoal-body)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {selectedProduct.description}
              </p>

              {/* Pincode Availability check */}
              <div style={{ background: 'var(--secondary-warm)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem', border: '1px solid var(--secondary-border)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--charcoal-muted)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={13} color="var(--primary)" />
                  <span>Check Delivery Availability</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <input
                    type="text"
                    maxLength={6}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter pincode"
                    className="form-input"
                    style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => checkPincode(pinInput)}
                  >
                    Check
                  </button>
                </div>
                {pincodeInfo && (
                  <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 600, marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <CheckCircle2 size={13} />
                    <span>Deliverable to {pincodeInfo.city} ({pincode}). {selectedProduct.deliverySpeed === 'same-day' ? '⚡ Same-Day delivery available!' : 'Courier dispatch in 24 hours.'}</span>
                  </div>
                )}
              </div>

              {/* Celebration Add-ons */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--charcoal-dark)', marginBottom: '0.5rem' }}>
                  Make It Extra Special (Optional Add-ons):
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {addonsList.map(addon => {
                    const isAdded = selectedAddons.some(a => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.45rem 0.75rem',
                          borderRadius: 'var(--radius-md)',
                          border: isAdded ? '1.5px solid var(--primary)' : '1px solid var(--border-subtle)',
                          background: isAdded ? 'var(--primary-subtle)' : '#ffffff',
                          cursor: 'pointer',
                          fontSize: '0.82rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span>{addon.icon}</span>
                          <span style={{ fontWeight: 600 }}>{addon.name}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontWeight: 700, color: 'var(--primary)' }}>+₹{addon.price}</span>
                          <span style={{ width: 18, height: 18, borderRadius: '50%', background: isAdded ? 'var(--primary)' : '#e5e7eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                            {isAdded ? '✓' : '+'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions & Quantity */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                {!selectedProduct.isPersonalizable && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'var(--secondary-warm)',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.4rem 0.8rem',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <button 
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontWeight: 700, minWidth: 20, textAlign: 'center' }}>{qty}</span>
                    <button 
                      onClick={() => setQty(qty + 1)}
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => toggleWishlist(selectedProduct)}
                  style={{ padding: '0.75rem' }}
                  title="Wishlist"
                >
                  <Heart size={18} color={isFavorited ? 'var(--primary)' : 'currentColor'} fill={isFavorited ? 'var(--primary)' : 'none'} />
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddProduct}
                  style={{ flex: 1, gap: 6 }}
                >
                  {selectedProduct.isPersonalizable ? (
                    <>
                      <Sparkles size={16} />
                      <span>Customize & Add</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                {!selectedProduct.isPersonalizable && (
                  <button
                    type="button"
                    className="btn btn-gold"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
