import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Upload, 
  Check, 
  Image as ImageIcon,
  Type,
  Gift,
  ShoppingBag,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PersonalizerModal = () => {
  const { 
    personalizerProduct, 
    closePersonalizer, 
    addToCart 
  } = useApp();

  const [customText, setCustomText] = useState('Rahul & Sneha');
  const [recipientDate, setRecipientDate] = useState('24.10.2024');
  const [selectedFont, setSelectedFont] = useState('serif'); // 'serif', 'sans', 'cursive'
  const [selectedAlignment, setSelectedAlignment] = useState('center'); // 'left', 'center', 'right'
  const [uploadedPhoto, setUploadedPhoto] = useState(null);

  if (!personalizerProduct) return null;

  const handleFakePhotoUpload = (e) => {
    // Mock image upload
    setUploadedPhoto('https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80');
  };

  const handleConfirmCustomization = () => {
    addToCart(personalizerProduct, 1, {
      text: customText,
      date: recipientDate,
      font: selectedFont,
      alignment: selectedAlignment,
      photoUrl: uploadedPhoto
    });
    closePersonalizer();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(5px)',
      zIndex: 280,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div 
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: 820,
          maxHeight: '92vh',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-2xl)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden'
        }}
      >
        {/* Top Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--secondary-warm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--accent-gold)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>
                Personalize Your Gift
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)' }}>
                Live Laser Engraving & Photo Customizer
              </span>
            </div>
          </div>

          <button 
            type="button"
            onClick={closePersonalizer}
            style={{
              border: 'none',
              background: '#ffffff',
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} color="var(--charcoal-dark)" />
          </button>
        </div>

        {/* Studio Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.75rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
            
            {/* Left: Interactive Real-time Mockup */}
            <div style={{
              background: '#171717',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ position: 'relative', width: 260, height: 260, borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}>
                <img 
                  src={uploadedPhoto || personalizerProduct.image} 
                  alt={personalizerProduct.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Live Laser Engraving Overlay Simulation */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: selectedAlignment === 'left' ? 'flex-start' : selectedAlignment === 'right' ? 'flex-end' : 'center',
                  justifyContent: 'center',
                  color: '#F5A800',
                  textAlign: selectedAlignment,
                  padding: '1.5rem',
                  textShadow: '0 0 12px rgba(245, 168, 0, 0.9), 0 0 20px rgba(245, 168, 0, 0.6)'
                }}>
                  <div style={{
                    fontSize: personalizerProduct.category === 'bottles' && (customText?.length > 12) ? '0.92rem' : '1.25rem',
                    maxWidth: personalizerProduct.category === 'bottles' ? '120px' : '90%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontWeight: 700,
                    fontFamily: selectedFont === 'serif' ? 'var(--font-serif)' : selectedFont === 'cursive' ? 'cursive' : 'var(--font-sans)',
                    lineHeight: 1.2,
                    marginBottom: 4
                  }}>
                    {customText || 'Your Custom Names'}
                  </div>
                  {recipientDate && (
                    <div style={{ fontSize: '0.78rem', letterSpacing: '0.12em', fontWeight: 600, maxWidth: personalizerProduct.category === 'bottles' ? '110px' : '90%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {recipientDate}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginTop: '1rem', fontSize: '0.78rem', color: '#6B6B6B', textAlign: 'center' }}>
                ✨ 3D Optical Laser Preview (Actual gift will match this preview)
              </div>
            </div>

            {/* Right: Customization Controls */}
            <div>
              {/* Product Info */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>
                  {personalizerProduct.name}
                </h4>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--primary)', marginTop: 4 }}>
                  ₹{personalizerProduct.price.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Text Input */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: 4, color: 'var(--charcoal-dark)' }}>
                  Names / Custom Text (Max 30 chars):
                </label>
                <div style={{ position: 'relative' }}>
                  <Type size={16} color="var(--charcoal-muted)" style={{ position: 'absolute', top: 12, left: 10 }} />
                  <input
                    type="text"
                    maxLength={30}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '2.2rem' }}
                    placeholder="e.g. Rahul & Sneha"
                  />
                </div>
              </div>

              {/* Date Input */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: 4, color: 'var(--charcoal-dark)' }}>
                  Special Date or Subtext:
                </label>
                <input
                  type="text"
                  maxLength={20}
                  value={recipientDate}
                  onChange={(e) => setRecipientDate(e.target.value)}
                  className="form-input"
                  placeholder="e.g. 24.10.2024 / Forever"
                />
              </div>

              {/* Font Selector */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: 6, color: 'var(--charcoal-dark)' }}>
                  Laser Engraving Typography:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {[
                    { id: 'serif', name: 'Royal Serif', style: 'var(--font-serif)' },
                    { id: 'sans', name: 'Modern Sans', style: 'var(--font-sans)' },
                    { id: 'cursive', name: 'Romantic Script', style: 'cursive' }
                  ].map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFont(f.id)}
                      style={{
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: selectedFont === f.id ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                        background: selectedFont === f.id ? 'var(--primary-subtle)' : '#ffffff',
                        fontFamily: f.style,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Laser Engraving Alignment */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: 6, color: 'var(--charcoal-dark)' }}>
                  Laser Engraving Alignment:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {[
                    { id: 'left', label: 'Left', icon: AlignLeft },
                    { id: 'center', label: 'Center', icon: AlignCenter },
                    { id: 'right', label: 'Right', icon: AlignRight }
                  ].map(align => {
                    const Icon = align.icon;
                    const isActive = selectedAlignment === align.id;
                    return (
                      <button
                        key={align.id}
                        type="button"
                        onClick={() => setSelectedAlignment(align.id)}
                        style={{
                          padding: '0.45rem',
                          borderRadius: 'var(--radius-md)',
                          border: isActive ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                          background: isActive ? 'var(--primary-subtle)' : '#ffffff',
                          color: isActive ? 'var(--primary-dark)' : 'var(--charcoal-muted)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 5
                        }}
                      >
                        <Icon size={14} />
                        <span>{align.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Photo Upload Mockup */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: 4, color: 'var(--charcoal-dark)' }}>
                  Upload Photograph (Optional):
                </label>
                <button
                  type="button"
                  onClick={handleFakePhotoUpload}
                  className="btn btn-secondary btn-block"
                  style={{ gap: 6, borderStyle: 'dashed', padding: '0.65rem' }}
                >
                  <Upload size={16} />
                  <span>{uploadedPhoto ? '✓ Photograph Attached (Change)' : 'Choose High-Res Image'}</span>
                </button>
              </div>

              {/* Confirm Button */}
              <button
                type="button"
                onClick={handleConfirmCustomization}
                className="btn btn-primary btn-block btn-lg"
                style={{ gap: 6, boxShadow: 'var(--shadow-md)' }}
              >
                <ShoppingBag size={18} />
                <span>Add Customized Gift to Cart</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
