import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Send, Copy, Check, Mail, MapPin, Clock } from 'lucide-react';
import { useGSAP } from '@/hooks/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import SectionHeader from '../ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

// Magnetic Button Component
const MagneticButton: React.FC<{
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}> = ({ children, className = '', onClick, type = 'button', disabled = false }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current || disabled) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.3);
        y.set((e.clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            type={type}
            onClick={onClick}
            disabled={disabled}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={className}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.button>
    );
};

// Toast Notification Component
const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({
    message,
    type,
    onClose
}) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            role="alert"
            aria-live="polite"
            aria-atomic="true"
            className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 ${type === 'success' ? 'bg-green-500/90' : 'bg-red-500/90'
                } backdrop-blur-sm`}
        >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center" aria-hidden="true">
                {type === 'success' ? <Check className="w-4 h-4" /> : <span className="text-lg">!</span>}
            </div>
            <span className="font-medium">{message}</span>
        </motion.div>
    );
};

// Floating Label Input Component
const FloatingInput: React.FC<{
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: string;
    required?: boolean;
    isTextarea?: boolean;
}> = ({ label, name, type = 'text', value, onChange, error, required, isTextarea }) => {
    const [isFocused, setIsFocused] = useState(false);
    const isActive = isFocused || value.length > 0;

    const InputComponent = isTextarea ? 'textarea' : 'input';

    return (
        <div className="relative">
            <motion.label
                animate={{
                    y: isActive ? -28 : 12,
                    scale: isActive ? 0.85 : 1,
                    color: isActive ? '#135BEC' : 'rgba(255,255,255,0.5)'
                }}
                transition={{ duration: 0.2 }}
                className="absolute left-4 pointer-events-none origin-left font-medium"
            >
                {label}
                {required && <span className="text-primary ml-1">*</span>}
            </motion.label>
            <InputComponent
                type={isTextarea ? undefined : type}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'
                    } rounded-xl px-4 ${isTextarea ? 'pt-6 pb-4 min-h-[150px] resize-none' : 'py-4'} text-white placeholder-transparent focus:outline-none focus:border-primary transition-colors duration-300`}
            />
            {error && (
                <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1 block"
                >
                    {error}
                </motion.span>
            )}
        </div>
    );
};

// Social Link Component with hover effect
const SocialLink: React.FC<{
    href: string;
    label: string;
    index: number;
}> = ({ href, label, index }) => {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, x: 5 }}
            className="group relative flex items-center gap-3 uppercase tracking-widest text-xs font-bold text-white/60 hover:text-primary transition-all duration-300"
        >
            <span className="relative overflow-hidden">
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                    {label}
                </span>
                <span className="absolute top-full left-0 text-primary transition-transform duration-300 group-hover:-translate-y-full">
                    {label}
                </span>
            </span>
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
        </motion.a>
    );
};

const ContactSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [copied, setCopied] = useState(false);

    // Split text animation for heading
    useEffect(() => {
        if (titleRef.current) {
            const text = "LET'S TALK";
            const chars = text.split('').map((char, i) =>
                `<span class="char inline-block" style="opacity: 0; transform: translateY(50px);">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('');
            titleRef.current.innerHTML = chars;
        }
    }, []);

    // GSAP Animations
    const containerRef = useGSAP<HTMLElement>(() => {
        // Text Scramble Animation
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        const scrambleChars = document.querySelectorAll('.scramble-char');
        const finalText = 'CONTACT';

        scrambleChars.forEach((char, index) => {
            const finalChar = finalText[index];
            let iterations = 0;
            const maxIterations = 15;

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
                        trigger: '.scramble-text',
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

        // Animate LET'S TALK heading characters
        gsap.to('.char', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        // Animate contact info cards
        gsap.fromTo('.contact-info-card',
            { opacity: 0, x: -30 },
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-info-container',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate form container
        gsap.fromTo('.contact-form-container',
            { opacity: 0, x: 30 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-form-container',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate footer elements
        gsap.fromTo('.footer-element',
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.footer-container',
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, []);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // EmailJS Configuration from environment variables
            const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            // Validate environment variables
            if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
                throw new Error('EmailJS configuration is missing. Please set up your environment variables.');
            }

            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_email: 'well0711200@gmail.com',
            };

            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

            setToast({ message: 'Message sent successfully!', type: 'success' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setToast({ message: 'Failed to send message. Please try again.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText('contact@welli.my.id');
            setCopied(true);
            setToast({ message: 'Email copied to clipboard!', type: 'success' });
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setToast({ message: 'Failed to copy email', type: 'error' });
        }
    };

    const socialLinks = [
        { href: 'https://www.linkedin.com/in/welli-', label: 'LinkedIn' },
        { href: 'https://www.instagram.com/_well07/', label: 'Instagram' },
        { href: 'https://github.com/Creastein', label: 'GitHub' },
        { href: 'https://www.tiktok.com/@wellibuilds', label: 'TikTok' }
    ];

    return (
        <>
            <footer
                ref={sectionRef}
                id="contact"
                className="relative z-40 bg-black"
            >
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
                </div>

                {/* Creative Header with GSAP Text Scramble & 3D Effect */}
                {/* Creative Header with GSAP Text Scramble & 3D Effect */}
                <SectionHeader title="CONTACT" subtitle="Get in Touch" />

                {/* Main Contact Content */}
                <div ref={containerRef} className="container mx-auto max-w-[1400px] px-6 sm:px-12 py-24">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

                        {/* Left Column - Contact Info */}
                        <div className="contact-info-container space-y-12">
                            {/* Animated Heading */}
                            <div>
                                <h2
                                    ref={titleRef}
                                    className="text-5xl md:text-7xl tracking-tighter text-white mb-8"
                                    style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}
                                >
                                    LET'S TALK
                                </h2>
                                <p className="text-xl text-secondary leading-relaxed max-w-md">
                                    Have a project in mind or want to collaborate? I'd love to hear from you.
                                </p>
                            </div>

                            {/* Contact Info Cards */}
                            <div className="space-y-4">
                                <motion.div
                                    className="contact-info-card group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                                    onClick={copyEmail}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm text-secondary mb-1">Email</div>
                                        <div className="text-lg font-medium text-white">contact@welli.my.id</div>
                                    </div>
                                    <motion.div
                                        initial={false}
                                        animate={{ scale: copied ? [1, 1.2, 1] : 1 }}
                                    >
                                        {copied ? (
                                            <Check className="w-5 h-5 text-green-400" />
                                        ) : (
                                            <Copy className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                                        )}
                                    </motion.div>
                                </motion.div>

                                <div className="contact-info-card flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-secondary mb-1">Location</div>
                                        <div className="text-lg font-medium text-white">Jakarta, Indonesia</div>
                                    </div>
                                </div>

                                <div className="contact-info-card flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-secondary mb-1">Availability</div>
                                        <div className="text-lg font-medium text-white">Open for opportunities</div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div>
                                <h3 className="text-sm uppercase tracking-widest text-secondary font-medium mb-6">
                                    Follow Me
                                </h3>
                                <div className="flex flex-wrap gap-6">
                                    {socialLinks.map((link, index) => (
                                        <SocialLink
                                            key={link.label}
                                            href={link.href}
                                            label={link.label}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Contact Form */}
                        <motion.div
                            className="contact-form-container"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm">
                                <h3 className="text-2xl font-bold mb-2">Send a Message</h3>
                                <p className="text-secondary mb-8">Fill out the form below and I'll get back to you soon.</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <FloatingInput
                                            label="Your Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            error={errors.name}
                                            required
                                        />
                                        <FloatingInput
                                            label="Your Email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            error={errors.email}
                                            required
                                        />
                                    </div>

                                    <FloatingInput
                                        label="Subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        error={errors.subject}
                                        required
                                    />

                                    <FloatingInput
                                        label="Your Message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        error={errors.message}
                                        required
                                        isTextarea
                                    />

                                    <MagneticButton
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full group relative flex items-center justify-center gap-3 bg-primary text-white py-4 px-8 rounded-xl font-medium text-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            {isSubmitting ? (
                                                <>
                                                    <motion.div
                                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                        animate={{ rotate: 360 }}
                                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                    />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </span>
                                        <motion.div
                                            className="absolute inset-0 bg-white"
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <span className="absolute inset-0 flex items-center justify-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            Send Message
                                            <Send className="w-5 h-5" />
                                        </span>
                                    </MagneticButton>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-container border-t border-white/10">
                    <div className="container mx-auto max-w-[1400px] px-6 sm:px-12 py-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="footer-element text-sm text-white/40">
                                © 2025 WELLI. All rights reserved.
                            </p>
                            <div className="footer-element flex items-center gap-2 text-sm text-white/40">
                                <span>Made with</span>
                                <motion.span
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="text-red-400"
                                >

                                </motion.span>
                                <span>in Jakarta</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
};

export default ContactSection;
