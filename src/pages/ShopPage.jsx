import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, OCCASIONS, FLAT_RECIPIENTS, FEELINGS, BUDGET_RANGES } from '../data/products';
import { Filter, SlidersHorizontal, ArrowUpDown, Zap, Sparkles, X, ChevronRight, Tag, CheckCircle2, ArrowRight } from 'lucide-react';

export const FILTER_ITEMS = [
  { 
    id: 'all', 
    label: 'All Gifts', 
    titlePart1: 'All Curated',
    titlePart2: 'Gifts',
    icon: '🎁', 
    image: '/images/luxury_hamper.jpg',
    handwrittenNote: 'Gifts That Speak Love',
    tagline: 'Explore our complete collection of personalized gifts, corporate hampers & luxury keepsakes',
    features: ['⚡ Free Laser Engraving', '🚚 Express Delivery', '⭐ 4.9/5 Rating', '🛡️ Quality Guaranteed']
  },
  { 
    id: 'welcome-kits', 
    label: 'Welcome Kits', 
    titlePart1: 'Welcome',
    titlePart2: 'Kits',
    icon: '🎁', 
    image: '/images/corporate_welcome_box.jpg',
    handwrittenNote: 'Make Every Welcome Special',
    tagline: 'Premium onboarding boxes, employee joiner packs & VIP executive combos with company branding.',
    features: ['🏢 Custom Company Logo', '📦 Curated 4-in-1 & 6-in-1 Sets', '🏷️ Bulk Discounts', '🚚 Direct Desk Delivery']
  },
  { 
    id: 'bottles', 
    label: 'Drinkware & Flasks', 
    titlePart1: 'Drinkware',
    titlePart2: '& Flasks',
    icon: '🍶', 
    image: '/images/drinkware_flask.jpg',
    handwrittenNote: 'Hydrate in Pure Style',
    tagline: 'Smart LED digital temperature flasks, insulated stainless steel tumblers & matte coffee mugs',
    features: ['⚡ Real-time LED Temp Display', '❄️ 24h Hot & Cold Insulation', '🖋️ Laser Engraved Name', '💧 100% BPA Free']
  },
  { 
    id: 'wallets', 
    label: 'Wallets & Leather', 
    titlePart1: 'Wallets &',
    titlePart2: 'Leather',
    icon: '💼', 
    image: '/images/executive_wallet.jpg',
    handwrittenNote: 'Everyday Elegance',
    tagline: 'Laser-personalized vegan leather men’s & women’s wallets, passport holders, and executive sets',
    features: ['🪪 Custom Name & Metal Charm', '💳 RFID Anti-theft Protection', '🎁 Luxe Gift Box Packing', '✨ Handcrafted Leather']
  },
  { 
    id: 'pens', 
    label: 'Executive Pens', 
    titlePart1: 'Executive',
    titlePart2: 'Pens',
    icon: '✍️', 
    image: '/images/executive_pen.jpg',
    handwrittenNote: 'Write Your Legacy',
    tagline: 'Heavyweight metallic rollerball, ballpoint and fountain pens precision-engraved with your name',
    features: ['🖋️ Permanent Laser Name Engraving', '💼 Velvet / Wooden Gift Case', '🇩🇪 German Smooth Ink Refill', '⚡ Ships in 24 Hours']
  },
  { 
    id: 'diaries', 
    label: 'Diaries & Planners', 
    titlePart1: 'Diaries &',
    titlePart2: 'Planners',
    icon: '📖', 
    image: '/images/executive_diary.jpg',
    handwrittenNote: 'Plan Your Success',
    tagline: 'Hardbound magnetic organizer diaries, undated daily planners & matching executive pen combos',
    features: ['📖 192 Acid-Free 80GSM Pages', '🧲 Magnetic Lock & Card Slots', '🖋️ Name Engraved on Plate', '💼 Corporate Ready']
  },
  { 
    id: 'lamps', 
    label: '3D Lamps', 
    titlePart1: '3D Illusion',
    titlePart2: 'Lamps',
    icon: '✨', 
    image: '/images/acrylic_lamp.jpg',
    handwrittenNote: 'Illuminate Memories',
    tagline: 'Optical illusion 3D acrylic LED portrait lamps, warm bedside nightlights & custom photo memorials',
    features: ['💡 Warm Ambient LED Glow', '🪵 Premium Solid Wooden Base', '🖼️ High-Res Laser Photo Etching', '🔌 USB Powered']
  },
  { 
    id: 'mugs', 
    label: 'Customized Mugs', 
    titlePart1: 'Customized',
    titlePart2: 'Mugs',
    icon: '☕', 
    image: '/images/custom_mug.jpg',
    handwrittenNote: 'Warm Sips, Warm Smiles',
    tagline: 'Heat-activated color change magic mugs, ceramic coffee cups & personalized photo prints',
    features: ['☕ Microwave & Dishwasher Safe', '✨ Magic Color Reveal on Hot Pour', '📸 Ultra-HD Vivid Photo Print', '🎁 Break-proof Packaging']
  },
  { 
    id: 'hampers', 
    label: 'Hampers', 
    titlePart1: 'Luxury Gift',
    titlePart2: 'Hampers',
    icon: '🧺', 
    image: '/images/luxury_hamper.jpg',
    handwrittenNote: 'Unbox Celebrations',
    tagline: 'Grand celebratory velvet trunks, festive gift hampers, artisanal treats & personalized goodies',
    features: ['🎀 Hand-tied Satin Ribbon Finish', '🍫 Gourmet Chocolates & Dry Fruits', '💌 Handwritten Greeting Card', '🚚 All-India Delivery']
  },
  { 
    id: 'corporate-gifting', 
    label: 'Corporate Gifting', 
    titlePart1: 'Corporate',
    titlePart2: 'Gifting',
    icon: '🏢', 
    image: '/images/recipient_clients.jpg',
    handwrittenNote: 'Celebrate Your Team',
    tagline: 'End-to-end corporate gifting solutions, client appreciation gifts, and custom branded merchandise',
    features: ['🏢 Pan-India Multi-Address Shipping', '📦 Minimum Order as low as 10 pcs', '⚡ Dedicated Account Manager', '💰 GST Invoice with ITC'],
    isNavAction: true,
    target: 'corporate-gifting'
  },
  { 
    id: 'bulk-rfq', 
    label: 'Bulk RFQ Quote', 
    titlePart1: 'Bulk RFQ',
    titlePart2: 'Quote',
    icon: '⚡', 
    image: '/images/recipient_employees.jpg',
    handwrittenNote: 'Fast Wholesale Pricing',
    tagline: 'Instant quotation generator for bulk orders (50+ to 10,000+ units) with wholesale pricing',
    features: ['⚡ 30-Minute Quotation Turnaround', '🎨 Free Digital Mockup with Logo', '📉 Up to 40% Tiered Bulk Savings', '🏭 Factory Direct Supply'],
    isNavAction: true,
    target: 'corporate-gifting'
  },
  { 
    id: 'gift-finder', 
    label: 'Gift Finder', 
    titlePart1: 'AI Gift',
    titlePart2: 'Finder',
    icon: '🎁', 
    image: '/images/celebration_couple.jpg',
    handwrittenNote: 'Find the Perfect Gift',
    tagline: 'Interactive 3-step AI Gift Finder: Pick recipient, occasion & budget to get curated recommendations',
    features: ['🎯 30-Second Smart Recommendations', '🎁 Tailored to Exact Budget & Vibe', '⚡ Instant Add to Cart', '⭐ 100% Delight Guaranteed'],
    isNavAction: true,
    target: 'gift-finder'
  }
];

