import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowUpRight,
  ArrowUp,
  Mail,
  MapPin,
  Clock,
  Check,
  Copy,
  Sparkles,
  ShieldCheck,
  Zap,
  ChevronRight,
  Layers,
  MessageSquare,
} from 'lucide-react';
import { CONTACT_INFO, DEFAULT_WHATSAPP_LINK } from '@/constants/contact';
import { trackEmailCopy } from '@/hooks/useAnalytics';
import Toast from '@/components/ui/Toast';

// Refined ultra-light social icons
const TikTokIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const InstagramIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const WhatsAppIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export interface FooterProps {
  /**
   * Whether to display the standalone CTA bento banner.
   * On Home page, this is false by default because ContactSection already contains the contact form.
   * On standalone pages like CaseStudy or Projects, set to true to provide a strong conversion CTA.
   */
  showCta?: boolean;
}

const Footer: React.FC<FooterProps> = ({ showCta = false }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [time, setTime] = useState('');

  // Live Realtime Jakarta / Bali Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (targetId: string) => {
    if (location.pathname !== '/' && location.pathname !== '/work') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email);
      trackEmailCopy(CONTACT_INFO.email);
      setCopied(true);
      setToast({
        message: t('footer.cta.copied', 'Email copied to clipboard!'),
        type: 'success',
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setToast({ message: 'Failed to copy email', type: 'error' });
    }
  };

  const socialLinks = [
    {
      label: 'Instagram',
      href: CONTACT_INFO.socials.instagram,
      icon: <InstagramIcon size={16} />,
      handle: '@wlstudi0',
    },
    {
      label: 'LinkedIn',
      href: CONTACT_INFO.socials.linkedin,
      icon: <LinkedinIcon size={16} />,
      handle: 'in/welli-',
    },
    {
      label: 'GitHub',
      href: CONTACT_INFO.socials.github,
      icon: <GithubIcon size={16} />,
      handle: 'Creastein',
    },
    {
      label: 'TikTok',
      href: CONTACT_INFO.socials.tiktok,
      icon: <TikTokIcon size={16} />,
      handle: '@wlstudi0',
    },
  ];

  const solutionsList = [
    {
      name: t('footer.solutions.directBooking'),
      tag: '0% OTA Fee',
      target: 'services',
    },
    {
      name: t('footer.solutions.calendarSync'),
      tag: 'iCal Sync',
      target: 'services',
    },
    {
      name: t('footer.solutions.customDesign'),
      tag: 'Liquid 4K',
      target: 'services',
    },
    {
      name: t('footer.solutions.seo'),
      tag: 'Rank #1',
      target: 'services',
    },
    {
      name: t('footer.solutions.speed'),
      tag: '< 0.7s CDN',
      target: 'services',
    },
  ];

  const quickNav = [
    { label: t('footer.nav.work'), type: 'scroll', target: 'work' },
    { label: t('footer.nav.services'), type: 'scroll', target: 'services' },
    { label: t('footer.nav.process'), type: 'scroll', target: 'process' },
    { label: t('footer.nav.about'), type: 'scroll', target: 'about' },
    {
      label: t('footer.nav.websiteService'),
      type: 'route',
      href: '/website',
      badge: 'UMKM',
    },
    {
      label: t('footer.nav.allProjects'),
      type: 'route',
      href: '/projects',
      badge: 'Archive',
    },
  ];

  const features = (t('footer.cta.features', { returnObjects: true }) as string[]) || [
    '0% Commission Fees',
    'WhatsApp Direct Booking Flow',
    '14-Day Turnaround Guarantee',
  ];

  return (
    <footer
      key={i18n.language}
      className="relative w-full bg-[#030407] text-white pt-14 pb-10 overflow-hidden border-t border-white/[0.08]"
    >
      {/* Ambient Radial Mesh Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-primary/10 via-blue-600/5 to-transparent blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/[0.03] blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        {/* ========================================================= */}
        {/* 1. STANDALONE CTA BANNER (Rendered conditionally on non-form pages) */}
        {/* ========================================================= */}
        {showCta && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-2.5 bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] mb-20 md:mb-24 overflow-hidden"
          >
            <div className="relative rounded-[calc(2rem-0.5rem)] sm:rounded-[calc(2.5rem-0.625rem)] p-8 sm:p-12 md:p-16 bg-gradient-to-b from-[#090e1c]/95 via-[#05070e]/98 to-[#020306] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[110px] pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs sm:text-sm font-medium tracking-wide mb-8 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>{t('footer.cta.available')}</span>
                </div>

                <h2
                  className="text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-[1.08] mb-6 text-balance"
                  style={{ fontFamily: '"Mohave", sans-serif' }}
                >
                  {t('footer.cta.title')}
                </h2>

                <p className="text-base sm:text-lg text-secondary/90 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
                  {t('footer.cta.subtitle')}
                </p>

                <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
                  {Array.isArray(features) &&
                    features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white/80 backdrop-blur-md"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                        <span>{feat}</span>
                      </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                  <a
                    href={DEFAULT_WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-base transition-all duration-300 shadow-[0_10px_30px_rgba(37,211,102,0.25)] hover:shadow-[0_15px_45px_rgba(37,211,102,0.4)] hover:-translate-y-0.5"
                  >
                    <WhatsAppIcon size={20} className="fill-white" />
                    <span style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }} className="tracking-wide text-lg">
                      {t('footer.cta.button')}
                    </span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white/90 font-medium text-base transition-all duration-300 hover:border-white/30 backdrop-blur-md hover:-translate-y-0.5"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300">{t('footer.cta.copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                        <span>{t('footer.cta.copyEmail')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* 2. MAIN 4-COLUMN ZERO-REDUNDANCY BENTO DIRECTORY          */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14">
          {/* ------------------------------------------------------- */}
          {/* COLUMN 1 (LG: col-span-4): Studio Identity & Live Engine */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-5">
            {/* Studio Logo & Name */}
            <div className="flex items-center gap-3">
              <img
                src="/images/LOGO.png"
                alt="WL-STUDIO"
                className="h-9 w-auto object-contain brightness-110"
              />
              <div className="flex flex-col">
                <span
                  className="text-xl font-bold tracking-tight text-white leading-none"
                  style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
                >
                  WL-STUDIO
                </span>
                <span className="text-[11px] uppercase tracking-widest text-primary font-medium mt-0.5">
                  Direct Booking Architecture
                </span>
              </div>
            </div>

            {/* Studio Bio */}
            <p className="text-sm text-secondary/90 leading-relaxed pr-2">
              {t('footer.brand.desc')}
            </p>

            {/* Realtime Live Timezone Clock Hardware Card */}
            <div className="rounded-2xl p-3.5 bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-white/70">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span className="font-medium">Studio Time (WIB GMT+7)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[11px] text-emerald-400 font-medium">Live</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between pt-0.5">
                <span className="text-2xl font-mono tracking-widest text-white font-semibold">
                  {time || '12:00:00'}
                </span>
                <span className="text-[11px] text-white/40 tracking-wider">Jakarta & Bali</span>
              </div>
            </div>

            {/* Hardware Trust Badges */}
            <div className="flex flex-wrap gap-2 pt-0.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.02] border border-white/[0.08] text-[11px] text-white/75 font-medium">
                <Sparkles className="w-3 h-3 text-primary" />
                {t('footer.brand.badges.noTemplate')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.02] border border-white/[0.08] text-[11px] text-white/75 font-medium">
                <Layers className="w-3 h-3 text-emerald-400" />
                {t('footer.brand.badges.ical')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.02] border border-white/[0.08] text-[11px] text-white/75 font-medium">
                <Zap className="w-3 h-3 text-amber-400" />
                {t('footer.brand.badges.speed')}
              </span>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* COLUMN 2 (LG: col-span-3): Hospitality Solutions        */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-4">
            <h3
              className="text-xs uppercase tracking-widest text-primary font-semibold"
              style={{ fontFamily: '"Mohave", sans-serif', letterSpacing: '0.15em' }}
            >
              {t('footer.solutions.title')}
            </h3>

            <ul className="space-y-3 pt-1">
              {solutionsList.map((sol, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(sol.target)}
                    className="group flex items-center justify-between w-full text-left py-1 text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                      <ChevronRight className="w-3.5 h-3.5 text-primary/60 group-hover:text-primary transition-colors" />
                      <span>{sol.name}</span>
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-white/50 group-hover:border-primary/40 group-hover:text-primary transition-all">
                      {sol.tag}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ------------------------------------------------------- */}
          {/* COLUMN 3 (LG: col-span-2): Direct Navigation & Portals */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-2 space-y-4">
            <h3
              className="text-xs uppercase tracking-widest text-primary font-semibold"
              style={{ fontFamily: '"Mohave", sans-serif', letterSpacing: '0.15em' }}
            >
              {t('footer.nav.title')}
            </h3>

            <ul className="space-y-3 pt-1">
              {quickNav.map((item, index) => (
                <li key={index}>
                  {item.type === 'scroll' ? (
                    <button
                      type="button"
                      onClick={() => handleNavClick(item.target!)}
                      className="group flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors py-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary group-hover:scale-125 transition-all" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {item.label}
                      </span>
                    </button>
                  ) : (
                    <Link
                      to={item.href!}
                      className="group flex items-center justify-between text-sm text-white/70 hover:text-white transition-colors py-1"
                    >
                      <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-all" />
                        <span>{item.label}</span>
                      </span>
                      {item.badge && (
                        <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ------------------------------------------------------- */}
          {/* COLUMN 4 (LG: col-span-3): Connect & Direct Channels    */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-4">
            <h3
              className="text-xs uppercase tracking-widest text-primary font-semibold"
              style={{ fontFamily: '"Mohave", sans-serif', letterSpacing: '0.15em' }}
            >
              {t('footer.contact.title')}
            </h3>

            <div className="space-y-3 pt-1">
              {/* WhatsApp Quick Chat */}
              <a
                href={DEFAULT_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-emerald-500/10 border border-white/[0.06] hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/25 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] text-white/40">{t('footer.contact.whatsapp')}</div>
                    <div className="text-xs font-mono text-white/90 group-hover:text-emerald-300 transition-colors">
                      {CONTACT_INFO.whatsappDisplay}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Email Direct Copy Trigger */}
              <div
                onClick={copyEmail}
                role="button"
                tabIndex={0}
                className="group flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-primary/10 border border-white/[0.06] hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary group-hover:bg-primary/25 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] text-white/40">{t('footer.contact.email')}</div>
                    <div className="text-xs font-mono text-white/90 group-hover:text-primary transition-colors">
                      {CONTACT_INFO.email}
                    </div>
                  </div>
                </div>
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                )}
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-xs text-white/70">Tangerang, Jakarta & Bali</span>
              </div>

              {/* Social Channels Row */}
              <div className="pt-1 flex items-center gap-2">
                {socialLinks.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    title={`${item.label} (${item.handle})`}
                    className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/10 hover:border-primary/60 hover:bg-primary/15 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. ATMOSPHERIC WATERMARK BRANDMARK                        */}
        {/* ========================================================= */}
        <div className="relative w-full py-6 sm:py-8 border-t border-white/[0.06] overflow-hidden flex items-center justify-center">
          <div
            className="text-[12vw] font-black tracking-tighter text-white/[0.02] select-none pointer-events-none text-center whitespace-nowrap leading-none"
            style={{
              fontFamily: '"Mohave", sans-serif',
              WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
            }}
          >
            WL-STUDIO
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white/30">
              Direct Booking Architecture • Luxury Hospitality
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. EXECUTIVE BOTTOM BAR & BACK-TO-TOP                     */}
        {/* ========================================================= */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
            <span>{t('footer.bottom.rights')}</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="text-white/40">{t('footer.bottom.craftedWith')}</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            <span className="text-xs font-medium">{t('footer.bottom.backToTop')}</span>
            <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <ArrowUp className="w-2.5 h-2.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Toast Feedback */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </footer>
  );
};

export default Footer;
