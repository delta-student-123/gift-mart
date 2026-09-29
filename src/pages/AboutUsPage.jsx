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
  Gift
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutUsPage = () => {
  const { navigateTo } = useApp();

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '85vh', padding: '3.5rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: 980 }}>
        
        {/* Header Hero */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag" style={{ background: '#fdf2f8', color: 'var(--primary)' }}>
            <Heart size={14} />
            <span>OUR STORY & VALUES</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--charcoal-dark)', lineHeight: 1.2, marginBottom: '1.25rem' }}>
            We Deliver Not Just Gifts, <br />
            <span style={{ color: 'var(--primary)' }}>But Unforgettable Joy.</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--charcoal-body)', maxWidth: 680, margin: '0 auto', lineHeight: 1.6 }}>
            At <strong>Step IN Gift Mart</strong>, we believe every special milestone in life deserves to be celebrated with genuine thoughtfulness, exquisite craftsmanship, and seamless delight.
          </p>
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
