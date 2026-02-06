import React from 'react';
import { Home, Grid, User, Mail, FileText } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const DockItem: React.FC<DockItemProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <motion.button
      aria-label={label}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative group flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ${
        isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className="text-2xl sm:text-3xl">
        {icon}
      </div>
      
      {/* Tooltip */}
      <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-surface border border-white/10 text-white text-xs font-medium px-2 py-1 rounded-md pointer-events-none whitespace-nowrap shadow-xl">
        {label}
      </span>
      
      {/* Active Indicator */}
      {isActive && (
        <motion.div 
          layoutId="activeDockIndicator"
          className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
        />
      )}
    </motion.button>
  );
};

const FloatingDock: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (id: string) => {
    // If we are not on home (e.g., inside a Case Study), go home first then scroll
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we are already on home, just scroll
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={24} /> },
    { id: 'work', label: 'Work', icon: <Grid size={24} /> },
    { id: 'about', label: 'About', icon: <User size={24} /> },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90vw]">
      <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 bg-surface/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/50">
        {navItems.map((item) => (
          <DockItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={false} // Simple active state removal for SPA feel, or implement IntersectionObserver logic if needed
            onClick={() => handleNavigation(item.id)}
          />
        ))}
        
        <div className="w-px h-8 bg-white/10 mx-1 sm:mx-2" />
        
        <DockItem
            key="contact"
            icon={<Mail size={24} />}
            label="Contact"
            isActive={false}
            onClick={() => handleNavigation('contact')}
        />

        <DockItem
          icon={<FileText size={24} />}
          label="Resume"
          isActive={false}
          onClick={() => window.open('#', '_blank')}
        />
      </div>
    </div>
  );
};

export default FloatingDock;