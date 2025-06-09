'use client';

import { useState, useEffect } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [activeFilter, setActiveFilter] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdminAccess, setShowAdminAccess] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const filters = ['Home', 'About', 'Projects', 'Skills', 'PlayZone', 'Creative', 'CV', 'Certificates', 'Blogs'];
  
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    const event = new CustomEvent('portfolioFilter', { detail: filter });
    window.dispatchEvent(event);
    setMobileMenuOpen(false); // Close mobile menu after selection
  };

  // Toggle admin access visibility with Ctrl+Shift+A
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdminAccess(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  return (
    <nav className="flex flex-wrap items-center justify-between px-4 py-4 md:py-6 bg-[var(--background)] relative z-50 transition-colors duration-300">
      {/* Logo */}
      <motion.div
        className="flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-3xl md:text-4xl font-moranga" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
          bishal
        </span>
      </motion.div>      
      
      {/* Mobile Menu Button - only visible on small screens */}
      <div className="flex items-center space-x-2 md:hidden">
        <motion.button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-[var(--card-background)] text-[var(--foreground)] shadow-lg border border-[var(--border)] transition-all duration-300"
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle dark mode"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </motion.button>
        
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-full bg-[var(--card-background)] text-[var(--foreground)] shadow-lg border border-[var(--border)]"
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </motion.button>
      </div>
      
      {/* Desktop Navigation - hidden on mobile */}
      <div className="hidden md:flex items-center space-x-3 overflow-x-auto" style={{ color: '#669bbc' }}>
        {filters.map((filter) => (
          <motion.button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`px-4 py-2 rounded-full font-silka-medium text-sm transition-all duration-300 ${
              activeFilter === filter
                ? 'bg-[var(--card-background)] text-[var(--foreground)] shadow-lg border border-[var(--border)]'
                : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-background)]/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter}
          </motion.button>
        ))}
        
        {/* Admin Panel Link for Desktop - Hidden by default, shown with Ctrl+Shift+A */}
        {showAdminAccess && (
          <motion.button
            onClick={() => router.push('/admin/availability')}
            className="px-4 py-2 rounded-full font-silka-medium text-sm bg-red-500/20 text-red-500 border border-red-500/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            🔐 Admin
          </motion.button>
        )}
        
        {/* Dark Mode Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-[var(--card-background)] text-[var(--foreground)] shadow-lg border border-[var(--border)] hover:scale-110 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle dark mode"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </motion.button>
      </div>

      {/* Contact Button - hidden on mobile */}
      <motion.button
        onClick={() => window.dispatchEvent(new CustomEvent('portfolioFilter', { detail: 'Contact' }))}
        className="hidden md:block px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-full font-silka-medium text-sm hover:opacity-80 transition-all duration-300 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Contact
      </motion.button>
      
      {/* Mobile Menu - full width menu that appears when hamburger is clicked */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 top-[68px] bg-[var(--background)] z-40 px-4 py-6 flex flex-col md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-3 overflow-y-auto">
              {filters.map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => handleFilterClick(filter)}
                  className={`px-4 py-3 rounded-full font-silka-medium text-base transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-[var(--card-background)] text-[var(--foreground)] shadow-lg border border-[var(--border)]'
                      : 'text-[var(--muted)] hover:text-[var(--foreground)] bg-[var(--card-background)]/20'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {filter}
                </motion.button>
              ))}
              {/* Admin Panel Link - Hidden by default, shown with Ctrl+Shift+A */}
              {showAdminAccess && (
                <motion.button
                  onClick={() => {
                    router.push('/admin/availability');
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 rounded-full font-silka-medium text-base bg-red-500/20 text-red-500 border border-red-500/30 transition-all duration-300"
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  🔐 Admin Panel
                </motion.button>
              )}
            </div>
            
            {/* Mobile Contact Button */}
            <motion.button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('portfolioFilter', { detail: 'Contact' }));
                setMobileMenuOpen(false);
              }}
              className="mt-auto px-6 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-full font-silka-medium text-base transition-all duration-300 shadow-lg"
              whileTap={{ scale: 0.98 }}
            >
              Contact
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
