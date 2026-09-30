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
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title="Order on WhatsApp"
      aria-label="Order on WhatsApp"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
    >
      {/* Main Circular Green WhatsApp Icon Button */}
      <div style={{
        position: 'relative',
        width: '58px',
        height: '58px',
        borderRadius: '50%',
        backgroundColor: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 20px rgba(37, 211, 102, 0.45)',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 200ms ease, box-shadow 200ms ease'
      }}>
        {/* Official WhatsApp SVG Icon */}
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="#ffffff"
          style={{ display: 'block' }}
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.9 12.04 8.02 12.2C8.14 12.37 9.73 14.83 12.16 15.88C12.74 16.13 13.19 16.28 13.54 16.39C14.12 16.57 14.65 16.55 15.07 16.49C15.54 16.42 16.51 15.9 16.71 15.33C16.92 14.76 16.92 14.27 16.86 14.17C16.79 14.07 16.63 14.01 16.39 13.89C16.14 13.77 14.91 13.16 14.68 13.08C14.45 13 14.29 12.96 14.12 13.2C13.96 13.45 13.49 14.01 13.35 14.17C13.21 14.33 13.07 14.35 12.83 14.23C12.58 14.11 11.78 13.85 10.84 13.01C10.11 12.36 9.62 11.55 9.47 11.31C9.33 11.06 9.46 10.93 9.58 10.81C9.69 10.7 9.83 10.52 9.95 10.37C10.07 10.23 10.11 10.13 10.19 9.96C10.27 9.8 10.23 9.66 10.17 9.54C10.11 9.41 9.64 8.27 9.45 7.8C9.26 7.34 9.07 7.4 8.92 7.39L8.53 7.33Z" />
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
