import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics 4 Configuration
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown> | { page_path?: string }
    ) => void;
    dataLayer: unknown[];
  }
}

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    // Initialize GA4
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
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

  // Track page views on route change
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window.gtag === 'undefined') return;

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.hash,
    });
  }, [location]);

  return {
    trackEvent: (eventName: string, parameters?: Record<string, unknown>) => {
      if (!GA_MEASUREMENT_ID || typeof window.gtag === 'undefined') return;

      window.gtag('event', eventName, {
        ...parameters,
        page_location: window.location.href,
        page_title: document.title,
      });
    },
  };
};

// Helper function to track custom events
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, {
    ...parameters,
    page_location: window.location.href,
    page_title: document.title,
  });
};

export default useAnalytics;
