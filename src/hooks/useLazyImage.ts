import { useState, useEffect, useRef, RefObject } from 'react';

interface UseLazyImageOptions {
  rootMargin?: string;
  threshold?: number;
}

interface UseLazyImageReturn {
  imgRef: RefObject<HTMLDivElement | null>;
  shouldLoad: boolean;
  isLoaded: boolean;
  handleLoad: () => void;
}

export const useLazyImage = (
  options: UseLazyImageOptions = {}
): UseLazyImageReturn => {
  const { rootMargin = '50px', threshold = 0.1 } = options;
  const imgRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const element = imgRef.current;
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: load immediately
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

export default useLazyImage;
