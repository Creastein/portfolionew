import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import CaseStudy from '@/pages/CaseStudy';
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
  useAnalytics(); // Initialize Google Analytics

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Loading Screen - Curtain Effect */}
      {isLoading && (
        <LoadingScreen
          onLoadingComplete={handleLoadingComplete}
          minimumLoadTime={2800}
        />
      )}

      {/* Main Content - Always visible, revealed by curtain */}
      <div
        className={`min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white transition-opacity duration-300 ${
          isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <ScrollToTop />
        <div className="transition-colors duration-300">
          <Navbar />
          <AnimatedRoutes isLoading={isLoading} />
        </div>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
