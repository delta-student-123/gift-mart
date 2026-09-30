import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PersonalizerModal } from './components/PersonalizerModal';
import { Toast } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AdminPanel } from './pages/AdminPanel';
import { AccountPage } from './pages/AccountPage';
import { CorporatePage } from './pages/CorporatePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { BlogPage } from './pages/BlogPage';
import { OccasionsPage } from './pages/OccasionsPage';
import { CustomGiftsPage } from './pages/CustomGiftsPage';
import { FaqDeliveryPage } from './pages/FaqDeliveryPage';

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
        {(currentView === 'shop' || currentView === 'gifts' || currentView === 'offers') && (
          <ShopPage />
        )}

        {/* OCCASIONS & CURATED COLLECTIONS */}
        {currentView === 'occasions' && <OccasionsPage />}

        {/* CUSTOM & PERSONALIZED GIFTS */}
        {(currentView === 'custom-gifts' || currentView === 'custom') && <CustomGiftsPage />}

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
        {(currentView === 'corporate-gifting' || currentView === 'corporate') && <CorporatePage />}

        {/* FAQ & DELIVERY INFORMATION */}
        {(currentView === 'faq-delivery' || currentView === 'faq') && <FaqDeliveryPage />}

        {/* CUSTOMER ACCOUNT */}
        {currentView === 'account' && <AccountPage />}

        {/* ABOUT US */}
        {(currentView === 'about-us' || currentView === 'about') && <AboutUsPage />}

        {/* CONTACT US */}
        {(currentView === 'contact-us' || currentView === 'contact') && <ContactUsPage />}

        {/* BLOG / INSPIRATION */}
        {currentView === 'blog' && <BlogPage />}

        {/* ADMIN PANEL */}
        {currentView === 'admin' && <AdminPanel />}
      </main>

      <Footer />

      {/* Floating WhatsApp Action Button on Every Page */}
      <FloatingWhatsApp />

      {/* Modals & Toast */}
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
        <div style={{ padding: '3rem 1.5rem', textAlign: 'center', background: '#FCFBF9', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ maxWidth: 500, background: '#ffffff', padding: '2.5rem', borderRadius: 24, boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid #EFEAE2' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#171717', marginBottom: '0.75rem' }}>Something went wrong</h2>
            <p style={{ color: '#525252', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              We encountered an issue loading this view. You can reload the page or return to the catalog homepage.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/';
              }}
              style={{
                background: '#171717',
                color: '#ffffff',
                border: 'none',
                padding: '0.65rem 1.4rem',
                borderRadius: '9999px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Return to Catalog Home
            </button>
          </div>
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
