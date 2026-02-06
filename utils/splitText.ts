import React from 'react';

/**
 * Utility to split text into individual characters wrapped in spans
 * for GSAP animation purposes
 */
export const splitTextIntoChars = (text: string): string => {
    return text
        .split('')
        .map((char) => {
            // Preserve spaces
            if (char === ' ') {
                return '<span class="char" style="display: inline-block;">&nbsp;</span>';
            }
            return `<span class="char" style="display: inline-block;">${char}</span>`;
        })
        .join('');
};

/**
 * Utility to split text into words wrapped in spans
 */
export const splitTextIntoWords = (text: string): string => {
    return text
        .split(' ')
        .map((word) => {
            return `<span class="word" style="display: inline-block;">${word}</span>`;
        })
        .join(' ');
};

/**
 * Utility to split text into lines wrapped in divs
 */
export const splitTextIntoLines = (element: HTMLElement): void => {
    const text = element.textContent || '';
    const words = text.split(' ');
    element.innerHTML = '';

    let line = document.createElement('div');
    line.style.overflow = 'hidden';

    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.style.display = 'inline-block';
        span.textContent = word + (index < words.length - 1 ? ' ' : '');
        line.appendChild(span);
    });

    element.appendChild(line);
};

/**
 * React hook to split text for animation
 */
export const useSplitText = (ref: React.RefObject<HTMLElement>, type: 'chars' | 'words' | 'lines' = 'chars') => {
    React.useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;
        const originalText = element.textContent || '';

        if (type === 'chars') {
            element.innerHTML = splitTextIntoChars(originalText);
        } else if (type === 'words') {
            element.innerHTML = splitTextIntoWords(originalText);
        } else if (type === 'lines') {
            splitTextIntoLines(element);
        }
    }, [ref, type]);
};

export default {
    splitTextIntoChars,
    splitTextIntoWords,
    splitTextIntoLines,
    useSplitText
};
