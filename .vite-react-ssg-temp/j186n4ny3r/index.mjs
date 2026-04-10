import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, useCallback, useRef, useMemo, Suspense } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion, useScroll, AnimatePresence, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Moon, Sun, X, Instagram, MessageCircle, Github, Linkedin, Code, Briefcase, Database, Palette, Cpu, Layers, ArrowRight, ArrowUpRight, Check, Mail, Copy, MapPin, Clock, Send, ArrowLeft, Calendar } from "lucide-react";
import { useTranslation, initReactI18next } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiHtml5, SiCss3, SiJavascript, SiGit, SiFigma, SiPostman, SiJira } from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { FaClipboardList, FaSitemap, FaProjectDiagram, FaUserFriends, FaPencilRuler, FaMobileAlt, FaSearch, FaLayerGroup, FaUniversalAccess } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import i18n from "i18next";
import { ViteReactSSG } from "vite-react-ssg";
const THEME_STORAGE_KEY = "welli-theme";
const useTheme = () => {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme === "dark" ? "#050505" : "#ffffff");
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, mounted]);
  const toggleTheme = useCallback(() => {
    setTheme((prev) => prev === "dark" ? "light" : "dark");
  }, []);
  const setDarkMode = useCallback(() => setTheme("dark"), []);
  const setLightMode = useCallback(() => setTheme("light"), []);
  return {
    theme,
    isDark: theme === "dark",
    isLight: theme === "light",
    toggleTheme,
    setDarkMode,
    setLightMode,
    mounted
  };
};
const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme();
  if (!mounted) {
    return /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-white/10 animate-pulse" });
  }
  return /* @__PURE__ */ jsxs(
    motion.button,
    {
      onClick: toggleTheme,
      "aria-label": `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
      className: "relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors duration-300",
      whileTap: { scale: 0.95 },
      whileHover: { scale: 1.05 },
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: false,
            animate: {
              rotate: theme === "dark" ? 0 : 180,
              scale: theme === "dark" ? 1 : 0
            },
            transition: { duration: 0.3 },
            className: "absolute",
            children: /* @__PURE__ */ jsx(Moon, { className: "w-5 h-5 text-white" })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: false,
            animate: {
              rotate: theme === "light" ? 0 : -180,
              scale: theme === "light" ? 1 : 0
            },
            transition: { duration: 0.3 },
            className: "absolute",
            children: /* @__PURE__ */ jsx(Sun, { className: "w-5 h-5 text-yellow-500" })
          }
        )
      ]
    }
  );
};
const TikTokIcon = ({ size = 24, className = "" }) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    children: /* @__PURE__ */ jsx("path", { d: "M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" })
  }
);
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();
  location.pathname === "/" || location.pathname === "/work";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [time, setTime] = useState("");
  const { t, i18n: i18n2 } = useTranslation();
  useEffect(() => {
    const updateTime = () => {
      const now = /* @__PURE__ */ new Date();
      setTime(now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1e3);
    return () => clearInterval(interval);
  }, []);
  const handleNavClick = (id) => {
    setIsMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const navItems = [
    { id: "home", label: t("nav.home") },
    { id: "about", label: t("nav.about") },
    { id: "skills", label: "SKILLS" },
    { id: "services", label: t("nav.services") },
    { id: "work", label: t("nav.work") },
    { id: "contact", label: t("nav.contact") }
  ];
  const socialLinks = [
    { label: "TikTok", icon: /* @__PURE__ */ jsx(TikTokIcon, { size: 20 }), href: "https://www.tiktok.com/@wellibuilds?is_from_webapp=1&sender_device=pc" },
    { label: "Instagram", icon: /* @__PURE__ */ jsx(Instagram, { size: 20 }), href: "https://www.instagram.com/_well07/" },
    { label: "WhatsApp", icon: /* @__PURE__ */ jsx(MessageCircle, { size: 20 }), href: "https://wa.me/6285161507114" },
    { label: "GitHub", icon: /* @__PURE__ */ jsx(Github, { size: 20 }), href: "https://github.com/Creastein" },
    { label: "LinkedIn", icon: /* @__PURE__ */ jsx(Linkedin, { size: 20 }), href: "https://www.linkedin.com/in/welli-" }
  ];
  const menuVariants = {
    closed: { x: "100%", transition: { type: "spring", stiffness: 400, damping: 40 } },
    open: { x: "0%", transition: { type: "spring", stiffness: 400, damping: 40 } }
  };
  const containerVariants2 = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } }
  };
  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0, transition: { ease: "easeOut" } }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("nav", { className: "fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-start text-white pointer-events-none", children: [
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-4 md:gap-8 pointer-events-auto bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-lg", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            animate: { opacity: isMenuOpen ? 0 : 1 },
            className: "flex gap-4 md:gap-12 text-xs font-medium tracking-wide uppercase text-[#e0e0e0]",
            children: [
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }),
                /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: t("hero.available") })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { children: time }),
                /* @__PURE__ */ jsx("div", { className: "hidden md:block text-white/50 mt-0.5 text-right", children: "(GMT+7)" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => i18n2.changeLanguage(i18n2.language === "en" ? "id" : "en"),
              className: "text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors text-white",
              children: i18n2.language === "en" ? "ID" : "EN"
            }
          ),
          /* @__PURE__ */ jsx(ThemeToggle, {}),
          /* @__PURE__ */ jsxs(
            motion.button,
            {
              animate: { opacity: isMenuOpen ? 0 : 1 },
              onClick: () => setIsMenuOpen(true),
              "aria-label": "Open navigation menu",
              "aria-expanded": isMenuOpen,
              "aria-controls": "navigation-menu",
              className: "group flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-[#e0e0e0] hover:text-primary transition-colors",
              children: [
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    className: "w-2 h-2 bg-[#FF3300]",
                    "aria-hidden": "true"
                  }
                ),
                "MENU"
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isMenuOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setIsMenuOpen(false),
          className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          variants: menuVariants,
          initial: "closed",
          animate: "open",
          exit: "closed",
          className: "fixed top-0 right-0 h-full w-full md:w-[30vw] min-w-[320px] bg-black z-50 flex flex-col border-l border-white/10 shadow-2xl",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "px-8 py-8 md:px-12 md:py-10 flex justify-between items-center border-b border-white/5 bg-black z-10", children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center gap-3 text-xs tracking-widest text-[#e0e0e0] uppercase",
                  style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 },
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-[#FF3300]" }),
                    "Navigation"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsMenuOpen(false),
                  "aria-label": "Close navigation menu",
                  className: "group w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:border-white transition-all duration-300",
                  children: /* @__PURE__ */ jsx(X, { size: 20, className: "text-white group-hover:text-black transition-colors", "aria-hidden": "true" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto px-8 md:px-12 py-8 flex flex-col gap-12 hide-scrollbar", children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  variants: containerVariants2,
                  initial: "closed",
                  animate: "open",
                  className: "flex flex-col gap-6",
                  children: navItems.map((item, index) => /* @__PURE__ */ jsx(
                    motion.button,
                    {
                      variants: itemVariants,
                      onClick: () => handleNavClick(item.id),
                      className: "group text-left flex flex-col",
                      children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                        /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono text-white/30 group-hover:text-[#FF3300] transition-colors", children: [
                          "0",
                          index + 1
                        ] }),
                        /* @__PURE__ */ jsx(
                          "span",
                          {
                            className: "text-4xl md:text-5xl tracking-tight text-[#888] group-hover:text-white transition-colors duration-300 uppercase",
                            style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 },
                            children: item.label
                          }
                        )
                      ] })
                    },
                    item.id
                  ))
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "w-full h-px bg-white/10 my-4" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
                /* @__PURE__ */ jsx(
                  "h4",
                  {
                    className: "text-xs tracking-widest text-white/50 uppercase",
                    style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 },
                    children: "Connect"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: socialLinks.map((social) => /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: social.href,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "group flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white hover:border-white transition-all duration-300",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "text-white group-hover:text-black transition-colors", children: social.icon }),
                      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-400 group-hover:text-black transition-colors", children: social.label })
                    ]
                  },
                  social.label
                )) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "px-8 py-6 md:px-12 border-t border-white/10 bg-black", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 text-xs text-white/30 text-center md:text-left", children: [
              /* @__PURE__ */ jsx("p", { children: "© 2025 WELLI. All rights reserved." }),
              /* @__PURE__ */ jsx("p", { children: "Designed & Developed in Jakarta." })
            ] }) })
          ]
        }
      )
    ] }) })
  ] });
};
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const useGSAP = (callback, deps = []) => {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(callback, ref);
    return () => ctx.revert();
  }, deps);
  return ref;
};
const AboutSection = () => {
  const { t, i18n: i18n2 } = useTranslation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const titleY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const descY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  useEffect(() => {
    if (titleRef.current) {
      const text = titleRef.current.textContent || "";
      const words = text.split(" ");
      titleRef.current.innerHTML = words.map((word) => {
        const chars = word.split("").map(
          (char) => `<span class="char" style="display: inline-block; opacity: 0;">${char}</span>`
        ).join("");
        return `<span class="word" style="display: inline-block;">${chars}</span>`;
      }).join(" ");
    }
    if (descRef.current) {
      const text = descRef.current.innerHTML;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = text;
      const textContent = tempDiv.textContent || "";
      const words = textContent.split(" ");
      descRef.current.innerHTML = words.map(
        (word) => `<span class="word" style="display: inline-block; opacity: 0;">${word}</span>`
      ).join(" ");
    }
  }, []);
  const containerRef = useGSAP(() => {
    gsap.fromTo(
      ".about-label",
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-label",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
    gsap.fromTo(
      ".about-title .char",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.02,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
    gsap.fromTo(
      ".about-desc .word",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.02,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-desc",
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);
  return /* @__PURE__ */ jsx("section", { ref: sectionRef, id: "about", className: "relative z-40 bg-black py-24 md:py-32 border-t border-white/5 overflow-hidden", children: /* @__PURE__ */ jsx("div", { ref: containerRef, className: "container mx-auto max-w-[1400px] px-6 sm:px-12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-end", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        style: { y: titleY },
        className: "will-change-transform relative z-10",
        children: [
          /* @__PURE__ */ jsx("span", { className: "about-label text-primary font-bold tracking-widest text-xs uppercase mb-4 block", children: t("about.label") }),
          /* @__PURE__ */ jsx(
            "h2",
            {
              ref: titleRef,
              className: "about-title text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-[1.1] mb-8 lg:mb-0 break-words",
              children: t("about.title")
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        style: { y: descY },
        className: "will-change-transform relative z-10 lg:pb-2",
        children: /* @__PURE__ */ jsx(
          "p",
          {
            ref: descRef,
            className: "about-desc text-lg sm:text-xl md:text-2xl text-secondary leading-relaxed font-light break-words lg:max-w-[600px]",
            children: t("about.description")
          }
        )
      }
    )
  ] }) }) }, i18n2.language);
};
const skillsWithLogos = [
  {
    category: "Frontend Development",
    icon: Code,
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Framer Motion", icon: SiFramer, color: "#E10098" },
      // Pinkish
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss3, color: "#1572B6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" }
    ]
  },
  {
    category: "Business & System Analysis",
    icon: Briefcase,
    items: [
      { name: "Requirements Analysis", icon: FaClipboardList, color: "#FF9F1C" },
      // Orange
      { name: "Process Mapping", icon: FaSitemap, color: "#2EC4B6" },
      // Teal
      { name: "System Design", icon: FaProjectDiagram, color: "#E71D36" },
      // Red
      { name: "User Stories", icon: FaUserFriends, color: "#3A86FF" },
      // Blue
      { name: "Wireframing", icon: FaPencilRuler, color: "#8338EC" }
      // Purple
    ]
  },
  {
    category: "Tools & Technologies",
    icon: Database,
    items: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      // Figma color
      { name: "VS Code", icon: TbBrandVscode, color: "#007ACC" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "Jira", icon: SiJira, color: "#0052CC" }
    ]
  },
  {
    category: "UI/UX Design",
    icon: Palette,
    items: [
      { name: "Responsive Design", icon: FaMobileAlt, color: "#FF006E" },
      { name: "User Research", icon: FaSearch, color: "#FB5607" },
      { name: "Prototyping", icon: FaLayerGroup, color: "#FFBE0B" },
      { name: "Design Systems", icon: FaPencilRuler, color: "#8338EC" },
      // Reusing purple
      { name: "Accessibility", icon: FaUniversalAccess, color: "#3A86FF" }
    ]
  }
];
gsap.registerPlugin(ScrollTrigger);
const SectionHeader = ({ title, subtitle, className = "" }) => {
  const containerRef = useGSAP(() => {
    var _a;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    const scrambleChars = (_a = containerRef.current) == null ? void 0 : _a.querySelectorAll(".scramble-char");
    const finalText = title.toUpperCase();
    if (scrambleChars) {
      scrambleChars.forEach((char, index) => {
        const finalChar = finalText[index] || "";
        let iterations = 0;
        const maxIterations = 15;
        if (!char) return;
        gsap.fromTo(
          char,
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
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: containerRef.current,
              // Trigger when container enters view
              start: "top 85%",
              toggleActions: "play none none reverse",
              onEnter: () => {
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
    gsap.fromTo(
      ".header-subtitle",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [title]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: `relative border-y border-white/10 py-8 md:py-12 overflow-hidden ${className}`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-20 pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: {
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(19, 91, 236, 0.3) 1px, transparent 0)",
          backgroundSize: "40px 40px"
        } }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [...Array(15)].map((_, i) => /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute w-1 h-1 bg-primary/40 rounded-full",
            initial: {
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0
            },
            animate: {
              y: [null, "-100%"],
              opacity: [0, 1, 0]
            },
            transition: {
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }
          },
          i
        )) }),
        /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-[1400px] px-6 sm:px-12 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative perspective-1000", children: [
            /* @__PURE__ */ jsx(
              "h2",
              {
                className: "text-6xl sm:text-7xl md:text-8xl tracking-tighter text-center",
                style: {
                  fontFamily: '"Mohave", sans-serif',
                  fontWeight: 600,
                  perspective: "1000px",
                  lineHeight: 1.1
                },
                children: title.split("").map((char, i) => /* @__PURE__ */ jsx("span", { className: "scramble-char inline-block min-w-[0.5em]", children: char }, i))
              }
            ),
            /* @__PURE__ */ jsx(
              "h2",
              {
                className: "absolute inset-0 text-6xl sm:text-7xl md:text-8xl tracking-tighter text-center opacity-30 blur-sm select-none pointer-events-none",
                style: {
                  fontFamily: '"Mohave", sans-serif',
                  fontWeight: 600,
                  WebkitTextStroke: "2px rgba(19, 91, 236, 0.5)",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.1,
                  top: "4px",
                  // slight offset for depth
                  left: "4px"
                },
                children: title
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "header-subtitle mt-6 text-center",
              children: /* @__PURE__ */ jsx(
                "span",
                {
                  className: "text-sm md:text-base text-primary",
                  style: { fontFamily: '"Rock Salt", cursive' },
                  children: subtitle
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none",
              animate: {
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              },
              transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              children: /* @__PURE__ */ jsx("div", { className: "w-20 h-20 border border-primary/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-12 border border-primary/40 rounded-full" }) })
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none",
              animate: {
                y: [0, 20, 0],
                rotate: [0, -5, 0]
              },
              transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              children: /* @__PURE__ */ jsx("div", { className: "w-24 h-24 border border-white/10 rotate-45" })
            }
          )
        ] }) })
      ]
    }
  );
};
const SkillLogo = ({ item, index }) => {
  const itemRef = React.useRef(null);
  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3;
    const y = (e.clientY - top - height / 2) * 0.3;
    gsap.to(itemRef.current, {
      x,
      y,
      duration: 0.3,
      ease: "power2.out"
    });
  };
  const handleMouseLeave = () => {
    if (!itemRef.current) return;
    gsap.to(itemRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)"
    });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: itemRef,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      className: "skill-logo-item relative group flex items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 hover:z-50 transition-colors duration-300",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "text-3xl md:text-4xl transition-colors duration-300",
            style: { color: item.color },
            children: /* @__PURE__ */ jsx(item.icon, {})
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:-bottom-[-8px] transition-all duration-300 z-20 whitespace-nowrap pointer-events-none", children: /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-white bg-surface border border-white/10 px-2 py-1 rounded shadow-lg", children: item.name }) })
      ]
    }
  );
};
const SkillCategoryCard = ({ category, icon: Icon, items, index }) => /* @__PURE__ */ jsxs("div", { className: "skill-category-card p-6 md:p-8 rounded-2xl bg-surface border border-white/5 hover:border-white/10 transition-colors", children: [
  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
    /* @__PURE__ */ jsx("div", { className: "p-2 rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(Icon, { size: 24 }) }),
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white font-display", children: category })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 sm:grid-cols-5 gap-3 md:gap-4", children: items.map((item, idx) => /* @__PURE__ */ jsx(SkillLogo, { item, index: idx }, item.name)) })
] });
const SkillsSection = () => {
  const { t } = useTranslation();
  const containerRef = useGSAP(() => {
    gsap.fromTo(
      ".skill-category-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
    gsap.fromTo(
      ".skill-logo-item",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: {
          amount: 1,
          grid: "auto",
          from: "start"
        },
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);
  return /* @__PURE__ */ jsxs("section", { ref: containerRef, id: "skills", className: "relative z-40 pb-24 md:pb-32 pt-0", children: [
    /* @__PURE__ */ jsx(SectionHeader, { title: t("skills.title"), subtitle: t("skills.subtitle"), className: "mb-12" }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-[1400px] px-6 sm:px-12 skills-grid flex flex-col gap-8", children: skillsWithLogos.map((skill, index) => /* @__PURE__ */ jsx(
      SkillCategoryCard,
      {
        category: skill.category,
        icon: skill.icon,
        items: skill.items,
        index
      },
      skill.category
    )) })
  ] });
};
const useLazyImage = (options = {}) => {
  const { rootMargin = "50px", threshold = 0.1 } = options;
  const imgRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const element = imgRef.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.unobserve(element);
        }
      },
      { rootMargin, threshold }
    );
    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, [rootMargin, threshold]);
  const handleLoad = () => {
    setIsLoaded(true);
  };
  return { imgRef, shouldLoad, isLoaded, handleLoad };
};
const ServiceCard = React.memo(({
  service,
  index,
  isInView,
  prefersReducedMotion
}) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const cardRef = useRef(null);
  const { imgRef, shouldLoad, isLoaded, handleLoad } = useLazyImage({
    rootMargin: "100px",
    threshold: 0.1
  });
  const handleImageLoad = useCallback(() => {
    handleLoad();
  }, [handleLoad]);
  const handleKeyDown = useCallback((event) => {
    if (event.key === "Enter" || event.key === " ") {
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
  const shouldAnimate = isInView && !prefersReducedMotion;
  const shouldHover = !prefersReducedMotion;
  const cardVariants = useMemo(() => ({
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
        ease: [0.25, 0.46, 0.45, 0.94]
        // Custom cubic-bezier
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
  const imageVariants = useMemo(() => ({
    rest: {
      scale: 1
    },
    hover: {
      scale: 1.06,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }), []);
  const iconVariants = useMemo(() => ({
    rest: {
      rotate: 0,
      scale: 1
    },
    hover: {
      rotate: 15,
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: [0.68, -0.55, 0.265, 1.55],
        // Bouncy ease
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  }), []);
  const contentVariants = useMemo(() => ({
    rest: { x: 0 },
    hover: {
      x: 8,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }), []);
  const borderGlowVariants = useMemo(() => ({
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
  const tagContainerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: index * 0.15 + 0.3
      }
    }
  }), [index]);
  const tagVariants = useMemo(() => ({
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
  return /* @__PURE__ */ jsxs(
    motion.article,
    {
      ref: cardRef,
      id: cardId,
      className: "group relative overflow-hidden rounded-xl bg-surface border border-white/5 p-1 cursor-pointer",
      initial: shouldAnimate ? "hidden" : false,
      animate: shouldAnimate ? "visible" : void 0,
      whileHover: shouldHover ? "hover" : void 0,
      variants: shouldAnimate ? cardVariants : void 0,
      onMouseEnter: () => shouldHover && setIsHovered(true),
      onMouseLeave: () => shouldHover && setIsHovered(false),
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      role: "article",
      "aria-labelledby": titleId,
      "aria-describedby": descId,
      tabIndex: 0,
      style: {
        contain: "layout style paint",
        contentVisibility: "auto"
      },
      children: [
        shouldHover && /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute inset-0 rounded-xl bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 pointer-events-none",
            initial: "rest",
            animate: isHovered || isFocused ? "hover" : "rest",
            variants: borderGlowVariants
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "relative flex flex-col md:flex-row h-full rounded-lg overflow-hidden bg-[#151b26]",
            initial: "rest",
            animate: shouldHover && (isHovered || isFocused) ? "hover" : "rest",
            children: [
              /* @__PURE__ */ jsxs(
                "figure",
                {
                  ref: imgRef,
                  className: "w-full md:w-2/5 aspect-video md:aspect-auto relative overflow-hidden m-0",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/20 mix-blend-overlay z-10" }),
                    !isLoaded && /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "absolute inset-0 bg-white/5 animate-pulse z-20",
                        style: { willChange: "opacity" },
                        role: "status",
                        "aria-label": "Loading service image"
                      }
                    ),
                    shouldLoad && /* @__PURE__ */ jsx(
                      motion.div,
                      {
                        className: "w-full h-full relative",
                        variants: shouldHover ? imageVariants : void 0,
                        role: "img",
                        "aria-label": `Illustration for ${service.title}`,
                        children: /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: service.image,
                            alt: `${service.title} illustration`,
                            className: "w-full h-full object-cover",
                            onLoad: handleImageLoad,
                            loading: "lazy",
                            decoding: "async",
                            width: 400,
                            height: 300
                          }
                        )
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: "flex flex-1 flex-col justify-between p-6 md:p-8",
                  variants: shouldHover ? contentVariants : void 0,
                  children: [
                    /* @__PURE__ */ jsxs("header", { className: "flex flex-col gap-4", children: [
                      /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          className: "text-primary mb-2",
                          variants: shouldHover ? iconVariants : void 0,
                          style: { willChange: "transform" },
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsx(IconComponent, { size: 32 })
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        motion.h3,
                        {
                          id: titleId,
                          className: "text-2xl font-bold text-white group-hover:text-primary group-focus-within:text-primary transition-colors duration-300 font-display",
                          style: { willChange: "color" },
                          children: t(`services.items.${service.id}.title`)
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          id: descId,
                          className: "text-secondary leading-relaxed",
                          children: t(`services.items.${service.id}.description`)
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx("footer", { className: "mt-8", children: /* @__PURE__ */ jsx(
                      motion.ul,
                      {
                        className: "flex flex-wrap gap-2 list-none p-0 m-0",
                        role: "list",
                        "aria-label": `Technologies and skills for ${service.title}`,
                        variants: shouldAnimate ? tagContainerVariants : void 0,
                        initial: shouldAnimate ? "hidden" : false,
                        animate: shouldAnimate ? "visible" : void 0,
                        children: t(`services.items.${service.id}.tags`, { returnObjects: true }).map((tag) => /* @__PURE__ */ jsx(
                          motion.li,
                          {
                            variants: shouldHover ? tagVariants : void 0,
                            whileHover: shouldHover ? { scale: 1.05 } : void 0,
                            children: /* @__PURE__ */ jsx(
                              "span",
                              {
                                className: "inline-block px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-gray-300 border border-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:border-primary/30 group-hover:text-white group-focus-within:bg-white/10 group-focus-within:border-primary/30 group-focus-within:text-white",
                                style: { willChange: "transform" },
                                children: tag
                              }
                            )
                          },
                          tag
                        ))
                      }
                    ) })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
});
ServiceCard.displayName = "ServiceCard";
const ServiceCardSkeleton = ({ index = 0 }) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative overflow-hidden rounded-xl bg-surface border border-white/5 p-1",
      style: {
        contain: "layout style paint",
        contentVisibility: "auto"
      },
      role: "status",
      "aria-label": "Loading service information",
      "aria-busy": "true",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row h-full rounded-lg overflow-hidden bg-[#151b26]", children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full md:w-2/5 aspect-video md:aspect-auto relative overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-0 bg-white/5 animate-pulse",
                style: { willChange: "opacity" }
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-0 -translate-x-full animate-shimmer",
                style: {
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
                  willChange: "transform"
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col justify-between p-6 md:p-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-8 h-8 rounded bg-white/5 animate-pulse",
                  style: { willChange: "opacity" }
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "h-8 w-3/4 rounded bg-white/5 animate-pulse",
                  style: {
                    willChange: "opacity",
                    animationDelay: `${index * 100}ms`
                  }
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "h-4 w-full rounded bg-white/5 animate-pulse",
                    style: {
                      willChange: "opacity",
                      animationDelay: `${index * 100 + 50}ms`
                    }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "h-4 w-5/6 rounded bg-white/5 animate-pulse",
                    style: {
                      willChange: "opacity",
                      animationDelay: `${index * 100 + 100}ms`
                    }
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "mt-8 flex flex-wrap gap-2",
                "aria-hidden": "true",
                children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "h-6 w-20 rounded-full bg-white/5 animate-pulse",
                    style: {
                      willChange: "opacity",
                      animationDelay: `${index * 100 + i * 50}ms`
                    }
                  },
                  i
                ))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "sr-only", children: [
          "Loading service card ",
          index + 1,
          " of 3"
        ] })
      ]
    }
  );
};
class ServiceCardErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.handleRetry = () => {
      this.setState({ hasError: false, error: void 0 });
    };
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ServiceCard Error:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden rounded-xl bg-surface border border-red-500/30 p-1", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row h-full rounded-lg overflow-hidden bg-[#151b26] p-6 md:p-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "text-red-500 mb-2", children: /* @__PURE__ */ jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "32",
            height: "32",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
              /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
              /* @__PURE__ */ jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
              /* @__PURE__ */ jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white font-display", children: "Service Unavailable" }),
        /* @__PURE__ */ jsx("p", { className: "text-secondary leading-relaxed", children: "We're having trouble loading this service. Please try again later." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: this.handleRetry,
            className: "mt-4 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors duration-200 w-fit",
            type: "button",
            children: "Try Again"
          }
        )
      ] }) }) });
    }
    return this.props.children;
  }
}
const servicesData = [
  {
    id: "business-analysis",
    title: "Business & System Analysis",
    description: "Analyze business processes, identify problems, and translate requirements into clear system and feature definitions.",
    tags: ["Requirements Analysis", "System Design", "Process Mapping"],
    image: "/images/services1.png",
    icon: Cpu
  },
  {
    id: "frontend-development",
    title: "Frontend Web Development",
    description: "Build clean, responsive, and user-friendly web interfaces using modern frontend technologies like React and Next.js.",
    tags: ["React", "Next.js", "Tailwind CSS"],
    image: "/images/services2.png",
    icon: Code
  },
  {
    id: "ui-implementation",
    title: "UI Implementation from Requirements",
    description: "Turn business and user requirements into practical, intuitive, and functional user interfaces that align with real business goals.",
    tags: ["UI/UX", "Figma to Code", "User-Centered Design"],
    image: "/images/services3.png",
    icon: Layers
  }
];
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  return prefersReducedMotion;
};
const useInView = (ref, options = {}) => {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, [ref, threshold, rootMargin, triggerOnce]);
  return isInView;
};
const ServicesSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isGridInView = useInView(gridRef, { threshold: 0.1 });
  useEffect(() => {
    servicesData.forEach((service) => {
      const img = new Image();
      img.src = service.image;
    });
  }, []);
  const containerVariants2 = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }), []);
  return /* @__PURE__ */ jsxs(
    motion.section,
    {
      ref: containerRef,
      id: "services",
      className: "relative z-40 bg-[#080a0f] pb-24 md:pb-32 pt-0 border-none overflow-hidden text-white",
      "aria-labelledby": "services-heading",
      "aria-describedby": "services-description",
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true, amount: 0.1 },
      children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#services-grid",
            className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg",
            children: "Skip to services list"
          }
        ),
        /* @__PURE__ */ jsx(SectionHeader, { title: t("services.header.title"), subtitle: t("services.header.subtitle"), className: "mb-12" }),
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-[1400px] px-6 sm:px-12 relative", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              ref: gridRef,
              id: "services-grid",
              className: "services-grid grid grid-cols-1 gap-6",
              role: "feed",
              "aria-busy": !isGridInView,
              "aria-label": "Services list. Use Tab to navigate between services.",
              variants: prefersReducedMotion ? void 0 : containerVariants2,
              initial: "hidden",
              animate: isGridInView ? "visible" : "hidden",
              children: servicesData.map((service, index) => /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(
                ServiceCardErrorBoundary,
                {
                  fallback: /* @__PURE__ */ jsx(ServiceCardSkeleton, { index }),
                  children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(ServiceCardSkeleton, { index }), children: /* @__PURE__ */ jsx(
                    ServiceCard,
                    {
                      service,
                      index,
                      isInView: isGridInView,
                      prefersReducedMotion
                    }
                  ) })
                }
              ) }, service.id))
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              role: "status",
              "aria-live": "polite",
              "aria-atomic": "true",
              className: "sr-only",
              children: isGridInView ? `${servicesData.length} services loaded` : "Loading services..."
            }
          )
        ] })
      ]
    }
  );
};
const projects = [
  {
    id: "the-secret-karimunjawa",
    title: "The Secret Karimunjawa",
    category: "Villa & Resort Website",
    year: "2026",
    description: "Website promosi villa premium di Karimunjawa milik owner Jerman. Dirancang untuk menarik tamu lokal dan mancanegara dengan tampilan elegan sesuai brand Instagram klien.",
    timeline: "3 minggu",
    services: ["Web Design", "Web Development", "SEO", "Multilingual", "Google Analytics"],
    image: "/images/karimunjawa.png",
    link: "https://thesecretkarimunjawa.com",
    featured: true
  },
  {
    id: "floating-paradise",
    title: "Floating Paradise",
    category: "Website Redesign · Hospitality",
    year: "2026",
    description: "Redesign website untuk eco-guesthouse di atas laut, Karimunjawa. Migrasi dari WordPress ke Next.js 14 dengan Sanity CMS, Tripla booking integration, dan 6 halaman baru — fokus pada direct booking dan pengalaman tamu.",
    timeline: "14 hari kerja",
    services: ["Next.js", "Sanity CMS", "Tripla", "Vercel"],
    image: "/images/floatingparadise.webp",
    link: "https://floatingparadise.id",
    featured: true
  },
  {
    id: "portfolio",
    title: "Portfolio",
    category: "Web Portfolio · Frontend Development",
    year: "2025",
    description: "Building a confident digital presence for showcasing work and expertise",
    timeline: "4 Weeks",
    services: ["Website", "Branding", "UI/UX"],
    image: "/images/portofolio.png",
    link: "https://welli.my.id",
    featured: true
  },
  {
    id: "idx-trading-assistant",
    title: "IDX Trading Assistant",
    category: "AI Financial Terminal",
    year: "2026",
    description: "An AI-powered analytics dashboard for the Indonesia Stock Exchange, featuring real-time data visualization and automated trade signals.",
    timeline: "5 weeks",
    services: ["Web App Development", "AI Integration", "FinTech"],
    image: "/images/IDX-Trading-Assistant.png",
    link: "https://idx-trading-assistant.vercel.app/",
    featured: true
  },
  {
    id: "villa-utamaro",
    title: "Villa Utamaro",
    category: "Premium Hospitality Website",
    year: "2026",
    description: "A premium hospitality landing page with robust internationalization (i18n) support, tailored for the global luxury villa market.",
    timeline: "2 weeks",
    services: ["Website", "Branding", "i18n"],
    image: "/images/VillaUtamaro.png",
    link: "https://villa-utamaro-next.vercel.app/id",
    featured: true
  },
  {
    id: "pt-bkn",
    title: "PT BKN",
    category: "Corporate Website · Lead Generation",
    year: "2024",
    description: "A professional corporate website designed with lead generation strategy, delivering a clean and trustworthy digital presence.",
    timeline: "2 Weeks",
    services: ["UI/UX Design", "Frontend Dev", "Lead Generation Strategy"],
    image: "/images/pt-bkn.png",
    link: "https://pt-bkn.vercel.app/",
    featured: true
  },
  {
    id: "best1trans",
    title: "Best1Trans",
    category: "Transportation Booking Platform",
    year: "2025",
    description: "A high-conversion transportation and tour booking platform with interactive UI/UX, optimized for mobile users and conversion rate.",
    timeline: "3 Weeks",
    services: ["Platform Architecture", "Interactive UI/UX", "Frontend Development", "Conversion Rate Optimization (CRO)"],
    image: "/images/lux-drive.png",
    link: "https://best1-trans.vercel.app/",
    featured: true
  },
  {
    id: "dancing-mountain-villa",
    title: "Dancing Mountain Villa",
    category: "Resort Website",
    year: "2026",
    description: "An immersive, visual-heavy resort website focusing on premium brand storytelling and fluid motion design.",
    timeline: "2 weeks",
    services: ["Website Branding", "UI/UX", "Motion Design"],
    image: "/images/dancingmountainvilla.png",
    link: "https://dancing-mountain-villa.vercel.app/",
    featured: true
  },
  {
    id: "website-builder",
    title: "Website Builder",
    category: "SaaS · Fullstack Engineering",
    year: "2026",
    description: "An enterprise-grade SaaS application engineered to empower non-technical users to visually construct and deploy high-performance websites. Built with complex state management and a seamless drag-and-drop interface.",
    timeline: "2 Weeks",
    services: ["SaaS Architecture", "Complex State Management", "Drag-and-Drop UX", "Fullstack Engineering"],
    image: "/images/wb.png",
    link: "https://website-builder-tau-livid.vercel.app/",
    featured: true
  },
  {
    id: "harga-check",
    title: "HargaCheck",
    category: "Data Aggregation · E-Commerce",
    year: "2026",
    description: "A high-performance data aggregator platform engineered to synchronize, process, and analyze real-time product pricing across major e-commerce marketplaces. Built with advanced search capabilities and automated price-drop alerts.",
    timeline: "3 Weeks",
    services: ["Data Aggregation Architecture", "API Integration & Web Scraping", "Real-time Search Engine", "High-Performance UI/UX"],
    image: "/images/hargaCheck.png",
    link: "https://harga-check.vercel.app/",
    featured: true
  },
  {
    id: "la-beaute-luxury-spa",
    title: "La Beauté Luxury Spa",
    category: "Luxury Wellness · Booking Platform",
    year: "2026",
    description: "A luxury digital wellness platform designed to mirror the tranquility and premium service of a high-end spa. Functions as a 24/7 digital concierge with an integrated reservation system.",
    timeline: "4 Weeks",
    services: ["Premium Brand Identity", "UX/UI Design", "Booking System Integration", "Mobile-First Development"],
    image: "/images/Salon-Spa.png",
    link: "https://la-beaut-luxury-spa.vercel.app/",
    featured: true
  },
  {
    id: "luxury-villa-website",
    title: "Luxury Villa Website",
    category: "Real Estate · High-End UI",
    year: "2026",
    description: "High-end real estate platform for luxury villa properties.",
    timeline: "2 Weeks",
    services: ["TypeScript", "Website", "Branding"],
    image: "/images/luxury_villa_website.png",
    link: "https://luxury-villa-website-prototype-deve.vercel.app/"
  },
  {
    id: "gerai-batik",
    title: "Gerai Batik",
    category: "E-Commerce · Fashion Retail",
    year: "2026",
    description: "Web katalog sederhana untuk retail fashion dengan fokus pada batik dan produk tradisional Indonesia.",
    timeline: "3 Days",
    services: ["HTML", "CSS", "Catalog"],
    image: "/images/gerai-batik.png",
    link: "https://gerai-batik.vercel.app/"
  },
  {
    id: "sagara-coffee",
    title: "Sagara Coffee",
    category: "Hospitality · Coffee Shop",
    year: "2026",
    description: 'Landing page modern untuk "Sagara Coffee" dengan design yang menarik dan user-friendly.',
    timeline: "1 Week",
    services: ["TypeScript", "Landing Page", "UI/UX"],
    image: "/images/Sagara-coffee.png",
    link: "https://coffe-shop-indol-eta.vercel.app/"
  },
  {
    id: "cafe-sba2",
    title: "cafeSBA2",
    category: "Hospitality · Cafe Website",
    year: "2026",
    description: "Versi 2 atau cabang lain dari proyek cafe dengan improvements dan features tambahan.",
    timeline: "3 Days",
    services: ["TypeScript", "Web Development", "UI/UX"],
    image: "/images/cafeSBA2.png",
    link: "https://cafe-sba-2.vercel.app/"
  },
  {
    id: "clipflow-ai",
    title: "ClipFlowAI",
    category: "AI · Video Automation",
    year: "2025",
    description: "Backend/Logic untuk otomatisasi video/konten menggunakan artificial intelligence untuk content creators.",
    timeline: "4 Weeks",
    services: ["Python", "AI/ML", "Backend"],
    image: "/images/clipflowai.png",
    link: "https://clip-flow-ai-personal.vercel.app/"
  }
];
const GA_MEASUREMENT_ID = "G-QZC70WX23G";
const sendEvent = (eventName, parameters) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, {
    ...parameters,
    page_location: window.location.href,
    page_title: document.title
  });
};
const trackCTAClick = (buttonName, location) => {
  const params = { button_name: buttonName, location };
  sendEvent("cta_click", params);
};
const trackFormSubmit = (formName, success) => {
  const params = { form_name: formName, success };
  sendEvent("form_submit", params);
};
const trackProjectClick = (projectName, projectId) => {
  const params = { project_name: projectName, project_id: projectId };
  sendEvent("project_click", params);
};
const trackSocialClick = (platform, url) => {
  const params = { platform, url };
  sendEvent("social_click", params);
};
const trackEmailCopy = (email) => {
  const params = { email };
  sendEvent("email_copy", params);
};
const trackEvent = (eventName, parameters) => {
  sendEvent(eventName, parameters);
};
const useAnalytics = () => {
  const location = useLocation();
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);
    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true
      });
    `;
    document.head.appendChild(script2);
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);
  useEffect(() => {
    if (typeof window.gtag === "undefined") return;
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.hash
    });
  }, [location]);
  return {
    trackEvent,
    trackCTAClick,
    trackFormSubmit,
    trackProjectClick,
    trackSocialClick,
    trackEmailCopy
  };
};
gsap.registerPlugin(ScrollTrigger);
const WorkSection = () => {
  var _a, _b, _c, _d, _e, _f;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState(0);
  const scrollContainerRef = React.useRef(null);
  const topPickProjects = projects.filter((p) => p.featured);
  const containerRef = useGSAP(() => {
    gsap.fromTo(
      ".work-marquee-track",
      { xPercent: 0 },
      {
        xPercent: -50,
        duration: 20,
        ease: "none",
        repeat: -1
      }
    );
    if (!scrollContainerRef.current) return;
    topPickProjects.forEach((project, index) => {
      ScrollTrigger.create({
        trigger: `.project-item-${index}`,
        scroller: scrollContainerRef.current,
        // Monitor the right panel scroll
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setActiveProject(index);
        },
        onEnterBack: () => {
          setActiveProject(index);
        }
      });
    });
  }, [topPickProjects]);
  return /* @__PURE__ */ jsxs("section", { ref: containerRef, id: "work", className: "relative z-40 bg-background", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full border-y border-white/10 py-6 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "work-marquee-container flex whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "work-marquee-track flex gap-12 items-center pr-12 will-change-transform", children: [...Array(8)].map((_, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 group select-none", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-base md:text-xl text-secondary font-mono self-start mt-3 md:mt-6", children: [
        "(",
        projects.length.toString().padStart(2, "0"),
        ")"
      ] }),
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "leading-none transition-colors duration-300",
          style: {
            color: "#EEEEEE",
            fontFamily: '"Mohave", sans-serif',
            fontSize: "clamp(60px, 15vw, 140px)",
            letterSpacing: "-6px",
            fontWeight: 600
          },
          children: t("work.title")
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start leading-none pointer-events-none translate-y-2 md:translate-y-4", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-primary tracking-widest uppercase mb-2 font-sans" }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "text-xl md:text-3xl font-bold text-primary",
            style: { fontFamily: '"Mohave", sans-serif', fontWeight: 600 },
            children: t("work.topPick")
          }
        )
      ] })
    ] }, i)) }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:grid lg:grid-cols-2 min-h-screen lg:h-screen lg:overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "relative bg-background lg:border-r border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "lg:h-full flex flex-col justify-between p-6 md:p-8 lg:p-12 xl:p-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs md:text-sm uppercase tracking-widest text-secondary font-medium", style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 }, children: t("work.topPickProjects") }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  trackCTAClick("all_projects", "work_section");
                  navigate("/projects");
                },
                className: "flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300 text-xs md:text-sm font-medium",
                children: [
                  t("work.allProjects"),
                  " ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: topPickProjects.map((project, index) => /* @__PURE__ */ jsx(
            "div",
            {
              onClick: () => {
                var _a2;
                trackProjectClick(project.title, project.id);
                setActiveProject(index);
                const target = (_a2 = scrollContainerRef.current) == null ? void 0 : _a2.querySelector(`.project-item-${index}`);
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              },
              className: `text-lg md:text-xl lg:text-2xl transition-all duration-300 cursor-pointer ${activeProject === index ? "text-white opacity-100 translate-x-2" : "text-white/30 opacity-50 hover:text-white/60 hover:opacity-75"}`,
              style: { fontFamily: '"Mohave", sans-serif', fontWeight: 600 },
              children: project.title
            },
            project.id
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 md:space-y-6 lg:space-y-8 border-t border-white/10 pt-4 md:pt-6 lg:pt-8 mb-6 lg:mb-0", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4", style: { fontFamily: '"Mohave", sans-serif', fontWeight: 600 }, children: (_a = topPickProjects[activeProject]) == null ? void 0 : _a.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm md:text-base lg:text-lg text-secondary leading-relaxed", style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 }, children: (_b = topPickProjects[activeProject]) == null ? void 0 : _b.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3 md:gap-4 lg:gap-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-widest text-secondary mb-1 md:mb-2", style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 }, children: t("work.year") }),
              /* @__PURE__ */ jsx("div", { className: "text-base md:text-lg lg:text-xl font-medium", style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 }, children: (_c = topPickProjects[activeProject]) == null ? void 0 : _c.year })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-widest text-secondary mb-1 md:mb-2", style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 }, children: t("work.timeline") }),
              /* @__PURE__ */ jsx("div", { className: "text-base md:text-lg lg:text-xl font-medium", style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 }, children: (_d = topPickProjects[activeProject]) == null ? void 0 : _d.timeline })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-widest text-secondary mb-1 md:mb-2", style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 }, children: t("work.servicesLabel") }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: (_f = (_e = topPickProjects[activeProject]) == null ? void 0 : _e.services) == null ? void 0 : _f.map((service, i) => /* @__PURE__ */ jsx("span", { className: "text-xs px-3 py-1 rounded-full border border-white/20 text-white", children: service }, i)) })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: scrollContainerRef,
          className: "relative bg-surface h-screen overflow-y-scroll snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
          children: topPickProjects.map((project, index) => /* @__PURE__ */ jsxs(
            "a",
            {
              href: project.link,
              target: "_blank",
              rel: "noopener noreferrer",
              className: `project-item-${index} h-screen w-full snap-start snap-always relative block group`,
              onClick: () => trackProjectClick(project.title, project.id),
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: project.image,
                    alt: `${project.title} - Project Preview`,
                    className: "absolute inset-0 w-full h-full object-contain bg-[#0a0a0a]",
                    loading: "lazy",
                    decoding: "async",
                    width: 1200,
                    height: 800,
                    onError: (e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.style.background = "linear-gradient(135deg, rgba(19, 91, 236, 0.1) 0%, rgba(19, 91, 236, 0.05) 100%)";
                      }
                    }
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-white text-lg font-medium px-6 py-3 border border-white/40 rounded-full backdrop-blur-sm", children: [
                  t("work.viewProject"),
                  " ",
                  /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-5 h-5" })
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "absolute top-8 left-8 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold shadow-lg z-10", children: (index + 1).toString().padStart(2, "0") })
              ]
            },
            project.id
          ))
        }
      )
    ] })
  ] });
};
const SPRING_CONFIG = { damping: 15, stiffness: 150 };
const MAGNETIC_STRENGTH = 0.3;
const MagneticButton = ({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);
  const handleMouseMove = (e) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * MAGNETIC_STRENGTH);
    y.set((e.clientY - centerY) * MAGNETIC_STRENGTH);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  return /* @__PURE__ */ jsx(
    motion.button,
    {
      ref,
      type,
      onClick,
      disabled,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      style: { x: springX, y: springY },
      className,
      whileTap: { scale: 0.95 },
      children
    }
  );
};
const TOAST_DURATION = 3e3;
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, TOAST_DURATION);
    return () => clearTimeout(timer);
  }, [onClose]);
  const bgColor = type === "success" ? "bg-green-500/90" : "bg-red-500/90";
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -20, scale: 0.9 },
      role: "alert",
      "aria-live": "polite",
      "aria-atomic": "true",
      className: `fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 ${bgColor} backdrop-blur-sm`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-white/20 flex items-center justify-center", "aria-hidden": "true", children: type === "success" ? /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx("span", { className: "text-lg", children: "!" }) }),
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: message })
      ]
    }
  );
};
const FloatingInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required,
  isTextarea
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;
  const InputComponent = isTextarea ? "textarea" : "input";
  const inputClasses = `w-full bg-white/5 border ${error ? "border-red-500" : "border-white/10"} rounded-xl px-4 ${isTextarea ? "pt-6 pb-4 min-h-[150px] resize-none" : "py-4"} text-white placeholder-transparent focus:outline-none focus:border-primary transition-colors duration-300`;
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(
      motion.label,
      {
        animate: {
          y: isActive ? -28 : 12,
          scale: isActive ? 0.85 : 1,
          color: isActive ? "#135BEC" : "rgba(255,255,255,0.5)"
        },
        transition: { duration: 0.2 },
        className: "absolute left-4 pointer-events-none origin-left font-medium",
        children: [
          label,
          required && /* @__PURE__ */ jsx("span", { className: "text-primary ml-1", children: "*" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      InputComponent,
      {
        type: isTextarea ? void 0 : type,
        name,
        value,
        onChange,
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        className: inputClasses
      }
    ),
    error && /* @__PURE__ */ jsx(
      motion.span,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        className: "text-red-400 text-sm mt-1 block",
        children: error
      }
    )
  ] });
};
const SocialLink = ({ href, label, index }) => {
  const handleClick = () => {
    trackSocialClick(label.toLowerCase(), href);
  };
  return /* @__PURE__ */ jsxs(
    motion.a,
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      onClick: handleClick,
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: index * 0.1, duration: 0.5 },
      whileHover: { scale: 1.05, x: 5 },
      className: "group relative flex items-center gap-3 uppercase tracking-widest text-xs font-bold text-white/60 hover:text-primary transition-all duration-300",
      children: [
        /* @__PURE__ */ jsxs("span", { className: "relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("span", { className: "block transition-transform duration-300 group-hover:-translate-y-full", children: label }),
          /* @__PURE__ */ jsx("span", { className: "absolute top-full left-0 text-primary transition-transform duration-300 group-hover:-translate-y-full", children: label })
        ] }),
        /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" }),
        /* @__PURE__ */ jsx("span", { className: "absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" })
      ]
    }
  );
};
gsap.registerPlugin(ScrollTrigger);
const ContactSection = () => {
  const { t, i18n: i18n2 } = useTranslation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (titleRef.current) {
      const text = t("contact.letsTalk");
      const chars = text.split("").map(
        (char, i) => `<span class="char inline-block" style="opacity: 0; transform: translateY(50px);">${char === " " ? "&nbsp;" : char}</span>`
      ).join("");
      titleRef.current.innerHTML = chars;
    }
  }, [t]);
  const containerRef = useGSAP(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    const scrambleChars = document.querySelectorAll(".scramble-char");
    const finalText = t("contact.title");
    scrambleChars.forEach((char, index) => {
      const finalChar = finalText[index];
      let iterations = 0;
      const maxIterations = 15;
      gsap.fromTo(
        char,
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
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".scramble-text",
            start: "top 85%",
            toggleActions: "play none none reverse",
            onEnter: () => {
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
    gsap.to(".char", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
    gsap.fromTo(
      ".contact-info-card",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-info-container",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
    gsap.fromTo(
      ".contact-form-container",
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form-container",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
    gsap.fromTo(
      ".footer-element",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-container",
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = t("contact.errors.nameReq");
    }
    if (!formData.email.trim()) {
      newErrors.email = t("contact.errors.emailReq");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("contact.errors.emailInv");
    }
    if (!formData.subject.trim()) {
      newErrors.subject = t("contact.errors.subjectReq");
    }
    if (!formData.message.trim()) {
      newErrors.message = t("contact.errors.messageReq");
    } else if (formData.message.length < 10) {
      newErrors.message = t("contact.errors.messageLen");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const SERVICE_ID = "service_crmotl9";
      const TEMPLATE_ID = "template_24d36ca";
      const PUBLIC_KEY = "M8i52nR7Ez_lyysDF";
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) ;
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: "well0711200@gmail.com"
      };
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      trackFormSubmit("contact_form", true);
      setToast({ message: t("contact.form.success"), type: "success" });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      trackFormSubmit("contact_form", false);
      setToast({ message: t("contact.form.error"), type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: void 0 }));
    }
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("contact@welli.my.id");
      trackEmailCopy("contact@welli.my.id");
      setCopied(true);
      setToast({ message: t("contact.copy.success"), type: "success" });
      setTimeout(() => setCopied(false), 2e3);
    } catch {
      setToast({ message: t("contact.copy.error"), type: "error" });
    }
  };
  const socialLinks = [
    { href: "https://www.linkedin.com/in/welli-", label: "LinkedIn" },
    { href: "https://www.instagram.com/_well07/", label: "Instagram" },
    { href: "https://github.com/Creastein", label: "GitHub" },
    { href: "https://www.tiktok.com/@wellibuilds", label: "TikTok" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "footer",
      {
        ref: sectionRef,
        id: "contact",
        className: "relative z-40 bg-black",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" })
          ] }),
          /* @__PURE__ */ jsx(SectionHeader, { title: t("contact.title"), subtitle: t("contact.subtitle") }),
          /* @__PURE__ */ jsx("div", { ref: containerRef, className: "container mx-auto max-w-[1400px] px-6 sm:px-12 py-24", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-16 lg:gap-24", children: [
            /* @__PURE__ */ jsxs("div", { className: "contact-info-container space-y-12", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "h2",
                  {
                    ref: titleRef,
                    className: "text-5xl md:text-7xl tracking-tighter text-white mb-8",
                    style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 },
                    children: t("contact.letsTalk")
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-xl text-secondary leading-relaxed max-w-md", children: t("contact.description") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    className: "contact-info-card group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 cursor-pointer",
                    onClick: copyEmail,
                    whileHover: { scale: 1.02 },
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 text-primary" }) }),
                      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                        /* @__PURE__ */ jsx("div", { className: "text-sm text-secondary mb-1", children: "Email" }),
                        /* @__PURE__ */ jsx("div", { className: "text-lg font-medium text-white", children: "contact@welli.my.id" })
                      ] }),
                      /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          initial: false,
                          animate: { scale: copied ? [1, 1.2, 1] : 1 },
                          children: copied ? /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-green-400" }) : /* @__PURE__ */ jsx(Copy, { className: "w-5 h-5 text-white/40 group-hover:text-white transition-colors" })
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "contact-info-card flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-primary" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "text-sm text-secondary mb-1", children: t("contact.info.location") }),
                    /* @__PURE__ */ jsx("div", { className: "text-lg font-medium text-white", children: t("contact.info.jakarta") })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "contact-info-card flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-primary" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "text-sm text-secondary mb-1", children: t("contact.info.availability") }),
                    /* @__PURE__ */ jsx("div", { className: "text-lg font-medium text-white", children: t("contact.info.open") })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm uppercase tracking-widest text-secondary font-medium mb-6", children: t("contact.info.followMe") }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-6", children: socialLinks.map((link, index) => /* @__PURE__ */ jsx(
                  SocialLink,
                  {
                    href: link.href,
                    label: link.label,
                    index
                  },
                  link.label
                )) })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "contact-form-container",
                initial: { opacity: 0, x: 50 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.8, ease: "easeOut" },
                children: /* @__PURE__ */ jsxs("div", { className: "bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-2", children: t("contact.form.title") }),
                  /* @__PURE__ */ jsx("p", { className: "text-secondary mb-8", children: t("contact.form.description") }),
                  /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
                    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                      /* @__PURE__ */ jsx(
                        FloatingInput,
                        {
                          label: t("contact.form.name"),
                          name: "name",
                          value: formData.name,
                          onChange: handleChange,
                          error: errors.name,
                          required: true
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        FloatingInput,
                        {
                          label: t("contact.form.email"),
                          name: "email",
                          type: "email",
                          value: formData.email,
                          onChange: handleChange,
                          error: errors.email,
                          required: true
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx(
                      FloatingInput,
                      {
                        label: t("contact.form.subject"),
                        name: "subject",
                        value: formData.subject,
                        onChange: handleChange,
                        error: errors.subject,
                        required: true
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      FloatingInput,
                      {
                        label: t("contact.form.message"),
                        name: "message",
                        value: formData.message,
                        onChange: handleChange,
                        error: errors.message,
                        required: true,
                        isTextarea: true
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      MagneticButton,
                      {
                        type: "submit",
                        disabled: isSubmitting,
                        className: "w-full group relative flex items-center justify-center gap-3 bg-primary text-white py-4 px-8 rounded-xl font-medium text-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed",
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "relative z-10 flex items-center gap-2", children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                            /* @__PURE__ */ jsx(
                              motion.div,
                              {
                                className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full",
                                animate: { rotate: 360 },
                                transition: { repeat: Infinity, duration: 1, ease: "linear" }
                              }
                            ),
                            t("contact.form.sending")
                          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                            t("contact.form.submit"),
                            /* @__PURE__ */ jsx(Send, { className: "w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" })
                          ] }) }),
                          /* @__PURE__ */ jsx(
                            motion.div,
                            {
                              className: "absolute inset-0 bg-white",
                              initial: { x: "-100%" },
                              whileHover: { x: 0 },
                              transition: { duration: 0.3 }
                            }
                          ),
                          /* @__PURE__ */ jsxs("span", { className: "absolute inset-0 flex items-center justify-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: [
                            t("contact.form.submit"),
                            /* @__PURE__ */ jsx(Send, { className: "w-5 h-5" })
                          ] })
                        ]
                      }
                    )
                  ] })
                ] })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "footer-container border-t border-white/10", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-[1400px] px-6 sm:px-12 py-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-4", children: [
            /* @__PURE__ */ jsx("p", { className: "footer-element text-sm text-white/40", children: t("contact.footer.rights") }),
            /* @__PURE__ */ jsxs("div", { className: "footer-element flex items-center gap-2 text-sm text-white/40", children: [
              /* @__PURE__ */ jsx("span", { children: t("contact.footer.madeWith") }),
              /* @__PURE__ */ jsx(
                motion.span,
                {
                  animate: { scale: [1, 1.2, 1] },
                  transition: { repeat: Infinity, duration: 1.5 },
                  className: "text-red-400"
                }
              ),
              /* @__PURE__ */ jsx("span", { children: t("contact.footer.in") })
            ] })
          ] }) }) })
        ]
      },
      i18n2.language
    ),
    toast && /* @__PURE__ */ jsx(
      Toast,
      {
        message: toast.message,
        type: toast.type,
        onClose: () => setToast(null)
      }
    )
  ] });
};
const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = "https://welli.my.id/og-image.jpg",
  keywords,
  lang = "id"
}) => {
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("html", { lang }),
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    keywords && /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonical }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonical }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
    ogImage && /* @__PURE__ */ jsx("meta", { property: "og:image", content: ogImage }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    ogImage && /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: ogImage })
  ] });
};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};
const fadeInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(20px)"
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};
const slideInRightVariants = {
  hidden: {
    opacity: 0,
    x: 100,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};
const slideInLeftVariants = {
  hidden: {
    opacity: 0,
    x: -50,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.2
    }
  }
};
const textContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};
const textLineVariants = {
  hidden: {
    opacity: 0,
    y: 14,
    filter: "blur(4px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};
function Home({ isLoading }) {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const gradientY = useTransform(heroProgress, [0, 1], ["0%", "50%"]);
  const imageY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const floatingTextY = useTransform(heroProgress, [0, 1], ["0%", "-20%"]);
  const logoScale = useTransform(heroProgress, [0, 0.2, 0.8, 1], [7, 1, 1, 1.3]);
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (isLoading) {
        setIsScrolled(false);
        return;
      }
      setIsScrolled(latest > 100);
    });
  }, [scrollY, isLoading]);
  useEffect(() => {
    if (!isLoading) {
      setIsScrolled(scrollY.get() > 100);
    }
  }, [isLoading, scrollY]);
  useEffect(() => {
    const img = new Image();
    img.src = "/images/hero-potrait.png";
    img.onload = () => setImageLoaded(true);
  }, []);
  return /* @__PURE__ */ jsxs("main", { ref: containerRef, className: "relative w-full overflow-x-hidden pb-32 bg-black", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Welli — Freelance Business Analyst & Web Developer Indonesia",
        description: "Jasa freelance Business Analyst dan Web Developer. Spesialis React, TypeScript untuk startup dan UMKM Indonesia.",
        canonical: "https://welli.my.id",
        keywords: "freelance web developer indonesia, jasa business analyst, react developer freelance, web developer typescript indonesia"
      }
    ),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Welli",
      "jobTitle": "Freelance Business Analyst & Web Developer",
      "url": "https://welli.my.id",
      "knowsAbout": [
        "Web Development",
        "Business Analysis",
        "React",
        "TypeScript",
        "Vite"
      ]
    }) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        style: {
          scale: logoScale,
          transformOrigin: "top left"
        },
        className: "fixed top-32 left-6 md:top-8 md:left-6 z-0 md:z-50 flex items-center gap-3 mix-blend-difference pointer-events-none",
        children: /* @__PURE__ */ jsx(
          motion.span,
          {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] },
            className: "text-xl font-bold tracking-tight text-[#e0e0e0] whitespace-nowrap",
            style: { fontFamily: '"Mohave", sans-serif', fontWeight: 600 },
            children: "WELLI"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.section,
      {
        ref: heroRef,
        id: "home",
        className: "sticky top-0 min-h-screen w-full flex flex-col px-6 md:px-12 pt-8 pb-12 overflow-hidden",
        initial: "hidden",
        animate: isLoading ? "hidden" : "visible",
        variants: containerVariants,
        children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              style: { y: gradientY },
              variants: fadeInVariants,
              className: "absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none will-change-transform"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex justify-center items-end pointer-events-none z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-background via-background/80 to-transparent z-20" }),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                variants: fadeInVariants,
                style: { y: imageY },
                className: "relative w-[90%] md:w-[500px] lg:w-[600px] h-[70vh] mb-10 md:mb-32 will-change-transform",
                children: /* @__PURE__ */ jsx("div", { className: "relative w-full h-full", children: /* @__PURE__ */ jsx(
                  motion.img,
                  {
                    src: "/images/hero-potrait.png",
                    alt: "WELLI - Business Analyst and Web Developer",
                    className: "w-full h-full object-cover object-top",
                    loading: "eager",
                    decoding: "async",
                    initial: { opacity: 0, scale: 1.1 },
                    animate: {
                      opacity: imageLoaded ? 1 : 0,
                      scale: imageLoaded ? 1 : 1.1
                    },
                    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
                    style: {
                      maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                      filter: "contrast(1.1) brightness(0.9)"
                    }
                  }
                ) })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              style: { y: floatingTextY },
              variants: slideInRightVariants,
              className: "absolute top-[35%] right-6 md:right-12 z-20 text-right hidden md:block will-change-transform",
              children: /* @__PURE__ */ jsx(
                motion.div,
                {
                  animate: {
                    opacity: isScrolled ? 0 : 1,
                    x: isScrolled ? 100 : 0,
                    filter: isScrolled ? "blur(10px)" : "blur(0px)"
                  },
                  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                  children: /* @__PURE__ */ jsxs(
                    motion.h2,
                    {
                      variants: textContainerVariants,
                      initial: "hidden",
                      animate: isLoading ? "hidden" : "visible",
                      className: "text-4xl lg:text-6xl font-bold text-white/90 leading-[0.9] tracking-tight mix-blend-overlay",
                      style: { fontFamily: '"Mohave", sans-serif', fontWeight: 600 },
                      children: [
                        /* @__PURE__ */ jsx(motion.span, { variants: textLineVariants, className: "block", children: t("hero.title1") }),
                        /* @__PURE__ */ jsx(motion.span, { variants: textLineVariants, className: "block", children: t("hero.title2") })
                      ]
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mt-auto relative z-30 flex flex-col md:flex-row justify-between items-end w-full", children: /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: slideInLeftVariants,
              initial: "hidden",
              animate: isLoading || isScrolled ? "hidden" : "visible",
              className: "max-w-xl",
              children: /* @__PURE__ */ jsxs(
                motion.h3,
                {
                  variants: textContainerVariants,
                  className: "text-2xl md:text-3xl text-white font-medium leading-tight tracking-tight",
                  style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 },
                  children: [
                    /* @__PURE__ */ jsx(motion.span, { variants: textLineVariants, className: "block", children: t("hero.subtitle1") }),
                    /* @__PURE__ */ jsx(motion.span, { variants: textLineVariants, className: "block text-white/40", children: t("hero.subtitle2") })
                  ]
                }
              )
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(AboutSection, {}),
    /* @__PURE__ */ jsx(SkillsSection, {}),
    /* @__PURE__ */ jsx(ServicesSection, {}),
    /* @__PURE__ */ jsx(WorkSection, {}),
    /* @__PURE__ */ jsx(ContactSection, {})
  ] });
}
const CaseStudy = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.featured);
  return /* @__PURE__ */ jsxs("main", { className: "bg-background min-h-screen text-white pb-32", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Case Studies — Portfolio Welli | Web & Business Analysis",
        description: "Studi kasus proyek web development dan business analysis yang dikerjakan Welli untuk klien startup dan UMKM Indonesia.",
        canonical: "https://welli.my.id/case-study",
        keywords: "portfolio web developer, case study business analyst, proyek react typescript"
      }
    ),
    /* @__PURE__ */ jsxs("header", { className: "relative w-full pt-32 pb-16 px-6 md:px-12 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 -z-10", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 blur-[120px] rounded-full" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-[1400px]", children: [
        /* @__PURE__ */ jsxs(
          motion.button,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6 },
            onClick: () => navigate("/"),
            className: "group flex items-center gap-2 text-secondary hover:text-white transition-colors mb-12",
            children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5 group-hover:-translate-x-1 transition-transform" }),
              /* @__PURE__ */ jsx("span", { style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 }, children: t("caseStudy.backHome") })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.2 },
            className: "space-y-6",
            children: [
              /* @__PURE__ */ jsx(
                "h1",
                {
                  className: "text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight",
                  style: { fontFamily: '"Mohave", sans-serif', fontWeight: 600 },
                  children: t("caseStudy.title")
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: "text-lg md:text-xl text-secondary max-w-2xl",
                  style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 },
                  children: t("caseStudy.description")
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "flex gap-4 mt-12",
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setFilter("all"),
                  className: `px-6 py-3 rounded-full border transition-all ${filter === "all" ? "bg-primary border-primary text-white" : "border-white/20 text-secondary hover:border-white/40 hover:text-white"}`,
                  style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 },
                  children: [
                    t("caseStudy.allProjectsTab"),
                    " (",
                    projects.length,
                    ")"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setFilter("featured"),
                  className: `px-6 py-3 rounded-full border transition-all ${filter === "featured" ? "bg-primary border-primary text-white" : "border-white/20 text-secondary hover:border-white/40 hover:text-white"}`,
                  style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 },
                  children: [
                    t("caseStudy.featuredTab"),
                    " (",
                    projects.filter((p) => p.featured).length,
                    ")"
                  ]
                }
              )
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "px-6 md:px-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-[1400px]", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
          initial: "hidden",
          animate: "visible",
          variants: {
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          },
          children: filteredProjects.map((project, index) => /* @__PURE__ */ jsxs(
            motion.article,
            {
              variants: {
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              },
              transition: { duration: 0.6 },
              className: "group relative bg-surface rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/10] overflow-hidden bg-surface-light", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: project.image,
                      alt: project.title,
                      className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700",
                      loading: "lazy",
                      width: 800,
                      height: 500,
                      onError: (e) => {
                        e.currentTarget.style.display = "none";
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.style.background = "linear-gradient(135deg, rgba(19, 91, 236, 0.1) 0%, rgba(19, 91, 236, 0.05) 100%)";
                        }
                      }
                    }
                  ),
                  project.featured && /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-xs font-medium", children: t("caseStudy.featuredBadge") })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: "text-2xl font-bold mb-2 group-hover:text-primary transition-colors",
                        style: { fontFamily: '"Mohave", sans-serif', fontWeight: 600 },
                        children: project.title
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: "text-sm text-secondary",
                        style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 },
                        children: project.category
                      }
                    )
                  ] }),
                  project.description && /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: "text-secondary text-sm line-clamp-2",
                      style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 },
                      children: project.description
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-xs text-secondary", children: [
                    project.year && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3" }),
                      /* @__PURE__ */ jsx("span", { style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 }, children: project.year })
                    ] }),
                    project.timeline && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
                      /* @__PURE__ */ jsx("span", { style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 }, children: project.timeline })
                    ] })
                  ] }),
                  project.services && project.services.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: project.services.map((service, i) => /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "text-xs px-3 py-1 rounded-full border border-white/20 text-white",
                      style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 },
                      children: service
                    },
                    i
                  )) }),
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: project.link,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "group/link inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300 text-sm font-medium mt-4",
                      style: { fontFamily: '"Mohave", sans-serif', fontWeight: 600 },
                      children: [
                        t("caseStudy.viewLive"),
                        /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" })
                      ]
                    }
                  )
                ] })
              ]
            },
            project.id
          ))
        }
      ),
      filteredProjects.length === 0 && /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "text-center py-32",
          children: /* @__PURE__ */ jsx(
            "p",
            {
              className: "text-secondary text-lg",
              style: { fontFamily: '"Mohave", sans-serif', fontWeight: 300 },
              children: t("caseStudy.noProjects")
            }
          )
        }
      )
    ] }) })
  ] });
};
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
const AnimatedRoutes = ({ isLoading }) => {
  const location = useLocation();
  return /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(Routes, { location, children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, { isLoading }) }),
    /* @__PURE__ */ jsx(Route, { path: "/work", element: /* @__PURE__ */ jsx(Home, { isLoading }) }),
    /* @__PURE__ */ jsx(Route, { path: "/projects", element: /* @__PURE__ */ jsx(CaseStudy, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/case-study/:id", element: /* @__PURE__ */ jsx(CaseStudy, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Home, { isLoading }) })
  ] }) });
};
let hasShownLoadingScreen = false;
const AppContent = () => {
  useTheme();
  const [isLoading, setIsLoading] = useState(() => {
    const shouldShow = !hasShownLoadingScreen;
    if (shouldShow) {
      hasShownLoadingScreen = true;
    }
    return shouldShow;
  });
  useAnalytics();
  useCallback(() => {
    setIsLoading(false);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    false,
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white transition-opacity duration-300 ${"opacity-100"}`,
        children: [
          /* @__PURE__ */ jsx(ScrollToTop, {}),
          /* @__PURE__ */ jsxs("div", { className: "transition-colors duration-300", children: [
            /* @__PURE__ */ jsx(Navbar, {}),
            /* @__PURE__ */ jsx(AnimatedRoutes, { isLoading })
          ] })
        ]
      }
    )
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(AppContent, {}) });
};
const nav$1 = { "home": "Home", "about": "About", "services": "Services", "work": "Work", "contact": "Contact", "language": "EN" };
const hero$1 = { "available": "Available for project", "title1": "Business Analyst", "title2": "Web Developer", "subtitle1": "I help turn business ideas into", "subtitle2": "simple and useful web experiences." };
const about$1 = { "label": "About Me", "title": "Business Analyst & Web Developer", "description": "I'm a Business Analyst with a background in Information Systems. I focus on translating business needs into clear, structured solutions. With hands-on frontend experience, I'm able to validate ideas quickly, communicate effectively with developers, and ensure solutions stay aligned with user and business goals." };
const services$1 = { "header": { "title": "SERVICES", "subtitle": "What I Offer" }, "items": { "business-analysis": { "title": "Business & System Analysis", "description": "Analyze business processes, identify problems, and translate requirements into clear system and feature definitions.", "tags": ["Requirements Analysis", "System Design", "Process Mapping"] }, "frontend-development": { "title": "Frontend Web Development", "description": "Build clean, responsive, and user-friendly web interfaces using modern frontend technologies like React and Next.js.", "tags": ["React", "Next.js", "Tailwind CSS"] }, "ui-implementation": { "title": "UI Implementation from Requirements", "description": "Turn business and user requirements into practical, intuitive, and functional user interfaces that align with real business goals.", "tags": ["UI/UX", "Figma to Code", "User-Centered Design"] } } };
const work$1 = { "title": "WORKS", "topPick": "Top Pick", "topPickProjects": "Top Pick Projects", "allProjects": "All Projects", "year": "Year", "timeline": "Timeline", "servicesLabel": "Services", "viewProject": "View Project" };
const skills$1 = { "title": "SKILLS", "subtitle": "My Tech Stack" };
const contact$1 = { "title": "CONTACT", "subtitle": "Get in Touch", "letsTalk": "LET'S TALK", "description": "Have a project in mind or want to collaborate? I'd love to hear from you.", "info": { "location": "Location", "jakarta": "Jakarta, Indonesia", "availability": "Availability", "open": "Open for opportunities", "followMe": "Follow Me" }, "form": { "title": "Send a Message", "description": "Fill out the form below and I'll get back to you soon.", "name": "Your Name", "email": "Your Email", "subject": "Subject", "message": "Your Message", "submit": "Send Message", "sending": "Sending...", "success": "Message sent successfully!", "error": "Failed to send message. Please try again." }, "errors": { "nameReq": "Name is required", "emailReq": "Email is required", "emailInv": "Please enter a valid email", "subjectReq": "Subject is required", "messageReq": "Message is required", "messageLen": "Message must be at least 10 characters" }, "copy": { "success": "Email copied to clipboard!", "error": "Failed to copy email" }, "footer": { "rights": "© 2025 WELLI. All rights reserved.", "madeWith": "Made with", "in": "in Jakarta" } };
const caseStudy$1 = { "backHome": "Back to Home", "title": "All Projects", "description": "A collection of web development projects ranging from business analysis to full-stack applications.", "allProjectsTab": "All Projects", "featuredTab": "Featured", "featuredBadge": "Featured", "viewLive": "View Live Project", "noProjects": "No projects found." };
const enTranslation = {
  nav: nav$1,
  hero: hero$1,
  about: about$1,
  services: services$1,
  work: work$1,
  skills: skills$1,
  contact: contact$1,
  caseStudy: caseStudy$1
};
const nav = { "home": "Beranda", "about": "Tentang", "services": "Layanan", "work": "Karya", "contact": "Kontak", "language": "ID" };
const hero = { "available": "Tersedia untuk proyek", "title1": "Business Analyst", "title2": "Web Developer", "subtitle1": "Saya membantu mewujudkan ide bisnis menjadi", "subtitle2": "pengalaman web yang simpel dan bermanfaat." };
const about = { "label": "Tentang Saya", "title": "Business Analyst & Web Developer", "description": "Saya seorang Business Analyst dengan latar belakang Sistem Informasi. Fokus saya adalah menerjemahkan kebutuhan bisnis menjadi solusi yang terstruktur. Dengan pengalaman di frontend, saya dapat memvalidasi ide dengan cepat, berkomunikasi secara efektif dengan developer, dan memastikan solusi sejalan dengan tujuan teknis dan bisnis." };
const services = { "header": { "title": "LAYANAN", "subtitle": "Apa yang Saya Tawarkan" }, "items": { "business-analysis": { "title": "Analisis Bisnis & Sistem", "description": "Menganalisis proses bisnis, mengidentifikasi masalah, dan menerjemahkan kebutuhan menjadi definisi sistem dan fitur yang jelas.", "tags": ["Analisis Kebutuhan", "Desain Sistem", "Pemetaan Proses"] }, "frontend-development": { "title": "Frontend Web Development", "description": "Membangun antarmuka web yang bersih, responsif, dan mudah digunakan menggunakan teknologi frontend modern seperti React dan Next.js.", "tags": ["React", "Next.js", "Tailwind CSS"] }, "ui-implementation": { "title": "Implementasi UI dari Kebutuhan", "description": "Mengubah kebutuhan bisnis dan pengguna menjadi antarmuka pengguna yang praktis, intuitif, dan fungsional yang sejalan dengan tujuan bisnis.", "tags": ["UI/UX", "Figma ke Code", "Desain Berbasis Pengguna"] } } };
const work = { "title": "KARYA", "topPick": "Pilihan Teratas", "topPickProjects": "Proyek Pilihan Teratas", "allProjects": "Semua Proyek", "year": "Tahun", "timeline": "Waktu", "servicesLabel": "Layanan", "viewProject": "Lihat Proyek" };
const skills = { "title": "KEAHLIAN", "subtitle": "Tech Stack Saya" };
const contact = { "title": "KONTAK", "subtitle": "Hubungi Saya", "letsTalk": "MARI BICARA", "description": "Punya proyek atau ingin berkolaborasi? Saya senang mendengarnya dari Anda.", "info": { "location": "Lokasi", "jakarta": "Jakarta, Indonesia", "availability": "Ketersediaan", "open": "Terbuka untuk peluang", "followMe": "Ikuti Saya" }, "form": { "title": "Kirim Pesan", "description": "Isi formulir di bawah ini dan saya akan segera membalasnya.", "name": "Nama Anda", "email": "Email Anda", "subject": "Subjek", "message": "Pesan Anda", "submit": "Kirim Pesan", "sending": "Mengirim...", "success": "Pesan berhasil dikirim!", "error": "Gagal mengirim pesan. Silakan coba lagi." }, "errors": { "nameReq": "Nama wajib diisi", "emailReq": "Email wajib diisi", "emailInv": "Mohon masukkan email yang valid", "subjectReq": "Subjek wajib diisi", "messageReq": "Pesan wajib diisi", "messageLen": "Pesan harus minimal 10 karakter" }, "copy": { "success": "Email disalin ke clipboard!", "error": "Gagal menyalin email" }, "footer": { "rights": "© 2025 WELLI. Hak cipta dilindungi.", "madeWith": "Dibuat dengan", "in": "di Jakarta" } };
const caseStudy = { "backHome": "Kembali ke Beranda", "title": "Semua Proyek", "description": "Koleksi proyek pengembangan web mulai dari analisis bisnis hingga aplikasi full-stack.", "allProjectsTab": "Semua Proyek", "featuredTab": "Unggulan", "featuredBadge": "Unggulan", "viewLive": "Lihat Proyek Langsung", "noProjects": "Tidak ada proyek ditemukan." };
const idTranslation = {
  nav,
  hero,
  about,
  services,
  work,
  skills,
  contact,
  caseStudy
};
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation
    },
    id: {
      translation: idTranslation
    }
  },
  lng: "id",
  // Set default to Indonesian since user requested it
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
    // react already safes from xss
  }
});
const routes = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(App, {}),
    children: [
      { index: true, element: /* @__PURE__ */ jsx(Home, { isLoading: false }) },
      { path: "home", element: /* @__PURE__ */ jsx(Home, { isLoading: false }) },
      { path: "work", element: /* @__PURE__ */ jsx(Home, { isLoading: false }) },
      { path: "projects", element: /* @__PURE__ */ jsx(CaseStudy, {}) },
      { path: "case-study/:id", element: /* @__PURE__ */ jsx(CaseStudy, {}) },
      { path: "*", element: /* @__PURE__ */ jsx(Home, { isLoading: false }) }
    ]
  }
];
const createRoot = ViteReactSSG(
  { routes },
  ({ isClient }) => {
    if (isClient && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js", { scope: "/" }).then((reg) => console.log("SW registered:", reg)).catch((err) => console.log("SW error:", err));
      });
    }
  }
);
export {
  createRoot
};
