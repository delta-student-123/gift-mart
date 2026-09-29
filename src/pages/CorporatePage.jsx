import React, { useState } from 'react';
import { 
  Building, 
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
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CorporatePage = () => {
  const { showToast, brand } = useApp();
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    numberOfGifts: '50-200',
    budget: '₹1,500 - ₹3,000',
    occasion: 'Festive Diwali',
    requirements: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.company || !form.email) return;
    setSubmitted(true);
    showToast('Corporate inquiry received! Our enterprise gifting consultant will contact you within 2 business hours.');
  };

  const corporateSolutions = [
    { title: 'Employee Gifting', desc: 'Onboarding welcome kits, work anniversary recognition & year-end appreciation tokens.', icon: '👥' },
    { title: 'Client Gifting', desc: 'Curated luxury hampers, executive desk organizers & premium dry fruit trunks for key partners.', icon: '🤝' },
    { title: 'Festival Hampers', desc: 'Grand Diwali, New Year & festive gift hampers with brass diyas, Belgian chocolates & raw honey.', icon: '🪔' },
    { title: 'Joining Kits', desc: 'Branded backpacks, stainless steel flasks, custom diaries & laser-engraved pens for new hires.', icon: '🎒' },
    { title: 'Bulk Orders', desc: 'Volume discounts up to 35% with doorstep multi-address delivery across 100+ Indian cities.', icon: '📦' },
    { title: 'Custom Branding', desc: 'Emboss your company logo on bespoke velvet trunks, laser-engraved plaques & satin ribbons.', icon: '🏷️' }
  ];

  const howItWorks = [
    { step: '1', title: 'Consultation & Brief', desc: 'Tell us your budget, recipient count, and occasion requirements.' },
    { step: '2', title: 'Curated Proposal & Samples', desc: 'We deliver physical prototypes and custom catalog options within 24 hours.' },
    { step: '3', title: 'Production & Branding', desc: 'Master artisans assemble and custom brand every gift box with precision.' },
    { step: '4', title: 'Multi-City Doorstep Dispatch', desc: 'Delivered directly to employee homes or office desks with live tracking.' }
  ];

  const faqs = [
    { q: 'What is the minimum order quantity for corporate gifting?', a: 'Our minimum order quantity for customized branded corporate hampers is just 25 units.' },
    { q: 'Can you deliver gifts directly to individual employee home addresses across India?', a: 'Yes! Simply share an Excel list of recipient addresses. Our multi-hub courier partner network handles flawless pan-India doorstep delivery with SMS tracking.' },
    { q: 'Do you provide GST invoices with input tax credit benefits?', a: 'Yes, 100% compliant B2B tax invoices with GST input credit benefits are provided for all corporate orders.' },
    { q: 'Can we customize the gifts with our corporate brand logo and colors?', a: 'Absolutely. We offer logo embossing on velvet trunks, laser engraving on wood & metal, branded ribbon sleeves, and customized CEO greeting message cards.' }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '85vh', padding: '3.5rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: 1080 }}>
        
        {/* 1. HERO SECTION */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag" style={{ background: '#fdf2f8', color: 'var(--primary)' }}>
            <Building size={14} />
            <span>STEP IN GIFT MART ENTERPRISE SOLUTIONS</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--charcoal-dark)', lineHeight: 1.2, marginBottom: '1.25rem' }}>
            Make Business Relationships More Meaningful.
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--charcoal-body)', maxWidth: 720, margin: '0 auto', lineHeight: 1.6 }}>
            Thoughtful corporate gifting solutions for employees, clients and business partners — crafted with bespoke branding, pan-India direct dispatch, and GST invoicing.
          </p>
        </div>

        {/* 2. CORPORATE SOLUTIONS GRID */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>
              Tailored Corporate Solutions
            </h2>
            <p style={{ fontSize: '0.94rem', color: 'var(--charcoal-muted)' }}>
              Everything your enterprise needs to celebrate relationships at scale
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {corporateSolutions.map(sol => (
              <div
                key={sol.title}
                style={{
                  background: 'var(--secondary-warm)',
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--secondary-border)',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>{sol.icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--charcoal-dark)', marginBottom: '0.5rem' }}>
                  {sol.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--charcoal-body)', lineHeight: 1.55 }}>
                  {sol.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. HOW IT WORKS */}
        <div style={{ marginBottom: '5rem', background: '#fafaf9', padding: '3rem 2rem', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>
              How Corporate Gifting Works
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--charcoal-muted)' }}>
              A seamless 4-step execution from concept to celebration
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {howItWorks.map(step => (
              <div key={step.step} style={{ textAlign: 'center', background: '#ffffff', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--primary)', color: '#ffffff', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  {step.step}
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.45rem', color: 'var(--charcoal-dark)' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-muted)', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. CORPORATE ENQUIRY FORM & TRUST HIGHLIGHTS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'flex-start', marginBottom: '5rem' }} className="corp-form-grid">
          
          {/* Enquiry Form */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-2xl)', padding: '2.5rem', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
                <CheckCircle2 size={56} color="var(--accent-emerald)" style={{ margin: '0 auto 1.25rem' }} />
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>Enquiry Received!</h3>
                <p style={{ color: 'var(--charcoal-muted)', fontSize: '0.94rem', marginBottom: '1.75rem' }}>
                  A dedicated corporate gifting consultant will email you with our full festive catalogue and volume discount quote within 2 hours.
                </p>
                <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--charcoal-dark)' }}>
                  Request Corporate Quote
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--charcoal-muted)', marginBottom: '1.5rem' }}>
                  Fill in your details below for custom catalogue & volume pricing.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      className="form-input" 
                      placeholder="e.g. Vikram Joshi"
                      value={form.name} 
                      onChange={(e) => setForm({ ...form, name: e.target.value })} 
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Company Name *</label>
                    <input 
                      type="text" 
                      required 
                      className="form-input" 
                      placeholder="e.g. Innovatech India Pvt Ltd"
                      value={form.company} 
                      onChange={(e) => setForm({ ...form, company: e.target.value })} 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Work Email *</label>
                    <input 
                      type="email" 
                      required 
                      className="form-input" 
                      placeholder="vikram@innovatech.com"
                      value={form.email} 
                      onChange={(e) => setForm({ ...form, email: e.target.value })} 
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Phone Number *</label>
                    <input 
                      type="tel" 
                      required 
                      className="form-input" 
                      placeholder="+91 98765 43210"
                      value={form.phone} 
                      onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Number of Gifts</label>
                    <select 
                      className="form-select"
                      value={form.numberOfGifts}
                      onChange={(e) => setForm({ ...form, numberOfGifts: e.target.value })}
                    >
                      <option value="25-50">25 - 50 Units</option>
                      <option value="50-200">50 - 200 Units</option>
                      <option value="200-500">200 - 500 Units</option>
                      <option value="500+">500+ Enterprise Units</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Budget Per Gift</label>
                    <select 
                      className="form-select"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    >
                      <option value="₹750 - ₹1,500">₹750 - ₹1,500</option>
                      <option value="₹1,500 - ₹3,000">₹1,500 - ₹3,000</option>
                      <option value="₹3,000 - ₹6,000">₹3,000 - ₹6,000</option>
                      <option value="₹6,000+ Luxury">₹6,000+ Luxury Trunks</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Occasion</label>
                  <select 
                    className="form-select"
                    value={form.occasion}
                    onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                  >
                    <option value="Festive Diwali">Festive Diwali / New Year</option>
                    <option value="Employee Appreciation">Employee Appreciation / Anniversary</option>
                    <option value="Joining Kit">New Hire Joining Kit</option>
                    <option value="Client Relationship">VIP Client Relationship Hamper</option>
                    <option value="Annual Conference">Conference / Speaker Gifts</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Specific Requirements / Branding details</label>
                  <textarea 
                    rows={3}
                    className="form-textarea"
                    placeholder="Tell us if you need custom logo embossing, specific delivery dates, or multi-city home deliveries..."
                    value={form.requirements}
                    onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ gap: 6 }}>
                  <Send size={16} /> Submit Enquiry
                </button>
              </form>
            )}
          </div>

          {/* Benefits Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'var(--secondary-warm)', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--secondary-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.5rem', color: 'var(--primary)' }}>
                <Award size={22} />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>Custom Branding</h4>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--charcoal-body)', lineHeight: 1.55 }}>
                Logo foil-stamping on velvet trunks, laser-engraved steel flasks, and personalized greeting letters signed by your leadership team.
              </p>
            </div>

            <div style={{ background: 'var(--secondary-warm)', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--secondary-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.5rem', color: '#2563eb' }}>
                <Truck size={22} />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>Pan-India Direct Dispatch</h4>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--charcoal-body)', lineHeight: 1.55 }}>
                Doorstep courier delivery to individual employee homes in 100+ cities with temperature control and live SMS tracking.
              </p>
            </div>

            <div style={{ background: 'var(--secondary-warm)', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--secondary-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.5rem', color: 'var(--accent-emerald)' }}>
                <ShieldCheck size={22} />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>Tax-Compliant Invoicing</h4>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--charcoal-body)', lineHeight: 1.55 }}>
                Full GST invoices with input credit eligibility, corporate purchase orders, and dedicated account manager support.
              </p>
            </div>
          </div>

        </div>

        {/* 5. FAQ SECTION */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--charcoal-muted)' }}>
              Common questions from HR directors and procurement managers
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxWidth: 840, margin: '0 auto' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                style={{
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  background: '#ffffff',
                  transition: 'background 150ms'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.98rem', color: 'var(--charcoal-dark)' }}>{faq.q}</strong>
                  <ChevronDown size={18} color="var(--charcoal-muted)" style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }} />
                </div>
                {openFaq === idx && (
                  <p style={{ fontSize: '0.88rem', color: 'var(--charcoal-body)', lineHeight: 1.6, marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .corp-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
