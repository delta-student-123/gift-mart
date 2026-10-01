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
  Search,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { siteConfig } from '../config/siteConfig';

export const FaqDeliveryPage = () => {
  const { navigateTo } = useApp();
  const [openFaq, setOpenFaq] = useState(0);

  // WhatsApp Quick Enquiry State
  const enquiryTopics = [
    { 
      id: 'pincode', 
      label: 'Delivery Time & City/Pincode', 
      defaultText: 'Hi Step In Gift Mart, I would like to check delivery timeline and courier availability for my City/Pincode: ' 
    },
    { 
      id: 'urgent', 
      label: 'Urgent / Same-Day Inquiry', 
      defaultText: 'Hi Step In Gift Mart, I need an urgent gift delivery. Can you please let me know the fastest available option?' 
    },
    { 
      id: 'custom', 
      label: 'Customization & Photo Proof', 
      defaultText: 'Hi Step In Gift Mart, I want to inquire about custom laser engraving/photo preview on a gift item.' 
    },
    { 
      id: 'bulk', 
      label: 'Bulk / Corporate Order', 
      defaultText: 'Hi Step In Gift Mart, I would like to inquire about corporate/bulk order pricing and delivery schedule.' 
    },
    { 
      id: 'status', 
      label: 'Existing Order Status', 
      defaultText: 'Hi Step In Gift Mart, I placed an order with you and would like to know the latest status and dispatch update.' 
    }
  ];

  const [selectedTopic, setSelectedTopic] = useState('pincode');
  const [enquiryMessage, setEnquiryMessage] = useState(enquiryTopics[0].defaultText);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic.id);
    setEnquiryMessage(topic.defaultText);
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(enquiryMessage.trim());
    window.open(`https://wa.me/919971112444?text=${text}`, '_blank');
  };

  const paymentSteps = [
    {
      step: '1',
      title: 'Choose & Personalize',
      desc: 'Pick your gift and enter your custom name, initials, photo, or personalized message.'
    },
    {
      step: '2',
      title: 'Auto-Fill on WhatsApp',
      desc: 'Tap "Order on WhatsApp" — your exact product details and delivery info format automatically.'
    },
    {
      step: '3',
      title: 'Confirm & Secure Pay',
      desc: 'Our team verifies your proof & slot. Pay smoothly via UPI (GPay, PhonePe, Paytm), Card, or COD.'
    },
    {
      step: '4',
      title: 'Direct WhatsApp Updates',
      desc: 'No confusing tracking portals — simply message us directly on WhatsApp anytime for packaging photos and order status.'
    }
  ];

  const faqs = [
    {
      q: 'How do I check my order status if there is no tracking portal?',
      a: 'We keep things simple and direct! There are no confusing tracking links or account logins required. Just send us a quick text on WhatsApp (+91 99711 12444) with your name or product details. Our team is right on chat to share actual photos of your finished gift, packaging status, and dispatch progress.'
    },
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
      q: 'Are fragile hampers and keepsake gifts delivered securely?',
      a: 'Yes, 100%! All hampers, 3D acrylic lamps, glass bottles, and delicate keepsakes are protected with multi-layer bubble wrap, custom foam inserts, and rigid branded boxes for a 100% zero-breakage delivery.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#FCFBF9', minHeight: '90vh', padding: '2.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: 1120 }}>

        {/* 1. DIRECT WHATSAPP DELIVERY & ORDER ENQUIRIES */}
        <div style={{ marginBottom: '4rem', paddingTop: '0.5rem' }}>
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              DIRECT WHATSAPP ASSISTANCE
            </span>
            <h1 style={{ fontSize: 'clamp(1.85rem, 3vw, 2.35rem)', fontWeight: 900, color: '#171717', margin: '0.35rem 0 0.55rem' }}>
              Delivery Enquiries & Direct WhatsApp Support
            </h1>
            <p style={{ fontSize: '0.94rem', color: '#57534E', margin: 0, maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
              We do not use complicated tracking portals or ticket systems. Speak directly with our store team on WhatsApp for delivery estimates, personalization checks, and direct order updates.
            </p>
          </div>

          {/* Interactive Enquiry Assistant Box */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            border: '1.5px solid #EFEAE2',
            padding: '2rem 2.25rem',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
            marginBottom: '1.75rem'
          }}>
            {/* Quick Topic Chips */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#78716C', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Select an Inquiry Topic:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {enquiryTopics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => handleTopicSelect(topic)}
                    style={{
                      background: selectedTopic === topic.id ? '#FEF3C7' : '#FAF9F6',
                      color: selectedTopic === topic.id ? '#92400E' : '#44403C',
                      border: `1.5px solid ${selectedTopic === topic.id ? '#D97706' : '#E7E5E4'}`,
                      padding: '0.5rem 0.95rem',
                      borderRadius: '12px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 150ms'
                    }}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Editable Inquiry Message Area */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#78716C', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                Message Preview (You can type or edit before sending):
              </label>
              <textarea
                rows={3}
                value={enquiryMessage}
                onChange={(e) => setEnquiryMessage(e.target.value)}
                placeholder="Type your question, city, or pincode here..."
                style={{
                  width: '100%',
                  padding: '0.85rem 1.1rem',
                  borderRadius: '14px',
                  border: '1.5px solid #E5E7EB',
                  fontSize: '0.94rem',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  outline: 'none',
                  transition: 'border-color 150ms',
                  backgroundColor: '#FAF9F6',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.target.style.borderColor = '#25D366'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>

            {/* Action Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              background: '#F0FDF4',
              border: '1.5px solid #BBF7D0',
              borderRadius: '16px',
              padding: '1.15rem 1.4rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: '#DCFCE7',
                  color: '#15803D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#166534' }}>
                    Direct WhatsApp Store Support
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#15803D', marginTop: 2 }}>
                    Quick replies within 10–15 minutes • 10:00 AM – 9:00 PM IST
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSendWhatsApp}
                style={{
                  background: '#25D366',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '0.85rem 1.75rem',
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                  transition: 'background 150ms'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1ebc59'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#25D366'}
              >
                <MessageCircle size={18} />
                <span>Send Enquiry on WhatsApp</span>
              </button>
            </div>

          </div>

          {/* 3 Delivery & Service Guarantees */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem'
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '18px',
              border: '1px solid #EFEAE2',
              padding: '1.4rem 1.25rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.85rem',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                background: '#FEF3C7',
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: '#171717', margin: '0 0 0.25rem' }}>
                  Zero-Breakage Guarantee
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#666666', lineHeight: 1.5, margin: 0 }}>
                  High-density shock foam & rigid gift boxes. In the rare event of transit damage, replacement is dispatched immediately.
                </p>
              </div>
            </div>

            <div style={{
              background: '#ffffff',
              borderRadius: '18px',
              border: '1px solid #EFEAE2',
              padding: '1.4rem 1.25rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.85rem',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                background: '#DCFCE7',
                color: '#15803D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <MessageCircle size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: '#171717', margin: '0 0 0.25rem' }}>
                  Live WhatsApp Photo Proofs
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#666666', lineHeight: 1.5, margin: 0 }}>
                  We share genuine photos and videos of your custom engraved gift and packaging box directly on WhatsApp before courier handover.
                </p>
              </div>
            </div>

            <div style={{
              background: '#ffffff',
              borderRadius: '18px',
              border: '1px solid #EFEAE2',
              padding: '1.4rem 1.25rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.85rem',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                background: '#EFF6FF',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Truck size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: '#171717', margin: '0 0 0.25rem' }}>
                  Pan-India Doorstep Delivery
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#666666', lineHeight: 1.5, margin: 0 }}>
                  Reliable express delivery reaching metro hubs and cities across India. Simply message us on WhatsApp for fast assistance anytime.
                </p>
              </div>
            </div>
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
            gap: '1.25rem'
          }}>
            {paymentSteps.map((s, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '18px',
                  border: '1px solid #EFEAE2',
                  padding: '1.5rem',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'default'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(217, 119, 6, 0.1), 0 2px 8px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(217, 119, 6, 0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.03)';
                  e.currentTarget.style.borderColor = '#EFEAE2';
                }}
              >
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  background: '#171717',
                  color: 'rgb(217, 119, 6)',
                  fontWeight: 900,
                  fontSize: '1.05rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  {s.step}
                </div>
                <h4 style={{ 
                  fontSize: '1.02rem', 
                  fontWeight: 800, 
                  color: '#171717', 
                  margin: '0 0 0.5rem',
                  lineHeight: 1.3
                }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: '0.84rem', color: '#555555', lineHeight: 1.55, margin: 0 }}>
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
