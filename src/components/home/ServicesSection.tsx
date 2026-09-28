import React from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles, CalendarCheck, Zap, Check, Globe, ShieldCheck, MessageCircle } from 'lucide-react';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// ─── VISUAL 1: Bespoke Villa Mockup ───
const BespokeDesignVisual: React.FC = () => (
  <div className="relative w-full h-[200px] sm:h-[220px] rounded-2xl overflow-hidden bg-[#121212] border border-white/[0.08] mb-6">
    {/* Mini Browser Bar */}
    <div className="h-7 bg-white/[0.04] border-b border-white/[0.06] px-3 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
      </div>
      <div className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.06] text-[9px] font-mono text-zinc-400">
        wl-studio.co/luxury-villa
      </div>
      <div className="w-6" />
    </div>

    {/* Luxury Villa Image with Dark Scrim */}
    <div className="relative w-full h-[calc(100%-28px)] overflow-hidden">
      <img
        src="/images/floatingparadise.webp"
        alt="Bespoke Luxury Villa Web Design"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-black/30 to-transparent" />

      {/* Floating Badge */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/15">
          <Sparkles className="w-3 h-3 text-blue-400" />
          <span className="text-[10px] font-mono text-zinc-200 uppercase tracking-wider font-medium">
            100% Bespoke · No Template
          </span>
        </div>
        <span className="text-[10px] font-mono text-blue-400 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
          4K Visual
        </span>
      </div>
    </div>
  </div>
);

// ─── VISUAL 2: WhatsApp Official Direct Booking Simulation ───
const DirectBookingVisual: React.FC = () => (
  <div className="relative w-full h-[215px] sm:h-[235px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#0b1224] via-[#090e1a] to-[#070910] border border-primary/30 p-3 flex flex-col justify-between mb-6 shadow-inner">
    {/* Official WhatsApp Header */}
    <div className="flex items-center justify-between pb-2 border-b border-primary/20 bg-blue-950/40 -mx-3 -mt-3 px-3.5 pt-2.5">
      <div className="flex items-center gap-2">
        {/* Official WhatsApp Brand Icon */}
        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-sm flex-shrink-0">
          <MessageCircle className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="leading-tight">
          <div className="text-[10px] font-sans font-semibold text-white flex items-center gap-1">
            Direct Booking Engine
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>
          <span className="text-[8px] font-mono text-blue-400">Official Direct Channel</span>
        </div>
      </div>
      <span className="text-[8.5px] font-mono bg-primary/20 text-blue-300 px-2 py-0.5 rounded-full border border-primary/30 font-medium">
        0% OTA Fee
      </span>
    </div>

    {/* Mini Chat Flow */}
    <div className="space-y-1.5 my-auto">
      {/* Guest message */}
      <div className="flex justify-end">
        <div className="max-w-[85%] bg-[#135bec]/80 border border-blue-400/20 rounded-xl rounded-tr-xs px-2.5 py-1 text-[9.5px] text-zinc-100 shadow-sm flex items-end gap-1.5">
          <span>"Halo, mau reservasi Villa (3 Malam) tgl 12-15 Okt..."</span>
          <span className="text-[7.5px] text-blue-200/70 font-mono">14:20</span>
        </div>
      </div>

      {/* Confirmed System Card */}
      <div className="flex justify-start">
        <div className="w-full bg-[#101622]/90 border border-primary/30 rounded-xl rounded-tl-xs p-2 shadow-md">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9.5px] font-sans font-semibold text-blue-400 flex items-center gap-1">
              <Check className="w-3 h-3 text-blue-400" strokeWidth={3} /> Reservasi Dikonfirmasi
            </span>
            <span className="text-[10.5px] font-mono font-bold text-white">
              Rp 15.000.000
            </span>
          </div>
          <div className="text-[8.5px] font-mono text-blue-300/90 flex items-center justify-between pt-1 border-t border-white/[0.06]">
            <span>Komisi Pihak Ketiga: <strong className="text-white">Rp 0</strong></span>
            <span className="text-blue-400 font-mono text-[8px]">✓✓ 14:20</span>
          </div>
        </div>
      </div>
    </div>

    {/* Footer Callout */}
    <div className="flex items-center justify-between text-[8.5px] font-mono text-blue-300 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
      <span className="font-medium">100% Margin Masuk ke Rekening Anda</span>
      <span className="text-blue-400 font-semibold">Hemat 20%</span>
    </div>
  </div>
);

