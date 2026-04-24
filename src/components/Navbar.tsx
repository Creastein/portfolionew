import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { X, Instagram, Github, Linkedin, MessageCircle } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useTranslation } from 'react-i18next';

// Custom TikTok Icon since it might not be in the lucide version used
const TikTokIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { scrollY } = useScroll();
    const isHome = location.pathname === '/' || location.pathname === '/work';
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [time, setTime] = useState("");
    const { t, i18n } = useTranslation();

    // Jakarta Time Logic
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', {
                timeZone: 'Asia/Jakarta',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Navigation Handler
    const handleNavClick = (id: string) => {
        setIsMenuOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        } else {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navItems = [
        { id: 'home', label: t('nav.home') },
        { id: 'about', label: t('nav.about') },
        { id: 'skills', label: 'SKILLS' },
        { id: 'services', label: t('nav.services') },
        { id: 'work', label: t('nav.work') },
        { id: 'contact', label: t('nav.contact') },
    ];

    const socialLinks = [
        { label: 'TikTok', icon: <TikTokIcon size={20} />, href: 'https://www.tiktok.com/@wellibuilds?is_from_webapp=1&sender_device=pc' },
        { label: 'Instagram', icon: <Instagram size={20} />, href: 'https://www.instagram.com/_well07/' },
        { label: 'WhatsApp', icon: <MessageCircle size={20} />, href: 'https://wa.me/6285161507114' },
        { label: 'GitHub', icon: <Github size={20} />, href: 'https://github.com/Creastein' },
        { label: 'LinkedIn', icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/welli-' },
    ];

    const menuVariants: Variants = {
        closed: { x: "100%", transition: { type: "spring", stiffness: 400, damping: 40 } },
        open: { x: "0%", transition: { type: "spring", stiffness: 400, damping: 40 } }
    };

    const containerVariants: Variants = {
        closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
        open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } }
    };

    const itemVariants: Variants = {
        closed: { opacity: 0, x: 50 },
        open: { opacity: 1, x: 0, transition: { ease: "easeOut" } }
    };

    return (
        <>
            {/* TOP BAR */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-start text-white pointer-events-none">

                {/* SPACER (Logo is now in Home.tsx) */}
                <div className="pointer-events-none"></div>

                {/* RIGHT SIDE GROUP */}
                <div className="flex flex-row items-center gap-4 md:gap-8 pointer-events-auto bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-lg">
                    <motion.div
                        animate={{ opacity: isMenuOpen ? 0 : 1 }}
                        className="flex gap-4 md:gap-12 text-xs font-medium tracking-wide uppercase text-[#e0e0e0]"
                    >
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="hidden md:inline">{t('hero.available')}</span>
                            </div>
                        </div>
                        <div>
                            <div>{time}</div>
                            <div className="hidden md:block text-white/50 mt-0.5 text-right">(GMT+7)</div>
                        </div>
                    </motion.div>

                    <div className="flex items-center gap-4">
                        {/* LANGUAGE TOGGLE */}
                        <button
                            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'id' : 'en')}
                            className="text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors text-white"
                        >
                            {i18n.language === 'en' ? 'ID' : 'EN'}
                        </button>

                        <ThemeToggle />

                        {/* MENU TRIGGER */}
                        <motion.button
                            animate={{ opacity: isMenuOpen ? 0 : 1 }}
                            onClick={() => setIsMenuOpen(true)}
                            aria-label="Open navigation menu"
                            aria-expanded={isMenuOpen}
                            aria-controls="navigation-menu"
                            className="group flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-[#e0e0e0] hover:text-primary transition-colors"
                        >
                            <motion.span
                                className="w-2 h-2 bg-[#FF3300]"
                                aria-hidden="true"
                            />
                            MENU
                        </motion.button>
                    </div>
                </div>
            </nav>

            {/* SIDE MENU PANEL */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* BACKDROP */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />

                        {/* MENU CONTAINER */}
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed top-0 right-0 h-full w-full md:w-[30vw] min-w-[320px] bg-black z-50 flex flex-col border-l border-white/10 shadow-2xl"
                        >
                            {/* HEADER: CLOSE BUTTON */}
                            <div className="px-8 py-8 md:px-12 md:py-10 flex justify-between items-center border-b border-white/5 bg-black z-10">
                                <div
                                    className="flex items-center gap-3 text-xs tracking-widest text-[#e0e0e0] uppercase"
                                    style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}
                                >
                                    <span className="w-2 h-2 bg-[#FF3300]"></span>
                                    Navigation
                                </div>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label="Close navigation menu"
                                    className="group w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:border-white transition-all duration-300"
                                >
                                    <X size={20} className="text-white group-hover:text-black transition-colors" aria-hidden="true" />
                                </button>
                            </div>

                            {/* SCROLLABLE CONTENT AREA */}
                            <div className="flex-1 overflow-y-auto px-8 md:px-12 py-8 flex flex-col gap-12 hide-scrollbar">

                                {/* LINKS */}
                                <motion.div
                                    variants={containerVariants}
                                    initial="closed"
                                    animate="open"
                                    className="flex flex-col gap-6"
                                >
                                    {navItems.map((item, index) => (
                                        <motion.button
                                            key={item.id}
                                            variants={itemVariants}
                                            onClick={() => handleNavClick(item.id)}
                                            className="group text-left flex flex-col"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs font-mono text-white/30 group-hover:text-[#FF3300] transition-colors">
                                                    0{index + 1}
                                                </span>
                                                <span
                                                    className="text-4xl md:text-5xl tracking-tight text-[#888] group-hover:text-white transition-colors duration-300 uppercase"
                                                    style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}
                                                >
                                                    {item.label}
                                                </span>
                                            </div>
                                        </motion.button>
                                    ))}
                                </motion.div>

                                {/* DIVIDER */}
                                <div className="w-full h-px bg-white/10 my-4" />

                                {/* SOCIAL MEDIA GRID */}
                                <div className="flex flex-col gap-6">
                                    <h4
                                        className="text-xs tracking-widest text-white/50 uppercase"
                                        style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}
                                    >
                                        Connect
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {socialLinks.map((social) => (
                                            <a
                                                key={social.label}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white hover:border-white transition-all duration-300"
                                            >
                                                <div className="text-white group-hover:text-black transition-colors">
                                                    {social.icon}
                                                </div>
                                                <span className="text-sm font-medium text-gray-400 group-hover:text-black transition-colors">
                                                    {social.label}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* FOOTER METADATA */}
                            <div className="px-8 py-6 md:px-12 border-t border-white/10 bg-black">
                                <div className="flex flex-col gap-1 text-xs text-white/30 text-center md:text-left">
                                    <p>© 2025 WELLI. All rights reserved.</p>
                                    <p>Designed & Developed in Tangerang.</p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
