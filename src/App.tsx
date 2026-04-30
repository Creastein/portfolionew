import React, { useState, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import CaseStudy from '@/pages/CaseStudy';
import Website from '@/pages/Website';
import LoadingScreen from '@/components/LoadingScreen';
import { AnimatePresence } from 'framer-motion';
import { useTheme, useAnalytics } from '@/hooks';

// ScrollToTop component to handle route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Extracted routes for cleaner AnimatePresence handling
interface AnimatedRoutesProps {
  isLoading: boolean;
}

const AnimatedRoutes: React.FC<AnimatedRoutesProps> = ({ isLoading }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<Home isLoading={isLoading} />} />
        <Route path="/work" element={<Home isLoading={isLoading} />} />
        <Route path="/projects" element={<CaseStudy />} />
        <Route path="/case-study/:id" element={<CaseStudy />} />
        <Route path="*" element={<Home isLoading={isLoading} />} />
      </Routes>
    </AnimatePresence>
  );
};

let hasShownLoadingScreen = false;

const AppContent: React.FC = () => {
  const { mounted } = useTheme();
  const [isLoading, setIsLoading] = useState(() => {
    const shouldShow = !hasShownLoadingScreen;
    if (shouldShow) {
      hasShownLoadingScreen = true;
    }
    return shouldShow;
  });
  const isSSR = import.meta.env.SSR;

  // Initialize theme from localStorage or system preference
  useAnalytics(); // Initialize Google Analytics

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Prevent hydration mismatch - but allow server-side rendering
  if (!mounted && !isSSR) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Loading Screen - Curtain Effect - Only on client */}
      {!isSSR && isLoading && (
        <LoadingScreen
          onLoadingComplete={handleLoadingComplete}
          minimumLoadTime={2800}
        />
      )}

      {/* Main Content - Always visible on server, revealed by curtain on client */}
      <div
        className={`min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white transition-opacity duration-300 ${
          !isSSR && isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <ScrollToTop />
        <Routes>
          {/* Website service page — has its own layout/navbar */}
          <Route path="/website" element={<Website />} />
          {/* All other routes use the default portfolio layout */}
          <Route path="*" element={
            <div className="transition-colors duration-300">
              <Navbar />
              <AnimatedRoutes isLoading={isLoading} />
            </div>
          } />
        </Routes>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <AppContent />
    </HelmetProvider>
  );
};

export default App;
