import React from 'react';
import { Heart, Star, Sparkles, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateWhatsAppOrderUrl } from '../config/siteConfig';

export const ProductCard = ({ product, compact = false, imageHeight }) => {
  const { 
    toggleWishlist, 
    isInWishlist, 
    openProductDetail 
  } = useApp();

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    if (product.options || product.isPersonalizable) {
      // Open detail view so user can choose size/flavour/color and add custom name
      openProductDetail(product);
    } else {
      const url = generateWhatsAppOrderUrl({ product });
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className={`card product-card ${compact ? 'product-card-compact' : ''}`}
      onClick={() => openProductDetail(product)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        height: '100%',
        position: 'relative',
        background: '#ffffff',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        e.currentTarget.style.borderColor = 'var(--secondary-border)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
      }}
    >
      {/* Top Image Container */}
      <div 
        className="product-card-image-container"
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: imageHeight || (compact ? 175 : 220), 
          overflow: 'hidden', 
          backgroundColor: '#f9f9f8',
          margin: 0,
          padding: 0
        }}
      >
        <img 
          className="product-card-image"
          src={product.image || (product.images && product.images[0])} 
          alt={product.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: product.imagePosition || 'center center',
            display: 'block',
            margin: 0,
            padding: 0,
            transition: 'transform 400ms ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Badges Over Image */}
        <div 
          className="product-card-overlay-badge"
          style={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 5, zIndex: 2 }}
        >
          {discountPercent > 0 && (
            <span style={{
              background: '#dc2626',
              color: '#ffffff',
              padding: '2px 7px',
              borderRadius: '9999px',
              fontSize: '0.64rem',
              fontWeight: 800,
              letterSpacing: '0.02em',
              boxShadow: '0 2px 4px rgba(220, 38, 38, 0.25)',
              alignSelf: 'flex-start',
              whiteSpace: 'nowrap'
            }}>
              {discountPercent}% OFF
            </span>
          )}

          {product.tags && product.tags[0] && (
            <span style={{
              background: 'rgba(23, 23, 23, 0.92)',
              backdropFilter: 'blur(4px)',
              color: 'rgb(217, 119, 6)',
              padding: '2px 7px',
              borderRadius: '9999px',
              fontSize: '0.65rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 3,
              alignSelf: 'flex-start',
              whiteSpace: 'nowrap'
            }}>
              ✨ {product.tags[0]}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button 
          type="button"
          className="product-card-overlay-wishlist"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label="Wishlist"
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 3,
            boxShadow: 'var(--shadow-sm)',
            transition: 'transform 150ms ease, background 150ms ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Heart 
            size={16} 
            color={isFavorited ? '#DC2626' : 'var(--charcoal-muted)'} 
            fill={isFavorited ? '#DC2626' : 'transparent'} 
          />
        </button>
      </div>

      {/* Product Content Details */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Rating and Reviews */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#FFF9F0', border: '1px solid #F4EBDD', padding: '2px 7px', borderRadius: 'var(--radius-full)' }}>
            <Star size={12} fill="rgb(217, 119, 6)" color="rgb(217, 119, 6)" />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#171717' }}>
              {product.rating || '4.9'}
            </span>
          </div>
          <span style={{ fontSize: '0.73rem', color: 'var(--charcoal-muted)' }}>
            ({product.reviewCount || 120} reviews)
          </span>
        </div>

        {/* Title */}
        <h4 style={{ 
          fontSize: '0.94rem', 
          fontWeight: 700, 
          color: 'var(--charcoal-dark)', 
          lineHeight: 1.35, 
          marginBottom: '0.65rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '2.5rem'
        }}>
          {product.name}
        </h4>

        {/* Price & Action Button */}
        <div style={{ marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: '1.18rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '0.82rem', color: 'var(--charcoal-muted)', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          <button 
            type="button"
            onClick={handleWhatsAppClick}
            style={{
              background: '#25D366',
              color: '#ffffff',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.42rem 0.85rem',
              fontSize: '0.78rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(37, 211, 102, 0.25)',
              transition: 'all 150ms ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <MessageCircle size={14} />
            <span>Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};
