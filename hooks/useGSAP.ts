import { useEffect, useRef, MutableRefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook for GSAP animations with automatic cleanup
 * @param callback - Function containing GSAP animations
 * @param deps - Dependencies array (like useEffect)
 * @returns ref - Reference to attach to the container element
 */
export const useGSAP = <T extends HTMLElement = HTMLDivElement>(
    callback: (ctx: gsap.Context) => void,
    deps: any[] = []
): MutableRefObject<T | null> => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const ctx = gsap.context(callback, ref);

        // Cleanup on unmount
        return () => ctx.revert();
    }, deps);

    return ref;
};

/**
 * Utility function to create reveal animation
 */
export const createRevealAnimation = (
    selector: string,
    options: {
        y?: number;
        opacity?: number;
        duration?: number;
        stagger?: number;
        start?: string;
        end?: string;
    } = {}
) => {
    const {
        y = 60,
        opacity = 0,
        duration = 1,
        stagger = 0,
        start = 'top 80%',
        end = 'top 20%'
    } = options;

    return gsap.from(selector, {
        y,
        opacity,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: selector,
            start,
            end,
            toggleActions: 'play none none reverse'
        }
    });
};

/**
 * Utility function to create parallax animation
 */
export const createParallaxAnimation = (
    selector: string,
    options: {
        y?: string;
        scale?: number;
        start?: string;
        end?: string;
        scrub?: boolean | number;
    } = {}
) => {
    const {
        y = '30%',
        scale,
        start = 'top bottom',
        end = 'bottom top',
        scrub = true
    } = options;

    const animationProps: any = { y, ease: 'none' };
    if (scale) animationProps.scale = scale;

    return gsap.to(selector, {
        ...animationProps,
        scrollTrigger: {
            trigger: selector,
            start,
            end,
            scrub
        }
    });
};

export default useGSAP;
