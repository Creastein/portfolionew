export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  initials: string;
  accentColor: string;
}

// Curated selection of UMKM-relevant projects
export const websitePortfolio: PortfolioItem[] = [
  {
    id: 'the-secret-karimunjawa',
    title: 'The Secret Karimunjawa',
    category: 'Hospitality',
    description: 'Website resort & villa di Karimunjawa dengan booking WhatsApp dan galeri foto profesional.',
    image: '/images/karimunjawa.png',
    link: 'https://thesecretkarimunjawa.com',
    tags: ['Hospitality', 'SEO', 'Multi-language'],
  },
  {
    id: 'floating-paradise',
    title: 'Floating Paradise',
    category: 'Villa & Resort',
    description: 'Platform resort premium di Karimunjawa dengan fitur booking dan konten multi-bahasa.',
    image: '/images/floatingparadise.webp',
    link: 'https://floatingparadise.id',
    tags: ['Villa', 'Resort', 'Booking'],
  },
  {
    id: 'pt-bkn',
    title: 'PT BKN',
    category: 'Corporate',
    description: 'Website korporat profesional dengan strategi lead generation dan desain modern.',
    image: '/images/pt-bkn.png',
    link: 'https://pt-bkn.vercel.app/',
    tags: ['Corporate', 'Lead Gen'],
  },
  {
    id: 'sagara-coffee',
    title: 'Sagara Coffee',
    category: 'Cafe & F&B',
    description: 'Landing page modern untuk coffee shop dengan desain yang menarik dan user-friendly.',
    image: '/images/Sagara-coffee.png',
    link: 'https://coffe-shop-indol-eta.vercel.app/',
    tags: ['Cafe', 'F&B', 'Landing Page'],
  },
  {
    id: 'gerai-batik',
    title: 'Gerai Batik',
    category: 'E-Commerce UMKM',
    description: 'Web katalog retail fashion batik dan produk tradisional Indonesia.',
    image: '/images/gerai-batik.png',
    link: 'https://gerai-batik.vercel.app/',
    tags: ['UMKM', 'E-Commerce', 'Fashion'],
  },
  {
    id: 'adam-tour-lombok',
    title: 'Adam Tour Lombok',
    category: 'Tourism',
    description: 'Website tour guide lokal di Lombok dengan paket wisata dan SEO optimization.',
    image: '/images/adamtour-lombok.png',
    link: 'https://adamtour2.vercel.app/',
    tags: ['Tourism', 'SEO', 'Booking'],
  },
  {
    id: 'la-beaute-luxury-spa',
    title: 'La Beauté Luxury Spa',
    category: 'Spa & Wellness',
    description: 'Platform wellness premium dengan sistem reservasi dan brand storytelling.',
    image: '/images/Salon-Spa.png',
    link: 'https://la-beaut-luxury-spa.vercel.app/',
    tags: ['Spa', 'Wellness', 'Booking'],
  },
  {
    id: 'best1trans',
    title: 'Best1Trans',
    category: 'Transportation',
    description: 'Platform booking transportasi dan tour dengan UI interaktif dan konversi tinggi.',
    image: '/images/lux-drive.png',
    link: 'https://best1-trans.vercel.app/',
    tags: ['Transport', 'Booking', 'CRO'],
  },
];

// Real testimonials
export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-patricia',
    name: 'Kak Patricia Dorn',
    role: 'Owner',
    company: 'The Secret Karimunjawa',
    text: 'Kerjasama dengan Welli luar biasa. Service-nya lancar, tidak ada kendala sama sekali, sangat jelas. Saya sudah rekomendasikan ke beberapa teman — dan terbukti, sudah ada yang kerja sama juga. Terima kasih sudah bantu villa saya.',
    initials: 'CP',
    accentColor: '#135bec',
  },
  {
    id: 'testimonial-fp',
    name: 'Owner Floating Paradise',
    role: 'Owner',
    company: 'Floating Paradise Karimunjawa',
    text: 'Ya, tentu saja saya akan merekomendasikan. Saya sangat puas dengan semuanya, dikerjakan dengan jelas dan penuh tanggung jawab 🙏',
    initials: 'FP',
    accentColor: '#10b981',
  },
];
