import React, { useState } from 'react';
import { 
  Search, 
  Truck, 
  Package, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Calendar, 
  AlertCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TrackOrderPage = () => {
  const { orders, navigateTo } = useApp();
  const [orderQuery, setOrderQuery] = useState(orders[0]?.id || 'ORD-98231');
  const [searchedOrder, setSearchedOrder] = useState(orders[0] || null);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    const found = orders.find(o => o.id.toLowerCase() === orderQuery.trim().toLowerCase());
    if (found) {
      setSearchedOrder(found);
    } else {
      // Mock result for demo
      setSearchedOrder({
        id: orderQuery.toUpperCase(),
        date: '2026-09-28',
        recipientName: 'Recipient Customer',
        shippingAddress: 'Connaught Place, New Delhi - 110001',
        deliverySlot: 'Evening Slot (5:00 PM - 8:00 PM)',
        courier: 'Delhivery Express Air',
        trackingId: 'DLV-' + Math.floor(1000000000 + Math.random() * 9000000000),
        status: 'Out for Delivery',
        items: [{ name: 'Royal Velvet Hamper & Cake Combo', quantity: 1, price: 2199 }]
      });
    }
  };

  // 6 Visual stages required:
  // Order Confirmed -> Gift Being Prepared -> Packed -> Shipped -> Out for Delivery -> Delivered
  const stages = [
    { title: 'Order Confirmed', time: '10:00 AM, 28 Sep', desc: 'Order received & payment confirmed via Razorpay' },
    { title: 'Gift Being Prepared', time: '11:15 AM, 28 Sep', desc: 'Fresh blooms hand-tied & artisan cake fresh baked' },
    { title: 'Packed', time: '12:30 PM, 28 Sep', desc: 'Placed in signature gift box with greeting card' },
    { title: 'Shipped', time: '01:45 PM, 28 Sep', desc: 'Handed over to courier express logistics' },
    { title: 'Out for Delivery', time: '03:15 PM, 28 Sep', desc: 'Delivery partner on van en-route to address' },
    { title: 'Delivered', time: 'Expected 05:30 PM', desc: 'Handed to recipient with festive joy' }
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case 'Confirmed': return 0;
      case 'Processing': return 1;
      case 'Packed': return 2;
      case 'Dispatched':
      case 'Shipped': return 3;
      case 'In Transit': return 3;
      case 'Out for Delivery': return 4;
      case 'Delivered': return 5;
      default: return 4;
    }
  };

  const currentStageIndex = searchedOrder ? getStageIndex(searchedOrder.status) : 4;

  return (
    <div style={{ backgroundColor: '#fcfbf9', minHeight: '85vh', padding: '3.5rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: 840 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-tag" style={{ background: '#fdf2f8', color: 'var(--primary)' }}>
            <Truck size={14} />
            <span>LIVE COURIER & FULFILLMENT TRACKING</span>
          </div>
          <h1 style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--charcoal-dark)', marginBottom: '0.65rem' }}>
            Track Your Celebration Surprise
          </h1>
          <p style={{ fontSize: '0.98rem', color: 'var(--charcoal-muted)' }}>
            Enter your Step IN Gift Mart Order Number or Delhivery AWB Tracking ID
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleTrackSubmit} style={{ maxWidth: 520, margin: '0 auto 3rem', display: 'flex', gap: 8 }}>
          <input
            type="text"
            required
            placeholder="e.g. ORD-98231 or SIGM-123456"
            className="form-input"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            style={{ fontWeight: 600, fontSize: '0.94rem' }}
          />
          <button type="submit" className="btn btn-primary" style={{ gap: 6 }}>
            <Search size={16} /> Track
          </button>
        </form>

        {searchedOrder && (
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-2xl)',
            padding: '2.5rem',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)'
          }}>
            {/* Order Meta Bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.25rem', marginBottom: '2rem', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)', fontWeight: 700, textTransform: 'uppercase' }}>ORDER NUMBER</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--charcoal-dark)' }}>#{searchedOrder.id}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)', fontWeight: 700, textTransform: 'uppercase' }}>COURIER PARTNER</div>
                <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#2563eb' }}>{searchedOrder.courier || 'Delhivery Express Air'}</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--charcoal-muted)', fontFamily: 'monospace' }}>AWB: {searchedOrder.trackingId}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)', fontWeight: 700, textTransform: 'uppercase' }}>CURRENT STATUS</div>
                <span className="badge badge-emerald" style={{ fontSize: '0.82rem', padding: '4px 10px' }}>
                  {searchedOrder.status}
                </span>
              </div>
            </div>

            {/* 6-Stage Visual Timeline */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--charcoal-dark)' }}>
                Fulfillment Journey:
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
                {stages.map((stage, idx) => {
                  const isCompleted = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <div key={stage.title} style={{ display: 'flex', gap: '1.25rem', position: 'relative' }}>
                      {/* Left Dot & Vertical Line */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: isCompleted ? 'var(--primary)' : '#e2e8f0',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          boxShadow: isCurrent ? '0 0 0 4px rgba(194, 24, 91, 0.2)' : 'none',
                          zIndex: 2
                        }}>
                          {isCompleted ? <CheckCircle2 size={16} /> : idx + 1}
                        </div>
                        {idx < stages.length - 1 && (
                          <div style={{
                            width: 2,
                            flex: 1,
                            background: idx < currentStageIndex ? 'var(--primary)' : '#e2e8f0',
                            margin: '4px 0'
                          }} />
                        )}
                      </div>

                      {/* Right Stage Content */}
                      <div style={{ paddingBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                          <strong style={{ fontSize: '0.98rem', color: isCompleted ? 'var(--charcoal-dark)' : 'var(--charcoal-muted)' }}>
                            {stage.title}
                          </strong>
                          <span style={{ fontSize: '0.76rem', color: isCurrent ? 'var(--primary)' : 'var(--charcoal-muted)', fontWeight: isCurrent ? 700 : 500 }}>
                            {stage.time}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-muted)', marginTop: 2 }}>
                          {stage.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recipient & Slot Details */}
            <div style={{ background: 'var(--secondary-warm)', padding: '1.25rem', borderRadius: 'var(--radius-xl)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.84rem' }}>
              <div>
                <div style={{ color: 'var(--charcoal-muted)', fontWeight: 600 }}>DELIVERY RECIPIENT</div>
                <div style={{ fontWeight: 800, color: 'var(--charcoal-dark)', marginTop: 2 }}>{searchedOrder.recipientName}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)' }}>{searchedOrder.shippingAddress}</div>
              </div>
              <div>
                <div style={{ color: 'var(--charcoal-muted)', fontWeight: 600 }}>SCHEDULED WINDOW</div>
                <div style={{ fontWeight: 800, color: 'var(--charcoal-dark)', marginTop: 2 }}>{searchedOrder.deliverySlot}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700 }}>Temperature-Controlled Van</div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
