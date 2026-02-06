import React, { useRef, Suspense, useMemo } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import ServiceCard from './ServiceCard';
import ServiceCardSkeleton from './ServiceCardSkeleton';
import ServiceCardErrorBoundary from './ServiceCardErrorBoundary';
import { servicesData } from '../../data/services';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useInView } from '../../hooks/useInView';

const ServicesSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const isHeaderInView = useInView(headerRef, { threshold: 0.3 });
  const isGridInView = useInView(gridRef, { threshold: 0.1 });

  // Scroll-based parallax for header
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Memoized animation variants
  const headerVariants = useMemo<Variants>(() => ({
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  }), [prefersReducedMotion]);

  const titleVariants = useMemo<Variants>(() => ({
    hidden: {
      y: 30,
      opacity: 0,
      filter: 'blur(10px)'
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }), [prefersReducedMotion]);

  const lineVariants = useMemo<Variants>(() => ({
    hidden: {
      scaleX: 0,
      originX: 0
    },
    visible: {
      scaleX: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3
      }
    }
  }), [prefersReducedMotion]);

  const containerVariants = useMemo<Variants>(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }), []);

  return (
    <motion.section
      ref={containerRef}
      id="services"
      className="relative z-10 bg-[#080a0f] py-24 md:py-32 border-t border-white/5 overflow-hidden"
      aria-labelledby="services-heading"
      aria-describedby="services-description"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Parallax Background Element */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ y: backgroundY }}
        >
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </motion.div>
      )}

      {/* Skip Link for Keyboard Navigation */}
      <a
        href="#services-grid"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
      >
        Skip to services list
      </a>

      <div className="container mx-auto max-w-[1400px] px-6 sm:px-12 relative">
        {/* Section Header with Scroll Animation */}
        <motion.header
          ref={headerRef}
          className="services-header mb-16 pb-6 relative"
          variants={prefersReducedMotion ? undefined : headerVariants}
          style={prefersReducedMotion ? undefined : {
            y: headerY,
            opacity: headerOpacity
          }}
        >
          <div className="flex items-center justify-between">
            <motion.div variants={prefersReducedMotion ? undefined : titleVariants}>
              <h2
                id="services-heading"
                className="text-2xl font-medium tracking-tight font-display"
              >
                Services
              </h2>
              <p
                id="services-description"
                className="sr-only"
              >
                A list of professional services offered, including Business Analysis,
                Frontend Development, and UI Implementation. Use Tab key to navigate
                through each service card.
              </p>
            </motion.div>
            <motion.span
              className="text-sm text-secondary"
              aria-hidden="true"
              variants={prefersReducedMotion ? undefined : titleVariants}
            >
              (03)
            </motion.span>
          </div>

          {/* Animated Underline */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-white/10 via-primary/50 to-white/10"
            variants={prefersReducedMotion ? undefined : lineVariants}
          />
        </motion.header>

        {/* Services Grid with Stagger Animation */}
        <motion.div
          ref={gridRef}
          id="services-grid"
          className="services-grid grid grid-cols-1 gap-6"
          role="feed"
          aria-busy={!isGridInView}
          aria-label="Services list. Use Tab to navigate between services."
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          animate={isGridInView ? "visible" : "hidden"}
        >
          {servicesData.map((service, index) => (
            <ServiceCardErrorBoundary
              fallback={<ServiceCardSkeleton index={index} />}
            >
              <Suspense fallback={<ServiceCardSkeleton index={index} />}>
                <ServiceCard
                  service={service}
                  index={index}
                  isInView={isGridInView}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </Suspense>
            </ServiceCardErrorBoundary>
          ))}
        </motion.div>

        {/* Live region for dynamic announcements */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {isGridInView ? `${servicesData.length} services loaded` : 'Loading services...'}
        </div>

      </div>
    </motion.section>
  );
};

export default ServicesSection;
