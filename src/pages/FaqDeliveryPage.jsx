import React, { useState } from 'react';
import { 
  Truck, 
  Clock, 
  CreditCard, 
  RotateCcw, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  ShieldCheck, 
  MessageCircle, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { siteConfig } from '../config/siteConfig';

export const FaqDeliveryPage = () => {
  const { navigateTo } = useApp();
  const [openFaq, setOpenFaq] = useState(0);

  const deliverySlots = [
    {
      title: 'Standard Delivery',
      time: '10:00 AM – 7:00 PM',
      cost: 'FREE on orders over ₹500',
      desc: 'Dispatched via premium express couriers (Bluedart, Delhivery). Delivery within 24 to 48 hours.'
    },
    {
      title: 'Same-Day Express',
      time: 'Within 4 – 6 Hours',
      cost: '₹149 Flat Fee',
      desc: 'Available across Delhi NCR, Mumbai, Bengaluru, Hyderabad, and Kolkata for orders placed before 5 PM IST.'
    },
    {
      title: 'Midnight Celebration Delivery',
      time: '11:15 PM – 12:00 Midnight',
      cost: '₹249 Flat Fee',
      desc: 'Make birthdays and anniversaries magical with surprise doorstep delivery right at 12:00 AM.'
    }
  ];

  const paymentSteps = [
    {
      step: '1',
      title: 'Browse & Tap "Order on WhatsApp"',
      desc: 'Choose your product, pick your desired size/flavour/color, and add your custom engraving text or message.'
    },
    {
      step: '2',
      title: 'Message Auto-Fills on WhatsApp',
      desc: 'Clicking the button opens our verified WhatsApp desk with your selected options and delivery details pre-filled.'
    },
    {
      step: '3',
      title: 'Confirm & Secure Payment',
      desc: 'Our team verifies stock & delivery slot. Pay securely via UPI (Google Pay, PhonePe, Paytm), Card/NetBanking link, or COD.'
    },
    {
      step: '4',
      title: 'Live Tracking & Delivery',
      desc: 'Receive live tracking links, packaging photographs, and doorstep delivery updates right inside your WhatsApp chat.'
    }
  ];

  const faqs = [
    {
      q: 'Which cities and pincodes do you deliver to?',
      a: 'We deliver to over 19,000 pincodes across India. All metro cities, tier-1, tier-2, and most tier-3 towns are fully covered with doorstep air and ground express courier service.'
    },
    {
      q: 'How does ordering on WhatsApp work if there is no cart checkout?',
      a: 'Our catalog is designed for personal service. When you tap "Order on WhatsApp", your exact product selection, options, and custom name/text are automatically formatted into a WhatsApp message. You simply hit send, and our dedicated gifting specialist confirms your order, shares payment details, and keeps you updated until delivery.'
    },
    {
      q: 'Can I pay via Google Pay, PhonePe, or Credit/Debit Card?',
      a: 'Yes! Once your order details are confirmed on WhatsApp, we share an instant official UPI payment QR code / VPA ID or a secure online payment link (Razorpay/PayU) supporting all Debit/Credit Cards and NetBanking.'
    },
    {
      q: 'What is your cancellation and modification policy?',
      a: 'Orders for non-customized stock items (chocolates, standard hampers) can be modified or cancelled free of charge up to 3 hours before dispatch. For laser-personalized products (engraved bottles, plaques, lamps), cancellations are accepted until you approve the 3D digital proof. Once laser etched, custom items cannot be cancelled.'
    },
    {
      q: 'What happens if a gift arrives damaged or broken?',
      a: 'We provide a 100% Zero-Breakage Guarantee. In the rare event of transit damage, simply send a photo on WhatsApp within 24 hours of delivery, and we will dispatch a free replacement immediately with zero hassle.'
    },
    {
      q: 'Are cakes and flowers delivered fresh?',
      a: 'Yes, 100%! Cakes are baked fresh to order by certified master pastry chefs, and flowers are freshly cut and hand-arranged right before delivery in specialized temperature-regulated vans.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#FCFBF9', minHeight: '90vh', padding: '1.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: 1120 }}>
        
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
          <span style={{ color: 'var(--primary)', fontWeight: 700 }}>FAQ & Delivery Information</span>
        </div>

        {/* HERO SECTION */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 3rem' }}>
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
            <Truck size={14} color="#D97706" />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#92400E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              TRANSPARENT & RELIABLE LOGISTICS
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
            Delivery Information & <span style={{ color: 'rgb(217, 119, 6)' }}>Help Center</span>
          </h1>

          <p style={{ fontSize: '1rem', color: '#525252', lineHeight: 1.6, margin: 0 }}>
            Everything you need to know about our pan-India delivery areas, express delivery slots, easy WhatsApp ordering, and secure payment methods.
          </p>
        </div>

        {/* 1. DELIVERY SLOTS & TIMINGS */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              PAN-INDIA COURIER NETWORK
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#171717', margin: '0.35rem 0 0' }}>
              Express Delivery Slots & Timings
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {deliverySlots.map((slot, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #EFEAE2',
                  padding: '1.75rem',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: '12px',
                      background: '#FFF8E7',
                      color: '#D97706',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Clock size={22} />
                    </div>
                    <span style={{
                      background: '#F0FDF4',
                      color: '#15803D',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      border: '1px solid #BBF7D0'
                    }}>
                      {slot.cost}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#171717', margin: '0 0 0.35rem' }}>
                    {slot.title}
                  </h3>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#D97706', marginBottom: '0.65rem' }}>
                    ⏱ {slot.time}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#666666', lineHeight: 1.55, margin: 0 }}>
                    {slot.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. HOW WHATSAPP ORDERING & PAYMENT WORKS */}
        <div style={{
          background: 'linear-gradient(135deg, #FFFDF8 0%, #FFF8E7 100%)',
          borderRadius: '24px',
          border: '1.5px solid rgba(217, 119, 6, 0.3)',
          padding: '2.5rem 2rem',
          marginBottom: '4rem',
          boxShadow: '0 6px 24px rgba(217, 119, 6, 0.06)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 2.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              NO COMPLEX CHECKOUT NEEDED
            </span>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#171717', margin: '0.35rem 0 0.5rem' }}>
              How WhatsApp Ordering & Payment Works
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#666666', margin: 0 }}>
              Enjoy personalized 1-on-1 human service instead of robotic automated checkouts.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            {paymentSteps.map((s, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '18px',
                  border: '1px solid #EFEAE2',
                  padding: '1.5rem',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
                }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  background: '#171717',
                  color: 'rgb(217, 119, 6)',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  {s.step}
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#171717', margin: '0 0 0.45rem' }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: '0.84rem', color: '#666666', lineHeight: 1.55, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. PAYMENT METHODS & TRUST BADGES */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '4rem'
        }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #EFEAE2', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
            <div style={{ color: '#2563EB', marginBottom: '0.75rem' }}>
              <CreditCard size={28} />
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#171717', margin: '0 0 0.4rem' }}>
              UPI & All Cards Supported
            </h4>
            <p style={{ fontSize: '0.84rem', color: '#666666', lineHeight: 1.5, margin: 0 }}>
              Google Pay, PhonePe, Paytm, BHIM, all Visa/Mastercard/RuPay credit and debit cards.
            </p>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #EFEAE2', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
            <div style={{ color: '#16A34A', marginBottom: '0.75rem' }}>
              <ShieldCheck size={28} />
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#171717', margin: '0 0 0.4rem' }}>
              100% Zero-Breakage Guarantee
            </h4>
            <p style={{ fontSize: '0.84rem', color: '#666666', lineHeight: 1.5, margin: 0 }}>
              Custom molded protective packaging. Instant free replacement if damaged in transit.
            </p>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #EFEAE2', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
            <div style={{ color: '#D97706', marginBottom: '0.75rem' }}>
              <RotateCcw size={28} />
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#171717', margin: '0 0 0.4rem' }}>
              Easy Cancellation Window
            </h4>
            <p style={{ fontSize: '0.84rem', color: '#666666', lineHeight: 1.5, margin: 0 }}>
              Free cancellation before dispatch for standard items or before laser proof approval.
            </p>
          </div>
        </div>

        {/* 4. EXPANDABLE FAQS ACCORDION */}
        <div>
          <div style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 2.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#171717', margin: '0.35rem 0 0.6rem' }}>
              Got Questions? We Have Answers
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#525252', margin: 0 }}>
              Learn more about custom proofs, shipping areas, and order timelines.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 840, margin: '0 auto' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    border: '1px solid',
                    borderColor: isOpen ? 'rgb(217, 119, 6)' : '#EFEAE2',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: isOpen ? '#FFFCF5' : '#ffffff',
                    transition: 'all 160ms ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      padding: '1.15rem 1.25rem',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ fontSize: '0.96rem', fontWeight: 800, color: isOpen ? '#92400E' : '#171717' }}>
                      {faq.q}
                    </span>
                    {isOpen ? <ChevronUp size={18} color="#B45309" /> : <ChevronDown size={18} color="#737373" />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 1.25rem 1.15rem', fontSize: '0.88rem', color: '#525252', lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick WhatsApp Support Bar */}
          <div style={{
            marginTop: '3rem',
            textAlign: 'center',
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #EFEAE2',
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#171717', margin: '0 0 0.5rem' }}>
              Still have questions about your delivery?
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#737373', margin: '0 0 1.25rem' }}>
              Our gifting specialists are online now to assist you directly on WhatsApp.
            </p>
            <a
              href={`https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent("Hi! I have a question regarding delivery timings and serviceable pincodes.")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#25D366',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '0.75rem 1.6rem',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)'
              }}
            >
              <MessageCircle size={18} />
              <span>Ask on WhatsApp: {siteConfig.whatsAppDisplay}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
