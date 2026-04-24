import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Copy, Check, Mail, MapPin, Clock } from 'lucide-react';
import { useGSAP } from '@/hooks/useGSAP';
import { trackFormSubmit, trackEmailCopy } from '@/hooks/useAnalytics';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import SectionHeader from '../ui/SectionHeader';
import MagneticButton from '../ui/MagneticButton';
import Toast from '../ui/Toast';
import FloatingInput from '../ui/FloatingInput';
import SocialLink from '../ui/SocialLink';
import { useTranslation } from 'react-i18next';

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

const ContactSection: React.FC = () => {
    const { t, i18n } = useTranslation();
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
            const text = t('contact.letsTalk');
            const chars = text.split('').map((char, i) =>
                `<span class="char inline-block" style="opacity: 0; transform: translateY(50px);">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('');
            titleRef.current.innerHTML = chars;
        }
    }, [t]);

    // GSAP Animations - all selectors scoped to containerRef
    const containerRef = useGSAP<HTMLElement>(() => {
        const el = containerRef.current;
        if (!el) return;

        // Animate LET'S TALK heading characters
        const charEls = el.querySelectorAll('.char');
        if (charEls.length > 0) {
            gsap.to(charEls, {
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
        }

        // Animate contact info cards
        const infoCards = el.querySelectorAll('.contact-info-card');
        const infoContainer = el.querySelector('.contact-info-container');
        if (infoCards.length > 0 && infoContainer) {
            gsap.fromTo(infoCards,
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: infoContainer,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }

        // Animate form container
        const formContainer = el.querySelector('.contact-form-container');
        if (formContainer) {
            gsap.fromTo(formContainer,
                { opacity: 0, x: 30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: formContainer,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }

        // Animate footer elements
        const footerContainer = el.querySelector('.footer-container');
        const footerElements = el.querySelectorAll('.footer-element');
        if (footerContainer && footerElements.length > 0) {
            gsap.fromTo(footerElements,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: footerContainer,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
    }, []);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = t('contact.errors.nameReq');
        }

        if (!formData.email.trim()) {
            newErrors.email = t('contact.errors.emailReq');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t('contact.errors.emailInv');
        }

        if (!formData.subject.trim()) {
            newErrors.subject = t('contact.errors.subjectReq');
        }

        if (!formData.message.trim()) {
            newErrors.message = t('contact.errors.messageReq');
        } else if (formData.message.length < 10) {
            newErrors.message = t('contact.errors.messageLen');
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

            trackFormSubmit('contact_form', true);
            setToast({ message: t('contact.form.success'), type: 'success' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            trackFormSubmit('contact_form', false);
            setToast({ message: t('contact.form.error'), type: 'error' });
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
            await navigator.clipboard.writeText('well0711200@gmail.com');
            trackEmailCopy('well0711200@gmail.com');
            setCopied(true);
            setToast({ message: t('contact.copy.success'), type: 'success' });
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setToast({ message: t('contact.copy.error'), type: 'error' });
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
                key={i18n.language}
                ref={sectionRef}
                id="contact"
                className="relative z-40 bg-black pt-16 md:pt-24"
            >
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
                </div>

                {/* Creative Header with GSAP Text Scramble & 3D Effect */}
                {/* Creative Header with GSAP Text Scramble & 3D Effect */}
                <SectionHeader title={t('contact.title')} subtitle={t('contact.subtitle')} />

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
                                    {t('contact.letsTalk')}
                                </h2>
                                <p className="text-xl text-secondary leading-relaxed max-w-md">
                                    {t('contact.description')}
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
                                        <div className="text-lg font-medium text-white">well0711200@gmail.com</div>
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
                                        <div className="text-sm text-secondary mb-1">{t('contact.info.location')}</div>
                                        <div className="text-lg font-medium text-white">{t('contact.info.jakarta')}</div>
                                    </div>
                                </div>

                                <div className="contact-info-card flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-secondary mb-1">{t('contact.info.availability')}</div>
                                        <div className="text-lg font-medium text-white">{t('contact.info.open')}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div>
                                <h3 className="text-sm uppercase tracking-widest text-secondary font-medium mb-6">
                                    {t('contact.info.followMe')}
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
                                <h3 className="text-2xl font-bold mb-2">{t('contact.form.title')}</h3>
                                <p className="text-secondary mb-8">{t('contact.form.description')}</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <FloatingInput
                                            label={t('contact.form.name')}
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            error={errors.name}
                                            required
                                        />
                                        <FloatingInput
                                            label={t('contact.form.email')}
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            error={errors.email}
                                            required
                                        />
                                    </div>

                                    <FloatingInput
                                        label={t('contact.form.subject')}
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        error={errors.subject}
                                        required
                                    />

                                    <FloatingInput
                                        label={t('contact.form.message')}
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
                                                    {t('contact.form.sending')}
                                                </>
                                            ) : (
                                                <>
                                                    {t('contact.form.submit')}
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
                                            {t('contact.form.submit')}
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
                                {t('contact.footer.rights')}
                            </p>
                            <div className="footer-element flex items-center gap-2 text-sm text-white/40">
                                <span>{t('contact.footer.madeWith')}</span>
                                <motion.span
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="text-red-400"
                                >
                                    
                                </motion.span>
                                <span>{t('contact.footer.in')}</span>
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
