import React, { useState } from 'react';
import { 
  Gift, 
  MapPin, 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Clock, 
  Truck,
  X,
  ChevronDown,
  Menu,
  Zap,
  Tag,
  Building,
  Sparkles,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';

export const Navbar = () => {
  const { 
    currentView, 
    viewParams,
    navigateTo, 
    cart, 
    wishlist, 
    setIsCartOpen, 
    pincode, 
    pincodeInfo, 
    checkPincode,
    productsList,
    openProductDetail,
    brand
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [tempPincode, setTempPincode] = useState(pincode);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Live Search filter
  const searchResults = searchQuery.trim().length > 1
    ? productsList.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handlePincodeSave = (e) => {
    e.preventDefault();
    if (tempPincode) {
      checkPincode(tempPincode);
      setShowPincodeModal(false);
    }
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#ffffff', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
      
      {/* 1. TOP ANNOUNCEMENT / UTILITY BAR (Giftana Style) */}
      <div style={{ backgroundColor: 'var(--charcoal-dark)', fontSize: '0.78rem', color: '#ffffff', padding: '0.45rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--primary)', fontWeight: 700 }}>
              🚚 Free Pan-India Delivery on Orders Over ₹500
            </span>
            <span style={{ color: '#6B6B6B' }}>|</span>
            <span style={{ color: '#e5e7eb' }}>
              ⚡ 100% Free Name & Logo Laser Engraving
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontWeight: 600 }}>
            {/* Delivering To Selector */}
            <div 
              onClick={() => setShowPincodeModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', color: '#e5e7eb' }}
            >
              <MapPin size={12} color="var(--primary)" />
              <span>Deliver To:</span>
              <strong style={{ color: 'var(--primary)' }}>
                {pincodeInfo ? `${pincodeInfo.city} (${pincode})` : `${pincode}`}
              </strong>
            </div>

            {/* Highlighted Track Order Button */}
            <button 
              type="button"
              onClick={() => navigateTo('track-order')}
              style={{
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                background: 'linear-gradient(135deg, #F5A800 0%, #df9900 100%)',
                color: '#171717',
                border: 'none',
                padding: '0.22rem 0.75rem',
                borderRadius: '20px',
                fontWeight: 800,
                fontSize: '0.74rem',
                boxShadow: '0 0 10px rgba(245, 168, 0, 0.45)',
                letterSpacing: '0.02em',
                transition: 'all 150ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 0 14px rgba(245, 168, 0, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 10px rgba(245, 168, 0, 0.45)';
              }}
            >
              <Truck size={13} color="#171717" />
              <span>Track Order</span>
              <span style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#15803d',
                boxShadow: '0 0 4px #22c55e'
              }} />
            </button>

            <span 
              onClick={() => navigateTo('corporate-gifting')}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: 'var(--primary)', fontWeight: 700 }}
            >
              <Building size={12} />
              <span>Bulk Gifting</span>
            </span>
          </div>

        </div>
      </div>

      {/* 2. MAIN HEADER ROW */}
      <div style={{ padding: '0.9rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: 4
            }}
            className="mobile-hamburger"
          >
            <Menu size={24} color="var(--charcoal-dark)" />
          </button>

          {/* Logo: Step In Gift Mart */}
          <Logo onClick={() => navigateTo('home')} size={48} />

          {/* Search Bar with Live Suggestions */}
          <div style={{ position: 'relative', flex: 1, maxWidth: '460px' }} className="desktop-search">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#ffffff',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--border-subtle)',
              padding: '0.45rem 1rem',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <Search size={17} color="var(--charcoal-muted)" style={{ marginRight: '0.5rem', flexShrink: 0 }} />
              <input 
                type="text"
                placeholder="Search customized bottles, welcome kits, diary sets, wallets, lamps..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '0.88rem',
                  fontFamily: 'inherit',
                  color: 'var(--charcoal-dark)'
                }}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--charcoal-muted)' }}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Dropdown Live Results */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '110%',
                left: 0,
                right: 0,
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                zIndex: 50
              }}>
                <div style={{ padding: '0.5rem 0.85rem', fontSize: '0.74rem', fontWeight: 800, color: 'var(--charcoal-muted)', borderBottom: '1px solid var(--border-light)' }}>
                  MATCHING GIFTS ({searchResults.length})
                </div>
                {searchResults.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      openProductDetail(p);
                      setShowSearchDropdown(false);
                      setSearchQuery('');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.65rem 0.85rem',
                      cursor: 'pointer',
                      borderBottom: '1px solid var(--border-light)',
                      transition: 'background 150ms'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--secondary-warm)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                  >
                    <img src={p.image} alt={p.name} style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--charcoal-dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--primary)', fontWeight: 700 }}>
                        ₹{p.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons: Wishlist, Account, Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
            {/* Account / Dashboard */}
            <button
              type="button"
              onClick={() => navigateTo('account')}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: currentView === 'account' ? 'var(--primary)' : 'var(--charcoal-dark)',
                fontSize: '0.72rem',
                fontWeight: 600
              }}
            >
              <User size={20} />
              <span>Account</span>
            </button>

            {/* Wishlist */}
            <button
              type="button"
              onClick={() => navigateTo('wishlist')}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: currentView === 'wishlist' ? 'var(--primary)' : 'var(--charcoal-dark)',
                fontSize: '0.72rem',
                fontWeight: 600
              }}
            >
              <Heart size={20} />
              <span>Wishlist</span>
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: -4,
                  right: 2,
                  background: 'var(--primary)',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  width: 17,
                  height: 17,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #F5A800 0%, #E89A00 100%)',
                color: '#171717',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '0.5rem 1.15rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(245, 168, 0, 0.35)',
                fontWeight: 800,
                fontSize: '0.88rem',
                transition: 'all 180ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(245, 168, 0, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(245, 168, 0, 0.35)';
              }}
            >
              <div style={{ position: 'relative' }}>
                <ShoppingBag size={18} strokeWidth={2.4} />
                {totalCartCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: -7,
                    right: -9,
                    background: '#171717',
                    color: '#ffffff',
                    fontSize: '0.68rem',
                    fontWeight: 900,
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.3)'
                  }}>
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </button>

          </div>

        </div>
      </div>

      {/* 3. MAIN NAVIGATION BAR */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.6rem', 
            overflowX: 'auto', 
            padding: '0.65rem 0', 
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}>
            {[
              { id: 'all', label: 'All Gifts', icon: '', action: () => navigateTo('shop', { category: 'all' }) },
              { id: 'welcome-kits', label: 'Welcome Kits', icon: '🎁', action: () => navigateTo('shop', { category: 'welcome-kits' }) },
              { id: 'bottles', label: 'Drinkware & Flasks', icon: '🍶', action: () => navigateTo('shop', { category: 'bottles' }) },
              { id: 'wallets', label: 'Wallets & Leather', icon: '💼', action: () => navigateTo('shop', { category: 'wallets' }) },
              { id: 'pens', label: 'Executive Pens', icon: '✍️', action: () => navigateTo('shop', { category: 'pens' }) },
              { id: 'diaries', label: 'Diaries & Planners', icon: '📖', action: () => navigateTo('shop', { category: 'diaries' }) },
              { id: 'lamps', label: '3D Lamps', icon: '✨', action: () => navigateTo('shop', { category: 'lamps' }) },
              { id: 'mugs', label: 'Customized Mugs', icon: '☕', action: () => navigateTo('shop', { category: 'mugs' }) },
              { id: 'hampers', label: 'Hampers', icon: '🧺', action: () => navigateTo('shop', { category: 'hampers' }) },
              { id: 'corporate-gifting', label: 'Corporate Gifting', icon: '', action: () => navigateTo('corporate-gifting') },
              { id: 'gift-finder', label: 'Gift Finder', icon: '🎁', action: () => navigateTo('gift-finder') }
            ].map(cat => {
              const isActive = (currentView === 'shop' && (viewParams?.category || 'all') === cat.id) || currentView === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={cat.action}
                  style={{
                    flexShrink: 0,
                    background: isActive ? '#171717' : '#FFFFFF',
                    border: isActive ? '1px solid #171717' : '1px solid #E5E7EB',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.4rem 0.95rem',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.84rem',
                    color: isActive ? '#FFFFFF' : 'var(--charcoal-dark)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: isActive ? '0 3px 10px rgba(23, 23, 23, 0.22)' : '0 1px 2px rgba(0, 0, 0, 0.03)',
                    transform: isActive ? 'translateY(-1px)' : 'none',
                    transition: 'all 160ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.background = '#FFF9ED';
                      e.currentTarget.style.color = '#171717';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 2px 6px rgba(245, 168, 0, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.background = '#FFFFFF';
                      e.currentTarget.style.color = 'var(--charcoal-dark)';
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.03)';
                    }
                  }}
                >
                  {cat.icon && <span style={{ fontSize: '0.92rem' }}>{cat.icon}</span>}
                  <span>{cat.label}</span>
                </button>
              );
            })}

            <button
              onClick={() => navigateTo('corporate-gifting')}
              style={{
                flexShrink: 0,
                background: 'linear-gradient(135deg, #F5A800 0%, #E89A00 100%)',
                border: '1px solid #D98500',
                borderRadius: 'var(--radius-full)',
                padding: '0.4rem 1rem',
                fontWeight: 700,
                fontSize: '0.84rem',
                color: '#171717',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                boxShadow: '0 2px 8px rgba(245, 168, 0, 0.35)',
                transition: 'all 160ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 168, 0, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(245, 168, 0, 0.35)';
              }}
            >
              <span style={{ fontSize: '0.92rem' }}>⚡</span>
              <span>Bulk RFQ Quote</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pincode Change Modal */}
      {showPincodeModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          padding: '1rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            maxWidth: 440,
            width: '100%',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-xl)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowPincodeModal(false)}
              style={{ position: 'absolute', top: 16, right: 16, border: 'none', background: 'transparent', cursor: 'pointer' }}
            >
              <X size={20} color="var(--charcoal-muted)" />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
              <MapPin size={22} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Select Delivery Location</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-muted)', marginBottom: '1.25rem' }}>
              Enter your Indian delivery pincode to see available delivery slots, express delivery timings & serviceability.
            </p>

            <form onSubmit={handlePincodeSave}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input 
                  type="text"
                  maxLength={6}
                  value={tempPincode}
                  onChange={(e) => setTempPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 110001, 400001, 560001"
                  className="form-input"
                  style={{ fontWeight: 700, letterSpacing: '0.1em' }}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Check
                </button>
              </div>
            </form>

            <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)' }}>
              Popular Indian Cities: 
              {['110001 (Delhi)', '400001 (Mumbai)', '560001 (Bengaluru)', '700001 (Kolkata)', '500001 (Hyderabad)'].map(pop => (
                <button
                  key={pop}
                  type="button"
                  onClick={() => {
                    const pin = pop.slice(0, 6);
                    setTempPincode(pin);
                    checkPincode(pin);
                    setShowPincodeModal(false);
                  }}
                  style={{
                    border: 'none',
                    background: 'var(--secondary-warm)',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    margin: '3px',
                    fontSize: '0.74rem',
                    cursor: 'pointer',
                    color: 'var(--charcoal-dark)'
                  }}
                >
                  {pop}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Style for responsive layout */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-search { display: none !important; }
          .mobile-hamburger { display: block !important; }
        }
      `}</style>
    </header>
  );
};
