import React from 'react';

/**
 * Step In Gift Mart Logo Component
 * Uses the exact logo artwork provided by the user with the brand color palette:
 * - Charcoal #171717
 * - Premium Gold #F5A800
 * - Warm Ivory #FFF9F0
 */
export const Logo = ({
  variant = 'horizontal',
  height = 50,
  size,
  lightMode = false,
  className = '',
  style = {},
  showSubtitle = false,
  onClick
}) => {
  const effectiveHeight = height || size || 50;

  if (variant === 'square' || variant === 'stacked') {
    return (
      <div
        onClick={onClick}
        className={`brand-logo brand-logo-stacked ${className}`}
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: onClick ? 'pointer' : 'default',
          userSelect: 'none',
          ...style
        }}
      >
        <img
          src="/logo-transparent.png"
          alt="Step In Gift Mart"
          style={{
            height: effectiveHeight * 1.35,
            width: 'auto',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      </div>
    );
  }

  if (variant === 'mark') {
    return (
      <img
        src="/logo-mark.png"
        alt="Step In Mark"
        onClick={onClick}
        style={{
          height: effectiveHeight,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
          cursor: onClick ? 'pointer' : 'default',
          ...style
        }}
      />
    );
  }

  // Light Mode (for dark footers & dark backgrounds)
  if (lightMode) {
    return (
      <div
        onClick={onClick}
        className={`brand-logo brand-logo-horizontal ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.65rem',
          cursor: onClick ? 'pointer' : 'default',
          userSelect: 'none',
          flexShrink: 0,
          ...style
        }}
      >
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '3px 6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}>
          <img
            src="/logo-mark.png"
            alt="Step In Mark"
            style={{
              height: effectiveHeight * 0.85,
              width: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>
        <div>
          <div style={{
            fontSize: '1.42rem',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            fontFamily: 'var(--font-sans)'
          }}>
            Step In
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginTop: '0.2rem'
          }}>
            <span style={{ width: 12, height: 2, background: 'var(--primary)', borderRadius: 2 }} />
            <span style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              color: 'var(--primary)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase'
            }}>
              Gift Mart
            </span>
            <span style={{ width: 12, height: 2, background: 'var(--primary)', borderRadius: 2 }} />
          </div>
        </div>
      </div>
    );
  }

  // Default: Header Horizontal Lockup using the exact image
  return (
    <div
      onClick={onClick}
      className={`brand-logo brand-logo-horizontal ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        flexShrink: 0,
        ...style
      }}
    >
      <img
        src="/logo-horizontal.png"
        alt="Step In Gift Mart"
        style={{
          height: effectiveHeight,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
          maxHeight: '56px'
        }}
      />
      {showSubtitle && (
        <span style={{
          fontSize: '0.66rem',
          fontWeight: 600,
          color: 'var(--charcoal-muted)',
          letterSpacing: '0.02em',
          marginLeft: '0.35rem',
          borderLeft: '1px solid var(--border-subtle)',
          paddingLeft: '0.65rem',
          maxWidth: '160px',
          lineHeight: 1.25
        }}>
          India's Best Personalized Gifts
        </span>
      )}
    </div>
  );
};

export const LogoMark = ({ size = 48, style = {} }) => (
  <img
    src="/logo-mark.png"
    alt="Step In Mark"
    style={{
      height: size,
      width: 'auto',
      objectFit: 'contain',
      display: 'block',
      ...style
    }}
  />
);

export default Logo;
