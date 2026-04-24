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
        id: 'floating-paradise',
        title: 'Floating Paradise',
        category: 'Villa & Resort Website',
        year: '2026',
        description: 'Villa & resort website. Stack: Next.js, React.js, Supabase, Tailwind CSS',
        timeline: '2 weeks',
        services: ['Next.js', 'React.js', 'Supabase', 'Tailwind CSS'],
        image: '/images/floatingparadise.webp',
        link: 'https://floatingparadise.id',
        featured: true
    },
    {
        id: 'the-secret-karimunjawa',
        title: 'The Secret Karimunjawa',
        category: 'Hospitality Website',
        year: '2026',
        description: 'Hospitality website. Stack: Next.js, React.js, Tailwind CSS',
        timeline: '3 minggu',
        services: ['Next.js', 'React.js', 'Tailwind CSS'],
        image: '/images/karimunjawa.png',
        link: 'https://thesecretkarimunjawa.com',
        featured: true
    },
    {
        id: 'wellibuilds',
        title: 'WelliBuilds',
        category: 'Web Development Service',
        year: '2024',
        description: 'Web development service for hospitality and villa/resort clients in Indonesia.',
        timeline: 'Ongoing',
        services: ['Next.js', 'React.js', 'Supabase', 'Vercel'],
        image: '/images/portofolio.png',
        link: 'https://welli.my.id',
        featured: true
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
        featured: true
    },
    {
        id: 'wellibuilds-crm',
        title: 'WelliBuilds CRM',
        category: 'CRM Dashboard · Freelance Management',
        year: '2026',
        description: 'Freelance dashboard dengan Mission Control, KPI metrics, database prospek, dan tracking revenue real-time untuk mengelola pipeline klien secara efisien.',
        timeline: '4 weeks',
        services: ['React.js', 'TypeScript', 'Supabase', 'PWA'],
        image: '/images/wellibuilds-crm.png',
        link: 'https://welli-builds.vercel.app/',
        featured: true
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
        featured: true
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
        id: 'villa-utamaro',
        title: 'Villa Utamaro',
        category: 'Premium Hospitality Website',
        year: '2026',
        description: 'A premium hospitality landing page with robust internationalization (i18n) support, tailored for the global luxury villa market.',
        timeline: '2 weeks',
        services: ['Website', 'Branding', 'i18n'],
        image: '/images/VillaUtamaro.png',
        link: 'https://villa-utamaro-next.vercel.app/id',
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
        id: 'dancing-mountain-villa',
        title: 'Dancing Mountain Villa',
        category: 'Resort Website',
        year: '2026',
        description: 'An immersive, visual-heavy resort website focusing on premium brand storytelling and fluid motion design.',
        timeline: '2 weeks',
        services: ['Website Branding', 'UI/UX', 'Motion Design'],
        image: '/images/dancingmountainvilla.png',
        link: 'https://dancing-mountain-villa.vercel.app/',
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
        id: 'la-beaute-luxury-spa',
        title: 'La Beauté Luxury Spa',
        category: 'Luxury Wellness · Booking Platform',
        year: '2026',
        description: 'A luxury digital wellness platform designed to mirror the tranquility and premium service of a high-end spa. Functions as a 24/7 digital concierge with an integrated reservation system.',
        timeline: '4 Weeks',
        services: ['Premium Brand Identity', 'UX/UI Design', 'Booking System Integration', 'Mobile-First Development'],
        image: '/images/Salon-Spa.png',
        link: 'https://la-beaut-luxury-spa.vercel.app/',
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
