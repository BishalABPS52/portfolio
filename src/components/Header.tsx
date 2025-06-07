'use client';

import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [activeFilter, setActiveFilter] = useState('Home');
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const filters = ['Home', 'About', 'Projects', 'Skills', 'PlayZone', 'Creative', 'CV', 'Certificates', 'Blogs'];
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    const event = new CustomEvent('portfolioFilter', { detail: filter });
    window.dispatchEvent(event);
  };

  return (
    <nav className="flex items-center justify-between px-4 py-6 bg-[var(--background)] relative z-50 transition-colors duration-300">
      {/* Logo */}
      <motion.div
        className="flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-4xl font-moranga" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
          bishal
        </span>
      </motion.div>      {/* Navigation Filters */}
      <div className="flex items-center space-x-3" style={{ color: '#669bbc' }}>
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
        {/* Dark Mode Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-[var(--card-background)] text-[var(--foreground)] shadow-lg border border-[var(--border)] hover:scale-110 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle dark mode"
        >
          {theme === 'light' ? (
            <Moon size={18} />
          ) : (
            <Sun size={18} />
          )}
        </motion.button>
      </div>

      {/* Contact Button */}
      <motion.button
        onClick={() => window.dispatchEvent(new CustomEvent('portfolioFilter', { detail: 'Contact' }))}
        className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-full font-silka-medium text-sm hover:opacity-80 transition-all duration-300 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Contact
      </motion.button>
    </nav>
  );
};

export default Header;
