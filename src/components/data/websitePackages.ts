export interface WebsitePackage {
  id: string;
  title: string;
  price: string;
  duration: string;
  target: string[];
  features: string[];
  icon: string;
  popular: boolean;
  whatsappMessage: string;
}

export const websitePackages: WebsitePackage[] = [
  {
    id: 'landing-simple',
    title: 'Landing Page Simple',
    price: 'Rp 1.500.000',
    duration: '3–5 hari kerja',
    target: ['Bengkel', 'Klinik kecil', 'UMKM', 'Toko kecil'],
    features: [
      'Info bisnis lengkap',
      'Jam operasional & galeri foto',
      'Tombol WhatsApp CTA',
      'Kontak & embed Google Maps',
      'Mobile responsive',
    ],
    icon: '📄',
    popular: false,
    whatsappMessage: 'Halo Welli, saya tertarik dengan paket *Landing Page Simple* (Rp 1.500.000). Bisa konsultasi lebih lanjut?',
  },
  {
    id: 'website-katalog',
    title: 'Website Katalog',
    price: 'Rp 2.500.000',
    duration: '5–7 hari kerja',
    target: ['Restoran', 'Salon', 'Tour & Activity', 'Toko Online'],
    features: [
      'Semua fitur Landing Page Simple',
      'Katalog produk/layanan',
      'Galeri foto banyak (hingga 20)',
      'Form kontak + integrasi WhatsApp',
      'Basic SEO',
      'Halaman multi-section',
    ],
    icon: '🛍️',
    popular: true,
    whatsappMessage: 'Halo Welli, saya tertarik dengan paket *Website Katalog* (Rp 2.500.000). Bisa konsultasi lebih lanjut?',
  },
  {
    id: 'website-premium',
    title: 'Website Premium',
    price: 'Rp 4.000.000',
    duration: '10–14 hari kerja',
    target: ['Villa butik', 'Resort kecil', 'Spa', 'Tour operator premium'],
    features: [
      'Semua fitur Website Katalog',
      'Multi-language (ID + EN)',
      'SEO lanjutan (Schema, dll)',
      'Setup GA4 + Search Console',
      'Integrasi Instagram feed',
      'Optimasi performa (PageSpeed 90+)',
      'Custom domain & DNS',
    ],
    icon: '⭐',
    popular: false,
    whatsappMessage: 'Halo Welli, saya tertarik dengan paket *Website Premium* (Rp 4.000.000). Bisa konsultasi lebih lanjut?',
  },
  {
    id: 'website-villa-pro',
    title: 'Website Villa Pro',
    price: 'Rp 6.500.000+',
    duration: '14–21 hari kerja',
    target: ['Villa resort', 'Hotel', 'Spa besar', 'Hospitality premium'],
    features: [
      'Semua fitur Website Premium',
      'Kalender booking real-time',
      'Virtual tour foto 360°',
      'Payment gateway (Midtrans/Xendit)',
      'Dashboard admin',
      'Laporan performa (1 bln pertama)',
      'Prioritas support 30 hari',
    ],
    icon: '🏨',
    popular: false,
    whatsappMessage: 'Halo Welli, saya tertarik dengan paket *Website Villa Pro* (Rp 6.500.000+). Bisa konsultasi lebih lanjut?',
  },
];
