import React from 'react';
import { 
  Heart, 
  Award, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Users, 
  Gift, 
  ArrowRight, 
  MessageCircle, 
  CheckCircle2, 
  MapPin, 
  Star,
  ChevronRight,
  PackageCheck,
  Edit3
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { siteConfig } from '../config/siteConfig';

export const AboutUsPage = () => {
  const { navigateTo } = useApp();

  const STATS = [
    { number: '100K+', label: 'Celebrations Delivered', icon: Gift },
    { number: '19,000+', label: 'Serviceable Pincodes', icon: Truck },
    { number: '4.9 / 5', label: 'Average Customer Rating', icon: Star },
    { number: '100%', label: 'Freshness & Quality Guarantee', icon: ShieldCheck }
  ];

  const VALUES = [
    {
      icon: Award,
      title: 'Artisan Quality Guarantee',
      desc: 'From farm-fresh blooms cut just hours before dispatch to handcrafted eggless cakes and Belgian chocolates, we never compromise on excellence.',
      tag: 'Premium Grade'
    },
    {
      icon: Edit3,
      title: 'Master Laser Engraving',
      desc: 'Our in-house studio utilizes high-precision fiber laser and UV printing to customize wooden boxes, drinkware, pens, and wallets with flawless precision.',
      tag: 'Custom Studio'
    },
    {
      icon: Clock,
      title: 'Express & Midnight Delivery',
      desc: 'Timely celebrations matter. We offer same-day express delivery within 4-6 hours across Delhi NCR, Mumbai, Bengaluru and guaranteed midnight surprise slots.',
      tag: 'On-Time Always'
    },
    {
      icon: MessageCircle,
      title: 'Personalized WhatsApp Service',
      desc: 'No confusing forms. Our dedicated gifting specialists assist you directly on WhatsApp with recommendations, custom previews, and live order tracking.',
      tag: 'Dedicated Support'
    }
  ];

  const STEPS = [
    {
      step: '01',
      title: 'Thoughtful Curation',
      desc: 'Browse hundreds of handpicked cakes, blooms, luxury hampers, and personalized keepsakes.'
    },
    {
      step: '02',
      title: 'Bespoke Customization',
      desc: 'Add names, special dates, corporate logos, or heartfelt messages with live previews.'
    },
    {
      step: '03',
      title: 'Signature Gold Packaging',
      desc: 'Every order is lovingly packed in our branded gift boxes, complete with satin ribbons and personalized cards.'
    },
    {
      step: '04',
      title: 'Delivered With Warmth',
      desc: 'Our white-glove delivery partners ensure your surprise arrives in pristine condition, right on time.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#FCFBF9', minHeight: '100vh', paddingBottom: '5rem', color: '#111827' }}>
      
      {/* 1. BREADCRUMB */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #F3EDE4' }}>
        <div className="container" style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem' }}>
          <button 
            onClick={() => navigateTo('home')} 
            style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', padding: 0 }}
          >
            Home
          </button>
          <ChevronRight size={14} color="#9CA3AF" />
          <span style={{ color: 'rgb(217, 119, 6)', fontWeight: 700 }}>About Step IN Gift Mart</span>
        </div>
      </div>

      {/* 2. HERO SHOWCASE SECTION */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #FFFDF8 0%, #FAF5EB 60%, #FFF3DC 100%)',
            borderRadius: '24px',
            border: '1px solid #EFE6D8',
            boxShadow: '0 8px 30px rgba(217, 119, 6, 0.06)',
            padding: '2.5rem 3rem',
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.25fr) minmax(300px, 0.95fr)',
            gap: '3rem',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {/* Subtle background decorative ornament */}
            <div style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(217, 119, 6, 0.08) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            {/* Left Narrative */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: '#FFF2D6',
                border: '1px solid rgba(217, 119, 6, 0.35)',
                padding: '0.35rem 0.9rem',
                borderRadius: '9999px',
                fontSize: '0.74rem',
                fontWeight: 800,
                color: '#92400E',
                letterSpacing: '0.05em',
                marginBottom: '1rem'
              }}>
                <Sparkles size={14} color="rgb(217, 119, 6)" />
                <span>ABOUT STEP IN GIFT MART</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                lineHeight: 1.2,
                margin: 0,
                marginBottom: '1rem',
                color: '#111827'
              }}>
                Where Every Gift Tells a Story of{' '}
                <span style={{ color: 'rgb(217, 119, 6)', position: 'relative', display: 'inline-block' }}>
                  Love & Gratitude
                  <svg width="100%" height="8" viewBox="0 0 240 8" fill="none" style={{ position: 'absolute', bottom: -3, left: 0 }}>
                    <path d="M2 6C80 2 160 2 238 5" stroke="rgb(217, 119, 6)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                  </svg>
                </span>
              </h1>

              <p style={{ fontSize: '0.96rem', color: '#4B5563', lineHeight: 1.65, margin: 0, marginBottom: '1.75rem', maxWidth: '520px' }}>
                Since 2018, Step IN Gift Mart has united master bakers, bespoke florists, and precision laser artisans under one roof — delivering thousands of smiles, warm celebrations, and cherished keepsakes across 19,000+ Indian pincodes.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '1.75rem' }}>
                <button
                  onClick={() => navigateTo('shop')}
                  style={{
                    background: 'rgb(217, 119, 6)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.75rem 1.6rem',
                    borderRadius: '9999px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(217, 119, 6, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#b45309'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgb(217, 119, 6)'}
                >
                  <span>Explore Gift Catalog</span>
                  <ArrowRight size={15} />
                </button>

                <a
                  href={`https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent(siteConfig.whatsAppGreeting)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#25D366',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '9999px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.25)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#20ba5a'}
                  onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
                >
                  <MessageCircle size={16} />
                  <span>Order on WhatsApp</span>
                </a>
              </div>

              {/* Clean inline highlights */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1.25rem',
                fontSize: '0.82rem',
                color: '#4B5563',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(217, 119, 6, 0.15)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={16} color="rgb(217, 119, 6)" />
                  <span style={{ fontWeight: 600 }}>100% Quality Assured</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={16} color="rgb(217, 119, 6)" />
                  <span style={{ fontWeight: 600 }}>Same-Day Express Slots</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={16} color="rgb(217, 119, 6)" />
                  <span style={{ fontWeight: 600 }}>Bespoke Laser Personalization</span>
                </div>
              </div>
            </div>

            {/* Right Visual Presentation - Clean, contained, premium */}
            <div>
              <div style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
                border: '1px solid #EFE6D8',
                backgroundColor: '#F9FAFB'
              }}>
                <img 
                  src="/images/celebration_couple.jpg" 
                  alt="Step IN Gift Mart Gifting Celebrations"
                  style={{
                    width: '100%',
                    height: '350px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* Contained overlay badge inside the image at the bottom */}
                <div style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '14px',
                  right: '14px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(239, 230, 216, 0.8)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: '#FEF3C7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgb(217, 119, 6)'
                    }}>
                      <Heart size={16} fill="rgb(217, 119, 6)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#111827', lineHeight: 1.1 }}>100K+ Celebrations</div>
                      <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>Delivered across 19,000+ pincodes</div>
                    </div>
                  </div>
                  <div style={{
                    background: '#111827',
                    color: '#FBBF24',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    <span>★ 4.9</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. STATS STRIP */}
      <section style={{ padding: '2rem 0 3.5rem' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem'
          }}>
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '18px',
                    padding: '1.6rem 1.4rem',
                    border: '1px solid #EFE6D8',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(217, 119, 6, 0.12)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.03)';
                  }}
                >
                  <div style={{
                    width: 50,
                    height: 50,
                    borderRadius: '14px',
                    background: '#FEF3C7',
                    color: 'rgb(217, 119, 6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#111827', lineHeight: 1.15 }}>
                      {stat.number}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 600, marginTop: '0.15rem' }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. THE STEP IN STORY (HOW IT STARTED) */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#FFFFFF', borderTop: '1px solid #F3EDE4', borderBottom: '1px solid #F3EDE4' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1.15fr)',
            gap: '3.5rem',
            alignItems: 'center'
          }}>
            {/* Visual with Artisan Keepsake */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
                border: '1px solid #EFE6D8'
              }}>
                <img 
                  src="/images/custom_studio_showcase.jpg" 
                  alt="Artisan crafted gifts and laser engraving studio"
                  style={{
                    width: '100%',
                    height: '380px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>

              {/* Founder quote pill */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '1.1rem 1.4rem',
                border: '1px solid #EFE6D8',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
              }}>
                <p style={{ fontSize: '0.86rem', fontStyle: 'italic', color: '#1F2937', margin: 0, marginBottom: '0.4rem', lineHeight: 1.45 }}>
                  "A gift is never just an object. It is a tender reflection of love, gratitude, and remembrance that someone holds close forever."
                </p>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'rgb(217, 119, 6)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  — Step IN Gifting Philosophy
                </div>
              </div>
            </div>

            {/* Story Text */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: '#FFF2D6',
                color: '#92400E',
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.74rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                marginBottom: '0.85rem'
              }}>
                <span>📖 OUR JOURNEY</span>
              </div>

              <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#111827', lineHeight: 1.25, margin: 0, marginBottom: '1.25rem' }}>
                Born in Connaught Place, <br />
                Celebrated Across India
              </h2>

              <p style={{ fontSize: '0.94rem', color: '#4B5563', lineHeight: 1.7, marginBottom: '1rem' }}>
                Step IN began in the historic heart of New Delhi with a simple belief: while life moves faster every day, the heartfelt celebrations that connect families, lovers, and colleagues remain timeless.
              </p>

              <p style={{ fontSize: '0.94rem', color: '#4B5563', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                Too often, online gifting was cold and transactional. We set out to change that by uniting master bakers, bespoke florists, and in-house laser artisans under one roof — ensuring every box is packed with genuine care, tied with satin ribbon, and dispatched with white-glove precision.
              </p>

              <div style={{
                background: '#FAF5EB',
                borderRadius: '16px',
                padding: '1.25rem 1.5rem',
                border: '1px solid #EFE6D8',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="rgb(217, 119, 6)" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#1F2937' }}>100% Pure Veg Cakes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="rgb(217, 119, 6)" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#1F2937' }}>Same-Day Express Slots</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="rgb(217, 119, 6)" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#1F2937' }}>Laser-Precise Engraving</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="rgb(217, 119, 6)" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#1F2937' }}>Live WhatsApp Photos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOUR PILLARS / VALUES */}
      <section style={{ padding: '4.5rem 0 3.5rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: '#FFF2D6',
              color: '#92400E',
              padding: '0.3rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              marginBottom: '0.75rem'
            }}>
              <span>🛡️ THE STEP IN PROMISE</span>
            </div>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#111827', margin: 0, marginBottom: '0.75rem' }}>
              Why Over 100,000 Customers Trust Us
            </h2>
            <p style={{ fontSize: '0.94rem', color: '#6B7280', margin: 0, lineHeight: 1.6 }}>
              Every gift we craft carries an unspoken promise of quality, freshness, and emotional resonance.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '2rem 1.75rem',
                    border: '1px solid #EFE6D8',
                    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(217, 119, 6, 0.12)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.03)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: '14px',
                      background: '#FEF3C7',
                      color: 'rgb(217, 119, 6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={24} />
                    </div>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: 'rgb(217, 119, 6)',
                      background: '#FFF9EF',
                      border: '1px solid #FDE68A',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px'
                    }}>
                      {val.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', margin: 0, marginBottom: '0.65rem' }}>
                    {val.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. HOW WE CRAFT YOUR SURPRISE (4-STEP WORKFLOW) */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#FFFFFF', borderTop: '1px solid #F3EDE4' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', margin: 0, marginBottom: '0.65rem' }}>
              How We Deliver Perfection
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#6B7280', margin: 0 }}>
              From the moment you pick a gift to the moment the ribbon is untied.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '1.5rem'
          }}>
            {STEPS.map((s, idx) => (
              <div 
                key={idx}
                style={{
                  position: 'relative',
                  backgroundColor: '#FCFBF9',
                  borderRadius: '18px',
                  padding: '2rem 1.5rem',
                  border: '1px solid #EFE6D8'
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: 'rgba(217, 119, 6, 0.25)',
                  lineHeight: 1,
                  marginBottom: '0.85rem'
                }}>
                  {s.step}
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0, marginBottom: '0.45rem' }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.55, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PHYSICAL STORE & CORPORATE HEADQUARTERS */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #18181B 0%, #27272A 100%)',
            color: '#FFFFFF',
            borderRadius: '26px',
            padding: '3rem',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.15)',
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 1.2fr) minmax(280px, 1fr)',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'rgba(217, 119, 6, 0.2)',
                color: '#FBBF24',
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.74rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                marginBottom: '1rem',
                border: '1px solid rgba(217, 119, 6, 0.35)'
              }}>
                <MapPin size={13} />
                <span>EXPERIENCE STUDIO & FLAGSHIP STORE</span>
              </div>

              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', margin: 0, marginBottom: '1rem', lineHeight: 1.25 }}>
                Visit Us in Connaught Place, New Delhi
              </h2>

              <p style={{ fontSize: '0.94rem', color: '#D4D4D8', lineHeight: 1.65, margin: 0, marginBottom: '1.75rem' }}>
                {siteConfig.address}. Step into our studio to touch and feel personalized wood finishes, preview live fiber laser engraving, and consult with our celebration styling team.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Clock size={16} color="#FBBF24" />
                  <span style={{ color: '#E4E4E7' }}>{siteConfig.openingHours}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Truck size={16} color="#FBBF24" />
                  <span style={{ color: '#E4E4E7' }}>Pan-India delivery across 19,000+ pincodes</span>
                </div>
              </div>
            </div>

            {/* Right Hamper Showcase */}
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
              border: '2px solid rgba(255, 255, 255, 0.15)'
            }}>
              <img 
                src="/images/why_choose_hamper.jpg" 
                alt="Step IN Gift Mart Luxury Hampers"
                style={{
                  width: '100%',
                  height: '280px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. HIGH IMPACT BOTTOM CTA BANNER */}
      <section style={{ padding: '0 0 2rem' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #FFFDF8 0%, #FFF4DE 50%, #FDE68A 100%)',
            borderRadius: '26px',
            border: '1.5px solid rgba(217, 119, 6, 0.3)',
            padding: '3rem 2.5rem',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(217, 119, 6, 0.12)'
          }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#111827', margin: 0, marginBottom: '0.85rem' }}>
              Ready to Make Someone's Day Extraordinary?
            </h2>
            <p style={{ fontSize: '1rem', color: '#4B5563', maxWidth: '620px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
              Whether it’s a milestone birthday, an anniversary surprise, or bespoke corporate welcome boxes — we're here to craft it with love.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <button
                onClick={() => navigateTo('shop')}
                style={{
                  background: 'rgb(217, 119, 6)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.85rem 2rem',
                  borderRadius: '9999px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 16px rgba(217, 119, 6, 0.35)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#b45309'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgb(217, 119, 6)'}
              >
                <span>Explore Thoughtful Gifts</span>
                <ArrowRight size={16} />
              </button>

              <a
                href={`https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent("Hi Step IN Gift Mart! I would like some assistance picking the perfect gift.")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#25D366',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  padding: '0.85rem 1.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#20ba5a'}
                onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
