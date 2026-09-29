import React, { useState } from 'react';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Tag, 
  Bell, 
  Plus, 
  Trash2, 
  LogOut, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Truck,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { AVAILABLE_COUPONS } from '../data/products';

export const AccountPage = () => {
  const { 
    currentUser, 
    setCurrentUser, 
    orders, 
    wishlist, 
    productsList, 
    addresses, 
    addAddress, 
    giftReminders, 
    addGiftReminder, 
    removeGiftReminder,
    navigateTo, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'orders', 'reminders', 'addresses', 'coupons', 'wishlist'

  // New Reminder Form State
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [remName, setRemName] = useState('');
  const [remRel, setRemRel] = useState('Mother');
  const [remOccasion, setRemOccasion] = useState('Birthday');
  const [remDate, setRemDate] = useState('');

  // New Address Form State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('New Delhi');
  const [addrPincode, setAddrPincode] = useState('110001');

  const handleAddReminderSubmit = (e) => {
    e.preventDefault();
    if (!remName || !remDate) return;
    addGiftReminder({
      name: remName,
      relationship: remRel,
      occasion: remOccasion,
      date: remDate
    });
    setRemName('');
    setRemDate('');
    setShowReminderForm(false);
  };

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    if (!addrStreet) return;
    addAddress({
      fullName: currentUser.name,
      phone: currentUser.phone,
      street: addrStreet,
      city: addrCity,
      state: 'Delhi NCR',
      pincode: addrPincode,
      type: 'Home',
      isDefault: false
    });
    setAddrStreet('');
    setShowAddressForm(false);
  };

  const wishlistProducts = productsList.filter(p => wishlist.includes(p.id));

  return (
    <div style={{ backgroundColor: '#fcfbf9', minHeight: '85vh', padding: '3rem 0 6rem' }}>
      <div className="container">
        
        {/* Top Header Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-2xl)',
          padding: '2rem',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary) 0%, #ad1457 100%)',
              color: '#ffffff',
              fontSize: '1.6rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(194, 24, 91, 0.25)'
            }}>
              {currentUser.name[0]}
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                CUSTOMER DASHBOARD
              </div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>
                Welcome back, {currentUser.name}!
              </h1>
              <div style={{ fontSize: '0.84rem', color: 'var(--charcoal-muted)' }}>
                {currentUser.email} • {currentUser.phone}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('shop')}>
              Browse Gifts
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => showToast('Signed out successfully')}>
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Sidebar Nav + Main Dashboard Area */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem', alignItems: 'flex-start' }} className="account-grid">
          
          {/* Navigation Sidebar */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)', padding: '1rem', boxShadow: 'var(--shadow-xs)' }}>
            {[
              { id: 'profile', label: 'My Profile', icon: User },
              { id: 'orders', label: 'My Orders', icon: ShoppingBag, count: orders.length },
              { id: 'reminders', label: 'Gift Reminders', icon: Bell, count: giftReminders.length, highlight: true },
              { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.length },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: addresses.length },
              { id: 'coupons', label: 'Coupons & Offers', icon: Tag, count: AVAILABLE_COUPONS.length }
            ].map(item => {
              const Icon = item.icon;
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: isSelected ? 'var(--primary-subtle)' : 'transparent',
                    color: isSelected ? 'var(--primary)' : 'var(--charcoal-dark)',
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    marginBottom: 4,
                    transition: 'all 150ms'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Icon size={17} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span style={{
                      padding: '2px 7px',
                      borderRadius: 'var(--radius-full)',
                      background: isSelected ? 'var(--primary)' : '#f1f5f9',
                      color: isSelected ? '#ffffff' : '#64748b',
                      fontSize: '0.74rem',
                      fontWeight: 700
                    }}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Dashboard Content Area */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)', padding: '2rem', boxShadow: 'var(--shadow-xs)' }}>
            
            {/* TAB: PROFILE */}
            {activeTab === 'profile' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>Personal Profile</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Full Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={currentUser.name} 
                      onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })} 
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Email Address</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      value={currentUser.email} 
                      onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} 
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      value={currentUser.phone} 
                      onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })} 
                    />
                  </div>
                </div>
                <button className="btn btn-primary" onClick={() => showToast('Profile details updated!')}>
                  Save Changes
                </button>
              </div>
            )}

            {/* TAB: ORDERS */}
            {activeTab === 'orders' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Orders & Live Tracking</h3>
                  <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('track-order')}>
                    Visual Tracker
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {orders.map(order => (
                    <div key={order.id} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                        <div>
                          <strong style={{ fontSize: '1rem', color: 'var(--charcoal-dark)' }}>Order #{order.id}</strong>
                          <div style={{ fontSize: '0.76rem', color: 'var(--charcoal-muted)' }}>Booked for {order.deliveryDate} • {order.deliverySlot}</div>
                        </div>
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.76rem',
                          fontWeight: 800,
                          background: order.status === 'Delivered' ? 'var(--accent-emerald-light)' : '#eff6ff',
                          color: order.status === 'Delivered' ? 'var(--accent-emerald)' : '#1e40af'
                        }}>
                          {order.status}
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.85rem' }}>
                          {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                        </div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
                          ₹{order.total.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: GIFT REMINDERS ("Never Miss a Special Date") */}
            {activeTab === 'reminders' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Never Miss a Special Date</h3>
                    <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-muted)' }}>
                      Save birthdays, anniversaries & milestones. Step IN Gift Mart will alert you 7 days in advance with curated gift suggestions.
                    </p>
                  </div>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => setShowReminderForm(!showReminderForm)}
                    style={{ gap: 4 }}
                  >
                    <Plus size={15} /> Add Reminder
                  </button>
                </div>

                {/* Add Reminder Form */}
                {showReminderForm && (
                  <form onSubmit={handleAddReminderSubmit} style={{ background: 'var(--secondary-warm)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem', border: '1px solid var(--secondary-border)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Name:</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Sneha" 
                          className="form-input" 
                          value={remName} 
                          onChange={(e) => setRemName(e.target.value)} 
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Relationship:</label>
                        <select className="form-select" value={remRel} onChange={(e) => setRemRel(e.target.value)}>
                          <option value="Mother">Mother</option>
                          <option value="Father">Father</option>
                          <option value="Wife">Wife</option>
                          <option value="Husband">Husband</option>
                          <option value="Girlfriend">Girlfriend</option>
                          <option value="Boyfriend">Boyfriend</option>
                          <option value="Friend">Friend</option>
                          <option value="Sister">Sister</option>
                          <option value="Brother">Brother</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Occasion:</label>
                        <select className="form-select" value={remOccasion} onChange={(e) => setRemOccasion(e.target.value)}>
                          <option value="Birthday">Birthday 🎂</option>
                          <option value="Anniversary">Anniversary 💍</option>
                          <option value="Promotion">Promotion 🎉</option>
                          <option value="Festival">Festival 🪔</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Celebration Date:</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. 24 Oct" 
                          className="form-input" 
                          value={remDate} 
                          onChange={(e) => setRemDate(e.target.value)} 
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button type="submit" className="btn btn-primary btn-sm">Save Reminder</button>
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowReminderForm(false)}>Cancel</button>
                    </div>
                  </form>
                )}

                {/* Reminder Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  {giftReminders.map(rem => (
                    <div
                      key={rem.id}
                      style={{
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-subtle)',
                        background: '#ffffff',
                        position: 'relative'
                      }}
                    >
                      <button
                        onClick={() => removeGiftReminder(rem.id)}
                        style={{ position: 'absolute', top: 12, right: 12, border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--charcoal-muted)' }}
                      >
                        <Trash2 size={15} />
                      </button>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <Calendar size={15} color="var(--primary)" />
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)' }}>{rem.occasion.toUpperCase()}</span>
                      </div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>{rem.name}</h4>
                      <div style={{ fontSize: '0.82rem', color: 'var(--charcoal-muted)' }}>{rem.relationship} • {rem.date}</div>

                      <div style={{ marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.76rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                          ⏳ In {rem.daysLeft} days
                        </span>
                        <button 
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.25rem 0.65rem', fontSize: '0.74rem' }}
                          onClick={() => navigateTo('shop', { occasion: rem.occasion.toLowerCase() })}
                        >
                          Find Gifts
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>My Saved Wishlist ({wishlist.length})</h3>
                {wishlistProducts.length === 0 ? (
                  <p style={{ color: 'var(--charcoal-muted)' }}>No items in wishlist yet.</p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
                    {wishlistProducts.map(p => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: ADDRESSES */}
            {activeTab === 'addresses' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Saved Delivery Addresses</h3>
                  <button className="btn btn-primary btn-sm" onClick={() => setShowAddressForm(!showAddressForm)}>
                    + Add New Address
                  </button>
                </div>

                {showAddressForm && (
                  <form onSubmit={handleAddAddressSubmit} style={{ background: 'var(--secondary-warm)', padding: '1rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem' }}>
                    <input 
                      type="text" 
                      required 
                      placeholder="Street address, building, floor" 
                      className="form-input" 
                      value={addrStreet} 
                      onChange={(e) => setAddrStreet(e.target.value)} 
                      style={{ marginBottom: '0.5rem' }} 
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <input type="text" placeholder="City" className="form-input" value={addrCity} onChange={(e) => setAddrCity(e.target.value)} />
                      <input type="text" placeholder="Pincode" className="form-input" value={addrPincode} onChange={(e) => setAddrPincode(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm">Save Address</button>
                  </form>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {addresses.map(addr => (
                    <div key={addr.id} style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: '#ffffff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <strong>{addr.fullName} ({addr.type})</strong>
                        {addr.isDefault && <span className="badge badge-emerald">Default</span>}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--charcoal-body)' }}>{addr.street}, {addr.city} - {addr.pincode}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)' }}>Phone: {addr.phone}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: COUPONS */}
            {activeTab === 'coupons' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>Available Coupons & Offers</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  {AVAILABLE_COUPONS.map(c => (
                    <div key={c.code} style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1.5px dashed var(--primary)', background: 'var(--primary-subtle)' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--primary)', marginBottom: 4 }}>{c.code}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--charcoal-dark)', marginBottom: 8 }}>{c.description}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)' }}>Valid on min order of ₹{c.minOrderValue}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 800px) {
          .account-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
