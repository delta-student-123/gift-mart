import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';

export const FloatingWhatsApp = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const url = `https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent(siteConfig.whatsAppGreeting)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Order or Chat on WhatsApp"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
    >
      {/* Pill message label */}
      <div style={{
        background: '#ffffff',
        color: '#171717',
        padding: '8px 14px',
        borderRadius: '9999px',
        fontSize: '0.85rem',
        fontWeight: 700,
        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.15)',
        border: '1px solid #E5E7EB',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        opacity: isHovered ? 1 : 0.95,
        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'all 200ms ease',
        userSelect: 'none'
      }}>
        <span style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#25D366',
          display: 'inline-block'
        }} />
        <span>Order on WhatsApp</span>
      </div>

      {/* Main Circular Green Icon */}
      <div style={{
        position: 'relative',
        width: '58px',
        height: '58px',
        borderRadius: '50%',
        backgroundColor: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 24px rgba(37, 211, 102, 0.45)',
        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
        transition: 'transform 200ms ease'
      }}>
        {/* WhatsApp SVG Icon */}
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#ffffff" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="#ffffff" stroke="none" />
          <path d="M16.5 14.5c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7.1-.1.3-.4.5-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.7s1.1 3.1 1.3 3.3c.2.2 2.2 3.4 5.3 4.8.7.3 1.3.5 1.8.7.8.2 1.5.2 2.1.1.7-.1 2.1-.9 2.4-1.7.3-.8.3-1.6.2-1.7-.1-.2-.3-.3-.6-.5z" fill="#25D366" />
        </svg>

        {/* Pulse Ring */}
        <div style={{
          position: 'absolute',
          top: -4,
          left: -4,
          right: -4,
          bottom: -4,
          borderRadius: '50%',
          border: '2px solid rgba(37, 211, 102, 0.5)',
          animation: 'whatsapp-pulse 2s infinite ease-out',
          pointerEvents: 'none'
        }} />
      </div>

      <style>{`
        @keyframes whatsapp-pulse {
          0% {
            transform: scale(0.95);
            opacity: 0.8;
          }
          70% {
            transform: scale(1.25);
            opacity: 0;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
