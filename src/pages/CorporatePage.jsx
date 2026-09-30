import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Gift, 
  Send, 
  CheckCircle2, 
  Award, 
  Truck, 
  Clock, 
  Users, 
  Sparkles, 
  FileText, 
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ChevronRight,
  Phone,
  MessageCircle,
  Mail,
  Package,
  Layers,
  Percent,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CorporatePage = () => {
  const { showToast, brand, navigateTo } = useApp();
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    numberOfGifts: '50-200 Units',
    budget: '₹1,500 - ₹3,000',
    occasion: 'Employee Onboarding & Welcome Kits',
    requirements: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.company || !form.email) {
      showToast('Please provide your name, company and work email.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Corporate inquiry received! An enterprise gifting consultant will contact you within 2 business hours.');
  };

  const handleSelectOccasion = (occasion) => {
    setForm(prev => ({ ...prev, occasion }));
    const formElem = document.getElementById('corporate-inquiry-form');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const corporateSolutions = [
    { 
      id: 'onboarding',
      title: 'New Hire Onboarding Kits', 
      tag: 'HR Favorite',
      desc: 'Bespoke welcome packs featuring matte insulated flasks, vegan leather organizers, laser-engraved executive pens, and branded tech cables.', 
      image: '/images/corporate_welcome_box.jpg',
      badge: 'From ₹1,299 / kit',
      highlights: ['Custom Company Logo', 'Doorstep Pan-India Delivery', 'Personalized Welcome Card']
    },
    { 
      id: 'clients',
      title: 'VIP Client & Executive Hampers', 
      tag: 'Premium Luxury',
      desc: 'Handcrafted luxury trunks with gourmet Belgian pralines, artisan brass desk keepsakes, and customized Italian leather accessories for key stakeholders.', 
      image: '/images/recipient_clients.jpg',
      badge: 'From ₹2,499 / hamper',
      highlights: ['Hot-Foil Gold Stamping', 'Curated Gourmet Delights', 'Executive Desk Organizers']
    },
    { 
      id: 'festive',
      title: 'Grand Festive & Diwali Trunks', 
      tag: 'Seasonal Bestseller',
      desc: 'Lavish celebration boxes with pure brass designer diyas, premium organic dry fruits, Kashmiri saffron, and gold-foiled leadership greeting cards.', 
      image: '/images/luxury_hamper.jpg',
      badge: 'From ₹1,799 / trunk',
      highlights: ['Pure Brass Diya', 'Jumbo Iranian Pistachios', 'Velvet Trunk Keepsake']
    },
    { 
      id: 'recognition',
      title: 'Work Anniversary & Milestones', 
      tag: 'Team Appreciation',
      desc: 'Honor 1-year, 5-year, and 10-year milestones with laser-engraved 3D optical crystal awards, smartwatch accessories, and celebratory sweet treats.', 
      image: '/images/recipient_employees.jpg',
      badge: 'From ₹1,499 / pack',
      highlights: ['Custom Name & Tenure Engraving', 'Premium Presentation Box', 'Certificate Folder']
    }
  ];

  const enterpriseFeatures = [
    {
      icon: <Award size={24} color="#D97706" />,
      bg: '#FEF3C7',
      title: 'Precision Brand Customization',
      desc: 'High-precision laser engraving, metallic foil embossing on velvet trunks, and custom pantone ribbon packaging.'
    },
    {
      icon: <Truck size={24} color="#2563EB" />,
      bg: '#EFF6FF',
      title: 'Doorstep Multi-City Dispatch',
      desc: 'Simply provide an Excel sheet. We dispatch directly to 100+ cities with temperature control and live SMS tracking.'
    },
    {
      icon: <Percent size={24} color="#16A34A" />,
      bg: '#DCFCE7',
      title: 'Volume Discounts up to 40%',
      desc: 'Direct factory pricing with transparent slab discounts starting from 25 units up to 10,000+ enterprise bundles.'
    },
    {
      icon: <FileText size={24} color="#9333EA" />,
      bg: '#F3E8FF',
      title: '100% GST Tax Invoicing',
      desc: 'Compliant B2B invoices with Input Tax Credit (ITC) benefits, formal purchase orders (PO), and Net-30 credit terms.'
    }
  ];

  const clientLogos = [
    'TATA CONSULTANCY',
    'HDFC BANK',
    'INFOSYS',
    'DELOITTE',
    'ZOMATO',
    'RELIANCE',
    'AMAZON',
    'TECH MAHINDRA'
  ];

  const howItWorks = [
    { 
      step: '01', 
      title: 'Submit Brief & Budget', 
      desc: 'Share your headcount, budget per unit, and occasion date via our online form or WhatsApp concierge.' 
    },
    { 
      step: '02', 
      title: 'Digital Mock-Up & Physical Sample', 
      desc: 'Receive high-res 3D proofs with your corporate logo in 2 hours, plus physical prototype samples delivered to your office.' 
    },
    { 
      step: '03', 
      title: 'Artisanal Assembly & QC', 
      desc: 'Every item is laser engraved, quality tested, and securely packed in our dust-free assembly center.' 
    },
    { 
      step: '04', 
      title: 'Pan-India Multi-Hub Delivery', 
      desc: 'Dispatched to individual employee residences or corporate HQ with real-time tracking.' 
    }
  ];

  const volumeTiers = [
    { qty: '25 – 49 Units', discount: '15% OFF', popular: false, benefit: 'Free Laser Engraving' },
    { qty: '50 – 199 Units', discount: '25% OFF', popular: true, benefit: 'Free Physical Sample Box' },
    { qty: '200 – 499 Units', discount: '32% OFF', popular: false, benefit: 'Custom Branded Ribbons' },
    { qty: '500+ Enterprise', discount: 'Up to 40% OFF', popular: false, benefit: 'Bespoke Custom Box Moulds' }
  ];

  const faqs = [
    { 
      q: 'What is the minimum order quantity (MOQ) for corporate gifting?', 
      a: 'Our minimum order quantity for customized branded corporate hampers or welcome kits is only 25 units. For non-customized stock hampers, you can order any quantity.' 
    },
    { 
      q: 'Can you deliver directly to individual remote employees across different cities?', 
      a: 'Yes! Simply share an Excel spreadsheet of your recipients’ names, mobile numbers, and doorstep addresses. We deliver across 19,000+ Indian pincodes with real-time SMS delivery notifications.' 
    },
    { 
      q: 'How fast can we receive a physical sample with our company logo?', 
      a: 'We generate digital 3D mockups within 2 hours. Physical pre-production samples are customized and dispatched within 24 to 48 business hours to your office address.' 
    },
    { 
      q: 'Do you provide formal B2B GST tax invoices with input credit (ITC)?', 
      a: 'Yes, 100% compliant B2B tax invoices with your company GSTIN are generated for all corporate orders, allowing full Input Tax Credit (ITC) claims.' 
    },
    { 
      q: 'What customization and branding options are available?', 
      a: 'We offer precision laser engraving on stainless steel & wood, hot-foil gold/silver embossing on velvet gift trunks, full-color UV printing on acrylic, customized satin ribbons, and bespoke leadership message cards.' 
    }
  ];

  return (
    <div style={{ backgroundColor: '#FCFBF9', minHeight: '90vh', padding: '1.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: 1140 }}>
        
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
          <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Corporate & Bulk Gifting</span>
        </div>

        {/* 1. HERO SECTION */}
        <div style={{
          position: 'relative',
          borderRadius: '28px',
          overflow: 'hidden',
          marginBottom: '3rem',
          border: '1px solid #EFE4D2',
          background: 'linear-gradient(135deg, #FFFDF8 0%, #FFF9EF 50%, #FFF2DB 100%)',
          boxShadow: '0 8px 30px rgba(217, 119, 6, 0.08), 0 2px 6px rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(340px, 1.2fr) minmax(320px, 1fr)',
            alignItems: 'center',
            gap: '1.5rem'
          }} className="corp-hero-grid">
            
            {/* Left Column */}
            <div style={{ padding: '2.5rem 2rem 2.5rem 2.5rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                background: '#FFF2D6',
                border: '1px solid rgba(217, 119, 6, 0.45)',
                padding: '5px 14px',
                borderRadius: '9999px',
                marginBottom: '1rem'
              }}>
                <Building2 size={14} color="#D97706" />
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#92400E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  ENTERPRISE & BULK SOLUTIONS
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.1rem, 3.6vw, 3rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: '#171717',
                marginBottom: '1rem'
              }}>
                Corporate Gifting That Leaves a <span style={{ color: 'rgb(217, 119, 6)' }}>Lasting Impression</span>
              </h1>

              <p style={{
                fontSize: '0.96rem',
                color: '#525252',
                lineHeight: 1.6,
                marginBottom: '1.5rem',
                maxWidth: '520px'
              }}>
                Bespoke employee onboarding kits, VIP client executive trunks, and festive celebration hampers customized with your company logo, doorstep multi-city delivery, and 100% GST input tax credit.
              </p>

              {/* 4 Feature Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1.75rem' }} className="corp-hero-pills">
                {[
                  { text: 'Custom Logo Laser & Foil' },
                  { text: 'Pan-India Multi-Address' },
                  { text: 'Volume Discounts to 40%' },
                  { text: 'Dedicated Account Lead' }
                ].map((pill, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    background: '#ffffff',
                    border: '1px solid #EFEAE0',
                    borderRadius: '10px',
                    padding: '0.4rem 0.75rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#262626'
                  }}>
                    <CheckCircle2 size={14} color="#16A34A" />
                    <span>{pill.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a 
                  href="#corporate-inquiry-form"
                  style={{
                    background: '#171717',
                    color: '#ffffff',
                    textDecoration: 'none',
                    borderRadius: '9999px',
                    padding: '0.75rem 1.6rem',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 4px 14px rgba(23, 23, 23, 0.25)',
                    transition: 'all 150ms ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(217, 119, 6)';
                    e.currentTarget.style.color = '#171717';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#171717';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  <span>Request Custom Proposal</span>
                  <ArrowRight size={15} />
                </a>

                <a 
                  href="https://wa.me/919876543210?text=Hi,%20I%20am%20interested%20in%20Corporate%20Gifting%20catalog%20and%20quotation."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#ffffff',
                    color: '#15803D',
                    textDecoration: 'none',
                    border: '1.5px solid #BBF7D0',
                    borderRadius: '9999px',
                    padding: '0.7rem 1.35rem',
                    fontSize: '0.86rem',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    transition: 'all 150ms ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#DCFCE7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }}
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Corporate Desk</span>
                </a>
              </div>
            </div>

            {/* Right Column Showcase */}
            <div style={{ padding: '1.5rem', position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)',
                border: '4px solid #ffffff'
              }}>
                <img 
                  src="/images/corporate_welcome_box.jpg" 
                  alt="Enterprise Corporate Gifting Kits"
                  style={{
                    width: '100%',
                    height: '380px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* Floating Top Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'rgba(23, 23, 23, 0.88)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}>
                  <Sparkles size={13} color="rgb(217, 119, 6)" />
                  <span>★ 4.9/5 Rated Enterprise Partner</span>
                </div>

                {/* Floating Bottom Card */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  background: 'rgba(255, 255, 255, 0.94)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '0.85rem 1.15rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}>
                  <div>
                    <div style={{ fontSize: '0.74rem', color: '#15803D', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      24-HR DIGITAL PROOF
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#171717' }}>
                      Free Custom 3D Logo Mock-Up
                    </div>
                  </div>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: '#FFF0D0',
                    color: '#B45309',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Award size={18} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. TRUSTED BY CLIENT MARQUEE */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #EFEAE2',
          padding: '1.5rem 2rem',
          marginBottom: '4rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '0.76rem',
            fontWeight: 800,
            color: '#737373',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: '0 0 1.25rem'
          }}>
            TRUSTED BY 500+ LEADING ENTERPRISES & FAST-GROWING TEAMS
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '2.5rem'
          }}>
            {clientLogos.map((client, idx) => (
              <span 
                key={idx}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 900,
                  color: '#9CA3AF',
                  letterSpacing: '0.06em',
                  transition: 'color 150ms ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#171717'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
              >
                {client}
              </span>
            ))}
          </div>
        </div>

        {/* 3. CURATED ENTERPRISE GIFTING COLLECTIONS */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 2.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              CURATED HAMPER CATEGORIES
            </span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 900, color: '#171717', margin: '0.35rem 0 0.6rem' }}>
              Designed For Every Corporate Milestone
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#525252', margin: 0 }}>
              Choose a signature concept or let our designers tailor a bespoke solution tailored to your company's aesthetic and budget.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {corporateSolutions.map((sol) => (
              <div 
                key={sol.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '22px',
                  border: '1px solid #EFEAE2',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.04)',
                  transition: 'all 200ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(217, 119, 6, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Image & Tag */}
                <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
                  <img 
                    src={sol.image} 
                    alt={sol.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: '#171717',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '9999px'
                  }}>
                    {sol.tag}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(6px)',
                    color: '#92400E',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    {sol.badge}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.4rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#171717', margin: '0 0 0.5rem' }}>
                      {sol.title}
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: '#666666', lineHeight: 1.5, margin: '0 0 1rem' }}>
                      {sol.desc}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem' }}>
                      {sol.highlights.map((h, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#404040' }}>
                          <Check size={13} color="#D97706" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectOccasion(sol.title)}
                    style={{
                      width: '100%',
                      background: '#FFF8E7',
                      color: '#92400E',
                      border: '1px solid rgba(217, 119, 6, 0.4)',
                      borderRadius: '12px',
                      padding: '0.65rem 1rem',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      transition: 'all 150ms ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(217, 119, 6)';
                      e.currentTarget.style.color = '#171717';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFF8E7';
                      e.currentTarget.style.color = '#92400E';
                    }}
                  >
                    <span>Request Quote For This</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. ENTERPRISE VALUE STACK / 4 CARDS */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 2.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              THE STEP IN ADVANTAGE
            </span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 900, color: '#171717', margin: '0.35rem 0 0.6rem' }}>
              Why Leading HR & Procurement Leaders Choose Us
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#525252', margin: 0 }}>
              End-to-end execution that eliminates logistics headaches and delivers memorable gifting experiences.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {enterpriseFeatures.map((feat, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #EFEAE2',
                  padding: '1.75rem 1.5rem',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '14px',
                  background: feat.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.15rem'
                }}>
                  {feat.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#171717', margin: '0 0 0.45rem' }}>
                  {feat.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#666666', lineHeight: 1.55, margin: 0 }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. TIERED BULK SAVINGS SLABS */}
        <div style={{
          background: 'linear-gradient(135deg, #FFFDF8 0%, #FFF8E7 100%)',
          borderRadius: '24px',
          border: '1.5px solid rgba(217, 119, 6, 0.3)',
          padding: '2.5rem 2rem',
          marginBottom: '4.5rem',
          boxShadow: '0 6px 24px rgba(217, 119, 6, 0.06)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 2rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              FACTORY DIRECT PRICING
            </span>
            <h3 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#171717', margin: '0.35rem 0 0.5rem' }}>
              Transparent Bulk Discount Slabs
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#666666', margin: 0 }}>
              Scale your gifting budget effortlessly with guaranteed tier discounts and complimentary personalization perks.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem'
          }}>
            {volumeTiers.map((tier, idx) => (
              <div 
                key={idx}
                style={{
                  background: tier.popular ? '#171717' : '#ffffff',
                  color: tier.popular ? '#ffffff' : '#171717',
                  borderRadius: '18px',
                  border: tier.popular ? '2px solid rgb(217, 119, 6)' : '1px solid #EFEAE2',
                  padding: '1.5rem',
                  textAlign: 'center',
                  position: 'relative',
                  boxShadow: tier.popular ? '0 8px 24px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                {tier.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgb(217, 119, 6)',
                    color: '#171717',
                    fontSize: '0.7rem',
                    fontWeight: 900,
                    padding: '3px 12px',
                    borderRadius: '9999px',
                    letterSpacing: '0.05em'
                  }}>
                    MOST POPULAR
                  </div>
                )}

                <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.35rem', color: tier.popular ? '#A3A3A3' : '#737373' }}>
                  {tier.qty}
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: tier.popular ? 'rgb(217, 119, 6)' : '#171717', marginBottom: '0.5rem' }}>
                  {tier.discount}
                </div>
                <div style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: tier.popular ? '#BBF7D0' : '#15803D',
                  background: tier.popular ? 'rgba(34, 197, 94, 0.15)' : '#DCFCE7',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  display: 'inline-block'
                }}>
                  + {tier.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. HOW IT WORKS TIMELINE */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 2.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              SEAMLESS 4-STEP EXECUTION
            </span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 900, color: '#171717', margin: '0.35rem 0 0.6rem' }}>
              How Our Enterprise Gifting Works
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#525252', margin: 0 }}>
              From initial creative consultation to doorstep dispatch, our specialists handle every step.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '1.5rem'
          }}>
            {howItWorks.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #EFEAE2',
                  padding: '1.75rem 1.4rem',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                  position: 'relative'
                }}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  background: '#171717',
                  color: 'rgb(217, 119, 6)',
                  fontWeight: 900,
                  fontSize: '1.15rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  {item.step}
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#171717', margin: '0 0 0.45rem' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.84rem', color: '#666666', lineHeight: 1.55, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. QUOTE REQUEST FORM & DIRECT CONTACT DESK */}
        <div 
          id="corporate-inquiry-form"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
            gap: '2.5rem',
            alignItems: 'flex-start',
            marginBottom: '4.5rem'
          }} 
          className="corp-inquiry-grid"
        >
          {/* Left Form */}
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
                FAST QUOTE INQUIRY
              </span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#171717', margin: '0.35rem 0 0.5rem' }}>
                Request Corporate Proposal & Samples
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#737373', margin: 0 }}>
                Receive full catalog options, physical sample kits, and customized volume pricing within 2 business hours.
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
                  Enterprise Inquiry Received!
                </h3>
                <p style={{ color: '#166534', fontSize: '0.92rem', maxWidth: '440px', margin: '0 auto 1.75rem', lineHeight: 1.55 }}>
                  Thank you, <strong>{form.name}</strong> from <strong>{form.company}</strong>. Our enterprise relationship lead is reviewing your requirements for <em>{form.numberOfGifts}</em> ({form.occasion}) and will connect shortly.
                </p>
                <button 
                  type="button"
                  className="btn btn-primary" 
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: '',
                      company: '',
                      email: '',
                      phone: '',
                      numberOfGifts: '50-200 Units',
                      budget: '₹1,500 - ₹3,000',
                      occasion: 'Employee Onboarding & Welcome Kits',
                      requirements: ''
                    });
                  }}
                  style={{ padding: '0.65rem 1.5rem', fontWeight: 700 }}
                >
                  Submit Another RFQ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Occasion Selection Pills */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: '0.65rem' }}>
                    Select Gifting Occasion:
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {[
                      'Employee Onboarding & Welcome Kits',
                      'VIP Client Luxury Hampers',
                      'Festive Diwali / New Year Trunks',
                      'Work Anniversary & Recognition',
                      'Annual Conference & Summit Gifts'
                    ].map(occ => {
                      const isSelected = form.occasion === occ;
                      return (
                        <button
                          key={occ}
                          type="button"
                          onClick={() => setForm({ ...form, occasion: occ })}
                          style={{
                            padding: '0.45rem 0.95rem',
                            borderRadius: '9999px',
                            border: isSelected ? '1.5px solid rgb(217, 119, 6)' : '1px solid #E5E7EB',
                            background: isSelected ? '#FFF8E7' : '#FAFAFA',
                            color: isSelected ? '#171717' : '#525252',
                            fontWeight: isSelected ? 800 : 500,
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                            transition: 'all 150ms ease'
                          }}
                        >
                          {occ}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Company Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }} className="corp-form-row">
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: 5 }}>
                      Full Name <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="form-input" 
                      placeholder="e.g. Vikram Joshi"
                      value={form.name} 
                      onChange={(e) => setForm({ ...form, name: e.target.value })} 
                      style={{ borderRadius: '12px', padding: '0.65rem 0.95rem', fontSize: '0.9rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: 5 }}>
                      Company Name <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="form-input" 
                      placeholder="e.g. TechCorp India Pvt Ltd"
                      value={form.company} 
                      onChange={(e) => setForm({ ...form, company: e.target.value })} 
                      style={{ borderRadius: '12px', padding: '0.65rem 0.95rem', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                {/* Email & Phone Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }} className="corp-form-row">
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: 5 }}>
                      Official Work Email <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input 
                      type="email" 
                      required 
                      className="form-input" 
                      placeholder="vikram@techcorp.com"
                      value={form.email} 
                      onChange={(e) => setForm({ ...form, email: e.target.value })} 
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

                {/* Headcount & Budget Per Unit */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }} className="corp-form-row">
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: 5 }}>
                      Approximate Headcount / Units
                    </label>
                    <select 
                      className="form-select"
                      value={form.numberOfGifts}
                      onChange={(e) => setForm({ ...form, numberOfGifts: e.target.value })}
                      style={{ borderRadius: '12px', padding: '0.65rem 0.95rem', fontSize: '0.9rem' }}
                    >
                      <option value="25-50 Units">25 - 50 Units (15% Slab)</option>
                      <option value="50-200 Units">50 - 200 Units (25% Slab)</option>
                      <option value="200-500 Units">200 - 500 Units (32% Slab)</option>
                      <option value="500+ Enterprise Units">500+ Enterprise Units (Up to 40% Off)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: 5 }}>
                      Target Budget Per Gift
                    </label>
                    <select 
                      className="form-select"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      style={{ borderRadius: '12px', padding: '0.65rem 0.95rem', fontSize: '0.9rem' }}
                    >
                      <option value="₹750 - ₹1,500">₹750 - ₹1,500 per gift</option>
                      <option value="₹1,500 - ₹3,000">₹1,500 - ₹3,000 per gift (Most Popular)</option>
                      <option value="₹3,000 - ₹6,000">₹3,000 - ₹6,000 per gift</option>
                      <option value="₹6,000+ Luxury">₹6,000+ Bespoke Luxury Trunks</option>
                    </select>
                  </div>
                </div>

                {/* Specific Requirements */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: 5 }}>
                    Custom Branding Details / Delivery Dates (Optional)
                  </label>
                  <textarea 
                    rows={3} 
                    className="form-textarea" 
                    placeholder="Tell us if you need custom logo engraving, individual home delivery addresses, specific delivery deadlines, or sample kits..."
                    value={form.requirements} 
                    onChange={(e) => setForm({ ...form, requirements: e.target.value })} 
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
                  <span>Submit Corporate Inquiry & Get Free Mock-Up</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Support Desk */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Rapid Response Badge */}
            <div style={{
              background: '#171717',
              color: '#ffffff',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid #333333',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'rgba(34, 197, 94, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: '#22C55E',
                    boxShadow: '0 0 10px #22C55E',
                    display: 'inline-block'
                  }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.74rem', color: '#22C55E', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    ENTERPRISE DESK ONLINE
                  </div>
                  <div style={{ fontSize: '0.96rem', fontWeight: 700 }}>
                    Fast 2-Hour Response Guaranteed
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.82rem', color: '#A3A3A3', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
                Need urgent quotes for an upcoming company event or townhall? Connect directly with our enterprise desk.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '0.65rem 1rem',
                    color: '#ffffff',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    transition: 'background 150ms'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <MessageCircle size={16} color="#22C55E" />
                    <span>WhatsApp Direct: +91 98765 43210</span>
                  </div>
                  <ArrowRight size={14} color="rgb(217, 119, 6)" />
                </a>

                <a 
                  href={`tel:${brand?.supportPhone || '+9101149208000'}`}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '0.65rem 1rem',
                    color: '#ffffff',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    transition: 'background 150ms'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Phone size={16} color="rgb(217, 119, 6)" />
                    <span>Phone: +91 (011) 4920-8000</span>
                  </div>
                  <ArrowRight size={14} color="rgb(217, 119, 6)" />
                </a>

                <a 
                  href={`mailto:corporate@stepingiftmart.com`}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '0.65rem 1rem',
                    color: '#ffffff',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    transition: 'background 150ms'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Mail size={16} color="#38BDF8" />
                    <span>corporate@stepingiftmart.com</span>
                  </div>
                  <ArrowRight size={14} color="rgb(217, 119, 6)" />
                </a>
              </div>
            </div>

            {/* Enterprise Assurance Card */}
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #EFEAE2',
              padding: '1.5rem',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#171717', margin: '0 0 1rem' }}>
                Enterprise Guarantee
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { title: 'Zero Breakage Guarantee', desc: 'Custom molded protective foam inserts' },
                  { title: 'Physical Samples', desc: 'Delivered directly to your HQ before mass manufacturing' },
                  { title: 'GST Compliant ITC Invoicing', desc: '100% tax credit benefits with every shipment' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <ShieldCheck size={18} color="#16A34A" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#171717' }}>{item.title}</div>
                      <div style={{ fontSize: '0.78rem', color: '#666666' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 8. FAQS ACCORDION */}
        <div>
          <div style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 2.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              HR & PROCUREMENT QUESTIONS
            </span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 900, color: '#171717', margin: '0.35rem 0 0.6rem' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#525252', margin: 0 }}>
              Got questions about MOQs, address spreadsheets, or invoice terms? We’ve got you covered.
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
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .corp-hero-grid,
          .corp-inquiry-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .corp-form-row,
          .corp-hero-pills {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
