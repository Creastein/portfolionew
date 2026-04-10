import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@/hooks/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
    title: string;
    subtitle: string;
    className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, className = '' }) => {
    // useGSAP creates the ref and handles cleanup
    const containerRef = useGSAP<HTMLDivElement>(() => {
        // Text Scramble Animation
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        // Scope selection to the container
        const scrambleChars = containerRef.current?.querySelectorAll('.scramble-char');
        const finalText = title.toUpperCase(); // Ensure uppercase matching design

        if (scrambleChars) {
            scrambleChars.forEach((char, index) => {
                const finalChar = finalText[index] || '';
                let iterations = 0;
                const maxIterations = 15;

                // Only animate if char exists (safe guard)
                if (!char) return;

                gsap.fromTo(char,
                    {
                        opacity: 0,
                        rotateX: 90,
                        y: 50,
                        scale: 0.5
                    },
                    {
                        opacity: 1,
                        rotateX: 0,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: containerRef.current, // Trigger when container enters view
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                            onEnter: () => {
                                // Scramble effect
                                const interval = setInterval(() => {
                                    if (iterations >= maxIterations) {
                                        char.textContent = finalChar;
                                        clearInterval(interval);
                                        return;
                                    }
                                    char.textContent = chars[Math.floor(Math.random() * chars.length)];
                                    iterations++;
                                }, 50);
                            }
                        }
                    }
                );
            });
        }

        // Animate subtitle (scoped to this container)
        const subtitleEl = containerRef.current?.querySelector('.header-subtitle');
        if (subtitleEl) {
            gsap.fromTo(subtitleEl,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }

    }, [title]);

    return (
        <div
            ref={containerRef}
            className={`relative border-y border-white/10 py-8 md:py-12 overflow-hidden ${className}`}
        >
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(19, 91, 236, 0.3) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/40 rounded-full"
                        initial={{
                            x: Math.random() * 100 + '%',
                            y: Math.random() * 100 + '%',
                            opacity: 0
                        }}
                        animate={{
                            y: [null, '-100%'],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Main Header Content */}
            <div className="container mx-auto max-w-[1400px] px-6 sm:px-12 relative z-10">
                <div className="flex flex-col items-center">

                    {/* Main Scramble Text */}
                    <div className="relative perspective-1000">
                        <h2
                            className="text-6xl sm:text-7xl md:text-8xl tracking-tighter text-center"
                            style={{
                                fontFamily: '"Mohave", sans-serif',
                                fontWeight: 600,
                                perspective: '1000px',
                                lineHeight: 1.1
                            }}
                        >
                            {title.split('').map((char, i) => (
                                <span key={i} className="scramble-char inline-block min-w-[0.5em]">{char}</span>
                            ))}
                        </h2>

                        {/* Gradient Stroke Text Behind */}
                        <h2
                            className="absolute inset-0 text-6xl sm:text-7xl md:text-8xl tracking-tighter text-center opacity-30 blur-sm select-none pointer-events-none"
                            style={{
                                fontFamily: '"Mohave", sans-serif',
                                fontWeight: 600,
                                WebkitTextStroke: '2px rgba(19, 91, 236, 0.5)',
                                WebkitTextFillColor: 'transparent',
                                lineHeight: 1.1,
                                top: '4px', // slight offset for depth
                                left: '4px'
                            }}
                        >
                            {title}
                        </h2>
                    </div>

                    {/* Subtitle with Typewriter Effect */}
                    <motion.div
                        className="header-subtitle mt-6 text-center"
                    >
                        <span
                            className="text-sm md:text-base text-primary"
                            style={{ fontFamily: '"Rock Salt", cursive' }}
                        >
                            {subtitle}
                        </span>
                    </motion.div>

                    {/* Floating Decorative Elements (Only on large screens) */}
                    <motion.div
                        className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none"
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="w-20 h-20 border border-primary/20 rounded-full flex items-center justify-center">
                            <div className="w-12 h-12 border border-primary/40 rounded-full" />
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none"
                        animate={{
                            y: [0, 20, 0],
                            rotate: [0, -5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >
                        <div className="w-24 h-24 border border-white/10 rotate-45" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SectionHeader;
