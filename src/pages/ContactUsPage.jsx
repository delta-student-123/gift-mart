import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Building,
  ArrowRight,
  Navigation
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactUsPage = () => {
  const { showToast, brand, navigateTo } = useApp();
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    orderNumber: '',
    subject: 'Personalization & Custom Design', 
    message: '' 
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill in your name, email and message.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your inquiry has been submitted! A gifting specialist will reply within 30 minutes.');
  };

  const FAQS = [
    {
      q: 'Can I preview my laser-engraved name or company logo before dispatch?',
      a: 'Yes, absolutely! On personalized items, you can use our live 3D visual studio on the product page. For bulk corporate orders or custom logo requirements, our design desk shares a high-resolution digital mock-up via WhatsApp or email for your sign-off before laser etching.'
    },
    {
      q: 'How quickly can you deliver urgent celebration orders?',
      a: 'We offer express Same-Day delivery across Delhi NCR, Mumbai, Bengaluru, Hyderabad, and Kolkata for orders placed before 5:00 PM IST. For other pincodes, our courier partners dispatch orders within 24 to 48 hours.'
    },
    {
      q: 'What if I need to change the greeting card note or recipient address?',
      a: 'If you need to make changes to your personalized greeting card message, delivery slot, or doorstep address, please reach out to us via WhatsApp or Phone within 2 hours of booking, and our team will update your details immediately.'
    },
    {
      q: 'Do you offer bulk corporate pricing and GST invoices?',
      a: 'Yes! We provide tier-based corporate discounts of up to 40% on bulk quantities (10+ units) with factory-direct pricing, custom company branding, and complete B2B GST tax invoices with input tax credit (ITC).'
    }
  ];

  return (
    <div style={{ backgroundColor: '#FCFBF9', minHeight: '90vh', padding: '2.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: 1120 }}>

        {/* HERO HEADER */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            background: '#FFF2D6',
            border: '1px solid rgba(217, 119, 6, 0.45)',
            padding: '5px 14px',
            borderRadius: '9999px',
            marginBottom: '0.85rem'
          }}>
            <Sparkles size={13} color="#D97706" />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#92400E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              WE ARE HERE FOR YOU
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.1rem, 3.8vw, 2.9rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: '#171717',
            marginBottom: '0.85rem'
          }}>
            Let’s Make Your Gifting <span style={{ color: 'rgb(217, 119, 6)' }}>Unforgettable</span>
          </h1>

          <p style={{
            fontSize: '1rem',
            color: '#525252',
            lineHeight: 1.6,
            margin: 0
          }}>
            Have questions about custom laser engraving, urgent celebration deliveries, or bespoke corporate hampers? Connect directly with our dedicated gifting consultants.
          </p>
        </div>

        {/* 4 CONTACT CHANNELS CARDS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3.5rem'
        }}>
          {/* Card 1: Phone Support */}
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #EFEAE2',
              padding: '1.65rem 1.4rem',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'rgba(217, 119, 6, 0.45)';
              e.currentTarget.style.boxShadow = '0 16px 36px rgba(217, 119, 6, 0.12), 0 4px 14px rgba(0, 0, 0, 0.04)';
              const icon = e.currentTarget.querySelector('.channel-icon');
              if (icon) icon.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#EFEAE2';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.03)';
              const icon = e.currentTarget.querySelector('.channel-icon');
              if (icon) icon.style.transform = 'scale(1)';
            }}
          >
            <div>
              <div 
                className="channel-icon"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '14px',
                  background: '#FEF3C7',
                  color: '#D97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  transition: 'transform 0.25s ease'
                }}
              >
                <Phone size={22} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#171717', margin: '0 0 0.35rem' }}>
                Helpline Support
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#737373', lineHeight: 1.5, margin: '0 0 1rem' }}>
                Instant phone assistance for orders and custom requests.
              </p>
            </div>
            <div>
              <a 
                href={`tel:${brand?.supportPhone || '+9101149208000'}`} 
                style={{ 
                  fontSize: '0.96rem', 
                  fontWeight: 800, 
                  color: '#171717', 
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <span>{brand?.supportPhone || '+91 (011) 4920-8000'}</span>
                <ArrowRight size={14} color="rgb(217, 119, 6)" />
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp Chat */}
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #EFEAE2',
              padding: '1.65rem 1.4rem',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'rgba(21, 128, 61, 0.45)';
              e.currentTarget.style.boxShadow = '0 16px 36px rgba(21, 128, 61, 0.12), 0 4px 14px rgba(0, 0, 0, 0.04)';
              const icon = e.currentTarget.querySelector('.channel-icon');
              if (icon) icon.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#EFEAE2';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.03)';
              const icon = e.currentTarget.querySelector('.channel-icon');
              if (icon) icon.style.transform = 'scale(1)';
            }}
          >
            <div>
              <div 
                className="channel-icon"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '14px',
                  background: '#DCFCE7',
                  color: '#15803D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  transition: 'transform 0.25s ease'
                }}
              >
                <MessageCircle size={22} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#171717', margin: '0 0 0.35rem' }}>
                WhatsApp Concierge
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#737373', lineHeight: 1.5, margin: '0 0 1rem' }}>
                Share custom logos & get instant digital design previews.
              </p>
            </div>
            <div>
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  fontSize: '0.96rem', 
                  fontWeight: 800, 
                  color: '#15803D', 
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <span>+91 98765 43210</span>
                <ArrowRight size={14} color="#15803D" />
              </a>
            </div>
          </div>

          {/* Card 3: Email Support */}
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #EFEAE2',
              padding: '1.65rem 1.4rem',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.45)';
              e.currentTarget.style.boxShadow = '0 16px 36px rgba(37, 99, 235, 0.12), 0 4px 14px rgba(0, 0, 0, 0.04)';
              const icon = e.currentTarget.querySelector('.channel-icon');
              if (icon) icon.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#EFEAE2';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.03)';
              const icon = e.currentTarget.querySelector('.channel-icon');
              if (icon) icon.style.transform = 'scale(1)';
            }}
          >
            <div>
              <div 
                className="channel-icon"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '14px',
                  background: '#EFF6FF',
                  color: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  transition: 'transform 0.25s ease'
                }}
              >
                <Mail size={22} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#171717', margin: '0 0 0.35rem' }}>
                Email Support
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#737373', lineHeight: 1.5, margin: '0 0 1rem' }}>
                Corporate RFQs, gifting collaborations & vendor inquiries.
              </p>
            </div>
            <div>
              <a 
                href={`mailto:${brand?.supportEmail || 'care@stepingiftmart.com'}`} 
                style={{ 
                  fontSize: '0.92rem', 
                  fontWeight: 800, 
                  color: '#171717', 
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <span>{brand?.supportEmail || 'care@stepingiftmart.com'}</span>
                <ArrowRight size={14} color="rgb(217, 119, 6)" />
              </a>
            </div>
          </div>

          {/* Card 4: Experience Center */}
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #EFEAE2',
              padding: '1.65rem 1.4rem',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'rgba(147, 51, 234, 0.45)';
              e.currentTarget.style.boxShadow = '0 16px 36px rgba(147, 51, 234, 0.12), 0 4px 14px rgba(0, 0, 0, 0.04)';
              const icon = e.currentTarget.querySelector('.channel-icon');
              if (icon) icon.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#EFEAE2';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.03)';
              const icon = e.currentTarget.querySelector('.channel-icon');
              if (icon) icon.style.transform = 'scale(1)';
            }}
          >
            <div>
              <div 
                className="channel-icon"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '14px',
                  background: '#F3E8FF',
                  color: '#9333EA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  transition: 'transform 0.25s ease'
                }}
              >
                <MapPin size={22} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#171717', margin: '0 0 0.35rem' }}>
                Showroom & Hub
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#737373', lineHeight: 1.5, margin: '0 0 1rem' }}>
                Connaught Place Corporate Gifting Studio, New Delhi 110001
              </p>
            </div>
            <div>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#525252' }}>
                Mon – Sat: 9 AM to 9 PM IST
              </span>
            </div>
          </div>
        </div>

        {/* 2-COLUMN MAIN CONTENT: CONTACT FORM (LEFT) + SUPPORT & FAQS (RIGHT) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
          gap: '2.5rem',
          alignItems: 'flex-start'
        }} className="contact-main-grid">

          {/* LEFT: INTERACTIVE MESSAGE FORM */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '1px solid #EAE4D9',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ marginBottom: '1.75rem' }}>
              <span style={{ 
                fontSize: '0.78rem', 
                fontWeight: 800, 
                color: '#B45309', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em' 
              }}>
                SEND A MESSAGE
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#171717', margin: '0.35rem 0 0.5rem' }}>
                How Can We Help You Today?
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#737373', margin: 0 }}>
                Fill out the details below and a dedicated consultant will follow up shortly.
              </p>
            </div>

            {submitted ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '3.5rem 1.5rem', 
                background: '#F0FDF4', 
                borderRadius: '18px', 
                border: '1.5px solid #BBF7D0' 
              }}>
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: '#DCFCE7',
                  color: '#16A34A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem'
                }}>
                  <CheckCircle2 size={34} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#14532D', marginBottom: '0.5rem' }}>
                  Inquiry Received!
                </h3>
                <p style={{ color: '#166534', fontSize: '0.92rem', maxWidth: '420px', margin: '0 auto 1.75rem', lineHeight: 1.5 }}>
                  Thank you, <strong>{form.name}</strong>. Your message regarding <em>"{form.subject}"</em> has been routed to our gifting team. Expect a reply within 30 minutes.
                </p>
                <button 
                  type="button"
                  className="btn btn-primary" 
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', phone: '', orderNumber: '', subject: 'Personalization & Custom Design', message: '' });
                  }}
                  style={{ padding: '0.65rem 1.5rem', fontWeight: 700 }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Topic selection pills */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: '0.65rem' }}>
                    Select Topic:
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {[
                      'Personalization & Custom Design',
                      'Corporate Bulk Gifting',
                      'Delivery & Address Change',
                      'Order Status & Invoicing',
                      'General Question'
                    ].map(topic => {
                      const isSelected = form.subject === topic;
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setForm({ ...form, subject: topic })}
                          style={{
                            padding: '0.45rem 0.95rem',
                            borderRadius: '9999px',
                            border: isSelected ? '1.5px solid rgb(217, 119, 6)' : '1px solid #E5E7EB',
                            background: isSelected ? '#FFF8E7' : '#FAFAFA',
                            color: isSelected ? '#171717' : '#525252',
                            fontWeight: isSelected ? 800 : 500,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            transition: 'all 150ms ease'
                          }}
                        >
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Phone Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }} className="contact-form-row">
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: 5 }}>
                      Full Name <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="form-input" 
                      placeholder="e.g. Vikram Sharma"
                      value={form.name} 
                      onChange={(e) => setForm({ ...form, name: e.target.value })} 
                      style={{ borderRadius: '12px', padding: '0.65rem 0.95rem', fontSize: '0.9rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: 5 }}>
                      Phone / WhatsApp Number
                    </label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      placeholder="+91 98765 43210"
                      value={form.phone} 
                      onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                      style={{ borderRadius: '12px', padding: '0.65rem 0.95rem', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                {/* Email & Order ID Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.9fr', gap: '1.25rem', marginBottom: '1.25rem' }} className="contact-form-row">
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: 5 }}>
                      Email Address <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input 
                      type="email" 
                      required 
                      className="form-input" 
                      placeholder="vikram@example.com"
                      value={form.email} 
                      onChange={(e) => setForm({ ...form, email: e.target.value })} 
                      style={{ borderRadius: '12px', padding: '0.65rem 0.95rem', fontSize: '0.9rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: 5 }}>
                      Order ID (Optional)
                    </label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. ORD-94810"
                      value={form.orderNumber} 
                      onChange={(e) => setForm({ ...form, orderNumber: e.target.value })} 
                      style={{ borderRadius: '12px', padding: '0.65rem 0.95rem', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                {/* Message TextArea */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: 5 }}>
                    Your Message / Customization Request <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <textarea 
                    rows={4} 
                    required 
                    className="form-textarea" 
                    placeholder="Tell us what you need (e.g. custom laser engraving details, delivery date requirements, or corporate bulk quantities)..."
                    value={form.message} 
                    onChange={(e) => setForm({ ...form, message: e.target.value })} 
                    style={{ borderRadius: '12px', padding: '0.75rem 0.95rem', fontSize: '0.9rem' }}
                  />
                </div>

                {/* Submit CTA */}
                <button 
                  type="submit" 
                  className="btn btn-gold btn-block btn-lg" 
                  style={{ 
                    padding: '0.85rem 1.5rem',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    letterSpacing: '0.02em',
                    boxShadow: '0 4px 15px rgba(217, 119, 6, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8
                  }}
                >
                  <Send size={16} />
                  <span>Send Message Directly</span>
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: SUPPORT STATUS, ACCORDION FAQS, & CORPORATE CARD */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Live Support Hours Badge */}
            <div style={{
              background: '#171717',
              color: '#ffffff',
              borderRadius: '20px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              border: '1px solid #333333',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <span style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  backgroundColor: '#22C55E',
                  boxShadow: '0 0 10px #22C55E',
                  display: 'inline-block'
                }} />
              </div>
              <div>
                <div style={{ fontSize: '0.74rem', color: '#22C55E', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  CONSULTANTS ACTIVE NOW
                </div>
                <div style={{ fontSize: '0.96rem', fontWeight: 700, marginTop: 2 }}>
                  Monday – Saturday • 9:00 AM – 9:00 PM IST
                </div>
                <div style={{ fontSize: '0.78rem', color: '#A3A3A3', marginTop: 3 }}>
                  Average response turnaround under 15 minutes.
                </div>
              </div>
            </div>

            {/* Interactive FAQs Accordion */}
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '1px solid #EFEAE2',
              padding: '1.75rem 1.5rem',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1.15rem' }}>
                <Clock size={16} color="#D97706" />
                <h3 style={{ fontSize: '1.12rem', fontWeight: 800, color: '#171717', margin: 0 }}>
                  Quick Help & Common Answers
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx}
                      style={{
                        border: '1px solid',
                        borderColor: isOpen ? 'rgb(217, 119, 6)' : '#F0ECE1',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        backgroundColor: isOpen ? '#FFFCF5' : '#ffffff',
                        transition: 'all 160ms ease'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.75rem',
                          padding: '0.85rem 1rem',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <span style={{ fontSize: '0.86rem', fontWeight: 700, color: isOpen ? '#92400E' : '#171717' }}>
                          {faq.q}
                        </span>
                        {isOpen ? <ChevronUp size={16} color="#B45309" /> : <ChevronDown size={16} color="#737373" />}
                      </button>
                      
                      {isOpen && (
                        <div style={{ padding: '0 1rem 0.95rem', fontSize: '0.82rem', color: '#525252', lineHeight: 1.55 }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Corporate Gifting Promo Card */}
            <div style={{
              background: 'linear-gradient(135deg, #FFF9ED 0%, #FFF3D6 100%)',
              border: '1.5px solid rgba(217, 119, 6, 0.4)',
              borderRadius: '22px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D97706',
                  boxShadow: '0 2px 8px rgba(217, 119, 6, 0.2)'
                }}>
                  <Building size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#171717', margin: 0 }}>
                    Planning Corporate / Bulk Orders?
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: '#78350F', margin: '2px 0 0' }}>
                    Custom onboarding kits & festive hampers for 50+ members
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <button
                  type="button"
                  onClick={() => window.open('https://wa.me/919971112444?text=' + encodeURIComponent('Hi Step In Gift Mart, I would like to inquire about corporate/bulk order gifting.'), '_blank')}
                  style={{
                    background: '#171717',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.55rem 1.15rem',
                    borderRadius: '9999px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 150ms ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#25D366';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#171717';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  <MessageCircle size={15} />
                  <span>Enquire on WhatsApp</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* 3. EMBEDDED SHOWROOM MAP & DIRECTIONS */}
        <div style={{
          marginTop: '3.5rem',
          background: '#ffffff',
          borderRadius: '24px',
          border: '1px solid #EFEAE2',
          overflow: 'hidden',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)'
        }}>
          {/* Header Strip */}
          <div style={{
            padding: '1.75rem 2rem',
            borderBottom: '1px solid #F3F4F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            background: 'linear-gradient(to right, #FFFDF8, #FFFFFF)'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: '#FEF3C7',
                padding: '0.2rem 0.65rem',
                borderRadius: '9999px',
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#B45309',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '0.35rem'
              }}>
                <MapPin size={12} color="#D97706" />
                <span>VISIT OUR EXPERIENCE STUDIO</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#171717', margin: 0 }}>
                Connaught Place Gifting Flagship & Workshop
              </h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Connaught+Place+New+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgb(217, 119, 6)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 2px 10px rgba(217, 119, 6, 0.25)',
                  transition: 'background 150ms'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b45309'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgb(217, 119, 6)'}
              >
                <Navigation size={14} />
                <span>Get Directions (Google Maps)</span>
              </a>

              <a
                href={`tel:${brand?.supportPhone || '+9101149208000'}`}
                style={{
                  background: '#171717',
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '0.6rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'background 150ms'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#333333'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#171717'}
              >
                <Phone size={14} />
                <span>Call Studio</span>
              </a>
            </div>
          </div>

          {/* 2-Column Content: Studio Highlights (Left) + Interactive OpenStreetMap (Right) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 1fr) minmax(320px, 1.4fr)',
            alignItems: 'stretch'
          }} className="studio-map-grid">
            
            {/* Left Column: Studio Perks, Address, Metro Info */}
            <div style={{
              padding: '2rem',
              backgroundColor: '#FFFDF9',
              borderRight: '1px solid #F3F4F6',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.5rem'
            }}>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#171717', margin: '0 0 0.85rem' }}>
                  Location & Arrival Info
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: '#525252' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <MapPin size={16} color="rgb(217, 119, 6)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <strong style={{ color: '#171717' }}>Address:</strong> Shop 14, Inner Circle (Block D), Connaught Place, New Delhi – 110001
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <Navigation size={16} color="#2563EB" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <strong style={{ color: '#171717' }}>Metro:</strong> Rajiv Chowk (Exit Gate 4) — 2 mins walking distance.
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <Clock size={16} color="#15803D" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <strong style={{ color: '#171717' }}>Studio Hours:</strong> Monday – Saturday: 9:00 AM – 9:00 PM | Sunday: 10:00 AM – 7:00 PM
                    </div>
                  </div>
                </div>
              </div>

              {/* In-Store Studio Experience Badges */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '1.25rem',
                border: '1px solid #EFEAE2',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
              }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.65rem' }}>
                  In-Store Workshop Perks
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem', fontSize: '0.82rem', color: '#374151' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={15} color="#16A34A" />
                    <span>⚡ 15-Minute Live Laser Personalization</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={15} color="#16A34A" />
                    <span>🎁 Bespoke Ribbon & Velvet Trunk Packaging Bar</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={15} color="#16A34A" />
                    <span>📦 Online Order Collection & Urgent Same-Day Pickups</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: OpenStreetMap Interactive Map */}
            <div style={{ position: 'relative', minHeight: '360px', backgroundColor: '#F3F4F6' }}>
              <iframe
                title="Step IN Gift Mart Connaught Place Store Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.2110%2C28.6270%2C77.2260%2C28.6380&amp;layer=mapnik&amp;marker=28.6328%2C77.2197"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '360px', width: '100%', display: 'block' }}
                loading="lazy"
              />

              {/* Floating Pin Card on top of the map */}
              <div style={{
                position: 'absolute',
                top: 16,
                left: 16,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                padding: '0.6rem 0.9rem',
                border: '1px solid #EFEAE2',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                pointerEvents: 'none'
              }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'rgb(217, 119, 6)', boxShadow: '0 0 8px rgb(217, 119, 6)' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#171717' }}>
                  Connaught Place, New Delhi
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 860px) {
          .studio-map-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .contact-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
