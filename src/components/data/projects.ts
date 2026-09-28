export interface Project {
    id: string;
    title: string;
    category: string;
    year: string;
    image: string;
    link: string;
    description?: string;
    timeline?: string;
    services?: string[];
    featured?: boolean;
}

export const projects: Project[] = [
    {
        id: 'the-secret-karimunjawa',
        title: 'The Secret Karimunjawa',
        category: 'Luxury Sea View Villa',
        year: '2026',
        description: 'Website resmi villa eksklusif di Karimunjawa dengan pemandangan laut 120°. Terbukti menduduki Peringkat #1 di Google Search mengalahkan platform OTA raksasa seperti Tiket.com, mengamankan direct booking WhatsApp tanpa potongan komisi.',
        timeline: '3 Minggu',
        services: ['Google Rank #1', 'Direct WhatsApp Booking', '0% Potongan Komisi', 'Akses Cepat Global'],
        image: '/images/karimunjawa.webp',
        link: 'https://thesecretkarimunjawa.com',
        featured: true
    },
    {
        id: 'floating-paradise',
        title: 'Floating Paradise',
        category: 'Villa & Resort Private Pool',
        year: '2026',
        description: 'Portal digital sinematik untuk villa & resort tepi air dengan galeri visual 4K, sistem reservasi langsung, dan navigasi mobile-first yang memikat wisatawan mancanegara sejak detik pertama.',
        timeline: '2 Minggu',
        services: ['Visual 4K Sinematik', 'Direct Booking Engine', 'Mobile-First Design', 'Buka Instan < 1s'],
        image: '/images/floatingparadise.webp',
        link: 'https://floatingparadise.id',
        featured: true
    },
    {
        id: 'homebase-lombok',
        title: 'HomeBase Lombok',
        category: 'Property Management & Villa Sync',
        year: '2026',
        description: 'Sistem kustom sinkronisasi kalender ketersediaan real-time untuk 3 villa aktif di Lombok. Mengintegrasikan jadwal otomatis anti-bentrok langsung dari Airbnb ke website mandiri, mempermudah tamu memilih tanggal dan reservasi instan via WhatsApp tanpa biaya perantara.',
        timeline: '2 Minggu',
        services: ['Sinkronisasi Kalender Real-Time', 'Anti-Bentrok Jadwal', 'Direct WhatsApp Booking', '0% Komisi OTA'],
        image: '/images/homebaselombok.webp',
        link: 'https://homebaselombok.com',
        featured: true
    },
    {
        id: 'the-subahu-villa',
        title: 'The Subahu Villa',
        category: 'Riverside Luxury Villa · Sanur Bali',
        year: '2026',
        description: 'Website villa riverside 3 kamar tidur mewah di tepi Sungai Ayung dekat Sanur, Bali. Menghadirkan visual sinematik alam, spesifikasi interaktif lengkap, dan sistem reservasi direct booking tanpa perantara.',
        timeline: '2 Minggu',
        services: ['Riverside Sanctuary', 'Direct Booking', 'Galeri 4K Sinematik', 'Mobile-First'],
        image: '/images/thesubahuvilla.webp',
        link: 'https://www.thesubahuvilla.com/',
        featured: true
    },
    {
        id: 'homyhome-bali-tour',
        title: 'HomyHome Bali Tour',
        category: 'Bali Tour & Experiential Travel',
        year: '2026',
        description: 'Website paket wisata privat dan tour guide lokal Bali dengan pengalaman navigasi instan, katalog destinasi interaktif, multi-bahasa (ID/EN), dan konversi pemesanan langsung via WhatsApp.',
        timeline: '2 Minggu',
        services: ['Katalog Wisata Interaktif', 'Direct WhatsApp Booking', 'Multi-Language (ID/EN)', 'SEO Wisata Bali'],
        image: '/images/homyhomebalitour.webp',
        link: 'https://www.homyhomebalitour.com/',
        featured: true
    },
    {
        id: 'danu-house-ubud-tour',
        title: 'Danu House Ubud Tour',
        category: 'Ubud Private Tour & Transport',
        year: '2026',
        description: 'Website layanan tour privat Ubud dan rental transportasi lokal Bali dengan performa sub-detik (Astro), optimasi GEO & Local SEO di pencarian Google, serta alur reservasi cepat.',
        timeline: '2 Minggu',
        services: ['Sub-Second Astro Speed', 'GEO Local SEO', 'Direct WhatsApp Booking', 'Mobile-First'],
        image: '/images/danuhouseubudtour.webp',
        link: 'https://www.danuhouseubudtour.com/',
        featured: true
    },
    {
        id: 'datoya-house',
        title: 'Datoya Guest House',
        category: 'Whole-House Rental · Semarang',
        year: '2026',
        description: 'Website sewa 1 rumah utuh (Whole-House Rental) kapasitas 6–12 tamu di Banyumanik, Semarang. Menampilkan virtual tour fasilitas, transparansi harga, dan integrasi reservasi instan via WhatsApp.',
        timeline: '2 Minggu',
        services: ['Sewa 1 Rumah Utuh', 'Direct WhatsApp Booking', 'Informasi Transparan', 'Mobile-First'],
        image: '/images/datoyahouse.webp',
        link: 'https://www.datoyahouse.com/',
        featured: true
    },
    {
        id: 'dancing-mountain-villa',
        title: 'Dancing Mountain Villa',
        category: 'Highland Luxury Eco-Resort',
        year: '2026',
        description: 'Website resort pegunungan berkonsep alam mewah dengan storytelling visual imersif, showcase fasilitas panorama pegunungan, dan jalur komunikasi reservasi cepat.',
        timeline: '2 Minggu',
        services: ['Storytelling Visual', 'Katalog Villa Interaktif', 'WhatsApp Instant Reservasi', 'Desain Khusus'],
        image: '/images/dancingmountainvilla.png',
        link: 'https://dancing-mountain-villa.vercel.app/',
        featured: false
    },
    {
        id: 'la-beaute-luxury-spa',
        title: 'La Beauté Luxury Spa',
        category: 'Luxury Hospitality & Wellness',
        year: '2026',
        description: 'Platform reservasi digital concierge 24/7 untuk spa & relaksasi premium, menghadirkan kemudahan booking layanan perawatan mewah tanpa jeda antrean.',
        timeline: '3 Minggu',
        services: ['Digital Concierge 24/7', 'Sistem Reservasi Otomatis', 'Branding Mewah', 'Checkout Praktis'],
        image: '/images/Salon-Spa.png',
        link: 'https://la-beaut-luxury-spa.vercel.app/',
        featured: false
    },
    {
        id: 'pasline',
        title: 'PASLINE',
        category: 'Government SaaS · Digital Communication',
        year: '2026',
        description: 'Sistem komunikasi digital untuk UPT/Lapas/Rutan di Indonesia — aman, tercatat real-time, dan terkelola. Dilengkapi QR verification, one-way call system, dan monitoring dashboard.',
        timeline: '6 weeks',
        services: ['Next.js', 'React.js', 'Supabase', 'PWA'],
        image: '/images/pasline.png',
        link: 'https://pasline.vercel.app',
        featured: false
    },
    {
        id: 'wl-studio-crm',
        title: 'WL-STUDIO CRM',
        category: 'CRM Dashboard · Freelance Management',
        year: '2026',
        description: 'Freelance dashboard dengan Mission Control, KPI metrics, database prospek, dan tracking revenue real-time untuk mengelola pipeline klien secara efisien.',
        timeline: '4 weeks',
        services: ['React.js', 'TypeScript', 'Supabase', 'PWA'],
        image: '/images/wellibuilds-crm.png',
        link: 'https://welli-builds.vercel.app/',
        featured: false
    },
    {
        id: 'adam-tour-lombok',
        title: 'Adam Tour Lombok',
        category: 'Tourism · Booking Website',
        year: '2026',
        description: 'Website tour guide lokal terpercaya di Lombok dengan paket wisata ke Gunung Rinjani, Gili Islands, Pink Beach, dan destinasi terbaik Lombok. SEO-optimized dengan Schema.org.',
        timeline: '3 weeks',
        services: ['React.js', 'TypeScript', 'Tailwind CSS', 'SEO'],
        image: '/images/adamtour-lombok.png',
        link: 'https://adamtour2.vercel.app/',
        featured: false
    },
    {
        id: 'idx-trading-assistant',
        title: 'IDX Trading Assistant',
        category: 'AI Financial Terminal',
        year: '2026',
        description: 'An AI-powered analytics dashboard for the Indonesia Stock Exchange, featuring real-time data visualization and automated trade signals.',
        timeline: '5 weeks',
        services: ['Web App Development', 'AI Integration', 'FinTech'],
        image: '/images/IDX-Trading-Assistant.png',
        link: 'https://idx-trading-assistant.vercel.app/',
        featured: false
    },
    {
        id: 'portfolio',
        title: 'Portfolio',
        category: 'Web Portfolio · Full Stack Development',
        year: '2025',
        description: 'Building a confident digital presence for showcasing work and expertise',
        timeline: '4 Weeks',
        services: ['Website', 'Branding', 'UI/UX'],
        image: '/images/portofolio.png',
        link: 'https://welli.my.id',
        featured: false
    },
    {
        id: 'pt-bkn',
        title: 'PT BKN',
        category: 'Corporate Website · Lead Generation',
        year: '2024',
        description: 'A professional corporate website designed with lead generation strategy, delivering a clean and trustworthy digital presence.',
        timeline: '2 Weeks',
        services: ['UI/UX Design', 'Frontend Dev', 'Lead Generation Strategy'],
        image: '/images/pt-bkn.png',
        link: 'https://pt-bkn.vercel.app/',
        featured: false
    },
    {
        id: 'best1trans',
        title: 'Best1Trans',
        category: 'Transportation Booking Platform',
        year: '2025',
        description: 'A high-conversion transportation and tour booking platform with interactive UI/UX, optimized for mobile users and conversion rate.',
        timeline: '3 Weeks',
        services: ['Platform Architecture', 'Interactive UI/UX', 'Frontend Development', 'Conversion Rate Optimization (CRO)'],
        image: '/images/lux-drive.png',
        link: 'https://best1-trans.vercel.app/',
        featured: false
    },
    {
        id: 'website-builder',
        title: 'Website Builder',
        category: 'SaaS · Fullstack Engineering',
        year: '2026',
        description: 'An enterprise-grade SaaS application engineered to empower non-technical users to visually construct and deploy high-performance websites. Built with complex state management and a seamless drag-and-drop interface.',
        timeline: '2 Weeks',
        services: ['SaaS Architecture', 'Complex State Management', 'Drag-and-Drop UX', 'Fullstack Engineering'],
        image: '/images/wb.png',
        link: 'https://website-builder-tau-livid.vercel.app/',
        featured: false
    },
    {
        id: 'harga-check',
        title: 'HargaCheck',
        category: 'Data Aggregation · E-Commerce',
        year: '2026',
        description: 'A high-performance data aggregator platform engineered to synchronize, process, and analyze real-time product pricing across major e-commerce marketplaces. Built with advanced search capabilities and automated price-drop alerts.',
        timeline: '3 Weeks',
        services: ['Data Aggregation Architecture', 'API Integration & Web Scraping', 'Real-time Search Engine', 'High-Performance UI/UX'],
        image: '/images/hargaCheck.png',
        link: 'https://harga-check.vercel.app/',
        featured: false
    },
    {
        id: 'luxury-villa-website',
        title: 'Luxury Villa Website',
        category: 'Real Estate · High-End UI',
        year: '2026',
        description: 'High-end real estate platform for luxury villa properties.',
        timeline: '2 Weeks',
        services: ['TypeScript', 'Website', 'Branding'],
        image: '/images/luxury_villa_website.png',
        link: 'https://luxury-villa-website-prototype-deve.vercel.app/'
    },
    {
        id: 'gerai-batik',
        title: 'Gerai Batik',
        category: 'E-Commerce · Fashion Retail',
        year: '2026',
        description: 'Web katalog sederhana untuk retail fashion dengan fokus pada batik dan produk tradisional Indonesia.',
        timeline: '3 Days',
        services: ['HTML', 'CSS', 'Catalog'],
        image: '/images/gerai-batik.png',
        link: 'https://gerai-batik.vercel.app/'
    },
    {
        id: 'sagara-coffee',
        title: 'Sagara Coffee',
        category: 'Hospitality · Coffee Shop',
        year: '2026',
        description: 'Landing page modern untuk "Sagara Coffee" dengan design yang menarik dan user-friendly.',
        timeline: '1 Week',
        services: ['TypeScript', 'Landing Page', 'UI/UX'],
        image: '/images/Sagara-coffee.png',
        link: 'https://coffe-shop-indol-eta.vercel.app/'
    },
    {
        id: 'cafe-sba2',
        title: 'cafeSBA2',
        category: 'Hospitality · Cafe Website',
        year: '2026',
        description: 'Versi 2 atau cabang lain dari proyek cafe dengan improvements dan features tambahan.',
        timeline: '3 Days',
        services: ['TypeScript', 'Web Development', 'UI/UX'],
        image: '/images/cafeSBA2.png',
        link: 'https://cafe-sba-2.vercel.app/'
    },
    {
        id: 'clipflow-ai',
        title: 'ClipFlowAI',
        category: 'AI · Video Automation',
        year: '2025',
        description: 'Backend/Logic untuk otomatisasi video/konten menggunakan artificial intelligence untuk content creators.',
        timeline: '4 Weeks',
        services: ['Python', 'AI/ML', 'Backend'],
        image: '/images/clipflowai.png',
        link: 'https://clip-flow-ai-personal.vercel.app/'
    }
];
