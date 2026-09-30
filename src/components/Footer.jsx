import React from 'react';
import { 
  Gift, 
  Phone, 
  Mail, 
  MapPin, 
  Heart 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';

export const Footer = () => {
  const { navigateTo, brand } = useApp();

  return (
    <footer style={{ backgroundColor: '#171717', color: '#c7c7c7', paddingTop: '3.5rem', paddingBottom: '2.5rem', borderTop: '1px solid #262626' }}>
      <div className="container">
        {/* 5 Column Navigation Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr repeat(4, 1fr)',
          gap: '2.5rem',
          paddingBottom: '3.5rem',
          borderBottom: '1px solid #262626'
        }} className="footer-cols">
          
          {/* Brand Info */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <Logo onClick={() => navigateTo('home')} lightMode={true} height={44} />
            </div>
            <p style={{ fontSize: '0.88rem', color: '#d4d4d4', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              “Thoughtful Gifts for Every Special Moment” — India’s premier gifting marketplace crafting memories with artisan flowers, cakes, hampers, and laser-personalized surprises.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                {
                  name: 'Instagram',
                  href: 'https://instagram.com',
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  )
                },
                {
                  name: 'Facebook',
                  href: 'https://facebook.com',
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  )
                },
                {
                  name: 'YouTube',
                  href: 'https://youtube.com',
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.5l5.75 3.26-5.75 3.26z"/>
                    </svg>
                  )
                },
                {
                  name: 'Pinterest',
                  href: 'https://pinterest.com',
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a10 10 0 0 0-3.66 19.31c-.05-.83-.1-2.1.02-3l1.15-4.88s-.29-.58-.29-1.44c0-1.35.78-2.36 1.76-2.36.83 0 1.23.62 1.23 1.37 0 .84-.53 2.09-.81 3.25-.23.97.48 1.76 1.44 1.76 1.73 0 3.06-1.82 3.06-4.45 0-2.33-1.67-3.95-4.06-3.95-2.76 0-4.38 2.07-4.38 4.21 0 .83.32 1.73.72 2.22a.3.3 0 0 1 .07.29c-.08.33-.26 1.05-.3 1.2-.05.19-.16.23-.37.14-1.38-.64-2.24-2.65-2.24-4.27 0-3.48 2.53-6.68 7.3-6.68 3.83 0 6.81 2.73 6.81 6.38 0 3.8-2.4 6.87-5.73 6.87-1.12 0-2.17-.58-2.53-1.27l-.69 2.63c-.25.96-.92 2.16-1.38 2.89A10 10 0 1 0 12 2z"/>
                    </svg>
                  )
                }
              ].map(soc => (
                <a 
                  key={soc.name} 
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={soc.name}
                  aria-label={soc.name}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: '#262626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#ffffff',
                    transition: 'all 200ms ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary)';
                    e.currentTarget.style.color = '#171717';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#262626';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.98rem', fontWeight: 700, marginBottom: '1.15rem' }}>Shop Gifts</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem' }}>
              <li><a href="#all" onClick={(e) => { e.preventDefault(); navigateTo('shop'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>All Gifts</a></li>
              <li><a href="#personalized" onClick={(e) => { e.preventDefault(); navigateTo('personalized-gifts'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Personalized Gifts</a></li>
              <li><a href="#flowers" onClick={(e) => { e.preventDefault(); navigateTo('shop', { category: 'flowers' }); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Fresh Flowers</a></li>
              <li><a href="#cakes" onClick={(e) => { e.preventDefault(); navigateTo('shop', { category: 'cakes' }); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Designer Cakes</a></li>
              <li><a href="#chocolates" onClick={(e) => { e.preventDefault(); navigateTo('shop', { category: 'chocolates' }); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Chocolates & Truffles</a></li>
              <li><a href="#plants" onClick={(e) => { e.preventDefault(); navigateTo('shop', { category: 'plants' }); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Lush Plants</a></li>
              <li><a href="#hampers" onClick={(e) => { e.preventDefault(); navigateTo('gift-hampers'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Luxury Hampers</a></li>
              <li><a href="#corporate" onClick={(e) => { e.preventDefault(); navigateTo('corporate-gifting'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Corporate Gifts</a></li>
            </ul>
          </div>

          {/* Occasions */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.98rem', fontWeight: 700, marginBottom: '1.15rem' }}>Occasions</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem' }}>
              <li><a href="#birthday" onClick={(e) => { e.preventDefault(); navigateTo('shop', { occasion: 'birthday' }); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Birthday</a></li>
              <li><a href="#anniversary" onClick={(e) => { e.preventDefault(); navigateTo('shop', { occasion: 'anniversary' }); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Anniversary</a></li>
              <li><a href="#wedding" onClick={(e) => { e.preventDefault(); navigateTo('shop', { occasion: 'wedding' }); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Wedding</a></li>
              <li><a href="#festivals" onClick={(e) => { e.preventDefault(); navigateTo('shop', { occasion: 'festivals' }); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Festivals & Diwali</a></li>
              <li><a href="#housewarming" onClick={(e) => { e.preventDefault(); navigateTo('shop', { occasion: 'housewarming' }); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Housewarming</a></li>
              <li><a href="#baby-shower" onClick={(e) => { e.preventDefault(); navigateTo('shop', { occasion: 'baby-shower' }); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Baby Shower</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.98rem', fontWeight: 700, marginBottom: '1.15rem' }}>Customer Care</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem' }}>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact-us'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Contact Us</a></li>
              <li><a href="#custom-gifts" onClick={(e) => { e.preventDefault(); navigateTo('custom-gifts'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Custom Gifts & Proofs</a></li>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); navigateTo('faq-delivery'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>FAQs & Delivery Slots</a></li>
              <li><a href="#shipping" onClick={(e) => { e.preventDefault(); navigateTo('faq-delivery'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Pan-India Pincodes</a></li>
              <li><a href="#policy" onClick={(e) => { e.preventDefault(); navigateTo('faq-delivery'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Returns & Zero-Breakage</a></li>
            </ul>
          </div>

          {/* Company & Policies */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.98rem', fontWeight: 700, marginBottom: '1.15rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem' }}>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); navigateTo('about-us'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>About Us</a></li>
              <li><a href="#blog" onClick={(e) => { e.preventDefault(); navigateTo('blog'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Gift Inspiration Blog</a></li>
              <li><a href="#corporate-page" onClick={(e) => { e.preventDefault(); navigateTo('corporate-gifting'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Corporate Gifting</a></li>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); navigateTo('about-us'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); navigateTo('about-us'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Terms & Conditions</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: '2.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: '#6B6B6B' }}>
          <div>
            © 2026 Step IN Gift Mart Online Services Pvt. Ltd. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <span>Razorpay Secured</span>
            <span>•</span>
            <span>Delhivery Integrated</span>
            <span>•</span>
            <span>100% Genuine Quality Guarantee</span>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-cols { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .footer-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
};
