import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactUsPage = () => {
  const { showToast, brand } = useApp();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'Order Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    showToast('Your message has been received! Our support team will reply within 30 minutes.');
  };

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
                <span style={{ fontSize: '0.95rem' }}>💬</span>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#171717', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  WE ARE HERE FOR YOU
                </span>
              </div>

              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0.35rem' }}>
                <h1 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0 }}>
                  <span style={{ color: '#171717' }}>Contact </span>
                  <span style={{ color: '#F5A800' }}>Our Team</span>
                </h1>
                <div style={{ position: 'absolute', top: '-6px', right: '-32px', pointerEvents: 'none' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="#F5A800" strokeWidth="2.5" strokeLinecap="round" opacity="0.9"/>
                  </svg>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.48, marginBottom: '0.85rem', maxWidth: '500px' }}>
                Have questions about an upcoming delivery, custom laser engraving, or corporate bulk gifting? We are ready to assist.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {[
                  { icon: '⚡', text: '30-Min Fast Reply' },
                  { icon: '📞', text: 'Call & WhatsApp' },
                  { icon: '📦', text: 'Live Order Tracking' },
                  { icon: '⭐', text: '100% Delight Guarantee' }
                ].map((pill, idx) => (
                  <div key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#ffffff', border: '1px solid #EFE4D2', borderRadius: '11px', padding: '0.24rem 0.6rem 0.24rem 0.35rem' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: '#FFF0D0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem' }}>
                      {pill.icon}
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#171717', whiteSpace: 'nowrap' }}>{pill.text}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 3, height: 16, backgroundColor: '#F5A800', borderRadius: 2 }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717' }}>
                  Customer Support Active: 9:00 AM – 8:00 PM IST
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div style={{ position: 'relative', height: '100%', minHeight: '235px', display: 'flex', alignItems: 'stretch', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '12px', right: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3, pointerEvents: 'none' }}>
                <span style={{ fontFamily: "'Caveat', cursive", fontSize: '1.35rem', fontWeight: 700, color: '#171717', transform: 'rotate(-4deg)', letterSpacing: '0.02em', whiteSpace: 'nowrap', textShadow: '0 1px 4px rgba(255, 255, 255, 0.95)' }}>
                  Always Delighted To Help
                </span>
                <svg width="75" height="9" viewBox="0 0 85 10" fill="none" style={{ marginTop: '-4px' }}>
                  <path d="M2 7C22 2 62 2 83 6" stroke="#F5A800" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              <div style={{ position: 'absolute', top: 10, right: 14, color: '#F5A800', opacity: 0.45, fontSize: '1.2rem', zIndex: 3, pointerEvents: 'none' }}>✦</div>

              <img
                src="/images/recipient_employees.jpg"
                alt="Step IN Gift Mart Customer Care"
                style={{ width: '100%', height: '100%', minHeight: '235px', objectFit: 'cover', objectPosition: 'center', borderRadius: '44px 0 0 44px', display: 'block' }}
              />
            </div>
          </div>
        </div>

        {/* 2-Column: Form + Contact Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'flex-start', marginBottom: '4rem' }} className="contact-grid">
          
          {/* Contact Form */}
          <div style={{ background: 'var(--secondary-warm)', padding: '2.5rem', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--secondary-border)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle2 size={52} color="var(--accent-emerald)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--charcoal-muted)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                  Thank you for reaching out. A dedicated gift consultant has received your message.
                </p>
                <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--charcoal-dark)', marginBottom: '1.25rem' }}>
                  Send Us a Direct Note
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Your Name:</label>
                    <input 
                      type="text" 
                      required 
                      className="form-input" 
                      placeholder="e.g. Aarav Patel"
                      value={form.name} 
                      onChange={(e) => setForm({ ...form, name: e.target.value })} 
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Phone Number:</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      placeholder="+91 98765 43210"
                      value={form.phone} 
                      onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Email Address:</label>
                  <input 
                    type="email" 
                    required 
                    className="form-input" 
                    placeholder="name@example.com"
                    value={form.email} 
                    onChange={(e) => setForm({ ...form, email: e.target.value })} 
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Subject:</label>
                  <select 
                    className="form-select"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  >
                    <option value="Order Inquiry">Order Inquiry / Delivery Status</option>
                    <option value="Custom Personalization">Custom Personalization Support</option>
                    <option value="Corporate Gifting">Corporate Bulk Gifting</option>
                    <option value="Feedback">Feedback or Compliment</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Message:</label>
                  <textarea 
                    rows={4} 
                    required 
                    className="form-textarea" 
                    placeholder="How can we assist your celebration?"
                    value={form.message} 
                    onChange={(e) => setForm({ ...form, message: e.target.value })} 
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ gap: 6 }}>
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Details Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <Phone size={20} />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>Phone Support</h4>
              <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>{brand.supportPhone}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)', marginTop: 2 }}>Instant help with delivery slots & changes</div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <Mail size={20} />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>Email Support</h4>
              <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>{brand.supportEmail}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)', marginTop: 2 }}>Average response time: under 30 minutes</div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <Clock size={20} />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>Operating Hours</h4>
              <div style={{ fontSize: '0.92rem', color: 'var(--charcoal-dark)', fontWeight: 600 }}>{brand.businessHours}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)', marginTop: 2 }}>Midnight dispatch teams active until 1:00 AM</div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <MapPin size={20} />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>Headquarters & Fulfilment Hub</h4>
              <div style={{ fontSize: '0.88rem', color: 'var(--charcoal-body)', lineHeight: 1.5 }}>
                Step IN Gift Mart Commerce Pvt. Ltd.<br />
                Plot 18, Block B, Outer Ring Road, Connaught Place, New Delhi - 110001
              </div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 800px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
