import React, { useState } from 'react';
import { 
  Gift, 
  MapPin, 
  Search, 
  Heart, 
  User, 
  X,
  ChevronDown,
  Menu,
  Building,
  Sparkles,
  Calendar,
  MessageCircle,
  HelpCircle,
  Package
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { siteConfig } from '../config/siteConfig';

export const Navbar = () => {
  const { 
    currentView, 
    viewParams,
    navigateTo, 
    wishlist, 
    pincode, 
    pincodeInfo, 
    checkPincode,
    productsList,
    openProductDetail,
    brand
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [tempPincode, setTempPincode] = useState(pincode);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const SHOP_CATEGORIES = [
    { id: 'all', name: 'All Gifts & Hampers', icon: '🎁' },
    { id: 'religious-idols', name: 'Religious Idols & Statues', icon: '🪔' },
    { id: 'flowers', name: 'Fresh Flower Bouquets', icon: '💐' },
    { id: 'hampers', name: 'Luxury Gift Hampers', icon: '🧺' },
    { id: 'personalized', name: 'Personalized & Laser Gifts', icon: '✨' },
    { id: 'bottles', name: 'Drinkware & Insulated Flasks', icon: '🍶' },
    { id: 'wallets', name: 'Leather Wallets & Sets', icon: '💼' },
    { id: 'lamps', name: '3D Optical LED Lamps', icon: '💡' },
    { id: 'mugs', name: 'Customized Photo Mugs', icon: '☕' }
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#ffffff', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
      
      {/* 1. TOP ANNOUNCEMENT / UTILITY BAR */}
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

            <span 
              onClick={() => navigateTo('faq-delivery')}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: '#e5e7eb' }}
            >
              <HelpCircle size={12} color="var(--primary)" />
              <span>Delivery Info</span>
            </span>

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

      {/* 2. MAIN HEADER ROW: Logo, Search Bar, Account, Wishlist, WhatsApp Button */}
      <div style={{ padding: '0.85rem 0', borderBottom: '1px solid var(--border-light)' }}>
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
                placeholder="Search idols, flowers, hampers, bottles, wallets, lamps..."
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
                    <img src={p.image || (p.images && p.images[0])} alt={p.name} style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
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

          {/* Right Action Icons: Account, Wishlist, WhatsApp Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
            {/* Account */}
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

            {/* Direct WhatsApp Ordering Button (Replaces Cart) */}
            <a
              href={`https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent(siteConfig.whatsAppGreeting)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: '#25D366',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '0.52rem 1.2rem',
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                fontWeight: 800,
                fontSize: '0.86rem',
                transition: 'all 180ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(37, 211, 102, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 211, 102, 0.35)';
              }}
            >
              <MessageCircle size={18} />
              <span>Order on WhatsApp</span>
            </a>

          </div>

        </div>
      </div>

      {/* 3. MAIN NAVIGATION BAR: Home | Shop (dropdown) | Occasions | Custom Gifts | Corporate | About | Contact */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <nav style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1.25rem', 
            overflowX: 'auto', 
            padding: '0.55rem 0', 
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}>
            {/* Home */}
            <button
              type="button"
              onClick={() => navigateTo('home')}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '0.88rem',
                fontWeight: currentView === 'home' ? 800 : 600,
                color: currentView === 'home' ? 'var(--primary)' : 'var(--charcoal-dark)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                padding: '0.35rem 0.5rem'
              }}
            >
              Home
            </button>

            {/* Shop with Category Dropdown */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setShowShopDropdown(true)}
              onMouseLeave={() => setShowShopDropdown(false)}
            >
              <button
                type="button"
                onClick={() => navigateTo('shop')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.88rem',
                  fontWeight: currentView === 'shop' ? 800 : 600,
                  color: currentView === 'shop' ? 'var(--primary)' : 'var(--charcoal-dark)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  whiteSpace: 'nowrap',
                  padding: '0.35rem 0.5rem'
                }}
              >
                <span>Shop Catalog</span>
                <ChevronDown size={14} />
              </button>

              {/* Shop Categories Mega Dropdown */}
              {showShopDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '280px',
                  background: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
                  border: '1px solid #EFEAE2',
                  padding: '0.65rem',
                  zIndex: 200
                }}>
                  {SHOP_CATEGORIES.map(cat => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        navigateTo('shop', { category: cat.id });
                        setShowShopDropdown(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '0.55rem 0.85rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        color: '#171717',
                        transition: 'background 150ms'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#FFF8E7';
                        e.currentTarget.style.color = '#B45309';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#171717';
                      }}
                    >
                      <span style={{ fontSize: '1rem' }}>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Occasions */}
            <button
              type="button"
              onClick={() => navigateTo('occasions')}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '0.88rem',
                fontWeight: currentView === 'occasions' ? 800 : 600,
                color: currentView === 'occasions' ? 'var(--primary)' : 'var(--charcoal-dark)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                padding: '0.35rem 0.5rem'
              }}
            >
              Occasions
            </button>

            {/* Custom Gifts */}
            <button
              type="button"
              onClick={() => navigateTo('custom-gifts')}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '0.88rem',
                fontWeight: currentView === 'custom-gifts' ? 800 : 600,
                color: currentView === 'custom-gifts' ? 'var(--primary)' : 'var(--charcoal-dark)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                padding: '0.35rem 0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: 5
              }}
            >
              <Sparkles size={14} color="rgb(217, 119, 6)" />
              <span>Custom Gifts</span>
            </button>


            {/* About */}
            <button
              type="button"
              onClick={() => navigateTo('about-us')}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '0.88rem',
                fontWeight: currentView === 'about-us' ? 800 : 600,
                color: currentView === 'about-us' ? 'var(--primary)' : 'var(--charcoal-dark)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                padding: '0.35rem 0.5rem'
              }}
            >
              About
            </button>

            {/* Contact */}
            <button
              type="button"
              onClick={() => navigateTo('contact-us')}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '0.88rem',
                fontWeight: currentView === 'contact-us' ? 800 : 600,
                color: currentView === 'contact-us' ? 'var(--primary)' : 'var(--charcoal-dark)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                padding: '0.35rem 0.5rem'
              }}
            >
              Contact
            </button>

            {/* FAQ / Delivery Info */}
            <button
              type="button"
              onClick={() => navigateTo('faq-delivery')}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '0.88rem',
                fontWeight: currentView === 'faq-delivery' ? 800 : 600,
                color: currentView === 'faq-delivery' ? 'var(--primary)' : 'var(--charcoal-dark)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                padding: '0.35rem 0.5rem'
              }}
            >
              FAQ / Delivery
            </button>
          </nav>
        </div>
      </div>

      {/* Pincode Change Modal */}
      {showPincodeModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            maxWidth: 420,
            width: '100%',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Select Delivery Location</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--charcoal-muted)', marginBottom: '1.5rem' }}>
              Enter your 6-digit delivery pincode to see availability for flowers, idols, and personalized gifts.
            </p>

            <form onSubmit={handlePincodeSave}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  maxLength={6}
                  value={tempPincode}
                  onChange={(e) => setTempPincode(e.target.value.replace(/\D/g, ''))}
                  className="form-input"
                  placeholder="Enter 6-digit Pincode"
                  style={{ fontSize: '1rem' }}
                />
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>

            <button
              type="button"
              onClick={() => setShowPincodeModal(false)}
              className="btn btn-secondary btn-block"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 250,
          display: 'flex',
          justifyContent: 'flex-start'
        }}>
          <div style={{
            width: '80%',
            maxWidth: 320,
            background: '#ffffff',
            height: '100%',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Logo size={36} />
              <button onClick={() => setIsMobileMenuOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
              <button 
                onClick={() => { navigateTo('home'); setIsMobileMenuOpen(false); }}
                style={{ textAlign: 'left', padding: '0.75rem', background: '#F9FAFB', border: 'none', borderRadius: '8px', fontWeight: 700 }}
              >
                Home
              </button>
              <button 
                onClick={() => { navigateTo('shop'); setIsMobileMenuOpen(false); }}
                style={{ textAlign: 'left', padding: '0.75rem', background: '#F9FAFB', border: 'none', borderRadius: '8px', fontWeight: 700 }}
              >
                Shop Catalog
              </button>
              <button 
                onClick={() => { navigateTo('occasions'); setIsMobileMenuOpen(false); }}
                style={{ textAlign: 'left', padding: '0.75rem', background: '#F9FAFB', border: 'none', borderRadius: '8px', fontWeight: 700 }}
              >
                Occasions
              </button>
              <button 
                onClick={() => { navigateTo('custom-gifts'); setIsMobileMenuOpen(false); }}
                style={{ textAlign: 'left', padding: '0.75rem', background: '#F9FAFB', border: 'none', borderRadius: '8px', fontWeight: 700 }}
              >
                Custom Gifts
              </button>
              <button 
                onClick={() => { navigateTo('corporate-gifting'); setIsMobileMenuOpen(false); }}
                style={{ textAlign: 'left', padding: '0.75rem', background: '#F9FAFB', border: 'none', borderRadius: '8px', fontWeight: 700 }}
              >
                Corporate Gifting
              </button>
              <button 
                onClick={() => { navigateTo('about-us'); setIsMobileMenuOpen(false); }}
                style={{ textAlign: 'left', padding: '0.75rem', background: '#F9FAFB', border: 'none', borderRadius: '8px', fontWeight: 700 }}
              >
                About Us
              </button>
              <button 
                onClick={() => { navigateTo('contact-us'); setIsMobileMenuOpen(false); }}
                style={{ textAlign: 'left', padding: '0.75rem', background: '#F9FAFB', border: 'none', borderRadius: '8px', fontWeight: 700 }}
              >
                Contact Us
              </button>
              <button 
                onClick={() => { navigateTo('faq-delivery'); setIsMobileMenuOpen(false); }}
                style={{ textAlign: 'left', padding: '0.75rem', background: '#F9FAFB', border: 'none', borderRadius: '8px', fontWeight: 700 }}
              >
                FAQ & Delivery
              </button>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
              <a
                href={`https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent(siteConfig.whatsAppGreeting)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  background: '#25D366',
                  color: '#ffffff',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  padding: '0.75rem',
                  fontWeight: 800,
                  fontSize: '0.9rem'
                }}
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-search { display: none !important; }
          .mobile-hamburger { display: block !important; }
        }
      `}</style>
    </header>
  );
};
