/**
 * Centralized Contact & Studio Identity Constants
 * Single Source of Truth for all contact channels, social links, and messaging templates.
 */

export const CONTACT_INFO = {
  // Official Studio WhatsApp (Direct Booking & Inquiries)
  whatsappNumber: '6285188574908',
  whatsappDisplay: '+62 851-8857-4908',
  whatsappRaw: '085188574908',
  
  // Direct Developer / Personal Contact
  developerWhatsapp: '6285161507114',
  
  // Official Studio Email
  email: 'wellibuilds@gmail.com',
  
  // Location
  location: 'Tangerang, Banten, Indonesia',
  timeZone: 'Asia/Jakarta',
  
  // Social Media Links
  socials: {
    instagram: 'https://www.instagram.com/wlstudi0/',
    instagramStudio: 'https://www.instagram.com/wlstudi0/',
    linkedin: 'https://www.linkedin.com/in/welli-',
    github: 'https://github.com/Creastein',
    tiktok: 'https://www.tiktok.com/@wlstudi0?lang=id-ID',
  },
} as const;

/**
 * Generate standard pre-filled WhatsApp click-to-chat links
 */
export const getWhatsAppLink = (message?: string, number: string = CONTACT_INFO.whatsappNumber): string => {
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
};

export const DEFAULT_WHATSAPP_LINK = getWhatsAppLink(
  'Halo WL-STUDIO, saya ingin konsultasi tentang pembuatan website villa / properti.'
);

export const WEBSITE_CONSULT_WHATSAPP_LINK = getWhatsAppLink(
  'Halo WL-STUDIO, saya ingin konsultasi tentang pembuatan website.'
);
