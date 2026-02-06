import React, { useState, useCallback, useRef, KeyboardEvent, useMemo } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { ServiceCardProps } from '../../types/services';
import { useLazyImage } from '../../hooks/useLazyImage';

const ServiceCard: React.FC<ServiceCardProps> = React.memo(({
  service,
  index,
  isInView,
  prefersReducedMotion,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const { imgRef, shouldLoad, isLoaded, handleLoad } = useLazyImage({
    rootMargin: '100px',
    threshold: 0.1
  });

  const handleImageLoad = useCallback(() => {
    handleLoad();
  }, [handleLoad]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsHovered(true);
      setTimeout(() => setIsHovered(false), 300);
    }
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setIsHovered(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setIsHovered(false);
  }, []);

  const IconComponent = service.icon;
  const cardId = `service-card-${service.id}`;
  const titleId = `service-title-${service.id}`;
  const descId = `service-desc-${service.id}`;

  // Memoized animation variants for better performance
  const cardVariants = useMemo<Variants>(() => ({
    hidden: { 
      y: 80, 
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier
      }
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }), [index, prefersReducedMotion]);

  const imageVariants = useMemo<Variants>(() => ({
    rest: { 
      scale: 1,
      filter: 'brightness(0.8)'
    },
    hover: { 
      scale: 1.1,
      filter: 'brightness(1)',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }), []);

  const iconVariants = useMemo<Variants>(() => ({
    rest: { 
      rotate: 0,
      scale: 1
    },
    hover: { 
      rotate: 15,
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: [0.68, -0.55, 0.265, 1.55], // Bouncy ease
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  }), []);

  const contentVariants = useMemo<Variants>(() => ({
    rest: { x: 0 },
    hover: { 
      x: 8,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }), []);

  const borderGlowVariants = useMemo<Variants>(() => ({
    rest: { 
      opacity: 0,
      scale: 0.8
    },
    hover: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }), []);

  const tagContainerVariants = useMemo<Variants>(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: (index * 0.15) + 0.3
      }
    }
  }), [index]);

  const tagVariants = useMemo<Variants>(() => ({
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  }), []);

  return (
    <motion.article
      ref={cardRef}
      id={cardId}
      className="group relative overflow-hidden rounded-xl bg-surface border border-white/5 p-1 cursor-pointer"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={prefersReducedMotion ? undefined : "hover"}
      variants={prefersReducedMotion ? undefined : cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      role="article"
      aria-labelledby={titleId}
      aria-describedby={descId}
      tabIndex={0}
      style={{ 
        contain: 'layout style paint',
        contentVisibility: 'auto'
      }}
    >
      {/* Animated border glow effect */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 pointer-events-none"
          initial="rest"
          animate={isHovered || isFocused ? "hover" : "rest"}
          variants={borderGlowVariants}
        />
      )}

      <motion.div 
        className="relative flex flex-col md:flex-row h-full rounded-lg overflow-hidden bg-[#151b26]"
        initial="rest"
        animate={isHovered || isFocused ? "hover" : "rest"}
      >
        {/* Image Section with Lazy Loading */}
        <figure 
          ref={imgRef}
          className="w-full md:w-2/5 aspect-video md:aspect-auto relative overflow-hidden m-0"
        >
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10"></div>
          
          {/* Loading Skeleton */}
          {!isLoaded && (
            <div 
              className="absolute inset-0 bg-white/5 animate-pulse z-20"
              style={{ willChange: 'opacity' }}
              role="status"
              aria-label="Loading service image"
            />
          )}
          
          {/* Image with lazy loading and scale animation */}
          {shouldLoad && (
            <motion.div 
              className="w-full h-full bg-cover bg-center"
              style={{ 
                backgroundImage: `url('${service.image}')`,
                willChange: 'transform, filter'
              }}
              variants={prefersReducedMotion ? undefined : imageVariants}
              onLoad={handleImageLoad}
              role="img"
              aria-label={`Illustration for ${service.title}`}
            />
          )}
        </figure>

        {/* Content Section */}
        <motion.div 
          className="flex flex-1 flex-col justify-between p-6 md:p-8"
          variants={prefersReducedMotion ? undefined : contentVariants}
        >
          <header className="flex flex-col gap-4">
            {/* Icon with rotation animation */}
            <motion.div 
              className="text-primary mb-2"
              variants={prefersReducedMotion ? undefined : iconVariants}
              style={{ willChange: 'transform' }}
              aria-hidden="true"
            >
              <IconComponent size={32} />
            </motion.div>
            
            {/* Title with hover effect */}
            <motion.h3 
              id={titleId}
              className="text-2xl font-bold text-white group-hover:text-primary group-focus-within:text-primary transition-colors duration-300 font-display"
              style={{ willChange: 'color' }}
              layout
            >
              {service.title}
            </motion.h3>
            
            {/* Description */}
            <p 
              id={descId}
              className="text-secondary leading-relaxed"
            >
              {service.description}
            </p>
          </header>

          {/* Tags with stagger animation */}
          <footer className="mt-8">
            <motion.ul 
              className="flex flex-wrap gap-2 list-none p-0 m-0"
              role="list"
              aria-label={`Technologies and skills for ${service.title}`}
              variants={prefersReducedMotion ? undefined : tagContainerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {service.tags.map((tag) => (
                <motion.li
                  key={tag}
                  variants={prefersReducedMotion ? undefined : tagVariants}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                >
                  <span
                    className="inline-block px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-gray-300 border border-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:border-primary/30 group-hover:text-white group-focus-within:bg-white/10 group-focus-within:border-primary/30 group-focus-within:text-white"
                    style={{ willChange: 'transform' }}
                  >
                    {tag}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </footer>
        </motion.div>
      </motion.div>
    </motion.article>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
