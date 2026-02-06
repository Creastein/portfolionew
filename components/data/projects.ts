export interface Project {
    id: string;
    title: string;
    category: string;
    year: string;
    image: string;
    link: string;
    featured?: boolean;
}

export const projects: Project[] = [
    {
        id: 'idx-trading-assistant',
        title: 'IDX Trading Assistant',
        category: 'AI Financial Terminal',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop',
        link: 'https://idx-trading-assistant.vercel.app/'
    },
    {
        id: 'luxury-villa-website',
        title: 'Luxury Villa Website',
        category: 'Real Estate · High-End UI',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
        link: 'https://luxury-villa-website.vercel.app/',
        featured: true
    },
    {
        id: 'dancing-mountain-villa',
        title: 'Dancing Mountain Villa',
        category: 'Web Design · React',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
        link: 'https://dancing-mountain-villa.vercel.app/'
    },
    {
        id: 'villa-utamaro',
        title: 'Villa Utamaro',
        category: 'Web Design · UI/UX',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop',
        link: 'https://villa-utamaro-next.vercel.app/id'
    },
    {
        id: 'best1trans',
        title: 'Best1Trans',
        category: 'Car Rental · Web Development',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop',
        link: 'https://best1-trans.vercel.app/'
    },
    {
        id: 'portfolio',
        title: 'Portfolio',
        category: 'Web Portfolio · Frontend Development',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
        link: 'https://creastein.github.io/portofolio'
    }
];