export const ShopPage = () => {
  const { viewParams, navigateTo, productsList } = useApp();

  const [selectedCategory, setSelectedCategory] = useState(viewParams.category || 'all');
  const [selectedOccasion, setSelectedOccasion] = useState(viewParams.occasion || 'all');
  const [selectedRecipient, setSelectedRecipient] = useState(viewParams.recipient || 'all');
  const [selectedFeeling, setSelectedFeeling] = useState(viewParams.feeling || 'all');
  const [onlySameDay, setOnlySameDay] = useState(viewParams.delivery === 'same-day');
  const [onlyPersonalized, setOnlyPersonalized] = useState(viewParams.category === 'personalized');
  const [priceMin, setPriceMin] = useState(viewParams.minPrice || 0);
  const [priceMax, setPriceMax] = useState(viewParams.maxPrice || 5000);
  const [activeBudgetId, setActiveBudgetId] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'newest', 'price-low', 'price-high', 'rating'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state if viewParams changes via navbar or links
  useEffect(() => {
    if (viewParams?.category) {
      setSelectedCategory(viewParams.category);
    }
    if (viewParams?.occasion) {
      setSelectedOccasion(viewParams.occasion);
    }
  }, [viewParams]);

  // Dynamic Filtering Logic
  const filteredProducts = useMemo(() => {
    return productsList.filter(p => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedOccasion !== 'all' && (!p.occasions || !p.occasions.includes(selectedOccasion))) return false;
      if (selectedRecipient !== 'all' && (!p.recipients || !p.recipients.includes(selectedRecipient))) return false;
      if (selectedFeeling !== 'all' && (!p.feelings || !p.feelings.includes(selectedFeeling))) return false;
      if (onlySameDay && p.deliverySpeed !== 'same-day') return false;
      if (onlyPersonalized && !p.isPersonalizable) return false;
      if (minRating > 0 && p.rating < minRating) return false;
      if (p.price < priceMin || p.price > priceMax) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return b.reviewCount - a.reviewCount; // popular
    });
  }, [productsList, selectedCategory, selectedOccasion, selectedRecipient, selectedFeeling, onlySameDay, onlyPersonalized, minRating, priceMin, priceMax, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedOccasion('all');
    setSelectedRecipient('all');
    setSelectedFeeling('all');
    setOnlySameDay(false);
    setOnlyPersonalized(false);
    setMinRating(0);
    setPriceMin(0);
    setPriceMax(5000);
    setActiveBudgetId('all');
    setSortBy('popular');
  };

  const handleBudgetSelect = (b) => {
    if (activeBudgetId === b.id) {
      setActiveBudgetId('all');
      setPriceMin(0);
      setPriceMax(5000);
    } else {
      setActiveBudgetId(b.id);
      setPriceMin(b.min);
      setPriceMax(b.max);
    }
  };

  const currentFilterInfo = useMemo(() => {
    return FILTER_ITEMS.find(item => item.id === selectedCategory) || FILTER_ITEMS[0];
  }, [selectedCategory]);

  const getCategoryTitle = () => {
    if (selectedCategory !== 'all') {
      const match = FILTER_ITEMS.find(c => c.id === selectedCategory) || CATEGORIES.find(c => c.id === selectedCategory);
      return match ? `${match.icon ? match.icon + ' ' : ''}${match.label || match.name}` : 'Personalized Gifts';
    }
    if (selectedOccasion !== 'all') {
      return `${OCCASIONS.find(o => o.id === selectedOccasion)?.name || 'Occasion'} Celebration Gifts`;
    }
    if (selectedRecipient !== 'all') {
      return `Personalized Gifts for ${selectedRecipient}`;
    }
    if (onlySameDay) return 'Same-Day Express Gifts';
    if (onlyPersonalized) return 'Laser-Engraved Personalized Keepsakes';
    if (priceMax <= 500) return 'Gifts Under ₹500';
    if (priceMin >= 2500) return 'Luxury Corporate Hampers & Trunks';
    return 'All Gifts';
  };

  const handleFilterClick = (item) => {
    if (item.isNavAction) {
      navigateTo(item.target);
    } else {
      setSelectedCategory(item.id);
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '85vh', padding: '2rem 0 5rem' }}>
      <div className="container">
        
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--charcoal-muted)', marginBottom: '1.25rem' }}>
          <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer', color: 'var(--charcoal-dark)', fontWeight: 600 }}>Home</span>
          <ChevronRight size={14} />
          <span onClick={() => setSelectedCategory('all')} style={{ cursor: 'pointer', color: 'var(--charcoal-muted)', fontWeight: 600 }}>Catalog</span>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{getCategoryTitle()}</span>
        </div>



        {/* 2. DYNAMIC CATEGORY HERO BANNER (Pixel-Perfect Match to Screenshot) */}
        <div style={{
          position: 'relative',
          borderRadius: '26px',
          overflow: 'hidden',
          marginBottom: '2.5rem',
          border: '1.5px solid rgba(245, 168, 0, 0.22)',
          background: 'linear-gradient(135deg, #FFFDF8 0%, #FFF9EF 45%, #FFF2DB 100%)',
          boxShadow: '0 4px 24px rgba(245, 168, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.02)',
          padding: '2.4rem 2.75rem'
        }} className="category-hero-container">
          
          {/* Subtle Decorative Background Accents */}
          <div style={{
            position: 'absolute',
            top: 18,
            right: 32,
            color: '#F5A800',
            opacity: 0.4,
            fontSize: '1.8rem',
            pointerEvents: 'none',
            userSelect: 'none'
          }}>✦</div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.22fr) minmax(280px, 1fr)',
            alignItems: 'center',
            gap: '2.5rem'
          }} className="category-hero-grid">
            
            {/* LEFT COLUMN: BADGE, HEADLINE, DESCRIPTION, PILLS, CTA */}
            <div>
              {/* Category Collection Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#FFF2D6',
                border: '1px solid rgba(245, 168, 0, 0.45)',
                padding: '5px 14px',
                borderRadius: '9999px',
                marginBottom: '1rem',
                boxShadow: '0 1px 3px rgba(245, 168, 0, 0.12)'
              }}>
                <span style={{ fontSize: '1.1rem' }}>{currentFilterInfo.icon || '🎁'}</span>
                <span style={{
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  color: '#171717',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase'
                }}>
                  {selectedCategory === 'all' ? 'ALL GIFTS COLLECTION' : `${(currentFilterInfo.label || '').toUpperCase()} COLLECTION`}
                </span>
              </div>

              {/* Big Two-Tone Headline with Decorative Sunburst Rays */}
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0.85rem' }}>
                <h1 style={{
                  fontSize: 'clamp(2.3rem, 4.2vw, 3.4rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.08,
                  margin: 0
                }}>
                  <span style={{ color: '#171717' }}>{currentFilterInfo.titlePart1 || 'Welcome'} </span>
                  <span style={{ color: '#F5A800' }}>{currentFilterInfo.titlePart2 || 'Kits'}</span>
                </h1>
                
                {/* Radiating Sunshine Accent Marks */}
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-36px',
                  pointerEvents: 'none'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="#F5A800" strokeWidth="2.6" strokeLinecap="round" opacity="0.9"/>
                  </svg>
                </div>
              </div>

              {/* Tagline / Subtitle */}
              <p style={{
                fontSize: '1.02rem',
                color: '#4B5563',
                lineHeight: 1.55,
                marginBottom: '1.5rem',
                maxWidth: '540px'
              }}>
                {currentFilterInfo.tagline}
              </p>

              {/* Feature Pills with Circular Golden Badges */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.65rem',
                marginBottom: '1.75rem'
              }}>
                {currentFilterInfo.features?.map((feat, idx) => {
                  const parts = feat.trim().split(' ');
                  const icon = parts[0];
                  const text = parts.slice(1).join(' ');
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        background: '#ffffff',
                        border: '1px solid #EFE4D2',
                        borderRadius: '14px',
                        padding: '0.38rem 0.85rem 0.38rem 0.45rem',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.025)'
                      }}
                    >
                      <div style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        backgroundColor: '#FFF0D0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.88rem',
                        flexShrink: 0
                      }}>
                        {icon}
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#171717', whiteSpace: 'nowrap' }}>
                        {text || feat}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Counter and CTA Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ width: 3, height: 18, backgroundColor: '#F5A800', borderRadius: 2 }} />
                  <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#171717' }}>
                    Showing {filteredProducts.length} curated items
                  </span>
                </div>

                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    style={{
                      background: '#171717',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 'var(--radius-full)',
                      padding: '0.55rem 1.35rem',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      boxShadow: '0 4px 12px rgba(23, 23, 23, 0.22)',
                      transition: 'all 160ms ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.backgroundColor = '#F5A800';
                      e.currentTarget.style.color = '#171717';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.backgroundColor = '#171717';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                  >
                    <span>View All Collections</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: SPOTLIGHT IMAGE & HANDWRITTEN ANNOTATION */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              
              {/* Handwritten Note at Top Right ("Make Every Welcome Special") */}
              <div style={{
                position: 'absolute',
                top: '-26px',
                right: '18px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 2,
                pointerEvents: 'none'
              }}>
                <span style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#171717',
                  transform: 'rotate(-4deg)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap'
                }}>
                  {currentFilterInfo.handwrittenNote || 'Make Every Welcome Special'}
                </span>
                <svg width="85" height="10" viewBox="0 0 85 10" fill="none" style={{ marginTop: '-4px' }}>
                  <path d="M2 7C22 2 62 2 83 6" stroke="#F5A800" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Seamless Showcase Image Container */}
              <div style={{
                borderRadius: '22px',
                overflow: 'hidden',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)',
                border: '4px solid #ffffff',
                width: '100%',
                maxHeight: '300px',
                aspectRatio: '16/10'
              }}>
                <img
                  src={currentFilterInfo.image || '/images/corporate_welcome_box.jpg'}
                  alt={currentFilterInfo.label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </div>

            </div>

          </div>
        </div>

        {/* Page Title & Sort Row */}
        <div style={{ marginBottom: '1.25rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.92rem', color: 'var(--charcoal-muted)', fontWeight: 600 }}>
              Refine results or sort by your preference:
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Mobile Filter Trigger Button */}
            <button
              type="button"
              className="btn btn-secondary btn-sm mobile-filter-btn"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              style={{ display: 'none', gap: 6 }}
            >
              <SlidersHorizontal size={15} />
              <span>Filters ({[selectedCategory !== 'all', selectedOccasion !== 'all', onlySameDay, onlyPersonalized, activeBudgetId !== 'all'].filter(Boolean).length})</span>
            </button>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--charcoal-muted)' }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{ padding: '0.45rem 1rem', width: 'auto', fontWeight: 600, fontSize: '0.88rem' }}
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest Additions</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Giftana Quick Budget Strip */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          overflowX: 'auto',
          paddingBottom: '1rem',
          marginBottom: '2rem',
          scrollbarWidth: 'none'
        }}>
          <button
            onClick={() => { setActiveBudgetId('all'); setPriceMin(0); setPriceMax(5000); }}
            style={{
              padding: '0.45rem 1.15rem',
              borderRadius: 'var(--radius-full)',
              border: activeBudgetId === 'all' ? '1px solid #171717' : '1px solid #E5E7EB',
              background: activeBudgetId === 'all' ? '#171717' : '#FFFFFF',
              color: activeBudgetId === 'all' ? '#FFFFFF' : 'var(--charcoal-dark)',
              fontWeight: activeBudgetId === 'all' ? 700 : 500,
              fontSize: '0.84rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: activeBudgetId === 'all' ? '0 3px 10px rgba(23, 23, 23, 0.2)' : '0 1px 2px rgba(0, 0, 0, 0.03)',
              transform: activeBudgetId === 'all' ? 'translateY(-1px)' : 'none',
              transition: 'all 160ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            All Budgets
          </button>
          {BUDGET_RANGES.map(b => {
            const isBudgetActive = activeBudgetId === b.id;
            return (
              <button
                key={b.id}
                onClick={() => handleBudgetSelect(b)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '0.45rem 1.15rem',
                  borderRadius: 'var(--radius-full)',
                  border: isBudgetActive ? '1px solid #171717' : '1px solid #E5E7EB',
                  background: isBudgetActive ? '#171717' : '#FFFFFF',
                  color: isBudgetActive ? '#FFFFFF' : 'var(--charcoal-dark)',
                  fontWeight: isBudgetActive ? 700 : 500,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isBudgetActive ? '0 3px 10px rgba(23, 23, 23, 0.2)' : '0 1px 2px rgba(0, 0, 0, 0.03)',
                  transform: isBudgetActive ? 'translateY(-1px)' : 'none',
                  transition: 'all 160ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <span>{b.icon}</span>
                <span>{b.label}</span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Grid: Sidebar Filters + Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr', gap: '2.5rem', alignItems: 'flex-start' }} className="shop-layout-grid">
          
          {/* SIDEBAR FILTER PANEL */}
          <aside className={`shop-sidebar ${isMobileFilterOpen ? 'mobile-open' : ''}`} style={{
            position: 'sticky',
            top: '165px',
            maxHeight: 'calc(100vh - 180px)',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            zIndex: 20,
            background: '#ffffff',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <div style={{ 
              position: 'sticky', 
              top: 0, 
              backgroundColor: '#ffffff', 
              zIndex: 5, 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '1.25rem', 
              borderBottom: '1px solid var(--border-light)', 
              paddingBottom: '0.75rem' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: '1rem', color: 'var(--charcoal-dark)' }}>
                <SlidersHorizontal size={18} color="var(--primary)" />
                <span>Filters</span>
              </div>
              <button 
                onClick={resetFilters}
                style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Reset All
              </button>
            </div>

            {/* Quick Delivery & Personalization Toggles */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
                <input 
                  type="checkbox" 
                  checked={onlySameDay} 
                  onChange={(e) => setOnlySameDay(e.target.checked)} 
                  style={{ accentColor: 'var(--primary)', width: 16, height: 16 }}
                />
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#b91c1c' }}>
                  <Zap size={14} fill="#b91c1c" /> Same-Day Delivery
                </span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
                <input 
                  type="checkbox" 
                  checked={onlyPersonalized} 
                  onChange={(e) => setOnlyPersonalized(e.target.checked)} 
                  style={{ accentColor: 'var(--primary)', width: 16, height: 16 }}
                />
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--accent-gold-dark)' }}>
                  <Sparkles size={14} /> Free Laser Engraving Only
                </span>
              </label>
            </div>

            {/* Category Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--charcoal-dark)', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                Categories ({CATEGORIES.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', maxHeight: 250, overflowY: 'auto' }}>
                <div 
                  onClick={() => setSelectedCategory('all')}
                  style={{ 
                    fontSize: '0.85rem', 
                    cursor: 'pointer', 
                    fontWeight: selectedCategory === 'all' ? 700 : 500, 
                    color: selectedCategory === 'all' ? 'var(--charcoal-dark)' : 'var(--charcoal-body)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '4px 6px',
                    borderRadius: '8px',
                    background: selectedCategory === 'all' ? 'var(--secondary-warm)' : 'transparent'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img src="/images/luxury_hamper.jpg" alt="" aria-hidden="true" style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover' }} />
                    <span>All Categories</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)' }}>({productsList.length})</span>
                </div>
                {CATEGORIES.map(cat => {
                  const isCatSelected = selectedCategory === cat.id;
                  const catCount = productsList.filter(p => p.category === cat.id).length;
                  return (
                    <div 
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      style={{ 
                        fontSize: '0.85rem', 
                        cursor: 'pointer', 
                        fontWeight: isCatSelected ? 700 : 500, 
                        color: isCatSelected ? 'var(--charcoal-dark)' : 'var(--charcoal-body)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '4px 6px',
                        borderRadius: '8px',
                        background: isCatSelected ? 'var(--secondary-warm)' : 'transparent'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <img src={cat.image} alt="" aria-hidden="true" style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover' }} />
                        <span>{cat.name}</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)' }}>({catCount})</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Occasion Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--charcoal-dark)', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                Occasions
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', maxHeight: 200, overflowY: 'auto' }}>
                <div 
                  onClick={() => setSelectedOccasion('all')}
                  style={{ fontSize: '0.85rem', cursor: 'pointer', fontWeight: selectedOccasion === 'all' ? 700 : 500, color: selectedOccasion === 'all' ? 'var(--primary)' : 'var(--charcoal-body)' }}
                >
                  All Occasions
                </div>
                {OCCASIONS.map(occ => (
                  <div 
                    key={occ.id}
                    onClick={() => setSelectedOccasion(occ.id)}
                    style={{ fontSize: '0.85rem', cursor: 'pointer', fontWeight: selectedOccasion === occ.id ? 700 : 500, color: selectedOccasion === occ.id ? 'var(--primary)' : 'var(--charcoal-body)', display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <span>{occ.icon}</span>
                    <span>{occ.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--charcoal-dark)', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                Recipient
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['all', ...FLAT_RECIPIENTS].map(rec => {
                  const isRecSelected = selectedRecipient === rec;
                  return (
                    <button
                      key={rec}
                      type="button"
                      onClick={() => setSelectedRecipient(rec)}
                      style={{
                        padding: '0.34rem 0.78rem',
                        borderRadius: 'var(--radius-full)',
                        border: isRecSelected ? '1px solid #171717' : '1px solid #E5E7EB',
                        background: isRecSelected ? '#171717' : '#FFFFFF',
                        color: isRecSelected ? '#FFFFFF' : 'var(--charcoal-dark)',
                        fontSize: '0.78rem',
                        fontWeight: isRecSelected ? 700 : 500,
                        cursor: 'pointer',
                        boxShadow: isRecSelected ? '0 2px 6px rgba(23, 23, 23, 0.22)' : '0 1px 2px rgba(0, 0, 0, 0.03)',
                        transition: 'all 150ms ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isRecSelected) {
                          e.currentTarget.style.borderColor = 'var(--primary)';
                          e.currentTarget.style.background = '#FFF9ED';
                          e.currentTarget.style.color = '#171717';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isRecSelected) {
                          e.currentTarget.style.borderColor = '#E5E7EB';
                          e.currentTarget.style.background = '#FFFFFF';
                          e.currentTarget.style.color = 'var(--charcoal-dark)';
                        }
                      }}
                    >
                      {rec === 'all' ? 'Everyone' : rec}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--charcoal-dark)', textTransform: 'uppercase' }}>Max Price</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--primary)' }}>₹{priceMax.toLocaleString('en-IN')}</span>
              </div>
              <input 
                type="range"
                min={399}
                max={5000}
                step={200}
                value={priceMax}
                onChange={(e) => {
                  setPriceMax(Number(e.target.value));
                  setActiveBudgetId('custom');
                }}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--charcoal-muted)', marginTop: 4 }}>
                <span>₹399</span>
                <span>₹5,000+</span>
              </div>
            </div>

          </aside>

          {/* MAIN PRODUCTS GRID */}
          <main>
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '5rem 1rem', background: 'var(--secondary-warm)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--secondary-border)' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--charcoal-dark)', marginBottom: '0.5rem' }}>
                  No Gifts Found For Your Current Filter Combination
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--charcoal-muted)', marginBottom: '1.5rem' }}>
                  Try resetting your price range or exploring different categories.
                </p>
                <button className="btn btn-primary" onClick={resetFilters}>
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '1.75rem'
              }}>
                {filteredProducts.map(prod => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      <style>{`
        @media (max-width: 960px) {
          .category-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .category-hero-container {
            padding: 1.75rem 1.5rem !important;
          }
        }
        @media (max-width: 860px) {
          .shop-layout-grid { grid-template-columns: 1fr !important; }
          .mobile-filter-btn { display: inline-flex !important; }
          .shop-sidebar {
            display: none;
            position: static !important;
            top: auto !important;
            max-height: none !important;
          }
          .shop-sidebar.mobile-open {
            display: block !important;
            margin-bottom: 2rem;
            position: static !important;
            top: auto !important;
            max-height: none !important;
          }
        }
      `}</style>
    </div>
  );
};
