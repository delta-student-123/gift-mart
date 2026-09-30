import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  Heart, 
  CheckCircle2,
  Clock,
  MessageCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { siteConfig, generateWhatsAppOrderUrl } from '../config/siteConfig';

export const ProductDetailModal = () => {
  const { 
    selectedProduct, 
    closeProductDetail, 
    toggleWishlist, 
    isInWishlist,
    pincode,
    pincodeInfo,
    checkPincode,
    showToast
  } = useApp();

  const [pinInput, setPinInput] = useState(pincode || '');
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const defaults = {};
    if (selectedProduct?.options) {
      Object.entries(selectedProduct.options).forEach(([k, vals]) => {
        if (Array.isArray(vals) && vals.length > 0) defaults[k] = vals[0];
      });
    }
    return defaults;
  });
  const [personalizationNote, setPersonalizationNote] = useState('');

  if (!selectedProduct) return null;

  const isFavorited = isInWishlist(selectedProduct.id);
  const discountPercent = selectedProduct.originalPrice 
    ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100) 
    : 0;

  const handleOrderWhatsApp = () => {
    const url = generateWhatsAppOrderUrl({
      product: selectedProduct,
      selectedOptions,
      personalizationNote,
      currentUrl: typeof window !== 'undefined' ? window.location.href : ''
    });
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Opening WhatsApp with your selected product details...');
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '2.5rem', alignItems: 'flex-start' }} className="product-modal-grid">
            
            {/* Left Image Area */}
            <div>
              <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', position: 'relative', width: '100%', paddingTop: '100%', boxShadow: 'var(--shadow-md)' }}>
                <img 
                  src={selectedProduct.image || (selectedProduct.images && selectedProduct.images[0])} 
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
                <div style={{ background: '#F9FAFB', padding: '0.65rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.76rem', color: '#4B5563' }}>
                  <ShieldCheck size={16} color="#16A34A" />
                  <span>100% Quality Assured</span>
                </div>
                <div style={{ background: '#F9FAFB', padding: '0.65rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.76rem', color: '#4B5563' }}>
                  <Truck size={16} color="#2563EB" />
                  <span>Pan-India Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Details Area */}
            <div>
              {/* Category & Rating */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {selectedProduct.category}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#FFF9F0', border: '1px solid #F4EBDD', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                  <Star size={12} fill="rgb(217, 119, 6)" color="rgb(217, 119, 6)" />
                  <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#171717' }}>{selectedProduct.rating || '4.9'}</span>
                </div>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#171717', lineHeight: 1.25, marginBottom: '0.65rem' }}>
                {selectedProduct.name}
              </h2>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.65rem', fontWeight: 900, color: '#171717' }}>
                  ₹{selectedProduct.price?.toLocaleString('en-IN')}
                </span>
                {selectedProduct.originalPrice && (
                  <span style={{ fontSize: '0.95rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span style={{ fontSize: '0.76rem', color: '#16A34A', fontWeight: 700 }}>
                  Inclusive of all taxes
                </span>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.86rem', color: '#525252', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                {selectedProduct.description}
              </p>

              {/* Dynamic Option Selectors (Size, Flavour, Colour, etc.) */}
              {selectedProduct.options && Object.entries(selectedProduct.options).map(([optKey, optValues]) => (
                <div key={optKey} style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: '0.4rem', textTransform: 'capitalize' }}>
                    Select {optKey}:
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {optValues.map(val => {
                      const isSel = selectedOptions[optKey] === val;
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setSelectedOptions(prev => ({ ...prev, [optKey]: val }))}
                          style={{
                            padding: '0.35rem 0.8rem',
                            borderRadius: '9999px',
                            border: isSel ? '1.5px solid rgb(217, 119, 6)' : '1px solid #E5E7EB',
                            background: isSel ? '#FFF8E7' : '#ffffff',
                            color: isSel ? '#171717' : '#525252',
                            fontWeight: isSel ? 800 : 500,
                            fontSize: '0.78rem',
                            cursor: 'pointer'
                          }}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Personalization Note Field */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#171717', display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.35rem' }}>
                  <Sparkles size={14} color="#D97706" />
                  <span>Personalization Note / Custom Name / Message:</span>
                </label>
                <textarea
                  rows={2}
                  className="form-textarea"
                  placeholder="e.g. Laser engrave 'Amit & Pooja' / Card message: 'Happy 25th Anniversary!'"
                  value={personalizationNote}
                  onChange={(e) => setPersonalizationNote(e.target.value)}
                  style={{ borderRadius: '10px', padding: '0.55rem 0.85rem', fontSize: '0.84rem' }}
                />
              </div>

              {/* Delivery info */}
              <div style={{
                background: '#FFFDF9',
                border: '1px solid #F3ECE1',
                borderRadius: '12px',
                padding: '0.75rem 0.95rem',
                marginBottom: '1.5rem',
                fontSize: '0.8rem',
                color: '#525252',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <Clock size={16} color="#D97706" style={{ flexShrink: 0 }} />
                <span>
                  Same-day express in metro hubs • 24–48 hours pan-India delivery with live tracking.
                </span>
              </div>

              {/* Actions: Prominent Order on WhatsApp */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => toggleWishlist(selectedProduct)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '14px',
                    padding: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Wishlist"
                >
                  <Heart size={20} color={isFavorited ? '#DC2626' : '#6B7280'} fill={isFavorited ? '#DC2626' : 'none'} />
                </button>

                <button
                  type="button"
                  onClick={handleOrderWhatsApp}
                  style={{
                    flex: 1,
                    background: '#25D366',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '0.85rem 1.25rem',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(37, 211, 102, 0.35)',
                    transition: 'all 150ms ease'
                  }}
                >
                  <MessageCircle size={18} />
                  <span>Order on WhatsApp</span>
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-modal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
