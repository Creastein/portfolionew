import React from "react";
import { useTranslation } from "react-i18next";
import { 
  ArrowRight, 
  Target, 
  Crown, 
  MessageCircle,
} from "lucide-react";



// --- SUB-COMPONENTS ---
const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 cursor-default">
    <span className="text-xl font-bold text-white sm:text-2xl font-['Space_Grotesk'] tracking-tight">{value}</span>
    <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold sm:text-xs">{label}</span>
  </div>
);

interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  isLoading?: boolean;
}

// --- MAIN COMPONENT ---
const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(({ isLoading = false, className = "", ...props }, ref) => {
  const { t } = useTranslation();
  const animClass = isLoading ? "opacity-0" : "animate-fade-in";
  return (
    <section
      ref={ref}
      id="home"
      className={`relative w-full min-h-[100dvh] flex items-center bg-zinc-950 text-white overflow-hidden ${className}`}
      {...props}
    >
      {/* 
        SCOPED ANIMATIONS 
      */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-fade-in {
          animation: fadeSlideIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
        .delay-100 { animation-delay: 0.15s; }
        .delay-200 { animation-delay: 0.3s; }
        .delay-300 { animation-delay: 0.45s; }
        .delay-400 { animation-delay: 0.6s; }
        .delay-500 { animation-delay: 0.75s; }
        .glass-clear {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(40px) saturate(1.8);
          -webkit-backdrop-filter: blur(40px) saturate(1.8);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow:
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 0 rgba(255, 255, 255, 0.05),
            0 8px 32px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      {/* Background Image with Gradient Mask */}
      <div 
        className="absolute inset-0 z-0 bg-[url(/images/emerald_indigo_mesh_background.png)] bg-cover bg-center opacity-60"
        style={{
          maskImage: "linear-gradient(180deg, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, transparent, black 10%, black 90%, transparent)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-16 pt-24 pb-12 md:pt-32 md:pb-16 lg:pt-36">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          
          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Badge */}
            <div className={`${animClass} delay-100`}>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 p-1.5 pr-4 backdrop-blur-md transition-all duration-300 hover:bg-white/10">
                <span className="flex h-6 items-center justify-center rounded-full bg-white/10 px-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">
                  {t('hero.badgeLeft')}
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                  {t('hero.badgeRight')}
                </span>
              </div>
            </div>

            {/* Heading */}
            <h1 
              className={`${animClass} delay-200 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95] font-['Space_Grotesk']`}
              style={{
                maskImage: "linear-gradient(180deg, black 0%, black 85%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(180deg, black 0%, black 85%, transparent 100%)"
              }}
            >
              {t('hero.title1')}<br />
              <span className="bg-gradient-to-br from-white via-zinc-200 to-[#ffcd75] bg-clip-text text-transparent">
                {t('hero.title2')}
              </span>
            </h1>

            {/* Description */}
            <p className={`${animClass} delay-300 max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed font-sans`}>
              {t('hero.description')}
            </p>

            {/* CTA Buttons */}
            <div className={`${animClass} delay-400 flex flex-col sm:flex-row gap-4`}>
              <button 
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-zinc-950 transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98] shadow-[0_4px_24px_rgba(255,255,255,0.15)]"
              >
                {t('hero.ctaPrimary')}
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-950 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </button>
              
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-300 group-hover:scale-110">
                  <MessageCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                {t('hero.ctaSecondary')}
              </button>
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Stats Card — Clear Glass */}
            <div className={`${animClass} delay-500 glass-clear rounded-[1.5rem] p-6 overflow-hidden relative`}>
              {/* Subtle refraction glow */}
              <div className="absolute top-0 right-0 -mr-12 -mt-12 h-48 w-48 rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.08]">
                    <Target className="h-5 w-5 text-white/90" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold tracking-tight text-white font-['Space_Grotesk']">12+</div>
                    <div className="text-sm text-white/50">{t('hero.projectsDelivered')}</div>
                  </div>
                </div>

                {/* Progress Bar Section */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">{t('hero.clientSatisfaction')}</span>
                    <span className="text-white font-medium">98%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-white/80 to-white/40" />
                  </div>
                </div>

                <div className="h-px w-full bg-white/[0.08] mb-6" />

                {/* Mini Stats Grid */}
                <div className="grid grid-cols-3 gap-4 text-center items-center">
                  <StatItem value="95+" label={t('hero.pagespeed')} />
                  <div className="w-px h-8 bg-white/[0.08] mx-auto" />
                  <StatItem value="15-25%" label={t('hero.otaSaved')} />
                  <div className="w-px h-8 bg-white/[0.08] mx-auto" />
                  <StatItem value="100%" label={t('hero.quality')} />
                </div>

                {/* Tag Pills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[10px] font-bold tracking-wider text-white/70">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    ACTIVE
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[10px] font-bold tracking-wider text-white/70">
                    <Crown className="w-3 h-3 text-yellow-500" strokeWidth={1.5} />
                    PREMIUM
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
