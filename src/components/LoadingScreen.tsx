import React, { useLayoutEffect, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  minimumLoadTime?: number;
}

// Isomorphic layout effect to run synchronously before paint without SSR warning
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoadingComplete,
  minimumLoadTime = 2000,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Safe GSAP Context for React 18/19
    const ctx = gsap.context(() => {
      // 1. Ensure initial states are locked before first paint
      gsap.set(logoRef.current, { opacity: 0, scale: 0.92, y: 15 });
      gsap.set(taglineRef.current, { opacity: 0, y: 10 });
      gsap.set(curtainRef.current, { yPercent: 0, skewY: 0 });

      // 2. Master Curtain Timeline
      const holdDuration = Math.max(1.5, minimumLoadTime / 1000);
      const masterTl = gsap.timeline({
        onComplete: () => {
          onLoadingComplete();
        },
      });

      // Phase 1: Logo & Tagline Entrance (Smooth Fade In)
      masterTl
        .to(logoRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.85,
          ease: 'power2.out',
          delay: 0.1,
        })
        .to(
          taglineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
          },
          '-=0.3'
        );

      // Phase 2: Logo Fades Out after explicit hold time
      masterTl
        .to(
          logoRef.current,
          {
            opacity: 0,
            scale: 0.96,
            y: -12,
            duration: 0.4,
            ease: 'power2.in',
          },
          `+=${holdDuration}`
        )
        .to(
          taglineRef.current,
          {
            opacity: 0,
            y: -8,
            duration: 0.3,
            ease: 'power2.in',
          },
          '-=0.3'
        );

      // Phase 3: Dramatic Curtain Lift Effect (Fabric pulled upward)
      masterTl
        .to(
          curtainRef.current,
          {
            yPercent: -100,
            duration: 1.3,
            ease: 'power3.inOut',
          },
          '-=0.1'
        )
        .to(
          curtainRef.current,
          {
            skewY: -2.5,
            duration: 0.35,
            ease: 'power2.in',
          },
          '-=1.1'
        )
        .to(
          curtainRef.current,
          {
            skewY: 1,
            duration: 0.3,
            ease: 'power1.out',
          },
          '-=0.75'
        )
        .to(
          curtainRef.current,
          {
            skewY: 0,
            duration: 0.3,
            ease: 'power1.out',
          },
          '-=0.45'
        );
    }, container);

    return () => {
      ctx.revert();
    };
  }, [minimumLoadTime, onLoadingComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-auto select-none overflow-hidden"
    >
      {/* Curtain Fabric Layer (Deep Prussian Blue with Rich Ambient Glow) */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-[#002842] will-change-transform shadow-[0_30px_90px_rgba(0,0,0,0.95)] border-b border-primary/40"
        style={{ transformOrigin: 'bottom center' }}
      >
        {/* Subtle cloth noise texture */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Ambient Deep Radial Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-[#001828]/40 to-[#000e18]/90" />
      </div>

      {/* Centered Brand Intro */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div
          ref={logoRef}
          className="relative text-center px-6"
          style={{ opacity: 0, transform: 'translateY(15px) scale(0.92)' }}
        >
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white whitespace-nowrap"
            style={{
              fontFamily: '"Mohave", sans-serif',
              fontWeight: 600,
              textShadow: '0 0 70px rgba(19, 91, 236, 0.5), 0 0 30px rgba(0, 49, 82, 0.7)',
            }}
          >
            WL-STUDIO
          </h1>

          <p
            ref={taglineRef}
            className="mt-3 sm:mt-4 text-center text-xs sm:text-sm md:text-base tracking-[0.32em] text-white/85 uppercase font-medium"
            style={{ fontFamily: '"Mohave", sans-serif', opacity: 0, transform: 'translateY(10px)' }}
          >
            Direct Booking Architecture
          </p>

          {/* Ambient Blue Backlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[200px] bg-primary/30 blur-[90px] rounded-full -z-10 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
