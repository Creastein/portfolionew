import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  minimumLoadTime?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoadingComplete,
  minimumLoadTime = 2500
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);
  const [canExit, setCanExit] = useState(false);

  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      console.warn("Loading screen animation took too long, forcing exit...");
      onLoadingComplete();
    }, minimumLoadTime + 4000);
    return () => clearTimeout(safetyTimer);
  }, [minimumLoadTime, onLoadingComplete]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setCanExit(true);
    }, minimumLoadTime);

    return () => clearTimeout(timer);
  }, [minimumLoadTime]);

  useEffect(() => {
    // Prevent double animation in React StrictMode
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const tl = gsap.timeline();

    // Initial state - logo hidden
    gsap.set(logoRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(taglineRef.current, { opacity: 0, y: 10 });
    gsap.set(curtainRef.current, { yPercent: 0, skewY: 0 });
    gsap.set(containerRef.current, { display: 'block' });

    // Logo entrance animation - fade in with scale (hanya sekali)
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2
    });

    // Text in after logo appears
    tl.to(taglineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2");
  }, []);

  useEffect(() => {
    if (canExit && containerRef.current && curtainRef.current && logoRef.current) {
      const exitTl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            gsap.set(containerRef.current, { display: 'none' });
          }
          onLoadingComplete();
        }
      });

      // Exit animation - logo fades out first
      exitTl.to(logoRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.in"
      });

      exitTl.to(taglineRef.current, {
        opacity: 0,
        y: 6,
        duration: 0.3,
        ease: "power2.in"
      }, "-=0.3");

      // Curtain lifts up like fabric - smooth ease
      exitTl.to(curtainRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power3.inOut"
      }, "-=0.2");

      // Subtle wave effect at the bottom of curtain
      exitTl.to(curtainRef.current, {
        skewY: -2,
        duration: 0.3,
        ease: "power1.in"
      }, "-=0.8");

      exitTl.to(curtainRef.current, {
        skewY: 0,
        duration: 0.3,
        ease: "power1.out"
      }, "-=0.5");
    }
  }, [canExit, onLoadingComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-none"
    >
      {/* Curtain/Fabric Layer */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-[#003152] will-change-transform"
        style={{ transformOrigin: 'bottom center' }}
      >
        {/* Subtle texture overlay for fabric feel */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
      </div>

      {/* Logo - Centered (hanya satu kali) */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div ref={logoRef} className="relative">
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white whitespace-nowrap"
            style={{
              fontFamily: '"Mohave", sans-serif',
              fontWeight: 600,
              textShadow: '0 0 60px rgba(0, 49, 82, 0.4)'
            }}
          >
            WELLI
          </h1>

          <p
            ref={taglineRef}
            className="mt-3 text-center text-sm md:text-base tracking-[0.28em] text-white/80"
            style={{ fontFamily: '"Mohave", sans-serif' }}
          >
            LOADING EXPERIENCE
          </p>

          {/* Subtle glow effect */}
          <div className="absolute -inset-10 bg-[#003152]/30 blur-[80px] rounded-full -z-10" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
