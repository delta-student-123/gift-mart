import React, { useState } from 'react';
import { 
  Heart, 
  Cake, 
  Sparkles, 
  Gift, 
  PartyPopper, 
  Home, 
  Briefcase, 
  ArrowRight,
  ChevronRight,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const OccasionsPage = () => {
  const { productsList, navigateTo } = useApp();
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [budgetFilter, setBudgetFilter] = useState('all');

  const OCCASIONS = [
    { id: 'All', label: 'All Occasions', icon: '✨' },
    { id: 'Anniversary', label: 'Anniversary & Romance', icon: '💍' },
    { id: 'Birthday', label: 'Birthday Celebrations', icon: '🎂' },
    { id: 'Festivals', label: 'Festivals & Diwali', icon: '🪔' },
    { id: 'Wedding', label: 'Wedding & Housewarming', icon: '💐' },
    { id: 'Corporate', label: 'Corporate & Milestones', icon: '💼' }
  ];

  const BUDGETS = [
    { id: 'all', label: 'All Budgets' },
    { id: 'under-1000', label: 'Under ₹1,000' },
    { id: '1000-2000', label: '₹1,000 – ₹2,000' },
    { id: 'above-2000', label: 'Above ₹2,000' }
  ];

  // Filter products
  const filteredProducts = productsList.filter(product => {
    // Occasion filter
    if (selectedOccasion !== 'All') {
      const occMatch = product.occasion?.toLowerCase() === selectedOccasion.toLowerCase() ||
                       product.tags?.some(t => t.toLowerCase().includes(selectedOccasion.toLowerCase()));
      if (!occMatch) return false;
    }

    // Budget filter
    if (budgetFilter === 'under-1000' && product.price >= 1000) return false;
    if (budgetFilter === '1000-2000' && (product.price < 1000 || product.price > 2000)) return false;
    if (budgetFilter === 'above-2000' && product.price <= 2000) return false;

    return true;
  });

  return (
    <div style={{ backgroundColor: '#FCFBF9', minHeight: '90vh', padding: '1.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: 1200 }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.45rem', 
          fontSize: '0.84rem', 
          color: 'var(--charcoal-muted)', 
          marginBottom: '1.75rem' 
        }}>
          <span 
            onClick={() => navigateTo('home')} 
            style={{ cursor: 'pointer', color: 'var(--charcoal-dark)', fontWeight: 600, transition: 'color 150ms' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--charcoal-dark)'}
          >
            Home
          </span>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Occasions & Curated Collections</span>
        </div>

        {/* HERO SECTION */}
        <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            background: '#FFF2D6',
            border: '1px solid rgba(217, 119, 6, 0.45)',
            padding: '5px 14px',
            borderRadius: '9999px',
            marginBottom: '0.75rem'
          }}>
            <Sparkles size={13} color="#D97706" />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#92400E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              CURATED CELEBRATION COLLECTIONS
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.1rem, 3.6vw, 2.9rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: '#171717',
            marginBottom: '0.75rem'
          }}>
            Thoughtful Gifts for Every <span style={{ color: 'rgb(217, 119, 6)' }}>Special Moment</span>
          </h1>

          <p style={{ fontSize: '0.98rem', color: '#525252', lineHeight: 1.6, margin: 0 }}>
            From romantic anniversaries to festive celebrations, browse hand-picked gift hampers, cakes, fresh flowers, and laser-personalized keepsakes ready for WhatsApp ordering.
          </p>
        </div>

        {/* CURATED HIGHLIGHT BANNERS (e.g. Anniversary under 1000) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem'
        }}>
          {/* Card 1: Anniversary Special */}
          <div 
            onClick={() => {
              setSelectedOccasion('Anniversary');
              setBudgetFilter('under-1000');
            }}
            style={{
              background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
              border: '1.5px solid #FECDD3',
              borderRadius: '20px',
              padding: '1.6rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 15px rgba(244, 63, 94, 0.08)',
              transition: 'transform 200ms ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
          >
            <div>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#E11D48', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                POPULAR COLLECTION
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#881337', margin: '4px 0 6px' }}>
                Anniversary Gifts Under ₹1,000
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#9F1239', margin: 0 }}>
                Custom Spotify frames, vegan leather wallets & red velvet treats.
              </p>
            </div>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#E11D48',
              flexShrink: 0
            }}>
              <ArrowRight size={20} />
            </div>
          </div>

          {/* Card 2: Birthday Surprises */}
          <div 
            onClick={() => {
              setSelectedOccasion('Birthday');
              setBudgetFilter('all');
            }}
            style={{
              background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
              border: '1.5px solid #FDE68A',
              borderRadius: '20px',
              padding: '1.6rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 15px rgba(217, 119, 6, 0.08)',
              transition: 'transform 200ms ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
          >
            <div>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                SAME-DAY DISPATCH
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#78350F', margin: '4px 0 6px' }}>
                Birthday Hampers & Cakes
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#92400E', margin: 0 }}>
                Belgian chocolate cakes, smart LED flasks & personalized mugs.
              </p>
            </div>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#D97706',
              flexShrink: 0
            }}>
              <ArrowRight size={20} />
            </div>
          </div>
        </div>

        {/* OCCASION TABS & BUDGET FILTERS */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #EFEAE2',
          padding: '1.25rem 1.5rem',
          marginBottom: '2.5rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)'
        }}>
          {/* Occasions row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', borderBottom: '1px solid #F3F4F6' }}>
            {OCCASIONS.map(occ => {
              const isActive = selectedOccasion === occ.id;
              return (
                <button
                  key={occ.id}
                  onClick={() => setSelectedOccasion(occ.id)}
                  style={{
                    padding: '0.55rem 1.15rem',
                    borderRadius: '9999px',
                    border: isActive ? '1.5px solid rgb(217, 119, 6)' : '1px solid #E5E7EB',
                    background: isActive ? '#FFF8E7' : '#FAFAFA',
                    color: isActive ? '#171717' : '#525252',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 150ms ease'
                  }}
                >
                  <span>{occ.icon}</span>
                  <span>{occ.label}</span>
                </button>
              );
            })}
          </div>

          {/* Budget row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#737373', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Filter by Budget:
            </span>
            {BUDGETS.map(b => (
              <button
                key={b.id}
                onClick={() => setBudgetFilter(b.id)}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  border: budgetFilter === b.id ? '1px solid #171717' : '1px solid #E5E7EB',
                  background: budgetFilter === b.id ? '#171717' : '#ffffff',
                  color: budgetFilter === b.id ? '#ffffff' : '#525252',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#171717', margin: 0 }}>
              Showing {filteredProducts.length} Curated Gifts
            </h2>
            <span style={{ fontSize: '0.82rem', color: '#737373' }}>
              Direct WhatsApp Ordering Available
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#ffffff', borderRadius: '20px', border: '1px solid #EFEAE2' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎁</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#171717', marginBottom: '0.5rem' }}>
                No gifts found in this price bracket
              </h3>
              <p style={{ color: '#737373', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                Try resetting your budget or choosing another occasion.
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSelectedOccasion('All');
                  setBudgetFilter('all');
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
