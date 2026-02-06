import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
    return (
        <section id="about" className="relative z-10 bg-[#080a0f] py-24 md:py-32 border-t border-white/5">
            <div className="container mx-auto max-w-[1400px] px-6 sm:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block"
                        >
                            About Me
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                            className="text-5xl md:text-7xl font-bold font-display leading-[0.9] mb-8"
                        >
                            Business Analyst<br /> & Developer
                        </motion.h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col justify-end"
                    >
                        <p className="text-xl md:text-2xl text-secondary leading-relaxed font-light">
                            I'm a <span className="text-white font-medium">Business Analyst</span> with a background in <span className="text-white font-medium">Information Systems</span>. I focus on translating business needs into clear, structured solutions. With hands-on frontend experience, I'm able to validate ideas quickly, communicate effectively with developers, and ensure solutions stay aligned with user and business goals.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
