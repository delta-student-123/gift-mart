import React from 'react';
import { ShoppingBag, Truck, Calendar, MapPin, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MyOrdersPage = () => {
  const { orders, navigateTo } = useApp();

  return (
    <div style={{ backgroundColor: '#fcfbf9', minHeight: '80vh', padding: '3rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: 880 }}>
        
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
              ACCOUNT & CELEBRATIONS
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>
              My Orders & Live Tracking
            </h1>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('shop')}>
            Order Another Gift
          </button>
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#ffffff', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--secondary-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <ShoppingBag size={28} color="var(--charcoal-muted)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>No Orders Placed Yet</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--charcoal-muted)', marginBottom: '1.5rem' }}>
              When you book celebratory surprises, they will appear here with live tracking.
            </p>
            <button className="btn btn-primary" onClick={() => navigateTo('shop')}>
              Browse Gifts
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders.map(order => (
              <div 
                key={order.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-subtle)',
                  padding: '1.75rem',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1.25rem', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>
                        Order #{order.id}
                      </span>
                      <span style={{
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        background: order.status === 'Delivered' ? '#ecfdf5' : '#eff6ff',
                        color: order.status === 'Delivered' ? '#065f46' : '#1e40af'
                      }}>
                        {order.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)', marginTop: 4 }}>
                      Placed on {order.date} • Paid with {order.paymentMethod}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--charcoal-dark)' }}>
                      ₹{order.total.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--charcoal-muted)' }}>
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </div>
                  </div>
                </div>

                {/* Items preview */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={item.image} alt={item.name} style={{ width: 56, height: 56, borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--charcoal-dark)' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)' }}>
                          Qty: {item.quantity} • ₹{item.price.toLocaleString('en-IN')} each
                        </div>
                        {item.customization && (
                          <div style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                            Customized text: "{item.customization.text}"
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery & Tracking Meta */}
                <div style={{ background: 'var(--secondary-warm)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.82rem' }}>
                  <div>
                    <div style={{ color: 'var(--charcoal-muted)', fontWeight: 600 }}>DELIVERY RECIPIENT</div>
                    <div style={{ fontWeight: 700, color: 'var(--charcoal-dark)', marginTop: 2 }}>{order.recipientName}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--charcoal-muted)' }}>{order.shippingAddress}</div>
                  </div>

                  <div>
                    <div style={{ color: 'var(--charcoal-muted)', fontWeight: 600 }}>SCHEDULED SLOT</div>
                    <div style={{ fontWeight: 700, color: 'var(--charcoal-dark)', marginTop: 2 }}>{order.deliverySlot}</div>
                  </div>

                  <div>
                    <div style={{ color: 'var(--charcoal-muted)', fontWeight: 600 }}>COURIER PARTNER</div>
                    <div style={{ fontWeight: 700, color: '#2563eb', marginTop: 2 }}>{order.courier} ({order.trackingId})</div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
