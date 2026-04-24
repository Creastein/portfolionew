import React, { useRef, Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import ServiceCardSkeleton from './ServiceCardSkeleton';
import ServiceCardErrorBoundary from './ServiceCardErrorBoundary';
import { servicesData } from '@/constants/services';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import SectionHeader from '@/components/ui/SectionHeader';
import { useTranslation } from 'react-i18next';

const ServicesSection: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);

  const prefersReducedMotion = useReducedMotion();

  // Preload service images for faster loading
  useEffect(() => {
    servicesData.forEach((service) => {
      const img = new Image();
      img.src = service.image;
    });
  }, []);

  return (
    <motion.section
      ref={containerRef}
      id="services"
      className="relative z-40 bg-[#080a0f] pb-24 md:pb-32 pt-0 border-none overflow-hidden text-white"
      aria-labelledby="services-heading"
      aria-describedby="services-description"
    >
      {/* Skip Link for Keyboard Navigation */}
      <a
        href="#services-grid"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
      >
        Skip to services list
      </a>

      {/* NEW HEADER */}
      <SectionHeader title={t('services.header.title')} subtitle={t('services.header.subtitle')} className="mb-12" />

      <div className="container mx-auto max-w-[1400px] px-6 sm:px-12 relative">

        {/* Services Grid — each card animates independently via whileInView */}
        <div
          id="services-grid"
          className="services-grid grid grid-cols-1 gap-6"
          role="feed"
          aria-label="Services list. Use Tab to navigate between services."
        >
          {servicesData.map((service, index) => (
            <React.Fragment key={service.id}>
              <ServiceCardErrorBoundary
                fallback={<ServiceCardSkeleton index={index} />}
              >
                <Suspense fallback={<ServiceCardSkeleton index={index} />}>
                  <ServiceCard
                    service={service}
                    index={index}
                    isInView={true}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </Suspense>
              </ServiceCardErrorBoundary>
            </React.Fragment>
          ))}
        </div>

        {/* Live region for dynamic announcements */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {`${servicesData.length} services loaded`}
        </div>

      </div>
    </motion.section>
  );
};

export default ServicesSection;
