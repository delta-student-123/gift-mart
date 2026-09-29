import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  CreditCard, 
  Gift, 
  Check, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Smartphone
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    couponDiscount, 
    activeCoupon, 
    deliveryFee, 
    cartTotal, 
    addresses, 
    activeAddress, 
    setActiveAddress, 
    addAddress,
    handlePlaceOrder,
    pincode,
    showToast
  } = useApp();

  const [step, setStep] = useState(1); // 1: Address & Slots, 2: Gift Message, 3: Razorpay Payment
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRazorpaySimulator, setShowRazorpaySimulator] = useState(false);

  // Delivery details
  const [deliveryDate, setDeliveryDate] = useState('Tomorrow');
  const [deliverySlot, setDeliverySlot] = useState('Standard Delivery (9:00 AM - 9:00 PM)');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [giftMessage, setGiftMessage] = useState('Wishing you abundant happiness, laughter, and joy on this special day! With all our love.');
  const [senderName, setSenderName] = useState('Aarav');

  // New address state
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('New Delhi');
  const [newPincode, setNewPincode] = useState(pincode || '110001');

  // Payment method
  const [paymentOption, setPaymentOption] = useState('razorpay_upi'); // 'razorpay_upi', 'razorpay_card', 'razorpay_netbanking', 'cod'

  if (!isCheckoutOpen) return null;

  const handleAddNewAddressSubmit = (e) => {
    e.preventDefault();
    if (!newStreet) return;
    addAddress({
      fullName: recipientName || 'Recipient',
      phone: recipientPhone || '+91 98765 43210',
      street: newStreet,
      city: newCity,
      state: 'Delhi NCR',
      pincode: newPincode,
      type: 'Home',
      isDefault: false
    });
    setIsAddingNewAddress(false);
    setNewStreet('');
  };

  const handleStartPayment = () => {
    // Open Razorpay modal simulator
    setShowRazorpaySimulator(true);
  };

  const handleSimulatedPaymentSuccess = async () => {
    setIsProcessing(true);
    setShowRazorpaySimulator(false);
    try {
      await handlePlaceOrder({
        deliveryDate,
        deliverySlot,
        recipientName: recipientName || activeAddress?.fullName || 'Beloved Recipient',
        shippingAddress: activeAddress ? `${activeAddress.street}, ${activeAddress.city} - ${activeAddress.pincode}` : 'New Delhi - 110001',
        giftMessage: `${giftMessage} - From ${senderName}`,
        paymentMethod: paymentOption === 'razorpay_upi' ? 'Razorpay (Google Pay / PhonePe UPI)' 
          : paymentOption === 'razorpay_card' ? 'Razorpay (Credit / Debit Card)'
          : paymentOption === 'razorpay_netbanking' ? 'Razorpay (Net Banking)'
          : 'Cash on Delivery (Verified)'
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.65)',
      backdropFilter: 'blur(4px)',
      zIndex: 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div 
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: 780,
          maxHeight: '92vh',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-2xl)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden'
        }}
      >
        {/* Modal Top Bar */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--secondary-warm)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              SECURE CHECKOUT
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--charcoal-dark)' }}>
              Complete Celebration Booking
            </h3>
          </div>

          <button 
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            style={{
              border: 'none',
              background: '#ffffff',
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} color="var(--charcoal-dark)" />
          </button>
        </div>

        {/* Steps Breadcrumb */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-light)',
          background: '#ffffff',
          fontSize: '0.85rem',
          fontWeight: 700
        }}>
          {[
            { num: 1, label: 'Delivery & Slot' },
            { num: 2, label: 'Message Card' },
            { num: 3, label: 'Payment' }
          ].map(s => (
            <div 
              key={s.num}
              onClick={() => s.num < step && setStep(s.num)}
              style={{
                flex: 1,
                padding: '0.85rem',
                textAlign: 'center',
                borderBottom: step === s.num ? '3px solid var(--primary)' : '3px solid transparent',
                color: step === s.num ? 'var(--primary)' : s.num < step ? 'var(--accent-emerald)' : 'var(--charcoal-muted)',
                cursor: s.num < step ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6
              }}
            >
              <span style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: step === s.num ? 'var(--primary)' : s.num < step ? 'var(--accent-emerald)' : '#e5e7eb',
                color: '#ffffff',
                fontSize: '0.72rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {s.num < step ? <Check size={12} /> : s.num}
              </span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Body Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.75rem' }}>
          
          {/* STEP 1: Address & Delivery Slot */}
          {step === 1 && (
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--charcoal-dark)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={18} color="var(--primary)" />
                <span>1. Select Delivery Address</span>
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
                {addresses.map(addr => (
                  <div
                    key={addr.id}
                    onClick={() => setActiveAddress(addr)}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-lg)',
                      border: activeAddress?.id === addr.id ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                      background: activeAddress?.id === addr.id ? 'var(--primary-subtle)' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 150ms'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--charcoal-dark)' }}>
                        {addr.fullName}
                      </span>
                      <span className="badge badge-primary">{addr.type}</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--charcoal-body)', lineHeight: 1.4 }}>
                      {addr.street}, {addr.city} - {addr.pincode}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)', marginTop: 4 }}>
                      Phone: {addr.phone}
                    </div>
                  </div>
                ))}
              </div>

              {!isAddingNewAddress ? (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsAddingNewAddress(true)}
                  style={{ marginBottom: '2rem' }}
                >
                  + Add New Delivery Address
                </button>
              ) : (
                <form onSubmit={handleAddNewAddressSubmit} style={{ background: 'var(--secondary-warm)', padding: '1rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.65rem' }}>Enter New Address:</div>
                  <input
                    type="text"
                    required
                    placeholder="Flat / House No, Building, Landmark, Street"
                    className="form-input"
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    style={{ marginBottom: '0.5rem' }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <input
                      type="text"
                      placeholder="City"
                      className="form-input"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                    />
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="PIN Code"
                      className="form-input"
                      value={newPincode}
                      onChange={(e) => setNewPincode(e.target.value)}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button type="submit" className="btn btn-primary btn-sm">Save Address</button>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => setIsAddingNewAddress(false)}>Cancel</button>
                  </div>
                </form>
              )}

              {/* Delivery Timing Slot */}
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--charcoal-dark)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={18} color="var(--primary)" />
                <span>2. Choose Delivery Slot</span>
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {[
                  { title: 'Standard Delivery', time: '9:00 AM - 9:00 PM', price: 'FREE', icon: '🚚' },
                  { title: 'Morning Slot', time: '8:00 AM - 12:00 PM', price: '₹49', icon: '🌅' },
                  { title: 'Fixed Time Slot', time: 'Choose 2-hour window', price: '₹99', icon: '⏱️' },
                  { title: 'Midnight Surprise', time: '11:00 PM - 12:00 AM', price: '₹149', icon: '🌙' }
                ].map(slot => (
                  <div
                    key={slot.title}
                    onClick={() => setDeliverySlot(`${slot.title} (${slot.time})`)}
                    style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: deliverySlot.includes(slot.title) ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                      background: deliverySlot.includes(slot.title) ? 'var(--primary-subtle)' : '#ffffff',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span>{slot.icon}</span>
                      <strong style={{ fontSize: '0.88rem', color: 'var(--charcoal-dark)' }}>{slot.title}</strong>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--charcoal-muted)' }}>{slot.time}</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', marginTop: 4 }}>{slot.price}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  className="btn btn-primary"
                  onClick={() => setStep(2)}
                  style={{ gap: 6 }}
                >
                  <span>Continue to Gift Card</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Gift Message Card */}
          {step === 2 && (
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--charcoal-dark)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Gift size={18} color="var(--primary)" />
                <span>Complimentary Greeting Card</span>
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-muted)', marginBottom: '1.25rem' }}>
                Every Gift Mart order includes a personalized art card hand-printed and attached to the gift wrap.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>
                    Recipient's Name:
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Priyanka / Mom"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>
                    Sender's Name (Your Name):
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Aarav"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>
                  Heartfelt Message:
                </label>
                <textarea
                  rows={4}
                  className="form-textarea"
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  maxLength={250}
                />
                <div style={{ fontSize: '0.74rem', color: 'var(--charcoal-muted)', textAlign: 'right' }}>
                  {giftMessage.length}/250 characters
                </div>
              </div>

              {/* Message Quick Starters */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--charcoal-muted)', marginBottom: '0.5rem' }}>
                  Quick Inspiration:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {[
                    'Happy Birthday! May your year be as extraordinary as you are.',
                    'Happy Anniversary! Here’s to another year of cherished memories together.',
                    'Sending you warmest congratulations on your incredible milestone!'
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setGiftMessage(preset)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--secondary-border)',
                        background: 'var(--secondary-warm)',
                        fontSize: '0.76rem',
                        cursor: 'pointer'
                      }}
                    >
                      {preset.slice(0, 32)}...
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
                <button className="btn btn-primary" onClick={() => setStep(3)} style={{ gap: 6 }}>
                  <span>Proceed to Payment</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Razorpay Payment & Order Summary */}
          {step === 3 && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }}>
                
                {/* Payment Selection */}
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--charcoal-dark)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CreditCard size={18} color="var(--primary)" />
                    <span>Choose Payment Method</span>
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    
                    {/* Razorpay UPI */}
                    <div
                      onClick={() => setPaymentOption('razorpay_upi')}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-lg)',
                        border: paymentOption === 'razorpay_upi' ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                        background: paymentOption === 'razorpay_upi' ? 'var(--primary-subtle)' : '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent-emerald-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Smartphone size={20} color="var(--accent-emerald)" />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--charcoal-dark)' }}>
                            Instant UPI (Google Pay, PhonePe, Paytm)
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--charcoal-muted)' }}>
                            Zero transaction fees • Instant confirmation via Razorpay
                          </div>
                        </div>
                      </div>
                      <span className="badge badge-emerald">Fastest</span>
                    </div>

                    {/* Razorpay Cards */}
                    <div
                      onClick={() => setPaymentOption('razorpay_card')}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-lg)',
                        border: paymentOption === 'razorpay_card' ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                        background: paymentOption === 'razorpay_card' ? 'var(--primary-subtle)' : '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CreditCard size={20} color="#2563eb" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--charcoal-dark)' }}>
                          Credit / Debit Cards
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--charcoal-muted)' }}>
                          Visa, Mastercard, RuPay, Diners & Amex
                        </div>
                      </div>
                    </div>

                    {/* NetBanking */}
                    <div
                      onClick={() => setPaymentOption('razorpay_netbanking')}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-lg)',
                        border: paymentOption === 'razorpay_netbanking' ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                        background: paymentOption === 'razorpay_netbanking' ? 'var(--primary-subtle)' : '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#fdf4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShieldCheck size={20} color="#c026d3" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--charcoal-dark)' }}>
                          Net Banking (50+ Banks)
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--charcoal-muted)' }}>
                          HDFC, ICICI, SBI, Axis, Kotak & more
                        </div>
                      </div>
                    </div>

                  </div>

                  <div style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    fontSize: '0.8rem',
                    color: '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <ShieldCheck size={20} color="var(--accent-emerald)" />
                    <span>Protected by <strong>Razorpay Standard Encryption</strong> with PCI-DSS Level 1 compliance.</span>
                  </div>
                </div>

                {/* Order Summary Column */}
                <div style={{ background: 'var(--secondary-warm)', padding: '1.25rem', borderRadius: 'var(--radius-xl)', height: 'fit-content' }}>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 800, marginBottom: '0.85rem', color: 'var(--charcoal-dark)' }}>
                    Order Summary ({cart.length} items)
                  </h4>

                  <div style={{ maxHeight: 180, overflowY: 'auto', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {cart.map(c => (
                      <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '170px' }}>
                          {c.quantity}x {c.product.name}
                        </span>
                        <strong>₹{(c.product.price * c.quantity).toLocaleString('en-IN')}</strong>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid var(--secondary-border)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.82rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Subtotal</span>
                      <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                    </div>

                    {couponDiscount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                        <span>Discount ({activeCoupon?.code})</span>
                        <span>- ₹{couponDiscount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Delivery Fee</span>
                      <span>{deliveryFee === 0 ? <strong style={{ color: 'var(--accent-emerald)' }}>FREE</strong> : `₹${deliveryFee}`}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 900, color: 'var(--primary)', paddingTop: '0.5rem', borderTop: '1px dashed var(--secondary-border)' }}>
                      <span>To Pay</span>
                      <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleStartPayment}
                    className="btn btn-primary btn-block btn-lg"
                    style={{ marginTop: '1.25rem', gap: 6 }}
                  >
                    <Sparkles size={16} />
                    <span>Pay ₹{cartTotal.toLocaleString('en-IN')} via Razorpay</span>
                  </button>
                </div>

              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1.5rem' }}>
                <button className="btn btn-secondary" onClick={() => setStep(2)}>Back</button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* RAZORPAY PAYMENT MODAL POPUP SIMULATOR */}
      {showRazorpaySimulator && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: 420,
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
          }}>
            {/* Razorpay Branded Top Header */}
            <div style={{ background: '#0c2340', color: '#ffffff', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', color: '#38bdf8', fontWeight: 700 }}>
                  RAZORPAY CHECKOUT
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  Gift Mart Online
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Amount Payable</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#38bdf8' }}>
                  ₹{cartTotal.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Test Payment Gateway Interface */}
            <div style={{ padding: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.25rem', fontSize: '0.82rem', color: '#334155' }}>
                🛡️ <strong>Razorpay Test Sandbox</strong><br />
                Simulating secure end-to-end checkout with instant signature verification.
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={handleSimulatedPaymentSuccess}
                  style={{
                    padding: '0.85rem',
                    borderRadius: '8px',
                    border: '1.5px solid var(--accent-emerald)',
                    background: 'var(--accent-emerald-light)',
                    color: 'var(--accent-emerald)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    fontSize: '0.95rem'
                  }}
                >
                  <Check size={18} />
                  <span>Simulate Successful Payment</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowRazorpaySimulator(false)}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: '#ffffff',
                    color: '#64748b',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.88rem'
                  }}
                >
                  Cancel Payment
                </button>
              </div>

              <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#94a3b8' }}>
                UPI • Cards • NetBanking • Wallets • PayLater
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
