import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, OCCASIONS, FLAT_RECIPIENTS, FEELINGS, BUDGET_RANGES } from '../data/products';
import { Filter, SlidersHorizontal, ArrowUpDown, Zap, Sparkles, X, ChevronRight, Tag, CheckCircle2, ArrowRight } from 'lucide-react';

export const FILTER_ITEMS = [
  { 
    id: 'all', 
    label: 'All Gifts', 
    icon: '🎁', 
    image: '/images/luxury_hamper.jpg',
    tagline: 'Explore our complete collection of personalized gifts, corporate hampers & luxury keepsakes',
    features: ['⚡ Free Laser Engraving', '🚚 Express Delivery', '⭐ 4.9/5 Rating', '🛡️ Quality Guaranteed']
  },
  { 
    id: 'welcome-kits', 
    label: 'Welcome Kits', 
    icon: '🎁', 
    image: '/images/corporate_welcome_box.jpg',
    tagline: 'Premium onboarding boxes, employee joiner packs & VIP executive combos with company branding',
    features: ['🏢 Custom Company Logo', '📦 Curated 4-in-1 & 6-in-1 Sets', '⚡ Bulk Discounts', '🚚 Direct Desk Delivery']
  },
  { 
    id: 'bottles', 
    label: 'Drinkware & Flasks', 
    icon: '🍶', 
    image: '/images/drinkware_flask.jpg',
    tagline: 'Smart LED digital temperature flasks, insulated stainless steel tumblers & matte coffee mugs',
    features: ['⚡ Real-time LED Temp Display', '❄️ 24h Hot & Cold Insulation', '🖋️ Laser Engraved Name', '💧 100% BPA Free']
  },
  { 
    id: 'wallets', 
    label: 'Wallets & Leather', 
    icon: '💼', 
    image: '/images/executive_wallet.jpg',
    tagline: 'Laser-personalized vegan leather men’s & women’s wallets, passport holders, and executive sets',
    features: ['🪪 Custom Name & Metal Charm', '💳 RFID Anti-theft Protection', '🎁 Luxe Gift Box Packing', '✨ Handcrafted Leather']
  },
  { 
    id: 'pens', 
    label: 'Executive Pens', 
    icon: '✍️', 
    image: '/images/executive_pen.jpg',
    tagline: 'Heavyweight metallic rollerball, ballpoint and fountain pens precision-engraved with your name',
    features: ['🖋️ Permanent Laser Name Engraving', '💼 Velvet / Leatherette Case', '🇩🇪 German Smooth Ink Refill', '⚡ Ships in 24 Hours']
  },
  { 
    id: 'diaries', 
    label: 'Diaries & Planners', 
    icon: '📖', 
    image: '/images/executive_diary.jpg',
    tagline: 'Hardbound magnetic organizer diaries, undated daily planners & matching executive pen combos',
    features: ['📖 192 Acid-Free 80GSM Pages', '🧲 Magnetic Lock & Card Slots', '🖋️ Name Engraved on Plate', '💼 Corporate Ready']
  },
  { 
    id: 'lamps', 
    label: '3D Lamps', 
    icon: '✨', 
    image: '/images/acrylic_lamp.jpg',
    tagline: 'Optical illusion 3D acrylic LED portrait lamps, warm bedside nightlights & custom photo memorials',
    features: ['💡 Warm Ambient LED Glow', '🪵 Premium Solid Wooden Base', '🖼️ High-Res Laser Photo Etching', '🔌 USB Powered']
  },
  { 
    id: 'mugs', 
    label: 'Customized Mugs', 
    icon: '☕', 
    image: '/images/custom_mug.jpg',
    tagline: 'Heat-activated color change magic mugs, ceramic coffee cups & personalized photo prints',
    features: ['☕ Microwave & Dishwasher Safe', '✨ Magic Color Reveal on Hot Pour', '📸 Ultra-HD Vivid Photo Print', '🎁 Break-proof Packaging']
  },
  { 
    id: 'hampers', 
    label: 'Hampers', 
    icon: '🧺', 
    image: '/images/luxury_hamper.jpg',
    tagline: 'Grand celebratory velvet trunks, festive gift hampers, artisanal treats & personalized goodies',
    features: ['🎀 Hand-tied Satin Ribbon Finish', '🍫 Gourmet Chocolates & Dry Fruits', '💌 Handwritten Greeting Card', '🚚 All-India Delivery']
  },
  { 
    id: 'corporate-gifting', 
    label: 'Corporate Gifting', 
    icon: '🏢', 
    image: '/images/recipient_clients.jpg',
    tagline: 'End-to-end corporate gifting solutions, client appreciation gifts, and custom branded merchandise',
    features: ['🏢 Pan-India Multi-Address Shipping', '📦 Minimum Order as low as 10 pcs', '⚡ Dedicated Account Manager', '💰 GST Invoice with ITC'],
    isNavAction: true,
    target: 'corporate-gifting'
  },
  { 
    id: 'bulk-rfq', 
    label: 'Bulk RFQ Quote', 
    icon: '⚡', 
    image: '/images/recipient_employees.jpg',
    tagline: 'Instant quotation generator for bulk orders (50+ to 10,000+ units) with wholesale pricing',
    features: ['⚡ 30-Minute Quotation Turnaround', '🎨 Free Digital Mockup with Logo', '📉 Up to 40% Tiered Bulk Savings', '🏭 Factory Direct Supply'],
    isNavAction: true,
    target: 'corporate-gifting'
  },
  { 
    id: 'gift-finder', 
    label: 'Gift Finder', 
    icon: '🎁', 
    image: '/images/celebration_couple.jpg',
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



        {/* 2. DYNAMIC CATEGORY HERO BANNER ACCORDING TO SELECTED FILTER */}
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          marginBottom: '2rem',
          border: '1.5px solid var(--border-subtle)',
          background: 'linear-gradient(135deg, #FFF9F0 0%, #F4EBDD 100%)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 1.4fr) minmax(200px, 1fr)',
            alignItems: 'center',
            gap: '1.5rem',
            padding: '1.75rem 2rem'
          }} className="category-hero-grid">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#ffffff', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(245, 168, 0, 0.4)', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1rem' }}>{currentFilterInfo.icon || '🎁'}</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-gold-dark)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {selectedCategory === 'all' ? 'All Gifts Collection' : `${currentFilterInfo.label} Collection`}
                </span>
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--charcoal-dark)', lineHeight: 1.2, marginBottom: '0.5rem' }}>
                {getCategoryTitle()}
              </h1>
              <p style={{ fontSize: '0.94rem', color: 'var(--charcoal-muted)', lineHeight: 1.5, marginBottom: '1rem', maxWidth: '580px' }}>
                {currentFilterInfo.tagline}
              </p>
              
              {/* Feature Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {currentFilterInfo.features?.map((feat, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: '#ffffff',
                      color: 'var(--charcoal-dark)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                    }}
                  >
                    {feat}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--charcoal-dark)' }}>
                  Showing <span style={{ color: 'var(--accent-gold-dark)' }}>{filteredProducts.length}</span> curated items
                </span>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    style={{
                      background: 'var(--charcoal-dark)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 'var(--radius-full)',
                      padding: '0.4rem 1rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <span>View All Collections</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Image Spotlight Preview */}
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              border: '3px solid #ffffff',
              height: '200px'
            }}>
              <img
                src={currentFilterInfo.image}
                alt={currentFilterInfo.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(23,23,23,0.65) 0%, rgba(23,23,23,0) 60%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '1rem'
              }}>
                <div>
                  <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Step In Official Selection
                  </div>
                  <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.05rem' }}>
                    {currentFilterInfo.label}
                  </div>
                </div>
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
