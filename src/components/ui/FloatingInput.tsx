import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingInputProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: string;
    required?: boolean;
    isTextarea?: boolean;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    error,
    required,
    isTextarea
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const isActive = isFocused || value.length > 0;

    const InputComponent = isTextarea ? 'textarea' : 'input';

    const inputClasses = `w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'
        } rounded-xl px-4 ${isTextarea ? 'pt-6 pb-4 min-h-[150px] resize-none' : 'py-4'
        } text-white placeholder-transparent focus:outline-none focus:border-primary transition-colors duration-300`;

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
                className={inputClasses}
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

export default FloatingInput;
