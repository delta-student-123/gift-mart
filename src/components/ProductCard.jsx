import React from 'react';
import { Heart, Star, Zap, Sparkles, ShoppingBag, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductCard = ({ product, compact = false, imageHeight }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    openProductDetail, 
    openPersonalizer 
  } = useApp();

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleActionClick = (e) => {
    e.stopPropagation();
    if (product.isPersonalizable) {
      openPersonalizer(product);
    } else {
      addToCart(product);
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
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: imageHeight || (compact ? 165 : 210), 
        overflow: 'hidden', 
        backgroundColor: '#f9f9f8' 
      }}>
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: product.imagePosition || 'center center',
            transition: 'transform 400ms ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Badges Over Image (Giftana Style) */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 5, zIndex: 2 }}>
          {discountPercent > 0 && (
            <span style={{
              background: '#f42b23',
              color: '#ffffff',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 800,
              boxShadow: '0 2px 6px rgba(244, 43, 35, 0.35)'
            }}>
              {discountPercent}% OFF
            </span>
          )}

          {product.tag && (
            <span style={{
              background: 'rgba(23, 23, 23, 0.92)',
              backdropFilter: 'blur(4px)',
              color: '#F5A800',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.68rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 3
            }}>
              ✨ {product.tag}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button 
          type="button"
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
            color={isFavorited ? 'var(--primary)' : 'var(--charcoal-muted)'} 
            fill={isFavorited ? 'var(--primary)' : 'transparent'} 
          />
        </button>
      </div>

      {/* Product Content Details */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Rating and Reviews */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#FFF9F0', border: '1px solid #F4EBDD', padding: '2px 7px', borderRadius: 'var(--radius-full)' }}>
            <Star size={12} fill="#F5A800" color="#F5A800" />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#171717' }}>
              {product.rating}
            </span>
          </div>
          <span style={{ fontSize: '0.73rem', color: 'var(--charcoal-muted)' }}>
            ({product.reviewCount} reviews)
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
            className={`btn btn-sm ${product.isPersonalizable ? 'btn-gold' : 'btn-primary'}`}
            onClick={handleActionClick}
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.82rem',
              gap: 4
            }}
          >
            {product.isPersonalizable ? (
              <>
                <Sparkles size={13} />
                <span>Personalize</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
