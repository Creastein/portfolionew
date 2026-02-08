import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const SPRING_CONFIG = { damping: 15, stiffness: 150 };
const MAGNETIC_STRENGTH = 0.3;

const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    className = '',
    onClick,
    type = 'button',
    disabled = false
}) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, SPRING_CONFIG);
    const springY = useSpring(y, SPRING_CONFIG);

    const handleMouseMove = (e: React.MouseEvent) => {
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

export default MagneticButton;
