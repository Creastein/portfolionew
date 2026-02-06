import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import { AnimatePresence } from 'framer-motion';

// ScrollToTop component to handle route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Extracted routes for cleaner AnimatePresence handling
const AnimatedRoutes: React.FC = () => {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Home />} />
                <Route path="/case-study/:id" element={<CaseStudy />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </AnimatePresence>
    );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-white font-sans selection:bg-primary selection:text-white">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </HashRouter>
  );
};

export default App;