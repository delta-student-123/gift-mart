import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CATEGORIES, 
  BUDGET_RANGES,
  CORPORATE_CLIENTS,
  OCCASIONS, 
  RECIPIENTS, 
  FEELINGS, 
  PRODUCTS, 
  BLOG_POSTS, 
  TESTIMONIALS,
  VALID_PINCODES,
  BRAND
} from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Gift, 
  Check, 
  ArrowRight, 
  Heart, 
  Search, 
  Star, 
  ShieldCheck, 
  Truck, 
  Zap, 
  Tag, 
  ChevronRight, 
  ChevronLeft,
  Calendar,
  Send,
  UserCheck,
  Building,
  Smile,
  BadgePercent,
  Sliders,
  Award,
  Layers,
  HelpCircle,
  Briefcase,
  CheckCircle2,
  Mail,
  Headphones,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';

export const HomePage = () => {
  const { 
    navigateTo, 
    pincode, 
    pincodeInfo, 
    checkPincode, 
    openPersonalizer,
    addToCart,
    showToast 
  } = useApp();

  // Pincode / Delivery location checker
  const [pincodeInput, setPincodeInput] = useState(pincode || '');
  const [deliveryResult, setDeliveryResult] = useState(pincodeInfo ? { success: true, info: pincodeInfo } : null);

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    const res = checkPincode(pincodeInput);
    if (res.success) {
      setDeliveryResult(res);
      showToast(`Pincode ${pincodeInput} is serviceable! Free delivery on orders > ₹500.`);
    } else {
      showToast('Please enter a valid 6-digit Indian pincode', 'error');
    }
  };

  // Hero Carousel State
  const [heroSlide, setHeroSlide] = useState(0);
  const heroSlides = [
    {
      id: 1,
      badge: "India's #1 Store for Personalized Gifts",
      title: "Customized Gifts with Free Laser Engraving.",
      subtitle: "Elevate your celebrations with smart LED temperature bottles, handcrafted vegan leather wallets, executive metallic pens and optical 3D memory frames.",
      primaryCta: "Shop Personalized Gifts",
      primaryAction: () => navigateTo('shop', { category: 'bottles' }),
      secondaryCta: "Corporate Bulk RFQ",
      secondaryAction: () => {
        const el = document.getElementById('corporate-calculator-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
      tag: "⚡ 100% Free Laser Customization Included",
      coupon: "Code: STEPIN150 (₹150 OFF)",
      bgImage: "/images/corporate_welcome_box.jpg",
      imageAlt: "Personalized Executive Welcome Kit with Laser Engraving"
    },
    {
      id: 2,
      badge: "Enterprise Onboarding & Client Appreciation",
      title: "Premium Corporate Welcome Kits for Modern Teams.",
      subtitle: "Custom-branded onboarding hampers, executive metallic pens, hardbound organizers & smart vacuum flasks. Trusted by 10,000+ Indian companies.",
      primaryCta: "Explore Welcome Kits",
      primaryAction: () => navigateTo('shop', { category: 'welcome-kits' }),
      secondaryCta: "Calculate Bulk Discount",
      secondaryAction: () => {
        const el = document.getElementById('corporate-calculator-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
      tag: "🏢 Multi-Address Pan-India Direct Dispatch",
      coupon: "Corporate: BULK40 (Up to 40% OFF)",
      bgImage: "/images/recipient_employees.jpg",
      imageAlt: "Spark Modern Employee Onboarding Kit"
    },
    {
      id: 3,
      badge: "Optical 3D Illusion Keepsakes",
      title: "Glow in Memories with Backlit 3D Night Lamps.",
      subtitle: "Turn favorite couple portraits, family snapshots, and Spotify song tracks into glowing warm acrylic night lamps with custom wooden bases.",
      primaryCta: "Try Live 3D Studio",
      primaryAction: () => {
        const el = document.getElementById('live-engraver-studio');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
      secondaryCta: "View All Lamps",
      secondaryAction: () => navigateTo('shop', { category: 'lamps' }),
      tag: "✨ Live Visual Preview Before You Order",
      coupon: "Code: GLOW100 (₹100 OFF)",
      bgImage: "/images/acrylic_lamp.jpg",
      imageAlt: "Custom 3D Optical Illusion LED Lamp & Solid Wood Base"
    },
    {
      id: 4,
      badge: "🎂 Royal Hampers & Festive Celebrations",
      title: "Unforgettable Luxury Hampers & Celebration Gifts.",
      subtitle: "Make every celebration magical with royal velvet trunks, roasted dry fruits, gourmet Belgian chocolates, custom keepsakes & artisan surprises.",
      primaryCta: "Shop Luxury Hampers",
      primaryAction: () => navigateTo('shop', { category: 'hampers' }),
      secondaryCta: "Order Birthday Cakes",
      secondaryAction: () => navigateTo('shop', { category: 'cakes' }),
      tag: "🎈 Free Personalized Greeting Card & Fast Dispatch",
      coupon: "Code: STEPIN150 (₹150 OFF)",
      bgImage: "/images/luxury_hamper.jpg",
      imageAlt: "Royal Velvet Luxury Hamper Box with Gold Ribbon"
    }
  ];

  // Auto advance hero slide every 6 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setHeroSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, [heroSlides.length]);

  const currentSlide = heroSlides[heroSlide];

  // Giftana Signature: Shop Gifts by Budget State
  const [activeBudgetId, setActiveBudgetId] = useState('500-1000');
  const activeBudget = BUDGET_RANGES.find(b => b.id === activeBudgetId) || BUDGET_RANGES[1];
  const budgetFilteredProducts = PRODUCTS.filter(p => p.price >= activeBudget.min && p.price <= activeBudget.max);

  // Live Interactive Laser Engraver Simulator State
  const STUDIO_PRODUCTS = [
    {
      id: 'sim-bottle',
      name: 'Smart LED Temperature Bottle (500ml)',
      category: 'Personalized Drinkware',
      basePrice: 599,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=80',
      labelY: '63%',
      defaultText: 'Vikram Sharma',
      originalProduct: PRODUCTS[0]
    },
    {
      id: 'sim-wallet',
      name: 'Executive Vegan Leather Wallet Set',
      category: 'Wallets & Leather Sets',
      basePrice: 849,
      image: '/images/executive_wallet.jpg',
      labelY: '52%',
      defaultText: 'Aarav Mehta',
      originalProduct: PRODUCTS[2]
    },
    {
      id: 'sim-lamp',
      name: '3D Optical Illusion Acrylic Lamp',
      category: '3D LED Lamps & Frames',
      basePrice: 999,
      image: '/images/acrylic_lamp.jpg',
      labelY: '46%',
      defaultText: 'Rohan & Ananya',
      originalProduct: PRODUCTS[5]
    },
    {
      id: 'sim-pen',
      name: 'Matte Executive Metal Rollerball Pen',
      category: 'Executive Pens & Cases',
      basePrice: 449,
      image: '/images/executive_pen.jpg',
      labelY: '52%',
      defaultText: 'Dr. Arjun Verma',
      originalProduct: PRODUCTS[3]
    }
  ];

  const [selectedStudioProduct, setSelectedStudioProduct] = useState(STUDIO_PRODUCTS[0]);
  const [engravingText, setEngravingText] = useState('Vikram Sharma');
  const [fontFamily, setFontFamily] = useState('Dancing Script, cursive');
  const [laserTone, setLaserTone] = useState('gold'); // 'gold', 'silver', 'white'
  const [engravingAlignment, setEngravingAlignment] = useState('horizontal'); // 'horizontal' | 'vertical'
  const [textAlignment, setTextAlignment] = useState('center'); // 'left' | 'center' | 'right'

  // Corporate Bulk Quantity Calculator State
  const [bulkQty, setBulkQty] = useState(50);
  const [corporateItemPrice, setCorporateItemPrice] = useState(1299); // Base Welcome Kit
  
  // Calculate tiered discount
  const getBulkDiscountRate = (qty) => {
    if (qty >= 500) return 0.40;
    if (qty >= 250) return 0.35;
    if (qty >= 100) return 0.25;
    if (qty >= 50) return 0.15;
    if (qty >= 20) return 0.10;
    return 0.05;
  };

  const discountRate = getBulkDiscountRate(bulkQty);
  const discountedUnitPrice = Math.round(corporateItemPrice * (1 - discountRate));
  const bulkTotal = discountedUnitPrice * bulkQty;
  const bulkTotalSavings = (corporateItemPrice * bulkQty) - bulkTotal;

  // Corporate RFQ Modal / Form State
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqForm, setRfqForm] = useState({
    name: '',
    company: '',
    workEmail: '',
    phone: '',
    productType: 'Corporate Welcome Kits',
    quantity: '50-100 pcs',
    deliveryPincode: '110001',
    brandingNotes: ''
  });
  const [rfqSubmitted, setRfqSubmitted] = useState(false);

  const handleRfqSubmit = (e) => {
    e.preventDefault();
    if (!rfqForm.name || !rfqForm.company || !rfqForm.workEmail) {
      showToast('Please provide your name, company and work email', 'error');
      return;
    }
    setRfqSubmitted(true);
    showToast(`Corporate RFQ received for ${rfqForm.company}! Our enterprise consultant will call you within 2 hours.`);
  };

  // Newsletter & First Order Coupon State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const handleCopyCoupon = () => {
    navigator.clipboard?.writeText('GIFTANA150');
    setCopiedCoupon(true);
    showToast('Coupon code GIFTANA150 copied! Flat ₹150 OFF applied at checkout.');
    setTimeout(() => setCopiedCoupon(false), 3000);
  };
  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      handleCopyCoupon();
      setNewsletterEmail('');
    }
  };

  return (
    <div className="homepage-content" style={{ backgroundColor: '#ffffff' }}>

      {/* ========================================================
          1. HERO CAROUSEL BANNER (Modern Split Layout: Left Content, Right Real Image Cover)
      ======================================================== */}
      <section style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        minHeight: '410px',
        display: 'flex',
        alignItems: 'center',
        padding: '2.5rem 0',
        backgroundColor: '#141113',
        borderBottom: '1px solid var(--secondary-border)'
      }}>
        {/* Real & Related Image Covering the Right Side */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '56%',
          backgroundImage: `url(${currentSlide.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          transition: 'background-image 500ms ease-in-out',
          zIndex: 1
        }}>
          {/* Smooth horizontal gradient fade on the left edge */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #141113 0%, rgba(20, 17, 19, 0.75) 20%, rgba(20, 17, 19, 0.2) 50%, transparent 80%)'
          }} />
          {/* Subtle top & bottom vignette */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(20, 17, 19, 0.35) 0%, transparent 20%, transparent 80%, rgba(20, 17, 19, 0.35) 100%)'
          }} />
        </div>

        {/* Solid dark fill on the left behind text */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '46%',
          background: '#141113',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Left Content Area */}
          <div style={{ maxWidth: '640px' }}>
              {/* Slide Badge Tag */}
              <div className="section-tag" style={{ 
                background: 'rgba(245, 169, 0, 0.2)', 
                color: 'var(--primary)', 
                border: '1px solid rgba(245, 169, 0, 0.45)', 
                backdropFilter: 'blur(6px)', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 5, 
                padding: '0.25rem 0.85rem', 
                borderRadius: '30px', 
                fontWeight: 800, 
                fontSize: '0.74rem', 
                marginBottom: '0.75rem' 
              }}>
                <Sparkles size={12} color="var(--primary)" />
                <span>{currentSlide.badge}</span>
              </div>

              {/* Slide Title */}
              <h1 style={{ 
                fontSize: '2.25rem', 
                fontWeight: 800, 
                color: '#ffffff', 
                lineHeight: 1.2, 
                letterSpacing: '-0.02em', 
                marginBottom: '0.85rem',
                textShadow: '0 2px 12px rgba(0,0,0,0.6)'
              }}>
                {currentSlide.title}
              </h1>

              {/* Slide Subtitle */}
              <p style={{ 
                fontSize: '0.94rem', 
                color: '#e5e7eb', 
                lineHeight: 1.6, 
                marginBottom: '1.45rem', 
                maxWidth: '560px',
                textShadow: '0 1px 6px rgba(0,0,0,0.5)'
              }}>
                {currentSlide.subtitle}
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <button 
                  className="btn btn-gold"
                  onClick={currentSlide.primaryAction}
                  style={{ 
                    gap: '0.5rem', 
                    padding: '0.65rem 1.55rem', 
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    boxShadow: '0 4px 14px rgba(245, 169, 0, 0.35)'
                  }}
                >
                  <Gift size={16} />
                  <span>{currentSlide.primaryCta}</span>
                </button>

                <button 
                  className="btn btn-secondary"
                  onClick={currentSlide.secondaryAction}
                  style={{ 
                    gap: '0.5rem', 
                    padding: '0.65rem 1.45rem', 
                    fontSize: '0.9rem',
                    background: 'rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    backdropFilter: 'blur(8px)',
                    fontWeight: 700
                  }}
                >
                  <Briefcase size={16} color="var(--primary)" />
                  <span>{currentSlide.secondaryCta}</span>
                </button>
              </div>

              {/* Feature & Offer Glass Pills Row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.65rem', marginBottom: '1.35rem' }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5
                }}>
                  <Sparkles size={12} color="var(--primary)" />
                  <span>{currentSlide.tag}</span>
                </div>

                <div style={{
                  background: 'rgba(245, 169, 0, 0.2)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(245, 169, 0, 0.4)',
                  padding: '0.3rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  color: 'var(--primary)'
                }}>
                  {currentSlide.coupon}
                </div>
              </div>

              {/* Slider Controls & Carousel Dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', maxWidth: '240px' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {heroSlides.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setHeroSlide(idx)}
                      style={{
                        width: idx === heroSlide ? 22 : 7,
                        height: 7,
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: idx === heroSlide ? 'var(--primary)' : 'rgba(255, 255, 255, 0.35)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 200ms ease'
                      }}
                      title={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto' }}>
                  <button
                    onClick={() => setHeroSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    title="Previous Slide"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <button
                    onClick={() => setHeroSlide(prev => (prev + 1) % heroSlides.length)}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    title="Next Slide"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          2. GIFTANA 4 KEY TRUST PILLARS BAR
      ======================================================== */}
      <section style={{ backgroundColor: '#ffffff', padding: '1.75rem 0', borderBottom: '1px solid var(--border-light)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '1.5rem',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#fef3c7', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Truck size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--charcoal-dark)', margin: 0 }}>Free Pan-India Delivery</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)', margin: 0 }}>On all orders above ₹500</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#fef3c7', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Sparkles size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--charcoal-dark)', margin: 0 }}>100% Free Customization</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)', margin: 0 }}>Name & logo laser engraving</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#fef3c7', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Building size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--charcoal-dark)', margin: 0 }}>10,000+ Corporate Clients</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)', margin: 0 }}>Trusted by Tata, Infosys & Google</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#fef3c7', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--charcoal-dark)', margin: 0 }}>24-48 Hr Fast Dispatch</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)', margin: 0 }}>Express courier across 20,000+ pincodes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. PINCODE CHECKER BAR
      ======================================================== */}
      <section style={{ backgroundColor: 'var(--secondary-warm)', padding: '1.25rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <MapPin size={20} color="var(--primary)" />
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--charcoal-dark)' }}>
                Check Estimated Delivery Date & Express Timings:
              </span>
            </div>

            <form onSubmit={handlePincodeSubmit} style={{ display: 'flex', gap: '0.5rem', flex: '1', maxWidth: '380px' }}>
              <input 
                type="text"
                placeholder="Enter 6-digit Pincode (e.g. 110001)"
                maxLength={6}
                value={pincodeInput}
                onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                className="form-input"
                style={{ fontSize: '0.88rem', padding: '0.45rem 1rem' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}>
                Check
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              {deliveryResult?.info && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.84rem', color: '#15803d', fontWeight: 700 }}>
                  <Check size={16} />
                  <span>{deliveryResult.info.city} Serviceable • Estimated Delivery: 24-48 Hours</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => navigateTo('track-order')}
                style={{
                  background: '#fef3c7',
                  border: '1.5px solid var(--primary)',
                  color: 'var(--charcoal-dark)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(245, 169, 0, 0.25)',
                  transition: 'all 150ms ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fef3c7'}
              >
                <Clock size={13} color="var(--accent-gold-dark)" />
                <span>Track Live Order</span>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. GIFTANA SIGNATURE: SHOP GIFTS BY BUDGET
      ======================================================== */}
      <section id="shop-by-budget-section" style={{ padding: '4.5rem 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          
          <div className="section-head">
            <span className="section-tag" style={{ background: '#fef3c7', color: 'var(--accent-gold-dark)' }}>
              <Tag size={13} />
              <span>Step IN Smart Pricing</span>
            </span>
            <h2 className="section-title">Shop Gifts by Budget</h2>
            <p className="section-subtitle">Find premium laser-engraved keepsakes and corporate combos perfectly aligned with your budget.</p>
          </div>

          {/* Budget Filter Tabs (Giftana Style) */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.85rem',
            marginBottom: '2.5rem'
          }}>
            {BUDGET_RANGES.map(budget => {
              const isBudgetActive = activeBudgetId === budget.id;
              return (
                <button
                  key={budget.id}
                  onClick={() => setActiveBudgetId(budget.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.72rem 1.45rem',
                    borderRadius: 'var(--radius-full)',
                    border: isBudgetActive ? '1px solid #171717' : '1px solid #E5E7EB',
                    background: isBudgetActive ? '#171717' : '#ffffff',
                    color: isBudgetActive ? '#ffffff' : 'var(--charcoal-dark)',
                    fontWeight: isBudgetActive ? 700 : 600,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    boxShadow: isBudgetActive ? '0 4px 15px rgba(23, 23, 23, 0.22)' : 'var(--shadow-xs)',
                    transform: isBudgetActive ? 'translateY(-1px)' : 'none'
                  }}
                >
                  <span>{budget.icon}</span>
                  <span>{budget.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Budget Helper Text */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--charcoal-muted)' }}>
              Showing curated picks for <strong>{activeBudget.label}</strong> — {activeBudget.desc}
            </span>
          </div>

          {/* Products Grid for Selected Budget (Compact Images) */}
          <div className="grid-products-compact" style={{ marginBottom: '2.5rem' }}>
            {(budgetFilteredProducts.length > 0 ? budgetFilteredProducts.slice(0, 4) : PRODUCTS.slice(0, 4)).map(prod => (
              <ProductCard key={prod.id} product={prod} compact={true} imageHeight="190px" />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              className="btn btn-outline btn-lg"
              onClick={() => navigateTo('shop', { maxPrice: activeBudget.max, minPrice: activeBudget.min })}
              style={{ padding: '0.75rem 2rem' }}
            >
              <span>View All Gifts in {activeBudget.label} ({budgetFilteredProducts.length} Items)</span>
              <ChevronRight size={17} />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          5. BEST SELLING PERSONALIZED GIFTS
      ======================================================== */}
      <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--secondary-warm)', borderTop: '1px solid var(--secondary-border)', borderBottom: '1px solid var(--secondary-border)' }}>
        <div className="container">
          
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-tag" style={{ background: '#fef3c7', color: 'var(--accent-gold-dark)' }}>
                <Star size={13} fill="var(--primary)" color="var(--primary)" />
                <span>Top Customer Picks</span>
              </span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0.25rem' }}>
                Best Selling Personalized Gifts
              </h2>
              <p style={{ color: 'var(--charcoal-muted)', fontSize: '0.95rem' }}>
                Handpicked laser-engraved treasures with 100% free name and photo customization.
              </p>
            </div>

            <button 
              className="btn btn-primary"
              onClick={() => navigateTo('shop', { category: 'bottles' })}
              style={{ padding: '0.65rem 1.45rem' }}
            >
              <span>Explore All Bestsellers</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Grid of Bestsellers */}
          <div className="grid-products">
            {PRODUCTS.filter(p => p.isBestseller).slice(0, 4).map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          6. INTERACTIVE 3D LASER PERSONALIZATION STUDIO (Live Simulator)
      ======================================================== */}
      <section id="live-engraver-studio" style={{ padding: '5rem 0', backgroundColor: '#171717', color: '#ffffff' }}>
        <div className="container">
          
          <div className="section-head" style={{ marginBottom: '3rem' }}>
            <span className="section-tag" style={{ background: 'rgba(245, 169, 0, 0.15)', color: 'var(--primary)' }}>
              <Sparkles size={13} color="var(--primary)" />
              <span>Step IN Live Simulator</span>
            </span>
            <h2 className="section-title" style={{ color: '#ffffff' }}>
              Interactive Laser Personalization Studio
            </h2>
            <p className="section-subtitle" style={{ color: '#9ca3af' }}>
              Type your recipient name or company logo text and see it rendered directly in gold laser etching before placing your order.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)',
            gap: '3rem',
            alignItems: 'center',
            background: '#262626',
            borderRadius: 'var(--radius-2xl)',
            padding: '2.5rem',
            border: '1px solid #333333',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>

            {/* Left Controls */}
            <div>
              {/* Step 1: Select Product */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  1. Choose Product to Customize
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                  {STUDIO_PRODUCTS.map(sp => (
                    <button
                      key={sp.id}
                      type="button"
                      onClick={() => {
                        setSelectedStudioProduct(sp);
                        setEngravingText(sp.defaultText);
                      }}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-lg)',
                        background: selectedStudioProduct.id === sp.id ? 'var(--primary)' : '#1a1a1a',
                        color: selectedStudioProduct.id === sp.id ? '#171717' : '#ffffff',
                        border: selectedStudioProduct.id === sp.id ? '1px solid var(--primary)' : '1px solid #3b3b3b',
                        fontWeight: selectedStudioProduct.id === sp.id ? 800 : 600,
                        fontSize: '0.8rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 150ms ease'
                      }}
                    >
                      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sp.name}</div>
                      <div style={{ fontSize: '0.72rem', opacity: 0.85, marginTop: 2 }}>₹{sp.basePrice} (Free Laser)</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Recipient / Company Name */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  2. Type Name or Company Name to Engrave
                </label>
                <input 
                  type="text"
                  maxLength={28}
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  placeholder="e.g. Vikram Sharma or Infosys Ltd."
                  className="form-input"
                  style={{
                    background: '#1a1a1a',
                    border: '1.5px solid #444444',
                    color: '#ffffff',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    padding: '0.75rem 1rem'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#9ca3af', marginTop: 4 }}>
                  <span>✨ 100% Free Laser Customization</span>
                  <span>{engravingText.length}/28 Characters</span>
                </div>
              </div>

              {/* Step 3: Laser Typography Style */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  3. Select Laser Font Style
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {[
                    { label: 'Cursive Script', font: 'Dancing Script, cursive' },
                    { label: 'Regal Serif', font: 'Cinzel, serif' },
                    { label: 'Modern Sans', font: 'Poppins, sans-serif' }
                  ].map(f => (
                    <button
                      key={f.label}
                      type="button"
                      onClick={() => setFontFamily(f.font)}
                      style={{
                        padding: '0.55rem 0.5rem',
                        borderRadius: 'var(--radius-md)',
                        background: fontFamily === f.font ? '#ffffff' : '#1a1a1a',
                        color: fontFamily === f.font ? '#171717' : '#ffffff',
                        border: fontFamily === f.font ? '1px solid #ffffff' : '1px solid #3b3b3b',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Engraving Alignment (Available for ALL products) */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  4. Choose Engraving Alignment
                </label>
                
                {/* Horizontal / Vertical Layout Alignment */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.55rem' }}>
                  <button
                    type="button"
                    onClick={() => setEngravingAlignment('horizontal')}
                    style={{
                      padding: '0.55rem 0.65rem',
                      borderRadius: 'var(--radius-md)',
                      background: engravingAlignment === 'horizontal' ? 'var(--primary)' : '#1a1a1a',
                      color: engravingAlignment === 'horizontal' ? '#171717' : '#ffffff',
                      border: engravingAlignment === 'horizontal' ? '1px solid var(--primary)' : '1px solid #3b3b3b',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 150ms ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6
                    }}
                  >
                    <span>↔ Horizontal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEngravingAlignment('vertical')}
                    style={{
                      padding: '0.55rem 0.65rem',
                      borderRadius: 'var(--radius-md)',
                      background: engravingAlignment === 'vertical' ? 'var(--primary)' : '#1a1a1a',
                      color: engravingAlignment === 'vertical' ? '#171717' : '#ffffff',
                      border: engravingAlignment === 'vertical' ? '1px solid var(--primary)' : '1px solid #3b3b3b',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 150ms ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6
                    }}
                  >
                    <span>↕ Vertical</span>
                  </button>
                </div>

                {/* Left / Center / Right Text Alignment */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {[
                    { id: 'left', label: 'Left', icon: AlignLeft },
                    { id: 'center', label: 'Center', icon: AlignCenter },
                    { id: 'right', label: 'Right', icon: AlignRight }
                  ].map(align => {
                    const Icon = align.icon;
                    const isActive = textAlignment === align.id;
                    return (
                      <button
                        key={align.id}
                        type="button"
                        onClick={() => setTextAlignment(align.id)}
                        style={{
                          padding: '0.45rem 0.5rem',
                          borderRadius: 'var(--radius-md)',
                          background: isActive ? '#ffffff' : '#1a1a1a',
                          color: isActive ? '#171717' : '#9ca3af',
                          border: isActive ? '1px solid #ffffff' : '1px solid #3b3b3b',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 5,
                          transition: 'all 150ms ease'
                        }}
                      >
                        <Icon size={13} />
                        <span>{align.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (selectedStudioProduct.originalProduct) {
                      addToCart(selectedStudioProduct.originalProduct, 1, {
                        recipientName: engravingText || 'Vikram Sharma',
                        font: fontFamily,
                        alignment: `${engravingAlignment} (${textAlignment})`,
                        note: 'Laser Engraved via Step IN Live Studio'
                      });
                      showToast(`Added laser engraved "${selectedStudioProduct.name}" to cart!`);
                    }
                  }}
                  style={{ flex: 1, padding: '0.85rem', fontSize: '0.95rem' }}
                >
                  <Gift size={18} />
                  <span>Order with This Engraving</span>
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    if (selectedStudioProduct.originalProduct) {
                      openPersonalizer(selectedStudioProduct.originalProduct);
                    }
                  }}
                  style={{ background: '#333333', color: '#ffffff', borderColor: '#444444' }}
                >
                  <span>Full Studio</span>
                </button>
              </div>
            </div>

            {/* Right Live Realistic Canvas Preview */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '440px',
                height: '420px',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                border: '2px solid #3b3b3b'
              }}>
                <img 
                  src={selectedStudioProduct.image} 
                  alt={selectedStudioProduct.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Laser Engraved Name Live Layer - Perfectly Calibrated on Product Surfaces */}
                {(() => {
                  const isBottle = selectedStudioProduct.id === 'sim-bottle';
                  const isPen = selectedStudioProduct.id === 'sim-pen';
                  const isWallet = selectedStudioProduct.id === 'sim-wallet';
                  const isLamp = selectedStudioProduct.id === 'sim-lamp';
                  const isVertical = engravingAlignment === 'vertical';

                  // Dynamic font size strictly fitted to each product's surface area
                  let fontSize = '1.35rem';
                  let containerWidth = '220px';
                  let topPos = selectedStudioProduct.labelY || '50%';
                  let leftPos = '50%';
                  let textColor = '#fef08a';
                  let textGlow = '0 1px 2px rgba(0,0,0,0.9), 0 0 10px rgba(245, 169, 0, 0.75), 0 0 20px rgba(245, 169, 0, 0.4)';
                  let subtext = '✦ 100% FIBER LASER ETCHED ✦';

                  if (isBottle) {
                    if (isVertical) {
                      topPos = '60%';
                      containerWidth = '230px';
                      fontSize = engravingText.length > 18 ? '0.95rem' : engravingText.length > 12 ? '1.15rem' : '1.35rem';
                    } else {
                      topPos = '63%';
                      containerWidth = '124px';
                      fontSize = engravingText.length > 18 ? '0.68rem' : engravingText.length > 12 ? '0.82rem' : engravingText.length > 8 ? '0.96rem' : '1.12rem';
                      subtext = '✦ FIBER LASER ✦';
                    }
                  } else if (isPen) {
                    topPos = isVertical ? '58%' : '56%';
                    leftPos = '49.5%';
                    containerWidth = isVertical ? '175px' : '160px';
                    fontSize = engravingText.length > 18 ? '0.54rem' : engravingText.length > 12 ? '0.64rem' : '0.74rem';
                    textGlow = '0 1px 1px rgba(0,0,0,0.9), 0 0 5px rgba(245, 169, 0, 0.7)';
                    subtext = null; // Pen is slim, name only
                  } else if (isWallet) {
                    topPos = isVertical ? '50%' : '52%';
                    containerWidth = isVertical ? '230px' : '230px';
                    fontSize = engravingText.length > 18 ? '0.96rem' : engravingText.length > 12 ? '1.16rem' : '1.38rem';
                    textGlow = '0 1px 2px rgba(0,0,0,0.9), 0 0 8px rgba(245, 169, 0, 0.6)';
                    subtext = '✦ 100% LASER EMBOSSED ✦';
                  } else if (isLamp) {
                    topPos = isVertical ? '44%' : '46%';
                    containerWidth = '220px';
                    fontSize = engravingText.length > 18 ? '1.05rem' : engravingText.length > 12 ? '1.3rem' : '1.6rem';
                    textColor = '#fffbeb';
                    textGlow = '0 0 8px rgba(254, 240, 138, 0.95), 0 0 18px rgba(245, 169, 0, 0.9), 0 0 32px rgba(245, 169, 0, 0.55)';
                    subtext = '✦ 3D OPTICAL ILLUSION GLOW ✦';
                  }

                  return (
                    <div style={{
                      position: 'absolute',
                      top: topPos,
                      left: leftPos,
                      transform: isVertical ? 'translate(-50%, -50%) rotate(-90deg)' : 'translate(-50%, -50%)',
                      transformOrigin: 'center center',
                      width: containerWidth,
                      maxWidth: containerWidth,
                      textAlign: textAlignment,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: textAlignment === 'left' ? 'flex-start' : textAlignment === 'right' ? 'flex-end' : 'center',
                      pointerEvents: 'none',
                      zIndex: 3
                    }}>
                      <div style={{
                        fontFamily: fontFamily,
                        fontSize: fontSize,
                        fontWeight: 700,
                        letterSpacing: isPen ? '0.14em' : isVertical ? '0.08em' : '0.02em',
                        color: textColor,
                        textShadow: textGlow,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.15,
                        width: '100%',
                        textAlign: textAlignment,
                        transition: 'all 200ms ease'
                      }}>
                        {engravingText || 'Your Name Here'}
                      </div>

                      {subtext && !isVertical && (
                        <div style={{
                          fontSize: isBottle ? '0.52rem' : '0.58rem',
                          letterSpacing: isBottle ? '0.08em' : '0.12em',
                          textTransform: 'uppercase',
                          color: 'rgba(254, 240, 138, 0.85)',
                          marginTop: 3,
                          fontWeight: 700,
                          textShadow: '0 1px 2px rgba(0,0,0,0.85)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          width: '100%',
                          textAlign: textAlignment
                        }}>
                          {subtext}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Live Badge Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  background: 'rgba(0,0,0,0.85)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '30px',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  border: '1px solid rgba(245, 169, 0, 0.4)'
                }}>
                  <Sparkles size={13} />
                  <span>Real-Time Laser Simulation</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          7. CORPORATE WELCOME KITS & BULK RFQ CALCULATOR
      ======================================================== */}
      <section id="corporate-calculator-section" style={{ padding: '5rem 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          
          <div className="section-head">
            <span className="section-tag" style={{ background: '#fef3c7', color: 'var(--accent-gold-dark)' }}>
              <Building size={13} />
              <span>Step IN Corporate Solutions</span>
            </span>
            <h2 className="section-title">Corporate Welcome Kits & Bulk Gifting</h2>
            <p className="section-subtitle">
              Instant bulk quantity discounts, complimentary company logo engraving, and individual pan-India employee home dispatch.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
            gap: '3rem',
            alignItems: 'center',
            background: 'var(--secondary-warm)',
            border: '1.5px solid var(--secondary-border)',
            borderRadius: 'var(--radius-2xl)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>

            {/* Left: Dynamic Bulk Calculator */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#171717', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  <Sliders size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--charcoal-dark)', margin: 0 }}>
                    Instant Corporate Bulk Calculator
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-muted)', margin: 0 }}>
                    Select employee quantity to unlock tier discounts
                  </p>
                </div>
              </div>

              {/* Quantity Stepper / Slider */}
              <div style={{ marginBottom: '1.5rem', background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--charcoal-dark)' }}>Order Quantity:</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>{bulkQty} Kits</span>
                </div>

                <input 
                  type="range"
                  min={10}
                  max={500}
                  step={10}
                  value={bulkQty}
                  onChange={(e) => setBulkQty(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--charcoal-muted)', marginTop: 6 }}>
                  <span>10 pcs (10% OFF)</span>
                  <span>50 pcs (15% OFF)</span>
                  <span>100 pcs (25% OFF)</span>
                  <span>250+ pcs (35% OFF)</span>
                  <span>500+ pcs (40% OFF)</span>
                </div>
              </div>

              {/* Tier Discount Badges Matrix */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.75rem' }}>
                <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--charcoal-muted)' }}>Original MRP</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--charcoal-dark)', textDecoration: 'line-through' }}>₹{corporateItemPrice}</div>
                </div>

                <div style={{ background: '#fef3c7', padding: '0.85rem', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--primary)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold-dark)' }}>Bulk Unit Price ({Math.round(discountRate * 100)}% OFF)</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>₹{discountedUnitPrice}</div>
                </div>

                <div style={{ background: '#ecfdf5', padding: '0.85rem', borderRadius: 'var(--radius-lg)', border: '1px solid #a7f3d0', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#047857' }}>Total Savings</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#047857' }}>₹{bulkTotalSavings.toLocaleString('en-IN')}</div>
                </div>
              </div>

              {/* Enterprise Inclusions Checklist */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '2rem' }}>
                {[
                  'Free Company Logo Laser Engraving',
                  'Custom Printed Welcome Letter',
                  'Multi-Address Home Drop-Shipping',
                  'Dedicated Gifting Account Specialist',
                  'Single GST Tax Invoice',
                  'Complimentary Pre-Production Sample'
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: 'var(--charcoal-body)', fontWeight: 600 }}>
                    <CheckCircle2 size={15} color="#15803d" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                className="btn btn-primary btn-lg"
                onClick={() => setRfqModalOpen(true)}
                style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', gap: '0.5rem' }}
              >
                <Briefcase size={18} />
                <span>Request Instant Corporate RFQ Quote</span>
              </button>
            </div>

            {/* Right: Corporate Kit Visual Card */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '3px solid #ffffff',
                height: 380,
                position: 'relative'
              }}>
                <img 
                  src="/images/corporate_welcome_box.jpg" 
                  alt="Step IN Corporate Welcome Kit" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.5rem'
                }}>
                  <span style={{ background: 'var(--primary)', color: '#171717', padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 800, width: 'fit-content', marginBottom: '0.5rem' }}>
                    ✦ PREMIUM ONBOARDING HAMPER ✦
                  </span>
                  <h4 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.35rem 0' }}>
                    Executive 4-in-1 Employee Welcome Box
                  </h4>
                  <p style={{ color: '#e5e7eb', fontSize: '0.82rem', margin: 0 }}>
                    Includes LED Temperature Flask, Hardbound Diary, Metal Rollerball Pen & 16GB USB Card with Company Branding.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          8. SHOP BY RECIPIENT
      ======================================================== */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#fcfbf8', borderTop: '1px solid var(--secondary-border)', borderBottom: '1px solid var(--secondary-border)' }}>
        <div className="container">
          
          <div className="section-head">
            <span className="section-tag">
              <UserCheck size={13} />
              <span>Tailored Curation</span>
            </span>
            <h2 className="section-title">Shop by Recipient</h2>
            <p className="section-subtitle">Thoughtful personalized gifts curated specifically for each special relation.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {
                title: 'For Employees & Staff',
                desc: 'Onboarding boxes, desk accessories & anniversary rewards',
                tag: 'Corporate Special',
                image: '/images/recipient_employees.jpg',
                action: () => navigateTo('shop', { recipient: 'Employees' })
              },
              {
                title: 'For Clients & Partners',
                desc: 'Luxury dry fruit hampers, executive pens & branded keepsakes',
                tag: 'Executive Choice',
                image: '/images/recipient_clients.jpg',
                action: () => navigateTo('shop', { recipient: 'Clients' })
              },
              {
                title: 'For Him',
                desc: 'Custom engraved leather wallets, smart flasks & cufflink sets',
                tag: 'Trending',
                image: '/images/executive_wallet.jpg',
                action: () => navigateTo('shop', { recipient: 'Husband' })
              },
              {
                title: 'For Her',
                desc: '3D optical illusion portrait lamps, scented candles & jewelry',
                tag: 'Most Loved',
                image: '/images/acrylic_lamp.jpg',
                action: () => navigateTo('shop', { recipient: 'Wife' })
              }
            ].map(rec => (
              <div
                key={rec.title}
                onClick={rec.action}
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  transition: 'all 200ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                  <img src={rec.image} alt={rec.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--charcoal-dark)', color: '#ffffff', padding: '0.25rem 0.65rem', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700 }}>
                    {rec.tag}
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--charcoal-dark)', marginBottom: '0.35rem' }}>
                    {rec.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--charcoal-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
                    {rec.desc}
                  </p>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    Explore Category <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          9. EXPLORE GIFTANA CATEGORIES (Full Grid)
      ======================================================== */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          
          <div className="section-head">
            <span className="section-tag">
              <Gift size={13} />
              <span>Complete Catalog</span>
            </span>
            <h2 className="section-title">Explore by Category</h2>
            <p className="section-subtitle">Discover our complete range of personalized accessories, corporate boxes, and luxury gifts.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem'
          }}>
            {CATEGORIES.map(cat => (
              <div 
                key={cat.id}
                onClick={() => navigateTo('shop', { category: cat.id })}
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 200ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ height: 140, overflow: 'hidden' }}>
                  <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '0.85rem 0.5rem' }}>
                  <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--charcoal-dark)', marginBottom: '0.2rem' }}>
                    {cat.name}
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold-dark)', fontWeight: 700 }}>
                    {cat.count}+ Items
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          10. TRUSTED BY 500+ TOP INDIAN BRANDS
      ======================================================== */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#171717', color: '#ffffff', overflow: 'hidden' }}>
        <div className="container">
          
          <div className="section-head" style={{ marginBottom: '2.5rem' }}>
            <span className="section-tag" style={{ background: 'rgba(245,169,0,0.15)', color: 'var(--primary)', border: '1px solid rgba(245,169,0,0.3)' }}>
              <Award size={13} color="var(--primary)" />
              <span>Corporate Trust</span>
            </span>
            <h2 className="section-title" style={{ color: '#ffffff' }}>
              Trusted by 500+ Top Indian Corporates
            </h2>
            <p className="section-subtitle" style={{ color: '#9ca3af' }}>
              Empowering India's leading organizations with premium onboarding kits and client appreciation merchandise.
            </p>
          </div>

        </div>

        {/* Single Horizontal Auto-Scrolling Line (Infinite Marquee Ticker) */}
        <div className="marquee-container" style={{ marginBottom: '3.5rem' }}>
          <div className="marquee-track">
            {[...CORPORATE_CLIENTS, ...CORPORATE_CLIENTS].map((client, idx) => (
              <div 
                key={`${client.name}-${idx}`}
                style={{
                  background: '#242424',
                  borderRadius: '16px',
                  padding: '1.2rem 1.85rem',
                  border: '1.5px solid #333333',
                  textAlign: 'center',
                  minWidth: '240px',
                  flexShrink: 0,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  transition: 'all 200ms ease',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.background = '#2a2a2a';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#333333';
                  e.currentTarget.style.background = '#242424';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '1.18rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.3rem', whiteSpace: 'nowrap' }}>
                  {client.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  ✦ {client.badge}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container">

          {/* Key Metrics Counters */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid #333333',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.1 }}>500,000+</div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: 4 }}>Laser Gifts Delivered</div>
            </div>
            <div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.1 }}>10,000+</div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: 4 }}>Corporate Bulk Orders</div>
            </div>
            <div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.1 }}>4.9 / 5.0</div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: 4 }}>Customer Satisfaction Rating</div>
            </div>
            <div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.1 }}>99.8%</div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: 4 }}>On-Time Dispatch Rate</div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          11. VERIFIED CUSTOMER REVIEWS & TESTIMONIALS
      ======================================================== */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          
          <div className="section-head">
            <span className="section-tag" style={{ background: '#ecfdf5', color: '#15803d' }}>
              <Smile size={13} />
              <span>Real Customer Stories</span>
            </span>
            <h2 className="section-title">Loved by Individuals & Enterprises</h2>
            <p className="section-subtitle">See what our customers have to say about our laser finish quality and speed.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {TESTIMONIALS.map(rev => (
              <div 
                key={rev.id}
                style={{
                  background: 'var(--secondary-warm)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.75rem',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-xs)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', gap: '3px', marginBottom: '0.85rem' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="#F5A800" color="#F5A800" />
                  ))}
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-body)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.25rem', flex: 1 }}>
                  "{rev.review}"
                </p>

                <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold-dark)', fontWeight: 700, marginBottom: '0.85rem' }}>
                  Product: {rev.product}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-light)' }}>
                  <img src={rev.avatar} alt={rev.name} style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--charcoal-dark)' }}>
                      {rev.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span>{rev.city}</span>
                      <span>•</span>
                      <span style={{ color: '#15803d', fontWeight: 600 }}>✓ Verified Purchase</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================
          13. FIRST ORDER ₹150 OFF CTA BANNER (Exact Design Match)
      ======================================================== */}
      <section style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        background: '#FFF9F0', 
        padding: '3rem 0 2rem',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        {/* Subtle decorative background bursts */}
        <div style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 168, 0, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: -50,
          left: -30,
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 235, 221, 0.6) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          
          {/* Main Hero Card Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
            gap: '2.5rem',
            alignItems: 'center',
            marginBottom: '2.25rem'
          }} className="cta-banner-grid">

            {/* Left Content Column */}
            <div>
              {/* Starts From Price Strip Pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: '#ffffff',
                border: '1px solid rgba(245, 168, 0, 0.3)',
                borderRadius: '35px',
                padding: '0.35rem 0.55rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                marginBottom: '1.25rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  color: '#171717',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <Gift size={15} />
                </div>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--charcoal-dark)', padding: '0 4px' }}>
                  Starts From
                </span>
                {[
                  { label: '₹ 199', maxPrice: 199 },
                  { label: '₹ 299', maxPrice: 299 },
                  { label: '₹ 499', maxPrice: 499 },
                  { label: '₹ 999', maxPrice: 999 },
                  { label: '₹ 1999', maxPrice: 1999 }
                ].map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => navigateTo('shop', { maxPrice: p.maxPrice })}
                    style={{
                      background: '#FFF9F0',
                      border: '1px solid rgba(245, 168, 0, 0.35)',
                      borderRadius: '20px',
                      padding: '0.2rem 0.65rem',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      color: 'var(--charcoal-dark)',
                      cursor: 'pointer',
                      transition: 'all 150ms ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--primary)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#FFF9F0';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Headline */}
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                color: 'var(--charcoal-dark)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '0.75rem'
              }}>
                Get <span style={{ color: 'var(--primary)' }}>₹150 OFF</span>
                <span style={{ display: 'block' }}>on Your First Order</span>
              </h2>

              {/* Subtitle */}
              <p style={{
                fontSize: '0.94rem',
                color: 'var(--charcoal-muted)',
                lineHeight: 1.55,
                marginBottom: '1.5rem',
                maxWidth: '520px',
                fontWeight: 500
              }}>
                Gifts That Fit Your Price Point. Enter your email to claim your instant ₹150 coupon for customized gifts, cakes & welcome kits!
              </p>

              {/* Email Form */}
              <form onSubmit={handleNewsletter} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                maxWidth: '510px',
                marginBottom: '1rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  position: 'relative',
                  flex: '1 1 240px',
                  minWidth: '220px'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--charcoal-muted)',
                    pointerEvents: 'none',
                    display: 'flex'
                  }}>
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.5rem',
                      borderRadius: '35px',
                      border: '1.5px solid var(--border-subtle)',
                      background: '#ffffff',
                      color: 'var(--charcoal-dark)',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      outline: 'none',
                      boxShadow: 'var(--shadow-xs)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '0.75rem 1.6rem',
                    borderRadius: '35px',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    background: 'var(--primary)',
                    color: 'var(--charcoal-dark)',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(245, 168, 0, 0.35)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    whiteSpace: 'nowrap',
                    transition: 'all 180ms ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(245, 168, 0, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(245, 168, 0, 0.35)';
                  }}
                >
                  <span>{copiedCoupon ? 'Coupon Claimed! ✓' : 'Claim ₹150 OFF'}</span>
                  <ArrowRight size={16} />
                </button>
              </form>

              {/* Coupon Code Strip */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                background: '#ffffff',
                padding: '0.35rem 0.95rem',
                borderRadius: '30px',
                border: '1px solid rgba(245, 168, 0, 0.35)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}>
                <Tag size={14} color="var(--accent-gold-dark)" />
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--charcoal-dark)' }}>
                  Use Coupon Code:
                </span>
                <button
                  type="button"
                  onClick={handleCopyCoupon}
                  title="Click to copy coupon code"
                  style={{
                    background: '#FFF9F0',
                    border: '1.5px dashed var(--primary)',
                    borderRadius: '6px',
                    padding: '0.15rem 0.6rem',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: 'var(--charcoal-dark)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  <span>{copiedCoupon ? 'COPIED!' : 'GIFTANA150'}</span>
                  {copiedCoupon && <Check size={12} color="var(--success-green)" />}
                </button>
                <span style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)', fontWeight: 500 }}>
                  • Min Order ₹500
                </span>
              </div>

            </div>

            {/* Right Side: Exact Couple Graphic with Golden Arch & Flowers */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}>
              <img
                src="/images/cta_banner_couple_transparent.png"
                alt="Gifts for every occasion - Step In Gift Mart"
                style={{
                  width: '100%',
                  maxWidth: '520px',
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>

          </div>

          {/* Bottom 4 Feature Trust Badges Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1.5rem',
            paddingTop: '1.75rem',
            borderTop: '1px solid rgba(245, 168, 0, 0.2)'
          }}>
            {/* Badge 1: Pan-India Delivery */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#FFF9F0',
                border: '1px solid rgba(245, 168, 0, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Truck size={20} color="var(--primary)" />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>
                  Pan-India Delivery
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)' }}>
                  Safe & On Time
                </div>
              </div>
            </div>

            {/* Badge 2: Premium Quality */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#FFF9F0',
                border: '1px solid rgba(245, 168, 0, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <ShieldCheck size={20} color="var(--primary)" />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>
                  Premium Quality
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)' }}>
                  Thoughtful & Unique
                </div>
              </div>
            </div>

            {/* Badge 3: Custom Gifting */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#FFF9F0',
                border: '1px solid rgba(245, 168, 0, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Gift size={20} color="var(--primary)" />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>
                  Custom Gifting
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)' }}>
                  For Every Occasion
                </div>
              </div>
            </div>

            {/* Badge 4: Dedicated Support */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#FFF9F0',
                border: '1px solid rgba(245, 168, 0, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Headphones size={20} color="var(--primary)" />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>
                  Dedicated Support
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)' }}>
                  We're Always Here
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          CORPORATE RFQ MODAL
      ======================================================== */}
      {rfqModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(5px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-2xl)',
            maxWidth: '560px',
            width: '100%',
            padding: '2rem',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <button 
              onClick={() => { setRfqModalOpen(false); setRfqSubmitted(false); }}
              style={{ position: 'absolute', top: 18, right: 18, border: 'none', background: 'transparent', fontSize: '1.25rem', cursor: 'pointer', color: 'var(--charcoal-muted)' }}
            >
              ✕
            </button>

            {rfqSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#ecfdf5', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--charcoal-dark)', marginBottom: '0.5rem' }}>
                  Corporate RFQ Received!
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--charcoal-body)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Thank you! Our dedicated enterprise gifting manager will email your customized PDF catalog, volume pricing, and sample kit details within 2 business hours.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => { setRfqModalOpen(false); setRfqSubmitted(false); }}
                >
                  Back to Website
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
                  <Building size={20} color="var(--primary)" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold-dark)', textTransform: 'uppercase' }}>
                    Enterprise Gifting Portal
                  </span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--charcoal-dark)', marginBottom: '0.35rem' }}>
                  Request Instant Corporate Quote
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-muted)', marginBottom: '1.5rem' }}>
                  Get bulk tier pricing, free company logo samples & direct multi-address dispatch.
                </p>

                <form onSubmit={handleRfqSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--charcoal-dark)', display: 'block', marginBottom: 3 }}>Your Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Rohan Sharma" 
                        value={rfqForm.name} 
                        onChange={(e) => setRfqForm({ ...rfqForm, name: e.target.value })} 
                        className="form-input" 
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--charcoal-dark)', display: 'block', marginBottom: 3 }}>Company Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Infosys / Tata / Startup" 
                        value={rfqForm.company} 
                        onChange={(e) => setRfqForm({ ...rfqForm, company: e.target.value })} 
                        className="form-input" 
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--charcoal-dark)', display: 'block', marginBottom: 3 }}>Official Work Email *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="rohan@company.com" 
                        value={rfqForm.workEmail} 
                        onChange={(e) => setRfqForm({ ...rfqForm, workEmail: e.target.value })} 
                        className="form-input" 
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--charcoal-dark)', display: 'block', marginBottom: 3 }}>Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="+91 98765 43210" 
                        value={rfqForm.phone} 
                        onChange={(e) => setRfqForm({ ...rfqForm, phone: e.target.value })} 
                        className="form-input" 
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--charcoal-dark)', display: 'block', marginBottom: 3 }}>Product Category</label>
                      <select 
                        value={rfqForm.productType}
                        onChange={(e) => setRfqForm({ ...rfqForm, productType: e.target.value })}
                        className="form-select"
                      >
                        <option value="Corporate Welcome Kits">Corporate Welcome Kits</option>
                        <option value="Personalized Drinkware">Smart LED Flasks & Tumblers</option>
                        <option value="Wallets & Executive Sets">Leather Wallets & Executive Sets</option>
                        <option value="Luxury Gift Hampers">Festive Celebration Hampers</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--charcoal-dark)', display: 'block', marginBottom: 3 }}>Quantity</label>
                      <select 
                        value={rfqForm.quantity}
                        onChange={(e) => setRfqForm({ ...rfqForm, quantity: e.target.value })}
                        className="form-select"
                      >
                        <option value="25-50 pcs">25 - 50 Kits (10% OFF)</option>
                        <option value="50-100 pcs">50 - 100 Kits (15% OFF)</option>
                        <option value="100-250 pcs">100 - 250 Kits (25% OFF)</option>
                        <option value="250-500 pcs">250 - 500 Kits (35% OFF)</option>
                        <option value="500+ pcs">500+ Bulk Kits (40% OFF)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--charcoal-dark)', display: 'block', marginBottom: 3 }}>Branding & Dispatch Notes</label>
                    <textarea 
                      rows={2}
                      placeholder="e.g. Need company logo engraved in gold, multi-location delivery in Bengaluru & Gurgaon"
                      value={rfqForm.brandingNotes}
                      onChange={(e) => setRfqForm({ ...rfqForm, brandingNotes: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{ marginTop: '0.5rem', padding: '0.75rem' }}
                  >
                    Submit RFQ & Request Sample Box
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
