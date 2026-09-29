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
            <p style={{ fontSize: '0.86rem', color: '#6B6B6B', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              “Thoughtful Gifts for Every Special Moment” — India’s premier gifting marketplace crafting memories with artisan flowers, cakes, hampers, and laser-personalized surprises.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['Instagram', 'Facebook', 'YouTube', 'Pinterest'].map(soc => (
                <span 
                  key={soc} 
                  title={soc}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: '#262626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    color: '#ffffff',
                    transition: 'background 150ms'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#262626'}
                >
                  {soc[0]}
                </span>
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
              <li><a href="#track" onClick={(e) => { e.preventDefault(); navigateTo('track-order'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Track Order</a></li>
              <li><a href="#account" onClick={(e) => { e.preventDefault(); navigateTo('account'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>My Account</a></li>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); navigateTo('contact-us'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>FAQs</a></li>
              <li><a href="#shipping" onClick={(e) => { e.preventDefault(); navigateTo('about-us'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Shipping & Delivery</a></li>
              <li><a href="#returns" onClick={(e) => { e.preventDefault(); navigateTo('about-us'); }} style={{ color: '#a8a29e', textDecoration: 'none' }}>Returns & Refunds</a></li>
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
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('admin')}
                  style={{
                    marginTop: '0.5rem',
                    background: '#262626',
                    border: '1px solid #3d3d3d',
                    color: '#ffffff',
                    padding: '0.4rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Admin Operations Portal
                </button>
              </li>
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
