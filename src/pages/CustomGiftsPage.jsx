import React, { useState } from 'react';
import { 
  Sparkles, 
  UploadCloud, 
  CheckCircle2, 
  Eye, 
  Truck, 
  Send, 
  MessageCircle, 
  ArrowRight,
  ChevronRight,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { siteConfig } from '../config/siteConfig';

export const CustomGiftsPage = () => {
  const { showToast, navigateTo, productsList } = useApp();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    giftType: '3D Optical Acrylic LED Lamp',
    customText: '',
    instructions: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.customText) {
      showToast('Please provide your name, phone number, and custom text.', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Custom gift enquiry received! Opening WhatsApp with your design brief...');

    // Build pre-filled WhatsApp message
    let msg = `*Custom Personalization Enquiry — ${siteConfig.storeName}*\n\n`;
    msg += `👤 *Name:* ${form.name}\n`;
    msg += `📞 *WhatsApp:* ${form.phone}\n`;
    msg += `🎁 *Item:* ${form.giftType}\n`;
    msg += `✍️ *Custom Text / Name to Engrave:* "${form.customText}"\n`;
    if (form.instructions) {
      msg += `📝 *Special Instructions:* ${form.instructions}\n`;
    }
    if (selectedFile) {
      msg += `📎 *Photo Attached:* Yes ("${selectedFile.name}"). I am sending the photo file directly in this chat!\n`;
    }
    msg += `\nPlease share my free 3D digital proof preview!`;

    const waUrl = `https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent(msg)}`;
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  const steps = [
    {
      step: '01',
      title: 'Choose Your Gift',
      desc: 'Select from smart LED bottles, vegan leather wallets, 3D portrait lamps, or executive diaries.'
    },
    {
      step: '02',
      title: 'Share Text or Photo',
      desc: 'Type your recipient’s name, anniversary date, or upload a high-resolution couple portrait or logo.'
    },
    {
      step: '03',
      title: 'Get 3D Preview in 2h',
      desc: 'Our design studio sends you an exact digital mock-up via WhatsApp for your approval.'
    },
    {
      step: '04',
      title: 'Laser Etched & Delivered',
      desc: 'Precision laser-engraved with German fiber lasers and safely dispatched with tracked delivery.'
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
          <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Custom & Personalized Gifts</span>
        </div>

        {/* HERO SECTION */}
        <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 3rem' }}>
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
            <Sparkles size={13} color="#D97706" />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#92400E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              100% FREE LASER ENGRAVING & 3D PROOFS
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.1rem, 3.6vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: '#171717',
            marginBottom: '0.75rem'
          }}>
            Turn Memories Into <span style={{ color: 'rgb(217, 119, 6)' }}>Custom Keepsakes</span>
          </h1>

          <p style={{ fontSize: '1rem', color: '#525252', lineHeight: 1.6, margin: 0 }}>
            Engrave names, special dates, or favorite photos onto our premium collection. See your free 3D digital proof on WhatsApp before we craft your order!
          </p>
        </div>

        {/* 4 HOW IT WORKS STEPS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3.5rem'
        }}>
          {steps.map((item, idx) => (
            <div 
              key={idx}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #EFEAE2',
                padding: '1.75rem 1.4rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
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
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#171717', margin: '0 0 0.45rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#666666', lineHeight: 1.55, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 2-COLUMN: ENQUIRY FORM (LEFT) + LIVE DESIGN PREVIEW / REASSURANCE (RIGHT) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
          gap: '2.5rem',
          alignItems: 'flex-start'
        }} className="custom-gifts-grid">
          
          {/* LEFT: ENQUIRY FORM WITH FILE UPLOAD */}
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
                CUSTOM DESIGN DESK
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#171717', margin: '0.35rem 0 0.5rem' }}>
                Start Your Custom Personalization
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#737373', margin: 0 }}>
                Fill out the customization brief below and attach your photo or company logo.
              </p>
            </div>

            {submitted ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem 1.5rem',
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
                  Design Request Dispatched!
                </h3>
                <p style={{ color: '#166534', fontSize: '0.92rem', maxWidth: '420px', margin: '0 auto 1.75rem', lineHeight: 1.55 }}>
                  Thank you, <strong>{form.name}</strong>. WhatsApp has opened with your customization brief. Our lead engraver will reply with your 3D proof shortly.
                </p>
                <button 
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setSubmitted(false);
                    setSelectedFile(null);
                    setFilePreview(null);
                    setForm({ name: '', phone: '', giftType: '3D Optical Acrylic LED Lamp', customText: '', instructions: '' });
                  }}
                >
                  Create Another Custom Gift
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Gift Type Pill Selector */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: '0.65rem' }}>
                    Select Gift Item:
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {[
                      '3D Optical Acrylic LED Lamp',
                      'Smart LED Temperature Flask',
                      'Italian Leather Wallet & Keychain',
                      'Solid Teakwood Carved Plaque',
                      'Couples Spotify Acrylic Frame',
                      'Executive Pen & Notebook Set'
                    ].map(type => {
                      const isSelected = form.giftType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setForm({ ...form, giftType: type })}
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
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Phone Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }} className="custom-form-row">
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: 5 }}>
                      Your Name <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="form-input" 
                      placeholder="e.g. Rahul Verma"
                      value={form.name} 
                      onChange={(e) => setForm({ ...form, name: e.target.value })} 
                      style={{ borderRadius: '12px', padding: '0.65rem 0.95rem', fontSize: '0.9rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: 5 }}>
                      WhatsApp Phone Number <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input 
                      type="tel" 
                      required 
                      className="form-input" 
                      placeholder="+91 98765 43210"
                      value={form.phone} 
                      onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                      style={{ borderRadius: '12px', padding: '0.65rem 0.95rem', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                {/* Custom Text Field */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: 5 }}>
                    Text / Name / Date to Engrave <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    placeholder="e.g. 'Pooja & Amit • 25.10.2024' or 'Dr. Vikram Joshi'"
                    value={form.customText} 
                    onChange={(e) => setForm({ ...form, customText: e.target.value })} 
                    style={{ borderRadius: '12px', padding: '0.65rem 0.95rem', fontSize: '0.9rem' }}
                  />
                </div>

                {/* File / Photo Upload */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: 5 }}>
                    Upload Photo or Logo (Optional for photo plaques / lamps):
                  </label>
                  <div style={{
                    border: '2px dashed #E5E7EB',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    textAlign: 'center',
                    background: '#FAFAFA',
                    cursor: 'pointer',
                    position: 'relative'
                  }}>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0,
                        cursor: 'pointer',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                    {filePreview ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                        <img 
                          src={filePreview} 
                          alt="Uploaded preview" 
                          style={{ width: 54, height: 54, borderRadius: '10px', objectFit: 'cover', border: '1px solid #E5E7EB' }} 
                        />
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#171717' }}>
                            {selectedFile?.name}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: '#16A34A', fontWeight: 700 }}>
                            ✓ Ready to attach on WhatsApp
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <UploadCloud size={30} color="#9CA3AF" style={{ margin: '0 auto 6px' }} />
                        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#171717' }}>
                          Click or Drag Image Here to Upload
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#737373', marginTop: 2 }}>
                          Supports JPG, PNG, WEBP up to 15MB
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional instructions */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#171717', display: 'block', marginBottom: 5 }}>
                    Special Instructions / Placement Notes:
                  </label>
                  <textarea 
                    rows={2} 
                    className="form-textarea" 
                    placeholder="e.g. Place name in cursive script at the bottom right corner..."
                    value={form.instructions} 
                    onChange={(e) => setForm({ ...form, instructions: e.target.value })} 
                    style={{ borderRadius: '12px', padding: '0.65rem 0.95rem', fontSize: '0.88rem' }}
                  />
                </div>

                {/* Submit Action */}
                <button 
                  type="submit" 
                  className="btn btn-block btn-lg" 
                  style={{ 
                    background: '#25D366',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '0.9rem 1.5rem',
                    fontSize: '0.96rem',
                    fontWeight: 800,
                    boxShadow: '0 4px 18px rgba(37, 211, 102, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    cursor: 'pointer'
                  }}
                >
                  <MessageCircle size={18} />
                  <span>Submit & Request 3D Proof via WhatsApp</span>
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: QUALITY ASSURANCE & EXAMPLES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Visual studio feature box */}
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '1px solid #EFEAE2',
              padding: '1.75rem',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
            }}>
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                height: '210px',
                marginBottom: '1.25rem'
              }}>
                <img 
                  src="/images/acrylic_lamp.jpg" 
                  alt="Personalized Laser Engraving Studio" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 12,
                  left: 12,
                  background: 'rgba(23, 23, 23, 0.85)',
                  backdropFilter: 'blur(6px)',
                  color: '#ffffff',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '9999px'
                }}>
                  ✦ Real Laser Engraved Sample
                </div>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#171717', margin: '0 0 0.5rem' }}>
                German Fiber Laser Accuracy
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#666666', lineHeight: 1.55, margin: '0 0 1rem' }}>
                Every custom text and photograph is micro-etched with sub-millimeter precision. Colors and permanent engravings never fade, peel, or scratch off.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  'Permanent permanent fiber laser etching',
                  'Free proof preview before any engraving begins',
                  'Waterproof & scratch-resistant finishes',
                  'Luxury gift packaging with ribbon included'
                ].map((perk, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.8rem', color: '#374151' }}>
                    <Check size={14} color="#16A34A" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div style={{
              background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
              border: '1.5px solid #BBF7D0',
              borderRadius: '22px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}>
              <div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#14532D', margin: 0 }}>
                  Need Direct Design Guidance?
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#166534', margin: '3px 0 0' }}>
                  Chat directly with our creative team on WhatsApp
                </p>
              </div>
              <a
                href={`https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent("Hi! I have a question about custom gift photo engraving.")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#15803D',
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  whiteSpace: 'nowrap'
                }}
              >
                Chat Now
              </a>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .custom-gifts-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .custom-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
