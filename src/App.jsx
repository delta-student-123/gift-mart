import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PersonalizerModal } from './components/PersonalizerModal';
import { Toast } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AdminPanel } from './pages/AdminPanel';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { AccountPage } from './pages/AccountPage';
import { CorporatePage } from './pages/CorporatePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { BlogPage } from './pages/BlogPage';

const AppContent = () => {
  const { currentView, selectedProduct, viewParams, navigateTo } = useApp();

  // If user navigated to gift-finder, smooth scroll to section
  useEffect(() => {
    if (currentView === 'gift-finder') {
      const el = document.getElementById('gift-finder-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [currentView]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* HOMEPAGE */}
        {(currentView === 'home' || currentView === 'gift-finder') && <HomePage />}

        {/* SHOP & CATEGORIES */}
        {(currentView === 'shop' || currentView === 'occasions' || currentView === 'gifts' || currentView === 'offers') && (
          <ShopPage />
        )}

        {/* PRE-FILTERED CATEGORIES */}
        {currentView === 'personalized-gifts' && (
          <ShopPage />
        )}
        {currentView === 'gift-hampers' && (
          <ShopPage />
        )}
        {currentView === 'wishlist' && (
          <AccountPage />
        )}

        {/* PRODUCT DETAILS STANDALONE */}
        {currentView === 'product-detail' && (
          <ProductDetailPage product={selectedProduct || viewParams.product} />
        )}

        {/* CORPORATE GIFTING */}
        {currentView === 'corporate-gifting' && <CorporatePage />}

        {/* ORDER CONFIRMATION */}
        {currentView === 'order-confirmation' && <OrderSuccessPage />}

        {/* TRACK ORDER / MY ORDERS */}
        {(currentView === 'track-order' || currentView === 'my-orders') && <TrackOrderPage />}

        {/* CUSTOMER ACCOUNT */}
        {currentView === 'account' && <AccountPage />}

        {/* ABOUT US */}
        {currentView === 'about-us' && <AboutUsPage />}

        {/* CONTACT US */}
        {currentView === 'contact-us' && <ContactUsPage />}

        {/* BLOG / INSPIRATION */}
        {currentView === 'blog' && <BlogPage />}

        {/* ADMIN PANEL */}
        {currentView === 'admin' && <AdminPanel />}
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <ProductDetailModal />
      <PersonalizerModal />
      <Toast />
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Step IN Gift Mart ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: '#faf7f2',
          textAlign: 'center',
          fontFamily: 'DM Sans, sans-serif'
        }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎁</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.75rem' }}>
            Oops! Something went wrong
          </h1>
          <p style={{ maxWidth: '480px', color: '#666', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            We encountered a hiccup while preparing your gifting experience. Don't worry, your cart and session are safe.
          </p>
          <button
            onClick={() => {
              window.location.href = '/';
            }}
            style={{
              padding: '0.85rem 1.75rem',
              backgroundColor: '#c2185b',
              color: '#ffffff',
              border: 'none',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(194, 24, 91, 0.35)'
            }}
          >
            Return to Homepage
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
