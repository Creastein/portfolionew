import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { trackSocialClick } from '@/hooks/useAnalytics';

interface SocialLinkProps {
    href: string;
    label: string;
    index: number;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, label, index }) => {
    const handleClick = () => {
        trackSocialClick(label.toLowerCase(), href);
    };

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, x: 5 }}
            className="group relative flex items-center gap-3 uppercase tracking-widest text-xs font-bold text-white/60 hover:text-primary transition-all duration-300"
        >
            <span className="relative overflow-hidden">
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                    {label}
                </span>
                <span className="absolute top-full left-0 text-primary transition-transform duration-300 group-hover:-translate-y-full">
                    {label}
                </span>
            </span>
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
        </motion.a>
    );
};

export default SocialLink;
