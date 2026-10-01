import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CATEGORIES, 
  OCCASIONS, 
  PRODUCTS 
} from '../data/products';
import { 
  Sparkles, 
  Gift, 
  ArrowRight, 
  Heart, 
  Star, 
  ShieldCheck, 
  Truck, 
  Zap, 
  Check,
  ChevronRight, 
  Grid,
  Award,
  Users,
  Clock,
  Package,
  Edit3,
  HeartHandshake,
  MessageCircle
} from 'lucide-react';
import { generateWhatsAppOrderUrl } from '../config/siteConfig';

export const HomePage = () => {
  const { 
    navigateTo, 
    openPersonalizer,
    openProductDetail,
    addToCart,
    wishlist,
    toggleWishlist,
    showToast 
  } = useApp();

  // Best Selling Gifts Tab Filter State
  const [activeTab, setActiveTab] = useState('popular'); // 'popular' | 'new' | 'bestsellers'

  // 1. Categories for "Shop by Category" (Round Circular Items)
  const CATEGORY_ITEMS = [
    { id: 'chocolates', name: 'Chocolates', image: '/images/chocolate_balloons_combo.jpg' },
    { id: 'flowers', name: 'Flowers', image: '/images/gold_rose.jpg' },
    { id: 'hampers', name: 'Hampers', image: '/images/luxury_hamper.jpg' },
    { id: 'bottles', name: 'Bottles', image: '/images/drinkware_flask.jpg' },
    { id: 'wallets', name: 'Wallets', image: '/images/luxury_wallet_category.jpg' },
    { id: 'lamps', name: 'Lamps', image: '/images/crystal_heart_lamp.jpg' },
    { id: 'all', name: 'Teddy Bears', image: '/images/category_teddy_bear.jpg' },
    { id: 'religious-idols', name: 'Religious Idol', image: '/images/religious_idol.jpg' },
    { id: 'more', name: 'More', isMore: true }
  ];

  // 2. 5 Featured Products for "Best Selling Gifts"
  const BEST_SELLING_PRODUCTS = [
    {
      id: 'prod-choc-1',
      name: 'Chocolates & Balloons Combo',
      price: 1299,
      rating: 4.9,
      reviews: 150,
      image: '/images/chocolate_balloons_combo.jpg',
      category: 'chocolates',
      tabCategory: ['popular', 'bestsellers']
    },
    {
      id: 'prod-1',
      name: 'Divine White Ganesha Murti',
      price: 899,
      rating: 4.9,
      reviews: 142,
      image: '/images/ganesha_murti.png',
      category: 'religious-idols',
      tabCategory: ['popular', 'new', 'bestsellers']
    },
    {
      id: 'prod-hamper-1',
      name: 'Premium Gift Hamper',
      price: 2499,
      rating: 4.9,
      reviews: 184,
      image: '/images/luxury_hamper.jpg',
      category: 'hampers',
      tabCategory: ['popular', 'bestsellers']
    },
    {
      id: 'prod-bottle-1',
      name: 'Smart Bottle',
      price: 1099,
      rating: 4.8,
      reviews: 67,
      image: '/images/drinkware_flask.jpg',
      category: 'bottles',
      tabCategory: ['popular', 'new', 'bestsellers']
    },
    {
      id: 'prod-lamp-crystal-ball-heart',
      name: 'Lamp',
      price: 649,
      rating: 4.9,
      reviews: 260,
      image: '/images/crystal_heart_lamp.jpg',
      category: 'lamps',
      tabCategory: ['popular', 'new', 'bestsellers']
    }
  ];

  // Filtered by active tab
  const displayedProducts = BEST_SELLING_PRODUCTS.filter(p => 
    activeTab === 'popular' || p.tabCategory.includes(activeTab)
  );

  // 3. Testimonials for "What Our Customers Say"
  const TESTIMONIAL_CARDS = [
    {
      id: 1,
      quote: "Absolutely loved the quality and packaging! The cake was fresh and delicious. Will definitely order again!",
      name: "Sneha Verma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      quote: "Great collection and very good customer service. My corporate gifts arrived on time and looked premium.",
      name: "Rohit Sharma",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      quote: "The personalized gift was beyond my expectations. Beautifully crafted and delivered on time!",
      name: "Priya Nair",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <div className="homepage-content" style={{ backgroundColor: '#FFFFFF', color: '#171717' }}>

      {/* ========================================================
          1. HERO LANDING BANNER (Compact & Balanced Layout)
      ======================================================== */}
      <section 
        className="hero-landing-banner"
        style={{ 
          position: 'relative', 
          overflow: 'hidden', 
          minHeight: '430px',
          display: 'flex',
          alignItems: 'center',
          padding: '2.5rem 0',
          borderBottom: '1px solid #EFE6D8'
        }}
      >
        {/* Scaled Background Image Layer */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/hero_landing_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          transform: 'scale(1.08)',
          transformOrigin: 'right center',
          zIndex: 0
        }} />

        {/* Soft luminous gradient wash on the left to ensure crisp text readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(255, 253, 248, 0.96) 0%, rgba(255, 253, 248, 0.90) 42%, rgba(255, 253, 248, 0.3) 65%, transparent 85%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Floating "Perfect for Every Occasion ♡" script badge */}
        <div 
          className="hero-badge-floating"
          style={{
            position: 'absolute',
            top: '32px',
            right: '9%',
            zIndex: 3,
            textAlign: 'center',
            pointerEvents: 'none'
          }}
        >
          <div style={{
            fontFamily: "'Dancing Script', 'Caveat', cursive, sans-serif",
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#B45309',
            lineHeight: 1.1,
            textShadow: '0 1px 3px rgba(255,255,255,0.9)'
          }}>
            Perfect for <br />
            Every Occasion ♡
          </div>
        </div>

        {/* Left Content Area inside container */}
        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{ maxWidth: '580px' }}>
            {/* Pill Badge Tag */}
            <div 
              style={{ 
                background: '#FFF2D6', 
                color: '#92400E', 
                border: '1px solid rgba(217, 119, 6, 0.28)', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.4rem', 
                padding: '0.22rem 0.75rem', 
                borderRadius: '9999px', 
                fontWeight: 800, 
                fontSize: '0.68rem', 
                letterSpacing: '0.04em',
                marginBottom: '0.55rem',
                boxShadow: '0 2px 5px rgba(217, 119, 6, 0.08)'
              }}
            >
              <span>🎁 PERSONALIZED GIFTS FOR EVERY OCCASION</span>
            </div>

            {/* Slide Title */}
            <h1 
              style={{ 
                fontSize: 'clamp(1.65rem, 2.7vw, 2.35rem)', 
                fontWeight: 800, 
                color: '#111827', 
                lineHeight: 1.18, 
                letterSpacing: '-0.025em', 
                marginBottom: '0.45rem'
              }}
            >
              Thoughtful Gifts <br />
              <span style={{ color: 'rgb(217, 119, 6)' }}>for Every Moment</span>
            </h1>

            {/* Subtitle */}
            <p 
              style={{ 
                fontSize: '0.86rem', 
                color: '#4B5563', 
                lineHeight: 1.5, 
                marginBottom: '0.9rem', 
                maxWidth: '500px'
              }}
            >
              From birthdays to corporate events, find the perfect gift that speaks your feelings.
            </p>

            {/* 4 Feature Badges Row (Tightly arranged in a single line) */}
            <div 
              style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                alignItems: 'center', 
                gap: '0.85rem', 
                marginBottom: '1.15rem' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.76rem', fontWeight: 600, color: '#374151' }}>
                <span style={{ color: 'rgb(217, 119, 6)' }}>🎁</span>
                <span>Premium Quality</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.76rem', fontWeight: 600, color: '#374151' }}>
                <span style={{ color: 'rgb(217, 119, 6)' }}>🚚</span>
                <span>Pan-India Delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.76rem', fontWeight: 600, color: '#374151' }}>
                <span style={{ color: 'rgb(217, 119, 6)' }}>🛡️</span>
                <span>Secure Payments</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.76rem', fontWeight: 600, color: '#374151' }}>
                <span style={{ color: 'rgb(217, 119, 6)' }}>⭐</span>
                <span>Customization Available</span>
              </div>
            </div>

            {/* 2 CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <button 
                onClick={() => navigateTo('shop')}
                style={{ 
                  background: 'rgb(217, 119, 6)', 
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.58rem 1.45rem', 
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  cursor: 'pointer',
                  boxShadow: '0 3px 12px rgba(217, 119, 6, 0.35)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(217, 119, 6, 0.45)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 3px 12px rgba(217, 119, 6, 0.35)';
                }}
              >
                <span>Shop Now</span>
                <ArrowRight size={14} />
              </button>

              <button 
                onClick={() => navigateTo('occasions')}
                style={{ 
                  background: '#FFFFFF',
                  color: '#1F2937',
                  border: '1.5px solid #E5E7EB',
                  padding: '0.58rem 1.35rem', 
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#D1D5DB';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Explore Occasions</span>
              </button>
            </div>

          </div>
        </div>
      </section>



      {/* ========================================================
          2. SHOP BY CATEGORY (Circular Icons Row)
      ======================================================== */}
      <section style={{ padding: '3.5rem 0 2.5rem', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', margin: 0, marginBottom: '0.35rem' }}>
                Shop by Category
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#6B7280', margin: 0 }}>
                Discover gifts for every mood, every relationship, every celebration.
              </p>
            </div>

            <button
              onClick={() => navigateTo('shop')}
              style={{
                background: 'none',
                border: 'none',
                color: '#D97706',
                fontWeight: 700,
                fontSize: '0.88rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                cursor: 'pointer'
              }}
            >
              <span>View All Categories</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 9 Circular Category Items */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {CATEGORY_ITEMS.map((cat, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  if (cat.id === 'more') navigateTo('shop');
                  else navigateTo('shop', { category: cat.id });
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  width: 82,
                  height: 82,
                  borderRadius: '50%',
                  background: '#FFF9ED',
                  border: '1.5px solid #F3EBDD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  marginBottom: '0.65rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                }}>
                  {cat.isMore ? (
                    <Grid size={28} color="#D97706" />
                  ) : (
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1F2937' }}>
                  {cat.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================
          3. BEST SELLING GIFTS (Product Cards with Filter Tabs)
      ======================================================== */}
      <section style={{ padding: '3rem 0 3.5rem', backgroundColor: '#FAFAFA', borderTop: '1px solid #F3F4F6' }}>
        <div className="container">
          
          {/* Section Header & Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2.25rem' }}>
            <div>
              <div 
                style={{ 
                  background: '#FFF2D6', 
                  color: '#92400E', 
                  border: '1px solid rgba(217, 119, 6, 0.28)', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.35rem', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '9999px', 
                  fontWeight: 800, 
                  fontSize: '0.7rem', 
                  letterSpacing: '0.04em',
                  marginBottom: '0.5rem' 
                }}
              >
                <span>★ FEATURED COLLECTION</span>
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', margin: 0, marginBottom: '0.35rem' }}>
                Best Selling Gifts
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#6B7280', margin: 0 }}>
                Loved by Thousands, these are our top picks!
              </p>
            </div>

            {/* Filter Pill Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[
                { id: 'popular', label: 'Popular' },
                { id: 'new', label: 'New Arrivals' },
                { id: 'bestsellers', label: 'Best Sellers' }
              ].map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      background: isActive ? '#171717' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#4B5563',
                      border: isActive ? '1px solid #171717' : '1px solid #E5E7EB',
                      padding: '0.45rem 1.15rem',
                      borderRadius: '9999px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5 Product Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1.25rem'
          }}>
            {displayedProducts.map(prod => {
              const isFav = wishlist.includes(prod.id);
              return (
                <div 
                  key={prod.id}
                  onClick={() => openProductDetail(prod)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #EFE6D8',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.03)';
                  }}
                >
                  {/* Image with Heart Icon on top right */}
                  <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden', backgroundColor: '#F9FAFB', margin: 0, padding: 0 }}>
                    <img 
                      src={prod.image} 
                      alt={prod.name}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        display: 'block',
                        margin: 0,
                        padding: 0,
                        transition: 'transform 400ms ease'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />

                    {/* Wishlist Heart Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod);
                      }}
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                        zIndex: 2
                      }}
                      title={isFav ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart 
                        size={16} 
                        color={isFav ? "#EF4444" : "#9CA3AF"} 
                        fill={isFav ? "#EF4444" : "none"} 
                      />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div style={{ padding: '0.9rem 1rem 1rem 1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3 
                      title={prod.name}
                      style={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.88rem', 
                        fontWeight: 600, 
                        color: '#111827', 
                        margin: 0, 
                        marginBottom: '0.35rem', 
                        lineHeight: 1.3,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {prod.name}
                    </h3>

                    <div style={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1.05rem', 
                      fontWeight: 700, 
                      color: '#111827', 
                      margin: 0,
                      marginBottom: '0.3rem',
                      lineHeight: 1.2
                    }}>
                      ₹{prod.price.toLocaleString('en-IN')}
                    </div>

                    {/* Rating */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.35rem', 
                      fontSize: '0.78rem', 
                      color: '#6B7280', 
                      marginBottom: '0.85rem',
                      lineHeight: 1
                    }}>
                      <Star size={13} color="rgb(217, 119, 6)" fill="rgb(217, 119, 6)" />
                      <span style={{ fontWeight: 700, color: '#111827' }}>{prod.rating}</span>
                      <span style={{ color: '#9CA3AF' }}>({prod.reviews})</span>
                    </div>

                    {/* WhatsApp Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const url = generateWhatsAppOrderUrl({ product: prod });
                        window.open(url, '_blank', 'noopener,noreferrer');
                      }}
                      style={{
                        width: '100%',
                        marginTop: 'auto',
                        background: '#25D366',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '0.6rem 0',
                        borderRadius: '8px',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 8px rgba(37, 211, 102, 0.28)'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#20ba5a';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#25D366';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(37, 211, 102, 0.28)';
                      }}
                    >
                      <MessageCircle size={15} />
                      <span>Order on WhatsApp</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ========================================================
          4. DIVINE & FESTIVE GIFTS SHOWCASE
      ======================================================== */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #FFFDF8 0%, #FAF4E8 100%)',
            borderRadius: '24px',
            border: '1px solid #EFE6D8',
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 1fr) minmax(360px, 1.35fr)',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            {/* Left Column: Visual Showcase */}
            <div style={{ borderRadius: '18px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
              <img 
                src="/images/minimalist_marble_ganesha.jpg" 
                alt="Pristine Handcrafted White Marble & Gold Leaf Lord Ganesha Idol"
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '360px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {/* Right Column: Copy & Actions */}
            <div>
              <div 
                style={{ 
                  background: '#FFF2D6', 
                  color: '#92400E', 
                  border: '1px solid rgba(217, 119, 6, 0.28)', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.35rem', 
                  padding: '0.3rem 0.85rem', 
                  borderRadius: '9999px', 
                  fontWeight: 800, 
                  fontSize: '0.72rem', 
                  letterSpacing: '0.04em',
                  marginBottom: '0.85rem' 
                }}
              >
                <span>🪔 SACRED BLESSINGS & PUJA GIFTS</span>
              </div>

              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', lineHeight: 1.2, margin: 0, marginBottom: '0.75rem' }}>
                Divine Idols & <br />
                Auspicious Festive Gifts
              </h2>

              <p style={{ fontSize: '0.94rem', color: '#4B5563', lineHeight: 1.6, margin: 0, marginBottom: '1.65rem' }}>
                Handcrafted pure brass deities, pristine marble murtis, auspicious housewarming hampers and sacred festive keepsakes to bless every new beginning.
              </p>

              {/* Two Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '2rem' }}>
                <button
                  onClick={() => navigateTo('shop', { category: 'religious-idols' })}
                  style={{
                    background: 'rgb(217, 119, 6)',
                    color: '#111827',
                    border: 'none',
                    padding: '0.75rem 1.6rem',
                    borderRadius: '9999px',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(217, 119, 6, 0.3)'
                  }}
                >
                  <span>Explore Divine Collection</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  onClick={() => navigateTo('shop')}
                  style={{
                    background: '#FFFFFF',
                    color: '#1F2937',
                    border: '1.5px solid #E5E7EB',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '9999px',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <span>View All Categories</span>
                </button>
              </div>

              {/* 3 Value Pillars */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                borderTop: '1px solid #EFE6D8',
                paddingTop: '1.5rem',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    background: '#FEF3C7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    flexShrink: 0
                  }}>
                    🪔
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ 
                      fontSize: '0.82rem', 
                      fontWeight: 700, 
                      color: '#111827', 
                      lineHeight: 1.25, 
                      marginBottom: '0.15rem', 
                      whiteSpace: 'nowrap' 
                    }}>
                      Marble & Brass Idols
                    </div>
                    <div style={{ 
                      fontSize: '0.72rem', 
                      color: '#6B7280', 
                      lineHeight: 1.25, 
                      whiteSpace: 'nowrap' 
                    }}>
                      Artisanal gold leaf finish
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    background: '#FEF3C7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    flexShrink: 0
                  }}>
                    🎁
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ 
                      fontSize: '0.82rem', 
                      fontWeight: 700, 
                      color: '#111827', 
                      lineHeight: 1.25, 
                      marginBottom: '0.15rem', 
                      whiteSpace: 'nowrap' 
                    }}>
                      Luxe Gift Box
                    </div>
                    <div style={{ 
                      fontSize: '0.72rem', 
                      color: '#6B7280', 
                      lineHeight: 1.25, 
                      whiteSpace: 'nowrap' 
                    }}>
                      Festive ready packaging
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    background: '#FEF3C7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    flexShrink: 0
                  }}>
                    🛡️
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ 
                      fontSize: '0.82rem', 
                      fontWeight: 700, 
                      color: '#111827', 
                      lineHeight: 1.25, 
                      marginBottom: '0.15rem', 
                      whiteSpace: 'nowrap' 
                    }}>
                      Safe Transit
                    </div>
                    <div style={{ 
                      fontSize: '0.72rem', 
                      color: '#6B7280', 
                      lineHeight: 1.25, 
                      whiteSpace: 'nowrap' 
                    }}>
                      Zero-breakage guarantee
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* ========================================================
          5. THE REASON TO SHOP WITH STEP IN (Why Choose Us)
      ======================================================== */}
      <section style={{ padding: '4rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1.3fr',
            gap: '2.5rem',
            alignItems: 'center'
          }} className="why-choose-grid">
            
            {/* Left: Heading & Intro */}
            <div>
              <div 
                style={{ 
                  background: '#FFF2D6', 
                  color: '#92400E', 
                  border: '1px solid rgba(217, 119, 6, 0.28)', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.35rem', 
                  padding: '0.3rem 0.85rem', 
                  borderRadius: '9999px', 
                  fontWeight: 800, 
                  fontSize: '0.72rem', 
                  letterSpacing: '0.04em',
                  marginBottom: '0.85rem' 
                }}
              >
                <span>⭐ WHY CHOOSE US</span>
              </div>

              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827', lineHeight: 1.2, margin: 0, marginBottom: '0.75rem' }}>
                The Reason to <br />
                Shop with Step In
              </h2>

              <p style={{ fontSize: '0.94rem', color: '#4B5563', lineHeight: 1.6, margin: 0, marginBottom: '1.75rem' }}>
                We make gifting simple, special and memorable.
              </p>

              <button
                onClick={() => navigateTo('about')}
                style={{
                  background: 'rgb(217, 119, 6)',
                  color: '#111827',
                  border: 'none',
                  padding: '0.75rem 1.6rem',
                  borderRadius: '9999px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(217, 119, 6, 0.3)'
                }}
              >
                <span>Learn More</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Middle: 3 Feature Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{
                background: '#FFFDF8',
                border: '1px solid #EFE6D8',
                borderRadius: '16px',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: '#FFF2D6',
                  color: '#D97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Award size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#111827' }}>Premium Quality</div>
                  <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>Only the best, always.</div>
                </div>
              </div>

              <div style={{
                background: '#FFFDF8',
                border: '1px solid #EFE6D8',
                borderRadius: '16px',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: '#FFF2D6',
                  color: '#D97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Users size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#111827' }}>Trusted by 1L+</div>
                  <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>Happy customers</div>
                </div>
              </div>

              <div style={{
                background: '#FFFDF8',
                border: '1px solid #EFE6D8',
                borderRadius: '16px',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: '#FFF2D6',
                  color: '#D97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Truck size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#111827' }}>On-Time Delivery</div>
                  <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>Across India</div>
                </div>
              </div>
            </div>

            {/* Right: Luxury Hamper Photo with "Happy Moments" card */}
            <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}>
              <img 
                src="/images/why_choose_hamper.jpg" 
                alt="Happy Moments Luxury Celebration Gift Box"
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '360px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          7. WHAT OUR CUSTOMERS SAY (Customer Reviews)
      ======================================================== */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#FAFAFA', borderTop: '1px solid #F3F4F6' }}>
        <div className="container">
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.25rem' }}>
            <div>
              <div 
                style={{ 
                  background: '#FFF2D6', 
                  color: '#92400E', 
                  border: '1px solid rgba(217, 119, 6, 0.28)', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.35rem', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '9999px', 
                  fontWeight: 800, 
                  fontSize: '0.7rem', 
                  letterSpacing: '0.04em',
                  marginBottom: '0.5rem' 
                }}
              >
                <span>💬 CUSTOMER LOVE</span>
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', margin: 0, marginBottom: '0.35rem' }}>
                What Our Customers Say
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#6B7280', margin: 0 }}>
                Real stories. Real smiles.
              </p>
            </div>

            <button
              onClick={() => navigateTo('about')}
              style={{
                background: 'none',
                border: 'none',
                color: '#D97706',
                fontWeight: 700,
                fontSize: '0.88rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                cursor: 'pointer'
              }}
            >
              <span>View All Reviews</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 3 Review Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {TESTIMONIAL_CARDS.map(t => (
              <div 
                key={t.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #EFE6D8',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
                }}
              >
                <p style={{ fontSize: '0.92rem', color: '#374151', lineHeight: 1.6, fontStyle: 'italic', margin: 0, marginBottom: '1.25rem' }}>
                  "{t.quote}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 'auto' }}>
                  <img 
                    src={t.avatar} 
                    alt={t.name}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>
                      {t.name}
                    </div>
                    {/* 5 Golden Stars */}
                    <div style={{ display: 'flex', gap: '2px', marginTop: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} color="rgb(217, 119, 6)" fill="rgb(217, 119, 6)" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================
          8. CALL TO ACTION BANNER (Make Every Moment Special)
      ======================================================== */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #FFFDF8 0%, #FEF5E7 50%, #FDF0D5 100%)',
            borderRadius: '24px',
            border: '1px solid #F3E4C8',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            alignItems: 'center',
            position: 'relative'
          }} className="cta-banner-grid">
            
            {/* Left Content */}
            <div style={{ padding: '3rem 2.5rem' }}>
              <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#111827', margin: 0, marginBottom: '0.65rem' }}>
                Make Every Moment Special
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#4B5563', margin: 0, marginBottom: '1.75rem' }}>
                Thoughtful gifts, happy hearts. Only at Step In Gift Mart.
              </p>
              <button
                onClick={() => navigateTo('shop')}
                style={{
                  background: 'rgb(217, 119, 6)',
                  color: '#111827',
                  border: 'none',
                  padding: '0.75rem 1.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)'
                }}
              >
                <span>Shop Now</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Right Graphic: Festive Celebration Gifts */}
            <div style={{ position: 'relative', height: '100%', minHeight: '220px' }}>
              <img 
                src="/images/cta_festive_gifts.jpg" 
                alt="Festive celebration gift boxes"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 12%, black 28%, black 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 12%, black 28%, black 100%)'
                }}
              />
              {/* Handwritten script badge */}
              <div style={{
                position: 'absolute',
                bottom: 24,
                right: 28,
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(6px)',
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#D97706',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <span>Gift Happiness</span>
                <span style={{ color: '#EF4444' }}>❤️</span>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