// ─── VISUAL 3: Speed & Real Google Ranking Proof ───
const SpeedGlobalVisual: React.FC = () => (
  <div className="relative w-full h-[215px] sm:h-[235px] rounded-2xl overflow-hidden bg-[#101010] border border-white/[0.08] p-3 flex flex-col justify-between mb-6">
    {/* Google Search Bar Mockup */}
    <div className="bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.41 7.33 24 12 24z"/>
          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.59 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
        </svg>
        <span className="text-[10px] font-sans text-white truncate">
          villa di karimunjawa
        </span>
      </div>
      <span className="text-[8.5px] font-mono text-blue-400 font-semibold bg-primary/15 border border-primary/30 px-1.5 py-0.5 rounded-full flex-shrink-0">
        Rank #1
      </span>
    </div>

    {/* Search Results Container */}
    <div className="space-y-1.5 my-auto">
      {/* 1. The Secret Karimunjawa (Rank 1 - Featured) */}
      <div className="bg-[#181818] border border-primary/30 rounded-xl p-2 space-y-0.5 shadow-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-primary/20 text-blue-400 flex items-center justify-center text-[7px] font-bold">
            ✦
          </div>
          <span className="text-[9px] text-zinc-300 font-medium truncate">thesecretkarimunjawa.com</span>
          <span className="text-[8px] font-mono text-blue-400 ml-auto font-medium">#1 Organic</span>
        </div>

        <div className="text-[10px] font-medium text-[#c58af9] truncate leading-tight">
          The Secret Karimunjawa: Villa Mewah Sea View...
        </div>

        <p className="text-[8.5px] text-zinc-400 line-clamp-1 leading-normal font-light">
          Villa eksklusif di Karimunjawa dengan sunset 120° langsung dari kamar...
        </p>
      </div>

      {/* 2. Tiket.com (Rank 2 - Below Client) */}
      <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg px-2 py-1.5 space-y-0.5 opacity-60">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[7px] font-bold">
            ●
          </div>
          <span className="text-[8.5px] text-zinc-400 truncate">tiket.com › sewa-villa-karimunjawa</span>
          <span className="text-[8px] font-mono text-zinc-500 ml-auto">#2 OTA</span>
        </div>

        <div className="text-[9.5px] font-medium text-[#8ab4f8] truncate leading-tight">
          Sewa Villa di Karimun Jawa, Jepara - Tiket.com
        </div>
      </div>
    </div>

    {/* Footer Proof Badge */}
    <div className="flex items-center justify-between text-[8.5px] font-mono text-blue-300 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
      <span className="flex items-center gap-1 font-medium">
        <Check className="w-2.5 h-2.5 text-blue-400" strokeWidth={3} /> Terbukti Mengalahkan Platform OTA
      </span>
      <span className="text-zinc-400 font-normal">PageSpeed 98+</span>
    </div>
  </div>
);

const SERVICES_CONFIG = [
  {
    id: 'bespoke-design',
    icon: Sparkles,
    VisualComponent: BespokeDesignVisual,
  },
  {
    id: 'direct-booking',
    icon: CalendarCheck,
    VisualComponent: DirectBookingVisual,
    isFeatured: true,
  },
  {
    id: 'search-speed',
    icon: Zap,
    VisualComponent: SpeedGlobalVisual,
  },
];

const ServicesSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      key={i18n.language}
      ref={sectionRef}
      id="services"
      className="relative z-30 w-full py-28 md:py-36 overflow-hidden bg-[#050505] text-white"
      style={{
        background: `
          radial-gradient(ellipse 70% 40% at 50% 0%, rgba(19,91,236,0.05) 0%, transparent 60%),
          #050505
        `,
      }}
    >
      {/* Top subtle hairline divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Grain Texture Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      <div className="relative z-10 container mx-auto max-w-[1320px] px-6 sm:px-10">

        {/* --- SECTION HEADER (CENTERED) --- */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-500 uppercase font-medium">
              {t('services.header.label', { defaultValue: 'Layanan Kami' })}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-[2.65rem] font-bold text-white tracking-tight leading-[1.12] font-['Space_Grotesk'] text-center">
            {t('services.header.title')}
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed mt-5 max-w-2xl text-center text-pretty">
            {t('services.header.subtitle')}
          </p>
        </div>

        {/* === 3 VISUAL-FIRST LUXURY MONOLITH PILLARS === */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7">
          {SERVICES_CONFIG.map((item, index) => {
            const { VisualComponent } = item;
            const title = t(`services.items.${item.id}.title`);
            const badge = t(`services.items.${item.id}.badge`);
            const description = t(`services.items.${item.id}.description`);
            const tags = t(`services.items.${item.id}.tags`, { returnObjects: true }) as string[];

            return (
              <motion.div
                key={item.id}
                custom={index}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
                className={`group relative rounded-[1.75rem] p-1.5 transition-all duration-500 flex flex-col justify-between ${
                  item.isFeatured ? 'lg:-translate-y-2' : ''
                }`}
                style={{
                  background: item.isFeatured
                    ? 'linear-gradient(135deg, rgba(19,91,236,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.01) 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
                  boxShadow: item.isFeatured
                    ? '0 0 60px -25px rgba(19,91,236,0.2), inset 0 1px 0 0 rgba(255,255,255,0.1)'
                    : 'inset 0 1px 0 0 rgba(255,255,255,0.05)',
                }}
              >
                {/* Outer Ring */}
                <div
                  className={`absolute inset-0 rounded-[1.75rem] border pointer-events-none transition-colors duration-500 ${
                    item.isFeatured
                      ? 'border-primary/40 group-hover:border-blue-400/60'
                      : 'border-white/[0.06] group-hover:border-white/[0.14]'
                  }`}
                />

                {/* Inner Concentric Core */}
                <div className="relative rounded-[calc(1.75rem-0.375rem)] bg-[#090909] h-full overflow-hidden border border-white/[0.04] p-6 sm:p-7 flex flex-col justify-between group-hover:bg-[#0c0c0c] transition-colors duration-500">
                  
                  {/* Top Visual Scene */}
                  <div>
                    <VisualComponent />

                    {/* Badge & Title */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`text-[10px] font-mono tracking-wider uppercase font-semibold px-2.5 py-0.5 rounded-full ${
                          item.isFeatured
                            ? 'bg-primary/15 text-blue-400 border border-primary/30'
                            : 'bg-white/[0.04] text-zinc-400 border border-white/[0.08]'
                        }`}
                      >
                        {badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug font-['Space_Grotesk'] mb-3 group-hover:text-blue-400 transition-colors duration-300">
                      {title}
                    </h3>

                    {/* Supporting Description */}
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light text-pretty mb-6">
                      {description}
                    </p>
                  </div>

                  {/* Card Footer: Tags */}
                  <div className="pt-5 border-t border-white/[0.06]">
                    <div className="flex flex-wrap gap-1.5">
                      {Array.isArray(tags) &&
                        tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.03] text-[10px] sm:text-[11px] font-mono text-zinc-400 border border-white/[0.06] transition-colors duration-300 group-hover:border-white/[0.12] group-hover:text-zinc-300"
                          >
                            <Check className="w-2.5 h-2.5 text-blue-400" strokeWidth={2.5} />
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
