import React from "react";
import { useTranslation } from "react-i18next";

// --- CLIENT DATA ---
// Replace `logo` with actual logo paths when available (e.g., "/images/logos/floating-paradise.svg")
// For now, using text wordmarks as placeholders
const CLIENTS = [
  { name: "Floating Paradise", logo: null },
  { name: "The Secret Karimunjawa", logo: null },
  { name: "HomeBase Lombok", logo: null },
  { name: "The Subahu Villa", logo: null },
  { name: "Danu House Ubud", logo: null },
  { name: "Datoya Guest House", logo: null },
  { name: "HomyHome Bali Tour", logo: null },
];

const TrustBar: React.FC = () => {
  const { t } = useTranslation();

  // Triple the list for seamless infinite marquee
  const marqueeItems = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className="relative w-full bg-zinc-950 border-t border-white/[0.04] py-10 overflow-hidden">
      {/* Label */}
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-8 font-['Space_Grotesk']">
        {t('hero.trustedBy')}
      </p>

      {/* Marquee Track */}
      <div
        className="relative flex overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="animate-marquee flex items-center gap-16 whitespace-nowrap">
          {marqueeItems.map((client, i) => (
            <div
              key={i}
              className="flex items-center gap-3 opacity-30 transition-all duration-500 hover:opacity-100 cursor-default"
            >
              {/* Logo image slot — falls back to text wordmark */}
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-7 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500"
                />
              ) : (
                <span className="text-lg font-bold text-white tracking-tight font-['Space_Grotesk'] select-none">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scoped animation */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TrustBar;
