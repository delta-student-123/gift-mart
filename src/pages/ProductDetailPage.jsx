import React, { useState } from 'react';
import { 
  Star, 
  Zap, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  Heart, 
  Plus, 
  Minus, 
  ShoppingBag,
  Clock,
  CheckCircle2,
  Share2,
  Calendar,
  ArrowLeft,
  ChevronRight,
  Package,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage = ({ product }) => {
  const { 
    productsList, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    pincode, 
    pincodeInfo, 
    checkPincode, 
    openPersonalizer, 
    setIsCheckoutOpen,
    navigateTo 
  } = useApp();

  const [activeImage, setActiveImage] = useState(product?.image);
  const [qty, setQty] = useState(1);
  const [pinInput, setPinInput] = useState(pincode || '');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [activeTab, setActiveTab] = useState('description'); // 'description', 'included', 'specs', 'delivery', 'reviews'

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <h2>Product not found</h2>
        <button className="btn btn-primary" onClick={() => navigateTo('shop')} style={{ marginTop: '1rem' }}>
          Back to Shop
        </button>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const addonsList = [
    { id: 'addon-1', name: 'Printed Celebration Greeting Card', price: 99, icon: '💌' },
    { id: 'addon-2', name: 'Scented Soy Wax Celebration Candle', price: 149, icon: '🕯️' },
    { id: 'addon-3', name: 'Fluffy 8-Inch Cuddle Bear', price: 299, icon: '🧸' }
  ];

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => 
      prev.some(a => a.id === addon.id) 
        ? prev.filter(a => a.id !== addon.id) 
        : [...prev, addon]
    );
  };

  const handleAdd = () => {
    if (product.isPersonalizable) {
      openPersonalizer(product);
    } else {
      addToCart(product, qty);
    }
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    setIsCheckoutOpen(true);
  };

  const relatedProducts = productsList.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '85vh', padding: '2rem 0 6rem' }}>
      <div className="container">
        
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--charcoal-muted)', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer', color: 'var(--charcoal-dark)', fontWeight: 600 }}>Home</span>
          <ChevronRight size={14} />
          <span onClick={() => navigateTo('shop')} style={{ cursor: 'pointer', color: 'var(--charcoal-dark)', fontWeight: 600 }}>Shop</span>
          <ChevronRight size={14} />
          <span onClick={() => navigateTo('shop', { category: product.category })} style={{ cursor: 'pointer', textTransform: 'capitalize' }}>{product.category}</span>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--primary)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '280px' }}>{product.name}</span>
        </div>

        {/* Main Product Layout: Gallery (Left) + Purchase Controls (Right) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3.5rem', alignItems: 'flex-start', marginBottom: '4rem' }} className="product-detail-grid">
          
          {/* LEFT: Image Gallery with Thumbnail Strip */}
          <div>
            <div style={{
              borderRadius: 'var(--radius-2xl)',
              overflow: 'hidden',
              position: 'relative',
              width: '100%',
              paddingTop: '95%',
              background: 'var(--secondary-warm)',
              border: '1px solid var(--secondary-border)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <img 
                src={activeImage || product.image} 
                alt={product.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 300ms ease'
                }}
              />

              {discountPercent > 0 && (
                <span style={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  background: 'var(--primary)',
                  color: '#ffffff',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  boxShadow: '0 2px 8px rgba(194, 24, 91, 0.35)'
                }}>
                  {discountPercent}% OFF
                </span>
              )}

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <Heart size={20} color={isFavorited ? 'var(--primary)' : 'var(--charcoal-dark)'} fill={isFavorited ? 'var(--primary)' : 'transparent'} />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              {[
                product.image,
                'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80'
              ].map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: activeImage === imgUrl ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  <img src={imgUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>

            {/* Quality & Trust Badges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginTop: '2rem',
              padding: '1.25rem',
              background: 'var(--secondary-warm)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--secondary-border)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <ShieldCheck size={22} color="var(--primary)" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--charcoal-dark)' }}>100% Quality</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--charcoal-muted)' }}>Handcrafted fresh</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Clock size={22} color="var(--primary)" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--charcoal-dark)' }}>On-Time Slot</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--charcoal-muted)' }}>Guaranteed dispatch</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Truck size={22} color="var(--primary)" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--charcoal-dark)' }}>Safe Courier</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--charcoal-muted)' }}>Tamper-proof box</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Info & Actions */}
          <div>
            {/* Category tag & ratings */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
              <span className="section-tag" style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', marginBottom: 0 }}>
                {product.category.toUpperCase()}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#fef3c7', padding: '3px 8px', borderRadius: 'var(--radius-full)' }}>
                  <Star size={13} fill="#d97706" color="#d97706" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#92400e' }}>{product.rating}</span>
                </div>
                <span style={{ fontSize: '0.82rem', color: 'var(--charcoal-muted)' }}>({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--charcoal-dark)', lineHeight: 1.25, marginBottom: '1rem' }}>
              {product.name}
            </h1>

            {/* Price section */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--charcoal-dark)' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.15rem', color: 'var(--charcoal-muted)', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span style={{ fontSize: '0.84rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                Inclusive of all taxes
              </span>
            </div>

            {/* Brief Description */}
            <p style={{ fontSize: '0.94rem', color: 'var(--charcoal-body)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {product.description}
            </p>

            {/* Pincode & Delivery Date Availability Checker */}
            <div style={{
              background: 'var(--secondary-warm)',
              padding: '1.15rem',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--secondary-border)',
              marginBottom: '1.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--charcoal-dark)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <MapPin size={15} color="var(--primary)" />
                  <span>Delivery Availability & Slots:</span>
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)' }}>
                  Current PIN: <strong>{pincode}</strong>
                </span>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                  className="form-input"
                  style={{ padding: '0.55rem 0.85rem', fontSize: '0.88rem' }}
                />
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => checkPincode(pinInput)}
                >
                  Verify
                </button>
              </div>

              {pincodeInfo && (
                <div style={{ fontSize: '0.82rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
                  <CheckCircle2 size={15} color="var(--accent-emerald)" />
                  <span>
                    Serviceable for <strong>{pincodeInfo.city}</strong>! {product.deliverySpeed === 'same-day' ? '⚡ Earliest delivery: Today within 3 hours.' : 'Dispatch in 24 hours via Delhivery.'}
                  </span>
                </div>
              )}
            </div>

            {/* Optional Celebration Add-ons */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--charcoal-dark)', marginBottom: '0.65rem' }}>
                Make it extra special (Add-on treats):
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {addonsList.map(addon => {
                  const isAdded = selectedAddons.some(a => a.id === addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.55rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: isAdded ? '1.5px solid var(--primary)' : '1px solid var(--border-subtle)',
                        background: isAdded ? 'var(--primary-subtle)' : '#ffffff',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span>{addon.icon}</span>
                        <span style={{ fontWeight: 600, color: 'var(--charcoal-dark)' }}>{addon.name}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontWeight: 800, color: 'var(--primary)' }}>+₹{addon.price}</span>
                        <span style={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          background: isAdded ? 'var(--primary)' : '#e5e7eb',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.72rem'
                        }}>
                          {isAdded ? '✓' : '+'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quantity & Action Buttons */}
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              {!product.isPersonalizable && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'var(--secondary-warm)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.45rem 0.9rem',
                  border: '1px solid var(--secondary-border)'
                }}>
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--charcoal-dark)' }}
                  >
                    <Minus size={15} />
                  </button>
                  <span style={{ fontWeight: 800, minWidth: 20, textAlign: 'center', fontSize: '0.92rem' }}>{qty}</span>
                  <button 
                    onClick={() => setQty(qty + 1)}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--charcoal-dark)' }}
                  >
                    <Plus size={15} />
                  </button>
                </div>
              )}

              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleAdd}
                style={{ flex: 1, gap: 8 }}
              >
                {product.isPersonalizable ? (
                  <>
                    <Sparkles size={18} />
                    <span>Personalize & Add to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              {!product.isPersonalizable && (
                <button
                  type="button"
                  className="btn btn-gold btn-lg"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              )}
            </div>

            {/* Stock indicator */}
            <div style={{ fontSize: '0.82rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-emerald)' }} />
              <span>In Stock • Ready for hand-packaging in temperature-controlled vans</span>
            </div>

          </div>
        </div>

        {/* Detailed Product Specifications & Tabs */}
        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2.5rem', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid var(--border-light)', marginBottom: '1.5rem', overflowX: 'auto' }}>
            {[
              { id: 'description', label: 'Product Description' },
              { id: 'included', label: "What's Included" },
              { id: 'specs', label: 'Specifications & Care' },
              { id: 'delivery', label: 'Delivery & Returns' },
              { id: 'reviews', label: `Customer Reviews (${product.reviewCount})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  color: activeTab === tab.id ? 'var(--primary)' : 'var(--charcoal-muted)',
                  borderBottom: activeTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
                  marginBottom: -2,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '0.92rem', color: 'var(--charcoal-body)', lineHeight: 1.7, maxWidth: 880 }}>
            {activeTab === 'description' && (
              <div>
                <p style={{ marginBottom: '1rem' }}>{product.description}</p>
                <p>Every gift from <strong>Step IN Gift Mart</strong> is meticulously handcrafted by experienced artisan florists and master bakers. Hand-tied bouquets arrive in fresh flower nutrition water bags, and all designer cakes are baked fresh on the day of delivery using vegetarian premium ingredients.</p>
              </div>
            )}

            {activeTab === 'included' && (
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>1x {product.name}</li>
                <li>1x Complimentary Hand-printed Celebration Message Card</li>
                <li>1x Step IN Gift Mart Signature Gold-Embossed Gift Wrap</li>
                <li>Flower care guide / Cake slicing knife & celebration candle</li>
              </ul>
            )}

            {activeTab === 'specs' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'var(--secondary-warm)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <strong>Origin / Craftsmanship:</strong> Hand-curated in Delhi NCR
                </div>
                <div style={{ background: 'var(--secondary-warm)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <strong>Care Instructions:</strong> Keep in cool ambient area away from direct sunlight
                </div>
                <div style={{ background: 'var(--secondary-warm)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <strong>Shelf Life / Freshness:</strong> Best consumed/enjoyed within 3-4 days
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Delivery Slots:</strong> We offer Standard Delivery (9 AM - 9 PM), Morning Delivery (8 AM - 12 PM), Fixed Time 2-Hour windows, and Midnight Delivery (11 PM - 12 AM).
                </p>
                <p>
                  <strong>Return Policy:</strong> Since cakes and flowers are perishable, we offer a 100% replacement or full refund if any damage occurs during transit. Customer delight is guaranteed.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', background: 'var(--secondary-warm)', padding: '1.25rem', borderRadius: 'var(--radius-xl)' }}>
                  <div style={{ textAlign: 'center', borderRight: '1px solid var(--secondary-border)', paddingRight: '1.5rem' }}>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--charcoal-dark)' }}>{product.rating}</div>
                    <div style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="#d97706" color="#d97706" />
                      ))}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--charcoal-muted)', marginTop: 4 }}>Based on {product.reviewCount} reviews</div>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: 4 }}>100% Real Customer Feedback</h4>
                    <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-muted)' }}>All reviews are from verified purchasers who received celebration delivery.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { name: 'Kavita M.', date: '3 days ago', comment: 'Ordered for midnight delivery on my husband’s birthday. The roses were so fresh and fragrant, and cake was super moist! Will definitely order again.', rating: 5 },
                    { name: 'Sameer V.', date: '1 week ago', comment: 'Packaging was 10/10. Looked like a luxury trunk right out of a boutique gift shop. On-time delivery made my mom tear up with joy.', rating: 5 }
                  ].map((rev, idx) => (
                    <div key={idx} style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <strong style={{ fontSize: '0.88rem' }}>{rev.name}</strong>
                        <span style={{ fontSize: '0.76rem', color: 'var(--charcoal-muted)' }}>{rev.date}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 2, marginBottom: 6 }}>
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={12} fill="#d97706" color="#d97706" />
                        ))}
                      </div>
                      <p style={{ fontSize: '0.86rem', color: 'var(--charcoal-body)' }}>{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>
                You May Also Like
              </h3>
              <button 
                onClick={() => navigateTo('shop', { category: product.category })}
                className="btn btn-secondary btn-sm"
              >
                View More {product.category}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Sticky Mobile Add to Cart Bar */}
      <div 
        className="mobile-sticky-bar"
        style={{
          display: 'none',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#ffffff',
          padding: '0.75rem 1rem',
          boxShadow: '0 -4px 15px rgba(0,0,0,0.1)',
          zIndex: 90,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)' }}>Total:</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--primary)' }}>
            ₹{product.price.toLocaleString('en-IN')}
          </div>
        </div>

        <button 
          className="btn btn-primary"
          onClick={handleAdd}
          style={{ padding: '0.65rem 1.5rem', gap: 6 }}
        >
          <ShoppingBag size={16} />
          <span>{product.isPersonalizable ? 'Personalize' : 'Add to Cart'}</span>
        </button>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .product-detail-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .mobile-sticky-bar { display: flex !important; }
        }
      `}</style>
    </div>
  );
};
