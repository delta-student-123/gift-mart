import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, OCCASIONS, FLAT_RECIPIENTS, FEELINGS, BUDGET_RANGES } from '../data/products';
import { Filter, SlidersHorizontal, ArrowUpDown, Zap, Sparkles, X, ChevronRight, Tag, CheckCircle2, ArrowRight } from 'lucide-react';

export const FILTER_ITEMS = [
  { 
    id: 'all', 
    label: 'All Gifts', 
    titlePart1: 'The Curated',
    titlePart2: 'Gift Shop',
    icon: '🎁', 
    image: '/images/luxury_hamper.jpg',
    bannerBg: '/images/gift_shop_banner_bg.jpg',
    handwrittenNote: 'Gifts That Speak Love',
    tagline: 'Step into our boutique gift shop — discover handpicked treasures, luxury hampers, cuddly companions & celebration keepsakes.',
    features: ['🎁 50+ Curated Gifts', '⚡ Free Customization', '🚚 Express Delivery', '⭐ 4.9/5 Rating']
  },
  { 
    id: 'bottles', 
    label: 'Drinkware & Flasks', 
    titlePart1: 'Drinkware',
    titlePart2: '& Flasks',
    icon: '🍶', 
    image: '/images/drinkware_flask.jpg',
    bannerBg: '/images/test_flask_banner.png',
    handwrittenNote: 'Hydrate in Pure Style',
    tagline: 'Smart LED digital temperature flasks, insulated stainless steel tumblers & matte coffee mugs',
    features: ['⚡ Real-time Temp Display', '❄️ 24h Hot & Cold', '🖋️ Laser Engraved Name', '💧 100% BPA Free']
  },
  { 
    id: 'wallets', 
    label: 'Wallets & Leather', 
    titlePart1: 'Wallets &',
    titlePart2: 'Leather',
    icon: '💼', 
    image: '/images/executive_wallet.jpg',
    bannerBg: '/images/wallets_banner_bg.png',
    handwrittenNote: 'Everyday Elegance',
    tagline: 'Laser-personalized vegan leather men’s & women’s wallets, passport holders, and executive sets',
    features: ['🪪 Custom Metal Charm', '💳 RFID Protection', '🎁 Luxe Gift Box', '✨ Handcrafted Leather']
  },
  { 
    id: 'pens', 
    label: 'Executive Pens', 
    titlePart1: 'Executive',
    titlePart2: 'Pens',
    icon: '✍️', 
    image: '/images/executive_pen.jpg',
    bannerBg: '/images/pens_banner_bg.png',
    handwrittenNote: 'Write Your Legacy',
    tagline: 'Heavyweight metallic rollerball, ballpoint and fountain pens precision-engraved with your name',
    features: ['🖋️ Permanent Engraving', '💼 Velvet Gift Case', '🇩🇪 German Ink Refill', '⚡ 24h Dispatch']
  },
  { 
    id: 'diaries', 
    label: 'Diaries & Planners', 
    titlePart1: 'Diaries &',
    titlePart2: 'Planners',
    icon: '📖', 
    image: '/images/executive_diary.jpg',
    bannerBg: '/images/diaries_banner_bg.png',
    handwrittenNote: 'Plan Your Success',
    tagline: 'Hardbound magnetic organizer diaries, undated daily planners & matching executive pen combos',
    features: ['📖 192 Acid-Free Pages', '🧲 Magnetic Lock', '🖋️ Engraved Name Plate', '💼 Corporate Ready']
  },
  { 
    id: 'lamps', 
    label: '3D Lamps', 
    titlePart1: '3D Illusion',
    titlePart2: 'Lamps',
    icon: '✨', 
    image: '/images/acrylic_lamp.jpg',
    bannerBg: '/images/lamps_banner_bg.png',
    handwrittenNote: 'Illuminate Memories',
    tagline: 'Optical illusion 3D acrylic LED portrait lamps, warm bedside nightlights & custom photo memorials',
    features: ['💡 Warm Ambient Glow', '🪵 Solid Wood Base', '🖼️ Laser Photo Etching', '🔌 USB Powered']
  },
  { 
    id: 'mugs', 
    label: 'Customized Mugs', 
    titlePart1: 'Customized',
    titlePart2: 'Mugs',
    icon: '☕', 
    image: '/images/handcrafted_floral_mugs.jpg',
    bannerBg: '/images/test_mug_proper.png',
    handwrittenNote: 'Warm Sips, Warm Smiles',
    tagline: 'Heat-activated color change magic mugs, ceramic coffee cups & personalized photo prints',
    features: ['☕ Dishwasher Safe', '✨ Magic Color Reveal', '📸 Ultra-HD Photo Print', '🎁 Gift Packaging']
  },
  { 
    id: 'hampers', 
    label: 'Hampers', 
    titlePart1: 'Luxury Gift',
    titlePart2: 'Hampers',
    icon: '🧺', 
    image: '/images/luxury_hamper.jpg',
    bannerBg: '/images/hampers_banner_bg.png',
    handwrittenNote: 'Unbox Celebrations',
    tagline: 'Grand celebratory velvet trunks, festive gift hampers, artisanal treats & personalized goodies',
    features: ['🎀 Satin Ribbon Finish', '🍫 Gourmet Chocolates', '💌 Handwritten Card', '🚚 Pan-India Delivery']
  },
  { 
    id: 'religious-idols', 
    label: 'Religious Idols', 
    titlePart1: 'Auspicious Religious',
    titlePart2: 'Idols & Statues',
    icon: '🪔', 
    image: '/images/religious_idol.jpg',
    handwrittenNote: 'Blessings for Every Home',
    tagline: 'Handcrafted antique brass idols, divine pooja statues & sacred festive blessings for new beginnings',
    features: ['🪔 100% Pure Brass', '✨ Handcrafted Antique Finish', '🎁 Sacred Luxe Gift Box', '🚚 Safe Fragile Shipping']
  },
  { 
    id: 'soft-toys', 
    label: 'Teddy Bears & Dolls', 
    titlePart1: 'Cuddly Plush &',
    titlePart2: 'Collector Dolls',
    icon: '🧸', 
    image: '/images/doll_victorian_princess.jpg',
    handwrittenNote: 'Sweet Keepsakes & Hugs',
    tagline: 'Ultra-soft huggable plush teddy bears, poseable chibi baby dolls & Victorian collector dolls',
    features: ['🧸 100% Non-Toxic Velvet Plush', '✨ Handcrafted Lace Attire', '🎀 Poseable BJD & Chibi Dolls', '🚚 Safe Express Delivery']
  },
  { 
    id: 'keychains', 
    label: 'Keychains & Charms', 
    titlePart1: 'Handcrafted',
    titlePart2: 'Keychains & Charms',
    icon: '🔑', 
    image: '/images/keychain_crochet_sunflower.jpg',
    handwrittenNote: 'Cute Everyday Charms',
    tagline: 'Handmade crochet sunflower & bow charms, anime collectibles and metallic insignia keychains',
    features: ['🧶 100% Handcrafted Crochet', '✨ Premium Metal Clips & Clasps', '🎁 Gift-Ready Keepsake Packaging', '⚡ Express Pan-India Delivery']
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
  const [onlySameDay, setOnlySameDay] = useState(false);
  const [onlyPersonalized, setOnlyPersonalized] = useState(false);
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
    <div style={{ backgroundColor: '#ffffff', minHeight: '85vh', padding: '1.5rem 0 5rem' }}>
      <div className="container">

        {/* 2. DYNAMIC CATEGORY HERO BANNER */}
        <div style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '2rem',
            border: '1.5px solid rgba(217, 119, 6, 0.22)',
            backgroundColor: '#FFFDF8',
            backgroundImage: `linear-gradient(90deg, #FFFDF8 0%, #FFFDF8 42%, rgba(255, 253, 248, 0.96) 54%, rgba(255, 253, 248, 0.3) 72%, rgba(255, 253, 248, 0) 86%), url(${currentFilterInfo.bannerBg || currentFilterInfo.image || '/images/all_gifts_banner_bg.png'})`,
            backgroundPosition: 'center right',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            boxShadow: '0 4px 18px rgba(217, 119, 6, 0.08), 0 1px 3px rgba(0, 0, 0, 0.02)',
            padding: 0,
            width: '100%',
            minHeight: '275px',
            display: 'flex',
            alignItems: 'center'
          }} className="category-hero-container">

            {/* LEFT COLUMN: BADGE, HEADLINE, DESCRIPTION, PILLS, CTA */}
            <div style={{
              width: '100%',
              maxWidth: '640px',
              padding: '2.2rem 1.5rem 2.2rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 3
            }} className="category-hero-left">
              
              {/* Category Collection Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                background: '#FFF2D6',
                border: '1px solid rgba(217, 119, 6, 0.45)',
                padding: '4px 12px',
                borderRadius: '9999px',
                marginBottom: '0.45rem',
                alignSelf: 'flex-start',
                boxShadow: '0 1px 3px rgba(217, 119, 6, 0.1)'
              }}>
                <span style={{ fontSize: '0.95rem' }}>{currentFilterInfo.icon || '🎁'}</span>
                <span style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  color: '#171717',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase'
                }}>
                  {selectedCategory === 'all' ? 'THE GIFT SHOP COLLECTION' : `${(currentFilterInfo.label || '').toUpperCase()} COLLECTION`}
                </span>
              </div>

              {/* Two-Tone Headline */}
              <h1 style={{
                fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                fontWeight: 900,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                margin: '0 0 0.45rem 0'
              }}>
                <span style={{ color: '#171717' }}>{currentFilterInfo.titlePart1 || 'Personalized'} </span>
                <span style={{ color: 'rgb(217, 119, 6)' }}>{currentFilterInfo.titlePart2 || 'Gifts'}</span>
              </h1>

              {/* Subtitle / Tagline - High Contrast & High Legibility */}
              <p style={{
                fontSize: '0.92rem',
                color: '#262626',
                fontWeight: 600,
                lineHeight: 1.48,
                marginBottom: '0.95rem',
                maxWidth: '520px'
              }}>
                {currentFilterInfo.tagline}
              </p>

              {/* Feature Pills - Single Clean Row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                marginBottom: '1rem',
                flexWrap: 'nowrap',
                overflowX: 'visible'
              }} className="category-feature-pills">
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
                        gap: 6,
                        background: '#ffffff',
                        border: '1.2px solid #EFE4D2',
                        borderRadius: '12px',
                        padding: '0.28rem 0.65rem 0.28rem 0.35rem',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.025)',
                        flexShrink: 0
                      }}
                    >
                      <div style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: '#FFF0D0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        flexShrink: 0
                      }}>
                        {icon}
                      </div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#171717', whiteSpace: 'nowrap' }}>
                        {text || feat}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Counter and CTA Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 3.5, height: 16, backgroundColor: 'rgb(217, 119, 6)', borderRadius: 2 }} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717' }}>
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
                      borderRadius: '9999px',
                      padding: '0.42rem 1.15rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      boxShadow: '0 3px 10px rgba(23, 23, 23, 0.16)',
                      transition: 'all 160ms ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(217, 119, 6)';
                      e.currentTarget.style.color = '#171717';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#171717';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                  >
                    <span>View All Collections</span>
                    <ArrowRight size={13} />
                  </button>
                )}
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
            top: '105px',
            height: 'calc(100vh - 125px)',
            maxHeight: 'calc(100vh - 125px)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 20,
            background: '#ffffff',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-xs)',
            overflow: 'hidden'
          }}>
            {/* ANCHORED FILTER HEADER - NEVER OVERLAPS OR CLIPS */}
            <div style={{ 
              padding: '1.1rem 1.25rem 0.85rem 1.25rem',
              backgroundColor: '#ffffff', 
              borderBottom: '1px solid var(--border-light)', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexShrink: 0
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: '0.98rem', color: 'var(--charcoal-dark)' }}>
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

            {/* SCROLLABLE FILTER BODY */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.4rem',
              scrollbarWidth: 'thin'
            }}>
              {/* Category Filter */}
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--charcoal-dark)', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                  Categories ({CATEGORIES.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
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
                      padding: '5px 8px',
                      borderRadius: '8px',
                      background: selectedCategory === 'all' ? 'var(--secondary-warm)' : 'transparent',
                      transition: 'background 120ms ease'
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
                          padding: '5px 8px',
                          borderRadius: '8px',
                          background: isCatSelected ? 'var(--secondary-warm)' : 'transparent',
                          transition: 'background 120ms ease'
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


              {/* Price Range Slider */}
              <div style={{ paddingBottom: '0.5rem' }}>
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
          .category-hero-container {
            min-height: auto !important;
            background-size: cover !important;
            background-position: right center !important;
          }
          .category-hero-left {
            width: 100% !important;
            max-width: 100% !important;
            padding: 1.5rem 1.25rem !important;
          }
          .category-feature-pills {
            flex-wrap: wrap !important;
          }
        }
        @media (max-width: 860px) {
          .shop-layout-grid { grid-template-columns: 1fr !important; }
          .mobile-filter-btn { display: inline-flex !important; }
          .shop-sidebar {
            display: none;
            position: static !important;
            top: auto !important;
            height: auto !important;
            max-height: none !important;
          }
          .shop-sidebar.mobile-open {
            display: flex !important;
            margin-bottom: 2rem;
            position: static !important;
            top: auto !important;
            height: auto !important;
            max-height: none !important;
          }
        }
      `}</style>
    </div>
  );
};
