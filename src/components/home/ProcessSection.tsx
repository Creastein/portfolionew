import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
    Clock, 
    Sparkles, 
    ArrowUpRight, 
    Search, 
    Palette, 
    CalendarSync, 
    Rocket,
    ShieldCheck,
    Check,
    CheckCircle2
} from 'lucide-react';
import { DEFAULT_WHATSAPP_LINK } from '@/constants/contact';

interface StepDeliverable {
    step: string;
    duration: string;
    badge: string;
    title: string;
    description: string;
    deliverables: string[];
}

const ProcessSection: React.FC = () => {
    const { t } = useTranslation();
    const stepsData = t('process.steps', { returnObjects: true }) as StepDeliverable[];

    const stepIcons = [Search, Palette, CalendarSync, Rocket];

    return (
        <section id="process" className="relative py-24 md:py-32 bg-[#050505] overflow-hidden border-t border-white/[0.06]">
            {/* Ambient Background Lighting */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[radial-gradient(ellipse_at_center,_rgba(19,91,236,0.08)_0%,_transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-900/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    className="max-w-3xl mx-auto text-center flex flex-col items-center mb-16 md:mb-20 pt-4"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-blue-400 text-xs font-mono uppercase tracking-widest mb-4 shadow-inner">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        {t('process.header.badge')}
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-['Space_Grotesk'] leading-[1.2] mb-5 text-balance">
                        {t('process.header.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-2xl text-pretty">
                        {t('process.header.subtitle')}
                    </p>
                </motion.div>

                {/* --- LINEAR ARCHITECTURAL TIMELINE TRACK --- */}
                <div className="relative mb-16">
                    {/* Desktop Connected Conduit Line */}
                    <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white/15 to-transparent z-0 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent blur-[1px]" />
                    </div>

                    {/* Step Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 items-stretch">
                        {Array.isArray(stepsData) && stepsData.map((item, index) => {
                            const IconComponent = stepIcons[index] || Search;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                                    whileHover={{ y: -6 }}
                                    className="group relative rounded-[2rem] p-1.5 bg-white/[0.02] border border-white/[0.08] hover:border-primary/40 transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_45px_rgba(19,91,236,0.12)] flex flex-col"
                                >
                                    {/* Inner Machined Hardware Core */}
                                    <div className="rounded-[calc(2rem-0.375rem)] bg-[#090d14]/90 p-6 sm:p-7 flex flex-col justify-between h-full relative overflow-hidden border border-white/[0.04]">
                                        
                                        {/* Subtle Top Ambient Sheen */}
                                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500 pointer-events-none" />

                                        <div>
                                            {/* Step Header: Number, Conduit Node & Icon */}
                                            <div className="flex items-center justify-between mb-5 relative z-10">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center font-mono text-sm font-bold text-white group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300 shadow-inner">
                                                        0{index + 1}
                                                    </span>
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-semibold">
                                                            {item.badge}
                                                        </span>
                                                        <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 mt-0.5">
                                                            <Clock className="w-3 h-3 text-zinc-500" />
                                                            <span>{item.duration}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 group-hover:border-primary/30 transition-colors">
                                                    <IconComponent className="w-4 h-4" />
                                                </div>
                                            </div>

                                            {/* Step Title */}
                                            <h3 className="text-base sm:text-lg font-bold text-white font-['Space_Grotesk'] tracking-tight mb-3 leading-snug group-hover:text-blue-100 transition-colors">
                                                {item.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Deliverables Checklist Box */}
                                        <div className="pt-4 border-t border-white/[0.06] mt-auto">
                                            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2.5 flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                                <span>Output Nyata:</span>
                                            </div>
                                            <ul className="space-y-2">
                                                {item.deliverables?.map((del, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-300 font-normal leading-tight">
                                                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                                                        <span>{del}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* --- BOTTOM ASSURANCE BANNER & DIRECT ACTION --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="p-1.5 rounded-[2rem] bg-white/[0.02] border border-white/10 max-w-4xl mx-auto shadow-2xl backdrop-blur-xl"
                >
                    <div className="bg-[#090d14]/90 rounded-[calc(2rem-0.375rem)] px-6 py-6 md:px-8 md:py-7 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/[0.04]">
                        <div className="flex items-center gap-4 text-center sm:text-left">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(19,91,236,0.15)]">
                                <ShieldCheck className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-sm sm:text-base font-semibold text-white font-['Space_Grotesk'] tracking-tight flex items-center justify-center sm:justify-start gap-2">
                                    <span>Garansi Pengerjaan Tepat Waktu (14 Hari Kerja)</span>
                                    <CheckCircle2 className="w-4 h-4 text-blue-400 inline" />
                                </div>
                                <div className="text-xs text-zinc-400 font-light mt-1 leading-relaxed">
                                    {t('process.guarantee.text')}
                                </div>
                            </div>
                        </div>

                        <a
                            href={DEFAULT_WHATSAPP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary hover:bg-blue-600 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(19,91,236,0.35)] hover:shadow-[0_0_35px_rgba(19,91,236,0.55)] shrink-0 group active:scale-95"
                        >
                            <span>{t('process.guarantee.cta')}</span>
                            <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProcessSection;
