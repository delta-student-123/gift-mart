import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  ArrowRight, 
  Check, 
  Sparkles,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    couponDiscount, 
    activeCoupon, 
    applyCoupon, 
    removeCoupon, 
    deliveryFee, 
    cartTotal,
    setIsCheckoutOpen,
    navigateTo 
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 999;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const freeDeliveryProgress = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const ok = applyCoupon(couponCode);
    if (ok) {
      setCouponCode('');
      setCouponError('');
    } else {
      setCouponError('Invalid or inapplicable coupon');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(3px)',
      zIndex: 250,
      display: 'flex',
      justifyContent: 'flex-end',
      transition: 'opacity 200ms ease'
    }}>
      {/* Drawer Container */}
      <div 
        className="animate-slide-in"
        style={{
          width: '100%',
          maxWidth: 460,
          height: '100%',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--secondary-warm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>
                Your Gift Cart
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)' }}>
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in celebration hamper
              </span>
            </div>
          </div>

          <button 
            type="button"
            onClick={() => setIsCartOpen(false)}
            style={{
              border: 'none',
              background: '#ffffff',
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <X size={18} color="var(--charcoal-dark)" />
          </button>
        </div>

        {/* Free Delivery Goal Bar */}
        <div style={{ padding: '0.75rem 1.5rem', background: '#fdf2f8', borderBottom: '1px solid #fce7f3' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--primary-dark)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Truck size={14} color="var(--primary)" />
              {remainingForFreeDelivery === 0 ? '🎉 Free Delivery Unlocked!' : `Add ₹${remainingForFreeDelivery} more for Free Delivery!`}
            </span>
            <span>{Math.round(freeDeliveryProgress)}%</span>
          </div>
          <div style={{ height: 6, background: '#fbcfe8', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${freeDeliveryProgress}%`, background: 'var(--primary)', transition: 'width 300ms ease' }} />
          </div>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
              <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'var(--secondary-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <ShoppingBag size={34} color="var(--charcoal-muted)" />
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--charcoal-dark)' }}>
                Your Cart is Empty
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--charcoal-muted)', marginBottom: '1.5rem', maxWidth: 280, margin: '0 auto 1.5rem' }}>
                Add thoughtful flowers, cakes, or personalized hampers to start celebrating.
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('shop');
                }}
              >
                Browse Gifts
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map(item => (
                <div 
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-subtle)',
                    background: '#ffffff',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                >
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    style={{
                      width: 74,
                      height: 74,
                      borderRadius: 'var(--radius-md)',
                      objectFit: 'cover',
                      flexShrink: 0
                    }} 
                  />

                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--charcoal-dark)', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.product.name}
                      </h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--charcoal-muted)', padding: 2 }}
                        title="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {/* Customization Details if any */}
                    {item.customization && (
                      <div style={{
                        marginTop: 4,
                        padding: '3px 6px',
                        background: '#fef3c7',
                        borderRadius: 4,
                        fontSize: '0.72rem',
                        color: '#92400e',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        <Sparkles size={11} />
                        <span>Engraving: "{item.customization.text || 'Customized Photo'}"</span>
                      </div>
                    )}

                    {/* Price and Quantity Stepper */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.5rem' }}>
                      <span style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        background: 'var(--secondary-warm)',
                        borderRadius: 'var(--radius-full)',
                        padding: '2px 6px',
                        border: '1px solid var(--border-subtle)'
                      }}>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}
                        >
                          <Minus size={13} color="var(--charcoal-dark)" />
                        </button>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, minWidth: 16, textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}
                        >
                          <Plus size={13} color="var(--charcoal-dark)" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Area with Coupons & Totals */}
        {cart.length > 0 && (
          <div style={{
            borderTop: '1px solid var(--border-subtle)',
            padding: '1.25rem 1.5rem',
            backgroundColor: '#ffffff'
          }}>
            {/* Promo Code Input */}
            <div style={{ marginBottom: '1rem' }}>
              {activeCoupon ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0.85rem',
                  background: 'var(--accent-emerald-light)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #c2e2d5'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                    <Check size={16} />
                    <span>Coupon <strong>{activeCoupon.code}</strong> applied</span>
                  </div>
                  <button 
                    onClick={removeCoupon}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.78rem', color: '#b91c1c', fontWeight: 700 }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: 6 }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <Tag size={15} color="var(--charcoal-muted)" style={{ position: 'absolute', top: 12, left: 10 }} />
                    <input 
                      type="text"
                      placeholder="Enter coupon (e.g. WELCOME150)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="form-input"
                      style={{ paddingLeft: '2.2rem', textTransform: 'uppercase', fontSize: '0.85rem' }}
                    />
                  </div>
                  <button type="submit" className="btn btn-secondary btn-sm" style={{ padding: '0 1rem' }}>
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.86rem', color: 'var(--charcoal-body)', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {couponDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  <span>Coupon Discount</span>
                  <span>- ₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: 'var(--accent-emerald)' }}>FREE</strong> : `₹${deliveryFee}`}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.65rem', borderTop: '1px dashed var(--border-subtle)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--primary)' }}>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button 
              className="btn btn-primary btn-block btn-lg"
              onClick={handleProceedCheckout}
              style={{ gap: '0.5rem', boxShadow: 'var(--shadow-md)' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: '0.72rem', color: 'var(--charcoal-muted)', marginTop: '0.65rem' }}>
              <ShieldCheck size={14} color="var(--accent-emerald)" />
              <span>Razorpay 256-bit Encrypted Checkout</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
