import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const TOAST_DURATION = 3000;

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, TOAST_DURATION);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = type === 'success' ? 'bg-green-500/90' : 'bg-red-500/90';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            role="alert"
            aria-live="polite"
            aria-atomic="true"
            className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 ${bgColor} backdrop-blur-sm`}
        >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center" aria-hidden="true">
                {type === 'success' ? <Check className="w-4 h-4" /> : <span className="text-lg">!</span>}
            </div>
            <span className="font-medium">{message}</span>
        </motion.div>
    );
};

export default Toast;
