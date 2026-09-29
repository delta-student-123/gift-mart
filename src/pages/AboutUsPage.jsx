import React from 'react';
import { 
  Heart, 
  Award, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Smile, 
  Users,
  Gift,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutUsPage = () => {
  const { navigateTo } = useApp();

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '85vh', padding: '2rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: 1040 }}>
        
        {/* SIGNATURE HERO BANNER */}
        <div style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          marginBottom: '3.5rem',
          border: '1.5px solid rgba(245, 168, 0, 0.22)',
          background: 'linear-gradient(135deg, #FFFDF8 0%, #FFF9EF 45%, #FFF2DB 100%)',
          boxShadow: '0 4px 18px rgba(245, 168, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.02)',
          padding: 0,
          width: '100%',
          minHeight: '235px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(340px, 1.25fr) minmax(280px, 1fr)',
            alignItems: 'stretch',
            gap: 0,
            minHeight: '235px'
          }}>
            {/* LEFT COLUMN */}
            <div style={{ padding: '1.4rem 1.25rem 1.4rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                background: '#FFF2D6',
                border: '1px solid rgba(245, 168, 0, 0.45)',
                padding: '4px 12px',
                borderRadius: '9999px',
                marginBottom: '0.45rem',
                alignSelf: 'flex-start'
              }}>
                <span style={{ fontSize: '0.95rem' }}>💝</span>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#171717', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  OUR STORY & VALUES
                </span>
              </div>

              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0.35rem' }}>
                <h1 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0 }}>
                  <span style={{ color: '#171717' }}>About </span>
                  <span style={{ color: '#F5A800' }}>Step IN</span>
                </h1>
                <div style={{ position: 'absolute', top: '-6px', right: '-32px', pointerEvents: 'none' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="#F5A800" strokeWidth="2.5" strokeLinecap="round" opacity="0.9"/>
                  </svg>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.48, marginBottom: '0.85rem', maxWidth: '500px' }}>
                Delivering heartfelt celebrations, bespoke artisan keepsakes & master-engraved personalized gifts across India since 2018.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {[
                  { icon: '⭐', text: '4.9/5 Rating' },
                  { icon: '🚚', text: 'Express Delivery' },
                  { icon: '✨', text: 'Free Laser Engraving' },
                  { icon: '❤️', text: '100K+ Celebrations' }
                ].map((pill, idx) => (
                  <div key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#ffffff', border: '1px solid #EFE4D2', borderRadius: '11px', padding: '0.24rem 0.6rem 0.24rem 0.35rem' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: '#FFF0D0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem' }}>
                      {pill.icon}
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#171717', whiteSpace: 'nowrap' }}>{pill.text}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  onClick={() => navigateTo('shop')}
                  style={{
                    background: '#171717',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '0.45rem 1.25rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: '0 3px 10px rgba(23, 23, 23, 0.18)'
                  }}
                >
                  <span>Explore Gift Catalog</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div style={{ position: 'relative', height: '100%', minHeight: '235px', display: 'flex', alignItems: 'stretch', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '12px', right: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3, pointerEvents: 'none' }}>
                <span style={{ fontFamily: "'Caveat', cursive", fontSize: '1.35rem', fontWeight: 700, color: '#171717', transform: 'rotate(-4deg)', letterSpacing: '0.02em', whiteSpace: 'nowrap', textShadow: '0 1px 4px rgba(255, 255, 255, 0.95)' }}>
                  Spreading Pure Happiness
                </span>
                <svg width="75" height="9" viewBox="0 0 85 10" fill="none" style={{ marginTop: '-4px' }}>
                  <path d="M2 7C22 2 62 2 83 6" stroke="#F5A800" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              <div style={{ position: 'absolute', top: 10, right: 14, color: '#F5A800', opacity: 0.45, fontSize: '1.2rem', zIndex: 3, pointerEvents: 'none' }}>✦</div>

              <img
                src="/images/celebration_couple.jpg"
                alt="Step IN Gift Mart Gifting Celebrations"
                style={{ width: '100%', height: '100%', minHeight: '235px', objectFit: 'cover', objectPosition: 'center', borderRadius: '44px 0 0 44px', display: 'block' }}
              />
            </div>
          </div>
        </div>

        {/* 1. Brand Story */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '5rem',
          background: 'var(--secondary-warm)',
          borderRadius: 'var(--radius-2xl)',
          padding: '2.5rem',
          border: '1px solid var(--secondary-border)'
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
              HOW IT STARTED
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--charcoal-dark)', marginBottom: '1rem' }}>
              The Step IN Gift Mart Story
            </h2>
            <p style={{ fontSize: '0.94rem', color: 'var(--charcoal-body)', lineHeight: 1.6, marginBottom: '1rem' }}>
              Step IN Gift Mart began with a simple yet powerful observation: while life moves faster every day, the heartfelt celebrations that connect families and friends remain timeless.
            </p>
            <p style={{ fontSize: '0.94rem', color: 'var(--charcoal-body)', lineHeight: 1.6 }}>
              We set out to reinvent the modern Indian gifting experience — pairing the speed of same-day temperature-controlled express delivery with the warmth of artisan bespoke florists, master bakers, and laser-crafted personalized treasures.
            </p>
          </div>
          <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', height: 320, boxShadow: 'var(--shadow-md)' }}>
            <img 
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80" 
              alt="Step IN Gift Mart Crafts" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* 2. Our Mission & Vision */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--charcoal-dark)', marginBottom: '1rem' }}>
            Our Mission & Commitment
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--charcoal-body)', maxWidth: 720, margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            “To empower everyone to express genuine gratitude, celebrate milestones, and bridge distances effortlessly through thoughtfully curated, beautifully packed gifts delivered right on time.”
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                icon: Award,
                title: 'Quality Promise',
                desc: 'Every floral arrangement is cut fresh daily; designer cakes are 100% vegetarian and baked just hours before delivery.'
              },
              {
                icon: Smile,
                title: 'Customer First',
                desc: 'We are dedicated to customer delight. If anything falls short, our instant replacement guarantee makes it right immediately.'
              },
              {
                icon: Clock,
                title: 'Delivery Commitment',
                desc: 'Special celebrations can’t wait. We offer guaranteed midnight surprise delivery and 2-hour express slots across 12+ metros.'
              }
            ].map(card => {
              const Icon = card.icon;
              return (
                <div 
                  key={card.title}
                  style={{
                    background: '#ffffff',
                    padding: '1.75rem',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: 'var(--shadow-xs)',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--charcoal-dark)', marginBottom: '0.5rem' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--charcoal-muted)', lineHeight: 1.5 }}>
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Core Values */}
        <div style={{
          background: 'var(--primary-dark)',
          color: '#ffffff',
          borderRadius: 'var(--radius-2xl)',
          padding: '3rem 2.5rem',
          marginBottom: '4rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
            Our Four Core Pillars
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: 4 }}>🌸</div>
              <strong style={{ fontSize: '1rem', display: 'block', marginBottom: 4 }}>Artisanal Care</strong>
              <span style={{ fontSize: '0.82rem', color: '#fce4ec' }}>Handcrafted with pride by local master florists & bakers</span>
            </div>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: 4 }}>✨</div>
              <strong style={{ fontSize: '1rem', display: 'block', marginBottom: 4 }}>Personalization</strong>
              <span style={{ fontSize: '0.82rem', color: '#fce4ec' }}>Turn cherished memories into timeless engraved keepsakes</span>
            </div>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: 4 }}>⚡</div>
              <strong style={{ fontSize: '1rem', display: 'block', marginBottom: 4 }}>Reliability</strong>
              <span style={{ fontSize: '0.82rem', color: '#fce4ec' }}>99.4% on-time delivery record backed by Delhivery</span>
            </div>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: 4 }}>🤝</div>
              <strong style={{ fontSize: '1rem', display: 'block', marginBottom: 4 }}>Trust & Safety</strong>
              <span style={{ fontSize: '0.82rem', color: '#fce4ec' }}>Razorpay 256-bit encrypted checkout with buyer protection</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-primary btn-lg" onClick={() => navigateTo('shop')}>
            Explore Thoughtful Gifts
          </button>
        </div>

      </div>
    </div>
  );
};
