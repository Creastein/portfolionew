import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
    Clock, 
    CheckCircle2, 
    Sparkles, 
    ArrowUpRight, 
    Search, 
    Layers, 
    CalendarSync, 
    Globe2, 
    MessageCircle,
    ShieldCheck,
    Check,
    Lock
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
    const [activeStep, setActiveStep] = useState<number>(0);
    const stepsData = t('process.steps', { returnObjects: true }) as StepDeliverable[];

    const stepIcons = [Search, Layers, CalendarSync, Globe2];

    return (
        <section id="process" className="relative py-24 md:py-32 bg-[#050505] overflow-hidden border-t border-white/[0.06]">
            {/* Ambient Lighting Background */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.08)_0%,_transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-900/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Centered Luxury Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    className="max-w-3xl mx-auto text-center flex flex-col items-center mb-16 md:mb-20 pt-4"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-4 shadow-inner">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        {t('process.header.badge')}
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-['Space_Grotesk'] leading-[1.2] mb-5 text-balance">
                        {t('process.header.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-2xl text-pretty">
                        {t('process.header.subtitle')}
                    </p>
                </motion.div>

                {/* Interactive Stage & Live Simulation Split-Screen Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    
                    {/* Left Column: Interactive Progressive Timeline (5 Cols) */}
                    <div className="lg:col-span-5 flex flex-col gap-3">
                        {Array.isArray(stepsData) && stepsData.map((item, index) => {
                            const IconComponent = stepIcons[index] || Search;
                            const isActive = activeStep === index;

                            return (
                                <div
                                    key={index}
                                    onClick={() => setActiveStep(index)}
                                    className={`relative p-1.5 rounded-[1.75rem] transition-all duration-500 cursor-pointer text-left ${
                                        isActive 
                                            ? 'bg-gradient-to-r from-emerald-500/30 to-emerald-500/10 border border-emerald-500/40 shadow-[0_10px_30px_rgba(16,185,129,0.15)]' 
                                            : 'bg-white/[0.02] border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.04]'
                                    }`}
                                >
                                    <div className={`p-5 rounded-[calc(1.75rem-0.375rem)] transition-colors duration-300 ${
                                        isActive ? 'bg-[#0b0f0d]' : 'bg-[#090909]'
                                    }`}>
                                        {/* Step Top Row */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded-full ${
                                                    isActive 
                                                        ? 'bg-emerald-400 text-black shadow-[0_0_12px_rgba(16,185,129,0.5)]' 
                                                        : 'bg-white/10 text-zinc-400 font-medium'
                                                }`}>
                                                    0{index + 1}
                                                </span>
                                                <span className={`text-[10px] font-mono uppercase tracking-wider ${
                                                    isActive ? 'text-emerald-400 font-semibold' : 'text-zinc-500'
                                                }`}>
                                                    {item.badge}
                                                </span>
                                            </div>

                                            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 bg-white/[0.04] border border-white/5 px-2.5 py-0.5 rounded-full">
                                                <Clock className="w-3 h-3 text-emerald-400" />
                                                <span>{item.duration}</span>
                                            </div>
                                        </div>

                                        {/* Step Title */}
                                        <h3 className={`text-base sm:text-lg font-bold font-['Space_Grotesk'] tracking-tight mb-2 transition-colors ${
                                            isActive ? 'text-white' : 'text-zinc-300'
                                        }`}>
                                            {item.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-xs text-zinc-400 font-light leading-relaxed mb-3">
                                            {item.description}
                                        </p>

                                        {/* Deliverables Pills */}
                                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
                                            {item.deliverables?.map((del, i) => (
                                                <span 
                                                    key={i} 
                                                    className={`text-[10px] px-2 py-0.5 rounded-md font-mono transition-colors flex items-center gap-1 ${
                                                        isActive 
                                                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' 
                                                            : 'bg-white/[0.03] text-zinc-400 border border-white/[0.04]'
                                                    }`}
                                                >
                                                    <Check className="w-2.5 h-2.5 text-emerald-400" />
                                                    {del}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column: Live Artefact Simulation Stage (7 Cols) */}
                    <div className="lg:col-span-7 sticky top-28">
                        <div className="relative rounded-[2rem] p-2 bg-white/[0.03] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                            
                            {/* Stage Browser Chrome Header */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[#0e0e0e] border border-white/[0.06] rounded-t-[calc(2rem-0.5rem)] border-b-0">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 shadow-[0_0_8px_rgba(255,95,86,0.4)]" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 shadow-[0_0_8px_rgba(255,189,46,0.4)]" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 shadow-[0_0_8px_rgba(39,201,63,0.4)]" />
                                </div>

                                <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/70 border border-white/10 text-xs font-mono text-zinc-300 shadow-inner">
                                    <Lock className="w-3 h-3 text-emerald-400" />
                                    <span className="text-zinc-500">live-simulation:</span>
                                    <span className="text-emerald-400 font-medium">
                                        step-0{activeStep + 1}-{stepsData[activeStep]?.badge?.toLowerCase()?.replace(/\s+/g, '-') ?? 'stage'}
                                    </span>
                                </div>

                                <div className="text-[11px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                                    0{activeStep + 1}/04
                                </div>
                            </div>

                            {/* Stage Viewport Box */}
                            <div className="relative w-full min-h-[460px] bg-[#070707] rounded-b-[calc(2rem-0.5rem)] border border-white/[0.06] p-6 flex flex-col justify-center overflow-hidden">
                                <AnimatePresence mode="wait">
                                    
                                    {/* === STEP 1: PROPERTY AUDIT & DISCOVERY CANVAS === */}
                                    {activeStep === 0 && (
                                        <motion.div
                                            key="step-0"
                                            initial={{ opacity: 0, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.96 }}
                                            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                                            className="space-y-4 w-full"
                                        >
                                            <div className="flex items-center justify-between pb-3 border-b border-white/10">
                                                <div>
                                                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Artefak Tahap 01</span>
                                                    <h4 className="text-lg font-bold text-white font-['Space_Grotesk']">Villa Property & Guest Demographics Audit</h4>
                                                </div>
                                                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-xs">
                                                    Status: Approved
                                                </span>
                                            </div>

                                            {/* Villa Profile Specs Grid */}
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                                                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Tipe Properti</div>
                                                    <div className="text-xs font-semibold text-zinc-200 mt-1">3-Bed Riverside Luxury</div>
                                                </div>
                                                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                                                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Target Tamu Utama</div>
                                                    <div className="text-xs font-semibold text-emerald-400 mt-1">Expat & International (AU/EU)</div>
                                                </div>
                                                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] col-span-2 sm:col-span-1">
                                                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Nilai Jual Unik (USP)</div>
                                                    <div className="text-xs font-semibold text-zinc-200 mt-1">Ayung River View & Sunset 120°</div>
                                                </div>
                                            </div>

                                            {/* Sitemap Architecture Interactive Tree */}
                                            <div className="p-4 rounded-xl bg-[#0c0c0c] border border-white/[0.08] space-y-2">
                                                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                                                    Arsitektur Sitemap Kustom:
                                                </div>
                                                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                                                    <span className="px-2.5 py-1 rounded bg-black border border-white/10 text-white font-medium">/ (Hero 4K)</span>
                                                    <span className="text-zinc-600">➔</span>
                                                    <span className="px-2.5 py-1 rounded bg-black border border-white/10 text-zinc-300">/villas & suites</span>
                                                    <span className="text-zinc-600">➔</span>
                                                    <span className="px-2.5 py-1 rounded bg-black border border-white/10 text-zinc-300">/amenities</span>
                                                    <span className="text-zinc-600">➔</span>
                                                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold">
                                                        /direct-whatsapp-booking
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="text-[11px] text-zinc-400 font-light flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                                <span>Anda tidak perlu membuat materi dari nol — kami mengolah dari materi foto atau link listing yang ada.</span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* === STEP 2: BESPOKE DESIGN & 4K ASSET OPTIMIZER === */}
                                    {activeStep === 1 && (
                                        <motion.div
                                            key="step-1"
                                            initial={{ opacity: 0, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.96 }}
                                            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                                            className="space-y-4 w-full"
                                        >
                                            <div className="flex items-center justify-between pb-3 border-b border-white/10">
                                                <div>
                                                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Artefak Tahap 02</span>
                                                    <h4 className="text-lg font-bold text-white font-['Space_Grotesk']">Bespoke Design & 4K Asset Engine</h4>
                                                </div>
                                                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-xs">
                                                    100% No-Template
                                                </span>
                                            </div>

                                            {/* Visual Comparison: Raw vs Optimized */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="p-3.5 rounded-xl bg-red-500/[0.04] border border-red-500/20 space-y-1.5">
                                                    <div className="flex items-center justify-between text-[10px] font-mono text-red-400 font-semibold">
                                                        <span>Template Web Biasa</span>
                                                        <span>Berat & Lambat</span>
                                                    </div>
                                                    <div className="text-xs text-zinc-300 font-medium">Foto RAW 4.8 MB</div>
                                                    <div className="text-[11px] text-zinc-500">Beban loading 4.2s (tamu kabur)</div>
                                                </div>
                                                <div className="p-3.5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/30 space-y-1.5">
                                                    <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 font-semibold">
                                                        <span>Bespoke 4K Engine Kami</span>
                                                        <span>Sub-Detik</span>
                                                    </div>
                                                    <div className="text-xs text-white font-medium">High-Res WebP 120 KB</div>
                                                    <div className="text-[11px] text-emerald-300 font-medium">Buka instan &lt; 0.6s (0% kualitas hilang)</div>
                                                </div>
                                            </div>

                                            {/* Design System Specimen */}
                                            <div className="p-4 rounded-xl bg-[#0c0c0c] border border-white/[0.08] space-y-2">
                                                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                                                    <span>Typography & Tokens Eksklusif</span>
                                                    <span className="text-emerald-400">Mobile-First Ready</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="px-3 py-1.5 rounded bg-black border border-white/10 text-white font-['Space_Grotesk'] text-sm font-bold">
                                                        Space Grotesk
                                                    </div>
                                                    <div className="px-3 py-1.5 rounded bg-black border border-white/10 text-zinc-300 font-sans text-xs">
                                                        Inter Clean
                                                    </div>
                                                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-white/20" title="Emerald Accent" />
                                                    <div className="w-5 h-5 rounded-full bg-[#050505] border border-white/20" title="OLED Black" />
                                                </div>
                                            </div>

                                            <div className="text-[11px] text-zinc-400 font-light flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                                <span>Prototipe interaktif dikirimkan langsung ke WhatsApp Anda untuk peninjauan.</span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* === STEP 3: DIRECT BOOKING & CALENDAR SYNC SIMULATOR === */}
                                    {activeStep === 2 && (
                                        <motion.div
                                            key="step-2"
                                            initial={{ opacity: 0, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.96 }}
                                            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                                            className="space-y-4 w-full"
                                        >
                                            <div className="flex items-center justify-between pb-3 border-b border-white/10">
                                                <div>
                                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#25D366]">Artefak Tahap 03</span>
                                                    <h4 className="text-lg font-bold text-white font-['Space_Grotesk']">Direct WhatsApp & Calendar Sync Simulator</h4>
                                                </div>
                                                <span className="px-2.5 py-1 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-mono text-xs font-semibold">
                                                    0% Komisi OTA
                                                </span>
                                            </div>

                                            {/* WhatsApp Simulated Message Payload */}
                                            <div className="p-4 rounded-2xl bg-[#0c1410] border border-[#25D366]/30 space-y-3 shadow-lg">
                                                <div className="flex items-center justify-between border-b border-[#25D366]/20 pb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-black font-bold">
                                                            <MessageCircle className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <div className="text-xs font-semibold text-white">Direct Booking Admin Villa</div>
                                                            <div className="text-[10px] font-mono text-[#25D366]">Official Web Gateway</div>
                                                        </div>
                                                    </div>
                                                    <span className="text-[10px] font-mono text-zinc-400">14:02 WIB</span>
                                                </div>

                                                <div className="bg-[#121e17] p-3 rounded-xl border border-white/5 text-xs text-zinc-200 leading-relaxed font-mono">
                                                    <p className="text-emerald-300 font-semibold mb-1">🛎️ Permintaan Reservasi Baru (Website):</p>
                                                    <p>• Properti: <span className="text-white font-medium">3-Bedroom Riverside Villa</span></p>
                                                    <p>• Tamu: <span className="text-white">Alexander Smith (4 Orang)</span></p>
                                                    <p>• Periode: <span className="text-white">15 – 18 Oktober 2026 (3 Malam)</span></p>
                                                    <p className="mt-1 pt-1 border-t border-white/10 text-emerald-400 font-bold">
                                                        Total: Rp 18.000.000 <span className="text-zinc-400 font-normal">(Margin Klien 100%)</span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Calendar Sync Status */}
                                            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-2">
                                                    <CalendarSync className="w-4 h-4 text-emerald-400" />
                                                    <span className="text-zinc-300 font-mono text-[11px]">iCal Sync Airbnb / Booking.com</span>
                                                </div>
                                                <span className="text-emerald-400 font-mono text-[11px] font-semibold">Anti-Bentrok Aktif ✓</span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* === STEP 4: GOOGLE SEARCH RANK & 99/100 SPEED LAUNCH === */}
                                    {activeStep === 3 && (
                                        <motion.div
                                            key="step-3"
                                            initial={{ opacity: 0, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.96 }}
                                            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                                            className="space-y-4 w-full"
                                        >
                                            <div className="flex items-center justify-between pb-3 border-b border-white/10">
                                                <div>
                                                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Artefak Tahap 04</span>
                                                    <h4 className="text-lg font-bold text-white font-['Space_Grotesk']">Google Rank #1 & Performance Handover</h4>
                                                </div>
                                                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-xs">
                                                    Live on Custom Domain
                                                </span>
                                            </div>

                                            {/* Google SERP Snippet Preview */}
                                            <div className="p-3.5 rounded-xl bg-[#0c0c0c] border border-white/10 space-y-1.5 text-left">
                                                <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                    <span>Peringkat #1 Organik Google Search</span>
                                                </div>
                                                <div className="text-xs font-semibold text-blue-400 hover:underline cursor-pointer">
                                                    The Secret Karimunjawa — Luxury Sea View & Sunset Villa
                                                </div>
                                                <div className="text-[11px] text-zinc-400 font-light leading-snug">
                                                    Official website. Pesan langsung tanpa komisi OTA. Menikmati panorama laut 120° dan suaka alam eksklusif.
                                                </div>
                                            </div>

                                            {/* Google PageSpeed Live Metrics */}
                                            <div className="grid grid-cols-3 gap-2 text-center">
                                                <div className="p-2.5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20">
                                                    <div className="text-lg font-bold text-emerald-400 font-mono">99</div>
                                                    <div className="text-[10px] text-zinc-400 font-mono">Performance</div>
                                                </div>
                                                <div className="p-2.5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20">
                                                    <div className="text-lg font-bold text-emerald-400 font-mono">&lt; 0.7s</div>
                                                    <div className="text-[10px] text-zinc-400 font-mono">Global Load</div>
                                                </div>
                                                <div className="p-2.5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20">
                                                    <div className="text-lg font-bold text-emerald-400 font-mono">100%</div>
                                                    <div className="text-[10px] text-zinc-400 font-mono">SEO Ready</div>
                                                </div>
                                            </div>

                                            <div className="text-[11px] text-zinc-400 font-light flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                                <span>Akses domain & panduan praktis pengelolaan mandiri diserahterimakan sepenuhnya kepada Anda.</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Assurance Banner & Direct WhatsApp Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-16 p-1.5 rounded-[1.75rem] bg-white/[0.02] border border-white/10 max-w-4xl mx-auto shadow-2xl backdrop-blur-xl"
                >
                    <div className="bg-[#090909] rounded-[calc(1.75rem-0.375rem)] px-6 py-5 md:px-8 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/[0.04]">
                        <div className="flex items-center gap-4 text-center sm:text-left">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-white font-['Space_Grotesk'] tracking-tight">
                                    Garansi Pengerjaan Tepat Waktu (14 Hari Kerja)
                                </div>
                                <div className="text-xs text-zinc-400 font-light mt-0.5 leading-relaxed">
                                    {t('process.guarantee.text')}
                                </div>
                            </div>
                        </div>

                        <a
                            href={DEFAULT_WHATSAPP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-400 hover:bg-emerald-300 text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] shrink-0 group active:scale-95"
                        >
                            <span>{t('process.guarantee.cta')}</span>
                            <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProcessSection;
