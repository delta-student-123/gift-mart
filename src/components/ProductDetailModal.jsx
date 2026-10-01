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
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedProduct) return null;

  const productImages = (selectedProduct.images && selectedProduct.images.length > 0)
    ? selectedProduct.images
    : [selectedProduct.image];
  const currentImage = productImages[activeImageIndex] || selectedProduct.image;

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
            top: 14,
            right: 14,
            zIndex: 30,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
            transition: 'transform 120ms ease, background 120ms ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.background = '#f3f4f6'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)'; }}
          title="Close"
        >
          <X size={18} color="var(--charcoal-dark)" />
        </button>

        {/* Modal Scrollable Container */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '2.5rem', alignItems: 'flex-start' }} className="product-modal-grid">
            
            {/* Left Image Area */}
            <div>
              <div style={{ 
                borderRadius: 'var(--radius-xl)', 
                overflow: 'hidden', 
                position: 'relative', 
                width: '100%', 
                paddingTop: '100%', 
                boxShadow: 'var(--shadow-md)',
                backgroundColor: selectedProduct.cardBg || '#f8f8f7'
              }}>
                <img 
                  src={currentImage} 
                  alt={selectedProduct.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: selectedProduct.objectFit || 'cover'
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

              {/* Multiple Images Gallery Selector */}
              {productImages.length > 1 && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', justifyContent: 'center' }}>
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 'var(--radius-md)',
                        border: activeImageIndex === idx ? '2px solid var(--primary, #D97706)' : '1px solid var(--border-subtle, #e5e7eb)',
                        padding: 3,
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        boxShadow: activeImageIndex === idx ? '0 0 0 2px rgba(217, 119, 6, 0.2)' : 'none',
                        transition: 'border-color 150ms ease, transform 150ms ease'
                      }}
                    >
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </button>
                  ))}
                </div>
              )}

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
            <div style={{ minWidth: 0 }}>
              {/* Category, Rating & Tag Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap', paddingRight: '2.5rem' }}>
                <span style={{ 
                  fontSize: '0.72rem', 
                  fontWeight: 800, 
                  color: '#92400E', 
                  backgroundColor: '#FEF3C7',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  textTransform: 'uppercase', 
                  letterSpacing: '0.04em' 
                }}>
                  {selectedProduct.category?.replace('-', ' ')}
                </span>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#FFFDF0', border: '1px solid #FDE68A', padding: '2px 8px', borderRadius: '9999px' }}>
                  <Star size={12} fill="#D97706" color="#D97706" />
                  <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#171717' }}>{selectedProduct.rating || '4.9'}</span>
                  {selectedProduct.reviewCount && (
                    <span style={{ fontSize: '0.72rem', color: '#78716C' }}>({selectedProduct.reviewCount})</span>
                  )}
                </div>

                {selectedProduct.tag && (
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#047857', background: '#D1FAE5', padding: '2px 9px', borderRadius: '9999px' }}>
                    {selectedProduct.tag}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#171717', lineHeight: 1.3, marginBottom: '0.75rem', paddingRight: '2rem' }}>
                {selectedProduct.name}
              </h2>

              {/* Price & Tax Strip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.65rem', fontWeight: 900, color: '#171717' }}>
                  ₹{selectedProduct.price?.toLocaleString('en-IN')}
                </span>
                {selectedProduct.originalPrice && (
                  <span style={{ fontSize: '0.98rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: '#DC2626',
                    backgroundColor: '#FEE2E2',
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}>
                    {discountPercent}% OFF
                  </span>
                )}
                <span style={{ fontSize: '0.78rem', color: '#16A34A', fontWeight: 700, marginLeft: 'auto' }}>
                  ✓ Inclusive of all taxes
                </span>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '1.25rem' }}>
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
                            padding: '0.38rem 0.85rem',
                            borderRadius: '9999px',
                            border: isSel ? '1.5px solid rgb(217, 119, 6)' : '1px solid #E5E7EB',
                            background: isSel ? '#FFF8E7' : '#ffffff',
                            color: isSel ? '#171717' : '#4B5563',
                            fontWeight: isSel ? 800 : 500,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            transition: 'all 120ms ease'
                          }}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}


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
