import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

interface ParallaxOptions {
  offset?: ["start end" | "end start" | "center center", "start end" | "end start" | "center center"];
  yOffset?: [number, number];
  opacityOffset?: [number, number];
  scaleOffset?: [number, number];
}

/**
 * Custom hook for creating parallax scroll effects
 * @param ref - Reference to the target element
 * @param options - Configuration options for the parallax effect
 * @returns Object containing motion values for y, opacity, and scale
 */
export const useParallax = (
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
): {
  y: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
} => {
  const {
    offset = ["start end", "end start"] as ["start end", "end start"],
    yOffset = [100, -100],
    opacityOffset = [0, 1],
    scaleOffset = [0.95, 1]
  } = options;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any
  });

  const y = useTransform(scrollYProgress, [0, 1], yOffset);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [opacityOffset[0], 1, opacityOffset[1]]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleOffset[0], 1, scaleOffset[1]]);

  return { y, opacity, scale };
};

/**
 * Hook for creating a simple vertical parallax effect
 */
export const useVerticalParallax = (
  ref: RefObject<HTMLElement>,
  distance: number = 100
): MotionValue<number> => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return useTransform(scrollYProgress, [0, 1], [distance, -distance]);
};

/**
 * Hook for creating a fade-in effect on scroll
 */
export const useFadeInOnScroll = (
  ref: RefObject<HTMLElement>
): MotionValue<number> => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  return useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
};
