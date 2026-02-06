import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const ContactSection: React.FC = () => {
    return (
        <footer id="contact" className="relative z-10 container mx-auto max-w-[1400px] px-6 sm:px-12 pt-32 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-12 mb-12">
                <div>
                    <h2 className="text-6xl md:text-9xl font-bold font-display tracking-tighter text-white mb-8">
                        LET'S TALK
                    </h2>
                    <a href="mailto:contact@welli.my.id" className="text-2xl md:text-3xl text-secondary hover:text-primary transition-colors flex items-center gap-4">
                        contact@welli.my.id <ArrowUpRight />
                    </a>
                </div>
                <div className="mt-12 md:mt-0 flex gap-8">
                    <a href="https://www.linkedin.com/in/welli-" target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-xs font-bold hover:text-primary transition-colors">LinkedIn</a>
                    <a href="https://www.instagram.com/_well07/" target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-xs font-bold hover:text-primary transition-colors">Instagram</a>
                    <a href="https://github.com/Creastein" target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-xs font-bold hover:text-primary transition-colors">GitHub</a>
                    <a href="https://www.tiktok.com/@wellibuilds?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-xs font-bold hover:text-primary transition-colors">TikTok</a>
                </div>
            </div>

            <div className="flex justify-between items-center text-sm text-white/30">
                <p>© 2025 WELLI. All rights reserved.</p>
                <p>Jakarta, Indonesia</p>
            </div>
        </footer>
    );
};

export default ContactSection;
