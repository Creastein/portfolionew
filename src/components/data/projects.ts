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
        id: 'portfolio',
        title: 'Portfolio',
        category: 'Web Portfolio · Frontend Development',
        year: '2025',
        description: 'Building a confident digital presence for showcasing work and expertise',
        timeline: '4 Weeks',
        services: ['Website', 'Branding', 'UI/UX'],
        image: '/images/portofolio.png',
        link: 'https://welli.my.id',
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
        featured: true
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
        featured: true
    },
    {
        id: 'best1trans',
        title: 'Best1Trans',
        category: 'Transportation Booking Platform',
        year: '2026',
        description: 'A high-conversion transportation and tour booking platform optimized for mobile users and rapid reservation workflows.',
        timeline: '3 weeks',
        services: ['Web Development', 'Booking System', 'UI/UX'],
        image: '/images/best1trans.png',
        link: 'https://best1-trans.vercel.app/',
        featured: true
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
        featured: true
    },
    {
        id: 'luxury-villa-website',
        title: 'Luxury Villa Website',
        category: 'Real Estate · High-End UI',
        year: '2026',
        description: 'Kemungkinan in final code untuk "The Lombok Sanctuary". High-end real estate platform for luxury villa properties.',
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

