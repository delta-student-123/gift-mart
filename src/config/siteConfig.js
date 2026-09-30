/**
 * STEP IN GIFT MART - CENTRAL SITE & WHATSAPP CONFIGURATION
 * 
 * To change the WhatsApp order number or store details, simply edit this file!
 * All pages and components automatically use these centralized settings.
 */

export const siteConfig = {
  // STORE IDENTITY
  storeName: 'Step IN Gift Mart',
  tagline: "Thoughtful Gifts for Every Special Moment",
  subtitle: "Cakes, artisan flowers, luxury hampers, personalized gifts, smart drinkware & leather wallets",

  // WHATSAPP CONFIGURATION (Change your number here!)
  // Format: Country code followed by phone number (no '+' or spaces for wa.me link)
  whatsAppNumber: '919876543210',
  whatsAppDisplay: '+91 98765 43210',
  whatsAppGreeting: 'Hi Step IN Gift Mart! I am browsing your catalog and would like some assistance.',

  // CONTACT & PHYSICAL LOCATION
  phone: '+91 (011) 4920-8000',
  email: 'care@stepingiftmart.com',
  corporateEmail: 'corporate@stepingiftmart.com',
  address: 'Shop 14, Inner Circle, Connaught Place, New Delhi - 110001, India',
  openingHours: 'Monday – Saturday: 9:00 AM to 9:00 PM IST (Sunday: 10:00 AM to 6:00 PM)',
  
  // DELIVERY INFO
  deliveryAreas: 'Pan-India Delivery across 19,000+ Pincodes (Same-day express delivery in Delhi NCR, Mumbai, Bengaluru, Hyderabad)',
  freeDeliveryThreshold: 500,
  deliveryTimings: [
    { slot: 'Standard Delivery', time: '10:00 AM - 7:00 PM (Free above ₹500)' },
    { slot: 'Same-Day Express', time: 'Delivered within 4-6 hours (Orders before 5 PM)' },
    { slot: 'Midnight Surprise', time: '11:15 PM - 12:00 AM (Cakes & Flowers special)' }
  ],

  // SOCIAL LINKS
  socialLinks: {
    instagram: 'https://instagram.com/stepingiftmart',
    facebook: 'https://facebook.com/stepingiftmart',
    youtube: 'https://youtube.com/@stepingiftmart',
    pinterest: 'https://pinterest.com/stepingiftmart'
  },

  // CURRENCY
  currency: '₹'
};

/**
 * Helper to generate pre-filled WhatsApp Order URLs
 * 
 * @param {Object} params
 * @param {Object} params.product - The product object
 * @param {Object} [params.selectedOptions] - Selected size, flavour, colour, etc.
 * @param {string} [params.personalizationNote] - Custom name, engraving, or message
 * @param {string} [params.currentUrl] - Current page URL
 * @returns {string} - Formatted WhatsApp URL ready to open
 */
export const generateWhatsAppOrderUrl = ({ product, selectedOptions = {}, personalizationNote = '', currentUrl = '' }) => {
  if (!product) {
    return `https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent(siteConfig.whatsAppGreeting)}`;
  }

  let text = `*New Order Inquiry — ${siteConfig.storeName}*\n\n`;
  text += `🎁 *Product:* ${product.name}\n`;
  text += `💰 *Price:* ₹${product.price?.toLocaleString?.('en-IN') || product.price}\n`;

  // Include options if selected
  const optionsKeys = Object.keys(selectedOptions || {});
  if (optionsKeys.length > 0) {
    text += `✨ *Options Selected:*\n`;
    optionsKeys.forEach(key => {
      text += `   • ${key.charAt(0).toUpperCase() + key.slice(1)}: ${selectedOptions[key]}\n`;
    });
  }

  // Include personalization note if provided
  if (personalizationNote && personalizationNote.trim()) {
    text += `📝 *Personalization / Message:* "${personalizationNote.trim()}"\n`;
  }

  // Include current page link if available
  const link = currentUrl || (typeof window !== 'undefined' ? window.location.href : '');
  if (link) {
    text += `🔗 *Product Link:* ${link}\n`;
  }

  text += `\nPlease confirm product availability, delivery timings to my pincode, and payment details!`;

  return `https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent(text)}`;
};

/**
 * Helper to generate general WhatsApp inquiry URLs
 * 
 * @param {string} customMessage 
 * @returns {string}
 */
export const generateWhatsAppInquiryUrl = (customMessage) => {
  const msg = customMessage || siteConfig.whatsAppGreeting;
  return `https://wa.me/${siteConfig.whatsAppNumber}?text=${encodeURIComponent(msg)}`;
};
