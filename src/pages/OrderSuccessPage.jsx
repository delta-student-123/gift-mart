import React from 'react';
import { CheckCircle2, Package, Truck, Calendar, MapPin, ArrowRight, Gift } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrderSuccessPage = () => {
  const { viewParams, navigateTo } = useApp();
  const order = viewParams.order;

  if (!order) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <h2>No Recent Order Found</h2>
        <button className="btn btn-primary" onClick={() => navigateTo('home')} style={{ marginTop: '1rem' }}>
          Back to Store
        </button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fcfbf9', minHeight: '80vh', padding: '3.5rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: 760 }}>
        
        {/* Success Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-2xl)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-subtle)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Confetti Ribbon Banner */}
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--accent-emerald-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', border: '3px solid #c2e2d5' }}>
            <CheckCircle2 size={44} color="var(--accent-emerald)" />
          </div>

          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
            PAYMENT CONFIRMED VIA RAZORPAY
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--charcoal-dark)', marginBottom: '0.65rem' }}>
            Celebration Surprise Booked!
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--charcoal-body)', maxWidth: 520, margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
            Thank you! Your order <strong style={{ color: 'var(--charcoal-dark)' }}>#{order.id}</strong> has been received by our master bakers & florists.
          </p>

          {/* Courier Shipping Details Box */}
          <div style={{
            background: 'var(--secondary-warm)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            textAlign: 'left',
            marginBottom: '2rem',
            border: '1px solid var(--secondary-border)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)', fontWeight: 600 }}>DELIVERY SLOT</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--charcoal-dark)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <Calendar size={15} color="var(--primary)" />
                  <span>{order.deliverySlot}</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)', fontWeight: 600 }}>COURIER / DISPATCH</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--charcoal-dark)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <Truck size={15} color="var(--primary-dark)" />
                  <span>{order.courier} ({order.trackingId})</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)', fontWeight: 600 }}>DELIVERING TO</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--charcoal-dark)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <MapPin size={15} color="var(--accent-emerald)" />
                  <span>{order.recipientName}</span>
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--charcoal-muted)' }}>{order.shippingAddress}</div>
              </div>
            </div>

            {/* Courier Status Timeline */}
            <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--secondary-border)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--charcoal-dark)', marginBottom: '0.75rem' }}>
                LIVE DISPATCH TIMELINE:
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                {[
                  { step: 'Order Placed', time: 'Just now', active: true },
                  { step: 'Crafting / Baking', time: 'In Progress', active: true },
                  { step: 'Courier Pickup', time: 'Delhivery', active: false },
                  { step: 'Out for Delivery', time: 'Pending', active: false },
                  { step: 'Delivered', time: 'Celebration!', active: false }
                ].map((s, idx) => (
                  <div key={s.step} style={{ textAlign: 'center', flex: 1, position: 'relative' }}>
                    <div style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: s.active ? 'var(--primary)' : '#e2e8f0',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      margin: '0 auto 6px',
                      boxShadow: s.active ? '0 0 0 3px rgba(194, 24, 91, 0.2)' : 'none'
                    }}>
                      {idx + 1}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: s.active ? 'var(--charcoal-dark)' : 'var(--charcoal-muted)' }}>
                      {s.step}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: s.active ? 'var(--primary)' : 'var(--charcoal-muted)' }}>
                      {s.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary"
              onClick={() => navigateTo('my-orders')}
              style={{ gap: 6 }}
            >
              <span>View in My Orders</span>
              <ArrowRight size={16} />
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigateTo('shop')}
            >
              Continue Shopping
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
