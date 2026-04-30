export interface WebsiteAddon {
  id: string;
  name: string;
  price: string;
  icon: string;
}

export const websiteAddons: WebsiteAddon[] = [
  { id: 'multi-language', name: 'Multi-language EN+ID', price: 'Rp 400.000', icon: '🌐' },
  { id: 'seo-setup', name: 'Setup SEO lengkap (GA4+GSC+Schema)', price: 'Rp 300.000', icon: '🔍' },
  { id: 'instagram-feed', name: 'Integrasi Instagram feed', price: 'Rp 200.000', icon: '📸' },
  { id: 'speed-optimization', name: 'Speed optimization PageSpeed 90+', price: 'Rp 300.000', icon: '⚡' },
  { id: 'virtual-tour', name: 'Virtual tour foto 360°', price: 'Rp 750.000', icon: '🎥' },
  { id: 'booking-system', name: 'Sistem booking online real-time', price: 'Rp 1.500.000', icon: '📅' },
  { id: 'payment-gateway', name: 'Payment gateway Midtrans/Xendit', price: 'Rp 1.000.000', icon: '💳' },
  { id: 'logo-design', name: 'Logo design 3 konsep', price: 'Rp 350.000', icon: '🎨' },
  { id: 'copywriting', name: 'Copywriting halaman (per halaman)', price: 'Rp 250.000', icon: '✍️' },
  { id: 'domain-hosting', name: 'Domain + Hosting setup 1 tahun', price: 'Rp 600.000', icon: '🌍' },
];
