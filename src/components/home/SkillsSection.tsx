import React from 'react';
import { skillsWithLogos, SkillItem } from '@/components/data/skillsWithLogos';
import { useGSAP } from '@/hooks/useGSAP';
import SectionHeader from '@/components/ui/SectionHeader';
import gsap from 'gsap';

const SkillLogo: React.FC<{ item: SkillItem, index: number }> = ({ item, index }) => {
    const itemRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!itemRef.current) return;
        const { left, top, width, height } = itemRef.current.getBoundingClientRect();
        // Magnetic calculation: Move element towards cursor relative to its center
        const x = (e.clientX - left - width / 2) * 0.3; // Strength of attraction
        const y = (e.clientY - top - height / 2) * 0.3;

        gsap.to(itemRef.current, {
            x: x,
            y: y,
            duration: 0.3,
            ease: 'power2.out'
        });
    };

    const handleMouseLeave = () => {
        if (!itemRef.current) return;
        // Spring back to center
        gsap.to(itemRef.current, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)'
        });
    };

    return (
        <div
            ref={itemRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="skill-logo-item relative group flex items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 hover:z-50 transition-colors duration-300"
        >
            {/* Icon */}
            <div
                className="text-3xl md:text-4xl transition-colors duration-300"
                style={{ color: item.color }}
            >
                <item.icon />
            </div>

            {/* Tooltip Name Reveal */}
            <div className="absolute -bottom-2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:-bottom-[-8px] transition-all duration-300 z-20 whitespace-nowrap pointer-events-none">
                <span className="text-sm font-medium text-white bg-surface border border-white/10 px-2 py-1 rounded shadow-lg">
                    {item.name}
                </span>
            </div>
        </div>
    );
};

const SkillCategoryCard: React.FC<{ category: string, icon: React.ElementType, items: SkillItem[], index: number }> = ({ category, icon: Icon, items, index }) => (
    <div className="skill-category-card p-6 md:p-8 rounded-2xl bg-surface border border-white/5 hover:border-white/10 transition-colors">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-white font-display">{category}</h3>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 md:gap-4">
            {items.map((item, idx) => (
                <SkillLogo key={item.name} item={item} index={idx} />
            ))}
        </div>
    </div>
);

const SkillsSection: React.FC = () => {
    const containerRef = useGSAP<HTMLElement>(() => {
        // Stagger animate category cards
        gsap.fromTo('.skill-category-card',
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.skills-grid',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Pop-In Entrance for Logos
        gsap.fromTo('.skill-logo-item',
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                stagger: {
                    amount: 1,
                    grid: 'auto',
                    from: 'start'
                },
                ease: 'back.out(1.5)',
                scrollTrigger: {
                    trigger: '.skills-grid',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, []);

    return (
        <section ref={containerRef} id="skills" className="relative z-40 pb-24 md:pb-32 pt-0">
            <SectionHeader title="SKILLS" subtitle="My Tech Stack" className="mb-12" />

            <div className="container mx-auto max-w-[1400px] px-6 sm:px-12 skills-grid flex flex-col gap-8">
                {skillsWithLogos.map((skill, index) => (
                    <SkillCategoryCard
                        key={skill.category}
                        category={skill.category}
                        icon={skill.icon}
                        items={skill.items}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
};

export default SkillsSection;
