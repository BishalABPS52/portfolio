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
    <nav className="flex flex-wrap items-center justify-between px-4 py-4 md:py-6 bg-[var(--background)] relative z-50 transition-colors duration-300 backdrop-blur-sm">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-green)]/5 via-[var(--accent-blue)]/5 to-[var(--accent-pink)]/5 dark:from-[var(--accent-purple)]/10 dark:via-[var(--accent-green)]/10 dark:to-[var(--accent-blue)]/10 pointer-events-none"></div>
      
      {/* Animated background particles for decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-[var(--accent-green)]/20 dark:bg-[var(--accent-purple)]/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-8 w-3 h-3 bg-[var(--accent-blue)]/20 dark:bg-[var(--accent-green)]/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-2 left-1/4 w-2 h-2 bg-[var(--accent-yellow)]/30 dark:bg-[var(--accent-blue)]/30 rounded-full animate-ping"></div>
      </div>

      {/* Logo */}
      <motion.div
        className="flex items-center relative z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-purple)]/20 to-[var(--accent-green)]/20 dark:from-[var(--accent-green)]/30 dark:to-[var(--accent-purple)]/30 blur-lg rounded-lg transform scale-110"></div>
          <span className="relative text-3xl md:text-4xl font-moranga bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-green)] dark:from-[var(--accent-green)] dark:to-[var(--accent-purple)] bg-clip-text text-transparent">
            bishal
          </span>
        </div>
      </motion.div>      
      
      {/* Mobile Menu Button - only visible on small screens */}
      <div className="flex items-center space-x-2 md:hidden relative z-10">
        <motion.button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gradient-to-br from-[var(--card-background)] to-[var(--accent-green)]/10 dark:to-[var(--accent-purple)]/10 text-[var(--foreground)] shadow-lg backdrop-blur-sm transition-all duration-300"
          whileTap={{ scale: 0.9, rotate: 180 }}
          aria-label="Toggle dark mode"
        >
          {theme === 'light' ? (
            <Moon size={16} className="text-[var(--accent-purple)]" />
          ) : (
            <Sun size={16} className="text-[var(--accent-yellow)]" />
          )}
        </motion.button>
        
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-full bg-gradient-to-br from-[var(--card-background)] to-[var(--accent-blue)]/10 dark:to-[var(--accent-green)]/10 text-[var(--foreground)] shadow-lg backdrop-blur-sm"
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
        >
          {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </motion.button>
      </div>
      
      {/* Desktop Navigation - hidden on mobile */}
      <div className="hidden md:flex items-center space-x-3 relative z-10" style={{ color: '#669bbc' }}>
        {/* Remove scroll bars and add beautiful styling */}
        <div className="flex items-center space-x-2 px-2 py-1 rounded-full bg-[var(--card-background)]/80 dark:bg-[var(--card-background)]/60 backdrop-blur-md shadow-lg">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-4 py-2 rounded-full font-silka-medium text-sm transition-all duration-300 relative overflow-hidden ${
                activeFilter === filter
                  ? 'bg-[#780000] dark:bg-gradient-to-r dark:from-[var(--accent-purple)] dark:to-[var(--accent-green)] text-white shadow-lg'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[#780000]/10 dark:hover:bg-[var(--accent-purple)]/10'
              }`}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background for active state */}
              {activeFilter === filter && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#780000]/20 to-[#780000]/20 dark:from-[var(--accent-purple)]/20 dark:to-[var(--accent-green)]/20"
                  layoutId="activeTab"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </motion.button>
          ))}
        </div>
        
        {/* Admin Panel Link for Desktop - Hidden by default, shown with Ctrl+Shift+A */}
        {showAdminAccess && (
          <motion.button
            onClick={() => router.push('/admin/availability')}
            className="px-4 py-2 rounded-full font-silka-medium text-sm bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-500 dark:text-red-400 transition-all duration-300 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05, rotate: 1 }}
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
          className="p-2 rounded-full bg-gradient-to-br from-[var(--card-background)] to-[var(--accent-green)]/10 dark:to-[var(--accent-purple)]/10 text-[var(--foreground)] shadow-lg backdrop-blur-sm transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle dark mode"
        >
          <div className="relative">
            {theme === 'light' ? (
              <Moon size={18} className="text-[var(--accent-purple)]" />
            ) : (
              <Sun size={18} className="text-[var(--accent-yellow)]" />
            )}
          </div>
        </motion.button>
      </div>

      {/* Contact Button - hidden on mobile */}
      <motion.button
        onClick={() => window.dispatchEvent(new CustomEvent('portfolioFilter', { detail: 'Contact' }))}
        className="hidden md:block px-6 py-3 bg-gradient-to-r from-[#780000] to-[#780000] dark:from-[var(--accent-purple)] dark:to-[var(--accent-green)] text-white rounded-full font-silka-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl relative z-10 overflow-hidden"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10">Contact</span>
        {/* Animated shine effect */}
        <motion.div
          className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full"
          animate={{
            translateX: ['200%', '-200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      </motion.button>
      
      {/* Mobile Menu - full width menu that appears when hamburger is clicked */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className={`fixed inset-0 top-[68px] z-50 px-4 py-6 flex flex-col md:hidden mobile-menu-container ${
              theme === 'light' ? 'light-bg' : 'dark-bg'
            }`}
            style={{
              backgroundColor: theme === 'light' ? '#ffffff' : '#000000',
              background: theme === 'light' ? '#ffffff' : '#000000',
              backgroundImage: 'none',
              backgroundAttachment: 'initial',
              backgroundBlendMode: 'initial',
              backgroundClip: 'initial',
              backgroundOrigin: 'initial',
              backgroundPosition: 'initial',
              backgroundRepeat: 'initial',
              backgroundSize: 'initial'
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-3 relative z-10">
              {filters.map((filter, index) => (
                <motion.button
                  key={filter}
                  onClick={() => handleFilterClick(filter)}
                  className={`px-4 py-3 rounded-xl font-silka-medium text-base transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-[#780000] dark:bg-gradient-to-r dark:from-[var(--accent-purple)] dark:to-[var(--accent-green)] text-white shadow-lg'
                      : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[#780000]/10 dark:hover:bg-[var(--accent-purple)]/10'
                  }`}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
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
                  className="px-4 py-3 rounded-xl font-silka-medium text-base bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-500 dark:text-red-400 transition-all duration-300"
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
              className="mt-auto px-6 py-4 bg-gradient-to-r from-[#780000] to-[#780000] dark:from-[var(--accent-purple)] dark:to-[var(--accent-green)] text-white rounded-full font-silka-medium text-base transition-all duration-300 shadow-lg relative overflow-hidden"
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="relative z-10">Contact</span>
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full"
                animate={{
                  translateX: ['200%', '-200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
