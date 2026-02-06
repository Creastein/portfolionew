import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';

const AboutSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const titleY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
    const descY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

    // Split text into characters/words for animation
    useEffect(() => {
        if (titleRef.current) {
            const text = titleRef.current.textContent || '';
            // Split into words, then each word into characters
            const words = text.split(' ');
            titleRef.current.innerHTML = words.map(word => {
                const chars = word.split('').map(char =>
                    `<span class="char" style="display: inline-block; opacity: 0;">${char}</span>`
                ).join('');
                return `<span class="word" style="display: inline-block;">${chars}</span>`;
            }).join(' '); // Use regular space for wrapping
        }

        if (descRef.current) {
            const text = descRef.current.innerHTML;
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = text;
            const textContent = tempDiv.textContent || '';
            const words = textContent.split(' ');

            descRef.current.innerHTML = words.map(word =>
                `<span class="word" style="display: inline-block; opacity: 0;">${word}</span>`
            ).join(' '); // Use regular space for wrapping
        }
    }, []);

    // GSAP animations
    const containerRef = useGSAP<HTMLElement>(() => {
        // Animate "About Me" label
        gsap.fromTo('.about-label',
            { opacity: 0, x: -20 },
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about-label',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate title characters dengan stagger
        gsap.fromTo('.about-title .char',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.02,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about-title',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate description words dengan stagger
        gsap.fromTo('.about-desc .word',
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.02,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about-desc',                  start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, []);

    return (
        <section ref={sectionRef} id="about" className="relative z-10 bg-black py-24 md:py-32 border-t border-white/5 overflow-hidden">
            <div ref={containerRef} className="container mx-auto max-w-[1400px] px-6 sm:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-end">
                    {/* Title Section - Left Column */}
                    <motion.div
                        style={{ y: titleY }}
                        className="will-change-transform relative z-10"
                    >
                        <span className="about-label text-primary font-bold tracking-widest text-xs uppercase mb-4 block">
                            About Me
                        </span>
                        <h2
                            ref={titleRef}
                            className="about-title text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-[1.1] mb-8 lg:mb-0 break-words"
                        >
                            Business Analyst<br /> & Web Developer
                        </h2>
                    </motion.div>

                    {/* Description Section - Right Column */}
                    <motion.div
                        style={{ y: descY }}
                        className="will-change-transform relative z-10 lg:pb-2"
                    >
                        <p
                            ref={descRef}
                            className="about-desc text-lg sm:text-xl md:text-2xl text-secondary leading-relaxed font-light break-words lg:max-w-[600px]"
                        >
                            I'm a Business Analyst with a background in Information Systems. I focus on translating business needs into clear, structured solutions. With hands-on frontend experience, I'm able to validate ideas quickly, communicate effectively with developers, and ensure solutions stay aligned with user and business goals.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
