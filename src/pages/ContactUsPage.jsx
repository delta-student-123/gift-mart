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
    <div style={{ backgroundColor: '#ffffff', minHeight: '85vh', padding: '3.5rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: 980 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag" style={{ background: '#fdf2f8', color: 'var(--primary)' }}>
            <MessageSquare size={14} />
            <span>WE ARE HERE FOR YOU</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--charcoal-dark)', marginBottom: '0.65rem' }}>
            Get in Touch With Our Care Team
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--charcoal-muted)' }}>
            Have questions about an upcoming delivery, custom personalization, or corporate order? We’re happy to help.
          </p>
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
