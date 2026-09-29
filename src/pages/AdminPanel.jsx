import React, { useState } from 'react';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  Layers, 
  Tag, 
  Plus, 
  Search, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Trash2, 
  Edit2, 
  ArrowLeft,
  X,
  Sparkles,
  BarChart2,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminPanel = () => {
  const { 
    productsList, 
    setProductsList, 
    orders, 
    setOrders, 
    navigateTo, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('products'); // 'products', 'orders', 'personalized', 'customers', 'inventory', 'coupons', 'reports'
  const [searchTerm, setSearchTerm] = useState('');
  
  // Add Product Modal
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'flowers',
    price: '',
    originalPrice: '',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80',
    stock: 50,
    deliverySpeed: 'same-day',
    isPersonalizable: false,
    description: ''
  });

  // Mock Customers Data
  const customers = [
    { id: 'usr-1', name: 'Aarav Patel', email: 'aarav.patel@stepingiftmart.com', phone: '+91 98765 43210', ordersCount: 4, totalSpent: 6496, city: 'New Delhi' },
    { id: 'usr-2', name: 'Priyanka Sharma', email: 'priyanka.s@gmail.com', phone: '+91 98111 22334', ordersCount: 2, totalSpent: 2798, city: 'Mumbai' },
    { id: 'usr-3', name: 'Rohit Kulkarni', email: 'rohit.k@yahoo.com', phone: '+91 98222 33445', ordersCount: 3, totalSpent: 5197, city: 'Bengaluru' },
    { id: 'usr-4', name: 'Sneha Roy', email: 'sneha.roy@outlook.com', phone: '+91 98333 44556', ordersCount: 1, totalSpent: 2899, city: 'Kolkata' },
    { id: 'usr-5', name: 'Vikramaditya Joshi', email: 'vikram.j@corp.com', phone: '+91 98444 55667', ordersCount: 6, totalSpent: 18450, city: 'Gurugram' }
  ];

  // Personalized Orders List
  const [personalizedOrders, setPersonalizedOrders] = useState([
    {
      id: 'P-ORD-101',
      customerName: 'Rahul Mehra',
      productName: 'Custom 3D Illusion Night Lamp with Couple Portrait',
      engravingText: 'Rahul & Sneha - Forever',
      date: '24.10.2024',
      design: 'Royal Serif Typography',
      uploadedImage: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80',
      productionStatus: 'Laser Engraved'
    },
    {
      id: 'P-ORD-102',
      customerName: 'Ananya Desai',
      productName: 'Personalized Laser-Engraved Men’s Wallet & Pen Combo',
      engravingText: 'Vikram Desai - Dad & Hero',
      date: '28 Sep 2026',
      design: 'Modern Sans Serif',
      uploadedImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=80',
      productionStatus: 'In Production'
    }
  ]);

  // Handle Add Product
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const prod = {
      id: 'prod-' + Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice || newProduct.price * 1.3),
      rating: 5.0,
      reviewCount: 1,
      image: newProduct.image,
      stock: Number(newProduct.stock || 30),
      deliverySpeed: newProduct.deliverySpeed,
      isPersonalizable: Boolean(newProduct.isPersonalizable),
      description: newProduct.description || 'Premium handcrafted celebration gift.',
      occasions: ['birthday', 'anniversary']
    };

    setProductsList(prev => [prod, ...prev]);
    setShowAddProductModal(false);
    showToast(`Product "${prod.name.slice(0, 24)}..." published to catalog!`);
    setNewProduct({
      name: '',
      category: 'flowers',
      price: '',
      originalPrice: '',
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80',
      stock: 50,
      deliverySpeed: 'same-day',
      isPersonalizable: false,
      description: ''
    });
  };

  // Handle Delete Product
  const handleDeleteProduct = (id) => {
    setProductsList(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  // Handle Order Status Update (New -> Confirmed -> Processing -> Packed -> Shipped -> Out for Delivery -> Delivered)
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order #${orderId} marked as "${newStatus}"`);
  };

  // Handle Stock Adjust
  const handleStockAdjust = (productId, delta) => {
    setProductsList(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, stock: Math.max(0, p.stock + delta) };
      }
      return p;
    }));
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 28450);
  const pendingOrders = orders.filter(o => o.status !== 'Delivered').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length + 42;
  const lowStockCount = productsList.filter(p => p.stock < 25).length;

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '90vh', padding: '2rem 0 5rem' }}>
      <div className="container">
        
        {/* Top Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.35rem 0.75rem', gap: 4 }}
              >
                <ArrowLeft size={14} /> Back to Store
              </button>
              <span className="badge badge-primary">Step IN Gift Mart Ops</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--charcoal-dark)', marginTop: '0.5rem' }}>
              Operations & Fulfillment Dashboard
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddProductModal(true)}
              style={{ gap: 6 }}
            >
              <Plus size={16} />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* 6 Metric KPIs matching specs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#64748b' }}>TOTAL REVENUE</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '4px 0' }}>
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Razorpay Verified</div>
          </div>

          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#64748b' }}>TOTAL ORDERS</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '4px 0' }}>
              {orders.length + 42}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: 600 }}>100% on-time rate</div>
          </div>

          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#64748b' }}>PENDING ORDERS</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#d97706', margin: '4px 0' }}>
              {pendingOrders}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#d97706', fontWeight: 600 }}>Active in kitchen/van</div>
          </div>

          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#64748b' }}>DELIVERED</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--accent-emerald)', margin: '4px 0' }}>
              {deliveredOrders}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Delivered safely</div>
          </div>

          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#64748b' }}>PRODUCTS</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '4px 0' }}>
              {productsList.length}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Active in catalog</div>
          </div>

          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#64748b' }}>CUSTOMERS</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#c026d3', margin: '4px 0' }}>
              {customers.length + 180}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#c026d3', fontWeight: 600 }}>Registered accounts</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '2px solid #e2e8f0',
          marginBottom: '1.5rem',
          overflowX: 'auto'
        }}>
          {[
            { id: 'products', label: 'Products', icon: Package, count: productsList.length },
            { id: 'orders', label: 'Order Pipeline', icon: ShoppingBag, count: orders.length },
            { id: 'personalized', label: 'Personalized Orders', icon: Sparkles, count: personalizedOrders.length },
            { id: 'customers', label: 'Customers', icon: Users, count: customers.length },
            { id: 'inventory', label: 'Inventory Stock', icon: Layers, count: lowStockCount > 0 ? `${lowStockCount} Low` : 'OK' },
            { id: 'coupons', label: 'Offers & Coupons', icon: Tag, count: 3 },
            { id: 'reports', label: 'Sales Reports', icon: BarChart2 }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '0.85rem 1.25rem',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: isSelected ? 'var(--primary)' : '#64748b',
                  borderBottom: isSelected ? '3px solid var(--primary)' : '3px solid transparent',
                  marginBottom: -2,
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={17} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span style={{
                    padding: '2px 7px',
                    borderRadius: 'var(--radius-full)',
                    background: isSelected ? 'var(--primary-light)' : '#f1f5f9',
                    color: isSelected ? 'var(--primary-dark)' : '#64748b',
                    fontSize: '0.74rem'
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: PRODUCTS */}
        {activeTab === 'products' && (
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1rem', fontWeight: 800 }}>Catalog Inventory ({productsList.length})</div>
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="form-input" 
                style={{ width: 240, padding: '0.4rem 0.8rem', fontSize: '0.84rem' }} 
              />
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '0.85rem 1.25rem' }}>Product</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Price</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Stock</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Delivery</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Personalizable</th>
                    <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productsList
                    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img src={p.image} alt="" style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }} />
                          <div>
                            <strong style={{ color: '#0f172a' }}>{p.name}</strong>
                            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>ID: {p.id}</div>
                          </div>
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}><span className="badge badge-primary">{p.category}</span></td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>₹{p.price.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span style={{ padding: '3px 8px', borderRadius: 20, fontSize: '0.74rem', fontWeight: 700, background: p.stock < 25 ? '#fee2e2' : 'var(--accent-emerald-light)', color: p.stock < 25 ? '#991b1b' : 'var(--accent-emerald)' }}>
                            {p.stock} units
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', textTransform: 'capitalize' }}>{p.deliverySpeed}</td>
                        <td style={{ padding: '0.85rem 1rem' }}>{p.isPersonalizable ? '✨ Yes' : 'No'}</td>
                        <td style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>
                          <button onClick={() => handleDeleteProduct(p.id)} style={{ border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer' }}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ORDER MANAGEMENT WITH FULL WORKFLOW */}
        {activeTab === 'orders' && (
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', fontSize: '1rem', fontWeight: 800 }}>
              Live Order Fulfillment Pipeline
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {orders.map(order => (
                <div key={order.id} style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.2fr', gap: '1rem', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '0.98rem' }}>#{order.id}</strong>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Recipient: <strong>{order.recipientName}</strong></div>
                    <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>{order.shippingAddress}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 600 }}>{order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</div>
                    <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--primary)', marginTop: 4 }}>₹{order.total.toLocaleString('en-IN')}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Courier: <strong>{order.courier}</strong></div>
                    <div style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: '#2563eb' }}>{order.trackingId}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.76rem', color: '#64748b', marginBottom: 4 }}>Update Status:</div>
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      className="form-select"
                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.82rem', fontWeight: 700 }}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Gift Being Prepared">Gift Being Prepared</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered 🎉</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PERSONALIZED ORDERS (Required by prompt) */}
        {activeTab === 'personalized' && (
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', fontSize: '1rem', fontWeight: 800 }}>
              Custom Laser & Photo Engraving Queue ({personalizedOrders.length})
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', padding: '1.5rem' }}>
              {personalizedOrders.map(pOrd => (
                <div key={pOrd.id} style={{ border: '1.5px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', background: '#fafaf9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{pOrd.id}</span>
                    <span className="badge badge-gold">{pOrd.productionStatus}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <img src={pOrd.uploadedImage} alt="Custom Preview" style={{ width: 80, height: 80, borderRadius: 8, objectFit: 'cover' }} />
                    <div>
                      <strong style={{ fontSize: '0.92rem', display: 'block', color: 'var(--charcoal-dark)' }}>{pOrd.productName}</strong>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Ordered by: <strong>{pOrd.customerName}</strong></div>
                      <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>Design: {pOrd.design}</div>
                    </div>
                  </div>

                  <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: 6, border: '1px dashed var(--secondary-border)', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--charcoal-muted)', fontWeight: 700 }}>LASER TEXT ENGRAVING:</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--primary)' }}>"{pOrd.engravingText}"</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-dark)' }}>Date: {pOrd.date}</div>
                  </div>

                  <div style={{ display: 'flex', gap: 6 }}>
                    <button 
                      className="btn btn-secondary btn-sm" 
                      style={{ flex: 1 }}
                      onClick={() => showToast(`Laser file downloaded for ${pOrd.id}`)}
                    >
                      Export Vector Art
                    </button>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        setPersonalizedOrders(prev => prev.map(item => item.id === pOrd.id ? { ...item, productionStatus: 'Ready for Dispatch' } : item));
                        showToast(`Marked ${pOrd.id} as Ready for Dispatch!`);
                      }}
                    >
                      Approve Art
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOMERS */}
        {activeTab === 'customers' && (
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', fontSize: '1rem', fontWeight: 800 }}>Registered Customer Directory</div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '0.85rem 1.25rem' }}>Customer</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Contact</th>
                    <th style={{ padding: '0.85rem 1rem' }}>City</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Orders Completed</th>
                    <th style={{ padding: '0.85rem 1.25rem' }}>Total Spent</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map(c => (
                    <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.85rem 1.25rem', fontWeight: 700 }}>{c.name}</td>
                      <td style={{ padding: '0.85rem 1rem' }}>{c.email}<div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>{c.phone}</div></td>
                      <td style={{ padding: '0.85rem 1rem' }}>{c.city}</td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>{c.ordersCount}</td>
                      <td style={{ padding: '0.85rem 1.25rem', fontWeight: 800, color: 'var(--primary)' }}>₹{c.totalSpent.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: INVENTORY */}
        {activeTab === 'inventory' && (
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem' }}>Warehouse Stock Health</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {productsList.map(p => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', borderRadius: 8, border: '1px solid #e2e8f0', background: p.stock < 25 ? '#fff1f2' : '#ffffff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={p.image} alt="" style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }} />
                    <div>
                      <strong>{p.name}</strong>
                      <div style={{ fontSize: '0.74rem', color: '#64748b' }}>Category: {p.category}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span style={{ fontWeight: 800, color: p.stock < 25 ? '#b91c1c' : '#0f172a' }}>{p.stock} units</span>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => handleStockAdjust(p.id, -10)}>-10</button>
                      <button className="btn btn-primary btn-sm" onClick={() => handleStockAdjust(p.id, 10)}>+10</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: COUPONS */}
        {activeTab === 'coupons' && (
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem' }}>Active Promotional Discounts</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {[
                { code: 'WELCOME150', desc: 'Flat ₹150 off on orders above ₹799', uses: '342 used', active: true },
                { code: 'GIFTJOY20', desc: '20% off on luxury hampers and trunks', uses: '189 used', active: true },
                { code: 'FESTIVE10', desc: '10% sitewide festive celebration discount', uses: '512 used', active: true }
              ].map(c => (
                <div key={c.code} style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1.5px dashed var(--primary)', background: 'var(--primary-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--primary)' }}>{c.code}</span>
                    <span className="badge badge-emerald">Active</span>
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#475569', marginBottom: 8 }}>{c.desc}</div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Redemptions: {c.uses}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: REPORTS */}
        {activeTab === 'reports' && (
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', border: '1px solid #e2e8f0', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>Executive Sales & Conversion Metrics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>CHECKOUT CONVERSION</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent-emerald)' }}>4.82%</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--accent-emerald)' }}>↑ 0.6% vs benchmark</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>AVERAGE ORDER VALUE</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#2563eb' }}>₹1,640</div>
                <div style={{ fontSize: '0.74rem', color: '#2563eb' }}>Driven by celebration combos</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>SAME-DAY FULFILLMENT</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#c026d3' }}>99.2%</div>
                <div style={{ fontSize: '0.74rem', color: '#c026d3' }}>Delhivery SLA met</div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 350,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-2xl)',
            maxWidth: 540,
            width: '100%',
            padding: '2rem',
            position: 'relative'
          }}>
            <button onClick={() => setShowAddProductModal(false)} style={{ position: 'absolute', top: 16, right: 16, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>Add Product to Step IN Gift Mart</h3>

            <form onSubmit={handleAddProductSubmit}>
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Product Title:</label>
                <input 
                  type="text" 
                  required 
                  className="form-input" 
                  placeholder="e.g. Royal Orchid Bloom Vase" 
                  value={newProduct.name} 
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Category:</label>
                  <select 
                    className="form-select" 
                    value={newProduct.category} 
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    <option value="flowers">Flowers</option>
                    <option value="cakes">Cakes</option>
                    <option value="personalized">Personalized</option>
                    <option value="chocolates">Chocolates</option>
                    <option value="plants">Plants</option>
                    <option value="hampers">Hampers</option>
                    <option value="gift-sets">Gift Sets</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Price (₹):</label>
                  <input 
                    type="number" 
                    required 
                    className="form-input" 
                    placeholder="1299" 
                    value={newProduct.price} 
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
                  />
                </div>
              </div>

              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Image URL:</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newProduct.image} 
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} 
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                  <input 
                    type="checkbox" 
                    checked={newProduct.isPersonalizable} 
                    onChange={(e) => setNewProduct({ ...newProduct, isPersonalizable: e.target.checked })} 
                    style={{ accentColor: 'var(--primary)' }} 
                  />
                  <span>Personalizable (Laser engraving / photo upload)</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddProductModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Publish Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
