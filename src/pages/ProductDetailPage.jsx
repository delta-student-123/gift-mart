import React, { useState } from 'react';
import { 
  Star, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  Heart, 
  Clock, 
  CheckCircle2, 
  Share2, 
  ChevronRight, 
  MessageCircle,
  Package,
  RotateCcw,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { siteConfig, generateWhatsAppOrderUrl } from '../config/siteConfig';

export const ProductDetailPage = ({ product }) => {
  const { 
    productsList, 
    toggleWishlist, 
    isInWishlist, 
    pincode, 
    pincodeInfo, 
    checkPincode, 
    navigateTo,
    showToast
  } = useApp();

  const [activeImage, setActiveImage] = useState(
    product?.image || (product?.images && product?.images[0])
  );
  const [pinInput, setPinInput] = useState(pincode || '');
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const defaults = {};
    if (product?.options) {
      Object.entries(product.options).forEach(([k, vals]) => {
        if (Array.isArray(vals) && vals.length > 0) defaults[k] = vals[0];
      });
    }
    return defaults;
  });
  const [personalizationNote, setPersonalizationNote] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <h2>Product not found</h2>
        <button className="btn btn-primary" onClick={() => navigateTo('shop')} style={{ marginTop: '1rem' }}>
          Back to Catalog
        </button>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleOrderWhatsApp = () => {
    const url = generateWhatsAppOrderUrl({
      product,
      selectedOptions,
      personalizationNote,
      currentUrl: typeof window !== 'undefined' ? window.location.href : ''
    });
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Opening WhatsApp with your order brief...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Step IN Gift Mart!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  const galleryImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  const relatedProducts = productsList.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div style={{ backgroundColor: '#FCFBF9', minHeight: '85vh', padding: '1.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: 1140 }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.84rem', color: 'var(--charcoal-muted)', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer', color: 'var(--charcoal-dark)', fontWeight: 600 }}>Home</span>
          <ChevronRight size={14} />
          <span onClick={() => navigateTo('shop')} style={{ cursor: 'pointer', color: 'var(--charcoal-dark)', fontWeight: 600 }}>Catalog</span>
          <ChevronRight size={14} />
          <span onClick={() => navigateTo('shop', { category: product.category })} style={{ cursor: 'pointer', textTransform: 'capitalize' }}>{product.category}</span>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--primary)', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>{product.name}</span>
        </div>

        {/* Main Product Layout: Gallery (Left) + Order Controls (Right) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: '3rem', alignItems: 'flex-start', marginBottom: '4rem' }} className="product-detail-grid">
          
          {/* LEFT: Image Gallery with Thumbnail Strip */}
          <div>
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              width: '100%',
              paddingTop: '95%',
              background: product.cardBg || '#ffffff',
              border: '1px solid #EFEAE2',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)'
            }}>
              <img 
                src={activeImage || product.image} 
                alt={product.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />

              {discountPercent > 0 && (
                <span style={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  background: '#dc2626',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  boxShadow: '0 2px 6px rgba(220, 38, 38, 0.25)'
                }}>
                  {discountPercent}% OFF
                </span>
              )}

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <Heart size={20} color={isFavorited ? '#DC2626' : '#171717'} fill={isFavorited ? '#DC2626' : 'none'} />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            {galleryImages.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                {galleryImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: '14px',
                      overflow: 'hidden',
                      border: activeImage === imgUrl ? '2px solid rgb(217, 119, 6)' : '1px solid #E5E7EB',
                      cursor: 'pointer'
                    }}
                  >
                    <img src={imgUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                ))}
              </div>
            )}

            {/* Quality & Trust Badges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginTop: '2rem',
              padding: '1.25rem',
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #EFEAE2',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <ShieldCheck size={22} color="#16A34A" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#171717' }}>100% Quality</div>
                <div style={{ fontSize: '0.72rem', color: '#737373' }}>Artisanal finish</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Clock size={22} color="#D97706" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#171717' }}>On-Time Slot</div>
                <div style={{ fontSize: '0.72rem', color: '#737373' }}>Guaranteed dispatch</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Truck size={22} color="#2563EB" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#171717' }}>Safe Courier</div>
                <div style={{ fontSize: '0.72rem', color: '#737373' }}>Zero breakage</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Info & Order Controls */}
          <div>
            {/* Category tag & ratings */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
              <span style={{
                background: '#FFF2D6',
                color: '#92400E',
                fontSize: '0.74rem',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                {product.category}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#fef3c7', padding: '3px 8px', borderRadius: '9999px' }}>
                  <Star size={13} fill="#d97706" color="#d97706" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#92400e' }}>{product.rating || '4.9'}</span>
                </div>
                <span style={{ fontSize: '0.82rem', color: '#737373' }}>({product.reviewCount || 120} reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#171717', lineHeight: 1.25, marginBottom: '0.85rem' }}>
              {product.name}
            </h1>

            {/* Price section */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid #EFEAE2' }}>
              <span style={{ fontSize: '2.1rem', fontWeight: 900, color: '#171717' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.15rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span style={{ fontSize: '0.84rem', color: '#16A34A', fontWeight: 700 }}>
                Inclusive of all taxes
              </span>
            </div>

            {/* Brief Description */}
            <p style={{ fontSize: '0.94rem', color: '#525252', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {product.description}
            </p>

            {/* Dynamic Option Selectors (Size/Flavour/Colour) */}
            {product.options && Object.entries(product.options).map(([optKey, optValues]) => (
              <div key={optKey} style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#171717', display: 'block', marginBottom: '0.45rem', textTransform: 'capitalize' }}>
                  Choose {optKey}:
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {optValues.map(val => {
                    const isSel = selectedOptions[optKey] === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [optKey]: val }))}
                        style={{
                          padding: '0.45rem 0.95rem',
                          borderRadius: '9999px',
                          border: isSel ? '2px solid rgb(217, 119, 6)' : '1px solid #E5E7EB',
                          background: isSel ? '#FFF8E7' : '#ffffff',
                          color: isSel ? '#171717' : '#525252',
                          fontWeight: isSel ? 800 : 500,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          transition: 'all 150ms ease'
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
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#171717', display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.45rem' }}>
                <Sparkles size={14} color="#D97706" />
                <span>Personalization Note / Custom Name / Card Message:</span>
              </label>
              <textarea
                rows={2}
                className="form-textarea"
                placeholder="e.g. Laser engrave 'Amit & Pooja' / Card message: 'Happy 25th Anniversary!'"
                value={personalizationNote}
                onChange={(e) => setPersonalizationNote(e.target.value)}
                style={{ borderRadius: '12px', padding: '0.65rem 0.95rem', fontSize: '0.88rem' }}
              />
            </div>

            {/* Pincode & Delivery Availability Checker */}
            <div style={{
              background: '#ffffff',
              padding: '1.15rem',
              borderRadius: '16px',
              border: '1px solid #EFEAE2',
              marginBottom: '1.75rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <MapPin size={15} color="#D97706" />
                  <span>Delivery Availability:</span>
                </span>
                <span style={{ fontSize: '0.78rem', color: '#737373' }}>
                  Current PIN: <strong>{pincode}</strong>
                </span>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                  className="form-input"
                  style={{ padding: '0.55rem 0.85rem', fontSize: '0.88rem', borderRadius: '10px' }}
                />
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => checkPincode(pinInput)}
                  style={{ padding: '0.55rem 1.15rem' }}
                >
                  Verify
                </button>
              </div>

              {pincodeInfo && (
                <div style={{ fontSize: '0.82rem', color: '#16A34A', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}>
                  <CheckCircle2 size={15} color="#16A34A" />
                  <span>Serviceable for {pincodeInfo.city}! Express doorstep delivery ready.</span>
                </div>
              )}
            </div>

            {/* PROMINENT ORDER ON WHATSAPP BUTTON */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
              <button
                type="button"
                onClick={handleOrderWhatsApp}
                style={{
                  width: '100%',
                  background: '#25D366',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '1rem 1.5rem',
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
                  transition: 'all 160ms ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <MessageCircle size={22} />
                <span>Order on WhatsApp (Instant Response)</span>
              </button>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={handleShare}
                  style={{
                    flex: 1,
                    background: '#ffffff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    padding: '0.65rem 1rem',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    color: '#374151',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    cursor: 'pointer'
                  }}
                >
                  <Share2 size={15} />
                  <span>Share Product</span>
                </button>
              </div>
            </div>

            {/* Stock indicator */}
            <div style={{ fontSize: '0.82rem', color: '#16A34A', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#16A34A' }} />
              <span>In Stock • Direct 1-on-1 WhatsApp confirmation & live photo proof</span>
            </div>

          </div>
        </div>

        {/* Detailed Tabs: Description, Care, Delivery */}
        <div style={{ borderTop: '1px solid #EFEAE2', paddingTop: '2.5rem', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid #EFEAE2', marginBottom: '1.5rem', overflowX: 'auto' }}>
            {[
              { id: 'description', label: 'Product Description' },
              { id: 'specs', label: 'Specifications & Care' },
              { id: 'delivery', label: 'Delivery & Ordering on WhatsApp' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  fontSize: '0.94rem',
                  fontWeight: 800,
                  color: activeTab === tab.id ? 'rgb(217, 119, 6)' : '#737373',
                  borderBottom: activeTab === tab.id ? '3px solid rgb(217, 119, 6)' : '3px solid transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #EFEAE2', padding: '2rem' }}>
            {activeTab === 'description' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#171717', marginBottom: '0.75rem' }}>
                  About {product.name}
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#525252', lineHeight: 1.65, margin: '0 0 1rem' }}>
                  {product.description}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', marginTop: '1.25rem' }}>
                  {['Free customized message greeting card', 'High-grade protective packaging', 'Doorstep delivery with direct WhatsApp support'].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.85rem', color: '#374151' }}>
                      <Check size={16} color="#16A34A" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#171717', marginBottom: '0.75rem' }}>
                  Care Instructions & Quality Assurance
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#525252', lineHeight: 1.65 }}>
                  Store in cool, dry conditions. For personalized drinkware and acrylic products, clean gently with a soft microfiber cloth. Avoid harsh abrasive scrubbers to keep laser engraving pristine for years.
                </p>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#171717', marginBottom: '0.75rem' }}>
                  How WhatsApp Ordering Works
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#525252', lineHeight: 1.65 }}>
                  When you tap "Order on WhatsApp", your exact selection, size/flavor choices, and custom engraving note are pre-filled in your chat. Our specialist will confirm your delivery slot and provide payment links (UPI, GPay, Cards, NetBanking).
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#171717', margin: 0 }}>
                You May Also Like
              </h2>
              <span onClick={() => navigateTo('shop', { category: product.category })} style={{ color: 'rgb(217, 119, 6)', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}>
                View All in {product.category} →
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 860px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
