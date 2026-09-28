import React from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Check, ArrowRight, Clock } from "lucide-react";

// --- ANIMATION VARIANTS ---
const tileVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
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

// Staggered cascade for Why Us bullet items
const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.25,
    },
  },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// --- TILE WRAPPER (Double-Bezel Hardware Tray Pattern from high-end-visual-design) ---
interface TileProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
  accent?: boolean;
}

const BentoTile: React.FC<TileProps> = ({ children, className = "", index = 0, accent = false }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -3, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      variants={tileVariants}
      className={`group relative rounded-[1.75rem] p-1.5 transition-all duration-500 cursor-default ${className}`}
      style={{
        background: accent
          ? "linear-gradient(135deg, rgba(19,91,236,0.18) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.01) 100%)"
          : "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)",
        boxShadow: accent
          ? "0 0 60px -25px rgba(19,91,236,0.18), inset 0 1px 0 0 rgba(255,255,255,0.1)"
          : "inset 0 1px 0 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Outer subtle border ring */}
      <div className="absolute inset-0 rounded-[1.75rem] border border-white/[0.06] transition-colors duration-500 group-hover:border-white/[0.16] pointer-events-none" />

      {/* Concentric Machined Inner Core */}
      <div
        className="relative rounded-[calc(1.75rem-0.375rem)] bg-[#090909] h-full overflow-hidden border border-white/[0.04] transition-all duration-500 group-hover:bg-[#0c0c0c] group-hover:border-white/[0.08]"
        style={{
          boxShadow: "inset 0 1px 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Subtle Ambient Radial Lighting for Accent Tile */}
        {accent && (
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/[0.08] blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-70" />
        )}

        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
const AboutSection: React.FC = () => {
  const { t, i18n } = useTranslation();

  const approachItems = t("about.approach.items", { returnObjects: true }) as string[];

  return (
    <section
      key={i18n.language}
      id="about"
      className="relative z-30 w-full py-28 md:py-36 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 70% 50% at 20% -10%, rgba(19,91,236,0.06) 0%, transparent 50%),
          radial-gradient(ellipse 50% 40% at 90% 110%, rgba(99,102,241,0.04) 0%, transparent 50%),
          #050505
        `,
      }}
    >
      {/* --- GRAIN TEXTURE OVERLAY --- */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* --- TOP DIVIDER --- */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="relative z-10 container mx-auto max-w-[1280px] px-6 sm:px-10">

        {/* --- SECTION HEADER (CENTERED) --- */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-500 uppercase font-medium">
              {t("about.label")}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-[2.65rem] font-bold text-white tracking-tight leading-[1.12] font-['Space_Grotesk'] text-center">
            {t("about.title")}
          </h2>
        </div>

        {/* === BENTO GRID — 3 High-Craft Tiles === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">

          {/* ─── TILE 1: MANIFESTO (Large — 7 cols) ─── */}
          <BentoTile className="lg:col-span-7" index={0} accent>
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between h-full min-h-[320px] lg:min-h-[380px]">
              <div>
                {/* Studio badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-[10px] font-mono tracking-[0.18em] text-blue-400 uppercase font-semibold">
                    WL-STUDIO
                  </span>
                </div>

                {/* Editorial paragraph */}
                <p className="text-lg sm:text-xl lg:text-[1.35rem] text-zinc-200 leading-relaxed font-light text-pretty">
                  {t("about.manifesto")}
                </p>
              </div>

              {/* Bottom Tactile Island Button */}
              <div className="mt-10 pt-6 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                  className="group/btn inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-xs font-mono tracking-wider uppercase text-zinc-300 hover:text-white transition-all duration-300"
                >
                  <span>{t("about.cta")}</span>
                  <div className="w-5 h-5 rounded-full bg-white/[0.08] flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:bg-primary/20">
                    <ArrowRight className="w-3 h-3 text-blue-400" strokeWidth={2} />
                  </div>
                </button>

                <span className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase hidden sm:block">
                  Direct Guest Architecture
                </span>
              </div>
            </div>
          </BentoTile>

          {/* ─── RIGHT COLUMN: Approach + Metric stacked (5 cols) ─── */}
          <div className="lg:col-span-5 flex flex-col gap-5 lg:gap-6">

            {/* ─── TILE 2: WHY US (Approach with Staggered Cascade) ─── */}
            <BentoTile className="flex-1" index={1}>
              <div className="p-8 sm:p-9 h-full flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase block mb-6 font-semibold">
                    {t("about.approach.label")}
                  </span>

                  <motion.div
                    variants={listContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-4"
                  >
                    {approachItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        variants={listItemVariants}
                        className="flex items-start gap-3.5"
                      >
                        <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-blue-400" strokeWidth={2.5} />
                        </div>
                        <span className="text-sm text-zinc-300 leading-relaxed font-light text-left">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </BentoTile>

            {/* ─── TILE 3: KEY METRIC (with Masked Number Reveal) ─── */}
            <BentoTile index={2}>
              <div className="p-7 sm:p-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    {/* Masked reveal container for metric */}
                    <div className="overflow-hidden py-0.5">
                      <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-baseline gap-1.5"
                      >
                        <span className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tighter leading-none">
                          {t("about.metric.value")}
                        </span>
                        <span className="text-base font-medium text-zinc-400 tracking-tight font-mono">
                          {t("about.metric.unit")}
                        </span>
                      </motion.div>
                    </div>
                    <span className="text-xs text-zinc-500 mt-1 block font-light">
                      {t("about.metric.label")}
                    </span>
                  </div>
                </div>

                {/* Live queue status pill */}
                <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-medium">
                    {t("about.metric.status")}
                  </span>
                </div>
              </div>
            </BentoTile>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
